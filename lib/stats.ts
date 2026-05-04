import { prisma } from "@/lib/prisma";

const hikeCategories = new Set(["HIKE", "TRAIL"]);
const foodCategories = new Set(["FOOD", "COFFEE"]);

export async function getStats() {
  const posts = await prisma.post.findMany({
    orderBy: {
      date: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      date: true,
      location: true,
      rating: true,
      distance: true,
      latitude: true,
      longitude: true,
    },
  });

  const categoryCounts = posts.reduce<Record<string, number>>((counts, post) => {
    counts[post.category] = (counts[post.category] ?? 0) + 1;
    return counts;
  }, {});

  const ratedPosts = posts.filter((post) => post.rating !== null);
  const totalDistance = posts.reduce(
    (sum, post) => sum + (post.distance ?? 0),
    0,
  );

  return {
    totalPosts: posts.length,
    categoryCounts,
    hikeTrailCount: posts.filter((post) => hikeCategories.has(post.category))
      .length,
    foodCoffeeCount: posts.filter((post) => foodCategories.has(post.category))
      .length,
    mappedPosts: posts.filter(
      (post) => post.latitude !== null && post.longitude !== null,
    ).length,
    totalDistance,
    averageRating:
      ratedPosts.length > 0
        ? ratedPosts.reduce((sum, post) => sum + (post.rating ?? 0), 0) /
          ratedPosts.length
        : null,
    highestRatedPosts: [...ratedPosts]
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, 3),
    recentPosts: posts.slice(0, 4),
  };
}

export function formatStatNumber(value: number, digits = 0) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(value);
}

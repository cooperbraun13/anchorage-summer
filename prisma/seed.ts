import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: databaseUrl,
  }),
});

const posts = [
  {
    title: "Flattop Mountain Trail",
    slug: "flattop-mountain-trail",
    category: "HIKE",
    date: new Date("2024-06-15T12:00:00.000Z"),
    location: "Chugach State Park, AK",
    latitude: 61.0898,
    longitude: -149.6764,
    rating: 9,
    cost: 0,
    distance: 4.3,
    body: "A classic Anchorage hike with steep sections, big views, and a full panorama of the city, inlet, and surrounding peaks from the top.",
    imageUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Moose's Tooth Pizza",
    slug: "mooses-tooth-pizza",
    category: "FOOD",
    date: new Date("2024-06-12T12:00:00.000Z"),
    location: "Anchorage, AK",
    latitude: 61.1908,
    longitude: -149.8689,
    rating: 10,
    cost: 24,
    distance: null,
    body: "A crowded Anchorage staple that absolutely earns the hype. Great pizza, lively energy, and the kind of meal friends keep talking about afterward.",
    imageUrl:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Tony Knowles Coastal Trail",
    slug: "tony-knowles-coastal-trail",
    category: "TRAIL",
    date: new Date("2024-06-08T12:00:00.000Z"),
    location: "Anchorage, AK",
    latitude: 61.2181,
    longitude: -149.9088,
    rating: 8,
    cost: 0,
    distance: 11,
    body: "A long, easygoing trail along the water with mountain views, wooded stretches, and plenty of places to stop and take in the inlet.",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Kaladi Brothers Coffee",
    slug: "kaladi-brothers-coffee",
    category: "COFFEE",
    date: new Date("2024-06-03T12:00:00.000Z"),
    location: "Anchorage, AK",
    latitude: 61.1947,
    longitude: -149.8858,
    rating: 8,
    cost: 7,
    distance: null,
    body: "A reliable coffee stop for slow mornings, laptop time, and getting oriented before heading out for the day.",
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
  },
];

async function main() {
  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

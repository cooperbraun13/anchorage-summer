export const siteConfig = {
  name: "Anchorage Summer",
  shortName: "Anchorage",
  domain: "anchoragesummer.com",
  description:
    "A personal travel blog tracking hikes, trails, food spots, and internship life in Anchorage, Alaska.",
  hero: {
    title: "My Anchorage Summer",
    subtitle:
      "A personal blog tracking hikes, trails, food spots, and internship life in Anchorage, Alaska.",
  },
  theme: {
    vibe: "outdoorsy",
    primary: "green",
  },
  map: {
    defaultCenter: [61.2176, -149.8997] as [number, number],
    defaultZoom: 10,
    defaultMarkerColor: "#2563eb",
    compactMarkerColor: "#104831",
    categoryColors: {
      HIKE: "#255c45",
      TRAIL: "#255c45",
      FOOD: "#b45309",
      COFFEE: "#7c2d12",
      INTERNSHIP: "#6d28d9",
    },
  },
  assets: {
    heroBadge:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=720&q=80",
    defaultPostImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    backgroundAccent:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Posts", href: "/posts" },
    { label: "Timeline", href: "/timeline" },
    { label: "Map", href: "/map" },
    { label: "Stats", href: "/stats" },
  ],
  actions: {
    addPost: {
      label: "Add Post",
      href: "/posts/new",
    },
  },
} as const;

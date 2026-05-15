export const siteConfig = {
  name: "anchorage summer",
  shortName: "anchorage",
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
    favicon: "/favicon.svg",
    heroBadge: "/alaska-summer.jpg",
    defaultPostImage: "/alaska-summer.jpg",
    backgroundAccent: "/alaska-summer.jpg",
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

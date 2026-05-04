# Anchorage Summer — Requirements

## Project Overview

Build a full-stack personal travel blog / mini-social web app for documenting a summer internship in Anchorage, Alaska.

The first version should be the **Anchorage Summer** site, but it should be structured as a reusable personal travel blog template that can later be forked into a separate **Euro Summer** site for a Europe trip.

The app should allow the owner to create posts about hikes, trails, restaurants, coffee shops, viewpoints, activities, internship-life updates, and other Anchorage experiences.

Friends and family should be able to read posts and leave comments on **individual post pages only** by entering their name and a comment. Visitors should not need accounts, login, or profiles.

The homepage should not show comments. Comments belong only on post detail pages.

---

## Core Goals

The project should:

- Be simple enough to actually finish.
- Be polished enough to show as a portfolio project.
- Use a real database.
- Use a clean full-stack architecture.
- Be easy to deploy.
- Be reusable enough to fork later for the Europe travel blog.
- Avoid unnecessary third-party services.

---

## Tech Stack

Use:

- Next.js with the App Router
- TypeScript
- Bun as the package manager
- PostgreSQL
- Prisma ORM
- Neon for hosted Postgres
- Vercel for deployment
- Tailwind CSS
- Leaflet + OpenStreetMap for maps

Do not use:

- Express
- Firebase
- Supabase
- MongoDB
- Google Maps API
- Mapbox
- Clerk
- NextAuth/Auth.js
- full user accounts

---

## Package Manager

Use Bun for all package management and scripts.

Required commands:

```bash
bun install
bun run dev
bun run build
bun run lint
bunx prisma generate
bunx prisma migrate dev
bunx prisma studio
```

Commit:

```txt
bun.lock
```

Do not create or commit:

```txt
package-lock.json
yarn.lock
pnpm-lock.yaml
```

---

## Product Concept

The app is a personal blog and activity map.

The owner can publish posts like:

- Flattop Mountain Trail
- Moose’s Tooth Pizza
- Tony Knowles Coastal Trail
- Kaladi Brothers Coffee
- Weekend in Seward
- Internship week recap
- Best coffee shops so far

Visitors can:

- browse posts
- view the map
- read individual post pages
- leave comments by name on individual posts

Visitors cannot:

- create accounts
- log in
- create their own posts
- like posts
- follow users
- send messages

---

## Important Reusability Requirement

Build the Alaska version first, but avoid hardcoding Alaska-specific values throughout the app.

Use a centralized config file for site-specific content.

Recommended file:

```txt
lib/site-config.ts
```

Example:

```ts
export const siteConfig = {
  name: "Anchorage Summer",
  shortName: "Anchorage",
  domain: "anchoragesummer.com",

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
    defaultCenter: [61.2176, -149.8997],
    defaultZoom: 10,
  },

  assets: {
    heroBadge: "/alaska/hero-badge.png",
    backgroundAccent: "/alaska/mountains-bg.svg",
    defaultPostImage: "/alaska/default-post.jpg",
  },
};
```

When the project is forked for Europe, this file should be easy to change to something like:

```ts
export const siteConfig = {
  name: "Euro Summer",
  shortName: "Euro",
  domain: "eurosummer.com",

  hero: {
    title: "My Euro Summer",
    subtitle:
      "A personal blog following summer study in London and adventures around Europe.",
  },

  theme: {
    vibe: "floral",
    primary: "pink",
  },

  map: {
    defaultCenter: [48.8566, 2.3522],
    defaultZoom: 4,
  },

  assets: {
    heroBadge: "/euro/hero-badge.png",
    backgroundAccent: "/euro/florals-bg.svg",
    defaultPostImage: "/euro/default-post.jpg",
  },
};
```

The goal is not to build both sites now. The goal is to make the Alaska version easy to fork later.

---

## Design Direction

Use the simplified Alaska mockup as the main visual target.

Recommended repo path:

```txt
docs/design-mockup.png
```

The homepage should feel:

- clean
- airy
- outdoorsy
- minimal
- polished
- easy to scan
- not crowded

Visual style:

- muted greens
- soft blues
- warm neutrals
- rounded cards
- subtle shadows
- serif headings
- clean sans-serif body text
- small nature accents
- mountain/tree visual language
- generous whitespace

The homepage should not show comments.

The homepage should include:

- top navigation
- hero intro
- featured post
- small stats summary
- recent posts
- map preview

---

## Pages

### 1. Homepage

Route:

```txt
/
```

The homepage should be a polished overview page.

Include:

- site navigation
- hero section
- featured post card
- “Summer at a Glance” stats card
- recent posts section
- map preview card

Do not include:

- comments
- comment form
- comment avatars
- comment moderation note

Comments should only appear on individual post detail pages.

Suggested homepage sections:

```txt
Hero
Featured Post
Summer at a Glance
Recent Posts
Places I’ve Been
```

---

### 2. Posts List Page

Route:

```txt
/posts
```

Show all posts.

Features:

- list/grid of post cards
- filter by category
- search by title, location, or body
- sort newest first by default
- link each card to its post detail page

Each post card should show:

- title
- category
- date
- location
- image if available
- short excerpt
- optional rating

---

### 3. New Post Page

Route:

```txt
/posts/new
```

Owner/admin-only page for creating a new post.

Fields:

- title, required
- slug, auto-generated from title but editable if practical
- category, required
- date, required
- location, optional
- latitude, optional
- longitude, optional
- rating, optional, 1–10
- cost, optional
- distance, optional
- body, required
- imageUrl, optional

After submit:

- validate input
- save to database
- redirect to the new post detail page

---

### 4. Post Detail Page

Route:

```txt
/posts/[slug]
```

Show the full post.

Display:

- title
- category
- date
- location
- image
- rating
- cost
- distance
- full body
- map preview if latitude/longitude exist
- approved comments
- guest comment form

This is where comments should live.

Comment section should include:

- approved comments
- name field
- comment body field
- submit button
- small note: “Comments are reviewed before going live.”

Visitors should only need to enter:

```txt
name
comment
```

No account should be required.

---

### 5. Edit Post Page

Route:

```txt
/posts/[slug]/edit
```

Owner/admin-only page for editing a post.

Allow editing all post fields.

After submit:

- validate input
- update database
- redirect to post detail page

---

### 6. Map Page

Route:

```txt
/map
```

Show a map with pins for posts that have latitude and longitude.

Use:

- Leaflet
- OpenStreetMap tiles

Map requirements:

- center defaults from `siteConfig.map`
- one marker per post with coordinates
- marker popup shows:
  - title
  - category
  - location
  - link to post detail page

If no posts have coordinates, show a helpful empty state.

---

### 7. Stats Page

Route:

```txt
/stats
```

Show simple aggregate stats.

Include:

- total posts
- count by category
- total hikes/trails
- total distance
- average rating
- highest-rated posts
- recent posts
- total food/coffee spots if possible

Keep stats simple for the MVP.

---

### 8. Admin Comments Page

Route:

```txt
/admin/comments
```

Owner/admin-only page.

Show pending comments.

Each pending comment should show:

- post title
- commenter name
- comment body
- created date
- approve button
- delete button

Approved comments should show publicly on their individual post pages.

---

## Navigation

Main navigation:

```txt
Home
Posts
Map
Stats
Add Post
```

Optional admin link can be hidden or placed separately:

```txt
/admin/comments
```

The public nav does not need to show admin links.

---

## Data Model

Use generic model names that work for both Alaska and the future Europe fork.

Prefer `Post` and `Comment`.

Recommended Prisma schema:

```prisma
model Post {
  id          String    @id @default(cuid())
  title       String
  slug        String    @unique
  category    String
  date        DateTime
  location    String?
  latitude    Float?
  longitude   Float?
  rating      Int?
  cost        Float?
  distance    Float?
  body        String
  imageUrl    String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  comments    Comment[]
}

model Comment {
  id        String   @id @default(cuid())
  postId    String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)

  name      String
  body      String
  approved  Boolean  @default(false)

  createdAt DateTime @default(now())
}
```

Use `category String` instead of a strict enum so the Europe fork can use different categories without a schema migration.

Example Alaska categories:

```txt
HIKE
TRAIL
FOOD
COFFEE
ACTIVITY
VIEWPOINT
INTERNSHIP
LIFE_UPDATE
OTHER
```

Example Europe categories later:

```txt
STUDY_ABROAD
CITY
COUNTRY
CAFE
MUSEUM
BEACH
TRAVEL_DAY
FOOD
OTHER
```

---

## Validation Rules

Post validation:

- `title` is required.
- `slug` is required and unique.
- `category` is required.
- `date` is required.
- `body` is required.
- `rating`, if provided, must be between 1 and 10.
- `cost`, if provided, must be greater than or equal to 0.
- `distance`, if provided, must be greater than or equal to 0.
- `latitude`, if provided, must be between -90 and 90.
- `longitude`, if provided, must be between -180 and 180.
- `imageUrl`, if provided, should be a valid URL or local public path.

Comment validation:

- `name` is required.
- `name` max length: 50 characters.
- `body` is required.
- `body` max length: 1000 characters.
- new comments default to `approved = false`.
- only approved comments display publicly.
- add a simple honeypot field to reduce spam.

---

## API / Server Requirements

Use Next.js App Router route handlers or server-side functions.

Recommended routes:

```txt
GET     /api/posts
POST    /api/posts
GET     /api/posts/[slug]
PUT     /api/posts/[slug]
DELETE  /api/posts/[slug]

GET     /api/posts/[slug]/comments
POST    /api/posts/[slug]/comments

GET     /api/admin/comments
PATCH   /api/admin/comments/[id]
DELETE  /api/admin/comments/[id]

GET     /api/stats
```

### GET /api/posts

Returns posts.

Support optional query params:

```txt
category
search
sort
```

Examples:

```txt
/api/posts?category=HIKE
/api/posts?search=coffee
```

### POST /api/posts

Creates a post.

Owner/admin-only.

Validate input before saving.

Return created post.

### GET /api/posts/[slug]

Returns one post by slug.

Include approved comments only.

Return 404 if not found.

### PUT /api/posts/[slug]

Updates a post.

Owner/admin-only.

Validate input before saving.

Return 404 if not found.

### DELETE /api/posts/[slug]

Deletes a post.

Owner/admin-only.

Return 404 if not found.

### POST /api/posts/[slug]/comments

Creates a guest comment.

Visitors submit:

```txt
name
body
```

New comment should be saved with:

```txt
approved = false
```

Return a success message telling the visitor the comment is awaiting approval.

### GET /api/admin/comments

Returns pending comments.

Owner/admin-only.

### PATCH /api/admin/comments/[id]

Approves or updates a comment.

Owner/admin-only.

Example body:

```ts
{
  approved: true
}
```

### DELETE /api/admin/comments/[id]

Deletes a comment.

Owner/admin-only.

### GET /api/stats

Returns stats for dashboard/stats page.

Example response shape:

```ts
{
  totalPosts: number;
  categoryCounts: Record<string, number>;
  averageRating: number | null;
  totalDistance: number;
  highestRatedPosts: Post[];
  recentPosts: Post[];
  pendingCommentCount?: number;
}
```

---

## Admin / Auth Requirements

Do not build full authentication for MVP.

Use a simple owner/admin approach.

Acceptable MVP option:

- admin password stored in `ADMIN_PASSWORD`
- simple password form for admin access
- protected server actions/routes for create/edit/delete posts and comment moderation

Required environment variable:

```txt
ADMIN_PASSWORD=
```

The implementation does not need to be enterprise-grade auth. It just needs to keep casual visitors from accessing admin actions.

---

## Environment Variables

Required:

```txt
DATABASE_URL=
ADMIN_PASSWORD=
```

Optional:

```txt
DIRECT_URL=
```

Create:

```txt
.env.example
```

Example:

```txt
DATABASE_URL="postgresql://USER:PASSWORD@HOST/dbname?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@HOST/dbname?sslmode=require"
ADMIN_PASSWORD="replace-me"
```

Do not commit real secrets.

---

## Project Structure

Recommended structure:

```txt
anchorage-summer/
  app/
    page.tsx
    layout.tsx
    globals.css

    posts/
      page.tsx
      new/
        page.tsx
      [slug]/
        page.tsx
        edit/
          page.tsx

    map/
      page.tsx

    stats/
      page.tsx

    admin/
      comments/
        page.tsx

    api/
      posts/
        route.ts
        [slug]/
          route.ts
          comments/
            route.ts
      admin/
        comments/
          route.ts
          [id]/
            route.ts
      stats/
        route.ts

  components/
    CommentForm.tsx
    CommentList.tsx
    FeaturedPost.tsx
    MapView.tsx
    Navbar.tsx
    PostCard.tsx
    PostForm.tsx
    RecentPosts.tsx
    StatCard.tsx
    StatsPanel.tsx

  docs/
    design-mockup.png

  lib/
    auth.ts
    prisma.ts
    site-config.ts
    stats.ts
    validations.ts

  prisma/
    schema.prisma
    migrations/
    seed.ts

  public/
    alaska/
      hero-badge.png
      default-post.jpg
      mountains-bg.svg

  README.md
  REQUIREMENTS.md
  AGENTS.md
```

---

## CSS / Theme Requirements

Use CSS variables for theme colors so the app is easy to fork later.

Example Alaska theme:

```css
:root {
  --background: #faf8f2;
  --foreground: #17211b;
  --primary: #255c45;
  --primary-soft: #dcebe2;
  --accent: #7fa48d;
  --card: #ffffff;
  --border: #e5ded2;
}
```

Use these variables throughout the UI rather than hardcoding colors everywhere.

Future Europe theme can swap variables:

```css
:root {
  --background: #fffaf7;
  --foreground: #3a2d2a;
  --primary: #d96b7c;
  --primary-soft: #f8dce2;
  --accent: #b8a38d;
  --card: #ffffff;
  --border: #eadbd2;
}
```

---

## Seed Data

Create optional seed data for local development.

Example Alaska posts:

- Flattop Mountain Trail
- Moose’s Tooth Pizza
- Tony Knowles Coastal Trail
- Kaladi Brothers Coffee
- Byron Glacier Overlook
- Kincaid Park

Seed data should include:

- title
- slug
- category
- date
- location
- latitude/longitude when possible
- rating
- distance when applicable
- body
- imageUrl if available

---

## Homepage Content Requirements

The homepage should show:

### Hero

- circular Alaska-inspired badge/image
- `siteConfig.hero.title`
- `siteConfig.hero.subtitle`

### Featured Post

Show one highlighted post.

Prefer:

- latest post
- or highest-rated post
- or manually selected featured post later

For MVP, latest post is fine.

### Summer at a Glance

Show three main stats:

- total posts
- hikes/trails
- total miles

### Recent Posts

Show three recent posts.

Do not show comments here.

### Map Preview

Show posts with coordinates.

---

## Post Detail Comment Requirements

Comments should only appear on individual post pages.

On `/posts/[slug]`, show:

- approved comments
- guest comment form
- moderation note

Comment form fields:

```txt
Your name
Leave a comment
```

Submit button:

```txt
Post Comment
```

After submit, show a message like:

```txt
Thanks! Your comment will appear after it is approved.
```

---

## Non-Goals

Do not build these unless explicitly requested:

- full user accounts
- visitor login/signup
- profiles
- followers
- likes
- direct messages
- notifications
- complex image uploads
- cloud image storage
- Google Maps API
- Mapbox billing/API setup
- separate Express backend
- mobile app
- payments
- multi-tenant hosting
- advanced CMS

---

## Acceptance Criteria

The MVP is complete when:

- The owner can create posts.
- The owner can edit posts.
- The owner can delete posts.
- Visitors can view the homepage.
- Visitors can browse all posts.
- Visitors can view individual post pages.
- Visitors can leave comments on individual post pages only.
- New comments are hidden until approved.
- The owner can approve or delete pending comments.
- The homepage does not show comments.
- Posts and comments are stored in Neon Postgres.
- Prisma is used for database access.
- The map displays posts with coordinates.
- The stats page shows simple aggregate data.
- The app uses Bun.
- The app can be deployed to Vercel.
- The app uses environment variables for secrets.
- The layout broadly follows `docs/design-mockup.png`.
- The code avoids hardcoding Alaska-specific values outside `siteConfig` and seed data where practical.

---

## Implementation Order

Build in this order:

1. Create Next.js project with TypeScript.
2. Set up Bun.
3. Set up Tailwind CSS.
4. Add `REQUIREMENTS.md`, `AGENTS.md`, and `docs/design-mockup.png`.
5. Add `lib/site-config.ts`.
6. Add CSS theme variables.
7. Set up Prisma.
8. Connect Prisma to Neon Postgres.
9. Create `Post` and `Comment` models.
10. Run the first migration.
11. Create `lib/prisma.ts`.
12. Create validation helpers.
13. Build post CRUD routes/server actions.
14. Build post form.
15. Build create post page.
16. Build posts list page.
17. Build post detail page.
18. Add guest comments to post detail pages.
19. Add admin comment moderation.
20. Build homepage without comments.
21. Build stats helpers and stats panel.
22. Build map component with Leaflet.
23. Build map page.
24. Build stats page.
25. Add seed data.
26. Polish responsive styling.
27. Run build/lint.
28. Deploy to Vercel.
29. Add environment variables in Vercel.
30. Test production deployment.

---

## Future Fork Plan: Euro Summer

After Anchorage Summer is working:

1. Duplicate/fork the repo.
2. Rename project to `euro-summer`.
3. Change `lib/site-config.ts`.
4. Swap CSS theme variables to floral/pink palette.
5. Replace assets in `public/euro`.
6. Change map defaults to Europe.
7. Replace seed data with Europe posts.
8. Update domain/deployment settings.
9. Keep the same post/comment/map/stats architecture.

The Europe fork should not require a major rewrite.

---

## README Requirements

The README should include:

- project name
- short description
- tech stack
- features
- screenshots section
- design mockup reference
- database setup
- environment variables
- local development setup
- Prisma commands
- deployment notes
- future Euro Summer fork plan

---

## Suggested Resume Bullet

```txt
Built a reusable full-stack personal travel blog using Next.js, TypeScript, PostgreSQL, Prisma, and Leaflet, featuring owner-managed posts, guest comments with moderation, geospatial map visualization, dashboard analytics, and theme/config structure for future site forks.
```

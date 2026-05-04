# AGENTS.md

## Project Mission

This repo is for **Anchorage Summer**, a personal travel blog / mini-social web app.

The app documents a summer internship in Anchorage, Alaska through posts, maps, stats, and individual post comments.

Build the Alaska version first, but structure it as a reusable travel blog base that can later be forked into a separate **Euro Summer** travel blog.

Do not overengineer the first version.

---

## Read First

Before making changes, read:

```txt
REQUIREMENTS.md
docs/design-mockup.png
```

Use `REQUIREMENTS.md` as the source of truth for product scope.

Use `docs/design-mockup.png` as the visual target for the Alaska homepage.

---

## Tech Stack

Use:

- Next.js with App Router
- TypeScript
- Bun
- PostgreSQL
- Prisma
- Neon
- Vercel
- Tailwind CSS
- Leaflet/OpenStreetMap

Do not add:

- Express
- Firebase
- Supabase
- MongoDB
- Google Maps API
- Mapbox
- Clerk
- NextAuth/Auth.js
- OAuth
- full user accounts

Unless the user explicitly asks for one of those, keep the stack simple.

---

## Package Manager Rules

Use Bun.

Preferred commands:

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

## Product Scope

The MVP includes:

- homepage
- posts list
- post detail pages
- create/edit/delete posts for the owner
- guest comments on individual post pages only
- comment moderation
- map page
- stats page
- simple admin comments page
- reusable site config for future fork

The homepage must not show comments.

Comments belong only on:

```txt
/posts/[slug]
```

---

## Visitor Behavior

Visitors can:

- view the homepage
- browse posts
- view individual post pages
- view map and stats
- leave comments on post pages by entering name + comment

Visitors cannot:

- create accounts
- log in
- create posts
- edit posts
- like posts
- follow users
- send messages

---

## Owner/Admin Behavior

The owner can:

- create posts
- edit posts
- delete posts
- approve comments
- delete comments

Use a simple admin/password approach for MVP.

Do not build full auth unless explicitly requested.

Use:

```txt
ADMIN_PASSWORD
```

from environment variables.

---

## Reusability Rules

Build Anchorage Summer first, but keep the app fork-friendly.

Avoid hardcoding site-specific copy inside components.

Use:

```txt
lib/site-config.ts
```

for:

- site name
- domain
- hero title
- hero subtitle
- map center
- map zoom
- theme metadata
- asset paths

Good:

```ts
siteConfig.hero.title
siteConfig.map.defaultCenter
siteConfig.assets.heroBadge
```

Avoid:

```tsx
<h1>My Anchorage Summer</h1>
```

inside reusable components when the value should come from config.

It is okay for seed data and example content to be Alaska-specific.

---

## Naming Rules

Use generic model/component names:

Good:

```txt
Post
Comment
PostCard
PostForm
MapView
StatsPanel
siteConfig
```

Avoid:

```txt
AlaskaPost
HikeEntry
AnchorageLocation
```

The future Europe fork should be able to reuse most components.

---

## Database Rules

Use Prisma.

Use generic models:

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

Use `category String` rather than a strict enum so future forks can define their own categories.

---

## Comment System Rules

Comments are only for individual post pages.

Do not show comments on the homepage.

Do not show comment forms on the homepage.

Guest comments should require only:

```txt
name
body
```

New comments must default to:

```ts
approved: false
```

Only approved comments should be visible publicly.

Add validation:

- name required
- name max 50 characters
- body required
- body max 1000 characters

Add a simple honeypot field if practical.

---

## Design Rules

Follow the simplified Alaska design mockup.

Visual direction:

- clean
- airy
- outdoorsy
- minimal
- soft green/blue/neutral palette
- rounded cards
- subtle shadows
- serif headings
- clean body text
- generous whitespace

Do not make the homepage crowded.

Homepage should include:

- nav
- hero
- featured post
- stats summary
- recent posts
- map preview

Homepage should not include:

- comments
- comment form
- comment avatars
- admin/moderation notes

---

## Theme Rules

Use CSS variables so the app can be forked and rethemed later.

Example:

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

Avoid hardcoding theme colors repeatedly inside components.

---

## Routing Rules

Recommended public routes:

```txt
/
 /posts
 /posts/[slug]
 /map
 /stats
```

Recommended owner/admin routes:

```txt
/posts/new
/posts/[slug]/edit
/admin/comments
```

Recommended API routes:

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

Use route handlers or server actions as appropriate.

---

## File Organization

Prefer this structure:

```txt
app/
components/
lib/
prisma/
public/
docs/
```

Important files:

```txt
lib/prisma.ts
lib/site-config.ts
lib/validations.ts
lib/stats.ts
lib/auth.ts
```

Important components:

```txt
Navbar.tsx
PostCard.tsx
FeaturedPost.tsx
PostForm.tsx
CommentForm.tsx
CommentList.tsx
MapView.tsx
StatCard.tsx
StatsPanel.tsx
RecentPosts.tsx
```

Keep components small, readable, and reusable.

---

## Implementation Order

Build in phases:

1. Project setup
2. Tailwind setup
3. site config
4. theme variables
5. Prisma setup
6. Post and Comment models
7. post CRUD
8. public post list/detail pages
9. comments on post detail pages
10. admin comment moderation
11. homepage without comments
12. map page
13. stats page
14. seed data
15. UI polish
16. deployment cleanup

Do not start with advanced features.

---

## Validation and Error Handling

Validate all writes before saving to the database.

Return reasonable error messages and status codes.

Handle:

- missing posts
- invalid form data
- failed database requests
- empty post lists
- no map coordinates
- no pending comments

Add user-friendly empty states.

---

## Build and Quality Checks

Before considering work complete, run:

```bash
bun run build
bun run lint
```

Also check:

- no TypeScript errors
- Prisma client generated
- imports are valid
- homepage renders without comments
- post detail pages render comments
- map does not crash when there are no coordinates
- empty states are acceptable
- mobile layout is not broken

---

## Environment Variables

Use:

```txt
DATABASE_URL=
ADMIN_PASSWORD=
```

Optional:

```txt
DIRECT_URL=
```

Create `.env.example`.

Never commit real secrets.

---

## Non-Goals

Do not add these unless explicitly requested:

- full user accounts
- visitor login/signup
- OAuth
- followers
- likes
- direct messages
- notifications
- complex image uploads
- Cloudinary/S3
- Google Maps
- Mapbox
- separate Express backend
- mobile app
- payment features
- multi-tenant SaaS architecture

---

## Future Fork: Euro Summer

After Anchorage Summer works, the repo can be duplicated for Euro Summer.

The fork should mainly require:

- changing `lib/site-config.ts`
- changing CSS theme variables
- replacing assets
- replacing seed data
- changing map center/zoom
- changing domain/deployment settings

Avoid architecture choices that make the Europe fork require a full rewrite.

---

## Coding Style

Prefer:

- simple readable code
- clear names
- typed functions
- small components
- server-side database access where appropriate
- minimal dependencies
- comments only where they clarify non-obvious logic

Avoid:

- clever abstractions
- large rewrites
- unnecessary packages
- hardcoded theme/copy values
- deeply nested component trees
- premature optimization

---

## Final Response Behavior

When summarizing changes, mention:

- what changed
- files touched
- any commands that need to be run
- any environment variables needed
- any known limitations

Keep explanations concise.

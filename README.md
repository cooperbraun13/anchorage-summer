# Anchorage Summer

A small Next.js travel blog for documenting a summer in Anchorage, Alaska.

## Local Setup

Install dependencies:

```bash
bun install
```

Create `.env` from `.env.example` and fill in:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/dbname?sslmode=verify-full"
DIRECT_URL="postgresql://USER:PASSWORD@HOST/dbname?sslmode=verify-full"
ADMIN_PASSWORD="replace-me"
BLOB_READ_WRITE_TOKEN="vercel-blob-read-write-token"
```

Generate Prisma Client and run the app:

```bash
bunx prisma generate
bun run dev
```

If the database has not been migrated yet:

```bash
bunx prisma migrate dev
bunx prisma db seed
```

## Vercel Blob Setup

Post images are stored in Vercel Blob. The app uploads owner-selected images to paths like:

```txt
posts/{slug}-{random-id}-{filename}
```

To create/link Blob storage:

1. Open the project in Vercel.
2. Go to **Storage**.
3. Select **Create Database**.
4. Choose **Blob**.
5. Create a new Blob store for images.
6. Link it to this project and the environments you use.
7. Make sure Vercel adds `BLOB_READ_WRITE_TOKEN` to the project environment variables.

For local development, pull Vercel env vars or copy the token into `.env`:

```bash
vercel env pull
```

or manually add:

```env
BLOB_READ_WRITE_TOKEN="..."
```

## Image Uploads

The owner can upload a post image when creating or editing a post. Uploads accept:

```txt
JPEG
PNG
WebP
AVIF
```

Images must be 4 MB or smaller. If no image is uploaded, the post can keep an empty `imageUrl` or use a manually entered public image URL.

## Deploying

Before deploying on Vercel, set these environment variables:

```txt
DATABASE_URL
DIRECT_URL
ADMIN_PASSWORD
BLOB_READ_WRITE_TOKEN
```

Then deploy normally through Vercel. After changing environment variables, redeploy so the app receives the new values.

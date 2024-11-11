#!/bin/sh

# Wait for the PostgreSQL database to be ready
until nc -z db 5432; do
  echo "Waiting for PostgreSQL..."
  sleep 2
done

# Run Prisma migration and seeding
npx prisma migrate deploy
npx prisma db seed

# Start the application
npm run dev

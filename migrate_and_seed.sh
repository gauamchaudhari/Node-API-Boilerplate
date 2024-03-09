#!/bin/bash

# Run database migrations
echo "Running migrations..."
docker-compose exec app npx knex migrate:latest

# Seed the database
echo "Seeding database..."
docker-compose exec app npx knex seed:run

echo "Migration and seeding complete."

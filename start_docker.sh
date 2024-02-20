#!/bin/bash

# Load environment variables from the backend .env file
set -a
source backend/.env
set +a

# Map backend .env variables to those expected by PostgreSQL
export POSTGRES_USER=$DB_USER
export POSTGRES_PASSWORD=$DB_PASSWORD
export POSTGRES_DB=$DB_NAME
export POSTGRES_PORT=$DB_PORT

# Now run docker-compose
docker-compose up

#!/bin/sh
touch .env
echo "POSTGRES_DB="$(cat /run/secrets/postgres_db_name) >> .env
echo "POSTGRES_USER="$(cat /run/secrets/postgres_db_user) >> .env
echo "POSTGRES_PASSWORD="$(cat /run/secrets/postgres_db_password) >> .env
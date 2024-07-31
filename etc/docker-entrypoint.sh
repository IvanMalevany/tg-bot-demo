#!/usr/bin/env bash

set -e

echo TARGET_DB_URL=$TARGET_DB_URL

npx sequelize-cli --url $TARGET_DB_URL db:migrate
npm run start:prod

"$@"
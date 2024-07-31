#!/usr/bin/env bash

set -e

if [ -f .env ]; then
    source .env
fi

if ! docker network ls | grep -q $TARGET_DOCKER_NETWORK; then
    docker network create $TARGET_DOCKER_NETWORK
fi

DOCKER_OPTIONS='--env-file .env'

for FILE in $(find "docker/services" -maxdepth 1 -type f -name '*.yml' -print);do
  DOCKER_OPTIONS="$DOCKER_OPTIONS -f $FILE"
done

docker-compose $DOCKER_OPTIONS up -d --wait
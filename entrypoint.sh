#!/bin/sh

set -ex
echo $DATABASE_URL
pnpm db:latest 
pnpm command create-user
pnpm start
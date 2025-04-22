#! /bin/bash

GIT_BRANCH="main"
PATH_TO_REPO="/var/www/highschool-turbo"

PATH_TO_WEB="${PATH_TO_REPO}/apps/web"
PATH_TO_ADMIN="${PATH_TO_REPO}/apps/admin"
PATH_TO_LANDING="${PATH_TO_REPO}/apps/landing"

PM2_COMMAND="/usr/local/bin/pm2"
cd ${PATH_TO_REPO}

git fetch origin ${GIT_BRANCH}

LOCAL_GIT_HASH=$(git rev-parse HEAD)
REMOTE_GIT_HASH=$(git rev-parse origin/${GIT_BRANCH})

if [ "$LOCAL_GIT_HASH" = "$REMOTE_GIT_HASH" ]; then
    echo "Local git hash matches remote git hash, no need to pull"
    exit 0
fi

cd ${PATH_TO_REPO}
git checkout ${GIT_BRANCH}
git reset --hard HEAD
git pull origin ${GIT_BRANCH}

echo "Pulled code"

# ✅ Install all dependencies at the root (for all apps/packages)
echo "Installing dependencies from monorepo root"
pnpm install

# 🔁 Restart each app
for APP_PATH in "$PATH_TO_WEB" "$PATH_TO_ADMIN" "$PATH_TO_LANDING"; do
  echo "cd to ${APP_PATH}"
  cd ${APP_PATH}

  echo "Restarting PM2 for this app"
  $PM2_COMMAND restart ecosystem.config.js --update-env
done

$PM2_COMMAND save

echo "Done"

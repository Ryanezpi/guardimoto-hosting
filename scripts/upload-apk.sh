#!/usr/bin/env bash
set -euo pipefail

APK_LOCAL="public/thesis-app.apk"
APK_REMOTE="gs://guard-imoto-project.firebasestorage.app/app/guardimoto-app.apk"

if [ ! -f "$APK_LOCAL" ]; then
  echo "APK not found at $APK_LOCAL" >&2
  exit 1
fi

# Upload and make publicly readable
# Requires: gsutil and gcloud auth

gsutil -o "GSUtil:parallel_process_count=1" -m cp -a public-read "$APK_LOCAL" "$APK_REMOTE"

# Ensure correct file handling in browsers
gsutil setmeta \
  -h "Content-Type:application/vnd.android.package-archive" \
  -h "Content-Disposition:attachment; filename=guardimoto-app.apk" \
  -h "Cache-Control:public, max-age=3600" \
  "$APK_REMOTE"

echo "Uploaded to: $APK_REMOTE"
echo "Public URL: https://storage.googleapis.com/guard-imoto-project.firebasestorage.app/app/guardimoto-app.apk"

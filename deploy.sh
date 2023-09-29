#!/bin/bash

# Menjalankan git pull dari branch 'development' di repository remote 'origin'
git pull origin development

# Melakukan build aplikasi
yarn build

# Menjalankan untuk live
yarn preview --host 0.0.0.0

#!/bin/bash

# Build all packages
yarn build

# Copy the packages we want to publish with desired url name
cp -R packages/carsharing/build gh-pages-config/carsharing

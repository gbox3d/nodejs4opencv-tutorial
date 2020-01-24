#!/bin/sh -e


cvVersion="3.4.4"
# Save current working directory
cwd=$(pwd)

# Create directory for installation
mkdir installation
mkdir installation/OpenCV-"$cvVersion"

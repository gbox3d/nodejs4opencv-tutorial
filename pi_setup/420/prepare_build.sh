#!/bin/sh -e

#sudo apt-get -y update
#sudo apt-get -y upgrade



# 기본 도구
sudo apt-get -y install build-essential cmake

sudo apt-get -y install libjpeg-dev libtiff5-dev libjasper-dev libpng12-dev

sudo apt-get -y install libavcodec-dev libavformat-dev libswscale-dev libxvidcore-dev libx264-dev libxine2-dev

sudo apt-get -y install libv4l-dev v4l-utils

sudo apt-get -y install libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev 

sudo apt-get -y install libgtk2.0-dev

sudo apt-get -y install mesa-utils libgl1-mesa-dri libgtkgl2.0-dev libgtkglext1-dev   
sudo apt-get -y install libatlas-base-dev gfortran libeigen3-dev

# python
sudo apt-get -y install python2.7-dev python3-dev python-numpy python3-numpy

# download source
# wget -O opencv.zip https://github.com/opencv/opencv/archive/4.1.2.zip
# wget -O opencv_contrib.zip https://github.com/opencv/opencv_contrib/archive/4.1.2.zip

# unzip opencv.zip
# unzip opencv_contrib.zip

git clone https://github.com/opencv/opencv.git
cd opencv
git checkout 4.2.0
cd ..
 
git clone https://github.com/opencv/opencv_contrib.git
cd opencv_contrib
git checkout 4.2.0
cd ..



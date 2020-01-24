#!/bin/sh -e

cmake -D CMAKE_BUILD_TYPE=RELEASE \
            -D CMAKE_INSTALL_PREFIX=/usr/local \
            -D WITH_TBB=ON \
            -D WITH_V4L=ON \
            -D OPENCV_EXTRA_MODULES_PATH=../../opencv_contrib/modules \
            ..

make -j$(nproc)
make install

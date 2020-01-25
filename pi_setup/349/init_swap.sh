#!/bin/sh -e

# let change 'CONF_SWAPSIZE=2048'
sudo vim /etc/dphys-swapfile

#restart service
sudo /etc/init.d/dphys-swapfile restart



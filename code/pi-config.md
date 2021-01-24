Mount ssd and set appropriate permissions.

https://core-geth.org/setup-on-raspberry-pi

Add to fstab:
UUID="myUUID" /mnt/ssd ext4 nosuid,nodev,nofail,auto 0 0

https://github.com/ethereum/go-ethereum/issues/22043

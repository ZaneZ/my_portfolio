#! /bin/bash

set -x
set -e

source /home/vagrant/src/setup/utils.sh
MY_NAME=$(whoami)
USER='vagrant'

function main() {
    if [ $MY_NAME = 'root' ]; then
        su $USER;
    fi

    os_type
    print_tty 'Installing Docker to $OS_NAME...'
    if [ $OS_NAME = 'Ubuntu' ]; then
        set +e
        sudo $INSTALLER remove docker docker-engine docker.io
        set -e
        sudo $INSTALLER update -y
        sudo $INSTALLER install -y linux-image-extra-$(uname -r) linux-image-extra-virtual
        sudo $INSTALLER update -y
        sudo $INSTALLER install -y apt-transport-https ca-certificates curl software-properties-common
        sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
        sudo apt-key fingerprint 0EBFCD88
        sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
        sudo $INSTALLER update -y
        sudo $INSTALLER install -y docker-ce
    fi
    sudo usermod -aG docker $USER
}

main

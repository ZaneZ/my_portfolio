#! /bin/bash

set -x
set -e

OS_NAME=""
INSTALLER=""
LINUX_RELEASE_NAME=$1
MY_LOC=$(pwd)

ls -ltr

pwd

source $MY_LOC/setup/utils.sh

function install_npm(){
    print_tty "Install NPM"
    sudo $INSTALLER install -y npm
    if [ ! $? = 0 ]
    then
        print_tty "Cannot install NPM."
        exit 2
    fi
}

function install_n(){
    print_tty "Install n"
    sudo npm install -g n
    if [ ! $? = 0 ]
    then
        print_tty "Cannot install n"
        exit 2
    fi
}

function install_node(){
    print_tty "Install NodeJS"
    n lts
    if [ ! $? = 0 ]
    then
        print_tty "Cannot install node"
        exit 2
    fi
}

function install_mongo(){
    print_tty "Install MongoDB"
    if [ $OS_NAME = 'Ubuntu' ]
    then
        sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
        echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
        sudo apt-get update
        sudo apt-get install -y mongodb-org
    else
        print_tty "Cannot install Mongo on this OS. Stop at here."
        exit 3
    fi
}

function initialize_mongo(){
    print_tty "Drop sample data to MongoDB"
    db_name='resume'
    collection_profile='profile'
    collection_education='education'
    collection_profession='profession'
    path_base="$MY_LOC/lib/models/json"
    for collection in $collection_profile $collection_education $collection_profession; do
        mongoimport --db $db_name --collection $collection --type json --file $path_base"/"$collection".json"
    done
}

function main(){
    if [ -z $LINUX_RELEASE_NAME ]; then
        os_type
    else
        set_installer $LINUX_RELEASE_NAME
    fi
    install_npm
    install_n
    install_node
    install_mongo
    initialize_mongo
    print_tty "Installation Ready."
}

# ------- Main -------
main


#! /bin/bash

set -x
set -e

OS_NAME=""
INSTALLER=""

function print_tty() {
    content=$1
    time=$(date)
    echo $time" - "$content
}

function os_type() {
    OS_NAME=`lsb_release -a 2>/dev/null | grep -Pio '(Centos|Ubuntu)' | head -1`
    if [ -z $OS_NAME ]
    then 
        print_tty "Cannot determine linux distribution."
        exit 1
    fi
    
    print_tty "OS is "$OS_NAME

    if [ $OS_NAME = 'Ubuntu' ]
    then
        INSTALLER='apt-get'
    elif [ $OS_NAME = 'Centos' ]
    then
        INSTALLER='yum'
    else
        print_tty "Unrecognized os Name "$OS_NAME
        exit 1
    fi
}

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
    path_base='/home/vagrant/src/lib/models/json'
    for collection in $collection_profile $collection_education $collection_profession; do
        mongoimport --db $db_name --collection $collection --type json --file $path_base"/"$collection".json"
    done
}

function main(){
    os_type
    install_npm
    install_n
    install_node
    install_mongo
    initialize_mongo
    print_tty "Installation Ready."
}

# ------- Main -------
main


#! /bin/bash

# This is a library that helps to prepare the virtual box into a working linux
# box to host the Porfolio micro-service server.


function print_tty() {
    content=$1
    time=$(date)
    echo $time" - "$content
}

function set_installer() {
    if [ $1 = 'Ubuntu' ]; then
        INSTALLER='apt-get'
    elif [ $1 = 'Centos' ]; then
        INSTALLER='yum'
    else
        print_tty "Cannot get installer for OS "$OS_NAME
        exit 1
    fi
}

function os_type() {
    OS_NAME=`lsb_release -a 2>/dev/null | grep -Pio '(Centos|Ubuntu)' | head -1`
    if [ -z $OS_NAME ]
    then
        print_tty "Cannot determine linux distribution."
        exit 1
    fi

    print_tty "OS is "$OS_NAME
    set_installer $OS_NAME
}


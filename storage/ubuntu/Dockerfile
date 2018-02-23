# This is a docker builder for Mongo db over ubuntu. It will use vagrant to build the docker bin.
# The docker image will be pushed to cloud when finished.

FROM ubuntu

MAINTAINER Zane Zhang

WORKDIR /src

ADD . /src

RUN apt-get update
RUN apt-get install -y npm curl wget apt-transport-https
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5 
RUN echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.6 multiverse" | tee -a /etc/apt/sources.list.d/mongodb-org-3.6.list

RUN apt-get update
RUN apt-get install -y mongodb-org

VOLUME "/var/log"

CMD ["/usr/bin/mongod", "--config", "/etc/mongod.conf"]

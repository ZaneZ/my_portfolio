FROM ubuntu

MAINTAINER Zane Zhang

WORKDIR /src

ADD . /src

RUN apt-get update
RUN apt-get install -y npm curl wget apt-transport-https
RUN npm install -g n
RUN n lts

RUN cd /src; npm install

# Initialize MongoDB
RUN mongoimport --db resume --collection profile --type json --file "/src/lib/models/json/profile.json"
RUN mongoimport --db resume --collection education --type json --file "/src/lib/models/json/education.json"
RUN mongoimport --db resume --collection profession --type json --file "/src/lib/models/json/profession.json"

EXPOSE 8081

CMD ["/usr/local/bin/node", "/src/server.js"]

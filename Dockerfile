FROM ubuntu

RUN apt-get update

RUN export DEBIAN_FRONTEND=noninteractive

RUN apt-get install -y tzdata

RUN ln -fs /usr/share/zoneinfo/America/Guayaquil /etc/localtime 

RUN dpkg-reconfigure -f noninteractive tzdata

FROM node:alpine

WORKDIR /MS

COPY .babelrc ./

COPY package*.json ./

RUN npm install -g npm@

RUN npm install

COPY . .

CMD ["npm", "start"]
# base image
FROM node:9.6.1

# set working directory
WORKDIR /usr/src/common
# install and cache app dependencies
COPY common/package.json /usr/src/common/package.json
RUN npm install --silent

COPY common/ /usr/src/common/

# set working directory
WORKDIR /usr/src/deliveryService
# install and cache app dependencies
COPY deliveryService/package.json /usr/src/deliveryService/package.json
RUN npm install --silent

COPY deliveryService/ /usr/src/deliveryService/

# start app
CMD ["npm", "start"]
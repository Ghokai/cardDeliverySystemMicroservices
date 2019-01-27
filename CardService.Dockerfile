# base image
FROM node:9.6.1

# set working directory
WORKDIR /usr/src/common
# install and cache app dependencies
COPY common/package.json /usr/src/common/package.json
RUN npm install --silent

COPY common/ /usr/src/common/

# set working directory
WORKDIR /usr/src/cardService
# install and cache app dependencies
COPY cardService/package.json /usr/src/cardService/package.json
RUN npm install --silent

COPY cardService/ /usr/src/cardService/

# start app
CMD ["npm", "start"]
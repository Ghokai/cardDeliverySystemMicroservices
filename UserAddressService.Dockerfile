# base image
FROM node:9.6.1

# set working directory
WORKDIR /usr/src/common
# install and cache app dependencies
COPY common/package.json /usr/src/common/package.json
RUN npm install --silent

COPY common/ /usr/src/common/

# set working directory
WORKDIR /usr/src/userAddressService
# install and cache app dependencies
COPY userAddressService/package.json /usr/src/userAddressService/package.json
RUN npm install --silent

COPY userAddressService/ /usr/src/userAddressService/

# start app
CMD ["npm", "start"]
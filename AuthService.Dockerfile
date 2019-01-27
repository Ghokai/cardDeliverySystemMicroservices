# base image
FROM node:9.6.1

# set working directory
WORKDIR /usr/src/common
# install and cache app dependencies
COPY common/package.json /usr/src/common/package.json
RUN npm install --silent

COPY common/ /usr/src/common/

# set working directory
WORKDIR /usr/src/authService
# install and cache app dependencies
COPY authService/package.json /usr/src/authService/package.json
RUN npm install --silent

COPY authService/ /usr/src/authService/

# start app
CMD ["npm", "start"]
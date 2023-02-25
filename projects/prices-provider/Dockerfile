# Build Stage 1
# This build created a staging docker image
#
FROM node:18-alpine AS appbuild
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
RUN ["npm", "run", "build"]

# Build Stage 2
# This build takes the production build from staging build
#
FROM node:18-alpine as apprunner
COPY --from=appbuild /usr/src/app/node_modules ./node_modules
COPY --from=appbuild /usr/src/app/dist ./dist
EXPOSE 3000
ENTRYPOINT ["node", "./dist/index.js"]
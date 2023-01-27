FROM node:14-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Specify the command to run when the container starts
CMD [ "yarn", "start" ]

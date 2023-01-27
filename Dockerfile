FROM node:alphine

RUN mkdir -p /src/server
WORKDIR /src/server

COPY package.json yarn.lock ./
# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Specify the command to run when the container starts
CMD [ "yarn", "start" ]

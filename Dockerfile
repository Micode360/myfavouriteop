FROM node:14-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy the entrypoint script
COPY ./docker-entrypoint.sh .

# Make the script executable
RUN chmod +x /usr/src/app/docker-entrypoint.sh

# Set the script as the entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]

COPY package.json yarn.lock ./
# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Specify the command to run when the container starts
CMD [ "yarn", "start" ]

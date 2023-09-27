# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install the application dependencies inside the container
RUN npm install

# If you are building your code for production
RUN npm ci --omit=dev

# Bundle the application source inside the container
COPY . .

# Expose port 3000 to have it mapped by Docker daemon
EXPOSE 3000

# Define the command to run the application
CMD [ "node", "server.js" ]

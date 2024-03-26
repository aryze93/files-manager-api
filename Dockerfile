# Use the official Node.js image
FROM node:20.11.1-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set the environment variable for the port
ENV PORT=3000

# Expose the port
EXPOSE $PORT

CMD npm run build && npm run start:prod
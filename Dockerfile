# Use an existing Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Remove the devDependencies
RUN npm prune --production

# remove all not needed files
RUN rm -rf Dockerfile src tsconfig.json package.json package-lock.json

# Expose port 3000 to receive incoming requests
EXPOSE 3000

# Set the command to start the server
CMD [ "node", "dist/index.js" ]
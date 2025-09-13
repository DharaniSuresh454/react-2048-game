# Step 1: Use Node.js image to build the React app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Build the React app
RUN npm run build

# Step 2: Use Nginx to serve the React build files
FROM nginx:alpine

# Copy build output to Nginx default HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
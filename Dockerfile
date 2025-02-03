# Use Node.js as the base image
FROM node:22.13.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 5173

# Run the Reeact app
CMD ["npm", "run", "dev"]

# Use the official Node.js image as base
FROM node:latest

# Set working directory within the container
WORKDIR /SkyGate_Prototype

# Copy package.json and package-lock.json for backend
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy backend source code
COPY . .

# Build backend
RUN npm run

# Set working directory for frontend
WORKDIR /SkyGate_Prototype/frontend

# Copy package.json and package-lock.json for frontend
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source code
COPY frontend/src ./src
COPY frontend/public ./public

# Build frontend
RUN npm run

# Set working directory to root
WORKDIR /website

# Expose port 3000 for backend
EXPOSE 3000

# Expose port 3001 for frontend
EXPOSE 3001

# Start both backend and frontend
CMD ["npm", "start"]

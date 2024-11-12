# Use Node.js 18 Alpine image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY ../package.json ../package-lock.json ./

# Copy tsconfig.json to ensure TypeScript configuration is available
COPY ../tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the entire src directory, including app, models, and pages
COPY ./src ./src

# Copy the Prisma and lib directories, and .env file (if used)
COPY ./prisma ./prisma
COPY ./lib ./lib
COPY .env ./.env
COPY ./public ./public

# Expose port 3000 (default for Next.js)
EXPOSE 3000

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js app for production
RUN npm run build

# Start the app in production mode
CMD ["npm", "run", "start"]

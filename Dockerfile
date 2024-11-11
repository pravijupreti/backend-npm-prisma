# Use Node.js 18 Alpine image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY ../package.json ../package-lock.json ./

# Copy tsconfig.json to ensure TypeScript configuration is available
COPY ../tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the source code into the container (./src directory)
COPY ./src ./src

# Copy the Prisma and lib directories, and .env file (if used)
COPY ./prisma ./prisma
COPY ./lib ./lib
COPY .env ./.env
COPY ./pages ./pages
COPY ./public ./public

# Expose port 3000 (default for Next.js)
EXPOSE 3000

RUN npx prisma generate

# Run the Next.js app in development mode
CMD ["npm", "run", "dev"]

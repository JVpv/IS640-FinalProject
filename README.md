# Password Update Web Application

This project is a simple web form GUI written in React to change a user's password, integrated with a PostgreSQL database inside a Docker container through a TypeScript Restful API, complete with error handling middleware, password hashing, and security measures against DoS and SQL Injection attacks.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Docker
- Node.js
- npm (Node Package Manager)
- Yarn (optional)

## Getting Started

To run this project, follow these steps:

### Step 1: Navigate to the project folder

Open three terminal windows inside the project folder. One window will be used for running the Web Application, one will run the backend API, and the third will run the Docker container with the database.

### Step 2: Install modules

Run either of the following commands in one of your terminal windows to install the required libraries:

```
yarn install
```

or

```
npm install
```

Every yarn command can be replaced by an npm one, but personally, I like yarn more. It is not needed to run the project, however.

### Step 3: Docker

To run docker for the first time, run the command:

```
docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

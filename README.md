# Chat Management System

This project is a full-stack chat management system built with a React frontend and an Express backend, along with MongoDB for data storage.

---

## Table of Contents

- [Chat Management System](#chat-management-system)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Cloning the Project](#cloning-the-project)
  - [Frontend (Client) Setup](#frontend-client-setup)
  - [Backend (Server) Setup](#backend-server-setup)
  - [Development](#development)
  - [Running the Application](#running-the-application)
  - [Scripts](#scripts)
  - [License](#license)

---

## Prerequisites

- **Node.js** (v20.6.0 or higher) installed on your system (required to support the `--env-file` and `--watch` options in your backend scripts)
- **MongoDB** instance or MongoDB Atlas setup
- **npm** or **yarn** package manager

---

## Cloning the Project

You can clone this repository from GitHub using the following command:

```bash
git clone https://github.com/deividas-butkus/galutinis-projetas-CA.git
```

After cloning the repository, follow the setup instructions below for both the frontend and backend.

---

## Frontend (Client) Setup

### Tech Stack

- React
- React Router DOM
- Material UI
- Styled Components
- Vite (for development)

### Steps to Run the Frontend

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. The app will run by default at `http://localhost:5173` unless otherwise configured.

---

## Backend (Server) Setup

### Tech Stack

- Express
- MongoDB
- CORS
- Environment variables

### Requirements

- **Node.js v20.6.0 or higher**: This version is required to support the `--env-file` and `--watch` options in the development script.

### Steps to Run the Backend

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the provided `.env.example` file and rename it to `.env`:

   ```bash
   cp .env.example .env
   ```

4. Change the provided `.env.example` file to `.env`and update it with your configuration details:

   ```ini
   SERVER_PORT=5001
   CLIENT_PORT=5173
   DB_USER=<your_db_username>
   DB_PASSWORD=<your_db_password>
   DB_CLUSTER=<your_cluster_name>
   DB_NAME=<your_database_name>
   ```

   Ensure that your MongoDB credentials and cluster information are filled in correctly.

5. Run the backend server:

   ```bash
   npm run dev
   ```

6. The backend server will run on `http://localhost:5001` by default.

---

## Development

### Folder Structure

- `client/src/components`:

  - `atoms`: Contains reusable components like `Avatar`, `Button`, `Counter`and others.
  - `molecules`: Contains reusable components like `ChatCard`, `MessageCard`, `InputWithLabels` and others.
  - `organisms`: Contains specific main components like `Chat`, `Chats`, `Contacts`, and others, which are wrapped with `Footer`, and `Header` in `App` routes using `templates` folder containing `Layout`.

- `server/src/routes`: Contains Express routes like `users.js`, `chats.js`, `messages.js` for handling API requests.

---

## Running the Application

1. Ensure both frontend and backend servers are running:

   - Frontend at `http://localhost:5173`
   - Backend at `http://localhost:5001`

2. The client communicates with the server for book-related data using REST APIs.

---

## Scripts

### Frontend:

- `npm run dev`: Runs the Vite development server.
- `npm run build`: Builds the production-ready files.

### Backend:

- `npm run dev`: Runs the Express backend server using the `.env` configuration.

---

## License

This project is licensed under the ISC License.

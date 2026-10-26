# Techno-Shop

A full-stack technology e-commerce application built with React, Spring Boot, and MySQL.

## Features

- Browse technology products
- Product details and quick-view interface
- Shopping cart
- User registration and login
- Order management and order history
- Payment flow interface
- Integrated music player
- Interactive 3D capabilities

## Tech Stack

**Frontend**
- React 19
- Vite 8
- React Router
- Three.js
- React Three Fiber

**Backend**
- Java 25
- Spring Boot 4
- Spring Data JPA
- Bean Validation
- Maven

**Database**
- MySQL

## Project Structure

```text
techno-shop/
├── front/       # React frontend
├── back/        # Spring Boot backend
└── README.md
```

## Requirements

- Node.js and npm
- Java 25
- MySQL

## Getting Started

### 1. Configure MySQL

Create a database named `tech`.

The backend reads its database configuration from environment variables:

- `DB_URL` — optional; defaults to the local `tech` database
- `DB_USERNAME` — optional; defaults to `root`
- `DB_PASSWORD` — required

Never commit database passwords or private database dumps.

### 2. Start the Backend

On macOS or Linux, open a terminal:

```bash
cd back
export DB_PASSWORD='your_mysql_password'
./mvnw spring-boot:run
```

Replace `your_mysql_password` with your local MySQL password.

The backend uses port `8080` by default.

### 3. Start the Frontend

Open a second terminal:

```bash
cd front
npm install
npm run dev
```

Open the local URL displayed by Vite.

## API Configuration

The frontend API base URL is configured in `front/public/api.js`.

Set it to the address where the backend is accessible. Use `http://localhost:8080` when the browser and backend run on the same computer. For mobile testing, use the computer's reachable local-network IP address.

## Development Notes

- The payment interface may require a separate payment gateway integration for production use.
- Local database dumps and backup files are excluded from the repository.
- This project is under active development.

## License

No license has been specified yet.

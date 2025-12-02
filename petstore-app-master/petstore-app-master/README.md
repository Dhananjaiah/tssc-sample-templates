# Petstore Application

This repository contains a Pet Store application. Follow the instructions below to run the application using Docker Compose.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/petstore-app.git
cd petstore-app
```

2. Start the application using Docker Compose:
```bash
docker compose up --build
```

3. To stop the application:
```bash
docker compose down
```

## Services

The application includes the following services:
- Web Frontend
- API Backend
- Database

Access the application at `http://localhost:5173`

## Development

For development purposes, you can use:
```bash
docker compose -f docker-compose.dev.yml up -d
```
# WordleSolver

**WordleSolver** is a web application designed to help users easily solve Wordle puzzles through an intuitive and user-friendly interface. The project consists of two separate parts: the frontend and backend, both housed in the same repository.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Frontend](#frontend)
- [Backend](#backend)
- [Contributing](#contributing)
- [License](#license)

## Features

- User-friendly interface for solving Wordle puzzles.
- Clear separation of frontend and backend for ease of development and maintenance.
- Fast and responsive design built using React and Vite.
- Backend API implemented with Express and SQLite.

## Technologies

### Frontend:
- **React**
- **TypeScript**
- **Vite**
- **Axios**

### Backend:
- **Node.js** with **Express**
- **SQLite**
- **Zod**

## Installation

To set up this project locally, follow the steps below:

### 1. Clone the repository:
```bash
git clone https://github.com/yourusername/WordleSolver.git
cd WordleSolver
```

### 2. Frontend Installation:
Navigate to the `frontend` folder and install dependencies:
```bash
cd frontend
npm install
```

### 3. Backend Installation:
Go to the `backend` directory and install required packages:
```bash
cd backend
npm install
```

## Frontend

### Available Scripts:

- `npm run dev`: Start the frontend development server.
- `npm run build`: Build the project for production.
- `npm run preview`: Preview the built application.

## Backend

### Available Scripts:

- `npm run tsc`: Compile TypeScript files.
- `npm run start`: Start the backend server using Node.js.
- `npm run test`: Run the backend tests (currently not specified).

The backend uses **Express** to create a RESTful API that interacts with an SQLite database.

## Checklist for first version
  - [ ] Mejorar el algoritmo de recomendación de palabras.
  - [ ] Realizar pruebas unitarias para asegurar que el algoritmo funcione correctamente en varios escenarios.
  - [x] Terminar la refactorización completa del código del backend a TypeScript.
  - [x] Implementar validaciones exhaustivas utilizando Zod u otras herramientas.
  - [ ] Agregar a Github Actions pruebas unitarias automatizadas y Lint.

## Contributing

Contributions are welcome! Feel free to fork this repository, make changes, and open a pull request. Please ensure all code follows best practices and is well-documented.

## License

This project is licensed under the ISC License.

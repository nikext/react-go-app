# Go + React Application

This is a simple Go + React application. Follow the instructions below to get started.

## Prerequisites

Make sure you have the following installed on your machine:

- [Go](https://golang.org/doc/install)
- [Node.js](https://nodejs.org/) (which includes npm)

## Getting Started

### Backend (Go)

1. Clone the repository:

   ```sh
   git clone https://github.com/nikext/react-go-app.git
   cd react-go-app
   ```

2. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   # .env
   PORT=4000
   MONGODB_URI=your_mongodb_uri
   MODE=development
   ```

3. Install Go dependencies:

   ```sh
   go mod tidy
   ```

4. Run the Go server:
   ```sh
   go run main.go OR air
   ```

### Frontend (React)

1. Navigate to the `client` directory:

   ```sh
   cd client
   ```

2. Install Node.js dependencies:

   ```sh
   npm install
   ```

3. Start the React development server:
   ```sh
   npm run dev
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

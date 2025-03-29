# UrlShortenerAPI

This API is a basic implementation of how a TinyURL backend might work.

## Getting Started

### Clone the Repository
```bash
git clone https://github.com/mtcsrht/UrlShortenerAPI.git
cd UrlShortenerAPI
```

### Set Up Environment Variables
1. Copy the `.env.example` file and rename it to `.env`:
    ```bash
    cp .env.example .env
    ```
2. In the `.env` file, you will find the following environment variables:
    - `PORT`: Specifies the port the server should use (default is `3000`).
    - `MONGO_URL`: Specifies the MongoDB connection string.

### Install Dependencies
Run the following command to install the required Node.js modules:
```bash
npm install
```

### Start the Server
Start the server by running:
```bash
npm run start
```

## API Endpoints

### Base URL
The API can be accessed at `http://localhost:3000/url`.

### Endpoints

#### 1. **GET** `/url/{short_code}`
- Retrieves the original URL associated with the given short code.
- Response: A JSON object containing the original URL.

#### 2. **POST** `/url`
- Creates a new short code for a given URL.
- Request Body (JSON):
  ```json
  {
        "url": "http://randomdomain.com"
  }
  ```
- Response: A JSON object containing the generated short code for the provided URL.

#### 3. **DELETE** `/url/{short_code}` *(Work in Progress)*
- Intended to delete the object associated with the given short code from the database.
- Response: An HTTP status code indicating the result of the operation.

---

Feel free to contribute or report issues to improve this project!

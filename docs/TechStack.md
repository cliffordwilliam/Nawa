# Tech stack

## 1. Express
- **Description:** A web application framework for Node.js.
- **Purpose:** Simplifies the process of building robust and scalable web applications. Provides features for routing, middleware, and handling HTTP requests and responses.

## 2. pg
- **Description:** A PostgreSQL library for Node.js applications.
- **Purpose:** Allows interaction between the Node.js application and the PostgreSQL database. PostgreSQL is chosen for its performance, extensibility, and support for complex queries.

## 3. Sequelize
- **Description:** An Object-Relational Mapping (ORM) library for Node.js.
- **Purpose:** Simplifies database interactions by providing abstractions over SQL queries. Enables the definition of database models using JavaScript.

## 4. jsonwebtoken
- **Description:** A library for generating and verifying JSON Web Tokens (JWT).
- **Purpose:** Used for user authentication and authorization. Enables secure transfer of claims between the client and server.

## 5. dotenv
- **Description:** A module that loads environment variables from a `.env` file.
- **Purpose:** Enhances security by keeping sensitive information, such as database connection strings and API keys, outside of the codebase.

## 6. bcrypt
- **Description:** A password hashing function.
- **Purpose:** Ensures secure storage of user passwords by hashing them before storing in the database.

## 7. Multer
- **Description:** Middleware for handling `multipart/form-data`.
- **Purpose:** Facilitates file uploads in the application, allowing users to upload profile pictures or other relevant files.

## 8. ImageKit
- **Description:** An image optimization and delivery service.
- **Purpose:** Manages image processing, optimization, and delivery in the application, enhancing the handling of user profile pictures and other image-related content.

## Development dependencies:

- **nodemon**
  - **Description:** A development utility that monitors for changes in files and automatically restarts the server.
  - **Purpose:** Facilitates a smoother development workflow by automatically restarting the server during code changes.

- **sequelize-cli**
  - **Description:** Command-line interface for Sequelize, providing commands for database migrations, model creation, etc.
  - **Purpose:** Assists in managing database-related tasks during development, such as creating and migrating database models.

- **jest**
  - **Description:** Delightful JavaScript Testing Library.
  - **Purpose:** Facilitates the testing of JavaScript code, enabling the creation of robust and reliable test suites for applications.

- **supertest**
  - **Description:** Super-agent driven library for testing HTTP assertions.
  - **Purpose:** Enables testing of HTTP requests and assertions, providing a convenient way to verify the behavior of web applications' APIs.

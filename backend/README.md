## Description

Restful service based on [Nest](https://github.com/nestjs/nest) framework written in TypeScript based on PostreSQL database.

Service supports three endpoints:

#### 1. POST {BASE_URL}/api/register

- **Authentication**: Anonymous
- **Specifications**:
  - If successfull: create a new User in the DB.

#### API Request Example

Here is an example of the request payload for registering a new user:

```http
POST /api/register
Content-Type: multipart/form-data;

firstName: John
lastName: Doe
email: johndoe@gmail.com
password: test123
role: admin
active: true
photos: /Users/name/Downloads/firstImage.png
photos: /Users/name/Downloads/secondImage.jpeg
photos:/Users/name/Downloads/thirdImage.png
photos:/Users/name/Downloads/fourthImage.png
```

#### 2. POST {BASE_URL}/api/login

- **Authentication**: Anonymous
- **Specifications**:
  - Log in an existing Client with email and password.

```http
{
   "email": "johndoe@gmail.com",
   "password": "test123"
}
```

- If successful, return a JWT token.

#### 3. GET {BASE_URL}/api/users/me

- **Authentication**: Must be authenticated as a User.
- **Specifications**:
  - Retrieve "relevant" Client details.
  - An authentication token is mandatory.

```http
Request Headers
Authorization Bearer {access_token}
```

## Running the app

**Create `.env` file and populate variables (example of env file can be found in the root `.env.example`)**

```bash
# start
$ npm run docker:up

# stop
$ npm run docker:down
```

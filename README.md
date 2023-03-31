## Setup

### Dependencies

- Go to project directory (cd GROMEAL). Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called what you want (xxxxx): `create database gromeal`
- Add (or verify) a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
DB_HOST=localhost
DB_NAME=gromeal
DB_USER=root
DB_PASS=root
```

- Run `npm run migrate` in the project folder of this repository (GROMEAL), in a new terminal window. This will create 3 tables called 'users', 'plans' and 'recipes' in your database.

- Make sure you understand how each table is constructed. In your MySQL console, you can run `use gromeal;` and then `describe users;` or `describe plans;` or `describe recipes;` to see the structure of the students table.

### Development

- Run `npm start` in project directory (my-express-app) to start the Express server on port 5000
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.

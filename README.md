## GROMEAL APP

<img src="./Gromeal_Thumbnail.PNG" alt="Alt text" title="GroMeal">

GrenGrab is an app that aims to be a sustainable tool, to avoid food waste, as to plan and organize your weekly meals and provide a shopping list with all the needed ingredients(including total quantity).

## Features:

- Create a meal Plan for your week
1. Add meals
     - Filter the meal search by : 
          -> Dish type (Soup, dessert, breakfast, lunch, snack, etc)
          -> Cuisine (Italian, French, etc)
          -> Diet type (Gluten free, vegetarian, vegan, etc)
     - Browse the meal's recipes
     - Select a recipe to check the details : Ingredients, Preparation steps and preparation time
     - Select the day, the meal(breakfast, lunch or dinner) and Serving(Number of persons)
     - add the recipe to your week

2. Edit your Weekly Plan
- Create an account to personalize your plans and recover a previous week plan created

<video src="https://github.com/immatte/3_Collaboration_GroMeal/assets/121168439/b4192166-1c6c-4eaa-ab72-b24e4e8c1463" title="GroMeal Video">
Your browser does not support the video tag.
</video>

## Setup

### Dependencies

- Go to project directory (cd GROMEAL). Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).
- Specific dependencies :
     + Progress bar : `cd client` and run `npm install @mui/material @emotion/react @emotion/styled`
     + Saving PDF : `cd client` and run `npm install jspdf --save` 
     + Pop-up notifications : `cd client` and run `npm install --save react-toastify`, run 'yarn add react-toastify'

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

- Make sure you understand how each table is constructed. In your MySQL console, you can run `use gromeal;` and then `describe users;` or `describe plans;` or `describe recipes;` or `describe list;` to see the structure of the students table.

### Development

- Run `npm start` in project directory (my-express-app) to start the Express server on port 5000
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.

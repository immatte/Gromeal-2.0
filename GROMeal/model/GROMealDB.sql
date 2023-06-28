SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS comparative;
DROP TABLE IF EXISTS meals;
DROP TABLE IF EXISTS weekdays;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS plans;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS list;
SET FOREIGN_KEY_CHECKS = 1;


-- TABLE for Users
CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL
);

-- user1 has password pass1 (etc)
INSERT INTO users (username, password, email)
VALUES 
    ('Marta','$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W','Marta@acme.com'),
    ('Clara','$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6','Clara@acme.com'),
    ('Laura','$2b$12$tiAz4eaXlpU.CdltUVvw6udLA2BWsitk5zXM2XOm2IpAeAiFfMCdy','Laura@acme.com'),
    ('Isabelle','$2b$12$HF7mO4.LZh5aQLjmFimRbOc22VX.abiNwHA7E/dd1g2OyloySKCY2','IsaRight@email.com');


-- TABLE for Weekly Plannings
CREATE TABLE plans (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    plan_title VARCHAR(200) NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO plans (plan_title, user_id)
VALUES 
    ('MARCH PLANNING', 1);

-- TABLE for Saved Recipes
CREATE TABLE recipes (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    API_id INT,
    recipe_title VARCHAR(200) NOT NULL,
    recipe_image VARCHAR(200) NOT NULL,
    servings INT,
    meal_type VARCHAR(20) NOT NULL,
    plan_id INT,
    week_day VARCHAR(20) NOT NULL,
    FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE
);

INSERT INTO recipes (API_id, recipe_title, recipe_image, servings, meal_type, plan_id, week_day)
VALUES 
    (657579, "Quick Chicken Enchilada Soup", "https://spoonacular.com/recipeImages/657579-556x370.jpg", 4, "lunch", 1, "monday"),
    (657579, "Quick Chicken Enchilada Soup", "https://spoonacular.com/recipeImages/657579-556x370.jpg", 4, "lunch", 1, "friday"),
    (635113, "Black Forest Mini Cheesecakes", "https://spoonacular.com/recipeImages/635113-556x370.jpg", 4, "dinner", 1, "tuesday");

-- TABLE for Shopping Lists
CREATE TABLE list (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(200) NOT NULL,
    amount INT,
    unit VARCHAR(20) NOT NULL,
    plan_id INT,
    FOREIGN KEY (plan_id) REFERENCES plans(id)
);

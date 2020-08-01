# API documentation for Cooper's Home Furniture

#### 1️⃣ Backend deployed at [heroku](https://coopers-furniture.herokuapp.com/) <br>

## 1️⃣ Getting started

To get the server running locally:


- Clone this repo
- **yarn install** to install all required dependencies
- **yarn server** to start the local server
- **yarn test** to start server using testing environment

### Backend framework 
  
Node/Express js
- Uses Javascript to build web server.
- Light-weight web application framework to help organize web application into an MVC architecture
- Express makes building REST API simpler

# API endpoints

The API publishes the following endpoints to: `https:/coopers-furniture.herokuapp.com/`. Except for unprotected `Product` routes, all routes are protected, requiring `Authorization` header to be set with a valid token produced by OAuth flow, set only the token with no prefix:

#### Admin Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/admin/users` | admin      | Returns the information for all users that have signed up for Cooper's Home Furniture. |
| DELETE | `/admin/delete/:id` | admin         | Delete an existing user.                      |

| POST    | `/admin/addproduct` | admin      | Returns a 201 status if a new product was added successfully. |
| PUT    | `/admin/:id` | admin         | Modify an existing product.             |
| DELETE | `/admin/deleteprod/:id` | admin         | Delete an existing product.                      |

| GET    | `/admin/agents` | admin      | Returns the information for all agents that have signed up for Cooper's Home Furniture. |

#### User Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/user/:firebase_id`        | authenticated user | Returns info for a single user.                    |
| GET    | `/user/:id/cart`        | authenticated user | Returns a list of items that are available in a user's cart.                    |
| POST   | `/user/register` | none               | Creates a new user. |
| PUT   | `/user/:id` | authenticated user              | Modify an existing user. |
| POST   | `/user/add-to-cart/:id` | authenticated user               | Adds a product to a userts cart. |
| DELETE | `/user/removerfromcart/:id` | authenticated user         | Delete an existing item from a user's cart.  
| DELETE | `/user/:id` | admin, authenticated user         | Delete an existing user.                      |

#### Agents Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/agent/:firebase_id`        | authenticated agent | Returns info for a single agent.                    |
| POST   | `/agent/addagent` | none               | Creates a new agent. |  

#### Orders Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/order`        | admin | Returns all orders.                    |
| GET    | `/order/:id/`        | admin, authenticated user, authenticated agents | Returns info for a single order.                    |
| POST   | `/order/place-order` | admin, authenticated user, authenticated agent               | Creates a new order. |
| GET   | `/order/agent/:agent_id` | authenticated agent              | Returns a list of orders belong to a single agent. |

#### Products Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/`        | none | Returns a list of all products.                    |
| GET    | `/product/:id`        | none | Returns info for a single products.                    |
| GET    | `/product/?col=catergory&filter=livingroom`        | none | Returns a list of products based on the query parameters.                    |
| GET  | `/products/category/:cat` | none | Returns a list of products based on the category. |

# Data Model

🚫This is just an example. Replace this with your data model

## USERS
---

```
user {
  id: INT,
  email: STRING,
  firebase_id: STRING,
  first_name: STRING,
  last_name: STRING,
  address: STRING,
  city: STRING,
  state: STRING,
  zip: STRING,
  phone: STRING,
  admin: BOOLEAN,
  agent: BOOLEAN
}
```

## AGENTS
---

```
agent  {
  id: INT,
  agent_id: STRING,
  commission: FLOAT,
  cash_app_name: STRING
}
```
## CART
---

```
cart {
  id: INT
  firebase_id: foreign key reference firebase_id in USER table
}
```
## CART ITEMS
---

```
 cart_items [
  {
    id: INT,
    cart_id: foreign key reference firebase_id in CART table
    product_id: foreign key reference firebase_id in CART table
    quantity: FLOAT,
    price: FLOAT,
    image_id: foreign key reference firebase_id in IMAGES table,
    color_id: foreign key reference firebase_id in COLORS table,
  }
]
```
## PRODUCTS
---

```
products [
  {
    id: INT,
    title: STRING,,
    price: FLOAT,
    description: STRING,
    category: STRING,
    quantity: INT,
    item_number: STRING,
    item_name: STRING,
    item_price: STRING,
    supplier: STRING,
    out_of_stock: BOOLEAN,
    back_in_stock: STRING,
  }
]
```
## IMAGES
---

```
images {
    id: INT,
    image_url: STRING,
    product_title: foreign key reference title in PRODUCTS table
}
```

## COLORS
---

```
colors {
    id: INT,
    name: STRING,
    product_title: foreign key reference title in PRODUCTS table
}
```

## ORDERS
---

```
orders {
    order_total: FLOAT,
    customer_email: STRING,
    customer_first_name: STRING,
    customer_last_name: STRING,
    customer_address: STRING,
    customer_city: STRING,
    customer_state: STRING,
    customer_zip: STRING,
    customer_phone: STRING,
    status: ENUM,
    product_id: INT,    
}
```

## ORDER_ITEMS
---

```
order_items [ 
    {
        product_id: foreign key reference id in PRODUCTS table
        price: FLOAT,
        quantity: INT,
        price: FLOAT
        color_id: foreign key reference id in COLORS table,
        image_id: foreign key reference id in IMAGES table,
        order_id: foreign key reference id in ORDER table,
    },
]
```

## REVIEWS
---

```
reviews {
    title: STRING,
    content: STRING,
    rating: FLOAT,
    product_id: INT,
    firebase_id: STRING
}
```

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/labs-13-market-org/Front-End/blob/master/README.md) for details on the fronend of our project.
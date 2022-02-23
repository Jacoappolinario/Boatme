<p align="center">
  <img src="./.github/logo.svg" width="250px" />
</p>

<h1 align="center">Boatme</h1>
<p align="center">Boate is a boat rental company, which will operate throughout Brazil, with vessels in several locations, aiming to make the rental process quick and practical and within reach of everyone.</p>

<h3 align="center">
 <img src="https://img.shields.io/badge/By-Jac%C3%B3%20Apolin%C3%A1rio-blue">
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg" />
  </a>
</h3>

<br />

# 👷🏾‍♂️️ Installation
**You need to install [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/) first, then in order to clone the project via HTTPS, run this command:**

```git clone https://github.com/Jacoappolinario/Boatme.git```
**Install dependencies**

```yarn install```

Create your enviroment variables based on the examples of  ```.env.example```

```cp .env.example .env```

After copying the examples, make sure to fill the variables with new values.

**Setup a database**

Install [Postgres](https://www.postgresql.org/) to create a database or if you have [Docker](https://www.docker.com/) in your machine, fill the environment values related to database configurations and then run the following commands in order to create a postgres container.

```docker-compose up```

# 🏃🏾‍♂️️ Getting Started

Run the transactions in order to configure the database schema

```yarn typeorm migration:run```

Run the following command in order to start the application in a development environment:

```yarn dev:server```

# 📮️ Faq

**Question:** What are the tecnologies used in this project?

**Answer:** The tecnologies used in this project are [NodeJS](https://nodejs.org/en/) + [Express Framework](http://expressjs.com/en/) to handle the server and [TypeORM](https://typeorm.io/#/) 

# Author

👤 **Jacó Apolinário**

- Github: [@jacoappolinario](https://github.com/jacoappolinario)
- LinkedIn: [@jacoapolinario](https://www.linkedin.com/in/jacoapolinario/)

## Show your support
Give a ⭐️ if this project helped you!
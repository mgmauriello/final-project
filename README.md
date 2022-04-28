# Hear the World

A full stack web application for audio enthusiasts who want to share soundscapes/field-recordings around the world.

### The Why

Hear the World is an interactive and visual way for users to share recordings
that can be personal, interesting, inspirational, with others. Hearing the various
soundscapes from around the world can give an insight to be in the moment anywhere in the world.

## Technologies Used

- React.js
- JavaScript ES5/ES6
- React Bootstrap
- [React Google Maps](https://www.npmjs.com/package/@react-google-maps/api)
- Webpack
- Express.js
- Node.js
- PostgreSQL
- Babel
- Dotenv
- HTML5
- CSS3
- Heroku

## Live Demo

Try the application live at [https://hear-the-world.herokuapp.com/](https://hear-the-world.herokuapp.com/)

## Features

- User can view map of the world
- User can upload soundscpe
- User can add details to soundscape
- User can view stored soundscape marker on the map
- User can view the audio player progress bar
- User can geolocate their position in the world


## Preview

![View soundscape](assets/view-soundscape.gif)
![Submit soundscape](assets/submit-soundscape.gif)

## Development

### System Requirements

- Node.js 16 or higher
- NPM 8 or higher
- Postgres

### Getting Started

1. Clone the repository.

    ```shell
    git clone https://github.com/mgmauriello/hear-the-world.git
    cd hear-the-world
    ```

1. Install all dependencies with NPM.

    ```shell
    npm install
    ```

1. Make a copy of the .env.example file.

    ```shell
    cp .env.example .env
    ```

1. Start PostgreSQL

    ```shell
    sudo service postgresql start
    ```

1. Create a new database

    ```shell
   createdb hearTheWorld
    ```

1. Import the example database to postgreSQL

    ```shell
    npm run db:import
    ```

1. Optional: View the database if pgweb is installed

    ```shell
    pgweb --db=hearTheWorld
    ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```

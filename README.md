## Project

Happy is a project developed from the International Children's Day that takes place on October 12th.

The goal is to create an application where you can find and visit orphanages.

## Technologies

This project was developed with the following technologies:

- [Node.js 18.16.0](https://nodejs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [Leaflet](https://leafletjs.com)

## How To Use

> This project depends on [happy-platform-server](https://github.com/joeldorosarioo/happy-platform-server) to work correctly.

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org) installed on your computer.

From your command line:

```bash
# Clone this repository

$ git clone https://github.com/joeldorosarioo/happy-platform.git

$ cd happy-platform

# Install dependencies

$ yarn install

# Activate hooks

$ yarn husky install

# Start the Server

$ yarn start
```

## Configuration of Environment Variables

The project requires setting the following environment variable:

`REACT_APP_MAPBOX_ACCESS_TOKEN`: This environment variable is required to access Mapbox features. Make sure you get a valid access token from Mapbox and set it to the value of this environment variable.

### Configuring the Environment Variables

Follow the steps below to properly configure environment variables in your development environment:

1. Create an `.env` file in the root of the project.
2. Open the `.env` file and set the necessary environment variables. In the case of this project, add the following line:

```makefile
REACT_APP_MAPBOX_ACCESS_TOKEN=<your_token>
```

Be sure to replace `<your_token>` with the actual access token provided by Mapbox.

3. Save the `.env` file.

> Note: The .env file is usually added to the .gitignore file to prevent environment keys from being publicly shared.

## How to contribute

- Make a fork;
- Create a branck with your feature: `git checkout -b my-feature`;
- Commit changes: `git commit -m 'feat: My new feature'`;
- Make a push to your branch: `git push origin my-feature`.

After merging your receipt request to done, you can delete a branch from yours.

## License

This project is under the MIT license. See the [LICENSE](/LICENSE) for details.

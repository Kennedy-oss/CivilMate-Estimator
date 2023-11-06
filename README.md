# CivilMate Estimator

## Overview

CivilMate Estimator is a single-page application (SPA) designed for professionals in the civil engineering and construction field to estimate and record project costs, working hours, material usage, and perform quality assurance checks.

## Features

- Interactive forms for inputting project details, including hours and materials.
- Quality assurance checkpoints to maintain project standards.
- Data manipulation through a local server mimicking API behavior.

## Installation

To run CivilMate Estimator, follow these steps:

1. Clone the repository to your local machine.
2. Ensure that `Node.js` and `npm` are installed on your system.
3. Install `json-server` globally using `npm`:
    ```
    npm install -g json-server
    ```
4. Navigate to the project directory and start the local server:
    ```
    json-server --watch db.json
    ```
    This will serve your `db.json` file as a mock API on `http://localhost:3000`.
5. Open the `index.html` file in your browser to use the application.

## Development

- HTML5, CSS3, and JavaScript ES6+ are used for front-end development.
- A mock database, `db.json`, is included for local development without the need for an external API.
- Utilize modern JavaScript practices to ensure ES6+ compatibility.

## Usage

Upon opening the `index.html` file in a web browser, users can interact with the form elements to input and submit data. The submission will interact with the local JSON server to simulate API requests.

## Contributing

If you'd like to contribute to the project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## Licensing

The code in this project is licensed under MIT license.

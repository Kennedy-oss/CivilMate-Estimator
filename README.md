Introduction

CivilMate Estimator is a single-page application (SPA) designed for civil engineers and construction project managers to efficiently estimate project costs, track work hours, material usage, and ensure quality assurance compliance. Built with HTML, CSS, and JavaScript, it interfaces with a public API to facilitate real-time data exchange.

Setup

Prerequisites

A modern web browser (Chrome, Firefox, Edge, Safari)
A text editor or IDE (e.g., Visual Studio Code, Sublime Text)
Node.js and npm (optional, for package management)


Installation

Clone the repository or download the ZIP file and extract it to your local machine.

Navigate to the project directory.

cd path/to/CivilMate-Estimator
If you're using npm, install dependencies (if any).

npm install
Open the index.html file in a web browser to run the application.

Features

Single-page application with no redirects.

Real-time data communication with a public API using JSON format.

Asynchronous API interactions with JavaScript fetch.

Responsive design implemented with CSS Flexbox/Grid.

Event-driven interactions with JavaScript event listeners.

Usage

To estimate project costs, input hours and material usage in the provided form.

Review quality assurance checkpoints and submit them as part of the project compliance measures.

Use the "like" button for simple interaction, demonstrating the UI responsiveness.

Interact with the SPA without page reloads for a seamless user experience.

API Integration

The application integrates with the Apacta API for craftsmen.

Endpoint

https://app.apacta.com/api/v1

Authentication

API key query authentication is used.

API Capabilities

GET and POST requests to register work hours, material usage, and quality checks.

Handling of standard API responses and HTTP status codes.

Error handling for validation and API exceptions.

Development

This project uses good coding practices, including DRY principles and semantic HTML. For CSS styling, maintainability and accessibility were considered paramount.

Event Listeners

DOMContentLoaded for app initialization.

click for interactive buttons.

change for form inputs and control elements.

Contributing

To contribute to CivilMate Estimator, fork the repository, create a feature branch, and submit a pull request for review.

Support

For support, open an issue in the repository or contact the repository owner.

Author

CivilMate Estimator was developed by Kennedy Ogweno. For further information, please contact kennedy.onyango4@gmail.com.

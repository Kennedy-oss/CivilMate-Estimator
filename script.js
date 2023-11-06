// Replace 'your_api_key_here' with your actual API key from Apacta settings
const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://app.apacta.com/api/v1';

// Function to perform a GET request
async function getData(endpoint) {
    const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        handleApiError(error);
    }
}

// Function to perform a POST request
async function postData(endpoint, data) {
    const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        handleApiError(error);
    }
}

// Function to handle API errors
function handleApiError(error) {
    if (error instanceof Error) {
        console.error('API Error:', error.message);
    } else if (error.data && error.data.code === 422) {
        const validationErrors = error.data.errors;
        Object.keys(validationErrors).forEach((field) => {
            console.error(`Validation failed for ${field}: ${validationErrors[field].join(', ')}`);
            // Implement functionality to display these errors to the user
        });
    } else {
        console.error('An unknown error occurred:', error);
    }
}

// Example usage
// Ensure these calls are made in the appropriate event handlers or lifecycle methods
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the app or perform an initial data fetch
});

// Example event listener for a form submission
document.querySelector('#yourFormId').addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = {
        // Construct your data object based on the form inputs
    };
    const result = await postData('/yourEndpoint', data);
    if (result) {
        // Handle the successful result
    }
});


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit-button').addEventListener('click', handleSubmit);
    document.querySelectorAll('.input-field').forEach(input => {
        input.addEventListener('change', handleInputChange);
    });
});

function handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.target.form);
    // Process formData and make API request
    makeApiRequest(formData);
}

function handleInputChange(event) {
    // Logic for handling input change
}

function makeApiRequest(data) {
    // Perform the API request and update DOM accordingly
}

function updateDom(data) {
    // Update the DOM with data from the API
}

// main.js

document.addEventListener('DOMContentLoaded', function() {
    // Define the base URL for your local JSON Server API
    const apiUrl = 'http://localhost:3000';  // Default JSON Server URL

    // Function to handle form submissions
    function handleFormSubmit(event) {
        event.preventDefault();
        // Logic to collect form data and send to the server
        const formData = {
            // Populate with actual form data
            hours: document.getElementById('hoursInput').value,
            materials: document.getElementById('materialsInput').value,
            // Add more fields as necessary
        };

        // Call function to create a new record
        createRecord(formData);
    }

    // Function to create a new record in db.json
    function createRecord(data) {
        fetch(`${apiUrl}/records`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Update the DOM with new record or give user feedback
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    // Function to retrieve records from db.json
    function getRecords() {
        fetch(`${apiUrl}/records`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Logic to display records on the DOM
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // Function to update a record in db.json
    function updateRecord(id, data) {
        fetch(`${apiUrl}/records/${id}`, {
            method: 'PUT',  // or 'PATCH'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Logic to update the DOM
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    // Function to delete a record from db.json
    function deleteRecord(id) {
        fetch(`${apiUrl}/records/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(() => {
            console.log('Record deleted');
            // Logic to handle the UI after deletion
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    // Event listeners for your form
    document.querySelector('formSelector').addEventListener('submit', handleFormSubmit);

    // Call getRecords on load to populate the page with data
    getRecords();
});

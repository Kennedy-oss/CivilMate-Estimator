// main.js

document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost:3000';  // Default JSON Server URL

    // Function to handle form submissions
    function handleFormSubmit(event) {
        event.preventDefault();
        const formData = {
            hoursWorked: document.getElementById('hoursWorked').value,
            materialUsed: document.getElementById('materialUsed').value,
            quality: document.getElementById('quality').value, // Make sure this ID corresponds to a select or input field in your HTML for quality
        };

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
            displayMessage('Success: Record added', 'success');
            // Optionally: Insert logic to add the new record to a list on the page
        })
        .catch((error) => {
            displayMessage(`Error: ${error}`, 'error');
        });
    }

    // Function to display messages to the user
    function displayMessage(message, status) {
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = message;
        messageDiv.className = status; // Use these classes to style the message (e.g., color)
    }

    // Event listener for the form submission
    document.getElementById('workRegisterForm').addEventListener('submit', handleFormSubmit);

    // Call getRecords on load to populate the page with data
    getRecords();
});

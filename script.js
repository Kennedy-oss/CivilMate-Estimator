document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost:3000'; // Default JSON Server URL

    // Function to list all records
    function getRecords() {
        fetch(`${apiUrl}/records`)
        .then(response => response.json())
        .then(records => {
            const tableBody = document.getElementById('recordsTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear existing records
            records.forEach(record => {
                const row = tableBody.insertRow();
                row.insertCell(0).textContent = record.hoursWorked;
                row.insertCell(1).textContent = record.materialUsed;
                row.insertCell(2).textContent = record.quality;

                // Create Edit/Delete options
                const actionsCell = row.insertCell(3);
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.onclick = function() { editRecord(record.id); };
                actionsCell.appendChild(editButton);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = function() { deleteRecord(record.id); };
                actionsCell.appendChild(deleteButton);
            });
        })
        .catch(error => {
            displayMessage(`Error: ${error}`, 'error');
        });
    }

    // Function to handle form submissions
    function handleFormSubmit(event) {
        event.preventDefault();
        const formData = {
            hoursWorked: document.getElementById('hoursWorked').value,
            materialUsed: document.getElementById('materialUsed').value,
            quality: document.getElementById('quality').value,
        };

        createRecord(formData);
    }

    // Function to create a new record
    function createRecord(data) {
        fetch(`${apiUrl}/records`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(record => {
            displayMessage('Success: Record added', 'success');
            getRecords(); // Refresh the list with the new record
        })
        .catch((error) => {
            displayMessage(`Error: ${error}`, 'error');
        });
    }

    // Function to edit a record
    function editRecord(id) {
        // Logic to edit a record
        // This can involve displaying the record data in the form for editing,
        // or a separate modal/dialog for the user to update the record information
    }

    // Function to delete a record
    function deleteRecord(id) {
        fetch(`${apiUrl}/records/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            displayMessage('Record deleted successfully', 'success');
            getRecords(); // Refresh the list to reflect the deletion
        })
        .catch(error => {
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

    // Initial call to populate the table with records
    getRecords();
});

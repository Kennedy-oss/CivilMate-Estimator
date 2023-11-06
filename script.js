document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost:3000'; // Default JSON Server URL
    let isEditMode = false;
    let currentEditId = null;

    // Function to list all records
    function getRecords() {
        fetch(`${apiUrl}/records`)
            .then(response => response.json())
            .then(records => renderRecords(records))
            .catch(error => displayMessage(`Error: ${error}`, 'error'));
    }

    function renderRecords(records) {
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
            editButton.onclick = function() { editRecord(record); };
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() { deleteRecord(record.id); };
            actionsCell.appendChild(deleteButton);
        });
    }

    // Function to populate form with record's data for editing
    function populateFormForEdit(data) {
        document.getElementById('hoursWorked').value = data.hoursWorked;
        document.getElementById('materialUsed').value = data.materialUsed;
        document.getElementById('quality').value = data.quality;
        currentEditId = data.id;
        isEditMode = true;
    }

    // Function to handle form submissions
    function handleFormSubmit(event) {
        event.preventDefault();
        const formData = {
            hoursWorked: document.getElementById('hoursWorked').value,
            materialUsed: document.getElementById('materialUsed').value,
            quality: document.getElementById('quality').value,
        };

        if (isEditMode) {
            updateRecord(currentEditId, formData);
        } else {
            createRecord(formData);
        }
    }

    // Function to create or update a new record
    function createOrUpdateRecord(data, id = null) {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${apiUrl}/records/${id}` : `${apiUrl}/records`;

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(() => {
                displayMessage('Success: Record has been processed', 'success');
                resetForm();
                getRecords(); // Refresh the list with the new record
            })
            .catch((error) => {
                displayMessage(`Error: ${error}`, 'error');
            });
    }

    // Function to reset form and mode
    function resetForm() {
        document.getElementById('workRegisterForm').reset();
        isEditMode = false;
        currentEditId = null;
    }

    // Function to edit a record
    function editRecord(record) {
        populateFormForEdit(record);
    }

    // Function to update a record
    function updateRecord(id, data) {
        createOrUpdateRecord(data, id);
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

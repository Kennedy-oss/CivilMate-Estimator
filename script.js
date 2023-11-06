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
            displayMessage('Record added successfully', 'success');
            appendRecordToTable(record);
        })
        .catch(error => displayMessage(`Error: ${error}`, 'error'));
    }

    // Function to append a record to the table
    function appendRecordToTable(record) {
        const tableBody = document.getElementById('recordsTable').getElementsByTagName('tbody')[0];
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = record.hoursWorked;
        row.insertCell(1).textContent = record.materialUsed;
        row.insertCell(2).textContent = record.quality;
        const actionsCell = row.insertCell(3);
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() { editRecord(record); };
        actionsCell.appendChild(editButton);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() { deleteRecord(record.id); };
        actionsCell.appendChild(deleteButton);
    }

    function resetForm() {
        document.getElementById('workRegisterForm').reset();
        isEditMode = false;
        currentEditId = null;
    }

    function editRecord(record) {
        populateFormForEdit(record);
    }

    function updateRecord(id, data) {
        createOrUpdateRecord(data, id);
    }

    function deleteRecord(id) {
        fetch(`${apiUrl}/records/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            displayMessage('Record deleted successfully', 'success');
            getRecords(); // Refresh the list to reflect the deletion
        })
        .catch(error => displayMessage(`Error: ${error}`, 'error'));
    }

    function displayMessage(message, status) {
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = message;
        messageDiv.className = status; // Use these classes to style the message (e.g., color)
    }

    document.getElementById('workRegisterForm').addEventListener('submit', handleFormSubmit);

    getRecords();
});

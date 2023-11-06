document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost:3000/records'; // JSON Server URL pointing to records

    let isEditMode = false;
    let currentEditId = null;

    // Function to list all records
    function getRecords() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(records => renderRecords(records))
            .catch(error => displayMessage(`Error: ${error}`, 'error'));
    }

    // Function to render records to the table
    function renderRecords(records) {
        const tableBody = document.getElementById('recordsTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';
        records.forEach(record => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = record.hoursWorked;
            row.insertCell(1).textContent = record.materialUsed;
            row.insertCell(2).textContent = record.quality;
            addActions(row, record);
        });
    }

    // Function to add action buttons to table row
    function addActions(row, record) {
        const actionsCell = row.insertCell(3);
        const editButton = createButton('Edit', () => populateFormForEdit(record));
        actionsCell.appendChild(editButton);
        const deleteButton = createButton('Delete', () => deleteRecord(record.id));
        actionsCell.appendChild(deleteButton);
    }

    // Function to create a button element
    function createButton(text, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.onclick = onClick;
        return button;
    }

    // Function to handle form submissions
    function handleFormSubmit(event) {
        event.preventDefault();
        const formData = {
            hoursWorked: document.getElementById('hoursWorked').value,
            materialUsed: document.getElementById('materialUsed').value,
            quality: document.getElementById('quality').value,
        };

        const endPoint = isEditMode ? `${apiUrl}/${currentEditId}` : apiUrl;
        const method = isEditMode ? 'PUT' : 'POST';

        createOrUpdateRecord(formData, endPoint, method);
    }

    // Function to create or update a record
    function createOrUpdateRecord(data, endPoint, method) {
        fetch(endPoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(record => {
            const message = method === 'POST' ? 'Record added successfully' : 'Record updated successfully';
            displayMessage(message, 'success');
            resetForm();
            getRecords();
        })
        .catch(error => displayMessage(`Error: ${error}`, 'error'));
    }

    // Function to populate the form for editing
    function populateFormForEdit(record) {
        document.getElementById('hoursWorked').value = record.hoursWorked;
        document.getElementById('materialUsed').value = record.materialUsed;
        document.getElementById('quality').value = record.quality;
        currentEditId = record.id;
        isEditMode = true;
    }

    // Function to delete a record
    function deleteRecord(id) {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            displayMessage('Record deleted successfully', 'success');
            getRecords();
        })
        .catch(error => displayMessage(`Error: ${error}`, 'error'));
    }

    // Function to reset the form and exit edit mode
    function resetForm() {
        document.getElementById('workRegisterForm').reset();
        isEditMode = false;
        currentEditId = null;
    }

    // Function to display a status message
    function displayMessage(message, status) {
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = message;
        messageDiv.className = status;
    }

    getRecords();
});

// Listen for form submission outside of the 'DOMContentLoaded' event
document.getElementById('workRegisterForm').addEventListener('submit', handleForm

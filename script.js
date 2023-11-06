document.addEventListener('DOMContentLoaded', () => {
    // Function to load records from db.json and populate the table
    function loadRecords() {
        fetch('db.json')
            .then(response => response.json())
            .then(data => {
                const records = data.records;
                const tableBody = document.getElementById('recordsTableBody');
                // Clear existing table rows
                tableBody.innerHTML = '';
  
                // Iterate over each record and add a row to the table body
                records.forEach(record => {
                    let row = tableBody.insertRow();
                    row.insertCell(0).textContent = record.task;
                    row.insertCell(1).textContent = record.hours;
                    row.insertCell(2).textContent = record.materialsUsed;
                    row.insertCell(3).textContent = record.quality;
                });
            })
            .catch(error => console.error('Error loading records:', error));
    }
  
    // Function to handle form submission
    function handleFormSubmit(event) {
        event.preventDefault();
  
        const task = document.getElementById('task').value;
        const hours = document.getElementById('hours').value;
        const materialsUsed = document.getElementById('materialsUsed').value;
        const quality = document.getElementById('quality').value;
  
        // Here you would typically make a fetch POST request to your server
        // Since we don't have a server, we'll simulate adding to the table directly
        
        const tableBody = document.getElementById('recordsTableBody');
        let newRow = tableBody.insertRow();
        newRow.insertCell(0).textContent = task;
        newRow.insertCell(1).textContent = hours;
        newRow.insertCell(2).textContent = materialsUsed;
        newRow.insertCell(3).textContent = quality;
  
        // Reset the form
        document.getElementById('recordForm').reset();
    }
  
    // Load the records when the DOM is fully loaded
    loadRecords();
  
    // Add the event listener to the form for the submit event
    document.getElementById('recordForm').addEventListener('submit', handleFormSubmit);
  });
  

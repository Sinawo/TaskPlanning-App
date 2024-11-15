document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.querySelector('.task-list');
    if (!taskList) {
        console.error('Task list element not found');
        return;
    }

    // Fetch tasks
    fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data);

            if (!data || data.length === 0) {
                taskList.innerHTML = '<li>No tasks available</li>';
                return;
            }

            taskList.innerHTML = ''; // Clear existing tasks

            data.forEach(task => {
                const taskItem = document.createElement('li');

                // Create the inner HTML structure for the task item
                taskItem.innerHTML = `
                    <span class="task-title">${task.title}</span> 
                  
                    <div class="button-container">
                        <button class="edit-btn" data-id="${task.taskId}">Edit</button>
                        <button class="delete-btn" data-id="${task.taskId}">Delete</button>
                        <button class="view-btn" data-id="${task.taskId}">View Details</button>
                    </div>
                `;

                taskList.appendChild(taskItem);
            });

            // Add event listeners for the buttons
            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', async (event) => {
                    const taskId = event.target.dataset.id;
                    await updateTask(taskId);
                });
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    const taskId = event.target.dataset.id;
                    showDeleteConfirmation(taskId);
                });
            });

            document.querySelectorAll('.view-btn').forEach(button => {
                button.addEventListener('click', async (event) => {
                    const taskId = event.target.dataset.id;
                    await viewTaskDetails(taskId);
                });
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
});

// Function to update a task
async function updateTask(taskId) {
    const modal = document.getElementById("taskDetailsModal");
    const span = document.getElementsByClassName("close-btn")[0];

    try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
        const task = await response.json();

        // Populate the form with task details
        document.getElementById('title').value = task.title;
        document.getElementById('description').value = task.description;
        document.getElementById('startDate').value = task.startDate;
        document.getElementById('dueDate').value = task.dueDate;
        document.getElementById('assignedTo').value = task.assignedTo;
        document.getElementById('status').value = task.status;

        // Display the modal
        modal.style.display = "block";

        // Attach the submit event handler to the form
        const form = document.getElementById('taskDetailsForm');
        form.onsubmit = async function (event) {
            event.preventDefault(); // Prevent the default form submission

            const updatedTask = {
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                startDate: document.getElementById('startDate').value,
                dueDate: document.getElementById('dueDate').value,
                assignedTo: document.getElementById('assignedTo').value,
                status: document.getElementById('status').value
            };

            try {
                const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedTask)
                });

                if (response.ok) {
                    modal.style.display = "none";
                    location.reload(); // Reload the page to update the task list
                } else {
                    console.error('Error updating task:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating task:', error);
            }
        };

    } catch (error) {
        console.error('Error fetching task details:', error);
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Function to show delete confirmation modal
function showDeleteConfirmation(taskId) {
    const modal = document.getElementById("deleteConfirmationModal");
    const confirmBtn = document.getElementById("confirmDeleteBtn");
    const cancelBtn = document.getElementById("cancelDeleteBtn");
    const span = document.getElementsByClassName("close-btn")[1];

    // Display the modal
    modal.style.display = "block";

    // Confirm delete action
    confirmBtn.onclick = function () {
        deleteTask(taskId);
        modal.style.display = "none";
    }

    // Cancel delete action
    cancelBtn.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Function to delete a task
function deleteTask(taskId) {
    fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                location.reload(); // Reload the page to update the task list
            } else {
                console.error('Error deleting task:', response.statusText);
            }
        })
        .catch(error => console.error('Error deleting task:', error));
}

// Function to view task details
async function viewTaskDetails(taskId) {
    const modal = document.getElementById("viewDetailsModal");
    const span = document.getElementsByClassName("close-btn")[2];

    try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
        const task = await response.json();

        // Populate the modal with task details
        document.getElementById('viewTitle').innerText = task.title;
        document.getElementById('viewDescription').innerText = task.description;
        document.getElementById('viewStartDate').innerText = task.startDate;
        document.getElementById('viewDueDate').innerText = task.dueDate;
        document.getElementById('viewAssignedTo').innerText = task.assignedTo;
        document.getElementById('viewStatus').innerText = task.status;

        // Display the modal
        modal.style.display = "block";

    } catch (error) {
        console.error('Error fetching task details:', error);
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}



// Function to open the task creation modal
function showTaskModal() {
    const modal = document.getElementById('taskDetailsModal');
    modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('taskDetailsModal');
    modal.style.display = 'none';
}

// Handle form submission to create a task
document.getElementById('taskDetailsForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const taskData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        startDate: document.getElementById('startDate').value,
        dueDate: document.getElementById('dueDate').value,
        assignedTo: document.getElementById('assignedTo').value,
        status: document.getElementById('status').value,
    };

    try {
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });

        if (response.ok) {
            const newTask = await response.json();
            appendTaskToList(newTask); // Add the new task to the list
            closeModal(); // Close the modal
        } else {
            console.error('Failed to create task');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Function to add a new task to the list
function appendTaskToList(task) {
    const taskList = document.querySelector('.task-list');
    const taskItem = document.createElement('li');

    taskItem.innerHTML = `
    <span>${task.title} - Due: ${task.dueDate}</span>
    <button class="edit-btn" data-id="${task.taskId}">Edit</button>
    <button class="delete-btn" data-id="${task.taskId}">Delete</button>
    <button class="view-btn" data-id="${task.taskId}">View Details</button>
`;
    taskList.appendChild(taskItem);


}

// Event listener for the close button on the modal
document.querySelector('.close-btn').addEventListener('click', closeModal);

// Attach showTaskModal to the "Add Task" button
document.querySelector('.fa-plus.add-icon').addEventListener('click', showTaskModal);

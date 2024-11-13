
document.querySelector('.login-btn').addEventListener('click', () => {
  window.location.href = '/login'; // Update this route as needed
});

document.querySelector('.signup-btn').addEventListener('click', () => {
  window.location.href = '/signup'; // Update this route as needed
});





function toggleSidePanel() {
  const sidePanel = document.getElementById('sidePanel');
  sidePanel.classList.toggle('collapsed');
}


// Function to toggle visibility of sub-items
function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.style.display = section.style.display === 'none' ? 'block' : 'none';
}

// Event listeners for collapsible headers
document.querySelectorAll('.menu-item.header').forEach((header) => {
  header.addEventListener('click', () => {
    const subItems = header.nextElementSibling;
    subItems.style.display = subItems.style.display === 'none' ? 'block' : 'none';
  });
});


// Function to add a sub-item to a specific list (tasks or categories)
function addSubItem(listId) {
  const itemName = prompt("Enter name:");
  if (itemName) {
    const list = document.getElementById(listId);
    const subItem = document.createElement('div');
    subItem.classList.add('sub-item');
    subItem.innerHTML = `
      <span>${itemName}</span>
      <i class="fa fa-minus" onclick="removeSubItem(this)" title="Remove"></i>
    `;
    list.appendChild(subItem);
    list.style.display = 'block'; // Show the section if hidden
  }
}

// Function to remove a sub-item
function removeSubItem(element) {
  element.parentElement.remove();
}


// Function to show Task List View
function showTaskListView() {
  const taskListView = document.getElementById("taskListView");
  const calendarView = document.getElementById("calendarView");

  // Remove inline style (if present)
  taskListView.style.display = ""; // Empty string removes inline styles
  // Hide calendar view
  calendarView.style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar')
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth'
  })
  calendar.render()
});


function showCalendarView() {
  const taskListView = document.getElementById("taskListView");
  const calendarView = document.getElementById("calendarView");

  // Remove inline style (if present)
  calendarView.style.display = "";
  // Hide task list view
  taskListView.style.display = "none";

  // Check if the calendar has already been initialized
  if (!calendarView.classList.contains("initialized")) {
    // Initialize FullCalendar
    const calendarEl = document.getElementById("calendar");
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: [
        { title: 'Task 1', start: '2024-11-15' },
        { title: 'Task 2', start: '2024-11-18', end: '2024-11-19' }
      ]
    });
    calendar.render();
    // Add a class to mark that the calendar has been initialized
    calendarView.classList.add("initialized");
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const taskList = document.querySelector('.task-list');
  if (!taskList) {
      console.error('Task list element not found');
      return; // Exit early if the task list element doesn't exist
  }

  // Fetch tasks
  fetch('http://localhost:3000/tasks')
      .then(response => response.json())
      .then(data => {
          console.log('Fetched data:', data);  // Log the data structure to verify

          if (!data || data.length === 0) {
              taskList.innerHTML = '<li>No tasks available</li>';
              return;
          }

          taskList.innerHTML = ''; // Clear existing tasks

          data.forEach(task => {  // No need for data.tasks, since the data is an array
              const taskItem = document.createElement('li');
              taskItem.innerHTML = `
                  <span>${task.title} - Due: ${task.dueDate}</span>
                  <button class="edit-btn" data-id="${task.taskId}">Edit</button>
                  <button class="delete-btn" data-id="${task.taskId}">Delete</button>
              `;
              taskList.appendChild(taskItem);
          });

          // Add event listeners for the buttons
          document.querySelectorAll('.edit-btn').forEach(button => {
              button.addEventListener('click', (event) => {
                  const taskId = event.target.dataset.id;
                  // Call the update function here
                  updateTask(taskId);
              });
          });

          document.querySelectorAll('.delete-btn').forEach(button => {
              button.addEventListener('click', (event) => {
                  const taskId = event.target.dataset.id;
                  // Call the delete function here
                  deleteTask(taskId);
              });
          });
      })
      .catch(error => console.error('Error fetching tasks:', error));
});

// Function to handle updating a task
const updateTask = (taskId) => {
  const updatedData = {
      title: "Updated Task Title",  // Replace with your form data or prompt
      description: "Updated task description",
      dueDate: "2024-11-20",
      status: "In Progress"
  };

  fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
  })
  .then(response => response.json())
  .then(data => {
      console.log('Task updated:', data);
      location.reload();  // Reload the page to reflect the changes
  })
  .catch(error => console.error('Error updating task:', error));
};

// Function to handle deleting a task
const deleteTask = (taskId) => {
  fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
      console.log('Task deleted:', data);
      location.reload();  // Reload the page to remove the deleted task
  })
  .catch(error => console.error('Error deleting task:', error));
};

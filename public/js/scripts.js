

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


async function showCalendarView() {
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

    // Fetch tasks from back-end
    try {
      const response = await fetch('http://localhost:3000/tasks');
      const tasks = await response.json();

      // Map tasks to FullCalendar's event format
      const events = tasks.map(task => ({
        title: task.title,
        start: task.startDate,
        end: task.dueDate || task.startDate, // If no due date, use start date
        description: task.description,       // Optional extra data if you want
        extendedProps: {
          workspaceId: task.workspaceId,     // Other task-specific data
          assignedTo: task.assignedTo
        }
      }));

      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: events
      });

      calendar.render();
      // Mark calendar as initialized
      calendarView.classList.add("initialized");
      
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }

    
  }
}


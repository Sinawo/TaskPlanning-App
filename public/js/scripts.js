


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



// Show Task List View
// Function to show Task List View
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
})


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

// Function to filter calendar by view type (day, week, month)
function filterView(viewType) {
  const calendarContent = document.getElementById('calendarContent');
  
  switch(viewType) {
    case 'day':
      calendarContent.innerHTML = '<p>Displaying tasks for today</p>';
      break;
    case 'week':
      calendarContent.innerHTML = '<p>Displaying tasks for this week</p>';
      break;
    case 'month':
      calendarContent.innerHTML = '<p>Displaying tasks for this month</p>';
      break;
    default:
      calendarContent.innerHTML = '';
  }
}




/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



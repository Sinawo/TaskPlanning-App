# TaskPlanning-App
This is application is mainly for todo-list (CRUD) 

Step 1: Install Dependencies
To set up the application, we'll need to install some dependencies for handling HTTP requests and the basic front end:

Express for creating a server.
Nodemon (optional, for development) to automatically restart the server when files change:


npm install express
npm install --save-dev nodemon

Install FullCalendar

npm install @fullcalendar/core @fullcalendar/daygrid @fullcalendar/timegrid

npm install ejs

tables 
Tables:
Users: To store the details of the users.
Workspaces: If you have multiple workspaces, this table will keep track of them.
Tasks: To store the tasks, along with all their details (e.g., title, description, dates).
Workspace_Users: To manage the many-to-many relationship between workspaces and users (since a user can be added to multiple workspaces, and a workspace can have multiple users).


2. Basic Functionality
To implement the basic functionality, you’ll need the following:

Creating tasks: Users can create tasks by providing a title, description, start date, due date, and assigning the task to a user.
Viewing tasks: Users can view tasks either by workspace or assigned user.
Editing tasks: Users can update task details, including changing the status and reassigning tasks.
Assigning users: The ability to add users to workspaces is essential so they can be assigned tasks.

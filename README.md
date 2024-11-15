# TaskPlanning-App

TaskPlanning-App is a comprehensive task management application designed to help users organize and manage their to-do lists with ease. This application offers CRUD operations for tasks, integration with FullCalendar, and various views for effective task tracking.

## Features
- **Task Creation, Update, and Deletion**: Users can create, view, edit, and delete tasks.
- **Task Assignment**: Tasks can be assigned to specific users within different workspaces.
- **Due Dates and Notifications**: Displays tasks due soon, organized by due dates, with options to view in a list or calendar format.
- **Calendar View**: Integrates FullCalendar for a visual task scheduling experience.
- **User and Workspace Management**: Users can be added to multiple workspaces, and roles can be assigned as needed.

---

## Table of Contents
1. [Installation](#installation)
2. [Project Structure](#project-structure)
3. [Tables Overview](#tables-overview)
4. [Functionality](#functionality)
6. [Scripts and Dependencies](#scripts-and-dependencies)
7. [Development Notes](#development-notes)

---


### Step 1: Cloning the repo
1. Clone the repository and navigate to the project folder:
```bash
git clone <repository-url>
cd TaskPlanning-App

```

### Step 2: Install Dependencies

To start running the project or server (TaskPlanning-App), you have to start with this command this will install alll the depencies and create a node_modeles folder:

```bash
npm install 
```
### Step 2: Run the Server
To start the server, run the following command in the terminal:

```bash
npm start 
```
The server will start with auto-reload for any file changes if you're using nodemon

# Database Tables

- **Users:**:  Stores user details.
- **Workspaces:**:  Stores user details.
- **Tasks:**:  Stores user details.
- **Workspace_Users:**:  Stores user details.

# Functionality Overview

## 1. User Authentication

-  Users can sign up, log in, and log out. Authentication routes are handled in **authRoutes.js**.js, with logic in **authController.js** and frontend functionality in **auth.js**


## 2. Task Management

- **Creating Tasks:** Users can create tasks by providing a title, description, start date, due date, and assigning the task to a user.
- **Viewing Tasks:** Tasks can be viewed by workspace or assigned user in both list and calendar views.
- **Editing Tasks:** Users can update task details, change the status, or reassign tasks.
- **Deleting Tasks:** Tasks can be removed using a delete confirmation modal.


## 3. Task Calendar View
The FullCalendar library is used to display tasks in a calendar format, providing a visual overview of task schedules. The calendar view is styled and managed in calendar.js.

## 4. Workspace Management
Users can create or join multiple workspaces, allowing for team collaboration. This is managed with the Workspace_Users table, which links users to workspaces.

## UI Styling Details
The UI for the task list and calendar view is designed to be intuitive and responsive.


## Calendar Integration
Tasks can be viewed in a calendar format using FullCalendar, with each task displayed on its assigned due date. The calendar is set up in calendar.js.

## Scripts and Dependencies
*express:* Handles HTTP requests and response routing.
*ejs:* Templating engine for dynamic HTML rendering.
*@fullcalendar/core, @fullcalendar/daygrid, @fullcalendar/timegrid:* Libraries used to create a calendar view for tasks.
*nodemon (dev dependency):* Provides hot reloading during development.
These dependencies are listed in package.json and can be installed by running npm install.



## Development Notes
**Task Button IDs:** Each task button has a data-id attribute, which is used in JavaScript to fetch and handle task-related CRUD operations.
**Calendar and List Views:** The app supports both list and calendar views, allowing users to switch between different task viewing modes.
**Styling Customizations:** CSS is applied for a clean, modern look for tasks and buttons, providing a visually organized and user-friendly layout.


## Future Enhancements
**Notification System:** Add email or push notifications to remind users of upcoming task deadlines.
**Task Analytics:** Use D3.js or similar libraries to visualize task completion rates and workload distributions.
**Mobile Optimization:** Future plans to enhance the UI for mobile and tablet viewing.


## License
This project is licensed under the MIT License.

## Contact
For further questions or collaboration, please reach out to the project maintainer at [sinawomngxuma@gmail.com]

```vbnet
This README covers all of your steps, settings, and usage instructions, excluding the project structure section. Let me know if you'd like any additional details or changes!
```
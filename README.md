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

--- The storage: 
CREATE TABLE todoApp.users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,   -- Primary key for internal use
    username VARCHAR(100) UNIQUE NOT NULL,    -- Username is unique and cannot be null
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,      -- Assuming you'll store hashed passwords
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todoApp.workspaces (
    workspace_id INT AUTO_INCREMENT PRIMARY KEY,
    workspace_name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todoApp.workspace_users (
    workspace_id INT,
    user_id INT,
    PRIMARY KEY (workspace_id, user_id),
    FOREIGN KEY (workspace_id) REFERENCES workspaces(workspace_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE todoApp.tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,           -- Unique task ID
    workspace_id INT,                                  -- Workspace ID to associate the task with a workspace
    title VARCHAR(255) NOT NULL,                       -- Title of the task
    description TEXT,                                  -- Task description
    start_date DATE,                                   -- Start date of the task
    due_date DATE,                                     -- Due date of the task
    assigned_to VARCHAR(100),                          -- Username of the user assigned to the task
    status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',   -- Status of the task
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Timestamp of when the task is created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,   -- Timestamp of when the task is updated
    FOREIGN KEY (workspace_id) REFERENCES workspaces(workspace_id),   -- Foreign key to workspaces table
    FOREIGN KEY (assigned_to) REFERENCES users(username)            -- Foreign key to users table
);




INSERT INTO todoapp.users (username, email, password_hash) 
VALUES 
    ('john_doe', 'john@example.com', 'hashed_password_1'),
    ('jane_doe', 'jane@example.com', 'hashed_password_2');

INSERT INTO todoapp.workspaces (name, description)
VALUES 
    ('Workspace A', 'This is a description for Workspace A'),
    ('Workspace B', 'This is a description for Workspace B');


-- Assigning a task to 'john_doe' in 'Workspace A'
INSERT INTO todoapp.tasks (workspace_id, title, description, start_date, due_date, assigned_to)
VALUES 
    (1, 'Task 1', 'Description of Task 1', '2024-11-12', '2024-11-15', 'john_doe');

-- Assigning a task to 'jane_doe' in 'Workspace B'
INSERT INTO todoapp.tasks (workspace_id, title, description, start_date, due_date, assigned_to)
VALUES 
    (2, 'Task 2', 'Description of Task 2', '2024-11-12', '2024-11-20', 'jane_doe');

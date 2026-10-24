# Student Task Manager

A responsive, beginner-friendly web application that helps students organize academic tasks, track their progress, and manage their daily study activities.

## About the Project

Student Task Manager is a front-end web development project built using HTML, CSS, and vanilla JavaScript. It provides a simple interface for creating tasks, tracking completion, filtering tasks, and saving data in the browser.

The project is designed to practice core web development concepts, including DOM manipulation, event handling, responsive design, and browser storage.

## Features

- **Add Tasks:** Create tasks for study sessions and academic activities.
- **Complete Tasks:** Mark tasks as completed or pending.
- **Delete Tasks:** Remove tasks that are no longer needed.
- **Filter Tasks:** View all tasks, pending tasks, or completed tasks.
- **Task Statistics:** View total, pending, and completed task counts.
- **Persistent Storage:** Save tasks using browser LocalStorage.
- **Responsive Design:** Use the application on mobile devices, tablets, and desktops.
- **Clear Completed Tasks:** Remove completed tasks when they are no longer needed.

> Features such as task editing, priorities, due dates, search, and dark mode are planned upgrades and should only be marked as complete after implementation and testing.

## Technologies Used

- HTML5 — page structure
- CSS3 — styling and responsive layout
- JavaScript (ES6+) — task management and interactivity
- LocalStorage — saving tasks in the browser
- Git and GitHub — version control and project hosting

## Project Structure

```text
student-task-manager/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Getting Started

### Prerequisites

- A modern web browser
- A code editor such as Visual Studio Code
- Git (optional, for version control)

### Installation

**1. Clone the repository**

Replace `YOUR_USERNAME` with your GitHub username.

```bash
git clone https://github.com/YOUR_USERNAME/student-task-manager.git
```

**2. Open the project folder**

```bash
cd student-task-manager
```

**3. Run the application**

Open `index.html` in your browser, or use the Live Server extension in Visual Studio Code.

No backend server or database is required for the current version.

## How to Use

1. Open the application in your browser.
2. Enter a task in the task form.
3. Add the task to your list.
4. Mark it as completed when you finish it.
5. Use the filters to view tasks by status.
6. Delete individual tasks or clear completed tasks.
7. Refresh the browser to verify that saved tasks remain available.

## Data Storage

The application uses browser LocalStorage to save tasks.

**Limitations:**
- Data is stored locally in the current browser.
- Tasks are not automatically synchronized between devices.
- Clearing the browser's site data may remove saved tasks.
- The current version does not provide user accounts or cloud backups.

Do not use this version to store sensitive personal information.

## Testing Checklist

- [ ] Add a task with a valid title.
- [ ] Check how empty input is handled.
- [ ] Mark a task as completed and pending.
- [ ] Delete a task.
- [ ] Test each task filter.
- [ ] Verify that task statistics update correctly.
- [ ] Refresh the browser and check saved tasks.
- [ ] Clear completed tasks and verify the result.
- [ ] Test the layout on mobile and desktop.
- [ ] Check the browser console for errors.

## Future Improvements

- Edit existing tasks
- Add task priorities: Low, Medium, and High
- Set due dates and identify overdue tasks
- Search tasks by title or subject
- Sort tasks by due date and priority
- Add dark mode
- Improve keyboard accessibility
- Add automated tests
- Explore backend storage and synchronization in a future version

## Learning Outcomes

Through this project, I aim to develop practical skills in:

- Structuring web pages with HTML
- Building responsive layouts with CSS
- Manipulating the DOM using JavaScript
- Handling user events and form validation
- Working with arrays and objects
- Persisting application data with LocalStorage
- Using Git and GitHub to manage a project

## Deployment

The project can be hosted using GitHub Pages after the files have been uploaded to a GitHub repository.

1. Open your repository on GitHub.
2. Go to **Settings → Pages**.
3. Select the deployment source and the appropriate branch.
4. Save the settings and wait for deployment.
5. Open the published URL and test the application.

## Author

**Mantesh B.**

- GitHub: https://github.com/ManteshB2006
- LinkedIn: https://linkedin.com/in/mantesh-b-40513b428/

## License

This project is intended for learning and portfolio development. A license has not yet been specified. Consider adding an MIT License if you want others to reuse and modify your code under its terms.

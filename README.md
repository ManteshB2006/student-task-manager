# Student Task Manager

A responsive web application that helps students organize academic tasks, track their progress, and manage their daily study activities.

## About the Project

Student Task Manager is a front-end web application built using HTML5, CSS3, and vanilla JavaScript. It allows students to create tasks, track completion, filter tasks by status, and save their tasks in the browser.

This project demonstrates practical web development concepts, including DOM manipulation, event handling, responsive design, and browser storage.

## Features

- **Add Tasks:** Create tasks for studying and academic activities.
- **Complete Tasks:** Mark tasks as completed or pending.
- **Delete Tasks:** Remove tasks that are no longer needed.
- **Filter Tasks:** View all tasks, pending tasks, or completed tasks.
- **Task Statistics:** View total, pending, and completed task counts.
- **Local Data Storage:** Save tasks using browser LocalStorage.
- **Responsive Design:** Access the application on mobile devices, tablets, and desktops.
- **Clear Completed Tasks:** Remove completed tasks from the list.

*Note: Task editing, priorities, due dates, search, and dark mode are planned enhancements and are not included in the current feature list until implemented and tested.*

## Technologies Used

- **HTML5—Structures** the web page.
- **CSS3—Provides** styling and responsive layouts.
- **JavaScript (ES6+)—Implements** task management and interactivity.
- **LocalStorage—Stores** tasks in the browser.
- **Git and GitHub—Support** version control and project hosting.

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

- A modern web browser, such as Chrome or Firefox.
- A code editor, such as Visual Studio Code.
- Git, if you want to clone and manage the repository from the command line.

### Installation

**1. Clone the repository.**

```bash
git clone https://github.com/ManteshB2006/student-task-manager.git
```

**2. Navigate to the project directory.**

```bash
cd student-task-manager
```

**3. Run the application.**

Open `index.html` directly in your browser, or use the Live Server extension in Visual Studio Code.

No backend server or database is required for the current version.

## How to Use

1. Open the application in your browser.
2. Enter a task in the task input field.
3. Add the task to your list.
4. Mark the task as completed when you finish it.
5. Use the available filters to view tasks by status.
6. Delete individual tasks or clear completed tasks.
7. Refresh the browser to verify that your tasks remain saved.

## Data Storage and Limitations

The application uses the browser's LocalStorage to save tasks between page visits.

Current limitations include:

- Tasks are stored in the browser on the current device.
- Tasks do not automatically synchronize across devices.
- Clearing the browser's site data may delete saved tasks.
- The application does not currently support user accounts or cloud backups.

Avoid storing sensitive personal information in this application.

## Testing Checklist

Use this checklist to verify the application before publishing it.

- [ ] Add a task with a valid title.
- [ ] Verify that empty task input is handled correctly.
- [ ] Mark a task as completed and pending.
- [ ] Delete an individual task.
- [ ] Test all available task filters.
- [ ] Verify that task statistics update correctly.
- [ ] Refresh the page and check whether tasks remain saved.
- [ ] Clear completed tasks and verify the result.
- [ ] Test the layout on mobile and desktop screens.
- [ ] Check the browser console for JavaScript errors.

## Future Enhancements

The following features may be added in future versions:

- Edit existing tasks.
- Assign priorities: Low, Medium, and High.
- Set due dates and identify overdue tasks.
- Search tasks by title or subject.
- Sort tasks by due date and priority.
- Add light and dark themes.
- Improve keyboard navigation and accessibility.
- Introduce automated tests.
- Explore backend storage and cross-device synchronization.

## Learning Outcomes

This project provides practical experience with:

- Structuring web pages using HTML.
- Creating responsive layouts with CSS.
- Manipulating the DOM using JavaScript.
- Handling user events and validating form input.
- Working with JavaScript arrays and objects.
- Persisting application data using LocalStorage.
- Managing source code with Git and GitHub.

## Deployment

You can publish this front-end application using GitHub Pages.

1. Push the project files to your GitHub repository.
2. Open the repository on GitHub.
3. Navigate to **Settings → Pages**.
4. Choose the appropriate deployment source and branch.
5. Save the configuration.
6. Once deployment completes, open the published URL and test the application.

## Author

**Mantesh B.**

- **GitHub:** [https://github.com/ManteshB2006](https://github.com/ManteshB2006)
- **LinkedIn:** [https://linkedin.com/in/mantesh-b-40513b428/](https://linkedin.com/in/mantesh-b-40513b428/)

## License

No license has been specified yet. If you want others to use, modify, and distribute this project under the MIT License, add a `LICENSE` file containing the MIT License terms.

---

*Built as a learning project to develop practical front-end web development skills.*

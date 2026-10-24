# Student Task Manager

A responsive task manager for organizing study work. It uses plain HTML, CSS, and JavaScript, and saves tasks in the current browser with LocalStorage.

## Features

- Add, edit, complete, and delete tasks
- Set a Low, Medium, or High priority
- Add an optional subject, description, and due date
- Identify overdue tasks
- Filter tasks by completion status
- View total, pending, and completed counts
- Clear completed tasks with a confirmation prompt
- Keep task data in the browser between visits

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. Add a task. It will be saved in that browser's LocalStorage.

No package installation or build step is required.

## Deploy with GitHub Pages

This repository includes a GitHub Actions workflow at `.github/workflows/pages.yml` that publishes the static site when changes are pushed to `main`.

1. Open the repository on GitHub and go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Open the **Actions** tab and wait for the **Deploy to GitHub Pages** workflow to finish successfully.
4. The published site URL is shown in the workflow deployment and in **Settings → Pages**. For this repository, it should be `https://ManteshB2006.github.io/student-task-manager/`.

Future commits to `main` trigger another deployment.

## Test before publishing

- [ ] Add a task with a title, subject, priority, description, and due date.
- [ ] Reject an empty or whitespace-only title.
- [ ] Edit a task and verify its other details remain intact.
- [ ] Mark a task complete and verify the counts and status filter.
- [ ] Check overdue styling using a past due date.
- [ ] Cancel a delete confirmation, then confirm a delete.
- [ ] Confirm clearing completed tasks requires confirmation.
- [ ] Reload the page and verify tasks are still present.
- [ ] Check the layout and keyboard focus at mobile and desktop widths.
- [ ] Check the GitHub Actions workflow and open the published Pages URL.

## Limitations

- LocalStorage is specific to a browser profile and device. Tasks do not sync between devices and can be lost if browser data is cleared.
- There is no account, server-side backup, or collaboration.
- Screenshots are not included yet.
- This version includes status filtering; search, additional dashboard filters, sorting, themes, and automated tests are not implemented yet.

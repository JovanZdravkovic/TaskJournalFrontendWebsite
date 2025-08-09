# Task Journal

**Task Journal** is a cross-platform personal task management app designed to help users organize, prioritize, and track their daily activities and deadlines.  
The app is available on the web at [taskjournal.online](https://taskjournal.online), as well as on mobile devices running Android and iOS.

## Features

Task Journal offers the following features:

- Creating, searching and filtering, updating and deleting daily and long-term tasks  
- Custom designed icons that help user association with tasks  
- Synched across devices and platforms  
- Tasks history with searching and filtering features

## Technology Stack

- **Web frontend:** Angular, Tailwind CSS  
- **Mobile app:** Flutter (Dart)  
- **Backend:** Golang, PostgreSQL

---

# TaskJournalFrontendWebsite

**TaskJournalFrontendWebsite** is the repository for the web frontend of Task Journal application.  
The frontend is written in Angular framework and utilizes TailwindCSS classes for styling.
The latest production version (main branch) is hosted on [taskjournal.online](https://taskjournal.online).

The app establishes communication with the backend via HTTPS (the same backend is used for the mobile app, enabling synchronization between devices).

Authentication is done via cookies and secured via `HttpOnly` and `Secure` flags.

## Installation and requirements

### Requirements
- Angular CLI (version in project: 18.1.0)
- Node.js (version in project: 20.15.1)
- Node Package Manager (version in project: 11.4.2)
- TypeScript (version in project 5.5.4)
- TailwindCSS (version in project: 3.4.17)

###  Installation
- Before running the Angular app, ensure that Angular, Node.js, NPM, TypeScript and the project dependencies are properly installed.
- Following command will print out versions of Angular CLI, Node.js, NPM and TypeScript installed on your system: `ng version`.
- Node.js dependencies and their versions are available in the `package.json` file. Run the following command to install the required dependencies: `npm install`.
- For TailwindCSS installation, refer to documentation available on their website: [tailwindcss.com](https://v3.tailwindcss.com/docs/installation).

**Note:** The version available on GitHub is production ready. The links used in the files `profile.component.ts` and `base.service.ts` are set to point to the backend hosted at taskjournal.online/api.
For testing purposes set it to wherever your backend is hosted (TaskJournalBackend is set to be hosted at localhost:8080).

**TODO:** Two separate environments, production and development, should be created and url links should be read from the selected environment, instead of being hardcoded in the source code. This feature will be implemented in the future.

### Running the Angular app

To run the Angular app, use the following command: `ng serve`. This command will build and run Task Journal web app on url `localhost:4200` and should be accessible through the browser.



# Developer Notes: Running the Application

This document outlines the different running modes for the application to streamline the development process.

## Development Modes

The application can run in two modes: `mock` and `backend`. The mode is controlled by the `REACT_APP_API_MODE` environment variable in the frontend, as defined in `frontend/src/services/api.js`.

### 1. Mock Mode (Default)

This is the **default and primary mode** for all routine UI development and testing at this stage of the project.

- **How it works:** The frontend uses a built-in mock data layer (`frontend/src/mocks/`) that intercepts API calls and returns realistic, predefined data structures. It **does not** require the Python backend to be running.

- **When to use it:**
  - All general UI development and testing.
  - Working on frontend application flow, component logic, and state management.
  - When you need to work offline or cannot run a local Python environment.

- **Why it's the default:** It provides a frictionless development experience. It allows developers to work on the user interface and application flow without the overhead of setting up and managing a local Python virtual environment and running the backend server. This accelerates UI iteration and keeps the focus on user experience, which is the priority for this phase of the project.

### 2. Backend Mode

This mode is for periodic end-to-end integration testing to ensure the frontend and backend can still communicate correctly.

- **How it works:** The frontend makes real API calls to a running FastAPI server, which is expected to be available at `http://localhost:8000`.

- **When to use it:**
  - Periodically, to test the full end-to-end workflow from the UI to the live backend logic.
  - To verify that the API contracts (request/response shapes) between the frontend and backend have not diverged.
  - As a final check before preparing the backend for deployment to a cloud environment like Google Cloud Run.

- **How to enable it:**
    1. Open the `frontend/src/services/api.js` file.
    2. Change the `API_MODE` constant from `'mock'` to `'backend'`.
    3. Start the backend server locally by following the necessary Python environment setup and startup commands.

By keeping `mock` as the default, we ensure the project remains easy to set up and run for anyone focused on the frontend user experience.

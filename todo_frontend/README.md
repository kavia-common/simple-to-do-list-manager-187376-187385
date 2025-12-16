# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Todo App

This template now includes a simple Todo application with add, edit, delete, and completion toggle. It is built with React hooks and provides an env-aware API integration with a mock adapter fallback.

### Features
- Add new tasks (Enter key or button)
- Toggle completion
- Inline edit with Save/Cancel
- Delete tasks
- Loading and error states
- Accessible labels and focus outlines
- Centered, modern styling with theme colors:
  - Primary #3b82f6, Success #06b6d4, Secondary #64748b, Background #f9fafb, Surface #ffffff, Error #EF4444

## Getting Started

In the project directory, you can run:

### `npm start`
Runs the app in development mode.  
Open http://localhost:3000 to view it in your browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

## Environment and API Configuration

The app selects the data source based on environment variables and feature flags:

- Backend base URL is read from:
  - `REACT_APP_API_BASE` or `REACT_APP_BACKEND_URL`
- Feature flags (comma-separated) via:
  - `REACT_APP_FEATURE_FLAGS`
- If neither API variable is set or the feature flags include `USE_MOCK_API`, the app uses a localStorage-backed mock API.

Example `.env`:
```
REACT_APP_API_BASE='http://localhost:4000/api'
REACT_APP_FEATURE_FLAGS=''
```

Or to force the mock adapter:
```
REACT_APP_API_BASE=''
REACT_APP_FEATURE_FLAGS='USE_MOCK_API'
```

See `.env.example` for a starting point.

### API Contract
If using a backend, expected endpoints:
- GET    {BASE}/todos
- POST   {BASE}/todos            body: { text }
- PUT    {BASE}/todos/:id        body: { text?, completed? }
- DELETE {BASE}/todos/:id

## Accessibility Notes
- Inputs and interactive elements have labels or aria-labels
- Focus-visible outlines are provided
- Live regions announce counts and loading

## Project Scripts (unchanged)
The usual CRA scripts remain available.

## Customization
All styling resides in `src/App.css`. Adjust CSS variables to tweak the theme.

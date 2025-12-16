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

### Backend API Assumptions and Mock Switching

The frontend can talk to a real backend API or fall back to a localStorage-backed mock. Selection is controlled by environment variables and a feature flag.

- Real API base URL is read from:
  - REACT_APP_API_BASE or REACT_APP_BACKEND_URL
- Feature flags (comma-separated, case-insensitive) via:
  - REACT_APP_FEATURE_FLAGS
- Mock mode is enabled if:
  - neither REACT_APP_API_BASE nor REACT_APP_BACKEND_URL is set to a non-empty value, or
  - REACT_APP_FEATURE_FLAGS includes USE_MOCK_API

Other common envs in this template (not required for the Todo app logic but may exist in your .env): REACT_APP_FRONTEND_URL, REACT_APP_WS_URL, REACT_APP_NODE_ENV, REACT_APP_NEXT_TELEMETRY_DISABLED, REACT_APP_ENABLE_SOURCE_MAPS, REACT_APP_PORT, REACT_APP_TRUST_PROXY, REACT_APP_LOG_LEVEL, REACT_APP_HEALTHCHECK_PATH, REACT_APP_EXPERIMENTS_ENABLED.

Enable mock mode:
- Preferred: set REACT_APP_FEATURE_FLAGS='USE_MOCK_API'
- Or leave REACT_APP_API_BASE and REACT_APP_BACKEND_URL empty

Example .env for real API:
REACT_APP_API_BASE='http://localhost:4000/api'
REACT_APP_FEATURE_FLAGS=''

Example .env for mock API:
REACT_APP_API_BASE=''
REACT_APP_FEATURE_FLAGS='USE_MOCK_API'

How the app switches:
- src/hooks/useTodos.js computes BASE from REACT_APP_API_BASE || REACT_APP_BACKEND_URL and parses REACT_APP_FEATURE_FLAGS.
- If BASE is empty or flags include USE_MOCK_API, it imports services/mockApi.js; otherwise it uses services/api.js.
- If the real API is selected but initial load fails, the hook will transparently fall back to mock for that session and show "(Using mock due to API error)".

Expected backend endpoints and contract
Base URL refers to REACT_APP_API_BASE or REACT_APP_BACKEND_URL value, e.g., http://localhost:4000/api.

1) GET {BASE}/todos
- Description: List all todos, newest first.
- Response: 200 OK
  [
    {
      "id": "string",
      "text": "string",
      "completed": false,
      "createdAt": "ISO-8601 string",
      "updatedAt": "ISO-8601 string"
    }
  ]
- Errors: 5xx on server error.

2) POST {BASE}/todos
- Description: Create a todo.
- Request body:
  { "text": "string (required)" }
- Response: 201 Created (or 200 OK)
  {
    "id": "string",
    "text": "string",
    "completed": false,
    "createdAt": "ISO-8601 string",
    "updatedAt": "ISO-8601 string"
  }
- Errors:
  400 if text is missing/invalid
  5xx on server error

3) PATCH {BASE}/todos/:id
- Description: Partially update a todo (text and/or completed).
- Request body:
  { "text": "string (optional)", "completed": true|false (optional) }
- Response: 200 OK
  {
    "id": "string",
    "text": "string",
    "completed": boolean,
    "createdAt": "ISO-8601 string",
    "updatedAt": "ISO-8601 string"
  }
- Errors:
  404 if id not found
  400 for invalid payload
  5xx on server error

4) DELETE {BASE}/todos/:id
- Description: Delete a todo by id.
- Response: 204 No Content (or 200 OK)
- Errors:
  404 if id not found
  5xx on server error

Note: The current frontend uses PUT in services/api.js for update calls. Backends can support PATCH or PUT; if your backend only supports PATCH, consider implementing PUT to accept the same partial payload, or update src/services/api.js accordingly.

LocalStorage behavior in mock mode
- Data is stored under the key "todos" in the browser's localStorage (see src/services/mockApi.js).
- Each record includes id, text, completed, createdAt, updatedAt.
- Reset mock data by running in the browser console:
  localStorage.removeItem('todos')
  Then refresh the page.

Example curl commands
Replace http://localhost:4000/api with your actual {BASE}.

List todos:
curl -s http://localhost:4000/api/todos

Create a todo:
curl -s -X POST http://localhost:4000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Buy milk"}'

Update a todo (PATCH):
curl -s -X PATCH http://localhost:4000/api/todos/<id> \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

Update a todo (PUT, current frontend default):
curl -s -X PUT http://localhost:4000/api/todos/<id> \
  -H "Content-Type: application/json" \
  -d '{"text":"New title","completed":false}'

Delete a todo:
curl -s -X DELETE http://localhost:4000/api/todos/<id>

## Accessibility Notes
- Inputs and interactive elements have labels or aria-labels
- Focus-visible outlines are provided
- Live regions announce counts and loading

## Project Scripts (unchanged)
The usual CRA scripts remain available.

## Customization
All styling resides in `src/App.css`. Adjust CSS variables to tweak the theme.

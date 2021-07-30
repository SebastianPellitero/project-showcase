# Project Showcase

## For running the application:
Create a .env with REACT_APP_CLIENT_ID and REACT_APP_CLIENT_SECRET;

## Project init from:
### `npx create-react-app my-app --template typescript`

## Features:
Projects can be searched and filtered at the same time. Adding a new filter can be integrated easily. The filter or search result will be paginated too.
When the user clears the previous filter, the dashboard shows the default group of projects without an API request.

## Improvements: 
Filter selects are filled by the incoming data, they should be populated from a specific API.
Completion of tests for reducers and context is needed.
General UI can be improved, an error message and a spinner can be added for error / loading status. Project detail view animation needs to be fixed. And a login page can be added in order to keep client “id” and “secret” safe.
Needs to improve security for storing the token
Needs to add I18n and some a11y practices through the code.
Needs to include Publications as different elements for displaying.
When the user uses the same filter as before of pressing “Clear Filters”, they should avoid making a new API call.
Tests and styles need to be extension TS.

# Meet App

## Description
The App displays a list of upcoming events in the city and time of the user's choice. It will also be available for users to use when they are offline.

## Objective 
To build a serverless, progressive web application (PWA) with React using a test-driven
development (TDD) technique. The application uses the Google Calendar API to fetch
upcoming events.

## User Stories 
1. As a user, I would like to be able to filter events by city so that I can see the list of events
that take place in that city.
2. As a user, I would like to be able to show/hide event details so that I can see more/less
information about an event.
3. As a user, I would like to be able to specify the number of events I want to view in the
app so that I can see more or fewer events in the events list at once.
4. As a user, I would like to be able to use the app when offline so that I can see the events
I viewed the last time I was online.
5. As a user, I would like to be able to add the app shortcut to my home screen so that I
can open the app faster.
6. As a user, I would like to be able to see a chart showing the upcoming events in each
city so that I know what events are organized in which city.

### Feature 1: FILTER EVENTS BY CITY
- Sscenario 1: When user hasn't searched for a city, show upcoming events from all cities.
    - **Given** user hasn’t searched for any city
    - **When** the user opens the app
    - **Then** the user should see a list of all upcoming events
- Secenario 2: User should see a list of suggestions when they search for a city.
    - **Given** the main page is open
    - **When** user starts typing in the city textbox
    - **Then** the user should see a list of cities (suggestions) that match what they’ve typed
- Scenario 3: User can select a city from the sguggested list.
    - **Given** the user was typing “Berlin” in the city textbox
And the list of suggested cities is showing
    - **When** the user selects a city (e.g., “Berlin, Germany”) from the list
    - **Then** their city should be changed to that city (i.e., “Berlin, Germany”)
And the user should receive a list of upcoming events in that city

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

As a user
I should be able to “filter events by city”
So that I can see the list of events that take place in that city

- Scenario 1: When user hasn't searched for a city, show upcoming events from all cities.
  - **Given** user hasn’t searched for any city
  - **When** the user opens the app
  - **Then** the user should see a list of all upcoming events
- Scenario 2: User should see a list of suggestions when they search for a city.
  - **Given** the main page is open
  - **When** user starts typing in the city textbox
  - **Then** the user should see a list of cities (suggestions) that match what they’ve typed
- Scenario 3: User can select a city from the sguggested list.
  - **Given** the user was typing “Berlin” in the city textbox
    And the list of suggested cities is showing
  - **When** the user selects a city (e.g., “Berlin, Germany”) from the list
  - **Then** their city should be changed to that city (i.e., “Berlin, Germany”)
    And the user should receive a list of upcoming events in that city

### Feature 2: Show/Hide an event's details

As a user
I should be able to “Show/Hide events detais”
So that I can see the information of events of my interest and close it.

- Scenario 1: An event element is collapsed by default
  - **Given** the main page was opened. 
  - **When** nothing is selected
  - **Then** even detailss will collapse

- Scenario 2: User can expand an event to see its details
  - **Given** user clicked on an event button
  - **When** user wnat to know more details about the event
  - **Then** the details for the event will shown
- Scenario 3: User can collapse an event to hide its details
  - **Given** event details were opened
  - **When** the user clicks to close the event 
  - **Then** event details will be hidden

### Feature 3: Specify number of Events

As a user 
I should be able to choose the events that interest me
So that I can make a better decision on which one to attend.

- Scenario 1:  When user hasn’t specified a number, 32 is the default number
  - **Given** User searched for events in a city
  - **When** user does not specify an amount of events
  - **Then** user wiil have 32 events as default per city
- Scenario 2: User can change the number of events they want to see
  - **Given** user opened the search results query
  - **When** user changes the default number
  - **Then** the established number of events will be changed 

### Feature 4: Use the App when offline

As a user
I should be able to connect to the app without internet
So that I can still use my app.

- Scenario 1: Show cached data when there’s no internet connection
  - **Given** the did not have internet connection
  - **When** the data is cached
  - **Then** the data will be shown
- Scenario 2: Show error when user changes the settings (city, time range)
  - **Given** the user opened the settings menu
  - **When** the user changes the settings
  - **Then** an error will be shown

### Feature 5: Data visualization

As a user
I should be able to see displayed data
So that it is easier to understand

- Scenario 1:  Show a chart with the number of upcoming events in each city.
  - **Given** user selected a city
  - **When** user clicks on city's events button
  - **Then** a chart list of upcoming events will be displayed  in the city

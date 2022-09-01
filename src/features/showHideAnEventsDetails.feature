Feature: Show/Hide an event's details

Scenario:  An event element is collapsed by default
Given the main page was opened
When nothing is selected
Then event detailss will collapse

Scenario: User can expand an event to see its details
Given user clicked on an event button
When user want to know more details about the event
Then the details for the event will shown

Scenario: User can collapse an event to hide its details
Given event details were opened
When the user clicks to close the event
Then event details will be hidden
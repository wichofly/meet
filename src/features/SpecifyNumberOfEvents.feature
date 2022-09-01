Feature: Specify number of Events

Scenario: When user hasn’t specified a number, 32 is the default number
Given User searched for events in a city
When user does not specify an amount of events
Then user wiil have 32 events as default per city

Scenario: User can change the number of events they want to see
Given user opened the main page
When user changes the default number
Then the established number of events will be changed
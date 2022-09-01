import React from 'react';
import { mount, shallow } from 'enzyme';
// loadFeature(), is used to load a Gherkin file
// defineFeature(), is used to define the code for that file (feature). 
import { loadFeature, defineFeature } from 'jest-cucumber';

import App from '../App';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';
import CitySearch from '../CitySearch';

// loadFeature() expects the file path to start from the root of the project
const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
  test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
    given('user hasn’t searched for any city', () => {

    });

    // (Shallow rendering isn’t enough in this instance as you need App’s children to be rendered for the next step in the test to work.)
    let AppWrapper;
    when('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then('the user should see the list of upcoming events', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
      // If, when testing, the Jest’s expect function toHaveLength() doesn’t return the correct number and you're sure the code being tested should be passing, you can try using Enzyme’s hostNodes()
      // both work by now for me
      // Here,(both expect codes) the list of events rendered in the App component is compared with the list of events from the mock API (your “mock-events.js” file). 
      // expect(AppWrapper.find('.event').hostNodes()).toHaveLength(mockData.length);
    });
  });

  test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {
    // you once again need to simulate the app being opened. 
    // Now, however, you can use shallow() instead of mount() because you don’t need to render any of CitySearch’s children
    let CitySearchWrapper;
    given('the main page is open', () => {
      let locations = extractLocations(mockData);
      CitySearchWrapper = shallow(<CitySearch updateEvents={() => { }} locations={locations} />);
    });

    when('the user starts typing in the city textbox', () => {
      CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
    });

    then('the user should receive a list of cities (suggestions) that match what they’ve typed', () => {
      expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
    });
  });


  test('User can select a city from the suggested list', ({ given, and, when, then }) => {
    // we need open the app and (rendering the app component)
    // also need to simulate an event on city texbox
    let AppWrapper;
    given('user was typing “Berlin” in the city textbox', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
    });

    // This step simply acts as a concatenator, requiring two different preconditions for the test to be executed
    and('the list of suggested cities is showing', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
    });

    when('the user selects a city (e.g., “Berlin, Germany”) from the list', () => {
      AppWrapper.find('.suggestions li').at(0).simulate('click');
    });

    then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
      // You can access CitySearch because you used the full rendering API to mount the App component (meaning that each of its children were rendered, as well)
      const CitySearchWrapper = AppWrapper.find(CitySearch);
      expect(CitySearchWrapper.state('query')).toBe('Berlin, Germany');
    });

    and('the user should receive a list of upcoming events in that city', () => {
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    });
    
  });
});

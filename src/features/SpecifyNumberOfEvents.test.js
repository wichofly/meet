import React from 'react';
import { mount, shallow } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';

import App from '../App';

const feature = loadFeature('./src/features/SpecifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
    given('User searched for events in a city', () => {

    });

    let AppWrapper
    when('user does not specify an amount of events', () => {
      AppWrapper = mount(<App />)
    });

    then('user wiil have 32 events as default per city', () => {
      AppWrapper.update();
      expect(AppWrapper.state('numberOfEvents')).toBe(32)
    });
  });

  test('User can change the number of events they want to see', ({
    given, when, then }) => {
    let AppWrapper
    given('user opened the main page', () => {
      expect(AppWrapper.state('numberOfEvents')).toBe(32)
    });

    when('user changes the default number', () => {
      AppWrapper.update();

    });

    then('the established number of events will be changed', () => {
      expect(AppWrapper.state('numberOfEvents')).toBe(5);
    });
  });
})
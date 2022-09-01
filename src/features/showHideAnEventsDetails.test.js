import React from 'react';
import { mount, shallow } from 'enzyme';
// loadFeature(), is used to load a Gherkin file
// defineFeature(), is used to define the code for that file (feature). 
import { loadFeature, defineFeature } from 'jest-cucumber';

import App from '../App';
import Event from '../Event';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when,
    then }) => {
    let AppWrapper;
    let EventWrapper;
    given('the main page was opened', () => {
      AppWrapper = mount(<App />)
    });

    when('nothing is selected', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length)
    });

    then('event detailss will collapse', () => {
     expect(EventWrapper.state('.suggestions')).toBe(false)
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    let EventWrapper;
    given('user clicked on an event button', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      expect(EventWrapper.state('show')).toBe(false);
      expect(EventWrapper.find('.event .event-showDetails-btn')).toHaveLength(1);
      expect(EventWrapper.find('.event .event-description')).toHaveLength(0);
    });

    when('user want to know more details about the event', () => {
      EventWrapper.find('.event-showDetails-btn').simulate('click');
    });

    then('the details for the event will shown', () => {
      expect(EventWrapper.state('show')).toBe(true);
      expect(EventWrapper.find('.event .event-hideDetails-btn')).toHaveLength(1);
      expect(EventWrapper.find('.event .event-description')).toHaveLength(1);
    }
    );
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    let EventWrapper;
    given('event details were opened', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      EventWrapper.setState({ show: true });
      expect(EventWrapper.state('show')).toBe(true);
      expect(EventWrapper.find('.event .event-hideDetails-btn')).toHaveLength(1);
      expect(EventWrapper.find('.event .event-description')).toHaveLength(1);
    });

    when('the user clicks to close the event', () => {
      EventWrapper.find('.event-hideDetails-btn').simulate('click');
    });

    then('event details will be hidden', () => {
      expect(EventWrapper.state('show')).toBe(false);
      expect(EventWrapper.find('.event .event-showDetails-btn')).toHaveLength(1);
      expect(EventWrapper.find('.event .event-description')).toHaveLength(0);
    });
  });
});
import React from 'react';
import { shallow } from 'enzyme';

import EventList from '../EventList';
import Event from '../Event';

describe('<EventList /> component', () => {
  let EventListWrapper;
  beforeAll(() => {
    EventListWrapper = shallow(<EventList events={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]} />);
  })

  test('render correct number of events', () => {
    expect(EventListWrapper.find(Event)).toHaveLength(4);
  });
});

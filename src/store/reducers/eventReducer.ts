import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from '../actionTypes';

const initialState = [
  {
    id: '1',
    title: 'Trip to Empire State building',
    date: '2018-03-18',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'NY, USA',
    venue: 'Empire State Building, 5th Avenue, New York, NY, USA',
    venueLatLng: {
      lat: 40.74844,
      lng: -73.985664
    },
    hostedBy: 'Anna B.',
    hostPhotoURL: 'https://randomuser.me/api/portraits/women/18.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/women/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-21',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    venueLatLng: {
      lat: 51.511806,
      lng: -0.1230009
    },
    hostedBy: 'Panos K.',
    hostPhotoURL: 'https://randomuser.me/api/portraits/women/40.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/women/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  }
];

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_EVENT:
      return [...state, action.payload];
    case UPDATE_EVENT:
      return [
        ...state.filter(event => event.id !== action.payload.id),
        action.payload
      ];
    case DELETE_EVENT:
      return [...state.filter(event => event.id !== action.payload)];
    default:
      return state;
  }
};

export default reducer;

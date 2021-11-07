import { SET_RESTAURANTS } from '../actions/types';

const initialState = [];
// const initialState = [
//   {
//     _id: '6181b74e687cb72cd0696b81',
//     name: 'sadf',
//     email: 'alan123@gmail.com',
//     type: 'r',
//     citycode: '617f858884fba21d18fd2155',
//     statecode: '617f864d84fba21d18fd2159',
//     countrycode: '617f867784fba21d18fd215b',
//     city: 'San Jose',
//     state: 'California',
//     country: 'United States',
//     location: '33 S 3rd St\nApt 101',
//     zip: '95113',
//     nickname: '',
//     phone: '',
//     description: 'Very good restaurant',
//     deliverymode: 1,
//     __v: 0,
//     hoursfrom: '06:50',
//     hoursto: '15:56',
//     pictures: ['dcc4cfeaa6c31844891cb24ec4bb9fd5'],
//     userid: '6181b74e687cb72cd0696b81',
//     restaurantid: '6181b74e687cb72cd0696b81',
//   },
// ];

const restaurants = (state = [...initialState], action) => {
  switch (action.type) {
    case SET_RESTAURANTS:
      return [...action.payload];
    default:
      return state;
  }
};

export default restaurants;

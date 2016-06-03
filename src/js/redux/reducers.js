import _ from 'lodash';
import { combineReducers } from 'redux';
import { CHOSE_PERSON, UPDATE_EMAIL, SHOW_EMAIL_ERROR_MESSAGE, SHOW_EMAIL_SUCCESS_MESSAGE } from './actions';

function _chosePerson(people, action) {
  const peopleCopy = Object.assign([], people);

  // deselect current chosen person
  _.find(peopleCopy, { chosen: true }).chosen = false;
  // select person by a specified id
  _.find(peopleCopy, { id: action.personId }).chosen = true;

  return peopleCopy;
}

function peopleReducer(people = {}, action) {
  switch (action.type) {
    case CHOSE_PERSON:
      return _chosePerson(people, action);
    default:
      return people;
  }
}

function subscriptionReducer(subscriptionForm = {}, action) {
  switch (action.type) {
    case UPDATE_EMAIL:
      return Object.assign(subscriptionForm, { email: action.email });
    case SHOW_EMAIL_ERROR_MESSAGE:
      return Object.assign(subscriptionForm, {
        message: {
          text: action.text,
          isError: true,
          isSuccess: false,
        },
      });
    case SHOW_EMAIL_SUCCESS_MESSAGE:
      return Object.assign(subscriptionForm, {
        message: {
          text: action.text,
          isError: false,
          isSuccess: true,
        },
      });
    default:
      return subscriptionForm;
  }
}

const rootReducer = combineReducers({
  subscriptionForm: subscriptionReducer,
  people: peopleReducer,
});

export default rootReducer;

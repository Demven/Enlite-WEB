import _ from 'lodash';
import { combineReducers } from 'redux';
import { CHOSE_PERSON } from './actions';

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

const rootReducer = combineReducers({
  people: peopleReducer,
});

export default rootReducer;

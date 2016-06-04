import _ from 'lodash';
import initialData from '../data/landing';
import { combineReducers } from 'redux';
import {
  CHOSE_PERSON,
  UPDATE_EMAIL,
  SHOW_EMAIL_ERROR_MESSAGE,
  SHOW_EMAIL_SUCCESS_MESSAGE,
  EXAMINATION_IS_STARTED,
  EXAMINATION_IS_READ,
  EXAMINATION_IS_FINISHED,
} from './actions';

function _chosePerson(people, action) {
  const peopleCopy = Object.assign([], people);

  // deselect current chosen person
  _.find(peopleCopy, { chosen: true }).chosen = false;
  // select person by a specified id
  _.find(peopleCopy, { id: action.personId }).chosen = true;

  return peopleCopy;
}

function peopleReducer(people = initialData.people, action) {
  switch (action.type) {
    case CHOSE_PERSON:
      return _chosePerson(people, action);
    default:
      return people;
  }
}

function subscriptionReducer(subscriptionForm = initialData.subscriptionForm, action) {
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

function examinationReducer(examination = initialData.examination, action) {
  switch (action.type) {
    case EXAMINATION_IS_STARTED:
      return Object.assign(examination, { isStarted: true, startedTime: action.time });
    case EXAMINATION_IS_READ:
      return Object.assign(examination, { isRead: true, finishedTime: action.time });
    case EXAMINATION_IS_FINISHED:
      return Object.assign(examination, { isFinished: true });
    default:
      return examination;
  }
}

const rootReducer = combineReducers({
  subscriptionForm: subscriptionReducer,
  people: peopleReducer,
  examination: examinationReducer,
});

export default rootReducer;

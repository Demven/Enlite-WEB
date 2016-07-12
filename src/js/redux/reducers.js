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
  CANCEL_EXAMINATION,
  CHECK_EXAMINATION_ANSWER,
  SHOW_EXAMINATION_TEST_ERROR,
} from './actions';

function _chosePerson(people, action) {
  const peopleCopy = _.assign([], people);

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
      return _.assign({}, subscriptionForm, { email: action.email });
    case SHOW_EMAIL_ERROR_MESSAGE:
      return _.assign({}, subscriptionForm, {
        message: {
          text: action.text,
          isError: true,
          isSuccess: false,
        },
      });
    case SHOW_EMAIL_SUCCESS_MESSAGE:
      return _.assign(subscriptionForm, {
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

function _checkExaminationAnswer(examination, { testId, userAnswer }) {
  const newTest = _.assign([], examination.test);
  const testToCheck = _.find(newTest, { id: testId });
  const indexOfTest = _.indexOf(newTest, testToCheck);
  const checkedTest = _.assign({}, testToCheck, { userAnswer });

  // replace old test with new object
  newTest.splice(indexOfTest, 1, checkedTest);

  return _.assign({}, examination, { test: newTest });
}

let examinationInitialTest;

function examinationReducer(examination = initialData.examination, action) {
  switch (action.type) {
    case EXAMINATION_IS_STARTED:
      examinationInitialTest = _.assign([], initialData.examination.test);
      return _.assign({}, examination, { isStarted: true, startedTime: action.time });
    case EXAMINATION_IS_READ:
      return _.assign({}, examination, { isRead: true, finishedTime: action.time });
    case EXAMINATION_IS_FINISHED:
      return _.assign({}, examination, { isFinished: true });
    case CANCEL_EXAMINATION:
      return _.assign({}, examination, {
        isStarted: false,
        isRead: false,
        isFinished: false,
        startedTime: 0,
        finishedTime: 0,
        testError: '',
        test: examinationInitialTest,
      });
    case CHECK_EXAMINATION_ANSWER:
      return _checkExaminationAnswer(examination, action);
    case SHOW_EXAMINATION_TEST_ERROR:
      return _.assign({}, examination, { testError: action.testError });
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

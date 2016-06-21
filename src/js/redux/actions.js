import store from './store';

export const CHOSE_PERSON = 'CHOSE_PERSON';

export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const SHOW_EMAIL_ERROR_MESSAGE = 'SHOW_EMAIL_ERROR_MESSAGE';
export const SHOW_EMAIL_SUCCESS_MESSAGE = 'SHOW_EMAIL_SUCCESS_MESSAGE';

export const EXAMINATION_IS_STARTED = 'EXAMINATION_IS_STARTED';
export const EXAMINATION_IS_READ = 'EXAMINATION_IS_READ';
export const EXAMINATION_IS_FINISHED = 'EXAMINATION_IS_FINISHED';
export const CANCEL_EXAMINATION = 'CANCEL_EXAMINATION';
export const CHECK_EXAMINATION_ANSWER = 'CHECK_EXAMINATION_ANSWER';
export const SHOW_EXAMINATION_TEST_ERROR = 'SHOW_EXAMINATION_TEST_ERROR';

export function chosePersonAction(personId) {
  store.dispatch({
    type: CHOSE_PERSON,
    personId,
  });
}

export function updateEmailAction(email) {
  store.dispatch({
    type: UPDATE_EMAIL,
    email,
  });
}

export function showEmailErrorMessageAction(text) {
  store.dispatch({
    type: SHOW_EMAIL_ERROR_MESSAGE,
    text,
  });
}

export function showEmailSuccessMessageAction(text) {
  store.dispatch({
    type: SHOW_EMAIL_SUCCESS_MESSAGE,
    text,
  });
}

export function examinationIsStartedAction(time) {
  store.dispatch({
    type: EXAMINATION_IS_STARTED,
    time,
  });
}

export function examinationIsReadAction(time) {
  store.dispatch({
    type: EXAMINATION_IS_READ,
    time,
  });
}

export function examinationIsFinishedAction() {
  store.dispatch({
    type: EXAMINATION_IS_FINISHED,
  });
}

export function cancelExamination() {
  store.dispatch({
    type: CANCEL_EXAMINATION,
  });
}

export function checkExaminationAnswer(testId, userAnswer) {
  store.dispatch({
    type: CHECK_EXAMINATION_ANSWER,
    testId,
    userAnswer,
  });
}

export function showExaminationTestError(testError) {
  store.dispatch({
    type: SHOW_EXAMINATION_TEST_ERROR,
    testError,
  });
}

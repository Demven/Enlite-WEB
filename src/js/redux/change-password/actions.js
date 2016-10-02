import store from './store';

export const UPDATE_CURRENT_PASS = 'UPDATE_CURRENT_PASS';
export const UPDATE_NEW_PASS = 'UPDATE_NEW_PASS';
export const UPDATE_REPEAT_PASS = 'UPDATE_REPEAT_PASS';
export const SHOW_UPDATE_PASS_ERROR_MESSAGE = 'SHOW_EMAIL_ERROR_MESSAGE';
export const SHOW_UPDATE_PASS_SUCCESS_MESSAGE = 'SHOW_EMAIL_SUCCESS_MESSAGE';

export function updateCurrentPassAction(currentPass) {
  store.dispatch({
    type: UPDATE_CURRENT_PASS,
    currentPass,
  });
}

export function updateNewPassAction(newPass) {
  store.dispatch({
    type: UPDATE_NEW_PASS,
    newPass,
  });
}

export function updateRepeatPassAction(repeatPass) {
  store.dispatch({
    type: UPDATE_REPEAT_PASS,
    repeatPass,
  });
}

export function showUpdatePassErrorMessageAction(text) {
  store.dispatch({
    type: SHOW_UPDATE_PASS_ERROR_MESSAGE,
    text,
  });
}

export function showUpdatePassSuccessMessageAction(text) {
  store.dispatch({
    type: SHOW_UPDATE_PASS_SUCCESS_MESSAGE,
    text,
  });
}

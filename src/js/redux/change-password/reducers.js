import _ from 'lodash';
import initialData from '../../data/change-password';
import { combineReducers } from 'redux';
import {
  UPDATE_CURRENT_PASS,
  UPDATE_NEW_PASS,
  UPDATE_REPEAT_PASS,
  SHOW_UPDATE_PASS_ERROR_MESSAGE,
  SHOW_UPDATE_PASS_SUCCESS_MESSAGE,
} from './actions';

function changePasswordReducer(changePasswordForm = initialData.changePasswordForm, action) {
  switch (action.type) {
    case UPDATE_CURRENT_PASS:
      return _.assign({}, changePasswordForm, { currentPass: action.currentPass });
    case UPDATE_NEW_PASS:
      return _.assign({}, changePasswordForm, { newPass: action.newPass });
    case UPDATE_REPEAT_PASS:
      return _.assign({}, changePasswordForm, { repeatPass: action.repeatPass });
    case SHOW_UPDATE_PASS_ERROR_MESSAGE:
      return _.assign({}, changePasswordForm, {
        message: {
          text: action.text,
          isError: true,
          isSuccess: false,
        },
      });
    case SHOW_UPDATE_PASS_SUCCESS_MESSAGE:
      return _.assign(changePasswordForm, {
        message: {
          text: action.text,
          isError: false,
          isSuccess: true,
        },
      });
    default:
      return changePasswordForm;
  }
}

const rootReducer = combineReducers({
  changePasswordForm: changePasswordReducer,
});

export default rootReducer;

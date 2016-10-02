import m from 'mithril';
import classnames from 'classnames';
import { MithrilComponent, PropTypes } from 'mithril-proptypes';
import {
  updateCurrentPassAction,
  updateNewPassAction,
  updateRepeatPassAction,
  showUpdatePassErrorMessageAction,
  showUpdatePassSuccessMessageAction,
} from '../../../../redux/change-password/actions';
import { isPassword } from '../../../../services/validators';

const EVENT = {
  KEY_PRESS: 'keypress',
};

const propTypes = {
  changePasswordForm: PropTypes.objectWith({
    currentPass: PropTypes.string,
    newPass: PropTypes.string,
    repeatPass: PropTypes.string,
    message: PropTypes.object,
  }),
  email: PropTypes.string.isRequired,
};

class ChangePasswordForm extends MithrilComponent {
  constructor(props) {
    super(props, propTypes);

    this.componentName = m.prop('ChangePasswordForm');
    this.componentElement = m.prop(null);
    this.emailValue = m.prop(props.email);
    this.currentPassValue = m.prop(props.changePasswordForm.currentPass);
    this.newPassValue = m.prop(props.changePasswordForm.newPass);
    this.repeatPassValue = m.prop(props.changePasswordForm.repeatPass);

    this.onSubmit = this.onSubmit.bind(this);
    this.onMount = this.onMount.bind(this);
    this.onUnload = this.onUnload.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onMount(element, isInit) {
    if (!isInit) {
      element.addEventListener(EVENT.KEY_PRESS, this.onKeyPress);
      // save element
      this.componentElement(element);
    }
  }

  onUnload() {
    // remove events from root element
    if (this.componentElement()) {
      this.componentElement().removeEventListener(EVENT.KEY_PRESS, this.onKeyPress);
    }
  }

  onKeyPress(ev) {
    if (ev.keyCode === 13 || +ev.charCode === 13 || ev.code === 'Enter') {
      this.currentPassValue(this.componentElement().querySelector('.ChangePasswordForm__current-pass').value.trim());
      this.newPassValue(this.componentElement().querySelector('.ChangePasswordForm__new-pass').value.trim());
      this.repeatPassValue(this.componentElement().querySelector('.ChangePasswordForm__repeat-pass').value.trim());

      this.onSubmit();
    }
  }

  onSubmit() {
    const isCurrentPassValid = isPassword(this.currentPassValue());
    const isNewPassValid = isPassword(this.newPassValue());
    const isRepeatPassValid = isPassword(this.repeatPassValue());

    let errorMsg;
    if (!isCurrentPassValid) {
      errorMsg = 'Проверьте правильность текущего пароля!';
    } else if (!isNewPassValid) {
      errorMsg = 'Проверьте новый пароль. Пароль может состоять только из букв и цифр и должен быть не короче 6 символов.';
    } else if (!isRepeatPassValid) {
      errorMsg = 'Проверьте повторный ввод нового пароля. Пароль может состоять только из букв и цифр и должен быть не короче 6 символов.';
    } else if (this.newPassValue() !== this.repeatPassValue()) {
      errorMsg = 'Пароли не совпадают, попробуйте заново ввести новый пароль и его повтор';
    }

    const isValid = !errorMsg;

    if (isValid) {
      m.request(
        {
          method: 'POST',
          url: '/change-password',
          data: {
            email: this.emailValue(),
            currentPass: this.currentPassValue(),
            newPass: this.newPassValue(),
          },
        })
        .then(
          () => {
            const successMsg = 'Мы успешно сохранили ваш новый пароль!';
            showUpdatePassSuccessMessageAction(successMsg);
          },
          () => {
            errorMsg = 'Что-то пошло не так и новый пароль не удалось сохранить. Попробуйте еще раз сейчас или позже.';
            showUpdatePassErrorMessageAction(errorMsg);
          });
    } else {
      showUpdatePassErrorMessageAction(errorMsg);
    }
  }

  view() {
    const { changePasswordForm: { currentPass, newPass, repeatPass, message } } = this.props;

    let messageNode = null;
    if (message.text) {
      messageNode = (
        <div className="ChangePasswordForm__message">
          {message.text}
        </div>
      );
    }

    const formClass = classnames('ChangePasswordForm', {
      'ChangePasswordForm--success': message.isSuccess,
      'ChangePasswordForm--error': message.isError,
    });

    return (
      <div className={formClass} config={this.onMount}>
        <input
          type="email"
          className="ChangePasswordForm__input ChangePasswordForm__current-pass"
          placeholder="Текущий пароль"
          onchange={m.withAttr('value', updateCurrentPassAction)}
          value={currentPass}
        />
        <input
          type="email"
          className="ChangePasswordForm__input ChangePasswordForm__new-pass"
          placeholder="Новый пароль"
          onchange={m.withAttr('value', updateNewPassAction)}
          value={newPass}
        />
        <input
          type="email"
          className="ChangePasswordForm__input ChangePasswordForm__repeat-pass"
          placeholder="Еще раз новый пароль"
          onchange={m.withAttr('value', updateRepeatPassAction)}
          value={repeatPass}
        />
        <button
          className="ChangePasswordForm__button"
          onclick={this.onSubmit}
        >
          Сохранить
        </button>

        {messageNode}
      </div>
    );
  }
}

export default ChangePasswordForm;

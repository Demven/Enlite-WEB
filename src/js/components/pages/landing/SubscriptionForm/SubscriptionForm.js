import m from 'mithril';
import classnames from 'classnames';
import { MithrilComponent, PropTypes } from 'mithril-proptypes';
import { updateEmailAction, showEmailErrorMessageAction, showEmailSuccessMessageAction } from '../../../../redux/actions';
import { EMAIL_ERROR, validateEmail } from '../../../../services/validator';

const propTypes = {
  email: PropTypes.string.isRequired,
  message: PropTypes.objectWith({
    text: PropTypes.string,
    isError: PropTypes.boolean,
    isSuccess: PropTypes.boolean,
  }),
};

const EVENT = {
  KEY_PRESS: 'keypress',
};

class SubscriptionForm extends MithrilComponent {
  constructor(props) {
    super(props, propTypes);

    this.componentName = m.prop('SubscriptionForm');
    this.componentElement = m.prop(null);

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

  onSubmit() {
    const { isValid, emailError } = validateEmail(this.props.email);

    if (isValid) {
      const successMsg = 'Спасибо за участие! Мы выслали подтверждение вам на почту, пожалуйста проверьте свой почтовый ящик.';
      showEmailSuccessMessageAction(successMsg);
    } else {
      let errorMsg;
      switch (emailError) {
        case EMAIL_ERROR.EMPTY:
          break;
        case EMAIL_ERROR.LONG:
          errorMsg = 'Пожалуйста проверьте адрес, вы ввели слишком длинный!';
          break;
        case EMAIL_ERROR.LONG_FIRST_PART:
          errorMsg = 'Пожалуйста проверьте адрес, вы ввели слишком много символов перед `@`!';
          break;
        case EMAIL_ERROR.LONG_SECOND_PART:
          errorMsg = 'Пожалуйста проверьте адрес, вы ввели слишком много символов после `@`!';
          break;
        case EMAIL_ERROR.INCORRECT:
          errorMsg = 'Пожалуйста проверьте адрес, он введен некорректно!';
          break;
        default:
          errorMsg = 'Пожалуйста проверьте адрес, он введен некорректно!';
          break;
      }

      showEmailErrorMessageAction(errorMsg);
    }
  }

  onKeyPress(ev) {
    if (ev.keyCode === 13 || +ev.charCode === 13 || ev.code === 'Enter') {
      this.props.email = this.componentElement().querySelector('.SubscriptionForm__input').value;

      this.onSubmit();
    }
  }

  view() {
    const { email, message } = this.props;

    let messageNode = null;
    if (message.text) {
      messageNode = (
        <div className="SubscriptionForm__message">
          {message.text}
        </div>
      );
    }

    const formClass = classnames('SubscriptionForm', {
      'SubscriptionForm--success': message.isSuccess,
      'SubscriptionForm--error': message.isError,
    });

    return (
      <div className={formClass} config={this.onMount}>
        <h4 className="SubscriptionForm__title">Получи доступ к закрытому тестированию</h4>
        <input
          type="email"
          className="SubscriptionForm__input"
          placeholder="E-mail"
          onchange={m.withAttr('value', updateEmailAction)}
          value={email}
        />
        <button
          className="SubscriptionForm__button"
          onclick={this.onSubmit}
        >
          Получить приглашение
        </button>

        {messageNode}
      </div>
    );
  }
}

export default SubscriptionForm;

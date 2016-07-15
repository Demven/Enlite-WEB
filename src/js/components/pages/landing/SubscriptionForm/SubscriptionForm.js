import m from 'mithril';
import classnames from 'classnames';
import { MithrilComponent, PropTypes } from 'mithril-proptypes';
import {
  updateEmailAction,
  showEmailErrorMessageAction,
  showEmailSuccessMessageAction,
} from '../../../../redux/actions';
import { EMAIL_ERROR, validateEmail } from '../../../../services/validator';

const propTypes = {
  formData: PropTypes.objectWith({
    email: PropTypes.string,
    message: PropTypes.object,
  }),
  inExamination: PropTypes.boolean,
};

const defaultProps = {
  inExamination: false,
};

const EVENT = {
  KEY_PRESS: 'keypress',
};

class SubscriptionForm extends MithrilComponent {
  constructor(props) {
    super(props, propTypes, defaultProps);

    this.componentName = m.prop('SubscriptionForm');
    this.componentElement = m.prop(null);
    this.emailValue = m.prop(props.formData.email);

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
    const { isValid, emailError } = validateEmail(this.emailValue());

    if (isValid) {
      m.request({ method: 'GET', url: `/addcontact/${this.emailValue()}` });

      const successMsg = 'Спасибо за участие! Мы выслали подтверждение вам на почту, пожалуйста, проверьте свой почтовый ящик.';
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
      this.emailValue(this.componentElement().querySelector('.SubscriptionForm__input').value);

      this.onSubmit();
    }
  }

  view() {
    const { formData: { email, message }, inExamination } = this.props;

    let messageNode = null;
    if (message.text) {
      messageNode = (
        <div className="SubscriptionForm__message">
          {message.text}
        </div>
      );
    }

    const formClass = classnames('SubscriptionForm', {
      'SubscriptionForm--in-examination': inExamination,
      'SubscriptionForm--success': message.isSuccess,
      'SubscriptionForm--error': message.isError,
    });

    return (
      <div className={formClass} config={this.onMount}>
        <h4 className="SubscriptionForm__title">
          {
            inExamination ?
              'Получи доступ к закрытому тестированию, чтобы увеличить скорость чтения в 3 раза' :
              'Получи доступ к закрытому тестированию'
          }
        </h4>
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

import m from 'mithril';
import { MithrilComponent, PropTypes } from 'mithril-proptypes';
import { trackPageView } from '../../../../analytics/google';
import reduxStore from '../../../../redux/change-password/store';
import _ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm';

const propTypes = {
  email: PropTypes.string,
};

class ChangePassword extends MithrilComponent {
  constructor(props) {
    super(props, propTypes);

    this.onMount = this.onMount.bind(this);

    this.componentName = m.prop('ChangePassword');
    this.email = m.prop(props ? props.email : '');
  }

  onMount(element, isInit) {
    if (!isInit) {
      trackPageView();
    }
  }

  view() {
    if (!this.email()) {
      this.email(m.route.param('email'));
    }

    const { changePasswordForm } = reduxStore.getState();

    const ChangePasswordForm = new _ChangePasswordForm({ changePasswordForm, email: this.email() });

    return (
      <div className="ChangePassword" config={this.onMount}>
        <div className="ChangePassword__header">
          <a href="/">
            <img className="ChangePassword__logo" src="/images/ic/logo.png" alt="Enlite logo" />
          </a>
        </div>
        <h3 className="ChangePassword__title">Смена пароля:</h3>
        <div className="ChangePassword__form">
          <ChangePasswordForm />
        </div>
        <a href="/" className="ChangePassword__link-back">Вернуться на сайт</a>
      </div>
    );
  }
}

export default ChangePassword;

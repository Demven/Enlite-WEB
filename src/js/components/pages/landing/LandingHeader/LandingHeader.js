import m from 'mithril';
import { MithrilComponent, PropTypes } from 'mithril-proptypes';
import scrollTo from '../../../../services/pageScroller';
import _SubscriptionForm from '../SubscriptionForm/SubscriptionForm';
import { getOffsetToExaminationSection } from '../examination/Examination/Examination';

const propTypes = {
  subscriptionForm: PropTypes.object.isRequired,
};

class LandingHeader extends MithrilComponent {
  constructor(props) {
    super(props, propTypes);

    this.componentName = m.prop('LandingHeader');
  }

  view() {
    const SubscriptionForm = new _SubscriptionForm(this.props.subscriptionForm);

    return (
      <section className="LandingHeader">
        <div className="LandingHeader__bg"></div>

        <div className="LandingHeader__left-container">
          <div className="LandingHeader__logo"></div>
          <div className="LandingHeader__description">Тренажер быстрого и эффективного чтения</div>
          <ul className="LandingHeader__features">
            <li>Значительно увеличивает скорость чтения</li>
            <li>Улучшает память, внимание и концентрацию</li>
            <li>Развивает воображение</li>
          </ul>
        </div>

        <div className="LandingHeader__center-container">
          <div className="LandingHeader__mobile-screen"></div>
        </div>

        <div className="LandingHeader__right-container">
          <SubscriptionForm />

          <div
            className="LandingHeader__scroller"
            onclick={() => {
              scrollTo(getOffsetToExaminationSection());
            }}
          >
            <div className="LandingHeader__icon"></div>
            <div className="LandingHeader__title">Проверить скорость чтения</div>
          </div>
        </div>
      </section>
    );
  }
}

export default LandingHeader;

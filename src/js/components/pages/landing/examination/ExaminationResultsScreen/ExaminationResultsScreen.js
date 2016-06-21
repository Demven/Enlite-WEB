import m from 'mithril';
import classNames from 'classnames';
import { MithrilComponent, PropTypes } from 'mithril-proptypes';
import _ExaminationScreenTitle from '../ExaminationScreenTitle/ExaminationScreenTitle';
import _SubscriptionForm from '../../SubscriptionForm/SubscriptionForm';

const propTypes = {
  startedTime: PropTypes.number.isRequired,
  finishedTime: PropTypes.number.isRequired,
  subscriptionForm: PropTypes.object.isRequired,
};

class ExaminationResultsScreen extends MithrilComponent {
  constructor(props) {
    super(props, propTypes);

    this.name = m.prop('ExaminationResultsScreen');
  }

  view() {
    const { startedTime, finishedTime, subscriptionForm: { message } } = this.props;

    const ExaminationScreenTitle = new _ExaminationScreenTitle({ text: 'Ваша скорость чтения составляет' });
    const SubscriptionForm = new _SubscriptionForm({
      formData: this.props.subscriptionForm,
      inExamination: true,
    });

    const screenClass = classNames('ExaminationResultsScreen', {
      'ExaminationResultsScreen--success': message && message.isSuccess,
    });

    return (
      <div className={screenClass}>
        <div className="ExaminationResultsScreen__corner ExaminationResultsScreen__corner--tl"></div>
        <div className="ExaminationResultsScreen__corner ExaminationResultsScreen__corner--tr"></div>
        <div className="ExaminationResultsScreen__corner ExaminationResultsScreen__corner--bl"></div>
        <div className="ExaminationResultsScreen__corner ExaminationResultsScreen__corner--br"></div>

        <div className="ExaminationResultsScreen__title">
          <ExaminationScreenTitle />
        </div>

        <div className="ExaminationResultsScreen__result">
          <div className="ExaminationResultsScreen__result-value">{(finishedTime - startedTime) / 1000}</div>
          <div className="ExaminationResultsScreen__result-title">сл/мин</div>
        </div>

        <div className="ExaminationResultsScreen__form">
          <SubscriptionForm />
        </div>

      </div>
    );
  }
}

export default ExaminationResultsScreen;

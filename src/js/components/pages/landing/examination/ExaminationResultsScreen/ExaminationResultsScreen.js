import m from 'mithril';
import _ from 'lodash';
import classNames from 'classnames';
import { MithrilComponent, PropTypes } from 'mithril-proptypes';
import _ExaminationScreenTitle from '../ExaminationScreenTitle/ExaminationScreenTitle';
import _SubscriptionForm from '../../SubscriptionForm/SubscriptionForm';

const propTypes = {
  startedTime: PropTypes.number.isRequired,
  finishedTime: PropTypes.number.isRequired,
  test: PropTypes.arrayOf({
    id: PropTypes.number,
    question: PropTypes.string,
    answer: PropTypes.boolean,
    userAnswer: PropTypes.boolean,
  }).isRequired,
  subscriptionForm: PropTypes.object.isRequired,
};

class ExaminationResultsScreen extends MithrilComponent {
  constructor(props) {
    super(props, propTypes);

    this.componentName = m.prop('ExaminationResultsScreen');

    this.calculateIntegralSpeed = this.calculateIntegralSpeed.bind(this);
  }

  calculateIntegralSpeed() {
    const { startedTime, finishedTime } = this.props;

    const WORDS_COUNT = 342;
    const timeSpent = (finishedTime - startedTime) / 1000; // seconds
    const baseSpeed = (WORDS_COUNT / timeSpent) * 60; // words/min
    const wrongAnswersCount = _.reduce(this.props.test, (sum, test) => {
      return (test.answer === test.userAnswer) ? sum : sum + 1;
    }, 0);

    return Math.round(baseSpeed - (baseSpeed * wrongAnswersCount * 0.15));
  }

  view() {
    const { subscriptionForm: { message } } = this.props;

    const ExaminationScreenTitle = new _ExaminationScreenTitle({ text: 'Ваша скорость чтения составляет' });
    const SubscriptionForm = new _SubscriptionForm({
      formData: this.props.subscriptionForm,
      inExamination: true,
    });

    const screenClass = classNames('ExaminationResultsScreen', {
      'ExaminationResultsScreen--success': message && message.isSuccess,
    });

    const integralSpeed = this.calculateIntegralSpeed();
    let speedValue = integralSpeed;
    if (integralSpeed.toString().length === 3) {
      speedValue = `0${integralSpeed}`;
    } else if (integralSpeed.toString().length === 2) {
      speedValue = `00${integralSpeed}`;
    }

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
          <div className="ExaminationResultsScreen__result-value">{speedValue}</div>
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

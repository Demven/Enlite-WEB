import m from 'mithril';
import classNames from 'classnames';
import { MithrilComponent, PropTypes } from 'mithril-proptypes';
import {
  examinationIsStartedAction,
  examinationIsReadAction,
  examinationIsFinishedAction,
  cancelExamination,
  checkExaminationAnswer,
  showExaminationTestError,
} from '../../../../../redux/landing/actions';
import { trackEvent } from '../../../../../analytics/google';
import _ExaminationStartScreen from '../ExaminationStartScreen/ExaminationStartScreen';
import _ExaminationReadingScreen from '../ExaminationReadingScreen/ExaminationReadingScreen';
import _ExaminationTestScreen from '../ExaminationTestScreen/ExaminationTestScreen';
import _ExaminationResultsScreen from '../ExaminationResultsScreen/ExaminationResultsScreen';

const EXAMINATION_CLASS_NAME = '.Examination';

export function getOffsetToExaminationSection() {
  return document.querySelector(EXAMINATION_CLASS_NAME).offsetTop + 2;
}

const propTypes = {
  examination: PropTypes.objectWith({
    isStarted: PropTypes.boolean,
    isRead: PropTypes.boolean,
    isFinished: PropTypes.boolean,
    startedTime: PropTypes.number,
    finishedTime: PropTypes.number,
    testError: PropTypes.string,
    test: PropTypes.array,
  }).isRequired,
  subscriptionForm: PropTypes.object.isRequired,
};

function fitContainerToWindowHeight() {
  const offset = getOffsetToExaminationSection();
  document.documentElement.scrollTop = offset;
  document.body.scrollTop = offset;
  document.body.className = 'prevent-scroll full-height';
}

class Examination extends MithrilComponent {
  constructor(props) {
    super(props, propTypes);

    this.name = m.prop('Examination');

    this.onStartExamination = this.onStartExamination.bind(this);
    this.onFinishedReading = this.onFinishedReading.bind(this);
    this.onFinishedTest = this.onFinishedTest.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.addEvents = this.addEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
  }

  onStartExamination() {
    const startedTime = +(new Date());
    examinationIsStartedAction(startedTime);

    trackEvent('click', 'start-examination');

    window.setTimeout(() => {
      fitContainerToWindowHeight();
    }, 10);

    this.addEvents();
  }

  onFinishedReading() {
    this.removeEvents();

    const finishedTime = +(new Date());
    examinationIsReadAction(finishedTime);

    trackEvent('click', 'read-examination');
  }

  onFinishedTest() {
    this.removeEvents();
    examinationIsFinishedAction();

    trackEvent('click', 'finish-examination');

    document.body.className = '';
  }

  onCancel() {
    this.removeEvents();
    cancelExamination();

    trackEvent('click', 'cancel-examination');

    document.body.className = '';
  }

  addEvents() {
    window.addEventListener('resize', fitContainerToWindowHeight);
  }

  removeEvents() {
    window.removeEventListener('resize', fitContainerToWindowHeight);
  }

  view() {
    const {
      examination: {
        isStarted,
        isRead,
        isFinished,
        startedTime,
        finishedTime,
        testError,
        test,
      },
      subscriptionForm,
    } = this.props;

    const examinationClasses = classNames('Examination', {
      'Examination--is-started': isStarted,
      'Examination--is-read': isRead,
      'Examination--is-finished': isFinished,
    });

    let screen = null;
    if (!isStarted) {
      const ExaminationStartScreen = new _ExaminationStartScreen({ onStartExamination: this.onStartExamination });

      screen = <ExaminationStartScreen />;
    } else if (isStarted && !isRead) {
      const ExaminationReadingScreen = new _ExaminationReadingScreen({ onFinishedReading: this.onFinishedReading });

      screen = <ExaminationReadingScreen />;
    } else if (isStarted && isRead && !isFinished) {
      const ExaminationTestScreen = new _ExaminationTestScreen({
        onFinishedTest: this.onFinishedTest,
        checkExaminationAnswer,
        showExaminationTestError,
        testError,
        test,
      });

      screen = <ExaminationTestScreen />;
    } else if (isStarted && isRead && isFinished) {
      const ExaminationResultsScreen = new _ExaminationResultsScreen({ startedTime, finishedTime, test, subscriptionForm });

      screen = <ExaminationResultsScreen />;
    }

    let closeButton = null;
    if (isStarted && !isFinished) {
      closeButton = (
        <div
          className="Examination__close"
          onclick={this.onCancel}
        ></div>
      );
    }

    return (
      <section className={examinationClasses}>
        {closeButton}
        <div className="Examination__screen-wrapper">
          {screen}
        </div>
      </section>
    );
  }
}

export default Examination;

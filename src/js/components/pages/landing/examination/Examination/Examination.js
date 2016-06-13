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
} from '../../../../../redux/actions';
import _ExaminationStartScreen from '../ExaminationStartScreen/ExaminationStartScreen';
import _ExaminationReadingScreen from '../ExaminationReadingScreen/ExaminationReadingScreen';
import _ExaminationTestScreen from '../ExaminationTestScreen/ExaminationTestScreen';
import _ExaminationResultsScreen from '../ExaminationResultsScreen/ExaminationResultsScreen';

const EXAMINATION_CLASS_NAME = '.Examination';

export function getOffsetToExaminationSection() {
  return document.querySelector(EXAMINATION_CLASS_NAME).offsetTop + 2;
}

const propTypes = {
  isStarted: PropTypes.boolean.isRequired,
  isRead: PropTypes.boolean.isRequired,
  isFinished: PropTypes.boolean.isRequired,
  startedTime: PropTypes.number.isRequired,
  finishedTime: PropTypes.number.isRequired,
  testError: PropTypes.string,
  test: PropTypes.array.isRequired,
};

class Examination extends MithrilComponent {
  constructor(props) {
    super(props, propTypes);

    this.name = m.prop('Examination');

    this.onStartExamination = this.onStartExamination.bind(this);
    this.onFinishedReading = this.onFinishedReading.bind(this);
    this.onFinishedTest = this.onFinishedTest.bind(this);
  }

  onStartExamination() {
    const startedTime = +(new Date());
    examinationIsStartedAction(startedTime);

    document.body.scrollTop = getOffsetToExaminationSection();
    document.body.className = 'prevent-scroll full-height';
  }

  onFinishedReading() {
    const finishedTime = +(new Date());
    examinationIsReadAction(finishedTime);
  }

  onFinishedTest() {
    examinationIsFinishedAction();

    document.body.className = '';
  }

  onCancel() {
    cancelExamination();

    document.body.className = '';
  }

  view() {
    const {
      isStarted,
      isRead,
      isFinished,
      startedTime,
      finishedTime,
      testError,
      test,
    } = this.props;

    const examinationClasses = classNames('Examination', {
      'Examination--started': isStarted,
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
      const ExaminationResultsScreen = new _ExaminationResultsScreen({ startedTime, finishedTime });

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

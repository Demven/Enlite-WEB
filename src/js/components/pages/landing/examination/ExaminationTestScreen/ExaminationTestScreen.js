import m from 'mithril';
import { MithrilComponent, PropTypes } from 'mithril-proptypes';
import Test from '../../../../../model/Test';
import _ExaminationButton from '../ExaminationButton/ExaminationButton';
import _ExaminationScreenTitle from '../ExaminationScreenTitle/ExaminationScreenTitle';

const propTypes = {
  onFinishedTest: PropTypes.function.isRequired,
  checkExaminationAnswer: PropTypes.function.isRequired,
  showExaminationTestError: PropTypes.function.isRequired,
  testError: PropTypes.string,
  test: PropTypes.arrayOf({
    id: PropTypes.number,
    question: PropTypes.string,
    answer: PropTypes.boolean,
//  userAnswer: PropTypes.boolean || undefined
  }).isRequired,
};

class ExaminationTestScreen extends MithrilComponent {
  constructor(props) {
    super(props, propTypes);

    this.name = m.prop('ExaminationTestScreen');
    this.tests = this.props.test.map((testData) => new Test(testData));

    this.renderTestAnswers = this.renderTestAnswers.bind(this);
    this.checkAllAnswers = this.checkAllAnswers.bind(this);
    this.finishTest = this.finishTest.bind(this);
  }

  checkAllAnswers() {
    let passed = true;

    this.tests.forEach((test) => {
      if (test.userAnswer() === undefined) {
        passed = false;
      }
    });

    return passed;
  }

  finishTest() {
    // if (this.checkAllAnswers()) {
       this.props.onFinishedTest();
    // } else {
    //   this.props.showExaminationTestError('Пожалуйста, ответьте на все вопросы, чтобы завершить тест.');
    // }
  }

  renderTestAnswers() {
    return this.tests.map((test, index) => {
      const i = index + 1;

      return (
        <li className="ExaminationTestScreen__test">
          <h3 className="ExaminationTestScreen__test-question">{test.question()}</h3>
          <div className="ExaminationTestScreen__test-answers">
            <div className="ExaminationTestScreen__test-answer">
              <input
                type="radio"
                className="ExaminationTestScreen__radio"
                id={`test-${i}-1`}
                name={`test-${i}`}
                value="1"
              />
              <label
                for={`test-${i}-1`}
                className="ExaminationTestScreen__radio-label"
                onclick={() => {
                  this.props.checkExaminationAnswer(test.id(), true);
                }}
              >
                <div className="ExaminationTestScreen__radio-fake"></div>
                <span className="ExaminationTestScreen__radio-label-text">Верно</span>
              </label>
            </div>

            <div className="ExaminationTestScreen__test-answer">
              <input
                type="radio"
                className="ExaminationTestScreen__radio"
                id={`test-${i}-0`}
                name={`test-${i}`}
                value="0"
              />
              <label
                for={`test-${i}-0`}
                className="ExaminationTestScreen__radio-label"
                onclick={() => {
                  this.props.checkExaminationAnswer(test.id(), false);
                }}
              >
                <div className="ExaminationTestScreen__radio-fake"></div>
                <span className="ExaminationTestScreen__radio-label-text">Неверно</span>
              </label>
            </div>
          </div>
        </li>
      );
    });
  }

  view() {
    const { testError } = this.props;

    const ExaminationButton = new _ExaminationButton({
      title: 'Завершить',
      onClick: this.finishTest,
    });

    const ExaminationScreenTitle = new _ExaminationScreenTitle({ text: 'Ответьте на шесть вопросов, чтобы оценить эффективность чтения' });

    let errorMsg = null;
    if (testError) {
      errorMsg = <div className="ExaminationTestScreen__error-msg">{testError}</div>;
    }

    return (
      <section className="ExaminationTestScreen">
        <ExaminationScreenTitle />

        <ul className="ExaminationTestScreen__test-list">
          {this.renderTestAnswers()}
        </ul>

        {errorMsg}

        <ExaminationButton />
      </section>
    );
  }
}

export default ExaminationTestScreen;

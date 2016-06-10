import m from 'mithril';
import { MithrilComponent, PropTypes } from 'mithril-proptypes';
import _ExaminationButton from '../ExaminationButton/ExaminationButton';
import _ExaminationScreenTitle from '../ExaminationScreenTitle/ExaminationScreenTitle';

const propTypes = {
  onFinishedTest: PropTypes.function.isRequired
};

class ExaminationTestScreen extends MithrilComponent {
  constructor(props) {
    super(props, propTypes);

    this.name = m.prop('ExaminationTestScreen');
  }

  view() {
    const { onFinishedTest } = this.props;

    const ExaminationButton = new _ExaminationButton({
      title: 'Завершить',
      onClick: onFinishedTest,
    });

    const ExaminationScreenTitle = new _ExaminationScreenTitle({ text: 'Ответьте на шесть вопросов, чтобы оценить эффективность чтения' });

    return (
      <section className="ExaminationTestScreen">
        <ExaminationScreenTitle />

        <ul className="ExaminationTestScreen__test-list">
          <li className="ExaminationTestScreen__test">
            <h3 className="ExaminationTestScreen__test-question">В 21 веке стало сложнее создавать и распространять информацию.</h3>
            <div className="ExaminationTestScreen__test-answers">
              <div className="ExaminationTestScreen__test-answer">
                <input className="ExaminationTestScreen__radio" id="test-1-1" type="radio" name="test-1" value="1" />
                <label for="test-1-1" className="ExaminationTestScreen__radio-label">
                  <div className="ExaminationTestScreen__radio-fake"></div>
                  <span className="ExaminationTestScreen__radio-label-text">Верно</span>
                </label>
              </div>

              <div className="ExaminationTestScreen__test-answer">
                <input className="ExaminationTestScreen__radio" id="test-1-0" type="radio" name="test-1" value="0" />
                <label for="test-1-0" className="ExaminationTestScreen__radio-label">
                  <div className="ExaminationTestScreen__radio-fake"></div>
                  <span className="ExaminationTestScreen__radio-label-text">Неверно</span>
                </label>
              </div>
            </div>
          </li>
          <li className="ExaminationTestScreen__test">
            <h3 className="ExaminationTestScreen__test-question">
              Ключевые моменты истории, ускорившие распространение информации
              по миру, – это создание печатного станка и изобретение интернета.
            </h3>
            <div className="Examination__test-answers">
              <input className="ExaminationTestScreen__test-answer" id="test-2-1" type="radio" name="test-2" value="1" /><label for="test-2-1">Верно</label>
              <input className="ExaminationTestScreen__test-answer" id="test-2-0" type="radio" name="test-2" value="0" /><label for="test-2-0">Неверно</label>
            </div>
          </li>
          <li className="ExaminationTestScreen__test">
            <h3 className="ExaminationTestScreen__test-question">
              Главным недостатком информационного взрыва является дублирование
              одной и той же информации.
            </h3>
            <div className="ExaminationTestScreen__test-answers">
              <input className="ExaminationTestScreen__test-answer" id="test-3-1" type="radio" name="test-3" value="1" /><label for="test-3-1">Верно</label>
              <input className="ExaminationTestScreen__test-answer" id="test-3-0" type="radio" name="test-3" value="0" /><label for="test-3-0">Неверно</label>
            </div>
          </li>
          <li className="ExaminationTestScreen__test">
            <h3 className="ExaminationTestScreen__test-question">Скорость чтения можно повышать в ущерб качеству восприятия текста</h3>
            <div className="ExaminationTestScreen__test-answers">
              <input className="ExaminationTestScreen__test-answer" id="test-4-1" type="radio" name="test-4" value="1" /><label for="test-4-1">Верно</label>
              <input className="ExaminationTestScreen__test-answer" id="test-4-0" type="radio" name="test-4" value="0" /><label for="test-4-0">Неверно</label>
            </div>
          </li>
          <li className="ExaminationTestScreen__test">
            <h3 className="ExaminationTestScreen__test-question">
              Лучшие методики обучения обработки информации базируются на
              исследованиях о головном мозге
            </h3>
            <div className="ExaminationTestScreen__test-answers">
              <input className="ExaminationTestScreen__test-answer" id="test-5-1" type="radio" name="test-5" value="1" /><label for="test-5-1">Верно</label>
              <input className="ExaminationTestScreen__test-answer" id="test-5-0" type="radio" name="test-5" value="0" /><label for="test-5-0">Неверно</label>
            </div>
          </li>
          <li className="ExaminationTestScreen__test">
            <h3 className="ExaminationTestScreen__test-question">
              Развитие востребованного навыка работы с текстами также повышает
              концентрацию, развивает память, а также способствует уверенности при
              работе с книгой.
            </h3>
            <div className="ExaminationTestScreen__test-answers">
              <input className="ExaminationTestScreen__test-answer" id="test-6-1" type="radio" name="test-6" value="1" /><label for="test-6-1">Верно</label>
              <input className="ExaminationTestScreen__test-answer" id="test-6-0" type="radio" name="test-6" value="0" /><label for="test-6-0">Неверно</label>
            </div>
          </li>
        </ul>

        <ExaminationButton />
      </section>
    );
  }
}

export default ExaminationTestScreen;

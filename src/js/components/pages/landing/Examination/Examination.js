import m from 'mithril';
import classNames from 'classnames';
import { MithrilComponent, PropTypes } from 'mithril-proptypes';
import {
  examinationIsStartedAction,
  examinationIsReadAction,
  examinationIsFinishedAction,
} from '../../../../redux/actions';

export const EXAMINATION_CLASS_NAME = '.Examination';

const propTypes = {
  isStarted: PropTypes.boolean.isRequired,
  isRead: PropTypes.boolean.isRequired,
  isFinished: PropTypes.boolean.isRequired,
  startedTime: PropTypes.number.isRequired,
  finishedTime: PropTypes.number.isRequired,
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
  }

  onFinishedReading() {
    const finishedTime = +(new Date());
    examinationIsReadAction(finishedTime);
  }

  onFinishedTest() {
    examinationIsFinishedAction();
  }

  view() {
    const { isStarted, isRead, isFinished, startedTime, finishedTime } = this.props;

    const examinationClasses = classNames('Examination', {
      'Examination--started': isStarted,
      'Examination--is-read': isRead,
      'Examination--is-finished': isFinished,
    });

    let screen = null;
    if (!isStarted) {
      // show start screen
      screen = (
        <div className="Examination__start-screen">
          <div className="Examination__corner Examination__corner--tl"></div>
          <div className="Examination__corner Examination__corner--tr"></div>
          <div className="Examination__corner Examination__corner--bl"></div>
          <div className="Examination__corner Examination__corner--br"></div>
          <div className="Examination__invite-text">Вы можете проверить свою скорость чтения прямо сейчас</div>
          <div
            className="Examination__button"
            onclick={this.onStartExamination}
          >Начать</div>
        </div>
      );
    } else if (isStarted && !isRead) {
      // show reading screen
      screen = (
        <div className="Examination__reading-screen">
          <div className="Examination__screen-title">
            Вам необходимо прочесть текст как можно быстрее, затем нажать кнопку "Готово"
          </div>
          <div className="Examination__text-to-read">
            <p>
              21 век поглощен информацией.

              Причиной является простота создания и высокая скорость распространения любой информации.
            </p>
            <p>
              Ключевыми моментами в истории, разделяющими эпохи информации на

              этапы, являются изобретение печатного пресса в ХV в. и развитие интернета в

              ХХ в. Печатный пресс позволил снизить стоимость и время создания книг в сотни

              раз, что обеспечило доступ превалирующей части населения к знанию. В

              дальнейшем, это привело к технической революции. Развитие Всемирной сети

              увеличило масштаб информационного взрыва, стартовавшего в 1970-х годах.

              Таким образом, на данный момент объем цифровой информации удваивается

              каждые 18 месяцев, а, к примеру, количество блогов – каждые 6 месяцев.
            </p>
            <p>
              Главным недостатком информационного взрыва является копирование.

              Знание, старое и новое, дублируют, смешивают, при этом зачастую возникают

              ошибки, которые порождают заблуждения. Таким образом, для получения

              истинного знания, необходимо пропустить через себя и отфильтровать множество

              информационного шума.
            </p>
            <p>
              Человеку в современном мире необходимо уметь анализировать,

              обрабатывать, систематизировать и запоминать поступающее знание в

              бесконечном потоке информации. Однако этим навыкам на жизненном пути не

              обучают, поэтому мозг человека не в состоянии справиться с ежедневной лавиной

              информации.
            </p>
            <p>
              Учитывая преобладание текстовой информации в повседневной жизни,

              обучиться ее контролировать необходимо каждому человеку, претендующему на

              эффективность. Для этого требуется постоянно повышать скорость обработки

              параллельно (и ни в коем случае не в ущерб) с качеством ее восприятия.
            </p>
            <p>
              Разработано множество методик по улучшению результатов работы с

              текстами любого рода. Те, что созданы на основе научной деятельности

              нейробиологии, психофизиологии и психологии, подразумевают изменение

              способа получения и обработки информации, с помощью переназначения отделов

              головного мозга, получающих и обрабатывающих информацию.
            </p>
            <p>
              Процесс перенастройки мозга на информацию происходит следующим

              образом. Прежде всего, человек учится читать только вперед, не возвращаясь

              глазами к прочитанным фрагментам. Затем читатель учится выделять ключевые

              слова и мысли, визуализировать структуру текста. После этого идет

              перепрограммирование отделов мозга: читатель учится не проговаривать текст

              про себя, а представлять его визуально, а также расширять угол обзора, охватывая

              одним взглядом от словосочетания до целых абзацев. Последний этап – это

              управление движением глаз для наиболее эффективного усвоения текста. Этот

              алгоритм обучения позволяет достичь невероятных результатов, которые

              кардинально изменят Ваше отношение к чтению в лучшую сторону.
            </p>
            <p>
              Таким образом, человек приобретает необходимый навык в 21 веке,

              которым могут похвастаться не более 1% населения. Читать становится гораздо

              приятнее, повышается концентрация и улучшается память. Но самое главное то,

              что нивелируется стресс от объема входящей информации, читатель сам решает,

              как через нее пробираться, перестает быть ее рабом, а бесконечные пункты списка

              необходимой к прочтению литературы наконец-то поочередно вычеркиваются.
            </p>
          </div>
          <div
            className="Examination__button"
            onclick={this.onFinishedReading}
          >Готово</div>
        </div>
      );
    } else if (isStarted && isRead && !isFinished) {
      // show testing screen
      screen = (
        <div className="Examination__testing-screen">
          <div className="Examination__screen-title">
            Ответьте на шесть вопросов, чтобы оценить эффективность чтения
          </div>
          <ul className="Examination__test-list">
            <li className="Examination__test">Тест 1</li>
            <li className="Examination__test">Тест 2</li>
            <li className="Examination__test">Тест 3</li>
            <li className="Examination__test">Тест 4</li>
            <li className="Examination__test">Тест 5</li>
          </ul>
          <div
            className="Examination__button"
            onclick={this.onFinishedTest}
          >Завершить</div>
        </div>
      );
    } else if (isStarted && isRead && isFinished) {
      // show results screen
      screen = (
        <div className="Examination__results-screen">
          <div className="Examination__screen-title">
            Ваша скорость чтения составляет {(finishedTime - startedTime) / 1000} секунд
          </div>
          <div className="Examination__result"></div>
        </div>
      );
    }

    return (
      <section className={examinationClasses}>
        <div className="Examination__screen-wrapper">
          {screen}
        </div>
      </section>
    );
  }
}

export default Examination;

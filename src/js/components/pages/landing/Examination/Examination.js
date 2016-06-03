import m from 'mithril';

export const EXAMINATION_CLASS_NAME = '.Examination';

class Examination {
  constructor() {
    this.name = m.prop('Examination');
  }

  view() {
    return (
      <div className="Examination">
        <section className="Examination__start-screen">
          <div className="Examination__container">
            <div className="Examination__corner Examination__corner--tl"></div>
            <div className="Examination__corner Examination__corner--tr"></div>
            <div className="Examination__corner Examination__corner--bl"></div>
            <div className="Examination__corner Examination__corner--br"></div>
            <div className="Examination__invite-text">Вы можете проверить свою скорость чтения прямо сейчас</div>
            <div className="Examination__invite-button">Начать</div>
          </div>
        </section>
      </div>
    );
  }
}

export default Examination;

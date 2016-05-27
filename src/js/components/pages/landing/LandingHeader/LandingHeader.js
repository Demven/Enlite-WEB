import m from 'mithril';
import scrollTo from '../../../../services/pageScroller';
import { EXAMINATION_CLASS_NAME } from '../Examination/Examination';

class LandingHeader {
  constructor() {
    this.name = m.prop('LandingHeader');
  }

  getOffsetToExaminationSection() {
    return document.querySelector(EXAMINATION_CLASS_NAME).offsetTop + 2;
  }

  view() {
    return (
      <div className="LandingHeader">
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
          <div className="LandingHeader__form-container">
            <h4 className="LandingHeader__form-title">Получи доступ к закрытому тестированию</h4>
            <input className="LandingHeader__form-input" placeholder="E-mail" />
            <button className="LandingHeader__form-button">Получить приглашение</button>
          </div>

          <div
            className="LandingHeader__scroller"
            onclick={() => {
              scrollTo(this.getOffsetToExaminationSection());
            }}
          >
            <div className="LandingHeader__icon"></div>
            <div className="LandingHeader__title">Проверить скорость чтения</div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingHeader;

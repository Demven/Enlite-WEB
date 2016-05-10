import m from 'mithril';

class LandingHeader {
  constructor() {
    this.name = m.prop('LandingHeader');
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
        </div>
      </div>
    );
  }
}

export default LandingHeader;

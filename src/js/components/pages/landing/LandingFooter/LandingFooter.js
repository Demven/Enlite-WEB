import m from 'mithril';

class Footer {
  constructor() {
    this.name = m.prop('LandingFooter');
  }

  view() {
    return (
      <div className="LandingFooter">
        <img src="/images/ic/logo-shadow.png" className="LandingFooter__logo" alt="Enlite logotype"/>
        <div className="LandingFooter__feedback">Обратная связь</div>
      </div>
    );
  }
}

export default Footer;

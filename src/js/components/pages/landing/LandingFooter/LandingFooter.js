import m from 'mithril';

class Footer {
  constructor() {
    this.name = m.prop('LandingFooter');
  }

  view() {
    return (
      <section className="LandingFooter">
        <img src="/images/ic/logo-shadow.png" className="LandingFooter__logo" alt="Enlite logotype"/>
        <div className="LandingFooter__feedback">Обратная связь</div>
      </section>
    );
  }
}

export default Footer;

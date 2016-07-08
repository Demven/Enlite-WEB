import m from 'mithril';

class Footer {
  constructor() {
    this.name = m.prop('LandingFooter');
  }

  view() {
    return (
      <section className="LandingFooter">
        <img src="/images/ic/logo-shadow.png" className="LandingFooter__logo" alt="Enlite logotype" />
        <a
          href="mailto:enlitedmind@gmail.com"
          title="enlitedmind@gmail.com"
          className="LandingFooter__feedback-link"
        >
          <div className="LandingFooter__feedback">Обратная связь</div>
        </a>
      </section>
    );
  }
}

export default Footer;

import m from 'mithril';

class LandingHeader {
  constructor() {
    this.name = m.prop('LandingHeader');
  }

  view() {
    return (
      <div className="LandingHeader">
        <div className="LandingHeader__bg"></div>
        <div className="LandingHeader__logo"></div>
        <div className="LandingHeader__description"></div>
        <div className="LandingHeader__features"></div>
        <div className="LandingHeader__mobile-screen"></div>
        <div className="LandingHeader__form-container"></div>
      </div>
    );
  }
}

export default LandingHeader;

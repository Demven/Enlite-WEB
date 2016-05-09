import m from 'mithril';

class LandingPeople {
  constructor() {
    this.name = m.prop('LandingPeople');
  }

  view() {
    return (
      <div className="LandingPeople">
      </div>
    );
  }
}

export default LandingPeople;

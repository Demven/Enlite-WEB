import m from 'mithril';

class LandingPeople {
  constructor() {
    this.name = m.prop('People');
  }

  view() {
    return (
      <div className="People">
      </div>
    );
  }
}

export default LandingPeople;

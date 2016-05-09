import m from 'mithril';

class Examination {
  constructor() {
    this.name = m.prop('Examination');
  }

  view() {
    return (
      <div className="Examination">
      </div>
    );
  }
}

export default Examination;

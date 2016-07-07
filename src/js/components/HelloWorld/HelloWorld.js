import m from 'mithril';

class HelloWorld {
  constructor(email) {
    this.title = m.prop('Hello, ' + email);
    this.subtitle = m.prop('using Mithril.js');
  }

  view() {
    return (
      <div className="HelloWorld">
        <img className="HelloWorld__logo" src="/images/mithriljs-logo.png" alt="mithril.js logotype" />
        <h1 className="HelloWorld__title">{this.title()}</h1>
        <h3 className="HelloWorld__subtitle">{this.subtitle()}</h3>
      </div>
    );
  }
}

export default HelloWorld;

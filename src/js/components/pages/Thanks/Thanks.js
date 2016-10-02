import m from 'mithril';

class Thanks {
  constructor(email) {
    this.title = m.prop('Спасибо!');
    this.subtitle = m.prop(email);
  }

  view() {
    return (
      <div className="Thanks">
        <div className="Thanks__header">
          <a href="/">
            <img className="Thanks__logo" src="/images/ic/logo.png" alt="Enlite logo" />
          </a>
        </div>
        <div className="Thanks__titles">
          <h1 className="Thanks__title">{this.title()}</h1>
          <h3 className="Thanks__subtitle">Мы сообщим вам о выходе приложения на ваш адрес:</h3>
          <h3 className="Thanks__subtitle">{this.subtitle()}</h3>
        </div>
        <a href="/" className="Thanks__link-back">Вернуться на сайт</a>
      </div>
    );
  }
}

export default Thanks;

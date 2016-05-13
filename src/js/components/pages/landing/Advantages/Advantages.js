import m from 'mithril';

class Advantages {
  constructor() {
    this.name = m.prop('Advantages');
  }

  view() {
    return (
      <div className="Advantages">
        <h2 className="Advantages__title">Преимущества использования приложения при чтении различных видов литературы</h2>
        <ul className="Advantages__list">
          <li className="Advantages__item">
            <h3 className="Advantages__item-title">Художественная</h3>
            <div className="Advantages__item-text">Помогает безошибочно выстроить сюжетную линию, наполняя ее впечатлениями от произведения.</div>
          </li>
          <li className="Advantages__item">
            <h3 className="Advantages__item-title">Газеты и статьи</h3>
            <div className="Advantages__item-text">Обучает моментально находить самые важные факты и запоминать их, а также читать вертикально, скользя по столбцу текста.</div>
          </li>
          <li className="Advantages__item">
            <h3 className="Advantages__item-title">Учебная</h3>
            <div className="Advantages__item-text">Позволяет готовиться к экзамену за одну ночь.</div>
          </li>
          <li className="Advantages__item">
            <h3 className="Advantages__item-title">Техническая</h3>
            <div className="Advantages__item-text">Ускоряет понимание логических структур построения информации в сложных технических текстах.</div>
          </li>
          <li className="Advantages__item">
            <h3 className="Advantages__item-title">Научно-популярная</h3>
            <div className="Advantages__item-text">Заставляет  выявлять ключевые тезисы и подкреплять их фактами из текста.</div>
          </li>
          <li className="Advantages__item"></li>
        </ul>
      </div>
    );
  }
}

export default Advantages;

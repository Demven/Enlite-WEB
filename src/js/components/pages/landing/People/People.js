import m from 'mithril';
import classnames from 'classnames';
import Person from '../../../../model/Person';

class People {
  constructor(people) {
    this.name = m.prop('People');
    this.people = people.map((personData) => new Person(personData));

    this.renderSwitcherItems = this.renderSwitcherItems.bind(this);
    this.renderPersonSection = this.renderPersonSection.bind(this);
  }

  renderSwitcherItems() {
    return this.people.map((person, index) => {
      const switcherClass = classnames('People__switcher-item', {
        'People__switcher-item--chosen': person.chosen(),
      });

      return (
        <li
          className={switcherClass}
          key={index}
          onclick={() => {
            console.log('click a person');
          }}
        >
          <img
            className="People__switcher-photo"
            src={person.image()}
            alt={person.name()}
          />
        </li>
      );
    });
  }

  renderPersonSection() {
    return this.people.map((person, index) => {
      const sectionClass = classnames('People__person', {
        'People__person--shown': person.chosen(),
        'People__person--visible': person.chosen(),
      });

      return (
        <section
          className={sectionClass}
          key={index}
        >
          <img
            className="People__person-photo"
            src={person.image()}
            alt={person.name()}
          />
          <div className="People__person-name">{person.name()}</div>
          <div className="People__person-text">{person.text()}</div>
        </section>
      );
    });
  }

  view() {

    console.log('RENDER PEOPLE');

    return (
      <div className="People">

        <div className="People__static-container">
          <h2 className="People__title">Просвещенные умы</h2>
          <ul className="People__switcher">
            {this.renderSwitcherItems()}
          </ul>
        </div>

        <div className="People__person-container">
          {this.renderPersonSection()}
        </div>

      </div>
    );
  }
}

export default People;

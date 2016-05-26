import m from 'mithril';
import classnames from 'classnames';
import Person from '../../../../model/Person';
import { chosePersonAction } from '../../../../redux/actions';
import { MithrilComponent, PropTypes } from 'mithril-proptypes';

const propTypes = {
  people: PropTypes.arrayOf({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    text: PropTypes.string,
    chosen: PropTypes.boolean,
  }).isRequired,
};

class People extends MithrilComponent {
  constructor(props) {
    super(props, propTypes);

    this.name = m.prop('People');
    this.people = this.props.people.map((personData) => new Person(personData));

    this.renderSwitcherItems = this.renderSwitcherItems.bind(this);
    this.renderPersonSection = this.renderPersonSection.bind(this);
  }

  renderSwitcherItems() {
    return this.people.map((person) => {
      const switcherClass = classnames('People__switcher-item', {
        'People__switcher-item--chosen': person.chosen(),
      });

      return (
        <li
          className={switcherClass}
          key={person.id()}
          onclick={() => {
            chosePersonAction(person.id());
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
    return this.people.map((person) => {
      const sectionClass = classnames('People__person', {
        'People__person--shown': person.chosen(),
        'People__person--visible': person.chosen(),
      });

      return (
        <section
          className={sectionClass}
          key={person.id()}
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
    console.info('props', this.props);
    console.info('name', this.props.name);

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

import m from 'mithril';
import { MithrilComponent, PropTypes } from 'mithril-proptypes';

const propTypes = {
  text: PropTypes.string.isRequired,
};

class ExaminationScreenTitle extends MithrilComponent {
  constructor(props) {
    super(props, propTypes);

    this.name = m.prop('ExaminationScreenTitle');
  }

  view() {
    return (
      <h2 className="ExaminationScreenTitle">
        {this.props.text}
      </h2>
    );
  }
}

export default ExaminationScreenTitle;

import m from 'mithril';
import { MithrilComponent, PropTypes } from 'mithril-proptypes';

const propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.function.isRequired,
};

class ExaminationButton extends MithrilComponent {
  constructor(props) {
    super(props, propTypes);

    this.name = m.prop('ExaminationStartScreen');
  }

  view() {
    const { title, onClick } = this.props;
    
    return (
        <div
          className="ExaminationButton"
          onclick={onClick}
        >{title}</div>
    );
  }
}

export default ExaminationButton;

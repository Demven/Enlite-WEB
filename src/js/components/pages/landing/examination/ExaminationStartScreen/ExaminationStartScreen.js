import m from 'mithril';
import { MithrilComponent, PropTypes } from 'mithril-proptypes';
import _ExaminationButton from '../ExaminationButton/ExaminationButton';

const propTypes = {
  onStartExamination: PropTypes.function.isRequired
};

class ExaminationStartScreen extends MithrilComponent {
  constructor(props) {
    super(props, propTypes);

    this.componentName = m.prop('ExaminationStartScreen');
  }

  view() {
    const { onStartExamination } = this.props;

    const ExaminationButton = new _ExaminationButton({
      title: 'Начать',
      onClick: onStartExamination,
    });

    return (
      <div className="ExaminationStartScreen">
        <div className="ExaminationStartScreen__corner ExaminationStartScreen__corner--tl"></div>
        <div className="ExaminationStartScreen__corner ExaminationStartScreen__corner--tr"></div>
        <div className="ExaminationStartScreen__corner ExaminationStartScreen__corner--bl"></div>
        <div className="ExaminationStartScreen__corner ExaminationStartScreen__corner--br"></div>

        <h2 className="ExaminationStartScreen__invite-text">Вы можете проверить свою скорость чтения прямо сейчас</h2>

        <ExaminationButton />
      </div>
    );
  }
}

export default ExaminationStartScreen;

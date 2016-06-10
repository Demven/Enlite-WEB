import m from 'mithril';
import { MithrilComponent, PropTypes } from 'mithril-proptypes';
import _ExaminationScreenTitle from '../ExaminationScreenTitle/ExaminationScreenTitle';

const propTypes = {
  startedTime: PropTypes.number.isRequired,
  finishedTime: PropTypes.number.isRequired,
};

class ExaminationResultsScreen extends MithrilComponent {
  constructor(props) {
    super(props, propTypes);

    this.name = m.prop('ExaminationResultsScreen');
  }

  view() {
    const { startedTime, finishedTime } = this.props;

    const ExaminationScreenTitle = new _ExaminationScreenTitle({ text: `Ваша скорость чтения составляет ${(finishedTime - startedTime) / 1000} секунд` });

    return (
      <div className="ExaminationResultsScreen">
        <ExaminationScreenTitle />

        <div className="ExaminationResultsScreen__result"></div>
      </div>
    );
  }
}

export default ExaminationResultsScreen;

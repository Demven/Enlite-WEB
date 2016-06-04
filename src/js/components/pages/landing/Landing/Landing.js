import m from 'mithril';
import { MithrilComponent } from 'mithril-proptypes';
import reduxStore from '../../../../redux/store';
import _Header from '../LandingHeader/LandingHeader';
import _Advantages from '../Advantages/Advantages';
import _People from '../People/People';
import _Examination from '../Examination/Examination';
import _Footer from '../LandingFooter/LandingFooter';

class Landing extends MithrilComponent {
  constructor(props) {
    super(props);

    this.componentName = m.prop('Landing');
  }

  view() {
    const {
      subscriptionForm,
      examination,
      people,
    } = reduxStore.getState();

    const Header = new _Header({ subscriptionForm });
    const Advantages = new _Advantages();
    const People = new _People({ people });
    const Examination = new _Examination(examination);
    const Footer = new _Footer();

    return (
      <div className="Landing">
        <Header />
        <Advantages />
        <People />
        <Examination />
        <Footer />
      </div>
    );
  }
}

export default Landing;

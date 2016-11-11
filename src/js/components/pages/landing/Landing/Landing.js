import m from 'mithril';
import { MithrilComponent } from 'mithril-proptypes';
import { trackPageView } from '../../../../analytics/google';
import reduxStore from '../../../../redux/landing/store';
import _Header from '../LandingHeader/LandingHeader';
import _Advantages from '../Advantages/Advantages';
import _People from '../People/People';
import _Examination from '../examination/Examination/Examination';
import _Footer from '../LandingFooter/LandingFooter';

class Landing extends MithrilComponent {
  constructor(props) {
    super(props);

    this.onMount = this.onMount.bind(this);

    this.componentName = m.prop('Landing');
  }

  onMount(element, isInit) {
    if (!isInit) {
      trackPageView();
    }
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
    const Examination = new _Examination({ examination, subscriptionForm });
    const Footer = new _Footer();

    return (
      <div className="Landing" config={this.onMount}>
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

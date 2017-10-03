import m from 'mithril';
import { MithrilComponent, PropTypes } from 'mithril-proptypes';
import { trackPageView } from '../../../analytics/google';

const propTypes = {
  email: PropTypes.string,
};

class TermsAndPolicy extends MithrilComponent {
  constructor(props) {
    super(props, propTypes);

    this.onMount = this.onMount.bind(this);

    this.componentName = m.prop('TermsAndPolicy');
  }

  onMount(element, isInit) {
    if (!isInit) {
      trackPageView();
    }
  }

  view() {
    return (
      <div className="TermsAndPolicy" config={this.onMount}>
        <div className="TermsAndPolicy__header">
          <a href="/">
            <img className="TermsAndPolicy__logo" src="/images/ic/logo.png" alt="Enlite logo" />
          </a>
        </div>
        <h3 className="TermsAndPolicy__title">Terms of Service and Privacy Policy</h3>
        <div className="TermsAndPolicy__content">
          <h4>General Terms and Conditions of Enlite (Effective on 2016-12-1)</h4>

          <h5>1. Subject and Scope of the General Terms and Conditions</h5>
          <p>1.1</p>
          <p>OOO “Integral”, Khimki, ul. Akademika Grushina, 33, Russian Federation (thereafter
          “Enlite”) operates a platform for mobile reading on the internet portal
            http://www.enliteyourmind.com/ and other websites as well as via mobile applications - so called
          “Apps” - (thereafter platform). Within this scope, Enlite teaches to read faster and
          effectively comprehend any type of text.</p>

          <p>1.2</p>
          <p>Use of the platform (including Apps) shall be exclusively subject to the following general
            terms and conditions.</p>

          <p>1.3</p>
          <p> No special contractual text is intended for the contract regarding platform use. The
          content of the contract concluded between you and Enlite follows these general terms
          and conditions as well as the information provided during the process of registration (cf.
          cipher 3.) as well as during contracting of a fee-based subscription ( cipher 5) that will
            be saved by Enlite and available at any time in your user account.</p>

          <p>1.4</p>
          <p>By registering and/or using the Enlite services, you accept the use and application of
            these terms and conditions.</p>

          <p>1.5</p>
          <p>Enlite shall retain the right to change individual clauses with effect for the future. If we
          do not obtain your specific consent for a terms and conditions amendment, you will be
          timely informed of any changes to the terms and conditions (at least four weeks prior to
          the effective date of the amended terms). For this purpose, Enlite will send you the new
          version of the terms and conditions to the email address you provided during
          registration. In this context, Enlite will notify you explicitly regarding the opportunity and
          objection period against the changes as well as about the consequences of an omitted
            objection.</p>

          <p>1.6</p>
          <p>If you do not object to the changes within four weeks after the effective date of the
          changed user conditions, the changed user conditions shall be deemed accepted. The
          period shall start with the day that it is communicated to you via email as the effective
            date of change.</p>

          <p>1.7</p>
          <p>In the event that you object the changes, Enlite shall be entitled to terminate the user
          contract and delete your user account, under consideration of your interests if
          continuing of the contractual relationship under the scope of the current terms and
          conditions is not possible or unreasonable for Enlite, effective from the date the
            changed user terms come into force.</p>

          <h5>2. Services and Rights of Enlite</h5>
          <p>2.1</p>
          <p>Enlite will provide you with exercises that are increasing your reading speed. Each
            exercise’s methodic is under the sole of ownership of Enlite.</p>

          <p>2.2</p>
          <p>The rights on Enlite’s services and contents that are dispersed this way shall stay and
          remain with Enlite or Enlite’s licensors. Enlite software applications and contents shall
          be licensed to you within the scope of the contractual use. We will only grant you a non-
          exclusive (simple) and temporary right pursuant to cipher 2.3 for personal use of Enlite’s
            services and contents.</p>

          <p>2.3</p>
          <p>The scope of the provided contents shall depend on the precise free account or
          subscription which you respectively chose (the “license”). The license shall be restricted
            to the period of the free account/subscription.</p>

          <p>2.4</p>
          <p>All Enlite trademarks as well as our trade names, logos, domain names and other
          peculiarities of the Enlite trademark are under the sole ownership of Enlite. The license
          does not grant you the right to use Enlite trademarks, our trade names, logos, domain
          names or other features of the Enlite trademark, irrespective of whether for commercial
            or non-commercial use.</p>

          <p>2.5</p>
          <p>If you are using a free service, Enlite shall be allowed to show you advertisement on the
            platform.</p>

          <h5>3. Registration with Enlite</h5>

          <p>3.1</p>
          <p>A registration with Enlite is necessary for using Enlite’s services.</p>

          <p>3.2</p>
          <p>Registration itself is free (Free Account) and does not obligate to enter into a
            subscription.</p>

          <p>3.3</p>
          <p>You can use your email address and a self-determined password for registration.</p>

          <p>3.4</p>
          <p>The used password shall be kept confidential. You are solely and to the full-extent
          responsible for keeping it confidential. You are the only person entitled to use your
          Enlite user account. Enlite shall be notified immediately of any unauthorized use of the
            user account as well as any suspicion thereof.</p>

          <p>3.5</p>
          <p>Enlite shall be entitled Privacy policy to save and process your data provided during the
            registration process pursuant to the data protection regulations.</p>

          <h5>4. Subscription to Subscription Access</h5>

          <p>4.1</p>
          <p>There is a fee-based subscription available (“Subscription Access”) so that you can use
          the full scope of Enlite’s services. The subscription can be entered into for different
            periods which are presented to you in the order options.</p>

          <p>4.2</p>
          <p>Enlite’s subscription accesses are fee-based and advertisement-free subscriptions
          which enable you to access a set of our content and features through our mobile and
          web based applications. We offer the subscription tier with the following content:
          Enlite Premium gives you free access to all exercises, disables ad, allows you to shuffle
            your training and disables a limit on the speed of exercise.</p>

          <p>4.3</p>
          <p>To become the holder of an Enlite account with subscription access you can subscribe
          via In-App-Purchase via iOS-Apps. For this purpose, you will have to choose the
          desired option on the subscription screen of the App, whereupon a pop-up will appear in
          which you have to enter your Apple-password. As soon as you have done this, another
          pop-up will appear in which you have to confirm the subscription purchase again. You
            may still cancel the process at this stage.</p>

          <h5>5. Remuneration and Payment Terms</h5>

          <p>5.1</p>
          <p>The conclusion of the subscription access (cipher 4.) is subject to charges.</p>

          <p>5.2</p>
          <p>Payment for the subscription shall occur via Apple’s In-App-Purchase process.</p>

          <p>5.3</p>
          <p>Your payment obligation vis-a-vis Enlite within a premium access shall automatically
          renew itself at the end of the respective subscription term, if you do not terminate your
            fee-based subscription at least 24 hours prior to the end of the term (cipher 8.3.).</p>

          <h5>6. Period and Termination</h5>

          <p>6.1</p>
          <p>The free user contract shall start at the time of your registration pursuant to cipher 3. for
            an indefinite period.</p>

          <p>6.2</p>
          <p>The fee-based subscription access (cf. cipher 4.) shall run at least for your initially
          selected period and shall automatically renew itself if you do not terminate at least 24
          hours prior expiry of this period. The subscription period shall extend respective of its
            currently used subscription model.</p>

          <h5>7. Liability</h5>

          <p>7.1</p>
          <p>Enlite shall not be liable for user damage claims. Enlite shall only be liable for damages
          arising from body, life or health violations or from violations of material contractual
          duties (cardinal duties) as well as for damages for other damages arising from
          intentional and gross negligent breach of duty of Enlite, its statutory agents or vicarious
          agents. Material contractual duties are duties that are required to make proper
            performance of the contract possible and on whose fulfillment you can rely.</p>

          <p>7.2</p>
          <p>In the event of violation of material contractual duties, Enlite shall only be liable for the
          contractual and typically foreseeable damages if these were caused by slight
            negligence, unless, damages arising from injury to life, body or health are present.</p>

          <p>7.3</p>
          <p>The restrictions stipulated under ciphers 10.1. and 10.2. shall also apply for duty
          violations of vicarious agents and statutory agents of Enlite if claims are made directly
            against these.</p>

          <h5>8. Warrant of merchantability</h5>
          <p>Enlite grants a warrant of merchantability in accordance to the law.</p>

          <h5>9. Final Provisions</h5>

          <p>9.1</p>
          <p>If one provision of these terms and conditions shall be void, the remainder of the
          contract shall remain unaffected thereof. The void provision shall, if applicable, be
            replaced by the statutory provisions.</p>

          <p>9.2</p>
          <p>The laws of the Russian Federation shall apply; including: Russian Civil Code and
            others.</p>

          <p>9.3</p>
          <p>The exclusive place of jurisdiction for all disputes directly or indirectly resulting from the
          contractual relationship shall be the competent court at Enlite’s registered seat of
          business if you are an entrepreneur, a legal entity of public law or a special public fund,
            or have no general place of jurisdiction within Russian Federation.</p>


          <br />
          <h4>Enlite Data Protection Notification (Effective on 2016-12-1)</h4>

          <h5>1. Introduction</h5>
          <p>OOO “Integral”, Khimki, ul. Akademika Grushina, 33, Russian Federation (thereafter
          “Enlite” or “we”) operates a platform for mobile reading on the internet portal
            http://www.enliteyourmind.com as well as via mobile applications - so-called “Apps” - (thereafter
            platform).</p>
          <p>We are happy that you are interested in Enlite. For providing you with our service, we
          will need certain information about you. This data protection notification elaborates
            which data we collect from you for what purpose.</p>
          <p>If you should not consent to this data protection notification, please do not use Enlite.</p>


          <h5>2. Collection, Use and Processing of Data</h5>
          <p>“Personal data” shall be data that can identify you personally (e.g. name, e-mail address
          or invoice information) and other information that can be connected to this type of
            information and that allow a conclusion regarding your identity.</p>
          <p>“Pseudonymised data” shall be data in which the information appropriate for identifying
          a certain person are replaced by a pseudonym so that the data cannot be matched to a
            certain person without knowledge of the correlation which is saved outside the data set.</p>
          <p>“Anonymized data” shall be data where the respective person is unknown and cannot
            be determined.</p>

          <p>2.1 Registration Data</p>
          <p>If you register with Enlite (for a subscription, a free trial or use of a code) we will collect
          personal data that you voluntarily submit with registration. In particular, these are your
            e-mail address and your selected password.</p>
          <p>We also collect upon registration, data regarding country and language that you have
            saved as standard setting in your browser or smartphone.</p>
          <p>We use this data without your explicit consent only for performing our offered services.</p>
          <p>We will only forward your personal data without your explicit consent to third parties if
          this is necessary for performing our services or for complying with statutory obligations
            (see cipher 3 below).</p>
          <p>We save all your registration data so that we can use them for performing Enlite’s
          services. The data will be deleted after the end of the contract as soon as they are not
          needed for invoicing purposes any longer. If a deletion conflicts with statutory,
            contractual or by-law imposed storage periods, the data shall be suspended instead.</p>

          <p>2.2 Personal Usage Data</p>
          <p>If you are using Enlite services, we will automatically collect personal usage data that is
          necessary for performing the services and/or invoicing. Personal data shall only be
          collected if you provide us with these when opening a customer account or registration
          for our newsletter. In accordance with statutory provisions and for the purpose of data
            economy, generally only data necessary for the respective service shall be collected.</p>
          <p>In particular, these are your e-mail address, your password, your country and your
          language. In the event that you connect via Facebook Connect or Connect for Xing
          (cipher 2.3), we will also collect your first and family name. To the extent that our forms
          ask for further information, such information shall always be optional and will be marked
            as such.</p>
          <p>We will use your provided data without your separate consent only for fulfilling and
          performing of our services and for complying with statutory requirements. Forwarding of
          your personal data to third parties shall only occur if this is necessary for performing our
            services or for complying with statutory requirements.</p>

          <p>Your accruing personal data regarding the access history will be deleted immediately
            after its termination or, if this is legally forbidden, suspended.</p>

          <p>2.3 Cookies</p>
          <p>For performing Enlite services and to make your visit to our website pleasant and to
          ensure use of certain functions, we will also use so-called cookies for data collection
          and saving. Cookies are small data packages that are stored on your device. They will
          not cause any harm there. Two types of cookies will be used. Temporary cookies will be
            automatically deleted with closing of your browser (so-called session-cookies).</p>
          <p>Permanent cookies will remain on your device and enable us or our partner company to
            recognize your browser at your next page visit (so-called persistent-cookies).</p>
          <p>Cookies enable us to comprehend your user behavior. They are also supposed to
          provide you with optimized surfing on our website. You can configure your internet
          browser so that you will be notified of cookie storage und decide about their acceptance
            in an individual case or reject cookies generally or for certain cases.</p>
          <p>Certain features might not be able available to you if you prevent cookie storage in your
            browser settings.</p>

          <p>2.4 Tracking/ Web Analysis Tools</p>
          <p>Google Analytics</p>
          <p>Enlite uses Google Analytics, a web analysis service of Google Inc., 1600 Amphitheatre
          Parkway, Mountain View CA 94043, USA Tel: +1 650 253 0000 Fax: +1 650 253 0001
          Google Analytics also uses so-called “Cookies”, text files that are stored on your
          computer enabling analysis of your use of the internet site. The information created by
          the cookie regarding your website use will usually be transferred to a Google server in
            the USA and saved there. Enlite will anonymize the IP address (anonymizeIP() so
          called IP-masking), and your IP address will be shortened by Google within the member
          states of the European Union or other contracting states to the Agreement on the
          European Economic Area. The full IP address shall only be submitted to a Google
          server in the USA in exceptional cases only and will be shortened there. Google will use
          this information on behalf of Enlite to evaluate your use of the website, to compose
          reports regarding website activity and to perform further service relating to further
          services connected to website and internet use vis-a-vis Enlite. The IP address
          submitted by your browser within the Google Analytics process shall not be connected
            with other Google data.</p>
          <p>You can prevent cookie storage as stipulated above under cipher 2.5. by a respective
          browser-software setting, which however has the effect that some features of Enlite
          websites are not fully useable. You can also prevent Google’s collection of the data
          created by the cookie and related to your website use (including your IP address) and
          processing of this data by Google through downloading and installing the following
          browser-plugin http://tools.google.com/dlpage/gaoptout?hl=de
          The user profiles created by Google Analytics serve the purpose of visitor behavior
            analysis and are evaluated for improving and customizing of our offers.</p>
          <p>The pseudonymised user profiles will not be connected with your personal data without
            your separate explicit consent.</p>

          <p>2.5 Payment Data</p>
          <p>If you are using our trials or if you sign-up for our subscriptions or purchase something
          via the service, credit card information and other finance related information that are
          necessary for payment processing will be collected and saved by a payment service
          provider. We also collect certain limited information, e.g. your postal code, cell phone
          number and details of your transaction history. Other than that, the payment service
          providers usually provide us only with very limited information regarding you, e.g. the
          specific token that enables you to perform further purchases using the data saved by
          the provider as well as your type of card, expiration date und the last four digits of the
            number.</p>

          <h5>3. Newsletter</h5>
          <p>With newsletter registration, your e-mail address will be used for Enlite information and
          advertisement until you cancel the newsletter. Cancellation is possible at any time. You
          have given your consent to the following either separate or explicitly during the ordering
            process, and we have recorded your consent.</p>
          <p>I want to subscribe to the newsletter (cancellation possible at any time).</p>
          <p>You can revoke this consent effective for the future at any time by clicking “Unsubscribe
            Newsletter” at the end of the newsletter.</p>
          <p>Revoking your consent for receiving the newsletter will not cause any costs for you;
          except for transmission costs pursuant to the respective basic rates of your
            phone/internet provider.</p>
          <p> If we received your e-mail address in connection with selling goods or services, we are
          also entitled to send you newsletters for direct advertising of our own similar goods or
            services without your (explicit) consent, unless you have rejected such use.</p>
          <p>You can object to this use at any time with effect for the future without occurring any
            costs other than transmission costs pursuant to basic tariffs.</p>

          <h5>4. Security</h5>
          <p>Data protection of our users is a special concern for us. Your password protects your
          user account and should be thus a strong password that is not used elsewhere. You
          should restrict access to your computer and browser and you should log-off after using
            Enlite services.</p>

          <p>The Enlite portal and our systems are protected through technical and organizational
          measures against loss, destruction, access, alteration or distribution of your data
          through unauthorized parties. A complete protection against all hazards is however not
            possible in-spite of frequent controls.</p>

          <h5>5. Links</h5>
          <p>Enlite shall be entitled to display advertisement or other contents that contain hyperlinks
          to third-party websites. Only the provider of the website referred to shall be liable for
          illegal, erroneous or incomplete contents and particularly for damages that result from
          use or non-use of these links. We have no influence particularly on the data protection
            measures and contents of the sites linked to.</p>

          <h5>6. Access and Update of Profile Data, Deletion</h5>
          <p>You can access and change your profile data via your account-settings.</p>

          <h5>7. Information about Saved Data, Contact</h5>

          <p>You can certainly always request free of charge information regarding data we saved
          about you, e.g. via e-mail enlitedmind@gmail.com. We will answer within an appropriate
          period after proof of identity. You may possibly be entitled to request that your data will
            be corrected, suspended or deleted.</p>

          <h5>8. Change of Data Protection Notification</h5>
          <p>We will occasionally change this data protection notification in order to incorporate new
          functions, features, products or services and to ensure the protection of your personal
          data. These changes and the current data protection notification are available on this
          site for you anytime. If we are making material changes, particularly regarding
          collection, use or processing of your personal data, we will notify you of this via e-mail
            or inform you no later than during your next Enlite login.</p>
        </div>
        <a href="/" className="TermsAndPolicy__link-back">Go to website</a>
      </div>
    );
  }
}

export default TermsAndPolicy;

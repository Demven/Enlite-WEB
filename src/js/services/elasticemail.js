import request from 'superagent';

const SITE_URL = 'www.enlited.ru';
const API_KEY = '155d8eeb-93ff-40db-bf98-2b0ed2e2d59e';
const PUBLIC_ID = '1d943971-e021-4401-9089-070377c1fd9a';

const API_URL = 'https://api.elasticemail.com/v2/';

const CONTACT_LIST_MAIN = 'main';

function splitEmail(email) {
  const parts = email.split('@');

  return {
    name: parts[0],
    domain: parts[1],
  };
}

export function sendEmailAboutPassReset(email, newPassword) {
  const action = 'email/send';
  const templateName = 'reset_password';
  const changePasswordUrl = `${SITE_URL}/change-password/${email}`;

  const requestUrl = API_URL + action + '?apikey=' + API_KEY + '&to=' + email + '&template=' + templateName
    + '&merge_new_password=' + newPassword + '&merge_url_change_password=' + changePasswordUrl;

  request
    .get(requestUrl)
    .accept('text/html')
    .end();
}

export function addContactWithConfirmation(emailToAdd) {
  const action = 'contact/add';
  const activationEmailName = 'welcome';
  const { name, domain } = splitEmail(emailToAdd);
  const confirmUrl = `${SITE_URL}/thanks/${name}/domain/${domain}`;

  const requestUrl = API_URL + action + '?publicAccountID=' + PUBLIC_ID + '&activation_Template='
      + activationEmailName + '&email=' + emailToAdd + '&listName=' + CONTACT_LIST_MAIN + '&website='
      + SITE_URL + '&requiresActivation=true&source_Url=' + confirmUrl;

  request
    .get(requestUrl)
    .accept('text/html')
    .end();
}

export function confirmEmail(email) {
  const action = 'contact/activateblocked';
  const requestUrl = API_URL + action + '?apikey=' + API_KEY + '&emails=' + email;

  request
    .get(requestUrl)
    .accept('text/html')
    .end();
}

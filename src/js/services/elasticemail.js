import request from 'superagent';

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
  const changePasswordUrl = `${process.env.SITE_URL}/change-password/${email}`;

  const requestUrl = API_URL + action + '?apikey=' + process.env.ELASTIC_EMAIL_API_KEY + '&to=' + email + '&template=' + templateName
    + '&merge_new_password=' + newPassword + '&merge_url_change_password=' + changePasswordUrl;

  return request
    .get(requestUrl)
    .accept('text/html')
    .end();
}

export function addContactWithConfirmation(emailToAdd) {
  const action = 'contact/add';
  const activationEmailName = 'welcome';
  const { name, domain } = splitEmail(emailToAdd);
  const confirmUrl = `${process.env.SITE_URL}/thanks/${name}/domain/${domain}`;

  const requestUrl = API_URL + action + '?publicAccountID=' + process.env.ELASTIC_EMAIL_PUBLIC_ID + '&activation_Template='
      + activationEmailName + '&email=' + emailToAdd + '&listName=' + CONTACT_LIST_MAIN + '&website='
      + process.env.SITE_URL + '&requiresActivation=true&source_Url=' + confirmUrl;

  return request
    .get(requestUrl)
    .accept('text/html')
    .end();
}

export function confirmEmail(email) {
  const action = 'contact/activateblocked';
  const requestUrl = API_URL + action + '?apikey=' + process.env.ELASTIC_EMAIL_API_KEY + '&emails=' + email;

  return request
    .get(requestUrl)
    .accept('text/html')
    .end();
}

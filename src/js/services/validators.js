import validator from 'validator';

const emailTester = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

export const EMAIL_ERROR = {
  EMPTY: 'EMPTY',
  LONG: 'LONG',
  INCORRECT: 'INCORRECT',
  LONG_FIRST_PART: 'LONG_FIRST_PART',
  LONG_SECOND_PART: 'LONG_SECOND_PART',
};

export function validateEmail(email) {
  let valid = false;
  let emailError = '';

  if (email) {
    if (email.length < 254) {
      if (emailTester.test(email)) {
        const parts = email.split('@');
        const firstPart = parts[0];

        if (firstPart.length < 64) {
          const secondPart = parts[1];
          const secondPartElementsArray = secondPart.split('.');

          if (!secondPartElementsArray.some((part) => part.length > 63)) {
            valid = true;
          } else {
            emailError = EMAIL_ERROR.LONG_SECOND_PART;
          }
        } else {
          emailError = EMAIL_ERROR.LONG_FIRST_PART;
        }
      } else {
        emailError = EMAIL_ERROR.INCORRECT;
      }
    } else {
      emailError = EMAIL_ERROR.LONG;
    }
  } else {
    emailError = EMAIL_ERROR.EMPTY;
  }

  return {
    isValid: valid,
    emailError,
  };
}

export function isPassword(pass) {
  let valid = false;

  if (validator.isLength(pass, { min: 6, max: 30 })) {
    if (validator.isAlphanumeric(pass)) {
      valid = true;
    }
  }

  return valid;
}

export function isLogin(login) {
  let valid = false;

  if (validator.isLength(login, { min: 3, max: 30 })) {
    if (validator.isAlphanumeric(login)) {
      valid = true;
    }
  }

  return valid;
}


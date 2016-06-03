const emailTester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

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

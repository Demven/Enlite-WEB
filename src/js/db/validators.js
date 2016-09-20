import validator from 'validator';

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


export const validateUsername = (username) => {
  // what are the validation requirements? 
  let validationErrors = '';
  if (!username) {
    validationErrors += 'Username is required. ';
  }

  if (username.length < 3 || username.length > 20) {
    validationErrors += 'Username should be 3 - 20 characters long.'
  }

  return validationErrors
}

export const validateEmail = (email) => {
  let validationErrors = '';
  if (!email) {
    validationErrors += 'Email is required. '
  }
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!regex.test(email)) {
    validationErrors += 'Invalid email format. '
  }

  return validationErrors;
}

export const validatePassword = (password) => {
  let validationErrors = '';
  if (!password) {
    validationErrors += 'Password is required. '
  }

  if (password.length < 6) {
    validationErrors += 'Password must be at least 6 characters long. ';
  }

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
  if (!regex.test(password)) {
    validationErrors += 'Password must contain at least one uppercase letter, one lowercase letter, and one number.'
  }

  return validationErrors;
}

export const validatePasswordConfirm = (password, passwordConfirm) => {
  let validationErrors = '';

  if (password !== passwordConfirm) {
    validationErrors = 'Passwords must match';
  }

  return validationErrors
}

export const validateRegisterForm = (formData) => {
  const { username, email, password, passwordConfirm } = formData;
  const newInputErrors = {
    username: validateUsername(username),
    email: validateEmail(email),
    password: validatePassword(password),
    passwordConfirm: validatePasswordConfirm(password, passwordConfirm)
  }
  return newInputErrors;
}
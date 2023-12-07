import { useState } from 'react';
import {validateUsername,
   validateEmail, 
   validatePassword, 
   validatePasswordConfirm} from '../utility/formValidation.js';
import InputField from './InputField.jsx';
import FormButton from './FormButton.jsx';

const RegisterForm = () => {
  const initialFormData = {username: '', email: '', password: '', passwordConfirm: ''};
  const [formData, setFormData] = useState(initialFormData);
  const [inputErrors, setInputErrors] = useState(initialFormData);
  const [serverError, setServerError] = useState(null);

  const handleChangeForm = (event) => {
    const {value, name} = event.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = (event) => {
    /// do validation
  }

  const handleBlur = (event) => {
    console.log('enter blur', event.target)
    const {name, value} = event.target;
    switch (name) {
      case "username": {
        const errors = validateUsername(value);
        return setInputErrors({...inputErrors, [name]: errors})
      }
      case "email": {
        const errors = validateEmail(value);
        return setInputErrors({...inputErrors, [name]: errors})
      }
      case "password": {
        const errors = validatePassword(value);
        return setInputErrors({...inputErrors, [name]: errors})
      }
      case "passwordConfirm": {
        const errors = validatePasswordConfirm(formData.password, value);
        return setInputErrors({...inputErrors, [name]: errors})
      }
    } 
  }

  return (
    <form onSubmit={handleSubmit}>
      {serverError && 
        <div 
          role="alert"
          aria-live="assertive"
        >{serverError}</div>
      }
      <InputField 
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChangeForm}
        onBlur={handleBlur}
        errorMessage={inputErrors.username}
        id="username"
        placeholder="E.g bigBlogr"
      > Username *
      </InputField>

      <InputField 
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChangeForm}
        onBlur={handleBlur}
        errorMessage={inputErrors.email}
        id="email"
        placeholder="E.g person@gmail.com"
      > Email *
      </InputField>

      <InputField 
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChangeForm}
        onBlur={handleBlur}
        errorMessage={inputErrors.password}
        id="password"
        placeholder=""
      > Password *
      </InputField>

      <InputField 
        type="password"
        name="passwordConfirm"
        value={formData.passwordConfirm}
        onChange={handleChangeForm}
        onBlur={handleBlur}
        errorMessage={inputErrors.passwordConfirm}
        id="passwordConfirm"
        placeholder=""
      > Confirm Password *
      </InputField>

      <FormButton
        type="submit"
      >
        Register
      </FormButton>

    </form>
  )
}

export default RegisterForm;
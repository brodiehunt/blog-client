import { useState, useRef, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {validateUsername,
   validateEmail, 
   validatePassword, 
   validatePasswordConfirm,
   validateRegisterForm,
  } from '../utility/formValidation.js';
import { registerUser } from '../services/authServices.js';
import AppContext from '../config/StateContext.jsx';
import InputField from './InputField.jsx';
import FormButton from './FormButton.jsx';


const RegisterForm = () => {
  const initialFormData = {username: '', email: '', password: '', passwordConfirm: ''};
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [inputErrors, setInputErrors] = useState(initialFormData);
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fieldRefs = {
    username: useRef(null),
    email: useRef(null),
    password: useRef(null),
    passwordConfirm: useRef(null),
  };


  const handleChangeForm = (event) => {
    const {value, name} = event.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Runs all validation functions - returns inputErrors shaped object with new errors
    const newInputErrors = validateRegisterForm(formData);

    // Finds and returns first key (feild name) that has an error
    const firstErrorField = Object.keys(newInputErrors).find(field => newInputErrors[field]);

    // Sets focus on first error element - sets errorState (in case submit without touching feilds)
    if (firstErrorField && fieldRefs[firstErrorField].current) {
      fieldRefs[firstErrorField].current.focus();
      return setInputErrors(newInputErrors);
    }
    
    // Set Loading state before async operation so it is updated while waiting
    setIsLoading(true);
    // Call to database
    registerUser(formData).then((response) => {

      // Response has data response (success)
      if (response.data) {
        dispatch({
          type: 'setLoggedInUser',
          data: response.data
        })
        return navigate('/posts');

        // Response has error handled in service function (existing email)
      } else if (!response.data && response.error.conflictError) {
        return setServerError(response.error.conflictError)

        // response has validation errors (password restrictions etc)
      } else if (!response.data && response.error.validationError) {
        setInputErrors({...inputErrors, ...response.error.validationError})

      } else {
        throw new Error('What is happening');
      }
    })
    .catch((error) => {
      console.log('this is the error', error.message)
      navigate('/error', {message: error.message});
    })
    .finally(() => setIsLoading(false));

  }

  // Run validation on the element that was just unfocused
  const handleBlur = (event) => {
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
      {isLoading && <div>Loading bruz</div>}
      <InputField 
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChangeForm}
        onBlur={handleBlur}
        elRef={fieldRefs.username}
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
        elRef={fieldRefs.email}
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
        elRef={fieldRefs.password}
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
        elRef={fieldRefs.passwordConfirm}
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
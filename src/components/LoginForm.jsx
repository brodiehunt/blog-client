import { useState, useContext, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validateEmail,
  validatePassword,
  validateLoginForm
  } from '../utility/formValidation.js';
import { loginUser } from '../services/authServices.js';
import AppContext from '../config/StateContext.jsx';
import InputField from './InputField.jsx';
import FormButton from './FormButton.jsx';


const LoginForm = () => {
  const initialFormData = { email: '', password: ''};
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [inputErrors, setInputErrors] = useState(initialFormData);
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fieldRefs = {
    email: useRef(null),
    password: useRef(null),
  };

  const handleChangeForm = (event) => {
    const {value, name} = event.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newInputErrors = validateLoginForm(formData);
    
    const firstErrorField = Object.keys(newInputErrors).find(field => newInputErrors[field]);
    
    
    if (firstErrorField && fieldRefs[firstErrorField].current) {
      setInputErrors(newInputErrors);
      return fieldRefs[firstErrorField].current.focus();
    }

    setIsLoading(true);
    loginUser(formData).then((response) => {
      console.log('response in .then block')
      if (response.data) {
        console.log('enter dispatch blog', response.data);
        dispatch({
          type: 'setLoggedInUser',
          data: response.data
        });
        return navigate('/posts');

      } else if (!response.data && response.error.credentialError) {

        return setServerError(response.error.credentialError);

      } else if (!response.data && response.error.validationError) {

        return setInputErrors({...inputErrors, ...response.error.validationError});

      } else {
        throw new Error('What is happening');
      }
    })
    .catch((error) => {
      console.log(error.message)
      console.log('catch block in event handler')
      navigate('/error', {message: error.message})
    })
    .finally(() => setIsLoading(false));

  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      const errors = validateEmail(value);
      return setInputErrors({...inputErrors, [name]: errors});
    } 
    if (name === 'password') {
      const errors = validatePassword(value);
      return setInputErrors({...inputErrors, [name]: errors});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {serverError &&
        <div
          roles="alert"
          aria-live="assertive"
        >
          {serverError}
        </div>
      }

      <InputField
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChangeForm}
        onBlur={handleBlur}
        elRef={fieldRefs.email}
        errorMessage={inputErrors.email}
        placeholder="E.g your@email.com"
      >
        Email
      </InputField>

      <InputField
        type="password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleChangeForm}
        onBlur={handleBlur}
        elRef={fieldRefs.password}
        errorMessage={inputErrors.password}
        placeholder="E.g your@email.com"
      >
        Password
      </InputField>

      <FormButton 
        type="submit"
      >
        Login
      </FormButton>
    </form>
  )
}

export default LoginForm;
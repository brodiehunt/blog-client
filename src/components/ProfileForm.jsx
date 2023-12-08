import { useState, useContext, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import AppContext from '../config/StateContext.jsx';
import InputField from './InputField.jsx';
import FormButton from './FormButton.jsx';
import {validateUsername, validateEmail} from '../utility/formValidation.js';
import { updateProfile } from '../services/profileServices.js';

const ProfileForm = () => {
  const {store, dispatch} = useContext(AppContext);
  const [inputErrors, setInputErrors] = useState({username: '', email: ''});
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: store.loggedInUser.username,
    email: store.loggedInUser.email
  });
  const fieldRefs = {
    username: useRef(null),
    email: useRef(null),
  }
  const navigate = useNavigate();


  const handleFormChange = (event) => {
    const {value, name} = event.target;
    setFormData({...formData, [name]: value});
  }

  const handleBlur = (event) => {
    const {value, name} = event.target;
    
    if (name === 'username') {
      return setInputErrors({...inputErrors, [name]: validateUsername(value)})
    }
    if (name === 'email') {
      return setInputErrors({...inputErrors, [name]: validateEmail(value)})
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newInputErrors = {
      username: validateUsername(formData.username),
      email: validateEmail(formData.email),
    }

    // Finds and returns first key (feild name) that has an error
    const firstErrorField = Object.keys(newInputErrors).find(field => newInputErrors[field]);

    // Sets focus on first error element - sets errorState (in case submit without touching feilds)
    if (firstErrorField && fieldRefs[firstErrorField].current) {
      fieldRefs[firstErrorField].current.focus();
      return setInputErrors(newInputErrors);
    }

    // set is loading
    setIsLoading(true);

    try {
      const response = await updateProfile(formData);
      console.log(response)
      if (response.data) {
        return dispatch({
          type: 'setLoggedInUser',
          data: response.data
        })
      };
      if (!response.data && response.error.conflictError) {
        return setServerError(response.error.conflictError)
      };
      if (!response.data && response.error.validationError) {
        return setInputErrors({...inputErrors, ...response.error.validationError})
      };
    }  catch (error) {
      console.log(error);
      navigate('/error', {message: error.message});
    } finally {
      setIsLoading(false)
    }
    // Update in db;
    console.log('Successful enough');
  }

  return (
    <form onSubmit={handleSubmit}>
      {serverError && <div>{serverError}</div>}
      <InputField
        type="text"
        name="username"
        value={formData.username}
        id="username"
        errorMessage={inputErrors.username}
        onChange={handleFormChange}
        onBlur={handleBlur}
        elRef={fieldRefs.username}
      >
        Username
      </InputField>
      <InputField
        type="text"
        name="email"
        value={formData.email}
        id="email"
        errorMessage={inputErrors.email}
        onChange={handleFormChange}
        onBlur={handleBlur}
        elRef={fieldRefs.email}
      >
        Email
      </InputField>
      <FormButton
        type="submit"

      >
        Update Profile
      </FormButton>
    </form>
  )
}

export default ProfileForm;
import api from '../config/api';

function formatValidationErrors(errorsArray) {
  const errorsObject = errorsArray.reduce((acc, error) => {
    // pull the first key val out of single error object
    const [key, value] = Object.entries(error)[0];
    
    if (acc[key]) {
      // If the key already exists, concatenate the new error message
      acc[key] += ` ${value}`;
    } else {
      // Otherwise, add the key-value pair
      acc[key] = value;
    }
  
    return acc;
  }, {});
  return errorsObject;
}

export const registerUser = async (userInfo) => {
  try {
    const response = await api.post('/api/auth/register', userInfo);
    return { data: response.data.data, error: null};
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const serverError = error.response.data.error

      // Existing email
      if (status === 409) {
        return {data: null, error: {validationError: null, conflictError: serverError.message }}
      }

      if (status === 400) {

        const errorsObject = formatValidationErrors(serverError)
        
        return {data: null, error: {validationError: errorsObject, conflictError: null }}
      }

      throw new Error(serverError.message)
      
    } else {
      throw new Error('Network error or no response from the server');
    }
  }
  
}

export const loginUser = async (userInfo) => {
  
  try {
   
    const response = await api.post('/api/auth/login', userInfo);
    return {data: response.data.data, error: null}
  } catch(error) {
    
    if (error.response) {
      
      const status = error.response.status;
      const serverError = error.response.data.error;
      
      if (Array.isArray(serverError)) {
        
        const errorsObject = formatValidationErrors(serverError);
        return {data: null, error: {validationError: errorsObject, credentialError: null }}
      }

      if (serverError.message === 'Incorrect email or password') {
        return {data: null, error: {validationError: null, credentialError: serverError.message}}
      }

      throw new Error(serverError.message)
    } else {
     
      throw new Error('Network error or no response from the server');
    }
  }
}
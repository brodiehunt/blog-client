import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getApiKey} from '../services/profileServices.js';

const ApiKey = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(null);

  const handleGetApiKey = async (event) => {
    setIsLoading(true);
    try {
      const apiKey = await getApiKey();
      setApiKey(apiKey);
    } catch(error) {
      if (error.status === 500) {
        return setError(error.message);
      }
      navigate('/error', {message: error.message})
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <div>This is you get your api key</div>
      <button 
        type="button"
        onClick={handleGetApiKey}
      >
        Get Api Key
      </button>
      {apiKey && <div>{apiKey}</div>}
    </div>
  )
}

export default ApiKey;
import { useState, useContext, useRef } from 'react';
import {validatePostTitle, validatePostContent, validatePostForm} from '../utility/formValidation.js';
import InputField from "./InputField";
import FormButton from "./FormButton";

const PostForm = ({initialData, type}) => {
  const [formData, setFormData] = useState(initialData);
  const [inputErrors, setInputErrors ] = useState({title: '', content: ''});
  const [isLoading, setIsLoading] = useState(null);
  const fieldRefs = {
    title: useRef(),
    content: useRef(),
  }
  console.log(inputErrors);

  const handleInputChange = (event) => {
    const {name, value, checked} = event.target;

    if (name === 'published') {
      return setFormData({...formData, [name]: checked})
    }
    return setFormData({...formData, [name]: value});
  }

  const handleBlur = (event) => {
    const { name, value } = event.target;

    // Run validation errors
    if (name === 'title') {
      return setInputErrors({...inputErrors, [name]: validatePostTitle(value)})
    }
    if (name === 'content') {
      return setInputErrors({...inputErrors, [name]: validatePostContent(value)})
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newInputErrors = validatePostForm(formData);
    
    const firstErrorField = Object.keys(newInputErrors).find(field => newInputErrors[field]);
    
    if (firstErrorField && fieldRefs[firstErrorField].current) {
      setInputErrors(newInputErrors);
      return fieldRefs[firstErrorField].current.focus();
    }

    // Do api call here. 
    console.log('Success, will now try to access api')
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        type="text"
        name="title"
        id="title"
        value={formData.title}
        onBlur={handleBlur}
        onChange={handleInputChange}
        elRef={fieldRefs.title}
        errorMessage={inputErrors.title}

      >
        Blog post title
      </InputField>

      <InputField
        type="textarea"
        name="content"
        id="content"
        rows="10"
        value={formData.content}
        onBlur={handleBlur}
        onChange={handleInputChange}
        elRef={fieldRefs.content}
        errorMessage={inputErrors.content}

      >
        Blog post content
      </InputField>

      <InputField
        type="checkbox"
        name="published"
        id="published"
        value={formData.published}
        checked={formData.published}
        onChange={handleInputChange}
      >
        Publish Post
      </InputField>

      <FormButton 
        type="submit"
      >
        {`${type} `} Post
      </FormButton>
    </form>
  )
}

export default PostForm;
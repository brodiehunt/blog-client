const InputField = ({
  children,
  type,
  name,
  value,
  id,
  rows,
  placeholder,
  errorMessage,
  onChange,
  onBlur,
  elRef,
}) => {
  return (
    <div className="input-conatiner">
      <label htmlFor={id}>{children}</label>
      {type === 'textarea' 
        ? <textarea
            name={name}
            id={id}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            ref={elRef}
            placeholder={placeholder}
            rows={rows}
          >

          </textarea>
        : <input
            type={type}
            name={name}
            value={value}
            checked={type === 'checkbox' ? value : ''}
            id={id}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            ref={elRef}
          />   
      }
      {errorMessage &&
        <div
          role="alert"
          aria-live="assertive"
        > 
          {errorMessage}
        </div>
      }
    </div>
  )
}

export default InputField;
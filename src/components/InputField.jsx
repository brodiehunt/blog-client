const InputField = ({
  children,
  type,
  name,
  value,
  id,
  placeholder,
  errorMessage,
  onChange,
  onBlur,
}) => {
  return (
    <div className="input-conatiner">
      <label htmlFor={id}>{children}</label>
      <input
        type={type}
        name={name}
        value={value}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
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
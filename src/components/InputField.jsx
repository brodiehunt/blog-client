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
  elRef,
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
        ref={elRef}
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
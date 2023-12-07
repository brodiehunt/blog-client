const ErrorPage = ({message}) => {
  return (
    <>
      {message && <h1>{message}</h1>}
      <div>This is the error page</div>
    </>
    
  )
}

export default ErrorPage;
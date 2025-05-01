export default function Login() {
  // event is given on submit
  function handleSubmit(event) {
    event.preventDefault(); // prevent default browser behavior of sending http request
    console.log("Form submitted");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className='control-row'>
        <div className='control no-margin'>
          {/* the htmlFor attribute is used to link the label to the input field */}
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' name='email' />
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' name='password' />
        </div>
      </div>

      <p className='form-actions'>
        {/* by default buttons inside a form are of type submit, this sends an
        http request to the react server and refresh the page
        One way to solve this problem is adding type="button".
        Another more elegant way is to use onSubmit on the form*/}
        <button className='button button-flat'>Reset</button>
        <button className='button' /*onClick={handleSubmit}*/>Login</button>
      </p>
    </form>
  );
}

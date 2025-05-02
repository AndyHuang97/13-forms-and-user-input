import { useRef } from "react";

export default function Login() {
  // less code than useState, but imperative code for resetting the input fields
  // still need to connect each input field to the ref
  const email = useRef();
  const password = useRef();

  // event is given on submit
  function handleSubmit(event) {
    event.preventDefault(); // prevent default browser behavior of sending http request

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;
    console.log("Form submitted");
    console.log(enteredEmail);
    console.log(enteredPassword);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className='control-row'>
        <div className='control no-margin'>
          {/* the htmlFor attribute is used to link the label to the input field */}
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' name='email' ref={email} />
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' name='password' ref={password} />
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

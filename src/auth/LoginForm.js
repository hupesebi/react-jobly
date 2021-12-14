import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";


function LoginForm({ handleLogin }) {
  const history = useHistory();

  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => {
      return {
        ...fData,
        [name]: value,
      }
    });
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    let resp = await handleLogin(formData);
    if (resp.success) {
      history.push("/");
    } else {
      setErrors(resp.errors);
    }
  }



  return (
    <div >
      <div>
        {errors && <Alert errors={errors} />}
        <div>
          <h2>
            Login 
            </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="LoginForm-username"> Username </label>
              <input onChange={handleChange} id="LoginForm-username" name="username" required autoComplete="current-username"  placeholder="Username" />
            </div>
            <div>
              <label htmlFor="LoginForm-password">Password</label>
              <input onChange={handleChange} id="LoginForm-password" name="password" type="password" autoComplete="current-password" required placeholder="Password" />
            </div>
          </div>

          <div>
            <button type="submit">
                Log in
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default LoginForm;
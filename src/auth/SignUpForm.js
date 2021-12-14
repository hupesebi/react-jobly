import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import Alert from "../common/Alert";

const SignUpForm = ({handleSignUp}) => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  function handleChange(evt) {
    const {name, value} = evt.target;
    setFormData(fData => {
      return {
        ...fData,
        [name]: value,
      }
    });
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    let resp = await handleSignUp(formData);
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
          Sign up for an account:
        </h2>
      </div>
      <form  onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="SignUpForm-username"> Username </label>
            <input onChange={handleChange} value={formData.username} id="SignUpForm-username" name="username" required autoComplete="current-username"  placeholder="Username" />
          </div>
          <div>
            <label htmlFor="SignUpForm-password">Password</label>
            <input onChange={handleChange} value={formData.password} id="SignUpForm-password" name="password" type="password" autoComplete="current-password" required placeholder="Password" />
          </div>


          <div>
            <label htmlFor="SignUpForm-firstName"> First Name </label>
            <input onChange={handleChange} value={formData.firstName} id="SignUpForm-firstName" name="firstName" required autoComplete="firstName"   placeholder="First Name" />
          </div>
          <div>
            <label htmlFor="SignUpForm-lastName">Last Name</label>
            <input onChange={handleChange} value={formData.lastName} id="SignUpForm-lastName" name="lastName" type="lastName" autoComplete="current-lastName" required placeholder="Last Name" />
          </div>
          <div>
            <label htmlFor="SignUpForm-email"> email </label>
            <input onChange={handleChange} value={formData.email} type="email" id="SignUpForm-email" name="email" required autoComplete="email"   placeholder="Email address" />
          </div>
        </div>

        <div>
          <button type="submit">
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}

export default SignUpForm;
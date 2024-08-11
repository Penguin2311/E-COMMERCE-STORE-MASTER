import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Api } from "../../utils/Api";
import { setToken } from "../../utils/localstorage";
import "./signIn.css";
function Index() {
  const { replace, push } = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const _handleSubmit = useCallback(async () => {
    // callback
    if (email.length > 2 && password.length > 2) {
      setLoading(true);
      const { statusCode, data } = await Api.postRequest("/api/user/signin", {
        email,

        password,
      });
      setLoading(false);
      if (statusCode === 400 || statusCode === 500 || statusCode === 403) {
        setLoading(false);
        alert(data);
        return;
      }
      const { token } = JSON.parse(data);
      setToken(token);
      replace("/");
    }
  }, [email, password, replace]);

  if (loading) return <h1>Loading.....</h1>;
  return (
    <div className="signinscreen">
      <div className="container">
        <div className="innerContainer">
          <p className="signIn-text">Sign In</p>

          <label for="email" className="emailPass-text">
            Email
          </label>
          <input
            type="email"
            id="lname"
            name="email"
            placeholder="Your email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="password" className="emailPass-text">
            Password
          </label>
          <input
            type="password"
            id="lname"
            name="password"
            placeholder="Your Password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link to="/signup" className="link">
            <span>Create a new account ?</span>
          </Link>
          <br />

          <input type="submit" value="Sign in" onClick={_handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default Index;

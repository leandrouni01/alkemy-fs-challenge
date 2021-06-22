import React from "react";
import LoginForm from "components/forms/LoginForm";

class Login extends React.Component {

  handleSubmit(registerData) {
    console.log(registerData);
  }

  render() {

    return (
      <div className="pb-form">
        <div className="row">
          <div className="col-6">
            <h1 className="page-title">Login</h1>
            <LoginForm onSubmit={this.handleSubmit}/>
          </div>
          <div className="col-6">
            <figure className="image-container">
              <img src="/images/login-image.jpg" className="img-fluid mx-auto img-thumbnail" alt="Numbers on  a graphic"/>
            </figure>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
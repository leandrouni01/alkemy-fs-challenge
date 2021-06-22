import React from "react";
import RegisterForm from "components/forms/RegisterForm";

class Register extends React.Component {

  handleSubmit(registerData) {
    console.log(registerData);
  }

  render() {

    return (
      <div className="pb-form">
        <div className="row">
          <div className="col-6">
            <h1 className="page-title">Register</h1>
            <RegisterForm onSubmit={this.handleSubmit}/>
          </div>
          <div className="col-6">
            <figure className="image-container">
              <img src="/images/register-image.jpg" className="img-fluid mx-auto img-thumbnail" alt="Numbers on  a graphic"/>
            </figure>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;
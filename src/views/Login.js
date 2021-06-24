import React from "react";
import LoginForm from "components/forms/LoginForm";
import { withAuth } from 'providers/AuthProvider';

class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      errors: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(registerData) {
    this.props.auth.signIn(null, registerData)
    .then(_=> {
    })
    .catch((err) => {
      this.setState({errors: err});
    })
  }

  render() {

    const { errors } = this.state;

    return (
      <div className="pb-form">
        <div className="row">
          <div className="col-6">
            <h1 className="page-title">Login</h1>
            {
              errors.length > 0 &&
              errors.map(err => <div className="alert alert-danger" key={err.detail}>{err.detail}</div>)
            }
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

export default withAuth(Login);
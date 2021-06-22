import React from "react";
import RegisterForm from "components/forms/RegisterForm";
import { Redirect } from 'react-router-dom';
import { registerUser } from 'actions';
import { withAuth } from 'providers/AuthProvider';

class Register extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      shouldRedirect: false,
      errors: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(registerData) {
    registerUser(registerData)
    .then((res) => {
      return this.props.auth.signIn(res.data.token);
    })
    .then(_=> {
      this.setState({shouldRedirect: true});
    })
    .catch(err => {
      this.setState({errors: err});
    })
  }

  render() {

    const { errors, shouldRedirect } = this.state;

    if(shouldRedirect){
      return <Redirect to={{pathname: '/'}} />
    }

    return (
      <div className="pb-form">
        <div className="row">
          <div className="col-6">
            <h1 className="page-title">Register</h1>
            {
              errors.length > 0 &&
              errors.map(err => <div className="alert alert-danger" key={err.detail}>{err.detail}</div>)
            }
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

export default withAuth(Register);
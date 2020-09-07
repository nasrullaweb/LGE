import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { login, clearAuth } from '../../store/auth/actionCreator'
import logo from '../../images/LG_Logo_LG_Login.png';
import copyRight from '../../images/LG_GFK_Logo.png';
import Loading from '../common/Loading'
import { Link  } from 'react-router-dom'; 
import {PageView, initGA} from '../common/Tracking';

import { Form, Icon, Input, Button, Checkbox, Spin } from 'antd';

class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const { username, password } = values
      if (!err) {
        this.props.login(username, password)
      }
    });
  };

  componentDidMount() {
    initGA('UA-176821185-1', sessionStorage.getItem('user'));
      PageView();
    if (sessionStorage.getItem('user') !== null) {
      window.location = window.location.origin
    } else {
      if (this.props.user) {
        this.clearUser()
      }
    }
  }

  clearUser = () => {
    this.props.clearAuth()
  }

  render() {
    const { getFieldDecorator} = this.props.form;
    const { loginError } = this.props
    return (
      <div className='login-container'>
        {this.props.ajaxCallsInProgress > 0 && <Loading />}
        <div className='loginBackground'>

        </div>
        <div className='loginContainer'>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div className='logo'>
              <img src={logo} />
            </div>
            {/* <div className='formTitle'>
              MMM Platform 
            </div> */}
            
            <div className="formContainer loginFormContainer">
            <div className="formData">
            <Form.Item>
              {getFieldDecorator('username', {
                //rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  placeholder="Username"
                  required
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                //rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  type="password"
                  placeholder="Password"
                  required
                />,
              )}
            </Form.Item>
            <Form.Item className="login_bottom">
            <span className="login-form-forgot">
            <Link to="/forgetPassword">Forgot password</Link>
                </span>
              <div className='login-checkbox'>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: false,
                })(<Checkbox>Remember me</Checkbox>)}
              </div>
              
            </Form.Item>
            {
              
              loginError &&
              <p className='login_error'>{loginError}</p>
            }
            <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </div>
          </div>
          </Form>
          <div className="copyRightLogin">©MMMPLATFORM2020</div>
          <div className="copyRightLogo"><img src={copyRight} /></div>
        </div>
      </div>
    );
  }
}

const Login = Form.create({ name: 'normal_login' })(LoginForm);

const mapStateToProps = (state) => {
  return {
    isLoginSuccess: state.auth.isLoginSuccess,
    loginError: state.auth.loginError,
    user: state.auth.user,
    accessToken: state.auth.accessToken,
    ajaxCallsInProgress: state.ajaxCallsInProgress
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  clearAuth,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login);
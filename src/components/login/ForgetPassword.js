import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { forgetPassword, clearAuth } from '../../store/auth/actionCreator'
import logo from '../../images/LG_Logo_LG_Login.png';
import copyRight from '../../images/LG_GFK_Logo.png';
import Loading from '../common/Loading'
import { Link  } from 'react-router-dom'; 
import {PageView, initGA} from '../common/Tracking';

import { Form, Icon, Input, Button, Checkbox, Spin, Typography  } from 'antd';

const { Title } = Typography;

class ForgetPassword extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const { username } = values
      if (!err) {
        this.props.forgetPassword(username)
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
            
            <div className="formContainer">
            <div className="formData">
            <Form.Item>
            <Title level={4} className="emaiPass">Forget Password 
            <Link to="/login">Back To Login</Link>
            </Title>
              {getFieldDecorator('username', {
                //rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  placeholder="Email"
                  required
                />,
              )}
            </Form.Item>
            {
              
              loginError &&
              <p className='login_error forget'>{loginError}</p>
            }
            <Button type="primary" htmlType="submit" className="login-form-button">
                Send Email
              </Button>
              <p className="resetBack"><Link to="/login">Back To Login</Link></p>
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

const ForgetPasswordForm = Form.create({ name: 'normal_login' })(ForgetPassword);

const mapStateToProps = (state) => {
  return {
    isLoginSuccess: state.auth.isLoginSuccess,
    loginError: state.auth.forgetError,
    user: state.auth.user,
    accessToken: state.auth.accessToken,
    ajaxCallsInProgress: state.ajaxCallsInProgress
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  forgetPassword,
  clearAuth,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordForm);
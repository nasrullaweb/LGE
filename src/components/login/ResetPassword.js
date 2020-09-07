import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { resetPassword, clearAuth } from '../../store/auth/actionCreator'
import logo from '../../images/LG_Logo_LG_Login.png';
import copyRight from '../../images/LG_GFK_Logo.png';
import Loading from '../common/Loading'
import { Link  } from 'react-router-dom'; 
import {PageView, initGA} from '../common/Tracking';

import { Form, Icon, Input, Button, Checkbox, Spin, Typography  } from 'antd';

const { Title } = Typography;

class ResetPasswordForm extends React.Component {
    state = {
        confirmDirty: false,
        token: null,
        emaiId: null
      };
    
      handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            const { password } = values
            const { emaiId, token } = this.state
          if (!err) {
            this.props.resetPassword(emaiId, password, token)
          }
        });
      };
    
      handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      };
    
      compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      };
    
      validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      };

  componentDidMount() {
      
      const query = new URLSearchParams(this.props.location.search);
      const token = query.get('token')
      const emaiId = query.get('emailId')
      initGA('UA-176821185-1', sessionStorage.getItem('user'));
      PageView();
    if (sessionStorage.getItem('user') !== null) {
      window.location = window.location.origin
    } else {
      if (this.props.user) {
        this.clearUser()
      }
    }
    this.setState({
        token,
        emaiId
    })
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
            {
                this.state.emaiId &&
                <div className="formContainer reset">
            <div className="formData">
                
            <Form.Item >
                {getFieldDecorator('password', {
                    rules: [
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    {
                        validator: this.validateToNextPassword,
                    },
                    ],
                })(<Input.Password placeholder="Password" />)}
                </Form.Item>
                <Form.Item >
                {getFieldDecorator('confirm', {
                    rules: [
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    {
                        validator: this.compareToFirstPassword,
                    },
                    ],
                })(<Input.Password onBlur={this.handleConfirmBlur} placeholder="Confirm Password" />)}
            </Form.Item>
            {
              
              loginError &&
              <p className='login_error rest'>{loginError}</p>
            }
            <Button type="primary" htmlType="submit" className="login-form-button reset-btn">
                Reset Password 
              </Button>
            <p className="resetBack"><Link to="/login">Back To Login</Link></p>
            </div>
            
              </div>
            }
            
          </Form>
          <div className="copyRightLogin">©MMMPLATFORM2020</div>
          <div className="copyRightLogo"><img src={copyRight} /></div>
        </div>
      </div>
    );
  }
}

const ResetPassword = Form.create({ name: 'normal_login' })(ResetPasswordForm);

const mapStateToProps = (state) => {
  return {
    isLoginSuccess: state.auth.isLoginSuccess,
    loginError: state.auth.resetError,
    user: state.auth.user,
    accessToken: state.auth.accessToken,
    ajaxCallsInProgress: state.ajaxCallsInProgress
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
resetPassword,
  clearAuth,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
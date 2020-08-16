import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { resetPassword, clearAuth } from '../../store/auth/actionCreator'
import logo from '../../images/Login_GFK_Logo.png';
import copyRight from '../../images/mmmplatform.png';
import Loading from '../common/Loading'
import { Link  } from 'react-router-dom'; 

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
                
            <Form.Item hasFeedback>
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
                })(<Input.Password placeholder="Password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                </Form.Item>
                <Form.Item hasFeedback>
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
                })(<Input.Password onBlur={this.handleConfirmBlur} placeholder="Confirm Password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>
            </div>
            {
              
              loginError &&
              <p className='login_error rest'>{loginError}</p>
            }
            <Button type="primary" htmlType="submit" className="login-form-button">
                Reset Password
              </Button>
            <p className="resetBack"><Link to="/login">Back To Login</Link></p>
              </div>
            }
            
          </Form>
          <div className="copyRightLogin"><img src={copyRight} /></div>
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
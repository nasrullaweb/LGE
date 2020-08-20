import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../common/Header.js';
import { Form, Input, Button, Typography } from 'antd';
import { changePassword } from '../../store/user/actionCreator'
import Loading from '../common/Loading'
import { setMenu } from '../../store/auth/actionCreator'
import { Link  } from 'react-router-dom';


const { Text } = Typography;

class ChangePasswordForm extends Component {

    componentDidMount() {
        this.props.setMenu('changePassword')
    }

    state = {
        confirmDirty: false,
      };
    
      handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            const { oldpassword, password, confirm } = values
          if (!err) {
            this.props.changePassword(oldpassword, password, confirm)
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

    

    render() {

        const { getFieldDecorator } = this.props.form;
        const { ajaxCallsInProgress, changePasswordError } = this.props
        return (
            <div className="container simulatorContainer">
                {ajaxCallsInProgress > 0 && <Loading />}
                <Header />
                <div className="mainContent">
                    <div className="changePasswordContainer">
                    <Form onSubmit={this.handleSubmit} className="create_User">
                        {
                
                            changePasswordError &&
                            <p className='change-password_error'>
                                {changePasswordError}
                                <Link to="/home" className="backHome">Back To Home</Link>
                            </p>
                        }
                        <Form.Item hasFeedback>
                            {getFieldDecorator('oldpassword', {
                                rules: [
                                {
                                    required: true,
                                    message: 'Please input your old password!',
                                }
                                ],
                            })(<Input.Password placeholder="Old Password"  />)}
                        </Form.Item>
                        <Form.Item hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [
                                {
                                    required: true,
                                    message: 'Please input you new password!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                                ],
                            })(<Input.Password placeholder="New Password"  />)}
                        </Form.Item>
                        <Form.Item hasFeedback>
                            {getFieldDecorator('confirm', {
                                rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your New password!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                                ],
                            })(<Input.Password onBlur={this.handleConfirmBlur} placeholder="Confirm  New Password"  />)}
                        </Form.Item>

                        <Form.Item className="modelButtons">
                            <Button onClick={this.props.handleOk}>Cancel</Button>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Change Password
                            </Button>
                        </Form.Item>
                    </Form>
                    </div>
                   
                </div>
                {/* <Footer /> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        ajaxCallsInProgress: state.ajaxCallsInProgress,
        accessToken: state.auth.accessToken,
        changePasswordError: state.users.changePasswordError,
        isLoginSuccess: state.users.isLoginSuccess,
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    changePassword,
    setMenu
}, dispatch)


const ChangePassword = Form.create({ name: 'create_User' })(ChangePasswordForm);

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
import React, { Component } from 'react'
import { Form, Select, Input, Button, Typography } from 'antd';
import './user.less'
import {PageView, initGA} from '../common/Tracking';

const { Text } = Typography;
const { Option } = Select;

class CreateUser extends Component {

    // componentDidMount() {
    //     initGA('UA-176821185-1', sessionStorage.getItem('user'));
    //   PageView();
    // }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let data = Object.assign(values);
            data.Mobile = null;
            data.ConfirmPassword = data.password;
            data.JobTitle = '';
            data.Status = 1;
            if (!err) {
                this.props.postUser(data);
                this.props.handleOk();
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { rolesList } = this.props;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="create_User">
                    <Form.Item>
                        <Text className="formLabel">First Name*</Text>
                        {getFieldDecorator('firstName', {
                            rules: [{ required: true, message: 'Please input your first name!' },
                            ],
                        })(
                            <Input placeholder="First Name*" />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Text className="formLabel">Last Name*</Text>
                        {getFieldDecorator('lastName', {
                            rules: [{ required: true, message: 'Please input your last name!' },
                            ],
                        })(
                            <Input placeholder="Last Name*" />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Text className="formLabel">Email*</Text>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your Email!' },
                            ],
                        })(
                            <Input placeholder="Email*" />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Text className="formLabel">Role*</Text>
                        {getFieldDecorator('role', {
                            rules: [{ required: true, message: 'Please Select Role!' },
                            ],
                        })(
                            <Select
                                showSearch
                                mode="single"
                                style={{ width: '100%' }}
                                placeholder="Select role"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    rolesList.map((role) =>
                                        <Option key={role.id} value={role.id}>{role.name}</Option>
                                    )
                                }
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Text className="formLabel">Password*</Text>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your password!' },
                            ],
                        })(
                            <Input placeholder="Password*" />,
                        )}
                    </Form.Item>

                    <Form.Item className="modelButtons">
                        <Button onClick={this.props.handleOk}>Cancel</Button>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Create User
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const CreateUsers = Form.create({ name: 'create_User' })(CreateUser);

export default CreateUsers

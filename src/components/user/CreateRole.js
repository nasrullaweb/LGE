import React, { Component } from 'react'
import { Form, Select, Input, Button, Typography } from 'antd';
import './user.less'

const { Text } = Typography;

class CreateRole extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const { role } = values
            if (!err) {
                this.props.postRole(role);
                this.props.handleOk();
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="create_Role">
                    <Form.Item>
                        <Text className="formLabel">Role*</Text>
                        {getFieldDecorator('role', {
                            rules: [{ required: true, message: 'Please input role!' },
                            ],
                        })(
                            <Input placeholder="Role*" />,
                        )}
                    </Form.Item>
                   
                    <Form.Item className="modelButtons">
                        <Button onClick={this.props.handleOk}>Cancel</Button>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Create Role
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const CreateRoles = Form.create({ name: 'create_Role' })(CreateRole);

export default CreateRoles

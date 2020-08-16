import React from 'react'
import { Form, Select, Input, Button, Checkbox, Typography } from 'antd';
import './CreateScenario.less'

const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;



export class ShareScenarioForm extends React.Component {

    

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          //const values
          if (!err) {

             const data = {
                "Id": this.props.selectedId,
                "SharedBy" : values.users.join(),
                }
            this.props.handleOk(data)
          }
        });
      };


    render() {
      const { usersList, selectedId, selectedName } = this.props
      const { getFieldDecorator} = this.props.form;
            return (
              <div>
               <Form onSubmit={this.handleSubmit} className="share_scenario">
                    <Form.Item>
                        <Text className="formLabel">Select Users</Text>
                        {getFieldDecorator('users', {
                           rules: [{ required: true, message: 'Please Select atleast one user!' }],
                        })(
                            <Select
                                showSearch
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Select users"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                               {
                                   usersList.map((user) =>
                                   <Option key={user.userId} value={user.userId}>{user.userName}</Option>
                                   )
                               } 
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Text className="formLabel">Additional Notes</Text>
                        {getFieldDecorator('notes', {
                            
                        })(
                            <TextArea
                            placeholder="Additional Notes"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item className="modelButtons">
                        <Button onClick={this.props.handleOk}>Cancel</Button>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Share Scenario
                        </Button>
                    </Form.Item>
                </Form>
              </div>
            )
          }

}


const ShareScenario = Form.create({ name: 'share_scenario' })(ShareScenarioForm);

export default ShareScenario
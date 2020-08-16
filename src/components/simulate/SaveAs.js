import React from 'react'
import { Form, Select, Input, Button, Checkbox, Typography } from 'antd';
import '../scenario/CreateScenario.less'

const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;



export class SaveAsForm extends React.Component {

    state = {
        baseScenarios: []
    }

    // static getDerivedStateFromProps(props, state) {
    //     if (!props.visibleSaveAs) {
    //         props.form.resetFields()
    //       return {}
    //     }
    //     //return { };
    // }
    componentDidMount(){
        // if (this.props.isSimulatorOptimiser) {
        //     this.setState({
        //         baseScenarios: this.props.scenarios.filter(scenario => scenario.isSimulated && scenario.isSimulatorOptimiser === this.props.isSimulatorOptimiser)
        //     })
        // } else {
        //     this.setState({
        //         baseScenarios: this.props.scenarios.filter(scenario => scenario.isSimulated)
        //     })
        // }
        
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          //const values
          if (!err) {

             const data = {
                "ScenarioName" : values.scenarioname,
                "ScenarioNotes" : values.scenarioNote,
                }
              this.props.saveAsScenario(values)
            //this.props.login(username, password)
          }
        });
      };

      checkUniqueName = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.props.scenarioList.includes(value)) {
            callback('The Scenario Name is already present!');
        } else {
            callback();
        }
      };

    render() {
      const { scenarioList, scenarios } = this.props
      const { getFieldDecorator} = this.props.form;
            return (
              <div>
               <Form onSubmit={this.handleSubmit} className="create_scenario">
                    <Form.Item>
                        <Text className="formLabel">Scenario Name*</Text>
                        {getFieldDecorator('scenarioname', {
                            rules: [
                                { required: true, message: 'Please input your scenario name!' },
                                { validator: this.checkUniqueName },
                            ],
                        })(
                            <Input
                            placeholder="Scenario Name*"
                            />,
                        )}
                    </Form.Item>
                    
                    <Form.Item>
                        <Text className="formLabel">Scenario Notes</Text>
                        {getFieldDecorator('scenarioNote', {
                            
                        })(
                            <TextArea
                            placeholder="Scenario Notes"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item className="modelButtons">
                        <Button onClick={this.props.handleOk}>Cancel</Button>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Save As
                        </Button>
                    </Form.Item>
                </Form>
              </div>
            )
          }

}


const SaveAs = Form.create({ name: 'save_as' })(SaveAsForm);


export default SaveAs
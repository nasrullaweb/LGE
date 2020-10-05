import React from 'react'
import { Form, Select, Input, Button, Checkbox, Typography } from 'antd';
import './CreateScenario.less'

const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;



export class ScenarioForm extends React.Component {

    state = {
        baseScenarios: [],
        isSimulatorOptimiser: '',
        model: ''
    }

    static getDerivedStateFromProps(props, state) {
        if (!props.visible) {
            props.form.resetFields()
          return {}
        }
        //return { };
    }
    componentDidMount(){
        if (this.props.isSimulatorOptimiser) {
            this.setState({
                isSimulatorOptimiser: this.props.isSimulatorOptimiser,
                baseScenarios: this.props.scenarios.filter(scenario => scenario.isSimulated && scenario.isSimulatorOptimiser === this.props.isSimulatorOptimiser)
            })
        } else {
            this.setState({
                baseScenarios: this.props.scenarios.filter(scenario => scenario.isSimulated)
            })
        }
        
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          //const values
          if (!err) {

             const data = {
                "ScenarioName" : values.scenarioname,
                "ScenarioNotes" : values.scenarioNote,
                "Model" : values.model,
                "Geography": values.geography,
                "BaseScenarioId" : values.baseScenario ? values.baseScenario : 0,
                "isSimulatorOptimiser" : values.isSimulatorOptimiser,
                "isShared" : 0,
                }
              this.props.postScenarioHandle(data)
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

      handleBaseScenario = (value) => {
          this.setState({
            isSimulatorOptimiser: value
          })

      }

      handleBaseScenarioModal = (value) => {
        this.setState({
            model: value
          })

    }
    getBaseScenarios = () => {
        const { isSimulatorOptimiser, model } = this.state
        const results = this.props.scenarios.filter(scenario => scenario.isSimulated && scenario.isSimulatorOptimiser === isSimulatorOptimiser && scenario.model === JSON.parse(sessionStorage.getItem('modelValue')))

        return results
    }

    render() {
      const { scenarioList, modelList, scenarios, isSimulatorOptimiser } = this.props
      const { getFieldDecorator} = this.props.form;
      const baseScenarioData = this.state.isSimulatorOptimiser ? this.getBaseScenarios() : [];
            return (
              <div>
               <Form onSubmit={this.handleSubmit} className="create_scenario">
                   <div className="leftCreate">
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
                        <Text className="formLabel">Model*</Text>
                        {getFieldDecorator('model', {
                            initialValue: JSON.parse(sessionStorage.getItem('modelValue')),
                            rules: [{ required: true, message: 'Please Select Model!' }],
                        })(
                            <Input
                                placeholder="Model*" disabled
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Text className="formLabel">Geography*</Text>
                        {getFieldDecorator('geography', {
                            initialValue: JSON.parse(sessionStorage.getItem('geographyValue')),
                            rules: [{ required: true, message: 'Please Select Geography!' }],
                        })(
                            <Input
                                placeholder="Geography*" disabled
                            />,
                        )}
                    </Form.Item>
                    </div>
                    <div className="rightCreate">
                    <Form.Item>
                        <Text className="formLabel">Simulator or Optimizer*</Text>
                        {getFieldDecorator('isSimulatorOptimiser', {
                            initialValue: isSimulatorOptimiser,
                            rules: [{ required: true, message: 'Please Select a Simulator or Optimizer' }],
                        })(
                            <Select
                                showSearch
                                placeholder="Select a Simulator or Optimizer"
                                optionFilterProp="children"
                                onChange={this.handleBaseScenario}
                                disabled={isSimulatorOptimiser}
                                filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option key='simulator' value='Simulator'>Simulator</Option>
                                <Option key='optimizer' value='Optimizer'>Optimizer</Option>
                                
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Text className="formLabel">Base Scenario</Text>
                        {getFieldDecorator('baseScenario', {
                        })(
                            <Select
                                showSearch
                                placeholder="Select a Base Scenario"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                               {
                                   baseScenarioData.map((scenario) =>
                                   <Option key={scenario.id} value={scenario.id}>{scenario.scenarioName}</Option>
                                   )
                               } 
                            </Select>,
                        )}
                    </Form.Item>
                    </div>
                    {/* <Form.Item>
                    {getFieldDecorator('shared', {
                        valuePropName: 'checked',
                        initialValue: false,
                        })(<Checkbox>Shared</Checkbox>)}   
                    </Form.Item> */}
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
                            Create Scenario
                        </Button>
                    </Form.Item>
                </Form>
              </div>
            )
          }

}


const CreateScenario = Form.create({ name: 'create_scenario' })(ScenarioForm);

export default CreateScenario
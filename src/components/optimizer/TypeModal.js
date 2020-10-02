import React from 'react'
import { Form, Select, Input, Button, Checkbox, Typography, Radio, InputNumber } from 'antd';

const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;



export class TypeModal extends React.Component {

    

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
        const { revValueChange, revValue, revPer, revPrice, onChangerevPrice, onChangerevPer, keyHighlights, onrevChangeOk } = this.props
            return (
              <div>
                  {
                      keyHighlights &&
                      <div>
                          <Radio.Group onChange={revValueChange} value={revValue} >
                            <Radio value="price">
                                €
                            </Radio>
                            <Radio value="per">
                                %
                            </Radio>
                        </Radio.Group>
                        <div className="modalInput" >
                            {
                                revValue && revValue == "price" &&
                                <InputNumber  value={revPrice} onChange={e => onChangerevPrice(e)} formatter={value => `€ ${value}`}/>
                            }
                            {
                            revValue && revValue == "per" &&
                                <InputNumber value={revPer} onChange={e => onChangerevPer(e)} formatter={value => `${value} %`}/>
                            }
                        </div>
                        <div className="modelButtons">
                            {
                                revValue &&
                                <Button type="primary" htmlType="submit" className="login-form-button" onClick={e => onrevChangeOk()}>
                                    Ok
                                </Button>
                            }
                            
                        </div>
                    </div>
                  }
               
              </div>
            )
          }

}



export default TypeModal
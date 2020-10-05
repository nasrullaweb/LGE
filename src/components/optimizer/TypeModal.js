import React from 'react'
import { Form, Select, Table, Input, Button, Checkbox, Typography, Radio, InputNumber } from 'antd';

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
        const { revValueChange, revValue, methodValueChange, methodValue, revPer, revPrice, onChangerevPrice, onChangerevPer, keyHighlights, onrevChangeOk } = this.props
        const columnsKey = [
           
            { title: 'Spend', dataIndex: 'spend', key: 'spend', render: (spend, record) => (
                <span className="borderRight">
                    {record.tactic && record.tactic === 'Original Plan' &&
                        <span>{`$${Math.round(spend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                    }
                </span>
             )},
            { title: 'Revenue', dataIndex: 'revenue', key: 'revenue', render: (revenue, record) => (
                <span className="borderRight">
                    {record.tactic && record.tactic === 'Original Plan' &&
                        <span>{`$${Math.round(revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                    }
                </span>
             )},
            { title: 'ROI', dataIndex: 'roi', key: 'roi', render: (roi, record) => (
                <span>
                    {record.tactic && record.tactic === 'Original Plan' &&
                        <span>{`$${parseFloat(roi).toFixed(2)}`}</span>
                    }
                </span>
             )},
        ];
            return (
              <div>
                  {
                      keyHighlights &&
                      <div>
                          <div className="leftTypeModal">
                          <div className="tableDataKey">
                          <Table
                                    className="components-table-demo-nested keyHighlights"
                                    columns={columnsKey}
                                    pagination={false}
                                    dataSource={keyHighlights}
                                />
                                </div>
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
                    <div className="rightTypeModal">
                        <div className="head">Method</div>

                        <Radio.Group onChange={methodValueChange} value={methodValue} >
                            <Radio value="Historical">
                            Historical
                            </Radio>
                            <Radio value="ROI Based">
                            ROI Based
                            </Radio>
                            <Radio value="No A Priori">
                            No A Priori
                            </Radio>
                            <Radio value="Custom">
                            Custom
                            </Radio>
                        </Radio.Group>
                        </div>
                        <div className="clear"></div>
                    </div>
                  }
               
              </div>
            )
          }

}



export default TypeModal
import React from 'react'
import { Tabs, Table, Switch, Icon, InputNumber, Typography, Popover, Tooltip, Button, Modal  } from 'antd';
import { InfoCircleFilled, BarChartOutlined } from '@ant-design/icons';
import ColoredScrollbars from '../common/ColoredScrollbars';




export class FixedModal extends React.Component {

    



    render() {
        const { fixedTactics } = this.props
        const columns = [
            { title: 'Tactic', dataIndex: 'tactic', key: 'tactic', className: 'leftAlign', 
                render: (text, record) => <span className="borderRight">{text}</span>, 
            },
            { title: 'Spend', dataIndex: 'spend', key: 'spend', className: 'leftAlign',
                render: (text, record) => <span className="borderRight">{`${sessionStorage.getItem('symbolVal')}${Math.round(text).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>, 
            },
            { title: 'Inc Revenue', dataIndex: 'revenue', key: 'revenue', className: 'leftAlign',
                render: (text, record) => <span className="borderRight">{`${sessionStorage.getItem('symbolVal')}${Math.round(text).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>, 
            },
            { title: 'Inc ROI', dataIndex: 'roi', key: 'roi', className: 'leftAlign',
                render: (text, record) => <span className="borderRight">{`${sessionStorage.getItem('symbolVal')}${(Math.round(text*100)/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>, 
            },
            { title: 'Brand Revenue', dataIndex: 'ltRevenue', key: 'ltRevenue', className: 'leftAlign',
                render: (text, record) => <span className="borderRight">{`${sessionStorage.getItem('symbolVal')}${Math.round(text).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>, 
            },
            { title: 'Brand ROI', dataIndex: 'ltroi', key: 'ltroi', className: 'leftAlign',
                render: (text, record) => <span className="borderRight">{`${sessionStorage.getItem('symbolVal')}${(Math.round(text*100)/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>, 
            },
            
            
        ];
       
            return (
                <div className="fixedContainer">
                <ColoredScrollbars>
                  
                  <Table
                                    className="components-table-demo-nested"
                                    columns={columns}
                                    dataSource={fixedTactics}
                                    pagination={false}
                                />
                </ColoredScrollbars>
               
              </div>
            )
          }

}



export default FixedModal
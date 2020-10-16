import React, {Fragment} from 'react'
import { Table } from 'antd';
import ColoredScrollbars from '../common/ColoredScrollbars';





export class SpendTable extends React.Component {

    render() {
      const columns = [
        {
          title: 'Tactic',
          dataIndex: 'tactic',
          key: 'tactic',
          render: (text, record) => <span className="borderRight">{text}</span>,
        },
        {
            title: '2018 (€)',
            dataIndex: 'previous',
            render: (text, record) => <span className="borderRight">{Math.round(text)}</span>,
          },
        {
          title: '2019 (€)',
          dataIndex: 'current',
          key: 'current',
          render: (text, record) => <span className="borderRight">{Math.round(text)}</span>,
        },
        {
            title: 'YoY Growth',
            dataIndex: 'yoyGrowth',
            render: (text, record) => 
            text !== 0 ? 
                text < 0 ? <span className="borderRight negitive">{text}%</span>
                : <span className="borderRight positive">{text}%</span>
            : <span className="borderRight">NA</span>,
        },
        {
            title: '2018 Split',
            dataIndex: 'previousSplit',
            render: (text, record) => <span className="borderRight">{text}%</span>,
          },
        {
          title: '2019 Split',
          dataIndex: 'currentSplit',
          render: (text, record) => <span>{text}%</span>,
        },
        
        
        
        
      ];

            return (
              <div className="container simulatorContainer">
                {/* { addedId && <Redirect to={url} /> }
                {ajaxCallsInProgress > 0 && <Loading />}
                <Header /> */}
                  <div className="mainContent">
                    <div className="manageContainer">
                      
                      <div className="manageTable spendTable">
                          <Table columns={columns} dataSource={this.props.graphData32} pagination={false}  />
                      </div>
                    </div>
                   
                  </div>
                {/* <Footer /> */}
              </div>
             
              
            )
          }

}



export default SpendTable
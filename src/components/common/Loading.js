import React from 'react'
import { Spin } from 'antd';


export class Loading extends React.Component {
    render() {
            return (
              <div className="LoadingContainer">
                <Spin tip="Loading..." > </Spin>
              </div>
             
              
            )
          }

}

export default Loading
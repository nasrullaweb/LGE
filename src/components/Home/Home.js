import React from 'react'
import { Button, Radio, Menu, Dropdown, Checkbox, Empty, Icon } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { setMenu, logOut } from '../../store/auth/actionCreator'
import { Link  } from 'react-router-dom'; 

import Header from '../common/Header.js';
import Footer from '../common/Footer.js';
import {PageView, initGA} from '../common/Tracking';
import { getModelList, getGeographyList, getModelandGeographyList } from '../../store/dataViewer/actionCreator'

const CheckboxGroup = Checkbox.Group;

export class Home extends React.Component {
  state = {
    modelName: {
        checkedList: JSON.parse(sessionStorage.getItem('modelValue')) || '',
    },
    geography: {
        checkedList: JSON.parse(sessionStorage.getItem('geographyValue')) || '',
    }, 
    modelValue: JSON.parse(sessionStorage.getItem('modelValue')) || '',
    geographyValue: JSON.parse(sessionStorage.getItem('geographyValue')) || '',
    message: 'Please Select Model',
}

  componentDidMount() {
    this.props.setMenu('home')
      initGA('UA-176821185-1', sessionStorage.getItem('user'));
      PageView();

      if (JSON.parse(sessionStorage.getItem('modelValue'))) {
        this.props.getModelandGeographyList();
    } else {
        this.props.getModelList();
    }
  }

  onModelChange = (e) => {
    const modelName = {}
    modelName.checkedList = e.target.value
    const geography = {}
    geography.checkedList = ''
    sessionStorage.setItem('modelValue', JSON.stringify(e.target.value));
    sessionStorage.removeItem('geographyValue');
    this.props.getGeographyList(e.target.value)
    this.setState({
        modelValue: e.target.value,
        modelName,
        geographyValue: '',
        message: 'Please Select Geography',
        geography
    })
}

onGeographyChange = (e) => {
    const { modelValue } = this.state
    const geography = {}
    geography.checkedList = e.target.value
    sessionStorage.setItem('geographyValue', JSON.stringify(e.target.value));
    this.setState({
        geographyValue: e.target.value,
        message: '',
        geography
    })
    
}

  setboxOption = (list, keyName, checkAllChange, onChange, multiSelect) => {

    const listOption = []
    list.forEach(function(value, key) {
        listOption.push(value[keyName])
    })
    if (multiSelect) {
        return (
            <Menu>
                {listOption.length > 0 ?
                    <div>
                        <div className="site-checkbox-all-wrapper">
                            <Checkbox
                                indeterminate={this.state[keyName].indeterminate}
                                onChange={checkAllChange}
                                checked={this.state[keyName].checkAll}
                                data_opt={listOption}
                            >
                            Select All
                            </Checkbox>
                        </div>
                        <CheckboxGroup
                            options={listOption}
                            value={this.state[keyName].checkedList}
                            onChange={onChange}
                        />
                    </div>
                    :
                    <Empty />
                }
                
            </Menu>
        );
    } else {
        return (
            <Menu>
                {listOption.length > 0 ?
                    <Radio.Group onChange={onChange} value={this.state[keyName].checkedList}>
                        {
                            listOption.map((option) =>
                                <Radio value={option} key={option}>{option}</Radio>
                            )
                        }
                    </Radio.Group>
                    :
                    <Empty />
                }
                
            </Menu>
        );
    }
    
}
    render() {

      const { ajaxCallsInProgress, modelList = [], geographyList = [], regionList } = this.props
        const {modelValue, geographyValue, message} = this.state
        const modelMenu = this.setboxOption(modelList, 'modelName', '', this.onModelChange, false)
        const geographyMenu = this.setboxOption(geographyList, 'geography', '', this.onGeographyChange, false)
        console.log('ggg', geographyList)
            return (
              <div className="container">
                <Header />
                  <div className="mainContent homeContent">
                    <div className="manageContainer homeContainer">
                    <div className="topSelection">
                            {
                                message && !geographyValue &&
                                <div className="messageContainer">
                                    {message}
                                </div>
                            }
                            <Dropdown overlay={modelMenu} trigger={['click']} overlayClassName='DropDownOverLay'>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    Model <Icon type="caret-down" theme="outlined" />
                                </a>
                            </Dropdown>
                            <Dropdown overlay={geographyMenu} trigger={['click']} overlayClassName='DropDownOverLay'>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    Geography <Icon type="caret-down" theme="outlined" />
                                </a>
                            </Dropdown>
                            </div>
                      <div className="btnContainer">
                      <div className="leftEle">
                        <Link to="/DataSnapshot">
                          <button className="home-button btn1"></button>
                        </Link>
                      </div>
                      <div className="leftEle">
                        <Link to="/MarketingROI">
                          <button className="home-button btn2"></button>
                        </Link>
                      </div>
                      <div className="leftEle">
                        <Link to="/simulator">
                          <button className="home-button btn3"></button>
                        </Link>
                      </div>
                      </div>
                    </div>
                  </div>
                <Footer />
              </div>
             
              
            )
          }

}

const mapStateToProps = (state) => {
  console.log('state', state)
    return {
        ajaxCallsInProgress: state.ajaxCallsInProgress,
        user: state.auth.user,
        currentMenu: state.auth.currentMenu,
        modelList: state.dataViewer.modelList,
        geographyList: state.dataViewer.geographyList,
    };
  }
  
  const mapDispatchToProps  = dispatch => bindActionCreators({
    setMenu,
    logOut,
    getModelList,
    getGeographyList,
    getModelandGeographyList,
  }, dispatch)
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home)
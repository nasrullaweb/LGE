import React, { Component } from 'react'
import { Select, Radio, Menu, Dropdown, Checkbox, Empty, Icon, Typography, Tabs, Layout } from 'antd';
import './DataViewer.less'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Header from '../common/Header.js';
import Footer from '../common/Footer.js';
import { setMenu } from '../../store/auth/actionCreator'
import Loading from '../common/Loading'
import { getModelList, getGeographyList, getRegionList, getAllData, clearData, getBrandList } from '../../store/dataViewer/actionCreator'
import MainTab from './MainTab'
import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Tab3 from './Tab3'
import {PageView, initGA} from '../common/Tracking';
import LefNav from '../common/LefNav.js';


const CheckboxGroup = Checkbox.Group;
const { Title } = Typography;
const { TabPane } = Tabs;
const { Sider } = Layout;

class DataViewer extends Component {

    state = {
        modelName: {
            checkedList: JSON.parse(sessionStorage.getItem('modelValue')) || '',
        },
        geography: {
            checkedList: JSON.parse(sessionStorage.getItem('geographyValue')) || '',
        },
        modelValue: JSON.parse(sessionStorage.getItem('modelValue')) || '',
        geographyValue: JSON.parse(sessionStorage.getItem('geographyValue')) || '',
        message: '',
        collapsed: true,
    }

    componentWillUnmount() {
        this.props.clearData()
      }

      onCollapse = collapsed => {
        this.setState({ collapsed });
      };

    componentDidMount() {
        this.props.clearData();
        this.props.setMenu('dataViewer');
        this.props.history.push('/DataSnapshot')
        initGA('UA-176821185-1', sessionStorage.getItem('user'));
      PageView();
        
        if (JSON.parse(sessionStorage.getItem('brandValue')) || JSON.parse(sessionStorage.getItem('brandValueTab1')) || JSON.parse(sessionStorage.getItem('brandValueTab2')) || JSON.parse(sessionStorage.getItem('brandValueTab3'))) {
            this.props.getAllData();
        } else if (JSON.parse(sessionStorage.getItem('geographyValue'))) {
            this.props.getBrandList(JSON.parse(sessionStorage.getItem('modelValue')), JSON.parse(sessionStorage.getItem('geographyValue')), 'LGE');
        }
    }

    // onModelChange = (e) => {
    //     const modelName = {}
    //     modelName.checkedList = e.target.value
    //     const geography = {}
    //     geography.checkedList = ''
    //     sessionStorage.setItem('modelValue', JSON.stringify(e.target.value));
    //     sessionStorage.removeItem('geographyValue');
    //     sessionStorage.removeItem('regionValue');
    //     sessionStorage.removeItem('brandValue');
    //     sessionStorage.removeItem('subBrandValue');
    //     sessionStorage.removeItem('var2Value');
    //     sessionStorage.removeItem('var1Value');
    //     this.props.getGeographyList(e.target.value)
    //     this.setState({
    //         modelValue: e.target.value,
    //         modelName,
    //         geographyValue: '',
    //         message: 'Please Select Geography',
    //         geography
    //     })
    // }

    // onGeographyChange = (e) => {
    //     const { modelValue } = this.state
    //     const geography = {}
    //     geography.checkedList = e.target.value
    //     sessionStorage.setItem('geographyValue', JSON.stringify(e.target.value));
    //     sessionStorage.removeItem('regionValue');
    //     sessionStorage.removeItem('brandValue');
    //     sessionStorage.removeItem('subBrandValue');
    //     sessionStorage.removeItem('var2Value');
    //     sessionStorage.removeItem('var1Value');
    //     this.props.getRegionList(modelValue, e.target.value)
    //     this.setState({
    //         geographyValue: e.target.value,
    //         message: '',
    //         geography
    //     })
        
    // }

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
                                    <Radio value={option}>{option}</Radio>
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
        const { ajaxCallsInProgress, modelList = [], geographyList = [], regionList, brandList } = this.props
        const {modelValue, geographyValue, message} = this.state
        //const modelMenu = this.setboxOption(modelList, 'modelName', '', this.onModelChange, false)
        //const geographyMenu = this.setboxOption(geographyList, 'geography', '', this.onGeographyChange, false)
        return (
            <div className="container dataViewer tabsDesign">
                {ajaxCallsInProgress > 0 && <Loading />}
                <Header modelTitle="DATA SNAPSHOT" />
                <Layout className="layout">
                <Sider collapsible collapsed={this.state.collapsed} className="layout-aside-nav" onCollapse={this.onCollapse} width="211" collapsedWidth="50">
                  <LefNav  />
                </Sider>
                <Layout className="site-layout">
                <div className="mainContent">
                    <div className="manageContainer">
                        <div className="simulateContent">
                            {/* <div className="topSelection">
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
                            </div> */}
                            {
                                modelValue && geographyValue && brandList.length > 0 &&
                                <div className="manageTable">
                                    <Tabs defaultActiveKey="1" onChange={this.activateTab}>
                                        <TabPane tab="KPI vs Tactic" key="main" type="card">
                                            <MainTab
                                                brandList = {brandList}
                                                modelValue = {modelValue}
                                                geographyValue = {geographyValue}
                                            />
                                        </TabPane>
                                        <TabPane tab="Brand Comparison" key="tab1" type="card">
                                            <Tab1
                                                brandList = {brandList}
                                                modelValue = {modelValue}
                                                geographyValue = {geographyValue}
                                            />
                                        </TabPane>
                                        <TabPane tab="Tactic Comparision" key="tab2" type="card">
                                            <Tab2
                                                brandList = {brandList}
                                                modelValue = {modelValue}
                                                geographyValue = {geographyValue}
                                            />
                                        </TabPane>
                                        <TabPane tab="Spends" key="tab3" type="card">
                                            <Tab3
                                                brandList = {brandList}
                                                modelValue = {modelValue}
                                                geographyValue = {geographyValue}
                                            />
                                        </TabPane>
                                    </Tabs>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <Footer />
                </Layout>
              </Layout>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ajaxCallsInProgress: state.DVajaxCallsInProgress,
        accessToken: state.auth.accessToken,
        modelList: state.dataViewer.modelList,
        geographyList: state.dataViewer.geographyList,
        regionList: state.dataViewer.regionList,
        brandList: state.dataViewer.brandList,
        
    };
  }
  
  const mapDispatchToProps  = dispatch => bindActionCreators({
    setMenu,
    getModelList,
    getGeographyList,
    getRegionList,
    getAllData,
    clearData,
    getBrandList,
  }, dispatch)
  
  export default connect(mapStateToProps, mapDispatchToProps)(DataViewer)

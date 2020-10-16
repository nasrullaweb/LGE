import React, { Component } from 'react'
import { Select, Radio, Menu, Dropdown, Checkbox, Empty, Icon, Typography, Tabs, Layout, Button } from 'antd';
import LefNav from '../common/LefNav.js';
import './ResultsViewer.less'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Header from '../common/Header.js';
import Footer from '../common/Footer.js';
import { setMenu } from '../../store/auth/actionCreator'
import Loading from '../common/Loading'
import { getModelList, getGeographyList, getRegionList, getTacticList, getTacticList1, getGraphData4, setGraphChange1, clearData,
    getAllData, getBrandList, getSubBrandList, getGraphData1, getGraphData21, getGraphData22, getGraphData23,
    getGraphData2, getGraphData3, setGraphChange, getRSquare, getGraphData5
} from '../../store/resultsViewer/actionCreator'
import MainTab1Charts from './MainTab1Charts'
import MainTab2Charts from './MainTab2Charts'
import MainTab4Charts from './MainTab4Charts'
import MainTab3Charts from './MainTab3Charts'
import MainTab5Charts from './MainTab5Charts'
import {PageView, initGA} from '../common/Tracking';
import ColoredScrollbars from '../common/ColoredScrollbars';


const CheckboxGroup = Checkbox.Group;
const { Title } = Typography;
const { TabPane } = Tabs;
const { Sider } = Layout;

class ResultsViewer extends Component {

    state = {
        modelName: {
            checkedList: '',
        },
        geography: {
            checkedList: '',
        },
        region: {
            checkedList: '',
        },
        brand: {
            checkedList: [],
            indeterminate: false,
            checkAll: false,
        },
        subBrand: {
            checkedList: [],
            indeterminate: false,
            checkAll: false,
        },
        tactic: {
            checkedList: '',
        },
        tactic1: {
            checkedList: [],
            indeterminate: false,
            checkAll: false,
        },
        modelValue: JSON.parse(sessionStorage.getItem('modelValue')) || '',
        geographyValue: JSON.parse(sessionStorage.getItem('geographyValue')) || '',
        regionValue: 'LGE',
        brandValue: JSON.parse(sessionStorage.getItem('RbrandValue')) || [],
        subBrandValue: JSON.parse(sessionStorage.getItem('RsubBrandValue')) || [],
        tacticValue: JSON.parse(sessionStorage.getItem('RtacticValue')) || '',
        tacticValue1: JSON.parse(sessionStorage.getItem('RtacticValue1')) || [],
        message: 'Please Select Channel',
        messageTac: 'Please Select Tactic',
        messageTac1: 'Please Select Tactic',
        collapsed: true,
        visible1: false,
        visible2: false,
        visible3: false,
        visible4: false,
    }

    handleMenuClick = (e) => {
        if (e.key === '3') {
          this.setState({ visible: false });
        }
      }
      handleVisible1Change = (flag) => {
        this.setState({ visible1: flag });
      }
      handleVisible2Change = (flag) => {
        this.setState({ visible2: flag });
      }
      handleVisible3Change = (flag) => {
        this.setState({ visible3: flag });
      }
      handleVisible4Change = (flag) => {
        this.setState({ visible4: flag });
      }

    onCollapse = collapsed => {
        this.setState({ collapsed });
      };


    static getDerivedStateFromProps(props, state) {

        let {region, brand, subBrand, modelName, geography, tactic, tactic1} = state

        // if (state.modelValue !== state.modelName.checkedList) {
        //     modelName = {
        //         checkedList: Array.isArray(state.modelValue) ? state.modelValue[0] : state.modelValue,
        //     }
        // }

        // if (state.geographyValue !== state.brand.checkedList) {
        //     geography = {
        //         checkedList: Array.isArray(state.geographyValue) ? state.geographyValue[0] : state.geographyValue,
        //     }
        // }
        
        // if (state.regionValue !== state.region.checkedList && props.regionList.length > 0) {
        //     region = {
        //         checkedList: Array.isArray(state.regionValue) ? state.regionValue[0] : state.regionValue,
        //     }
        // }

        if (state.brandValue !== state.brand.checkedList && props.brandList.length > 0) {
            brand = {
                checkedList: state.brandValue,
                    indeterminate: !!state.brandValue.length && state.brandValue.length < props.brandList.length,
                    checkAll: state.brandValue.length === props.brandList.length,
            }
        }

        if (state.subBrandValue !== state.subBrand.checkedList && props.subBrandList.length > 0) {
                subBrand = {
                    checkedList: state.subBrandValue,
                    indeterminate: !!state.subBrandValue.length && state.subBrandValue.length < props.subBrandList.length,
                    checkAll: state.subBrandValue.length === props.subBrandList.length,
                }
                //checkedList: Array.isArray(state.subBrandValue) ? state.subBrandValue[0] : state.subBrandValue,
            
        }

        if (state.tacticValue !== state.tactic.checkedList && props.tacticList && props.tacticList.length > 0) {
            tactic = {
                checkedList: Array.isArray(state.tacticValue) ? state.tacticValue[0] : state.tacticValue,
            }
        }

        if (state.tacticValue1 !== state.tactic1.checkedList && props.tacticList1 && props.tacticList1.length > 0) {
            tactic1 = {
                checkedList: state.tacticValue1,
                indeterminate: !!state.tacticValue1.length && state.tacticValue1.length < props.tacticList1.length,
                checkAll: state.tacticValue1.length === props.tacticList1.length,
            }
            //checkedList: Array.isArray(state.subBrandValue) ? state.subBrandValue[0] : state.subBrandValue,
        
    }

        return {
            region,
            brand,
            subBrand,
            modelName,
            geography,
            tactic,
            tactic1
        }
        
        //return { };
    }

    componentDidMount() {
        this.props.clearData();
        this.props.setMenu('resultsViewer');
        this.props.history.push('/MarketingROI')
        initGA('UA-176821185-1', sessionStorage.getItem('user'));
      PageView();
      sessionStorage.setItem('RregionValue', 'LGE');
        if (JSON.parse(sessionStorage.getItem('RbrandValue'))) {
            this.props.getAllData();
        } else if (JSON.parse(sessionStorage.getItem('geographyValue'))) {
            this.props.getBrandList(JSON.parse(sessionStorage.getItem('modelValue')), JSON.parse(sessionStorage.getItem('geographyValue')), 'LGE');
        }

        if (JSON.parse(sessionStorage.getItem('RsubBrandValue'))) {
            this.setState({ message: "" });
        } else if (JSON.parse(sessionStorage.getItem('RbrandValue'))) {
            this.setState({ message: "Please Select Type" });
        } 
        
        if (JSON.parse(sessionStorage.getItem('RtacticValue'))) {
            this.setState({ messageTac: "" });
        } 

        if (JSON.parse(sessionStorage.getItem('RtacticValue1'))) {
            this.setState({ messageTac1: "" });
        } 
    }

    // componentWillUnmount() {
    //     this.props.clearData()
    //   }

    // onModelChange = (e) => {
    //     const modelName = {}
    //     modelName.checkedList = e.target.value
    //     const geography = {}
    //     geography.checkedList = ''
    //     sessionStorage.setItem('RmodelValue', JSON.stringify(e.target.value));
    //     sessionStorage.removeItem('RgeographyValue');
    //     sessionStorage.removeItem('RregionValue');
    //     sessionStorage.removeItem('RbrandValue');
    //     sessionStorage.removeItem('RsubBrandValue');
    //     this.props.getGeographyList(e.target.value)
    //     this.setState({
    //         modelValue: e.target.value,
    //         modelName,
    //         geographyValue: '',
    //         geography,
    //         regionValue: '',
    //         brandValue: '',
    //         subBrandValue: '',
    //         tacticValue: '',
    //         message: 'Please Select Geography'
    //     })
    // }

    // onGeographyChange = (e) => {
    //     const { modelValue } = this.state
    //     const geography = {}
    //     geography.checkedList = e.target.value
    //     sessionStorage.setItem('RgeographyValue', JSON.stringify(e.target.value));
    //     sessionStorage.removeItem('RregionValue');
    //     sessionStorage.removeItem('RbrandValue');
    //     sessionStorage.removeItem('RsubBrandValue');
    //     this.props.getRegionList(modelValue, e.target.value)
    //     this.setState({
    //         geographyValue: e.target.value,
    //         geography,
    //         regionValue: '',
    //         brandValue: '',
    //         subBrandValue: '',
    //         tacticValue: '',
    //         message: 'Please Select Brand'
    //     })
    // }

    // onCheckAllRegionChange = e => {
    //     sessionStorage.setItem('RregionValue', JSON.stringify(e.target.checked ? e.target.data_opt : []));
    //     sessionStorage.removeItem('RbrandValue');
    //     sessionStorage.removeItem('RsubBrandValue');
    //     this.setState({
    //         regionValue: e.target.checked ? e.target.data_opt : [],
    //         brandValue: '',
    //         subBrandValue: [],
    //         tacticValue: '',
    //     }, () => {
    //         const { modelValue, geographyValue } = this.state
    //         const { regionValue } =this.state
    //         this.props.getBrandList(modelValue, geographyValue, regionValue)
    //     })
    // };

    // onRegionChange = (e) => {
    //     sessionStorage.setItem('RregionValue', JSON.stringify(e.target.value));
    //     sessionStorage.removeItem('RbrandValue');
    //     sessionStorage.removeItem('RsubBrandValue');
    //     this.setState({
    //         regionValue: e.target.value,
    //         brandValue: '',
    //         subBrandValue: '',
    //         tacticValue: '',
    //         message: 'Please Select Channel'
    //     }, () => {
    //         const { modelValue, geographyValue } = this.state
    //         const { regionValue } =this.state
    //         this.props.getBrandList(modelValue, geographyValue, regionValue)
    //     })
    // }

    onCheckAllBrandChange = e => {
        // sessionStorage.setItem('RbrandValue', JSON.stringify(e.target.checked ? e.target.data_opt : []));
        // sessionStorage.removeItem('RsubBrandValue');
        this.setState({
            brandValue: e.target.checked ? e.target.data_opt : [],
        })
    };

    handleBrandOkChange = () => {
        sessionStorage.setItem('RbrandValue', JSON.stringify(this.state.brandValue));
        sessionStorage.removeItem('RsubBrandValue');
        this.setState({
            subBrandValue: '',
            tacticValue: '',
            message: 'Please Select Type',
            visible1: false
        }, () => {
            const { modelValue, geographyValue } = this.state
            const { regionValue, brandValue } =this.state
            this.props.getSubBrandList(modelValue, geographyValue, regionValue, brandValue)
        })
    }

    onBrandChange = (value) => {
        // sessionStorage.setItem('RbrandValue', JSON.stringify(value));
        // sessionStorage.removeItem('RsubBrandValue');
        this.setState({
            brandValue: value,
        })
    }

    onCheckAllSubBrandChange = e => {
        //sessionStorage.setItem('RsubBrandValue', JSON.stringify(e.target.checked ? e.target.data_opt : []));
        this.setState({
            subBrandValue: e.target.checked ? e.target.data_opt : []
        })
    };

    handleSubBrandOkChange = () => {
        sessionStorage.setItem('RsubBrandValue', JSON.stringify(this.state.subBrandValue));
        sessionStorage.removeItem('RtacticValue');
        sessionStorage.removeItem('RtacticValue1');
        this.setState({
            tacticValue: '',
            tacticValue1: '',
            message: '',
            messageTac: 'Please Select Tactic',
            messageTac1: 'Please Select Tactic',
            visible2: false
        }, () => {
            const { modelValue, geographyValue } = this.state
            const { regionValue, brandValue, subBrandValue } =this.state
            this.props.setGraphChange()
            this.props.getGraphData1(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
            this.props.getRSquare(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
            this.props.getGraphData2(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
            this.props.getGraphData21(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
            this.props.getGraphData22(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
            this.props.getGraphData23(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
            this.props.getGraphData3(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
            this.props.getTacticList(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
            this.props.getTacticList1(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
        })
    }

    onSubBrandChange = (value) => {
        //sessionStorage.setItem('RsubBrandValue', JSON.stringify(value));
        this.setState({
            subBrandValue: value,
        })
    }

    onTacticChange = (e) => {
        sessionStorage.setItem('RtacticValue', JSON.stringify(e.target.value));
        this.setState({
            tacticValue: e.target.value,
            messageTac: '',
            visible3: false
        }, () => {
            const { modelValue, geographyValue } = this.state
            const { regionValue, brandValue, subBrandValue, tacticValue } =this.state
            this.props.setGraphChange1()
            this.props.getGraphData4(modelValue, geographyValue, regionValue, brandValue, subBrandValue, tacticValue)
        })
    }

    

    onCheckAllTactic1Change = e => {
        //sessionStorage.setItem('RtacticValue1', JSON.stringify(e.target.checked ? e.target.data_opt : []));
        this.setState({
            tacticValue1: e.target.checked ? e.target.data_opt : [],
            messageTac1: '',
        })
    };

    handleTactic1OkChange = () => {
        sessionStorage.setItem('RtacticValue1', JSON.stringify(this.state.tacticValue1));
        this.setState({
            messageTac1: '',
            visible4: false
        }, () => {
            const { modelValue, geographyValue } = this.state
            const { regionValue, brandValue, subBrandValue, tacticValue1 } =this.state
            this.props.setGraphChange1()
            this.props.getGraphData5(modelValue, geographyValue, regionValue, brandValue, subBrandValue, tacticValue1)
        })
    }

    onTactic1Change = (value) => {
        //sessionStorage.setItem('RtacticValue1', JSON.stringify(value));
        this.setState({
            tacticValue1: value,
        })
    }

    setboxOption = (list, keyName, checkAllChange, onChange, multiSelect, stateNane, okClick) => {

        const listOption = []
        list.forEach(function(value, key) {
            listOption.push(value[keyName])
        })
        if (multiSelect) {
            return (
                <Menu className="data_viewer">
                    {listOption.length > 0 ?
                        listOption.length > 4 ?
                            //<ColoredScrollbars style={{height: 150 }}>
                            <div>
                                <div className="site-checkbox-all-wrapper">
                                    <Checkbox
                                        indeterminate={this.state[stateNane].indeterminate}
                                        onChange={checkAllChange}
                                        checked={this.state[stateNane].checkAll}
                                        data_opt={listOption}
                                    >
                                    Select All
                                    </Checkbox>
                                </div>
                                <CheckboxGroup
                                    options={listOption}
                                    value={this.state[stateNane].checkedList}
                                    onChange={onChange}
                                />
                                <div className="checkOk">
                            <Button type="primary" htmlType="submit" className="login-form-button" onClick={okClick}>
                                Ok
                            </Button>
                            </div>
                            </div>
                            //</ColoredScrollbars>
                            :
                            <div>
                                <div className="site-checkbox-all-wrapper">
                                    <Checkbox
                                        indeterminate={this.state[stateNane].indeterminate}
                                        onChange={checkAllChange}
                                        checked={this.state[stateNane].checkAll}
                                        data_opt={listOption}
                                    >
                                    Select All
                                    </Checkbox>
                                </div>
                                <CheckboxGroup
                                    options={listOption}
                                    value={this.state[stateNane].checkedList}
                                    onChange={onChange}
                                />
                                <div className="checkOk">
                            <Button type="primary" htmlType="submit" className="login-form-button" onClick={okClick}>
                                Ok
                            </Button>
                            </div>
                            </div>
                        :
                        <Empty />
                    }
                </Menu>
            );
        } else {
            return (
                <Menu className="data_viewer">
                    
                    {listOption.length > 0 ?
                            listOption.length > 5 ? 
                            //<ColoredScrollbars style={{height: 150 }}>
                            <Radio.Group onChange={onChange} value={this.state[stateNane].checkedList}>
                            {
                                listOption.map((option) =>
                                    <Radio value={option} key={option}>{option}</Radio>
                                )
                            }
                            </Radio.Group>
                            //</ColoredScrollbars>
                            :
                            <Radio.Group onChange={onChange} value={this.state[stateNane].checkedList}>
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
        const { ajaxCallsInProgress, modelList = [], geographyList = [], regionList, brandList, subBrandList,
            setGraphData2, graphData2, setGraphData21, setGraphData3, graphData21, graphData22, graphData23, graphData3, setGraphData1, graphData1, tacticList = [], tacticList1 = [], RSquare= [], setGraphData4, graphData4, graphData5, setGraphData5 } = this.props
        const {modelValue, geographyValue, regionValue, brandValue, subBrandValue, tacticValue, tacticValue1, message, messageTac, messageTac1 } = this.state
        //const modelMenu = this.setboxOption(modelList, 'modelName', '', this.onModelChange, false)
        //const geographyMenu = this.setboxOption(geographyList, 'geography', '', this.onGeographyChange, false)
        //const regionMenu = this.setboxOption(regionList, 'region', '', this.onRegionChange, false, 'region')
        const brandMenu = this.setboxOption(brandList, 'brand', this.onCheckAllBrandChange, this.onBrandChange, true, 'brand', this.handleBrandOkChange)
        const subBrandMenu = this.setboxOption(subBrandList, 'subBrand', this.onCheckAllSubBrandChange, this.onSubBrandChange, true, 'subBrand', this.handleSubBrandOkChange)
        const tacticMenu = this.setboxOption(tacticList, 'tactic', '', this.onTacticChange, false, 'tactic')
        const tacticMenu1 = this.setboxOption(tacticList1, 'tactic', this.onCheckAllTactic1Change, this.onTactic1Change, true, 'tactic1', this.handleTactic1OkChange)
        return (
            <div className="container dataViewer tabsDesign resultView">
                {ajaxCallsInProgress > 0 && <Loading />}
                <Header modelTitle="MARKETING ROI" />
                <Layout className="layout">
                <Sider collapsible collapsed={this.state.collapsed} className="layout-aside-nav" onCollapse={this.onCollapse} width="211" collapsedWidth="50">
                  <LefNav  />
                </Sider>
                <Layout className="site-layout">
                <div className="mainContent">
                    <div className="manageContainer">
                        <div className="simulateContent">
                            <div className="topSelection">
                            
                            {/* <Dropdown overlay={modelMenu} trigger={['click']} overlayClassName='DropDownOverLay'>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    Model <Icon type="caret-down" theme="outlined" />
                                </a>
                            </Dropdown>
                            <Dropdown overlay={geographyMenu} trigger={['click']} overlayClassName='DropDownOverLay'>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    Geography <Icon type="caret-down" theme="outlined" />
                                </a>
                            </Dropdown> */}
                            {/* <Dropdown overlay={regionMenu} trigger={['click']} overlayClassName='DropDownOverLay'>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    Brand <Icon type="caret-down" theme="outlined" />
                                </a>
                            </Dropdown> */}
                            <Dropdown overlay={brandMenu} trigger={['click']} overlayClassName='DropDownOverLay' onVisibleChange={this.handleVisible1Change}
        visible={this.state.visible1}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    Channel <Icon type="caret-down" theme="outlined" />
                                </a>
                            </Dropdown>
                            <Dropdown overlay={subBrandMenu} trigger={['click']} overlayClassName='DropDownOverLay' onVisibleChange={this.handleVisible2Change}
        visible={this.state.visible2}>
                                <a className="ant-dropdown-link noMarginRight" onClick={e => e.preventDefault()}>
                                    Type <Icon type="caret-down" theme="outlined" />
                                </a>
                            </Dropdown>
                            {
                                message &&
                                <div className="messageContainer">
                                    {message}
                                </div>
                            }
                            </div>
                            {
                                subBrandValue.length > 0 &&
                                <div className="manageTable resultViewer">
                                    <Tabs defaultActiveKey="1" onChange={this.activateTab}>
                                        <TabPane tab="Model Statistics" key="tab1" type="card">
                                        <div className="tabContent">
                                        <div className="graphContent">
                                        {geographyValue &&
                                            <div className="FilterSelection">
                                                {geographyValue &&
                                                    <span>
                                                        Geography: {geographyValue}
                                                    </span>
                                                }
                                                {/* {regionValue &&
                                                    <span>
                                                        <span className="pipe">||</span>
                                                        Brand: {regionValue}
                                                    </span>
                                                } */}
                                                {brandValue.length > 0 &&
                                                    <span>
                                                        <span className="pipe">||</span>
                                                        Channel: {
                                                            brandValue.map((item, index) =>
                                                                index === brandValue.length-1 ?
                                                                `${item} `
                                                                :
                                                                `${item}, `
                                                            )
                                                            }
                                                    </span>
                                                }
                                                {subBrandValue.length > 0 &&
                                                    <span>
                                                        <span className="pipe">||</span>
                                                        Type:  {
                                                            subBrandValue.map((item, index) =>
                                                                index === subBrandValue.length-1 ?
                                                                `${item} `
                                                                :
                                                                `${item}, `
                                                            )
                                                            }
                                                    </span>
                                                }
                                            </div>
                                        }
                                        <div className="chartContent">
                                        <ColoredScrollbars>
                                        {
                                            graphData2.series && setGraphData2 &&
                                            <MainTab1Charts 
                                                graphData2={graphData2}
                                                subBrandValue={subBrandValue}
                                                RSquare={RSquare}  />
                                        }
                                        </ColoredScrollbars>
                                        </div>
                                        </div>
                                        </div>
                                        </TabPane>
                                        <TabPane tab="Contributions" key="tab2" type="card">
                                        <div className="tabContent">
                                        <div className="graphContent">
                                        {geographyValue &&
                                            <div className="FilterSelection">
                                                {geographyValue &&
                                                    <span>
                                                        Geography: {geographyValue}
                                                    </span>
                                                }
                                                {/* {regionValue &&
                                                    <span>
                                                        <span className="pipe">||</span>
                                                        Brand: {regionValue}
                                                    </span>
                                                } */}
                                                {brandValue.length > 0 &&
                                                    <span>
                                                        <span className="pipe">||</span>
                                                        Channel: {
                                                            brandValue.map((item, index) =>
                                                                index === brandValue.length-1 ?
                                                                `${item} `
                                                                :
                                                                `${item}, `
                                                            )
                                                            }
                                                    </span>
                                                }
                                                 {subBrandValue.length > 0 &&
                                                    <span>
                                                        <span className="pipe">||</span>
                                                        Type:  {
                                                            subBrandValue.map((item, index) =>
                                                                index === subBrandValue.length-1 ?
                                                                `${item} `
                                                                :
                                                                `${item}, `
                                                            )
                                                            }
                                                    </span>
                                                }
                                            </div>
                                        }
                                        <div className="chartContent">
                                        <ColoredScrollbars>
                                        {
                                            graphData1.series && setGraphData1 && graphData21.series && graphData22 &&
                                            <MainTab2Charts 
                                                graphData1={graphData1}
                                                subBrandValue={subBrandValue}
                                                graphData21={graphData21}
                                                graphData22={graphData22}
                                                graphData23={graphData23}
                                                  />
                                        }
                                        </ColoredScrollbars>
                                        </div>
                                        </div>
                                        </div>
                                        </TabPane>
                                        <TabPane tab="Due - to's" key="tab3" type="card">
                                        <div className="tabContent">
                                        <div className="graphContent">
                                        {geographyValue &&
                                            <div className="FilterSelection">
                                                {geographyValue &&
                                                    <span>
                                                        Geography: {geographyValue}
                                                    </span>
                                                }
                                                {/* {regionValue &&
                                                    <span>
                                                        <span className="pipe">||</span>
                                                        Brand: {regionValue}
                                                    </span>
                                                } */}
                                                {brandValue.length > 0 &&
                                                    <span>
                                                        <span className="pipe">||</span>
                                                        Channel: {
                                                            brandValue.map((item, index) =>
                                                                index === brandValue.length-1 ?
                                                                `${item} `
                                                                :
                                                                `${item}, `
                                                            )
                                                            }
                                                    </span>
                                                }
                                                 {subBrandValue.length > 0 &&
                                                    <span>
                                                        <span className="pipe">||</span>
                                                        Type:  {
                                                            subBrandValue.map((item, index) =>
                                                                index === subBrandValue.length-1 ?
                                                                `${item} `
                                                                :
                                                                `${item}, `
                                                            )
                                                            }
                                                    </span>
                                                }
                                            </div>
                                        }
                                        <div className="chartContent">
                                        <ColoredScrollbars>
                                        {
                                            graphData3.series1 && setGraphData3 &&
                                            <MainTab3Charts 
                                                graphData3={graphData3}
                                                subBrandValue={subBrandValue}
                                                  />
                                        }
                                        </ColoredScrollbars>
                                        </div>
                                        </div>
                                        </div>
                                        </TabPane>
                                        <TabPane tab="Response Curve" key="tab4" type="card">
                                            {
                                                tacticList.length > 0 &&
                                                <div className="tabContent">
                                                    <div className="tabHeader withAbsolut">
                                                    {
                                                        messageTac && !tacticValue &&
                                                        <div className="messageContainer">
                                                            {messageTac}
                                                        </div>
                                                    }
                                                        <Dropdown overlay={tacticMenu} trigger={['click']} overlayClassName='DropDownOverLay'onVisibleChange={this.handleVisible3Change}
        visible={this.state.visible3}>
                                                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                                                Tactic <Icon type="caret-down" theme="outlined" />
                                                            </a>
                                                        </Dropdown>
                                                    </div>
                                                    <div className="graphContent">
                                                    {geographyValue &&
                                                        <div className="FilterSelection">
                                                            {geographyValue &&
                                                                <span>
                                                                    Geography: {geographyValue}
                                                                </span>
                                                            }
                                                            {/* {regionValue &&
                                                                <span>
                                                                    <span className="pipe">||</span>
                                                                    Brand: {regionValue}
                                                                </span>
                                                            } */}
                                                            {brandValue.length > 0 &&
                                                                <span>
                                                                    <span className="pipe">||</span>
                                                                    Channel: {
                                                                        brandValue.map((item, index) =>
                                                                            index === brandValue.length-1 ?
                                                                            `${item} `
                                                                            :
                                                                            `${item}, `
                                                                        )
                                                                        }
                                                                </span>
                                                            }
                                                             {subBrandValue.length > 0 &&
                                                                <span>
                                                                    <span className="pipe">||</span>
                                                                    Type:  {
                                                                        subBrandValue.map((item, index) =>
                                                                            index === subBrandValue.length-1 ?
                                                                            `${item} `
                                                                            :
                                                                            `${item}, `
                                                                        )
                                                                        }
                                                                </span>
                                                            }
                                                            {/* {tacticValue &&
                                                                <span>
                                                                    Tactic: {tacticValue}
                                                                </span>
                                                            } */}

                                                            
                                                        </div>
                                                    }
                                                    <div className="chartContent">
                                                    <ColoredScrollbars>
                                                    {
                                                        graphData4.series && setGraphData4 &&
                                                        <MainTab4Charts 
                                                            graphData4={graphData4}
                                                            subBrandValue={subBrandValue}
                                                            tacticValue={tacticValue} />
                                                    }
                                                    
                                                    </ColoredScrollbars>
                                                    </div>
                                                    </div>
                                                </div>
                                            }
                                        </TabPane>
                                        <TabPane tab="Synergy Effect" key="tab5" type="card">
                                            {
                                                tacticList1.length > 0 &&
                                                <div className="tabContent">
                                                    <div className="tabHeader withAbsolut">
                                                    {
                                                        messageTac1 &&
                                                        <div className="messageContainer">
                                                            {messageTac1}
                                                        </div>
                                                    }
                                                        <Dropdown overlay={tacticMenu1} trigger={['click']} overlayClassName='DropDownOverLay' onVisibleChange={this.handleVisible4Change}
        visible={this.state.visible4}>
                                                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                                                Tactic <Icon type="caret-down" theme="outlined" />
                                                            </a>
                                                        </Dropdown>
                                                    </div>
                                                    <div className="graphContent">
                                                    {geographyValue &&
                                                        <div className="FilterSelection">
                                                            {geographyValue &&
                                                                <span>
                                                                    Geography: {geographyValue}
                                                                </span>
                                                            }
                                                            {/* {regionValue &&
                                                                <span>
                                                                    <span className="pipe">||</span>
                                                                    Brand: {regionValue}
                                                                </span>
                                                            } */}
                                                            {brandValue.length > 0 &&
                                                                <span>
                                                                    <span className="pipe">||</span>
                                                                    Channel: {
                                                                        brandValue.map((item, index) =>
                                                                            index === brandValue.length-1 ?
                                                                            `${item} `
                                                                            :
                                                                            `${item}, `
                                                                        )
                                                                        }
                                                                </span>
                                                            }
                                                             {subBrandValue.length > 0 &&
                                                                <span>
                                                                    <span className="pipe">||</span>
                                                                    Type:  {
                                                                        subBrandValue.map((item, index) =>
                                                                            index === subBrandValue.length-1 ?
                                                                            `${item} `
                                                                            :
                                                                            `${item}, `
                                                                        )
                                                                        }
                                                                </span>
                                                            }
                                                            {/* {tacticValue &&
                                                                <span>
                                                                    Tactic: {tacticValue}
                                                                </span>
                                                            } */}

                                                            
                                                        </div>
                                                    }
                                                    <div className="chartContent">
                                                    <ColoredScrollbars>
                                                    {
                                                        graphData5.series && setGraphData5 &&
                                                        <MainTab5Charts 
                                                            graphData5={graphData5}
                                                            subBrandValue={subBrandValue}
                                                            tacticValue={tacticValue1} />
                                                    }
                                                    
                                                    </ColoredScrollbars>
                                                    </div>
                                                    </div>
                                                </div>
                                            }
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
        ajaxCallsInProgress: state.RVajaxCallsInProgress,
        accessToken: state.auth.accessToken,
        modelList: state.resultsViewer.modelList,
        geographyList: state.resultsViewer.geographyList,
        regionList: state.resultsViewer.regionList,
        brandList: state.resultsViewer.brandList,
        subBrandList: state.resultsViewer.subBrandList,
        tacticList: state.resultsViewer.tacticList || [],
        tacticList1: state.resultsViewer.tacticList1 || [],
        graphData1: state.resultsViewer.graphData1,
        graphData2: state.resultsViewer.graphData2,
        graphData21: state.resultsViewer.graphData21,
        graphData22: state.resultsViewer.graphData22,
        graphData23: state.resultsViewer.graphData23,
        graphData3: state.resultsViewer.graphData3,
        graphData4: state.resultsViewer.graphData4,
        graphData5: state.resultsViewer.graphData5,
        setGraphData1: state.resultsViewer.setGraphData1,
        setGraphData2: state.resultsViewer.setGraphData2,
        setGraphData21: state.resultsViewer.setGraphData21,
        setGraphData3: state.resultsViewer.setGraphData3,
        setGraphData4: state.resultsViewer.setGraphData4,
        setGraphData5: state.resultsViewer.setGraphData5,
        RSquare: state.resultsViewer.RSquare
    };
  }
  
  const mapDispatchToProps  = dispatch => bindActionCreators({
    setMenu,
    getModelList,
    getGeographyList,
    getRegionList,
    getAllData,
    getBrandList,
    getSubBrandList,
    getGraphData1,
    getGraphData2,
    getGraphData21,
    getGraphData22,
    getGraphData23,
    getGraphData3,
    setGraphChange,
    getTacticList,
    getTacticList1,
    getGraphData4,
    getGraphData5,
    setGraphChange1,
    clearData,
    getRSquare,
  }, dispatch)
  
  export default connect(mapStateToProps, mapDispatchToProps)(ResultsViewer)

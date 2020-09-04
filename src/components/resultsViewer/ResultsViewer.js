import React, { Component } from 'react'
import { Select, Radio, Menu, Dropdown, Checkbox, Empty, Icon, Typography, Tabs, Layout } from 'antd';
import LefNav from '../common/LefNav.js';
import './ResultsViewer.less'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Header from '../common/Header.js';
import Footer from '../common/Footer.js';
import { setMenu } from '../../store/auth/actionCreator'
import Loading from '../common/Loading'
import { getModelList, getGeographyList, getRegionList, getTacticList, getGraphData4, setGraphChange1, clearData,
    getAllData, getBrandList, getSubBrandList, getGraphData1, getGraphData21, getGraphData22,
    getGraphData2, getGraphData3, setGraphChange, getRSquare
} from '../../store/resultsViewer/actionCreator'
import MainTab1Charts from './MainTab1Charts'
import MainTab2Charts from './MainTab2Charts'
import MainTab4Charts from './MainTab4Charts'
import MainTab3Charts from './MainTab3Charts'
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
            checkedList: '',
        },
        subBrand: {
            checkedList: '',
        },
        tactic: {
            checkedList: '',
        },
        modelValue: JSON.parse(sessionStorage.getItem('modelValue')) || '',
        geographyValue: JSON.parse(sessionStorage.getItem('geographyValue')) || '',
        regionValue: JSON.parse(sessionStorage.getItem('RregionValue')) || '',
        brandValue: JSON.parse(sessionStorage.getItem('RbrandValue')) || '',
        subBrandValue: JSON.parse(sessionStorage.getItem('RsubBrandValue')) || '',
        tacticValue: JSON.parse(sessionStorage.getItem('RtacticValue')) || '',
        message: 'Please Select Brand',
        messageTac: 'Please Select Tactic',
        collapsed: true,
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
      };


    static getDerivedStateFromProps(props, state) {

        let {region, brand, subBrand, modelName, geography, tactic} = state

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
        
        if (state.regionValue !== state.region.checkedList && props.regionList.length > 0) {
            region = {
                checkedList: Array.isArray(state.regionValue) ? state.regionValue[0] : state.regionValue,
            }
        }

        if (state.brandValue !== state.brand.checkedList) {
            brand = {
                checkedList: Array.isArray(state.brandValue) ? state.brandValue[0] : state.brandValue,
            }
        }

        if (state.subBrandValue !== state.subBrand.checkedList && props.subBrandList.length > 0) {
            subBrand = {
                checkedList: Array.isArray(state.subBrandValue) ? state.subBrandValue[0] : state.subBrandValue,
            }
        }

        if (state.tacticValue !== state.tactic.checkedList && props.tacticList && props.tacticList.length > 0) {
            tactic = {
                checkedList: Array.isArray(state.tacticValue) ? state.tacticValue[0] : state.tacticValue,
            }
        }

        return {
            region,
            brand,
            subBrand,
            modelName,
            geography,
            tactic
        }
        
        //return { };
    }

    componentDidMount() {
        this.props.clearData();
        this.props.setMenu('resultsViewer');
        this.props.history.push('/MarketingROI')
        initGA('UA-176821185-1', sessionStorage.getItem('user'));
      PageView();
        
        if (JSON.parse(sessionStorage.getItem('RregionValue'))) {
            console.log('test')
            this.props.getAllData();
        } else if (JSON.parse(sessionStorage.getItem('geographyValue'))) {
            this.props.getRegionList(JSON.parse(sessionStorage.getItem('modelValue')), JSON.parse(sessionStorage.getItem('geographyValue')));
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

    onRegionChange = (e) => {
        sessionStorage.setItem('RregionValue', JSON.stringify(e.target.value));
        sessionStorage.removeItem('RbrandValue');
        sessionStorage.removeItem('RsubBrandValue');
        this.setState({
            regionValue: e.target.value,
            brandValue: '',
            subBrandValue: '',
            tacticValue: '',
            message: 'Please Select Channel'
        }, () => {
            const { modelValue, geographyValue } = this.state
            const { regionValue } =this.state
            this.props.getBrandList(modelValue, geographyValue, regionValue)
        })
    }

    onBrandChange = (e) => {
        sessionStorage.setItem('RbrandValue', JSON.stringify(e.target.value));
        sessionStorage.removeItem('RsubBrandValue');
        this.setState({
            brandValue: e.target.value,
            subBrandValue: '',
            tacticValue: '',
            message: 'Please Select Type'
        }, () => {
            const { modelValue, geographyValue } = this.state
            const { regionValue, brandValue } =this.state
            this.props.getSubBrandList(modelValue, geographyValue, regionValue, brandValue)
        })
    }

    // onCheckAllSubBrandChange = e => {
    //     sessionStorage.setItem('RsubBrandValue', JSON.stringify(e.target.checked ? e.target.data_opt : []));
    //     this.setState({
    //         subBrandValue: e.target.checked ? e.target.data_opt : [],
    //         tacticValue: '',
    //     }, () => {
    //         const { modelValue, geographyValue } = this.state
    //         const { regionValue, brandValue, subBrandValue } =this.state
    //         this.props.setGraphChange()
    //         this.props.getGraphData1(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
    //         this.props.getRSquare(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
    //         this.props.getGraphData2(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
    //         this.props.getGraphData3(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
    //         this.props.getTacticList(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
    //     })
    // };

    onSubBrandChange = (e) => {
        sessionStorage.setItem('RsubBrandValue', JSON.stringify(e.target.value));
        this.setState({
            subBrandValue: e.target.value,
            tacticValue: '',
            message: '',
        }, () => {
            const { modelValue, geographyValue } = this.state
            const { regionValue, brandValue, subBrandValue } =this.state
            this.props.setGraphChange()
            this.props.getGraphData1(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
            this.props.getRSquare(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
            this.props.getGraphData2(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
            this.props.getGraphData21(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
            this.props.getGraphData22(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
            this.props.getGraphData3(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
            this.props.getTacticList(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
        })
    }

    onTacticChange = (e) => {
        sessionStorage.setItem('RtacticValue', JSON.stringify(e.target.value));
        this.setState({
            tacticValue: e.target.value,
            messageTac: '',
        }, () => {
            const { modelValue, geographyValue } = this.state
            const { regionValue, brandValue, subBrandValue, tacticValue } =this.state
            this.props.setGraphChange1()
            this.props.getGraphData4(modelValue, geographyValue, regionValue, brandValue, subBrandValue, tacticValue)
        })
    }

    setboxOption = (list, keyName, checkAllChange, onChange, multiSelect, stateNane) => {

        const listOption = []
        list.forEach(function(value, key) {
            listOption.push(value[keyName])
        })
        if (multiSelect) {
            return (
                <Menu className="data_viewer">
                    {listOption.length > 0 ?
                        listOption.length > 4 ?
                            <ColoredScrollbars style={{height: 150 }}>
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
                            </div>
                            </ColoredScrollbars>
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
                            <ColoredScrollbars style={{height: 150 }}>
                            <Radio.Group onChange={onChange} value={this.state[stateNane].checkedList}>
                            {
                                listOption.map((option) =>
                                    <Radio value={option} key={option}>{option}</Radio>
                                )
                            }
                            </Radio.Group>
                            </ColoredScrollbars>
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
            setGraphData2, graphData2, setGraphData21, setGraphData3, graphData21, graphData22, graphData3, setGraphData1, graphData1, tacticList = [], RSquare= [], setGraphData4, graphData4 } = this.props
        const {modelValue, geographyValue, regionValue, brandValue, subBrandValue, tacticValue, message, messageTac } = this.state
        //const modelMenu = this.setboxOption(modelList, 'modelName', '', this.onModelChange, false)
        //const geographyMenu = this.setboxOption(geographyList, 'geography', '', this.onGeographyChange, false)
        const regionMenu = this.setboxOption(regionList, 'region', '', this.onRegionChange, false, 'region')
        const brandMenu = this.setboxOption(brandList, 'brand', '', this.onBrandChange, false, 'brand')
        const subBrandMenu = this.setboxOption(subBrandList, 'subBrand', '', this.onSubBrandChange, false, 'subBrand')
        const tacticMenu = this.setboxOption(tacticList, 'tactic', '', this.onTacticChange, false, 'tactic')
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
                            <Dropdown overlay={regionMenu} trigger={['click']} overlayClassName='DropDownOverLay'>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    Brand <Icon type="caret-down" theme="outlined" />
                                </a>
                            </Dropdown>
                            <Dropdown overlay={brandMenu} trigger={['click']} overlayClassName='DropDownOverLay'>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    Channel <Icon type="caret-down" theme="outlined" />
                                </a>
                            </Dropdown>
                            <Dropdown overlay={subBrandMenu} trigger={['click']} overlayClassName='DropDownOverLay'>
                                <a className="ant-dropdown-link noMarginRight" onClick={e => e.preventDefault()}>
                                    Type <Icon type="caret-down" theme="outlined" />
                                </a>
                            </Dropdown>
                            {
                                message && !subBrandValue &&
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
                                                {regionValue &&
                                                    <span>
                                                        <span className="pipe">||</span>
                                                        Brand: {regionValue}
                                                    </span>
                                                }
                                                {brandValue &&
                                                    <span>
                                                        <span className="pipe">||</span>
                                                        Channel: {brandValue}
                                                    </span>
                                                }
                                                {subBrandValue &&
                                                    <span>
                                                        <span className="pipe">||</span>
                                                        Type: {subBrandValue}
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
                                                {regionValue &&
                                                    <span>
                                                        <span className="pipe">||</span>
                                                        Brand: {regionValue}
                                                    </span>
                                                }
                                                {brandValue &&
                                                    <span>
                                                        <span className="pipe">||</span>
                                                        Channel: {brandValue}
                                                    </span>
                                                }
                                                {subBrandValue &&
                                                    <span>
                                                        <span className="pipe">||</span>
                                                        Type: {subBrandValue}
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
                                                {regionValue &&
                                                    <span>
                                                        <span className="pipe">||</span>
                                                        Brand: {regionValue}
                                                    </span>
                                                }
                                                {brandValue &&
                                                    <span>
                                                        <span className="pipe">||</span>
                                                        Channel: {brandValue}
                                                    </span>
                                                }
                                                {subBrandValue &&
                                                    <span>
                                                        <span className="pipe">||</span>
                                                        Type: {subBrandValue}
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
                                                        <Dropdown overlay={tacticMenu} trigger={['click']} overlayClassName='DropDownOverLay'>
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
                                                            {regionValue &&
                                                                <span>
                                                                    <span className="pipe">||</span>
                                                                    Brand: {regionValue}
                                                                </span>
                                                            }
                                                            {brandValue &&
                                                                <span>
                                                                    <span className="pipe">||</span>
                                                                    Channel: {brandValue}
                                                                </span>
                                                            }
                                                            {subBrandValue &&
                                                                <span>
                                                                    <span className="pipe">||</span>
                                                                    Type: {subBrandValue}
                                                                </span>
                                                            }
                                                            {/* {tacticValue &&
                                                                <span>
                                                                    Tactic: {tacticValue}
                                                                </span>
                                                            } */}

                                                            <p>Response curves are at overall level and will be the same across all models.</p>
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
        graphData1: state.resultsViewer.graphData1,
        graphData2: state.resultsViewer.graphData2,
        graphData21: state.resultsViewer.graphData21,
        graphData22: state.resultsViewer.graphData22,
        graphData3: state.resultsViewer.graphData3,
        graphData4: state.resultsViewer.graphData4,
        setGraphData1: state.resultsViewer.setGraphData1,
        setGraphData2: state.resultsViewer.setGraphData2,
        setGraphData21: state.resultsViewer.setGraphData21,
        setGraphData3: state.resultsViewer.setGraphData3,
        setGraphData4: state.resultsViewer.setGraphData4,
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
    getGraphData3,
    setGraphChange,
    getTacticList,
    getGraphData4,
    setGraphChange1,
    clearData,
    getRSquare,
  }, dispatch)
  
  export default connect(mapStateToProps, mapDispatchToProps)(ResultsViewer)

import React, { Component } from 'react'
import { Select, Radio, Menu, Dropdown, Checkbox, Empty, Icon, Typography, Tabs } from 'antd';
import './DataViewer.less'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getBrandList3, getSubBrandList3, getGraphData3, setGraphChange3, getGraphData31, getGraphData32 } from '../../store/dataViewer/actionCreator'
import MainTab3Charts from './MainTab3Charts'
import ColoredScrollbars from '../common/ColoredScrollbars';

const CheckboxGroup = Checkbox.Group;

class Tab3 extends Component {

    state = {
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
        regionValue: 'LGE',
        brandValue: JSON.parse(sessionStorage.getItem('brandValueTab3')) || [],
        subBrandValue: JSON.parse(sessionStorage.getItem('subBrandValueTab3')) || [],
        dataChanged: true,
        message: 'Please Select Channel'
    }

    componentDidMount() {
        
        sessionStorage.setItem('regionValueTab3', 'LGE')
        if (JSON.parse(sessionStorage.getItem('subBrandValueTab3'))) {
            this.setState({ message: "" });
        } else if (JSON.parse(sessionStorage.getItem('brandValueTab3'))) {
            this.setState({ message: "Please Select Type" });
        } 
    }

    static getDerivedStateFromProps(props, state) {

        let {region, brand, subBrand } = state
        
        // if (state.regionValue !== state.region.checkedList) {
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
        }

        return {
            region,
            brand,
            subBrand
        }
        
        //return { };
      }

    // onCheckAllRegionChange = e => {
    //     sessionStorage.setItem('regionValueTab3', JSON.stringify(e.target.checked ? e.target.data_opt : []));
    //     sessionStorage.removeItem('brandValueTab3');
    //     sessionStorage.removeItem('subBrandValueTab3');
    //     this.setState({
    //         regionValue: e.target.checked ? e.target.data_opt : [],
    //         brandValue: [],
    //         subBrandValue: [],
    //         message: 'Please Select Channel'
    //     }, () => {
    //         const { modelValue, geographyValue } = this.props
    //         const { regionValue } =this.state
    //         this.props.getBrandList3(modelValue, geographyValue, regionValue)
    //     })
    // };

    // onRegionChange = (e) => {
    //     sessionStorage.setItem('regionValueTab3', JSON.stringify(e.target.value));
    //     sessionStorage.removeItem('brandValueTab3');
    //     sessionStorage.removeItem('subBrandValueTab3');
    //     this.setState({
    //         regionValue: e.target.value,
    //         brandValue: [],
    //         subBrandValue: [],
    //         message: 'Please Select Channel'
    //     }, () => {
    //         const { modelValue, geographyValue } = this.props
    //         const { regionValue } =this.state
    //         this.props.getBrandList3(modelValue, geographyValue, regionValue)
    //     })
    // }

    onCheckAllBrandChange = e => {
        sessionStorage.setItem('brandValueTab3', JSON.stringify(e.target.checked ? e.target.data_opt : []));
        sessionStorage.removeItem('subBrandValueTab3');
        this.setState({
            brandValue: e.target.checked ? e.target.data_opt : [],
            subBrandValue: [],
            message: 'Please Select Type'
        }, () => {
            const { modelValue, geographyValue } = this.props
            const { regionValue, brandValue } =this.state
            this.props.getSubBrandList3(modelValue, geographyValue, regionValue, brandValue)
        })
    };

    onBrandChange = (value) => {
        sessionStorage.setItem('brandValueTab3', JSON.stringify(value));
        sessionStorage.removeItem('subBrandValueTab3');
        this.setState({
            brandValue: value,
            subBrandValue: [],
            message: 'Please Select Type'
        }, () => {
            const { modelValue, geographyValue } = this.props
            const { regionValue, brandValue } =this.state
            this.props.getSubBrandList3(modelValue, geographyValue, regionValue, brandValue)
        })
    }

    onCheckAllSubBrandChange = e => {
        const self = this
        sessionStorage.setItem('subBrandValueTab3', JSON.stringify(e.target.checked ? e.target.data_opt : []));
        this.setState({
            subBrandValue: e.target.checked ? e.target.data_opt : [],
            message: ''
        }, () => {
            const { modelValue, geographyValue } = this.props
            const { regionValue, brandValue, subBrandValue } =this.state
            this.props.setGraphChange3()
            this.props.getGraphData3(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
            this.props.getGraphData31(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
            this.props.getGraphData32(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
            setTimeout(function(){
                self.setState({
                dataChanged: true,
                message: ''
            })}, 1000)
        })
    };

    onSubBrandChange = (value) => {
        const self = this
        sessionStorage.setItem('subBrandValueTab3', JSON.stringify(value));
        this.setState({
            subBrandValue: value,
            message: ''
        }, () => {
            const { modelValue, geographyValue } = this.props
            const { regionValue, brandValue, subBrandValue } =this.state
            this.props.setGraphChange3()
            this.props.getGraphData3(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
            this.props.getGraphData31(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
            this.props.getGraphData32(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
            setTimeout(function(){
                self.setState({
                dataChanged: true,
                message: ''
            })}, 1000)
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
        const { regionList, brandList, subBrandList, graphData3, graphData31, graphData32, geographyValue } = this.props
        const {regionValue, brandValue, subBrandValue, message } = this.state
        //const regionMenu = this.setboxOption(regionList, 'region', '', this.onRegionChange, false, 'region')
        const brandMenu = this.setboxOption(brandList, 'brand', this.onCheckAllBrandChange, this.onBrandChange, true, 'brand')
        const subBrandMenu = this.setboxOption(subBrandList, 'subBrand', this.onCheckAllSubBrandChange, this.onSubBrandChange, true, 'subBrand')
        return (
            <div className="tabContent">
                <div className="tabHeader">
                {
                    message &&
                    <div className="messageContainer">
                        {message}
                    </div>
                }
                    {/* <Dropdown overlay={regionMenu} trigger={['click']} overlayClassName='DropDownOverLay'>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Brand <Icon type="caret-down" theme="outlined" />
                        </a>
                    </Dropdown> */}
                    <Dropdown overlay={brandMenu} trigger={['click']} overlayClassName='DropDownOverLay'>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Channel <Icon type="caret-down" theme="outlined" />
                        </a>
                    </Dropdown>
                    <Dropdown overlay={subBrandMenu} trigger={['click']} overlayClassName='DropDownOverLay'>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Type <Icon type="caret-down" theme="outlined" />
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
                            Brand: {
                            regionValue}
                        </span>
                    }
                    {brandValue.length > 0 &&
                        <span>
                            <span className="pipe">||</span>
                            Channel: {brandValue}
                        </span>
                    }
                    {subBrandValue.length > 0 &&
                        <span>
                            <span className="pipe">||</span>
                            Type: {
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
                        this.props.setGraphData3 && graphData3.series && graphData31.series &&
                        <MainTab3Charts 
                        graphData3={graphData3}
                        graphData31={graphData31}
                        graphData32={graphData32} />
                    }
                </ColoredScrollbars>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        //brandList: state.dataViewer.brandList3,
        subBrandList: state.dataViewer.subBrandList3,
        graphData3: state.dataViewer.graphData3,
        graphData31: state.dataViewer.graphData31,
        graphData32: state.dataViewer.graphData32,
        setGraphData3: state.dataViewer.setGraphData3,
    };
  }
  
  const mapDispatchToProps  = dispatch => bindActionCreators({
      getBrandList3,
      getSubBrandList3,
      getGraphData3,
      getGraphData31,
      getGraphData32,
      setGraphChange3,
  }, dispatch)
  
  export default connect(mapStateToProps, mapDispatchToProps)(Tab3)

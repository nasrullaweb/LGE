import React, { Component } from 'react'
import { Select, Radio, Menu, Dropdown, Checkbox, Empty, Icon, Typography, Tabs } from 'antd';
import './DataViewer.less'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getBrandList1, getSubBrandList1, getTacticList1, setGraphChange1,
    getGraphData11, getGraphData12, getGraphData13 } from '../../store/dataViewer/actionCreator'
import MainTab1Charts from './MainTab1Charts'
import ColoredScrollbars from '../common/ColoredScrollbars';

const CheckboxGroup = Checkbox.Group;

class Tab1 extends Component {

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
        var2: {
            checkedList: '',
        },
        regionValue: JSON.parse(sessionStorage.getItem('regionValueTab1')) || '',
        brandValue: JSON.parse(sessionStorage.getItem('brandValueTab1')) || [],
        subBrandValue: JSON.parse(sessionStorage.getItem('subBrandValueTab1')) || [],
        var2Value: JSON.parse(sessionStorage.getItem('var2ValueTab1')) || '',
        dataChanged: true,
        message: 'Please Select Brand'
    }

    static getDerivedStateFromProps(props, state) {

        let {region, brand, subBrand, var1, var2} = state
        
        if (state.regionValue !== state.region.checkedList) {
            region = {
                checkedList: Array.isArray(state.regionValue) ? state.regionValue[0] : state.regionValue,
            }
        }

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

        // if (state.var1Value !== state.var1.checkedList && props.tacticList && props.tacticList.depedentTactics && props.tacticList.depedentTactics.length > 0) {
        //     var1 = {
        //         checkedList: Array.isArray(state.var1Value) ? state.var1Value[0] : state.var1Value,
        //     }
        // }

        if (state.var2Value !== state.var2.checkedList && props.tacticList && props.tacticList.length > 0) {
            var2 = {
                checkedList: Array.isArray(state.var2Value) ? state.var2Value[0] : state.var2Value,
            }
        }

        return {
            region,
            brand,
            subBrand,
            var2
        }
        
        //return { };
      }

    onCheckAllRegionChange = e => {
        sessionStorage.setItem('regionValueTab1', JSON.stringify(e.target.checked ? e.target.data_opt : []));
        sessionStorage.removeItem('brandValueTab1');
        sessionStorage.removeItem('subBrandValueTab1');
        sessionStorage.removeItem('var2ValueTab1');
        this.setState({
            regionValue: e.target.checked ? e.target.data_opt : [],
            brandValue: '',
            subBrandValue: [],
            var1Value: '',
            var2Value: '',
            message: 'Please Select Channel'
        }, () => {
            const { modelValue, geographyValue } = this.props
            const { regionValue } =this.state
            this.props.getBrandList1(modelValue, geographyValue, regionValue)
        })
    };

    onRegionChange = (e) => {
        sessionStorage.setItem('regionValueTab1', JSON.stringify(e.target.value));
        sessionStorage.removeItem('brandValueTab1');
        sessionStorage.removeItem('subBrandValueTab1');
        sessionStorage.removeItem('var2ValueTab1');
        this.setState({
            regionValue: e.target.value,
            brandValue: '',
            subBrandValue: [],
            var1Value: '',
            var2Value: '',
            message: 'Please Select Channel'
        }, () => {
            const { modelValue, geographyValue } = this.props
            const { regionValue } =this.state
            this.props.getBrandList1(modelValue, geographyValue, regionValue)
        })
    }

    onCheckAllBrandChange = e => {
        sessionStorage.setItem('brandValueTab1', JSON.stringify(e.target.checked ? e.target.data_opt : []));
        sessionStorage.removeItem('subBrandValueTab1');
        sessionStorage.removeItem('var2ValueTab1');
        this.setState({
            brandValue: e.target.checked ? e.target.data_opt : [],
            subBrandValue: [],
            var1Value: '',
            var2Value: '',
            message: 'Please Select Type'
        }, () => {
            const { modelValue, geographyValue } = this.props
            const { regionValue, brandValue } =this.state
            this.props.getSubBrandList1(modelValue, geographyValue, regionValue, brandValue)
        })
    };

    onBrandChange = (value) => {
        sessionStorage.setItem('brandValueTab1', JSON.stringify(value));
        sessionStorage.removeItem('subBrandValueTab1');
        sessionStorage.removeItem('var2ValueTab1');
        this.setState({
            brandValue: value,
            subBrandValue: [],
            var1Value: '',
            var2Value: '',
            message: 'Please Select Type'
        }, () => {
            const { modelValue, geographyValue } = this.props
            const { regionValue, brandValue } =this.state
            this.props.getSubBrandList1(modelValue, geographyValue, regionValue, brandValue)
        })
    }

    onCheckAllSubBrandChange = e => {
        sessionStorage.setItem('subBrandValueTab1', JSON.stringify(e.target.checked ? e.target.data_opt : []));
        sessionStorage.removeItem('var2ValueTab1');
        this.setState({
            subBrandValue: e.target.checked ? e.target.data_opt : [],
            var1Value: '',
            var2Value: '',
            message: 'Please Select Tactic'
        }, () => {
            const { modelValue, geographyValue } = this.props
            const { regionValue, brandValue, subBrandValue } =this.state
            this.props.getTacticList1(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
        })
    };

    onSubBrandChange = (value) => {
        sessionStorage.setItem('subBrandValueTab1', JSON.stringify(value));
        sessionStorage.removeItem('var2ValueTab1');
        this.setState({
            subBrandValue: value,
            var1Value: '',
            var2Value: '',
            message: 'Please Select Tactic'
        }, () => {
            const { modelValue, geographyValue } = this.props
            const { regionValue, brandValue, subBrandValue } =this.state
            this.props.getTacticList1(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
        })
    }

    // onVar1Change = (e) => {
    //     sessionStorage.setItem('var1Value', JSON.stringify(e.target.value));
    //     sessionStorage.removeItem('var2Value');
    //     this.setState({
    //         var1Value: e.target.value,
    //         var2Value: '',
    //         dataChanged: false,
    //     })
    // }

    onVar2Change = (e) => {
        const self = this
        sessionStorage.setItem('var2ValueTab1', JSON.stringify(e.target.value));
        this.setState({
            var2Value: e.target.value,
            dataChanged: false,
            message: ''
        }, () => {
            const { modelValue, geographyValue } = this.props
            const { regionValue, brandValue, subBrandValue, var2Value } =this.state
            this.props.setGraphChange1()
            this.props.getGraphData11(modelValue, geographyValue, regionValue, brandValue, subBrandValue, var2Value)
            this.props.getGraphData12(modelValue, geographyValue, regionValue, brandValue, subBrandValue, var2Value)
            this.props.getGraphData13(modelValue, geographyValue, regionValue, brandValue, subBrandValue, var2Value)
            setTimeout(function(){
                self.setState({
                dataChanged: true,
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
                        <Radio.Group onChange={onChange} value={this.state[stateNane].checkedList}>
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
        const { regionList, brandList, subBrandList, tacticList, graphData1, graphData2, graphData3, geographyValue } = this.props
        const {regionValue, brandValue, subBrandValue, var2Value, message } = this.state
        //const { depedentTactics = [], inDepedentTactics = [] } = tacticList
        const regionMenu = this.setboxOption(regionList, 'region', '', this.onRegionChange, false, 'region')
        const brandMenu = this.setboxOption(brandList, 'brand', this.onCheckAllBrandChange, this.onBrandChange, true, 'brand')
        const subBrandMenu = this.setboxOption(subBrandList, 'subBrand', this.onCheckAllSubBrandChange, this.onSubBrandChange, true, 'subBrand')
        //const var1Menu = this.setboxOption(tacticList, 'tactic', '', this.onVar1Change, false, 'var1')
        const var2Menu = this.setboxOption(tacticList, 'tactic', '', this.onVar2Change, false, 'var2')
        return (
            <div className="tabContent">
                <div className="tabHeader">
                {
                    message && !var2Value &&
                    <div className="messageContainer">
                        {message}
                    </div>
                }
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
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Type <Icon type="caret-down" theme="outlined" />
                        </a>
                    </Dropdown>
                    <Dropdown overlay={var2Menu} trigger={['click']} overlayClassName='DropDownOverLay'>
                        <a className="ant-dropdown-link noMarginRight" onClick={e => e.preventDefault()}>
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
                            Brand: {
                            regionValue}
                        </span>
                    }
                    {brandValue.length > 0 &&
                        <span>
                            <span className="pipe">||</span>
                            Channel: {brandValue.map((item, index) =>
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
                    {/* {var2Value &&
                        <span>
                            Tactic: {
                           var2Value}
                        </span>
                    } */}
                </div>
                }
                <div className="chartContent">
                    <ColoredScrollbars>
                    {
                        this.props.setGraphData1 && this.props.setGraphData2 && this.props.setGraphData3 && graphData1.series && graphData2.series && graphData3.series && this.state.dataChanged && this.state.var2Value &&
                        <MainTab1Charts 
                        graphData1={graphData1} 
                        graphData2={graphData2} 
                        graphData3={graphData3}
                        var2Value={this.state.var2Value}  />
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
        brandList: state.dataViewer.brandList1,
        subBrandList: state.dataViewer.subBrandList1,
        tacticList: state.dataViewer.tacticList1,
        graphData1: state.dataViewer.graphData11,
        graphData2: state.dataViewer.graphData12,
        graphData3: state.dataViewer.graphData13,
        setGraphData1: state.dataViewer.setGraphData11,
        setGraphData2: state.dataViewer.setGraphData12,
        setGraphData3: state.dataViewer.setGraphData13,
    };
  }
  
  const mapDispatchToProps  = dispatch => bindActionCreators({
      getBrandList1,
      getSubBrandList1,
      getTacticList1,
      getGraphData11,
      getGraphData12,
      getGraphData13,
      setGraphChange1,
  }, dispatch)
  
  export default connect(mapStateToProps, mapDispatchToProps)(Tab1)

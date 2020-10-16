import React, { Component } from 'react'
import { Select, Radio, Menu, Dropdown, Checkbox, Empty, Icon, Typography, Tabs, Button } from 'antd';
import './DataViewer.less'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getBrandList2, getSubBrandList2, getTacticList2, getGraphData21, getGraphData22, getGraphData23, setGraphChange2 } from '../../store/dataViewer/actionCreator'
import MainTab2Charts from './MainTab2Charts'
import ColoredScrollbars from '../common/ColoredScrollbars';

const CheckboxGroup = Checkbox.Group;

class Tab2 extends Component {

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
        var1: {
            checkedList: '',
        },
        var2: {
            checkedList: [],
            indeterminate: false,
            checkAll: false,
        },
        regionValue: 'LGE',
        brandValue: JSON.parse(sessionStorage.getItem('brandValueTab2')) || [],
        subBrandValue: JSON.parse(sessionStorage.getItem('subBrandValueTab2')) || [],
        var1Value: JSON.parse(sessionStorage.getItem('var1ValueTab2')) || '',
        var2Value: JSON.parse(sessionStorage.getItem('var2ValueTab2')) || [],
        dataChanged: true,
        message: 'Please Select Channel',
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


    componentDidMount() {
        sessionStorage.setItem('regionValueTab2', 'LGE')
        if (JSON.parse(sessionStorage.getItem('var2ValueTab2'))) {
            this.setState({ message: "" });
        } else if (JSON.parse(sessionStorage.getItem('var1ValueTab2'))) {
            this.setState({ message: "Please Select Tactic" });
        } else if (JSON.parse(sessionStorage.getItem('subBrandValueTab2'))) {
            this.setState({ message: "Please Select KPI" });
        } else if (JSON.parse(sessionStorage.getItem('brandValueTab2'))) {
            this.setState({ message: "Please Select Type" });
        } 
    }

    static getDerivedStateFromProps(props, state) {

        let {region, brand, subBrand, var1, var2} = state
        
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

        if (state.var1Value !== state.var1.checkedList && props.tacticList && props.tacticList.depedentTactics && props.tacticList.depedentTactics.length > 0) {
            var1 = {
                checkedList: Array.isArray(state.var1Value) ? state.var1Value[0] : state.var1Value,
            }
        }

        if (state.var2Value !== state.var2.checkedList && props.tacticList && props.tacticList.inDepedentTactics && props.tacticList.inDepedentTactics.length > 0) {
            var2 = {
                checkedList: state.var2Value,
                indeterminate: !!state.var2Value.length && state.var2Value.length < props.tacticList.inDepedentTactics.length,
                checkAll: state.var2Value.length === props.tacticList.inDepedentTactics.length,
            }
        }

        return {
            region,
            brand,
            subBrand,
            var1,
            var2
        }
        
        //return { };
      }

    // onCheckAllRegionChange = e => {
    //     sessionStorage.setItem('regionValueTab2', JSON.stringify(e.target.checked ? e.target.data_opt : []));
    //     sessionStorage.removeItem('brandValueTab2');
    //     sessionStorage.removeItem('subBrandValueTab2');
    //     sessionStorage.removeItem('var2ValueTab2');
    //     sessionStorage.removeItem('var1ValueTab2');
    //     this.setState({
    //         regionValue: e.target.checked ? e.target.data_opt : [],
    //         brandValue: [],
    //         subBrandValue: [],
    //         var1Value: '',
    //         var2Value: '',
    //         message: 'Please Select Channel'
    //     }, () => {
    //         const { modelValue, geographyValue } = this.props
    //         const { regionValue } =this.state
    //         this.props.getBrandList2(modelValue, geographyValue, regionValue)
    //     })
    // };

    // onRegionChange = (e) => {
    //     sessionStorage.setItem('regionValueTab2', JSON.stringify(e.target.value));
    //     sessionStorage.removeItem('brandValueTab2');
    //     sessionStorage.removeItem('subBrandValueTab2');
    //     sessionStorage.removeItem('var2ValueTab2');
    //     sessionStorage.removeItem('var1ValueTab2');
    //     this.setState({
    //         regionValue: e.target.value,
    //         brandValue: [],
    //         subBrandValue: [],
    //         var1Value: '',
    //         var2Value: '',
    //         message: 'Please Select Channel'
    //     }, () => {
    //         const { modelValue, geographyValue } = this.props
    //         const { regionValue } =this.state
    //         this.props.getBrandList2(modelValue, geographyValue, regionValue)
    //     })
    // }

    onCheckAllBrandChange = e => {
        this.setState({
            brandValue: e.target.checked ? e.target.data_opt : [],
        })
    };

    onBrandOkChange = () => {
        sessionStorage.setItem('brandValueTab2', JSON.stringify(this.state.brandValue));
        sessionStorage.removeItem('subBrandValueTab2');
        sessionStorage.removeItem('var2ValueTab2');
        sessionStorage.removeItem('var1ValueTab2');
        this.setState({
            subBrandValue: [],
            var1Value: '',
            var2Value: '',
            message: 'Please Select Type',
            visible1: false
        }, () => {
            const { modelValue, geographyValue } = this.props
            const { regionValue, brandValue } =this.state
            this.props.getSubBrandList2(modelValue, geographyValue, regionValue, brandValue)
        })
    }

    onBrandChange = (value) => {
        this.setState({
            brandValue: value,
        })
    }

    onCheckAllSubBrandChange = e => {
        this.setState({
            subBrandValue: e.target.checked ? e.target.data_opt : [],
        })
    };

    onSubBrandOkChange = (value) => {
        sessionStorage.setItem('subBrandValueTab2', JSON.stringify(this.state.subBrandValue));
        sessionStorage.removeItem('var2ValueTab2');
        sessionStorage.removeItem('var1ValueTab2');
        this.setState({
            var1Value: '',
            var2Value: '',
            message: 'Please Select KPI',
            visible2: false
        }, () => {
            const { modelValue, geographyValue } = this.props
            const { regionValue, brandValue, subBrandValue } =this.state
            this.props.getTacticList2(modelValue, geographyValue, regionValue, brandValue, subBrandValue)
        })
    }

    onSubBrandChange = (value) => {
        this.setState({
            subBrandValue: value,
        })
    }

    onVar1Change = (e) => {
        sessionStorage.setItem('var1ValueTab2', JSON.stringify(e.target.value));
        sessionStorage.removeItem('var2ValueTab2');
        this.setState({
            var1Value: e.target.value,
            var2Value: '',
            dataChanged: false,
            message: 'Please Select Tactic',
            visible3: false
        })
    }

    onCheckAllVar2Change = e => {
        this.setState({
            var2Value: e.target.checked ? e.target.data_opt : [],
        })
    };

    onVar2OkChange = () => {
        const self = this
        sessionStorage.setItem('var2ValueTab2', JSON.stringify(this.state.var2Value));
        this.setState({
            dataChanged: false,
            message: '',
            visible4: false
        }, () => {
            const { modelValue, geographyValue } = this.props
            const { regionValue, brandValue, subBrandValue, var1Value, var2Value } =this.state
            this.props.setGraphChange2()
            this.props.getGraphData21(modelValue, geographyValue, regionValue, brandValue, subBrandValue, var1Value, var2Value)
            this.props.getGraphData22(modelValue, geographyValue, regionValue, brandValue, subBrandValue, var1Value, var2Value)
            this.props.getGraphData23(modelValue, geographyValue, regionValue, brandValue, subBrandValue, var1Value, var2Value)
            setTimeout(function(){
                self.setState({
                dataChanged: true,
            })}, 1000)
        })
    }

    onVar2Change = (value) => {
        this.setState({
            var2Value: value,
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


    setboxOption1 = (list, keyName, checkAllChange, onChange, multiSelect, stateNane, okClick) => {

        const listOption = []
        list.forEach(function(value, key) {
            listOption.push(value[keyName])
        })
        if (multiSelect) {
            return (
                <Menu className="data_viewer">
                    {listOption.length > 0 ?
                        listOption.length > 5 ?
                            //<ColoredScrollbars style={{height: 150 }}>
                            <div>
                                
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
        const { regionList, brandList, subBrandList, tacticList, graphData1, graphData2, graphData3, geographyValue } = this.props
        const { depedentTactics = [], inDepedentTactics = [] } = tacticList
        const {regionValue, brandValue, subBrandValue, var2Value, message } = this.state
        //const regionMenu = this.setboxOption(regionList, 'region', '', this.onRegionChange, false, 'region')
        const brandMenu = this.setboxOption(brandList, 'brand', this.onCheckAllBrandChange, this.onBrandChange, true, 'brand', this.onBrandOkChange)
        const subBrandMenu = this.setboxOption(subBrandList, 'subBrand', this.onCheckAllSubBrandChange, this.onSubBrandChange, true, 'subBrand', this.onSubBrandOkChange)
        const var1Menu = this.setboxOption(depedentTactics, 'tactic', '', this.onVar1Change, false, 'var1')
        const var2Menu = this.setboxOption1(inDepedentTactics, 'tactic', this.onCheckAllVar2Change, this.onVar2Change, true, 'var2', this.onVar2OkChange)
        return (
            <div className="tabContent">
                <div className="tabHeader">
                {
                    message && !var2Value.length > 0 &&
                    <div className="messageContainer">
                        {message}
                    </div>
                }
                    {/* <Dropdown overlay={regionMenu} trigger={['click']} overlayClassName='DropDownOverLay'>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Brand <Icon type="caret-down" theme="outlined" />
                        </a>
                    </Dropdown> */}
                    <Dropdown overlay={brandMenu} trigger={['click']} overlayClassName='DropDownOverLay'
                    onVisibleChange={this.handleVisible1Change}
                    visible={this.state.visible1}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Channel <Icon type="caret-down" theme="outlined" />
                        </a>
                    </Dropdown>
                    <Dropdown overlay={subBrandMenu} trigger={['click']} overlayClassName='DropDownOverLay'
                    onVisibleChange={this.handleVisible2Change}
                    visible={this.state.visible2}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Type <Icon type="caret-down" theme="outlined" />
                        </a>
                    </Dropdown>
                    <Dropdown overlay={var1Menu} trigger={['click']} overlayClassName='DropDownOverLay'
                    onVisibleChange={this.handleVisible3Change}
                    visible={this.state.visible3}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            KPI  <Icon type="caret-down" theme="outlined" />
                        </a>
                    </Dropdown>
                    <Dropdown overlay={var2Menu} trigger={['click']} overlayClassName='DropDownOverLay'
                    onVisibleChange={this.handleVisible4Change}
                    visible={this.state.visible4}>
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
                    {/* {regionValue &&
                        <span>
                            <span className="pipe">||</span>
                            Brand: {
                            regionValue}
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
                        this.props.setGraphData1 && this.props.setGraphData2 && this.props.setGraphData3 && graphData1.series && graphData2.series && graphData3.series && this.state.dataChanged && this.state.var2Value &&
                        <MainTab2Charts 
                        graphData1={graphData1} 
                        graphData2={graphData2} 
                        graphData3={graphData3}
                        var1Value={this.state.var1Value}
                        var2Value={this.state.var2Value} />
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
        //brandList: state.dataViewer.brandList2,
        subBrandList: state.dataViewer.subBrandList2,
        tacticList: state.dataViewer.tacticList2,
        graphData1: state.dataViewer.graphData21,
        graphData2: state.dataViewer.graphData22,
        graphData3: state.dataViewer.graphData23,
        setGraphData1: state.dataViewer.setGraphData21,
        setGraphData2: state.dataViewer.setGraphData22,
        setGraphData3: state.dataViewer.setGraphData23,
    };
  }
  
  const mapDispatchToProps  = dispatch => bindActionCreators({
      getBrandList2,
      getSubBrandList2,
      getTacticList2,
      getGraphData21,
      getGraphData22,
      getGraphData23,
      setGraphChange2,
  }, dispatch)
  
  export default connect(mapStateToProps, mapDispatchToProps)(Tab2)

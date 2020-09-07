import React, {Fragment} from 'react'
import { Select, Radio, Menu, Dropdown, Checkbox, Empty, Icon, InputNumber } from 'antd';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const { SubMenu } = Menu;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

export class OptimizerOptionsSelection extends React.Component {
    state = {
        brand: {
            checkedList: [],
            indeterminate: false,
            checkAll: false,
        },
        geography: {
            checkedList: [],
            indeterminate: false,
            checkAll: false,
        },
        subBrand: {
            checkedList: ['LGE'],
            indeterminate: false,
            checkAll: false,
        },
        period: {
            checkedList: [],
        },
        tactic: {
            checkedList: [],
            indeterminate: false,
            checkAll: false,
        },
        optimizationType : {
            checkedList: [],
        },
    };

    static getDerivedStateFromProps(props, state) {

        let {brand, geography, subBrand, period, tactic, optimizationType} = state
        
        if (props.brandList !== state.brand.checkedList && props.brandOptions.length > 0 && props.multiProduct) {
            //return {
                brand = {
                    checkedList: props.brandList,
                    indeterminate: !!props.brandList.length && props.brandList.length < props.brandOptions.length,
                    checkAll: props.brandList.length === props.brandOptions.length,
                }
            //}
        }

        if (props.brandList !== state.brand.checkedList && props.brandOptions.length > 0 && !props.multiProduct) {
            //return {
                
                brand = {
                  checkedList: Array.isArray(props.brandList) ? props.brandList[0] : props.brandList,
                }
            //}
        }

        if (props.geographyList !== state.geography.checkedList && props.geographyOptions.length > 0 && !props.multiProduct) {
            //return {
                geography = {
                    checkedList: props.geographyList,
                    indeterminate: !!props.geographyList.length && props.geographyList.length < props.geographyOptions.length,
                    checkAll: props.geographyList.length === props.geographyOptions.length,
                }
            //}
        }

        if (props.geographyList !== state.geography.checkedList && props.geographyOptions.length > 0 && props.multiProduct) {
            //return {
                geography = {
                  checkedList: Array.isArray(props.geographyList) ? props.geographyList[0] : props.geographyList,
                }
            //}
        }

        // if (props.subBrandValue !== state.subBrand.checkedList && props.subBrandOptions.length > 0 ) {
        //     //return {
        //         subBrand = {
        //             checkedList: props.subBrandValue,
        //             indeterminate: !!props.subBrandValue.length && props.subBrandValue.length < props.subBrandOptions.length,
        //             checkAll: props.subBrandValue.length === props.subBrandOptions.length,
        //         }
        //     //}
        // }

        if (props.periodValue !== state.period.checkedList && props.periodOptions.length > 0) {
            //return {
                period = {
                  checkedList: Array.isArray(props.periodValue) ? props.periodValue[0] : props.periodValue,
                }
            //}
        }

        if (props.tacticValue !== state.tactic.checkedList && props.tacticsOptions.length > 0 ) {
            //return {
                tactic = {
                    checkedList: props.tacticValue,
                    indeterminate: !!props.tacticValue.length && props.tacticValue.length < props.tacticsOptions.length,
                    checkAll: props.tacticValue.length === props.tacticsOptions.length,
                }
            //}
        }

        if (props.optimizationType !== state.optimizationType.checkedList && props.optimizationTypeOptions.length > 0) {
            //return {
                optimizationType = {
                  checkedList: Array.isArray(props.optimizationType) ? props.optimizationType[0] : props.optimizationType,
                }
            //}
        }


        return {
            brand,
            geography,
            subBrand,
            period,
            tactic,
            optimizationType,
        }
        
        //return { };
      }

    onBrandChange = checkedList => {
        this.props.handleProductChange(checkedList)
    };

    onBrandChangeSingle = e => {
        this.props.handleProductChange(e.target.value)
    };

    onCheckAllBrandChange = e => {
        this.props.handleProductChange(e.target.checked ? e.target.data_opt : [])
    };

    onGeographyChange = checkedList => {
        this.props.handleCompanyChange(checkedList)
    };

    onGeographyChangeSingle = e => {
        this.props.handleCompanyChange(e.target.value)
    };

    onCheckAllGeographyChange = e => {
        this.props.handleCompanyChange(e.target.checked ? e.target.data_opt : [])
    };

    onSubBrandChange = checkedList => {
        this.props.handleSubBrandChange(checkedList)
    };

    onCheckAllSubBrandChange = e => {
        this.props.handleSubBrandChange(e.target.checked ? e.target.data_opt : [])
    };

    onPeriodChange = e => {
        this.props.handleYearChange(e.target.value)
    };

    onTacticChange = checkedList => {
        this.props.handleTacticsChange(checkedList)
    };

    onOptimizationTypeChange = e => {
        this.props.handleOptimizationTypeChange(e.target.value)
    };

    onCheckAllTacticChange = e => {
        this.props.handleTacticsChange(e.target.checked ? e.target.data_opt : [])
    };

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
                                    disabled={this.props.isSimulated}
                                >
                                Select All
                                </Checkbox>
                            </div>
                            <CheckboxGroup
                                options={listOption}
                                value={this.state[keyName].checkedList}
                                onChange={onChange}
                                disabled={this.props.isSimulated}
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
                            keyName === 'optimizationType' ?
                                <div className='popUpMenuCont'>
                                    <Radio.Group onChange={onChange} value={this.state[keyName].checkedList}>
                                        {
                                            listOption.map((option) =>
                                                option === 'Minimize Spend' ?
                                                    <Radio value={option} disabled={this.props.isSimulated} >{option} </Radio>
                                                    :
                                                    <Radio value={option} disabled={this.props.isSimulated} >{option}  </Radio>
                                            )
                                        }
                                    </Radio.Group>
                                    {
                                        this.state[keyName].checkedList === 'Minimize Spend' &&
                                            <div className="popUpMenu">
                                                Revenue Target
                                                <InputNumber value={this.props.minimizeSpendValue} disabled={this.props.isSimulated} onChange={(e) => this.props.handleMinimizeSpendValue(e)} formatter={value => `${value}%`} parser={value => value.replace('%', '')} />
                                            </div>
                                    }
                                    {
                                        this.state[keyName].checkedList === 'Maximize Revenue' &&
                                            <div className="popUpMenu">
                                                Total Spend Constraint
                                                <InputNumber value={this.props.maximizeRevenueValue} disabled={this.props.isSimulated} onChange={(e) => this.props.handleMaximizeRevenueValue(e)} formatter={value => `${value}%`} parser={value => value.replace('%', '')} />
                                            </div>
                                    }
                                </div>
                                :
                                <Radio.Group onChange={onChange} value={this.state[keyName].checkedList}>
                                    {
                                        listOption.map((option) =>
                                            <Radio value={option} disabled={this.props.isSimulated} >{option}</Radio>
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
        const { brandOptions, geographyOptions, periodOptions, tacticsOptions, subBrandOptions, optimizationTypeOptions } = this.props
        const { multiProductChange, handleProductChange, handleCompanyChange,  handleYearChange, handleTacticsChange, handleSubBrandChange } = this.props
        const { brandList, geographyList, periodValue, multiProduct, message, tacticValue, subBrandValue, optimizationType, minimizeSpendValue, maximizeRevenueValue } = this.props
        
        const brandMenu = multiProduct ?
            this.setboxOption(brandOptions, 'brand', this.onCheckAllBrandChange, this.onBrandChange, true)
            :
            this.setboxOption(brandOptions, 'brand', '', this.onBrandChangeSingle, false)

        const geographyMenu = !multiProduct ?
            this.setboxOption(geographyOptions, 'geography', this.onCheckAllGeographyChange, this.onGeographyChange, true)
            :
            this.setboxOption(geographyOptions, 'geography', '', this.onGeographyChangeSingle, false)

        //const subBrandMenu = this.setboxOption(subBrandOptions, 'subBrand', this.onCheckAllSubBrandChange, this.onSubBrandChange, true)

        const periodMenu = this.setboxOption(periodOptions, 'period', '', this.onPeriodChange, false)

        const tacticMenu = this.setboxOption(tacticsOptions, 'tactic', this.onCheckAllTacticChange, this.onTacticChange, true)

        const optimizationTypeMenu = this.setboxOption(optimizationTypeOptions, 'optimizationType', '', this.onOptimizationTypeChange, false)
            
            return (
                <div>
                <div className="topSelection">
                    
                    <Radio.Group onChange={multiProductChange} value={multiProduct} className="radioStyle" >
                        <Radio value={true}>
                            Multiple Brands, One Geography
                        </Radio>
                        <Radio value={false} disabled={true}>
                            Multiple Geographies, One Brand
                        </Radio>
                    </Radio.Group>
                    </div>
                    <div className="dropSelection">
                    {
                        message &&
                        <div className="messageContainer">
                            {message}
                        </div>
                    }
                    <Dropdown overlay={brandMenu} trigger={['click']} overlayClassName='DropDownOverLay'>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Brand <Icon type="caret-down" theme="outlined" />
                        </a>
                    </Dropdown>

                    <Dropdown overlay={geographyMenu} trigger={['click']} overlayClassName='DropDownOverLay'>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Geography <Icon type="caret-down" theme="outlined" />
                        </a>
                    </Dropdown>

                    {/* <Dropdown overlay={subBrandMenu} trigger={['click']} overlayClassName='DropDownOverLay'>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Sub Brand <Icon type="caret-down" theme="outlined" />
                        </a>
                    </Dropdown> */}

                    <Dropdown overlay={periodMenu} trigger={['click']} overlayClassName='DropDownOverLay'>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Period <Icon type="caret-down" theme="outlined" />
                        </a>
                    </Dropdown>

                    <Dropdown overlay={tacticMenu} trigger={['click']} overlayClassName='DropDownOverLay'>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Tactic <Icon type="caret-down" theme="outlined" />
                        </a>
                    </Dropdown>

                    <Dropdown overlay={optimizationTypeMenu} trigger={['click']} overlayClassName='DropDownOverLay'>
                        <a className="ant-dropdown-link noMarginRight" onClick={e => e.preventDefault()}>
                            OptimizationType <Icon type="caret-down" theme="outlined" />
                        </a>
                    </Dropdown>
                    </div>
                    
                </div>
                       
            )
          }

}


export default OptimizerOptionsSelection
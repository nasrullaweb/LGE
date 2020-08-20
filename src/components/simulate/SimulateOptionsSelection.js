import React, {Fragment} from 'react'
import { Select, Radio, Menu, Dropdown, Checkbox, Empty, Icon } from 'antd';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

export class SimpulateOptionsSelection extends React.Component {
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
    };

    static getDerivedStateFromProps(props, state) {

        let {brand, geography, subBrand, period, tactic} = state
        
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

        return {
            brand,
            geography,
            subBrand,
            period,
            tactic,
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
        const { brandOptions, geographyOptions, periodOptions, tacticsOptions, subBrandOptions } = this.props
        const { multiProductChange, handleProductChange, handleCompanyChange,  handleYearChange, handleTacticsChange, handleSubBrandChange } = this.props
        const { brandList, geographyList = [], periodValue = [], multiProduct, message, tacticValue, subBrandValue } = this.props
        console.log('ffffff', geographyList)
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

            return (
                <div className="topSelection">
                    {
                        message &&
                        <div className="messageContainer">
                            {message}
                        </div>
                    }
                    
                    <Radio.Group onChange={multiProductChange} value={multiProduct} className="radioStyle" >
                        <Radio value={true}>
                            Multiple Brands, One Geography
                        </Radio>
                        <Radio value={false} disabled={true}>
                            Multiple Geographies, One Brand
                        </Radio>
                    </Radio.Group>

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
                        <a className="ant-dropdown-link noMarginRight" onClick={e => e.preventDefault()}>
                            Tactic <Icon type="caret-down" theme="outlined" />
                        </a>
                    </Dropdown>

                    {/* <Select
                        mode={multiProduct ? 'multiple' : ''}
                        style={{ width: 200 }}
                        placeholder="Please select Brand"
                        onChange={handleProductChange}
                        value={brandList}
                        disabled={this.props.isSimulated}
                    >
                        {
                            brandOptions.map((option) =>
                            <Option key={option.brand} value={option.brand}>{option.brand}</Option>
                            )
                        }
                    </Select>
                    <Select
                        mode={!multiProduct ? 'multiple' : ''}
                        style={{ width: 200 }}
                        placeholder="Please select Geography"
                        onChange={handleCompanyChange}
                        value={geographyList}
                        disabled={this.props.isSimulated}
                    >
                        {
                            geographyOptions.map((option) =>
                            <Option key={option.geography} value={option.geography}>{option.geography}</Option>
                            )
                        }
                    </Select>
                    <Select
                        mode="multiple"
                        style={{ width: 200 }}
                        placeholder="Please select SubBrand"
                        onChange={handleSubBrandChange}
                        value={subBrandValue}
                        disabled={this.props.isSimulated}
                    >
                        {
                            subBrandOptions.map((option) =>
                            <Option key={option.subBrand} value={option.subBrand}>{option.subBrand}</Option>
                            )
                        }
                    </Select>
                    <Select
                        style={{ width: 200 }}
                        placeholder="Please select Period"
                        onChange={handleYearChange}
                        value={periodValue}
                        disabled={this.props.isSimulated}
                    >
                        {
                            periodOptions.map((option) =>
                            <Option key={option.period} value={option.period}>{option.period}</Option>
                            )
                        }
                    </Select>
                    <Select
                        mode="multiple"
                        style={{ width: 200 }}
                        placeholder="Please select Tactic"
                        onChange={handleTacticsChange}
                        value={tacticValue}
                        disabled={this.props.isSimulated}
                    >
                        {
                            tacticsOptions.map((option) =>
                            <Option key={option.tactic} value={option.tactic}>{option.tactic}</Option>
                            )
                        }
                    </Select> */}

                        {brandList.length > 0 &&
                            <div className="FilterSelection">
                                {brandList.length > 0 &&
                                    <span>
                                        Brand: {
                                        brandList.map((item, index) =>
                                        index === brandList.length-1 ?
                                        `${item} `
                                        :
                                        `${item}, `
                                        )
                                        }
                                    </span>
                                }
                                {geographyList.length > 0 &&
                                    <span>
                                        Geography: {
                                        geographyList}
                                    </span>
                                }
                                {/* {subBrandValue.length > 0 &&
                                    <span>
                                        SubBrand: {
                                        subBrandValue.map((item, index) =>
                                        index === subBrandValue.length-1 ?
                                        `${item} `
                                        :
                                        `${item}, `
                                        )
                                        }
                                    </span>
                                } */}
                                {periodValue.length > 0 &&
                                    <span>
                                        Time Period: {
                                        periodValue}
                                    </span>
                                }
                                {/* {tacticValue.length > 0 &&
                                    <span>
                                        Tactic: {
                                        tacticValue.map((item, index) =>
                                        index === tacticValue.length-1 ?
                                        `${item} `
                                        :
                                        `${item}, `
                                        )
                                        }
                                    </span>
                                } */}
                            </div>
                        }       
                    
                </div>
                       
            )
          }

}


export default SimpulateOptionsSelection
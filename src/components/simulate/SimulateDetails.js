import React, {Fragment} from 'react'
import { Tabs, Table, Switch, Icon, InputNumber  } from 'antd';
import './Simulate.less'

const { TabPane } = Tabs;

export class SimpulateDetails extends React.Component {

    getChangePercentage = (change, oldValue) => {
        return ((change/oldValue)*100)-100
    }
    getChangeSpend = (oldPercentage, changeValue) => {
        return (Math.round(oldPercentage) * Math.round(changeValue))/100
    }

    handleChangeInSpend = (e) => {
        const data = this.props.spendData;
        const id = e.target.id.split('spend_')
        const changeSpend = e.target.value
        const spend = document.getElementById('oldspend_'+id[1]).value
        const parentId = id[1].split('_')
        const changeDiff = changeSpend - spend

        const outputData = []
        
        if(parentId.length === 1) {
            if(changeSpend == Math.round(data[parentId[0]].changeInSpend)) {
                return
            }
        }
        if(parentId.length === 2) {
            if(changeSpend == Math.round(data[parentId[0]].children[parentId[1]].changeInSpend)) {
                return
            }
        }
        if(parentId.length === 3) {
            if(changeSpend == Math.round(data[parentId[0]].children[parentId[1]].children[parentId[2]].changeInSpend)) {
                return
            }
        }

        for(var i in data) {

            if(data[i].key === parentId[0]) {
                if(parentId.length === 1 && data[i].children) {
                    data[i].changeInSpend = changeSpend
                    data[i].changeInPercentage = this.getChangePercentage(changeSpend, data[i].spend)
                    for(var j in data[i].children) {
                        data[i].children[j].changeInSpend = this.getChangeSpend(data[i].children[j].percentage, changeSpend)
                        data[i].children[j].changeInPercentage = this.getChangePercentage(data[i].children[j].changeInSpend, data[i].children[j].spend)
                        if(data[i].children[j].children) {
                            for(var k in data[i].children[j].children) {
                                data[i].children[j].children[k].changeInSpend = this.getChangeSpend(data[i].children[j].children[k].percentage, changeSpend)
                                data[i].children[j].children[k].changeInPercentage = this.getChangePercentage(data[i].children[j].children[k].changeInSpend, data[i].children[j].children[k].spend)
                            }
                        }
                    }
                }
                if(parentId.length === 2 && data[i].children) {
                    data[i].changeInSpend = 0
                    for(var j in data[i].children) {
                        if(data[i].children[j].key === `${parentId[0]}_${parentId[1]}`) {
                            data[i].children[j].changeInSpend = changeSpend
                            data[i].children[j].changeInPercentage = this.getChangePercentage(data[i].children[j].changeInSpend, data[i].children[j].spend)
                            if(data[i].children[j].children) {
                                for(var k in data[i].children[j].children) {
                                    data[i].children[j].children[k].changeInSpend = this.getChangeSpend(data[i].children[j].children[k].percentage, changeSpend)
                                    data[i].children[j].children[k].changeInPercentage = this.getChangePercentage(data[i].children[j].children[k].changeInSpend, data[i].children[j].children[k].spend)
                                }
                            }
                        }
                        data[i].changeInSpend = Math.round(data[i].changeInSpend) + Math.round(data[i].children[j].changeInSpend)
                        data[i].changeInPercentage = this.getChangePercentage(data[i].changeInSpend, data[i].spend)
                    }
                }
                if(parentId.length === 3 && data[i].children) {
                    data[i].changeInSpend = 0
                    for(var j in data[i].children) {
                        data[i].children[j].changeInSpend = 0
                        if(data[i].children[j].key === `${parentId[0]}_${parentId[1]}`) {
                            if(data[i].children[j].children) {
                                for(var k in data[i].children[j].children) {
                                    if(data[i].children[j].children[k].key === `${parentId[0]}_${parentId[1]}_${parentId[2]}`) {
                                        data[i].children[j].children[k].changeInSpend = changeSpend
                                        data[i].children[j].children[k].changeInPercentage = this.getChangePercentage(data[i].children[j].children[k].changeInSpend, data[i].children[j].children[k].spend)
                                    }
                                    data[i].children[j].changeInSpend = Math.round(data[i].children[j].changeInSpend) + Math.round(data[i].children[j].children[k].changeInSpend)
                                    data[i].children[j].changeInPercentage = this.getChangePercentage(data[i].children[j].changeInSpend, data[i].children[j].spend)
                                }
                            }
                        }
                        data[i].changeInSpend = Math.round(data[i].changeInSpend) + Math.round(data[i].children[j].changeInSpend)
                        data[i].changeInPercentage = this.getChangePercentage(data[i].changeInSpend, data[i].spend)
                    }
                }
            }
            outputData.push(data[i])
        }

        this.props.handleChangeSpendData(outputData)
    }

    handleChangeCost = (e) => {
        const data = this.props.spendData;
        const id = e.target.id.split('cost_')
        const costValue = e.target.value.replace('%', '')
        const parentId = id[1].split('_')

        const outputData = []
        if(parentId.length === 1) {
            if(parseFloat(costValue).toFixed(1) == parseFloat(data[parentId[0]].cost).toFixed(1)) {
                return
            }
        }
        if(parentId.length === 2) {
            if(parseFloat(costValue).toFixed(1) == parseFloat(data[parentId[0]].children[parentId[1]].cost).toFixed(1)) {
                return
            }
        }
        if(parentId.length === 3) {
            if(parseFloat(costValue).toFixed(1) == parseFloat(data[parentId[0]].children[parentId[1]].children[parentId[2]].cost).toFixed(1)) {
                return
            }
        }

        for(var i in data) {

            if(data[i].key === parentId[0]) {
                if(parentId.length === 1 && data[i].children) {
                    data[i].cost = costValue
                    for(var j in data[i].children) {
                        data[i].children[j].cost = 0
                        data[i].children[j].costDisabled = 1
                        if(data[i].children[j].children) {
                            for(var k in data[i].children[j].children) {
                                data[i].children[j].children[k].cost = 0
                                data[i].children[j].children[k].costDisabled = 1
                            }
                        }
                    }
                }
                if(parentId.length === 2 && data[i].children) {
                    for(var j in data[i].children) {
                        if(data[i].children[j].key === `${parentId[0]}_${parentId[1]}`) {
                            data[i].children[j].cost = costValue
                            if(data[i].children[j].children) {
                                for(var k in data[i].children[j].children) {
                                    data[i].children[j].children[k].cost = 0
                                    data[i].children[j].children[k].costDisabled = 1
                                }
                            }
                        }
                    }
                }
                if(parentId.length === 3 && data[i].children) {
                    for(var j in data[i].children) {
                        if(data[i].children[j].key === `${parentId[0]}_${parentId[1]}`) {
                            if(data[i].children[j].children) {
                                for(var k in data[i].children[j].children) {
                                    if(data[i].children[j].children[k].key === `${parentId[0]}_${parentId[1]}_${parentId[2]}`) {
                                        data[i].children[j].children[k].cost = costValue
                                    }
                                }
                            }
                        }
                    }
                }
            }
                
            outputData.push(data[i])
        }

        this.props.handleChangeSpendData(outputData)
    }

    handleChangeResponse = (e) => {
        const data = this.props.spendData;
        const id = e.target.id.split('response_')
        const costValue = e.target.value.replace('%', '')
        const parentId = id[1].split('_')

        const outputData = []

        if(parentId.length === 1) {
            if(parseFloat(costValue).toFixed(1) == parseFloat(data[parentId[0]].response).toFixed(0)) {
                return
            }
        }
        if(parentId.length === 2) {
            if(parseFloat(costValue).toFixed(1) == parseFloat(data[parentId[0]].children[parentId[1]].response).toFixed(0)) {
                return
            }
        }
        if(parentId.length === 3) {
            if(parseFloat(costValue).toFixed(1) == parseFloat(data[parentId[0]].children[parentId[1]].children[parentId[2]].response).toFixed(0)) {
                return
            }
        }

        for(var i in data) {

            if(data[i].key === parentId[0]) {
                if(parentId.length === 1 && data[i].children) {
                    data[i].response = costValue
                    for(var j in data[i].children) {
                        data[i].children[j].response = 0
                        data[i].children[j].responseDisabled = 1
                        if(data[i].children[j].children) {
                            for(var k in data[i].children[j].children) {
                                data[i].children[j].children[k].response = 0
                                data[i].children[j].children[k].responseDisabled = 1
                            }
                        }
                    }
                }
                if(parentId.length === 2 && data[i].children) {
                    for(var j in data[i].children) {
                        if(data[i].children[j].key === `${parentId[0]}_${parentId[1]}`) {
                            data[i].children[j].response = costValue
                            if(data[i].children[j].children) {
                                for(var k in data[i].children[j].children) {
                                    data[i].children[j].children[k].response = 0
                                    data[i].children[j].children[k].responseDisabled = 1
                                }
                            }
                        }
                    }
                }
                if(parentId.length === 3 && data[i].children) {
                    for(var j in data[i].children) {
                        if(data[i].children[j].key === `${parentId[0]}_${parentId[1]}`) {
                            if(data[i].children[j].children) {
                                for(var k in data[i].children[j].children) {
                                    if(data[i].children[j].children[k].key === `${parentId[0]}_${parentId[1]}_${parentId[2]}`) {
                                        data[i].children[j].children[k].response = costValue
                                    }
                                }
                            }
                        }
                    }
                }
            }
                
            outputData.push(data[i])
        }

        this.props.handleChangeSpendData(outputData)
    }

    handleChangeInSpendPercentage = (e) => {
        const data = this.props.spendData;
        const id = e.target.id.split('percentage_')
        const value = parseFloat(e.target.value)
        const changePercentage = ((value + 100)/100)
        const spend = document.getElementById('oldspend_'+id[1]).value
        const parentId = id[1].split('_')
        const changeDiff = changePercentage*spend - spend

        const outputData = []

        if(parentId.length === 1) {
            if(parseFloat(value).toFixed(1) == parseFloat(data[parentId[0]].changeInPercentage).toFixed(1)) {
                return
            }
        }
        if(parentId.length === 2) {
            if(parseFloat(value).toFixed(1) == parseFloat(data[parentId[0]].children[parentId[1]].changeInPercentage).toFixed(1)) {
                return
            }
        }
        if(parentId.length === 3) {
            if(parseFloat(value).toFixed(1) == parseFloat(data[parentId[0]].children[parentId[1]].children[parentId[2]].changeInPercentage).toFixed(1)) {
                return
            }
        }

        for(var i in data) {

            if(data[i].key === parentId[0]) {
                if(parentId.length === 1 && data[i].children) {
                    data[i].changeInSpend = changePercentage*data[i].spend
                    data[i].changeInPercentage = value
                    for(var j in data[i].children) {
                        data[i].children[j].changeInSpend = changePercentage*data[i].children[j].spend
                        data[i].children[j].changeInPercentage = value
                        if(data[i].children[j].children) {
                            for(var k in data[i].children[j].children) {
                                data[i].children[j].children[k].changeInSpend = changePercentage*data[i].children[j].children[k].spend
                                data[i].children[j].children[k].changeInPercentage = value
                            }
                        }
                    }
                }
                if(parentId.length === 2 && data[i].children) {
                    data[i].changeInSpend = 0
                    for(var j in data[i].children) {
                        if(data[i].children[j].key === `${parentId[0]}_${parentId[1]}`) {
                            data[i].children[j].changeInSpend = changePercentage*data[i].children[j].spend
                            data[i].children[j].changeInPercentage = value
                            if(data[i].children[j].children) {
                                for(var k in data[i].children[j].children) {
                                    data[i].children[j].children[k].changeInSpend = changePercentage*data[i].children[j].children[k].spend
                                    data[i].children[j].children[k].changeInPercentage = value
                                }
                            }
                        }
                        data[i].changeInSpend = Math.round(data[i].changeInSpend) + Math.round(data[i].children[j].changeInSpend)
                        data[i].changeInPercentage = this.getChangePercentage(data[i].changeInSpend, data[i].spend)
                    }
                }
                if(parentId.length === 3 && data[i].children) {
                    data[i].changeInSpend = 0
                    for(var j in data[i].children) {
                        data[i].children[j].changeInSpend = 0
                        if(data[i].children[j].key === `${parentId[0]}_${parentId[1]}`) {
                            if(data[i].children[j].children) {
                                for(var k in data[i].children[j].children) {
                                    if(data[i].children[j].children[k].key === `${parentId[0]}_${parentId[1]}_${parentId[2]}`) {
                                        data[i].children[j].children[k].changeInSpend = changePercentage*data[i].children[j].children[k].spend
                                        data[i].children[j].children[k].changeInPercentage = value
                                    }
                                    data[i].children[j].changeInSpend = Math.round(data[i].children[j].changeInSpend) + Math.round(data[i].children[j].children[k].changeInSpend)
                                    data[i].children[j].changeInPercentage = this.getChangePercentage(data[i].children[j].changeInSpend, data[i].children[j].spend)
                                }
                            }
                        }
                        data[i].changeInSpend = Math.round(data[i].changeInSpend) + Math.round(data[i].children[j].changeInSpend)
                        data[i].changeInPercentage = this.getChangePercentage(data[i].changeInSpend, data[i].spend)
                    }
                }
            }
            outputData.push(data[i])
        }

        this.props.handleChangeSpendData(outputData)
    }

    render() {
        const { brandList, geographyList, periodValue, tacticValue, subBrandValue, showColumns, changeShowColumns, spendData, keyHighlights } = this.props
        const columns = [
            { title: 'Tactic', dataIndex: 'tactic', key: 'tactic', className: 'leftAlign' },
            { title: 'Change Spending', dataIndex: 'changeInSpend', key: 'changeInSpend', render: (changeInSpend, record) => (
                <span>
                    <InputNumber disabled={record.spend <=0} value={`${Math.round(changeInSpend)}`} onBlur={(e) => this.handleChangeInSpend(e)} onKeyUp={(e) => e.key === 'Enter' && this.handleChangeInSpend(e)} id={`spend_${record.key}`} />
                    <InputNumber disabled={record.spend <=0} min={-100} value={`${parseFloat(record.changeInPercentage).toFixed(1)}`} onBlur={(e) => this.handleChangeInSpendPercentage(e)} onKeyUp={(e) => e.key === 'Enter' && this.handleChangeInSpendPercentage(e)} id={`percentage_${record.key}`} formatter={value => `${value}%`} parser={value => value.replace('%', '')} />
                </span>
            )},
            { title: 'Spend', dataIndex: 'spend', key: 'spend', render: (spend, record) => (
                <span>
                    <div>{record.newSpend && <strong>Old</strong> } {`$${Math.round(spend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                    <InputNumber defaultValue={spend}  id={`oldspend_${record.key}`} className="hide" />
                    {record.newSpend && 
                        <div><strong>New</strong> {`$${Math.round(record.newSpend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                    }       
                    {record.newSpend && Math.round(record.newSpend) - Math.round(spend) != 0 ?
                        Math.round(record.newSpend) - Math.round(spend) > 0 ?
                            <div className="newSpend positive">${Math.round(Math.round(record.newSpend) - Math.round(spend)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                            :
                            <div className="newSpend negitive">${Math.round(Math.round(record.newSpend) - Math.round(spend)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                        :
                        <div className="newSpend">$0</div>
                    }
                </span>
            )},
            { title: 'Cost', dataIndex: 'cost', key: 'cost', className: showColumns ? "show" : "hide", render: (cost, record) => (
                <InputNumber disabled={record.costDisabled === 1 || record.spend <=0} value={cost} id={`cost_${record.key}`} formatter={value => `${value}%`} parser={value => value.replace('%', '')} onBlur={(e) => this.handleChangeCost(e)} onKeyUp={(e) => e.key === 'Enter' && this.handleChangeCost(e)} />
            )},
            { title: 'Response', dataIndex: 'response', key: 'response', className: showColumns ? "show" : "hide", render: (response, record) => (
                <InputNumber  disabled={record.responseDisabled === 1 || record.spend <=0} value={response} id={`response_${record.key}`} formatter={value => `${value}%`} parser={value => value.replace('%', '')} onBlur={(e) => this.handleChangeResponse(e)} onKeyUp={(e) => e.key === 'Enter' && this.handleChangeResponse(e)} />
            )},
            // { title: 'Profit', dataIndex: 'profit', key: 'profit', render: (profit, record) => (
            //    <span>
            //        <div>{record.newProfit && <strong>Old</strong> } {`$${Math.round(profit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
            //         {record.newProfit && 
            //             <div><strong>New</strong> {`$${Math.round(record.newProfit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
            //         }    
            //        {record.newProfit && Math.round(record.newProfit) - Math.round(profit) != 0 ?
            //             Math.round(record.newProfit) - Math.round(profit) > 0 ?
            //                 <div className="newSpend positive">${Math.round(Math.round(record.newProfit) - Math.round(profit)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            //                 :
            //                 <div className="newSpend negitive">${Math.round(Math.round(record.newProfit) - Math.round(profit)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            //             :
            //             <div className="newSpend">$0</div>
            //         }
            //     </span>
            // )},
            { title: 'Revenue', dataIndex: 'revenue', key: 'revenue', render: (revenue, record) => (
                <span>
                    <div>{record.newRevenue && <strong>Old</strong> } {`$${Math.round(revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                    {record.newRevenue && 
                        <div><strong>New</strong> {`$${Math.round(record.newRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                    } 
                    {record.newRevenue && Math.round(record.newRevenue) - Math.round(revenue) != 0 ?
                        Math.round(record.newRevenue) - Math.round(revenue) > 0 ?
                            <div className="newSpend positive">${Math.round(Math.round(record.newRevenue) - Math.round(revenue)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                            :
                            <div className="newSpend negitive">${Math.round(Math.round(record.newRevenue) - Math.round(revenue)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                        :
                        <div className="newSpend">$0</div>
                    }
                </span>
             )},
            { title: 'ROI', dataIndex: 'roi', key: 'roi', render: (roi, record) => (
                <span>
                    <div>{record.newROI && <strong>Old</strong> } {`$${parseFloat(roi).toFixed(2)}`}</div>
                    {record.newROI && 
                        <div><strong>New</strong> {`$${parseFloat(record.newROI).toFixed(2)}`}</div>
                    } 
                    {record.newROI && parseFloat(record.newROI).toFixed(2) - parseFloat(roi).toFixed(2) != 0 ?
                        parseFloat(record.newROI).toFixed(2) - parseFloat(roi).toFixed(2) > 0 ?
                            <div className="newSpend positive">${parseFloat(parseFloat(record.newROI).toFixed(2) - parseFloat(roi).toFixed(2)).toFixed(2)}</div>
                            :
                            <div className="newSpend negitive">${parseFloat(parseFloat(record.newROI).toFixed(2) - parseFloat(roi).toFixed(2)).toFixed(2)}</div>
                        :
                        <div className="newSpend">$0.00</div>
                    }
                </span>
             )},
        ];
        const tableData = spendData
        const columnsKey = [
            { title: 'Tactic', dataIndex: 'tactic', key: 'tactic', className: 'leftAlign' },
            { title: 'Spend', dataIndex: 'spend', key: 'spend', render: (spend, record) => (
                <span>
                    {record.tactic && record.tactic === 'Change' ?
                            spend >= 0 ?
                            <span className="positive">
                                <span>{`$${Math.round(spend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                <span>{`${Math.round(record.spendPercentage)}%`}</span>
                            </span>
                            :
                            <span className="negitive">
                                <span>{`$${Math.round(spend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                <span>{`${Math.round(record.spendPercentage)}%`}</span>
                            </span>
                        :
                        <span>{`$${Math.round(spend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                    }
                </span>
             )},
            // { title: 'Profit', dataIndex: 'profit', key: 'profit', render: (profit, record) => (
            //     <span>
            //         {record.tactic && record.tactic === 'Change' ?
            //                 profit >= 0 ?
            //                 <span className="positive">
            //                     <span>{`$${Math.round(profit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
            //                     <span>{`${Math.round(record.profitPercentage)}%`}</span>
            //                 </span>
            //                 :
            //                 <span className="negitive">
            //                     <span>{`$${Math.round(profit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
            //                     <span>{`${Math.round(record.profitPercentage)}%`}</span>
            //                 </span>
            //             :
            //             <span>{`$${Math.round(profit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
            //         }
            //     </span>
            //  )},
            { title: 'Revenue', dataIndex: 'revenue', key: 'revenue', render: (revenue, record) => (
                <span>
                    {record.tactic && record.tactic === 'Change' ?
                            revenue >= 0 ?
                            <span className="positive">
                                <span>{`$${Math.round(revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                <span>{`${Math.round(record.revenuePercentage)}%`}</span>
                            </span>
                            :
                            <span className="negitive">
                                <span>{`$${Math.round(revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                <span>{`${Math.round(record.revenuePercentage)}%`}</span>
                            </span>
                        :
                        <span>{`$${Math.round(revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                    }
                </span>
             )},
            { title: 'ROI', dataIndex: 'roi', key: 'roi', render: (roi, record) => (
                <span>
                    {record.tactic && record.tactic === 'Change' ?
                            roi >= 0 ?
                            <span className="positive">
                                <span>{`$${parseFloat(roi).toFixed(2)}`}</span>
                                <span>{`${parseFloat(record.roiPercentage).toFixed(2)}%`}</span>
                            </span>
                            :
                            <span className="negitive">
                                <span>{`$${parseFloat(roi).toFixed(2)}`}</span>
                                <span>{`${parseFloat(record.roiPercentage).toFixed(2)}%`}</span>
                            </span>
                        :
                        <span>{`$${parseFloat(roi).toFixed(2)}`}</span>
                    }
                </span>
             )},
        ];
    
            return (
                <Fragment>
                {
                    brandList.length > 0 && geographyList.length > 0 && periodValue.length > 0 && tacticValue.length > 0 && subBrandValue.length > 0 &&
                    <div>
                        {
                            keyHighlights.length > 0 &&
                            <div className="simulateHeader">
                                <h3 className="keyHeading"><Icon type="highlight" /> Key Highlights</h3>
                                
                                <Table
                                    className="components-table-demo-nested"
                                    columns={columnsKey}
                                    pagination={false}
                                    dataSource={keyHighlights}
                                />
                                
                            </div>
                        }
                        {
                            tableData && tableData.length > 0 &&
                            <div className="simulateHeader">
                                <h3 className="keyHeading">
                                    <Icon type="highlight" /> Spending Input Table
                                    {/* <p className="selectedOptions">Geography: {geographyList}</p>
                                    <p className="selectedOptions">Time Period: {periodValue}</p> */}
                                    <span className="showColumns"> <Switch checked={showColumns} onChange={changeShowColumns} /> Cost & Response</span>
                                </h3>
                                
                                <Table
                                    className="components-table-demo-nested"
                                    columns={columns}
                                    dataSource={tableData}
                                    pagination={false}
                                />
                                
                            </div>
                            // <div className="card-container">
                            //     {console.log('tab Dat ', tableData)}
                            //     <span className="showColumns"> <Switch checked={showColumns} onChange={changeShowColumns} /> Cost & Response</span> 
                            //     <Tabs type="card">
                            //         <TabPane tab="Spending Input Table" key="1">
                                        
                            //                 <Table
                            //                     className="components-table-demo-nested"
                            //                     columns={columns}
                            //                     dataSource={tableData}
                            //                 />
                                        
                            //         </TabPane>
                                
                            //     </Tabs>
                            // </div>
                        }
                    </div>
                }
                </Fragment>
            )
          }

}


export default SimpulateDetails
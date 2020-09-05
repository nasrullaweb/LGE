import React, {Fragment} from 'react'
import { Tabs, Table, Switch, Icon, InputNumber, Typography, Popover  } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import ColoredScrollbars from '../common/ColoredScrollbars';

const { TabPane } = Tabs;
const { Title } = Typography;

export class OptimizerDetails extends React.Component {

    getChangePercentage = (change, oldValue) => {
        return ((change/oldValue)*100)-100
    }
    getChangeSpend = (oldPercentage, changeValue) => {
        return (Math.round(oldPercentage) * Math.round(changeValue))/100
    }

    handleChangeInMaxSpend = (e) => {
        const data = this.props.spendData;
        const id = e.target.id.split('maxspend_')
        const changeSpend = e.target.value
        const spend = document.getElementById('oldspend_'+id[1]).value
        const parentId = id[1].split('_')
        const changeDiff = changeSpend - spend

        const minSpend = document.getElementById('minspend_'+id[1]).value

        if (parseInt(minSpend-changeSpend) == 0) {
            alert("Maximum Spending should be >= Minimum Spending")
        }
        const outputData = []
        
        if(parentId.length === 1) {
            if(changeSpend == Math.round(data[parentId[0]].changeInMaxSpend)) {
                return
            }
        }
        if(parentId.length === 2) {
            if(changeSpend == Math.round(data[parentId[0]].children[parentId[1]].changeInMaxSpend)) {
                return
            }
        }
        if(parentId.length === 3) {
            if(changeSpend == Math.round(data[parentId[0]].children[parentId[1]].children[parentId[2]].changeInMaxSpend)) {
                return
            }
        }

        for(var i in data) {

            if(data[i].key === parentId[0]) {
                if(parentId.length === 1 && data[i].children) {
                    data[i].changeInMaxSpend = changeSpend
                    data[i].changeInMaxSpendPercentage = this.getChangePercentage(changeSpend, data[i].spend)
                    for(var j in data[i].children) {
                        data[i].children[j].changeInMaxSpend = this.getChangeSpend(data[i].children[j].percentage, changeSpend)
                        data[i].children[j].changeInMaxSpendPercentage = this.getChangePercentage(data[i].children[j].changeInMaxSpend, data[i].children[j].spend)
                        if(data[i].children[j].children) {
                            for(var k in data[i].children[j].children) {
                                data[i].children[j].children[k].changeInMaxSpend = this.getChangeSpend(data[i].children[j].children[k].percentage, changeSpend)
                                data[i].children[j].children[k].changeInMaxSpendPercentage = this.getChangePercentage(data[i].children[j].children[k].changeInMaxSpend, data[i].children[j].children[k].spend)
                            }
                        }
                    }
                }
                if(parentId.length === 2 && data[i].children) {
                    data[i].changeInMaxSpend = 0
                    for(var j in data[i].children) {
                        if(data[i].children[j].key === `${parentId[0]}_${parentId[1]}`) {
                            data[i].children[j].changeInMaxSpend = changeSpend
                            data[i].children[j].changeInMaxSpendPercentage = this.getChangePercentage(data[i].children[j].changeInMaxSpend, data[i].children[j].spend)
                            if(data[i].children[j].children) {
                                for(var k in data[i].children[j].children) {
                                    data[i].children[j].children[k].changeInMaxSpend = this.getChangeSpend(data[i].children[j].children[k].percentage, changeSpend)
                                    data[i].children[j].children[k].changeInMaxSpendPercentage = this.getChangePercentage(data[i].children[j].children[k].changeInMaxSpend, data[i].children[j].children[k].spend)
                                }
                            }
                        }
                        data[i].changeInMaxSpend = Math.round(data[i].changeInMaxSpend) + Math.round(data[i].children[j].changeInMaxSpend)
                        data[i].changeInMaxSpendPercentage = this.getChangePercentage(data[i].changeInMaxSpend, data[i].spend)
                    }
                }
                if(parentId.length === 3 && data[i].children) {
                    data[i].changeInMaxSpend = 0
                    for(var j in data[i].children) {
                        data[i].children[j].changeInMaxSpend = 0
                        if(data[i].children[j].key === `${parentId[0]}_${parentId[1]}`) {
                            if(data[i].children[j].children) {
                                for(var k in data[i].children[j].children) {
                                    if(data[i].children[j].children[k].key === `${parentId[0]}_${parentId[1]}_${parentId[2]}`) {
                                        data[i].children[j].children[k].changeInMaxSpend = changeSpend
                                        data[i].children[j].children[k].changeInMaxSpendPercentage = this.getChangePercentage(data[i].children[j].children[k].changeInMaxSpend, data[i].children[j].children[k].spend)
                                    }
                                    data[i].children[j].changeInMaxSpend = Math.round(data[i].children[j].changeInMaxSpend) + Math.round(data[i].children[j].children[k].changeInMaxSpend)
                                    data[i].children[j].changeInMaxSpendPercentage = this.getChangePercentage(data[i].children[j].changeInMaxSpend, data[i].children[j].spend)
                                }
                            }
                        }
                        data[i].changeInMaxSpend = Math.round(data[i].changeInMaxSpend) + Math.round(data[i].children[j].changeInMaxSpend)
                        data[i].changeInMaxSpendPercentage = this.getChangePercentage(data[i].changeInMaxSpend, data[i].spend)
                    }
                }
            }
            outputData.push(data[i])
        }

        this.props.handleChangeSpendData(outputData)
    }

    handleChangeInMaxSpendPercentage = (e) => {
        const data = this.props.spendData;
        const id = e.target.id.split('maxpercentage_')
        const value = parseFloat(e.target.value)
        const changePercentage = ((value + 100)/100)
        const spend = document.getElementById('oldspend_'+id[1]).value
        const parentId = id[1].split('_')
        const changeDiff = changePercentage*spend - spend

        const minSpend = document.getElementById('minspend_'+id[1]).value

        console.log('cha', parseInt(changePercentage*spend-minSpend) == 0, parseInt(changePercentage*spend-minSpend))
        if (parseInt(minSpend-changePercentage*spend) == 0) {
            alert("Maximum Spending should be >= Minimum Spending")
        }
        const outputData = []

        if(parentId.length === 1) {
            if(parseFloat(value).toFixed(1) == parseFloat(data[parentId[0]].changeInMaxSpendPercentage).toFixed(1)) {
                return
            }
        }
        if(parentId.length === 2) {
            if(parseFloat(value).toFixed(1) == parseFloat(data[parentId[0]].children[parentId[1]].changeInMaxSpendPercentage).toFixed(1)) {
                return
            }
        }
        if(parentId.length === 3) {
            if(parseFloat(value).toFixed(1) == parseFloat(data[parentId[0]].children[parentId[1]].children[parentId[2]].changeInMaxSpendPercentage).toFixed(1)) {
                return
            }
        }

        for(var i in data) {

            if(data[i].key === parentId[0]) {
                if(parentId.length === 1 && data[i].children) {
                    data[i].changeInMaxSpend = changePercentage*data[i].spend
                    data[i].changeInMaxSpendPercentage = value
                    for(var j in data[i].children) {
                        data[i].children[j].changeInMaxSpend = changePercentage*data[i].children[j].spend
                        data[i].children[j].changeInMaxSpendPercentage = value
                        if(data[i].children[j].children) {
                            for(var k in data[i].children[j].children) {
                                data[i].children[j].children[k].changeInMaxSpend = changePercentage*data[i].children[j].children[k].spend
                                data[i].children[j].children[k].changeInMaxSpendPercentage = value
                            }
                        }
                    }
                }
                if(parentId.length === 2 && data[i].children) {
                    data[i].changeInMaxSpend = 0
                    for(var j in data[i].children) {
                        if(data[i].children[j].key === `${parentId[0]}_${parentId[1]}`) {
                            data[i].children[j].changeInMaxSpend = changePercentage*data[i].children[j].spend
                            data[i].children[j].changeInMaxSpendPercentage = value
                            if(data[i].children[j].children) {
                                for(var k in data[i].children[j].children) {
                                    data[i].children[j].children[k].changeInMaxSpend = changePercentage*data[i].children[j].children[k].spend
                                    data[i].children[j].children[k].changeInMaxSpendPercentage = value
                                }
                            }
                        }
                        data[i].changeInMaxSpend = Math.round(data[i].changeInMaxSpend) + Math.round(data[i].children[j].changeInMaxSpend)
                        data[i].changeInMaxSpendPercentage = this.getChangePercentage(data[i].changeInMaxSpend, data[i].spend)
                    }
                }
                if(parentId.length === 3 && data[i].children) {
                    data[i].changeInMaxSpend = 0
                    for(var j in data[i].children) {
                        data[i].children[j].changeInMaxSpend = 0
                        if(data[i].children[j].key === `${parentId[0]}_${parentId[1]}`) {
                            if(data[i].children[j].children) {
                                for(var k in data[i].children[j].children) {
                                    if(data[i].children[j].children[k].key === `${parentId[0]}_${parentId[1]}_${parentId[2]}`) {
                                        data[i].children[j].children[k].changeInMaxSpend = changePercentage*data[i].children[j].children[k].spend
                                        data[i].children[j].children[k].changeInMaxSpendPercentage = value
                                    }
                                    data[i].children[j].changeInMaxSpend = Math.round(data[i].children[j].changeInMaxSpend) + Math.round(data[i].children[j].children[k].changeInMaxSpend)
                                    data[i].children[j].changeInMaxSpendPercentage = this.getChangePercentage(data[i].children[j].changeInMaxSpend, data[i].children[j].spend)
                                }
                            }
                        }
                        data[i].changeInMaxSpend = Math.round(data[i].changeInMaxSpend) + Math.round(data[i].children[j].changeInMaxSpend)
                        data[i].changeInMaxSpendPercentage = this.getChangePercentage(data[i].changeInMaxSpend, data[i].spend)
                    }
                }
            }
            outputData.push(data[i])
        }

        this.props.handleChangeSpendData(outputData)
    }

    handleChangeInMinSpend = (e) => {
        const data = this.props.spendData;
        const id = e.target.id.split('minspend_')
        const changeSpend = e.target.value
        const spend = document.getElementById('oldspend_'+id[1]).value
        const parentId = id[1].split('_')
        const changeDiff = changeSpend - spend

        const maxSpend = document.getElementById('maxspend_'+id[1]).value

        if (parseInt(changeSpend-maxSpend) == 0) {
            alert("Minimum Spending should be <= Maximum Spending")
        }
        const outputData = []
        
        if(parentId.length === 1) {
            if(changeSpend == Math.round(data[parentId[0]].changeInMinSpend)) {
                return
            }
        }
        if(parentId.length === 2) {
            if(changeSpend == Math.round(data[parentId[0]].children[parentId[1]].changeInMinSpend)) {
                return
            }
        }
        if(parentId.length === 3) {
            if(changeSpend == Math.round(data[parentId[0]].children[parentId[1]].children[parentId[2]].changeInMinSpend)) {
                return
            }
        }

        for(var i in data) {

            if(data[i].key === parentId[0]) {
                if(parentId.length === 1 && data[i].children) {
                    data[i].changeInMinSpend = changeSpend
                    data[i].changeInMinSpendPercentage = this.getChangePercentage(changeSpend, data[i].spend)
                    for(var j in data[i].children) {
                        data[i].children[j].changeInMinSpend = this.getChangeSpend(data[i].children[j].percentage, changeSpend)
                        data[i].children[j].changeInMinSpendPercentage = this.getChangePercentage(data[i].children[j].changeInMinSpend, data[i].children[j].spend)
                        if(data[i].children[j].children) {
                            for(var k in data[i].children[j].children) {
                                data[i].children[j].children[k].changeInMinSpend = this.getChangeSpend(data[i].children[j].children[k].percentage, changeSpend)
                                data[i].children[j].children[k].changeInMinSpendPercentage = this.getChangePercentage(data[i].children[j].children[k].changeInMinSpend, data[i].children[j].children[k].spend)
                            }
                        }
                    }
                }
                if(parentId.length === 2 && data[i].children) {
                    data[i].changeInMinSpend = 0
                    for(var j in data[i].children) {
                        if(data[i].children[j].key === `${parentId[0]}_${parentId[1]}`) {
                            data[i].children[j].changeInMinSpend = changeSpend
                            data[i].children[j].changeInMinSpendPercentage = this.getChangePercentage(data[i].children[j].changeInMinSpend, data[i].children[j].spend)
                            if(data[i].children[j].children) {
                                for(var k in data[i].children[j].children) {
                                    data[i].children[j].children[k].changeInMinSpend = this.getChangeSpend(data[i].children[j].children[k].percentage, changeSpend)
                                    data[i].children[j].children[k].changeInMinSpendPercentage = this.getChangePercentage(data[i].children[j].children[k].changeInMinSpend, data[i].children[j].children[k].spend)
                                }
                            }
                        }
                        data[i].changeInMinSpend = Math.round(data[i].changeInMinSpend) + Math.round(data[i].children[j].changeInMinSpend)
                        data[i].changeInMinSpendPercentage = this.getChangePercentage(data[i].changeInMinSpend, data[i].spend)
                    }
                }
                if(parentId.length === 3 && data[i].children) {
                    data[i].changeInMinSpend = 0
                    for(var j in data[i].children) {
                        data[i].children[j].changeInMinSpend = 0
                        if(data[i].children[j].key === `${parentId[0]}_${parentId[1]}`) {
                            if(data[i].children[j].children) {
                                for(var k in data[i].children[j].children) {
                                    if(data[i].children[j].children[k].key === `${parentId[0]}_${parentId[1]}_${parentId[2]}`) {
                                        data[i].children[j].children[k].changeInMinSpend = changeSpend
                                        data[i].children[j].children[k].changeInMinSpendPercentage = this.getChangePercentage(data[i].children[j].children[k].changeInMinSpend, data[i].children[j].children[k].spend)
                                    }
                                    data[i].children[j].changeInMinSpend = Math.round(data[i].children[j].changeInMinSpend) + Math.round(data[i].children[j].children[k].changeInMinSpend)
                                    data[i].children[j].changeInMinSpendPercentage = this.getChangePercentage(data[i].children[j].changeInMinSpend, data[i].children[j].spend)
                                }
                            }
                        }
                        data[i].changeInMinSpend = Math.round(data[i].changeInMinSpend) + Math.round(data[i].children[j].changeInMinSpend)
                        data[i].changeInMinSpendPercentage = this.getChangePercentage(data[i].changeInMinSpend, data[i].spend)
                    }
                }
            }
            outputData.push(data[i])
        }

        this.props.handleChangeSpendData(outputData)
    }

    handleChangeInMinSpendPercentage = (e) => {
        const data = this.props.spendData;
        const id = e.target.id.split('minpercentage_')
        const value = parseFloat(e.target.value)
        const changePercentage = ((value + 100)/100)
        const spend = document.getElementById('oldspend_'+id[1]).value
        const parentId = id[1].split('_')
        const changeDiff = changePercentage*spend - spend
        const maxSpend = document.getElementById('maxspend_'+id[1]).value

        if (parseInt(changePercentage*spend-maxSpend) == 0) {
            alert("Minimum Spending should be <= Maximum Spending")
        }
        const outputData = []

        if(parentId.length === 1) {
            if(parseFloat(value).toFixed(1) == parseFloat(data[parentId[0]].changeInMinSpendPercentage).toFixed(1)) {
                return
            }
        }
        if(parentId.length === 2) {
            if(parseFloat(value).toFixed(1) == parseFloat(data[parentId[0]].children[parentId[1]].changeInMinSpendPercentage).toFixed(1)) {
                return
            }
        }
        if(parentId.length === 3) {
            if(parseFloat(value).toFixed(1) == parseFloat(data[parentId[0]].children[parentId[1]].children[parentId[2]].changeInMinSpendPercentage).toFixed(1)) {
                return
            }
        }

        for(var i in data) {

            if(data[i].key === parentId[0]) {
                if(parentId.length === 1 && data[i].children) {
                    data[i].changeInMinSpend = changePercentage*data[i].spend
                    data[i].changeInMinSpendPercentage = value
                    for(var j in data[i].children) {
                        data[i].children[j].changeInMinSpend = changePercentage*data[i].children[j].spend
                        data[i].children[j].changeInMinSpendPercentage = value
                        if(data[i].children[j].children) {
                            for(var k in data[i].children[j].children) {
                                data[i].children[j].children[k].changeInMinSpend = changePercentage*data[i].children[j].children[k].spend
                                data[i].children[j].children[k].changeInMinSpendPercentage = value
                            }
                        }
                    }
                }
                if(parentId.length === 2 && data[i].children) {
                    data[i].changeInMinSpend = 0
                    for(var j in data[i].children) {
                        if(data[i].children[j].key === `${parentId[0]}_${parentId[1]}`) {
                            data[i].children[j].changeInMinSpend = changePercentage*data[i].children[j].spend
                            data[i].children[j].changeInMinSpendPercentage = value
                            if(data[i].children[j].children) {
                                for(var k in data[i].children[j].children) {
                                    data[i].children[j].children[k].changeInMinSpend = changePercentage*data[i].children[j].children[k].spend
                                    data[i].children[j].children[k].changeInMinSpendPercentage = value
                                }
                            }
                        }
                        data[i].changeInMinSpend = Math.round(data[i].changeInMinSpend) + Math.round(data[i].children[j].changeInMinSpend)
                        data[i].changeInMinSpendPercentage = this.getChangePercentage(data[i].changeInMinSpend, data[i].spend)
                    }
                }
                if(parentId.length === 3 && data[i].children) {
                    data[i].changeInMinSpend = 0
                    for(var j in data[i].children) {
                        data[i].children[j].changeInMinSpend = 0
                        if(data[i].children[j].key === `${parentId[0]}_${parentId[1]}`) {
                            if(data[i].children[j].children) {
                                for(var k in data[i].children[j].children) {
                                    if(data[i].children[j].children[k].key === `${parentId[0]}_${parentId[1]}_${parentId[2]}`) {
                                        data[i].children[j].children[k].changeInMinSpend = changePercentage*data[i].children[j].children[k].spend
                                        data[i].children[j].children[k].changeInMinSpendPercentage = value
                                    }
                                    data[i].children[j].changeInMinSpend = Math.round(data[i].children[j].changeInMinSpend) + Math.round(data[i].children[j].children[k].changeInMinSpend)
                                    data[i].children[j].changeInMinSpendPercentage = this.getChangePercentage(data[i].children[j].changeInMinSpend, data[i].children[j].spend)
                                }
                            }
                        }
                        data[i].changeInMinSpend = Math.round(data[i].changeInMinSpend) + Math.round(data[i].children[j].changeInMinSpend)
                        data[i].changeInMinSpendPercentage = this.getChangePercentage(data[i].changeInMinSpend, data[i].spend)
                    }
                }
            }
            outputData.push(data[i])
        }

        this.props.handleChangeSpendData(outputData)
    }

    render() {
        const { brandList, scenarioName, geographyList, minimizeSpendValue, optimizationType, maximizeRevenueValue, periodValue, tacticValue, subBrandValue, showColumns, changeShowColumns, spendData, keyHighlights } = this.props
        const columns = [
            { title: 'Tactic', dataIndex: 'tactic', key: 'tactic', className: 'leftAlign', render: (text, record) => <span className="borderRight">{text}</span>, },
            { title: 'Spend', dataIndex: 'spend', key: 'spend', render: (spend, record) => {
                const content = (
                    <div className="spenTooltip">
                        <div>{record.newSpend && <strong>Old</strong> } {`$${Math.round(spend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                        
                        {record.newSpend && 
                            <div><strong>New</strong> {`$${Math.round(record.newSpend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                        }            
                        {record.newSpend && Math.round(record.newSpend) - Math.round(spend) != 0 ?
                            Math.round(record.newSpend) - Math.round(spend) > 0 ?
                                <div className="newSpend positive">
                                    <span className="title">Change</span>
                                    <span>${Math.round(Math.round(record.newSpend) - Math.round(spend)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                    <span className="pipe">||</span>
                                    <span>{parseFloat(((Math.round(record.newSpend) - Math.round(spend))/Math.round(spend))*100).toFixed(2)}%</span>
                                </div>
                                :
                                <div className="newSpend negitive">
                                    <span className="title">Change</span>
                                    <span>${Math.round(Math.round(record.newSpend) - Math.round(spend)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                    <span className="pipe">||</span>
                                    <span>{parseFloat(((Math.round(record.newSpend) - Math.round(spend))/Math.round(spend))*100).toFixed(2)}%</span>
                                </div>
                            :
                            <div className="newSpend">$0</div>
                        }
                    </div>
                  );

                return <span className="borderRight">
                <InputNumber defaultValue={spend}  id={`oldspend_${record.key}`} className="hide" />
                {record.newSpend && Math.round(record.newSpend) - Math.round(spend) != 0 ?
                    Math.round(record.newSpend) - Math.round(spend) > 0 ?
                        <div className="newSpend positive">
                            <span>{`$${Math.round(spend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                            <span className="pipe">||</span>
                            <span>{parseFloat(((Math.round(record.newSpend) - Math.round(spend))/Math.round(spend))*100).toFixed(2)}%</span>
                            <Popover content={content} className="toolPop" ><InfoCircleFilled /></Popover>
                        </div>
                        :
                        <div className="newSpend negitive">
                            <span>{`$${Math.round(spend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                            <span className="pipe">||</span>
                            <span>{parseFloat(((Math.round(record.newSpend) - Math.round(spend))/Math.round(spend))*100).toFixed(2)}%</span>
                            <Popover content={content} className="toolPop"><InfoCircleFilled /></Popover>
                        </div>
                    :
                    <div className="newSpend"><span>{`$${Math.round(spend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span></div>
                }
                
                </span>
            }},
            // { title: 'Profit', dataIndex: 'profit', key: 'profit', render: (profit, record) => (
            //    <span>
            //        <div>{record.newProfit && <strong>Old</strong> } {`$${Math.round(profit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
            //         {record.newProfit && 
            //             <div><strong>New</strong> {`$${Math.round(record.newProfit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
            //         }    
            //        {record.newProfit && Math.round(record.newProfit) - Math.round(profit) != 0 ?
            //             Math.round(record.newProfit) - Math.round(profit) > 0 ?
            //                 <div className="newSpend positive">
            //                     <div>${Math.round(Math.round(record.newProfit) - Math.round(profit)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            //                     <div>{Math.round((Math.round(Math.round(record.newProfit) - Math.round(profit))*100)/Math.round(profit))}%</div>
            //                 </div>
            //                 :
            //                 <div className="newSpend negitive">
            //                     <div>${Math.round(Math.round(record.newProfit) - Math.round(profit)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            //                     <div>{Math.round((Math.round(Math.round(record.newProfit) - Math.round(profit))*100)/Math.round(profit))}%</div>
            //                 </div>
            //             :
            //             <div className="newSpend">$0</div>
            //         }
            //     </span>
            // )},
            { title: 'Revenue', dataIndex: 'revenue', key: 'revenue', render: (revenue, record) => {
                const content = (
                    <div className="spenTooltip">
                        <div>{record.newRevenue && <strong>Old</strong> } {`$${Math.round(revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                    {record.newRevenue && 
                        <div><strong>New</strong> {`$${Math.round(record.newRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                    } 
                    {record.newRevenue && Math.round(record.newRevenue) - Math.round(revenue) != 0 ?
                        Math.round(record.newRevenue) - Math.round(revenue) > 0 ?
                            <div className="newSpend positive">
                                <span className="title">Change</span>
                                    <span>${Math.round(Math.round(record.newRevenue) - Math.round(revenue)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                    <span className="pipe">||</span>
                                    <span>{parseFloat(((Math.round(record.newRevenue) - Math.round(revenue))/Math.round(revenue))*100).toFixed(2)}%</span>
                            </div>
                            :
                            <div className="newSpend negitive">
                                <span className="title">Change</span>
                                    <span>${Math.round(Math.round(record.newRevenue) - Math.round(revenue)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                    <span className="pipe">||</span>
                                    <span>{parseFloat(((Math.round(record.newRevenue) - Math.round(revenue))/Math.round(revenue))*100).toFixed(2)}%</span>
                            </div>
                        :
                        <div className="newSpend">$0</div>
                    }
                    </div>
                  );
                return <span className="borderRight">
                    {/* <div>{record.newRevenue && <strong>Old</strong> } {`$${Math.round(revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                    {record.newRevenue && 
                        <div><strong>New</strong> {`$${Math.round(record.newRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                    }  */}
                    {record.newRevenue && Math.round(record.newRevenue) - Math.round(revenue) != 0 ?
                        Math.round(record.newRevenue) - Math.round(revenue) > 0 ?
                            <div className="newSpend positive">
                                <span>{`$${Math.round(revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                <span className="pipe">||</span>
                                <span>{parseFloat(((Math.round(record.newRevenue) - Math.round(revenue))/Math.round(revenue))*100).toFixed(2)}%</span>
                                <Popover content={content} className="toolPop"><InfoCircleFilled /></Popover>
                            </div>
                            :
                            <div className="newSpend negitive">
                               <span>{`$${Math.round(revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                <span className="pipe">||</span>
                                <span>{parseFloat(((Math.round(record.newRevenue) - Math.round(revenue))/Math.round(revenue))*100).toFixed(2)}%</span>
                                <Popover content={content} className="toolPop"><InfoCircleFilled /></Popover>
                            </div>
                        :
                        <div className="newSpend"><span>{`$${Math.round(revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span></div>
                    }
                </span>
            }},
            { title: 'ROI', dataIndex: 'roi', key: 'roi', render: (roi, record) => {
                const content = (
                    <div className="spenTooltip">
                        <div>{record.newROI && <strong>Old</strong> } {`$${parseFloat(roi).toFixed(2)}`}</div>
                    {record.newROI && 
                        <div><strong>New</strong> {`$${parseFloat(record.newROI).toFixed(2)}`}</div>
                    } 
                    {record.newROI && parseFloat(record.newROI).toFixed(2) - parseFloat(roi).toFixed(2) != 0 ?
                        parseFloat(record.newROI).toFixed(2) - parseFloat(roi).toFixed(2) > 0 ?
                            <div className="newSpend positive">
                                <span className="title">Change</span>
                                    <span>${parseFloat(parseFloat(record.newROI).toFixed(2) - parseFloat(roi).toFixed(2)).toFixed(2)}</span>
                                    <span className="pipe">||</span>
                                    <span>{parseFloat(((parseFloat(record.newROI).toFixed(2) - parseFloat(roi).toFixed(2))/parseFloat(roi).toFixed(2))*100).toFixed(2)}%</span>
                            </div>
                            :
                            <div className="newSpend negitive">
                                <span className="title">Change</span>
                                    <span>${parseFloat(parseFloat(record.newROI).toFixed(2) - parseFloat(roi).toFixed(2)).toFixed(2)}</span>
                                    <span className="pipe">||</span>
                                    <span>{parseFloat(((parseFloat(record.newROI).toFixed(2) - parseFloat(roi).toFixed(2))/parseFloat(roi).toFixed(2))*100).toFixed(2)}%</span>
                            </div>
                        :
                        <div className="newSpend">$0.00</div>
                    }
                    </div>
                  );
                return <span className="borderRight">
                    {record.newROI && parseFloat(record.newROI).toFixed(2) - parseFloat(roi).toFixed(2) != 0 ?
                        parseFloat(record.newROI).toFixed(2) - parseFloat(roi).toFixed(2) > 0 ?
                            <div className="newSpend positive">
                                <span>{`$${parseFloat(roi).toFixed(2)}`}</span>
                                <span className="pipe">||</span>
                                <span>{parseFloat(((parseFloat(record.newROI).toFixed(2) - parseFloat(roi).toFixed(2))/parseFloat(roi).toFixed(2))*100).toFixed(2)}%</span>
                                <Popover content={content} className="toolPop"><InfoCircleFilled /></Popover>
                            </div>
                            :
                            <div className="newSpend negitive">
                                <span>{`$${parseFloat(roi).toFixed(2)}`}</span>
                                <span className="pipe">||</span>
                                <span>{parseFloat(((parseFloat(record.newROI).toFixed(2) - parseFloat(roi).toFixed(2))/parseFloat(roi).toFixed(2))*100).toFixed(2)}%</span>
                                <Popover content={content} className="toolPop"><InfoCircleFilled /></Popover>
                            </div>
                        :
                        <div className="newSpend"><span>{`$${parseFloat(roi).toFixed(2)}`}</span></div>
                    }
                </span>
            }},
             { title: 'Minimum Spending', className: 'maxTdSpend', dataIndex: 'changeInMinSpend', key: 'changeInMinSpend', render: (changeInMinSpend, record) => (
                <span className="borderRight">
                    <InputNumber disabled={record.spend <=0}  max={Math.round(record.changeInMaxSpend)} value={`${Math.round(changeInMinSpend)}`} onBlur={(e) => this.handleChangeInMinSpend(e)} onKeyUp={(e) => e.key === 'Enter' && this.handleChangeInMinSpend(e)} id={`minspend_${record.key}`} />
                    <InputNumber className="maxTdSpendPer" disabled={record.spend <=0} min={-100} max={record.changeInMaxSpendPercentage} value={`${parseFloat(record.changeInMinSpendPercentage).toFixed(1)}`} onBlur={(e) => this.handleChangeInMinSpendPercentage(e)} onKeyUp={(e) => e.key === 'Enter' && this.handleChangeInMinSpendPercentage(e)} id={`minpercentage_${record.key}`} formatter={value => `${value}%`} parser={value => value.replace('%', '')} />
                </span>
            )},
            { title: 'Maximum Spending', className: 'maxTdSpend', dataIndex: 'changeInMaxSpend', key: 'changeInMaxSpend', render: (changeInMaxSpend, record) => (
                <span>
                    <InputNumber disabled={record.spend <=0} min={Math.round(record.changeInMinSpend)} value={`${Math.round(changeInMaxSpend)}`} onBlur={(e) => this.handleChangeInMaxSpend(e)} onKeyUp={(e) => e.key === 'Enter' && this.handleChangeInMaxSpend(e)} id={`maxspend_${record.key}`} />
                    <InputNumber className="maxTdSpendPer" disabled={record.spend <=0} min={record.changeInMinSpendPercentage} value={`${parseFloat(record.changeInMaxSpendPercentage).toFixed(1)}`} onBlur={(e) => this.handleChangeInMaxSpendPercentage(e)} onKeyUp={(e) => e.key === 'Enter' && this.handleChangeInMaxSpendPercentage(e)} id={`maxpercentage_${record.key}`} formatter={value => `${value}%`} parser={value => value.replace('%', '')} />
                </span>
            )},
        ];
        const tableData = spendData
        const columnsKey = [
            { title: 'Tactic', dataIndex: 'tactic', key: 'tactic', className: 'leftAlign', render: (text, record) => <span className="borderRight">{text}</span>, },
            { title: 'Spend', dataIndex: 'spend', key: 'spend', render: (spend, record) => (
                <span className="borderRight">
                    {record.tactic && record.tactic === 'Change' ?
                            spend >= 0 ?
                            <span className="positive">
                                <span>{`$${Math.round(spend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                <span className="pipe">||</span>
                                <span>{`${Math.round(record.spendPercentage)}%`}</span>
                            </span>
                            :
                            <span className="negitive">
                                <span>{`$${Math.round(spend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                <span className="pipe">||</span>
                                <span>{`${Math.round(record.spendPercentage)}%`}</span>
                            </span>
                        :
                        <span>{`$${Math.round(spend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                    }
                </span>
             )},
            { title: 'Revenue', dataIndex: 'revenue', key: 'revenue', render: (revenue, record) => (
                <span className="borderRight">
                    {record.tactic && record.tactic === 'Change' ?
                            revenue >= 0 ?
                            <span className="positive">
                                <span>{`$${Math.round(revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                <span className="pipe">||</span>
                                <span>{`${Math.round(record.revenuePercentage)}%`}</span>
                            </span>
                            :
                            <span className="negitive">
                                <span>{`$${Math.round(revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                <span className="pipe">||</span>
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
                                <span className="pipe">||</span>
                                <span>{`${parseFloat(record.roiPercentage).toFixed(2)}%`}</span>
                            </span>
                            :
                            <span className="negitive">
                                <span>{`$${parseFloat(roi).toFixed(2)}`}</span>
                                <span className="pipe">||</span>
                                <span>{`${parseFloat(record.roiPercentage).toFixed(2)}%`}</span>
                            </span>
                        :
                        <span>{`$${parseFloat(roi).toFixed(2)}`}</span>
                    }
                </span>
             )},
            //  { title: 'Minimum Spending', className: 'maxTD', dataIndex: 'minimumSpending', key: 'minimumSpending', render: (minimumSpending, record) => (
            //     <span>
            //         {record.tactic && record.tactic === 'Change' ?
            //                 minimumSpending >= 0 ?
            //                 <span className="positive">{`${parseFloat(minimumSpending).toFixed(2)}`}</span>
            //                 :
            //                 <span className="negitive">{`${parseFloat(minimumSpending).toFixed(2)}`}</span>
            //             :
            //             <span>{`${parseFloat(minimumSpending).toFixed(2)}`}</span>
            //         }
            //     </span>
            //  )},
            //  { title: 'Maximum Spending', className: 'maxTD', dataIndex: 'maximumSpending', key: 'maximumSpending', render: (maximumSpending, record) => (
            //     <span>
            //         {record.tactic && record.tactic === 'Change' ?
            //                 maximumSpending >= 0 ?
            //                 <span className="positive">{`${parseFloat(maximumSpending).toFixed(2)}`}</span>
            //                 :
            //                 <span className="negitive">{`${parseFloat(maximumSpending).toFixed(2)}`}</span>
            //             :
            //             <span>{`${parseFloat(maximumSpending).toFixed(2)}`}</span>
            //         }
            //     </span>
            //  )},
        ];
    
            return (
                <div className="simulateDetails">
                    <div className="detailsHead">
                        <Title><Icon type="edit" className="icon" /> {scenarioName}</Title>
                        {brandList.length > 0 &&
                        <div className="FilterSelection">
                            {brandList && brandList.length > 0 &&
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
                            {geographyList && geographyList.length > 0 &&
                                <span>
                                    <span className="pipe">||</span>
                                    Geography: {
                                    geographyList}
                                </span>
                            }
                            {/* {subBrandValue && subBrandValue.length > 0 &&
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
                            {periodValue && periodValue.length > 0 &&
                                <span>
                                    <span className="pipe">||</span>
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
                            {optimizationType && optimizationType.length > 0 &&
                                <span>
                                    <span className="pipe">||</span>
                                    Optimization Type: {
                                    optimizationType}
                                </span>
                            }
                            {optimizationType && optimizationType.length > 0 && optimizationType == 'Minimize Spend' &&
                                <span>
                                    <span className="pipe">||</span>
                                    Revenue Goal: {Math.round(minimizeSpendValue)+100}%
                                </span>
                            }
                            {optimizationType && optimizationType.length > 0 && optimizationType == 'Maximize Revenue' &&
                                <span>
                                    <span className="pipe">||</span>
                                    Spend Constraint: {Math.round(maximizeRevenueValue)+100}%
                                </span>
                            }
                        </div>
                    }
                </div>
                {
                    brandList.length > 0 && geographyList.length > 0 && periodValue.length > 0 && tacticValue.length > 0 && subBrandValue.length > 0 &&
                    <div className="simulatorTableData">
                        <ColoredScrollbars>
                        {
                            keyHighlights.length > 0 &&
                            <div className="simulateHeader">
                                <h3 className="keyHeading"><span className="smallLeftBorder"></span> Key Highlights</h3>
                                <div className="simulateTable">
                                
                                <Table
                                    className="components-table-demo-nested"
                                    columns={columnsKey}
                                    pagination={false}
                                    dataSource={keyHighlights}
                                />
                                </div>
                            </div>
                        }
                        {
                            tableData && tableData.length > 0 &&
                            <div className="simulateHeader noMargin">
                                <h3 className="keyHeading">
                                <span className="smallLeftBorder"></span> Spending Constraints
                                    {/* <p className="selectedOptions">Geography: {geographyList}</p>
                                    <p className="selectedOptions">Time Period: {periodValue}</p>
                                    {
                                        optimizationType == 'Minimize Spend' && 
                                        <p className="selectedOptions">Revenue Goal: {Math.round(minimizeSpendValue)+100}%</p>
                                    }
                                    {
                                        optimizationType == 'Maximize Revenue' && 
                                        <p className="selectedOptions">Spend Constraint: {Math.round(maximizeRevenueValue)+100}%</p>
                                    } */}
                                </h3>
                                <div className="simulateTable">
                                <Table
                                    className="components-table-demo-nested"
                                    columns={columns}
                                    dataSource={tableData}
                                    pagination={false}
                                />
                                </div>
                            </div>
                        }
                    </ColoredScrollbars>
                    </div>
                }
                </div>
            )
          }

}


export default OptimizerDetails
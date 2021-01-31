import React, {Fragment} from 'react'
import { Tabs, Table, Switch, Icon, InputNumber, Typography, Popover, Tooltip, Button, Modal  } from 'antd';
import { InfoCircleFilled, BarChartOutlined } from '@ant-design/icons';
import ColoredScrollbars from '../common/ColoredScrollbars';
import SpendCharts from './SpendCharts'
import KeyHighlightsCharts from './KeyHighlightsCharts'
import ROICharts from './ROICharts'

const { TabPane } = Tabs;
const { Title } = Typography;

export class OptimizerDetails extends React.Component {

    state = {
        spendVisible: false,
        revenuVisible: false,
        roiVisible: false,
        revenuLTVisible: false,
        roiLTVisible: false,
        keyVisible: false,
    }

    showKeyModal = () => {
        this.setState({
            keyVisible: true,
        });
      };
    
      handleKeyOk = e => {
        this.setState({
            keyVisible: false,
        });
      };
    
      handleKeyCancel = e => {
        this.setState({
            keyVisible: false,
        });
      }


    showSpendModal = () => {
        this.setState({
            spendVisible: true,
        });
      };
    
      handleSpendOk = e => {
        this.setState({
            spendVisible: false,
        });
      };
    
      handleSpendCancel = e => {
        this.setState({
            spendVisible: false,
        });
      }

      showRevenuModal = () => {
        this.setState({
            revenuVisible: true,
        });
      };
    
      handleRevenuOk = e => {
        this.setState({
            revenuVisible: false,
        });
      };
    
      handleRevenuCancel = e => {
        this.setState({
            revenuVisible: false,
        });
      }

      showROIModal = () => {
        this.setState({
            roiVisible: true,
        });
      };
    
      handleROIOk = e => {
        this.setState({
            roiVisible: false,
        });
      };
    
      handleROICancel = e => {
        this.setState({
            roiVisible: false,
        });
      }

      showRevenuLTModal = () => {
        this.setState({
            revenuLTVisible: true,
        });
      };
    
      handleRevenuLTOk = e => {
        this.setState({
            revenuLTVisible: false,
        });
      };
    
      handleRevenuLTCancel = e => {
        this.setState({
            revenuLTVisible: false,
        });
      }

      showROILTModal = () => {
        this.setState({
            roiLTVisible: true,
        });
      };
    
      handleROILTOk = e => {
        this.setState({
            roiLTVisible: false,
        });
      };
    
      handleROILTCancel = e => {
        this.setState({
            roiLTVisible: false,
        });
      }


    getChangePercentage = (change, oldValue) => {
        return ((change/oldValue)*100)-100
    }
    getChangeSpend = (oldPercentage, changeValue) => {
        return (Math.round(oldPercentage) * Math.round(changeValue))/100
    }

    handleChangeInMaxSpend = (e) => {
        const data = this.props.spendData;
        const id = e.target.id.split('maxspend_')
        let changeSpend = e.target.value
        const spend = document.getElementById('oldspend_'+id[1]).value
        const parentId = id[1].split('_')
        const changeDiff = changeSpend - spend

        const minSpend = document.getElementById('minspend_'+id[1]).value

        if (changeSpend === "") {
            changeSpend = ((spend * (9999+100))/100)
        }

        if (minSpend-changeSpend > 0) {
            changeSpend = minSpend;
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
        let value = e.target.value === "%" ?  9999 : parseFloat(e.target.value)
        const spend = document.getElementById('oldspend_'+id[1]).value
        let changePercentage = ((value + 100)/100)
        const parentId = id[1].split('_')
        const changeDiff = changePercentage*spend - spend

        const minSpend = document.getElementById('minspend_'+id[1]).value

        if (parseInt(minSpend-Math.round(changePercentage*spend)) > 0) {
            changePercentage = Math.round(this.getChangePercentage(minSpend, spend))
            value = Math.round(this.getChangePercentage(minSpend, spend))
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
        const spend = document.getElementById('oldspend_'+id[1]).value
        let changeSpend = e.target.value === "" ? 0 : e.target.value
        const parentId = id[1].split('_')
        const changeDiff = changeSpend - spend

        let maxSpend = document.getElementById('maxspend_'+id[1]).value
        maxSpend = maxSpend === "" ? ((spend * (9999+100))/100) : maxSpend;

        console.log(changeSpend, maxSpend, "spendValues")
        if (changeSpend-maxSpend > 0) {
            changeSpend = maxSpend;
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
        let value = e.target.value === "%" ?  -100 : parseFloat(e.target.value)
        let changePercentage = value === "-100" ? 0.01 : ((value + 100)/100)
        const spend = document.getElementById('oldspend_'+id[1]).value
        const parentId = id[1].split('_')
        const changeDiff = changePercentage*spend - spend
        let maxSpend = document.getElementById('maxspend_'+id[1]).value
        maxSpend = maxSpend === "" ? ((spend * (9999+100))/100) : maxSpend;

        // if (parseInt(minSpend-Math.round(changePercentage*spend)) > 0) {
        //     changePercentage = Math.round(this.getChangePercentage(minSpend, spend))
        //     value = Math.round(this.getChangePercentage(minSpend, spend))
        //     alert("Maximum Spending should be >= Minimum Spending")
        // }

        //console.log(Math.round(changePercentage*spend), maxSpend, parseInt(changePercentage*spend-maxSpend))
        if (parseInt(changePercentage*spend-maxSpend) > 0) {
            changePercentage = Math.round(this.getChangePercentage(maxSpend, spend))
            value = Math.round(this.getChangePercentage(maxSpend, spend))
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
        const { brandList, scenarioName, Globalgeagraphy, geographyList, minimizeSpendValue, optimizationType, maximizeRevenueValue, periodValue, tacticValue, subBrandValue, showColumns, changeShowColumns, showProfit, changeShowProfit, spendData, constraintsVal, keyHighlights, profitValueData } = this.props
        const columns = [
            { fixed: 'left', width: 300, title: 'Tactic', dataIndex: 'tactic', key: 'tactic', className: 'leftAlign', render: (text, record) => <span className="borderRight">{text}</span>, },
            { width: 200, title: <span>Spend <BarChartOutlined className="linkToCharts" onClick={this.showSpendModal} /></span>, dataIndex: 'spend', key: 'spend', render: (spend, record) => {
                const content = (
                    <div className="spenTooltip">
                        <div>{record.newSpend && <strong>Old</strong> } {`${sessionStorage.getItem('symbolVal')}${Math.round(spend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                        
                        {record.newSpend && 
                            <div><strong>New</strong> {`${sessionStorage.getItem('symbolVal')}${Math.round(record.newSpend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                        }            
                        {record.newSpend && Math.round(record.newSpend) - Math.round(spend) != 0 ?
                            Math.round(record.newSpend) - Math.round(spend) > 0 ?
                                <div className="newSpend positive">
                                    <span className="title">Change</span>
                                    <span>{sessionStorage.getItem('symbolVal')}{Math.round(Math.round(record.newSpend) - Math.round(spend)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                    <span className="pipe">||</span>
                                    <span>{Math.round(((Math.round(record.newSpend) - Math.round(spend))/Math.round(spend))*100)}%</span>
                                </div>
                                :
                                <div className="newSpend negitive">
                                    <span className="title">Change</span>
                                    <span>{sessionStorage.getItem('symbolVal')}{Math.round(Math.round(record.newSpend) - Math.round(spend)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                    <span className="pipe">||</span>
                                    <span>{Math.round(((Math.round(record.newSpend) - Math.round(spend))/Math.round(spend))*100)}%</span>
                                </div>
                            :
                            <div className="newSpend">{sessionStorage.getItem('symbolVal')}0</div>
                        }
                    </div>
                  );

                return <span className="borderRight">
                <InputNumber defaultValue={spend}  id={`oldspend_${record.key}`} className="hide" />
                {record.newSpend && Math.round(record.newSpend) - Math.round(spend) != 0 ?
                    Math.round(record.newSpend) - Math.round(spend) > 0 ?
                        <div className="newSpend positive">
                            <span className="oldSpend">{`${sessionStorage.getItem('symbolVal')}${Math.round(record.newSpend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                            <span className="pipe">||</span>
                            <span>{Math.round(((Math.round(record.newSpend) - Math.round(spend))/Math.round(spend))*100)}%</span>
                            <Popover content={content} className="toolPop" ><InfoCircleFilled /></Popover>
                        </div>
                        :
                        <div className="newSpend negitive">
                            <span className="oldSpend">{`${sessionStorage.getItem('symbolVal')}${Math.round(record.newSpend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                            <span className="pipe">||</span>
                            <span>{Math.round(((Math.round(record.newSpend) - Math.round(spend))/Math.round(spend))*100)}%</span>
                            <Popover content={content} className="toolPop"><InfoCircleFilled /></Popover>
                        </div>
                    :
                    <div className="newSpend"><span>{`${sessionStorage.getItem('symbolVal')}${Math.round(spend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span></div>
                }
                
                </span>
            }},
            
            { width: 200, title: <span>Inc Revenue <BarChartOutlined className="linkToCharts" onClick={this.showRevenuModal} /></span>, dataIndex: 'revenue', key: 'revenue', render: (revenue, record) => {
                const content = (
                    <div className="spenTooltip">
                        <div>{record.newRevenue && <strong>Old</strong> } {`${sessionStorage.getItem('symbolVal')}${Math.round(revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                    {record.newRevenue && 
                        <div><strong>New</strong> {`${sessionStorage.getItem('symbolVal')}${Math.round(record.newRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                    } 
                    {record.newRevenue && Math.round(record.newRevenue) - Math.round(revenue) != 0 ?
                        Math.round(record.newRevenue) - Math.round(revenue) > 0 ?
                            <div className="newSpend positive">
                                <span className="title">Change</span>
                                    <span>{sessionStorage.getItem('symbolVal')}{Math.round(Math.round(record.newRevenue) - Math.round(revenue)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                    <span className="pipe">||</span>
                                    <span>{Math.round(((Math.round(record.newRevenue) - Math.round(revenue))/Math.round(revenue))*100)}%</span>
                            </div>
                            :
                            <div className="newSpend negitive">
                                <span className="title">Change</span>
                                    <span>{sessionStorage.getItem('symbolVal')}{Math.round(Math.round(record.newRevenue) - Math.round(revenue)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                    <span className="pipe">||</span>
                                    <span>{Math.round(((Math.round(record.newRevenue) - Math.round(revenue))/Math.round(revenue))*100)}%</span>
                            </div>
                        :
                        <div className="newSpend">$0</div>
                    }
                    </div>
                  );
                return <span className="borderRight">
                    {record.newRevenue && Math.round(record.newRevenue) - Math.round(revenue) != 0 ?
                        Math.round(record.newRevenue) - Math.round(revenue) > 0 ?
                            <div className="newSpend positive">
                                <span className="oldSpend">{`${sessionStorage.getItem('symbolVal')}${Math.round(record.newRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                <span className="pipe">||</span>
                                <span>{Math.round(((Math.round(record.newRevenue) - Math.round(revenue))/Math.round(revenue))*100)}%</span>
                                <Popover content={content} className="toolPop"><InfoCircleFilled /></Popover>
                            </div>
                            :
                            <div className="newSpend negitive">
                               <span className="oldSpend">{`${sessionStorage.getItem('symbolVal')}${Math.round(record.newRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                <span className="pipe">||</span>
                                <span>{Math.round(((Math.round(record.newRevenue) - Math.round(revenue))/Math.round(revenue))*100)}%</span>
                                <Popover content={content} className="toolPop"><InfoCircleFilled /></Popover>
                            </div>
                        :
                        <div className="newSpend"><span>{`${sessionStorage.getItem('symbolVal')}${Math.round(revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span></div>
                    }
                </span>
            }},
            { width: 200, title: <span>{showProfit ? "Profit ROI" : "Inc ROI"} <BarChartOutlined className="linkToCharts" onClick={this.showROIModal} /></span>, dataIndex: 'roi', key: 'roi', render: (roi, record) => {
                const content = (
                    <div className="spenTooltip">
                        <div>{record.newROI && <strong>Old</strong> }
                            {
                                showProfit ? 
                                `${sessionStorage.getItem('symbolVal')}${Math.round(((roi*profitValueData)/100)*100)/100}`
                                :
                                `${sessionStorage.getItem('symbolVal')}${Math.round(roi*100)/100}`
                            // `${sessionStorage.getItem('symbolVal')}${parseFloat(roi).toFixed(2)}`
                            }
                        </div>
                    {record.newROI && 
                        <div><strong>New</strong> 
                            {
                                showProfit ? 
                                `${sessionStorage.getItem('symbolVal')}${Math.round(((record.newROI*profitValueData)/100)*100)/100}`
                                :
                                `${sessionStorage.getItem('symbolVal')}${Math.round(record.newROI*100)/100}`
                                // `${sessionStorage.getItem('symbolVal')}${parseFloat(record.newROI).toFixed(2)}`
                            }
                        </div>
                    } 
                    {record.newROI && parseFloat(record.newROI).toFixed(3) - parseFloat(roi).toFixed(3) != 0 ?
                        parseFloat(record.newROI) - parseFloat(roi) > 0 ?
                            <div className="newSpend positive">
                                <span className="title">Change</span>
                                <span>
                                    {
                                        showProfit ? 
                                        `${sessionStorage.getItem('symbolVal')}${Math.round(((record.newROI*profitValueData)/100 - (roi*profitValueData)/100)*100)/100}`
                                        :
                                        `${sessionStorage.getItem('symbolVal')}${Math.round((record.newROI - roi)*100)/100}`
                                    }
                                </span>
                                <span className="pipe">||</span>
                                <span>{Math.round(((record.newROI - roi)/roi)*10000)/100}%</span>
                            </div>
                            :
                            <div className="newSpend negitive">
                                <span className="title">Change</span>
                                <span>
                                    {
                                        showProfit ? 
                                        `${sessionStorage.getItem('symbolVal')}${Math.round(((record.newROI*profitValueData)/100 - (roi*profitValueData)/100)*100)/100}`
                                        :
                                        `${sessionStorage.getItem('symbolVal')}${Math.round((record.newROI - roi)*100)/100}`
                                    }
                                </span>
                                <span className="pipe">||</span>
                                <span>{Math.round(((record.newROI - roi)/roi)*10000)/100}%</span>
                            </div>
                        :
                        <div className="newSpend">{sessionStorage.getItem('symbolVal')}0.00</div>
                    }
                    </div>
                  );
                return <span>
                    {record.newROI && parseFloat(record.newROI).toFixed(3) - parseFloat(roi).toFixed(3) != 0 ?
                        parseFloat(record.newROI) - parseFloat(roi) > 0 ?
                            <div className="newSpend positive">
                                <span className="oldSpend">
                                    {
                                        showProfit ? 
                                        `${sessionStorage.getItem('symbolVal')}${Math.round(((record.newROI*profitValueData)/100)*100)/100}`
                                        :
                                        `${sessionStorage.getItem('symbolVal')}${Math.round(record.newROI*100)/100}`
                                        // `${sessionStorage.getItem('symbolVal')}${parseFloat(record.newROI).toFixed(2)}`
                                    }
                                </span>
                                <span className="pipe">||</span>
                                <span>{Math.round(((record.newROI - roi)/roi)*10000)/100}%</span>
                                <Popover content={content} className="toolPop"><InfoCircleFilled /></Popover>
                            </div>
                            :
                            <div className="newSpend negitive">
                                <span className="oldSpend">
                                    {
                                        showProfit ? 
                                        `${sessionStorage.getItem('symbolVal')}${Math.round(((record.newROI*profitValueData)/100)*100)/100}`
                                        :
                                        `${sessionStorage.getItem('symbolVal')}${Math.round(record.newROI*100)/100}`
                                        // `${sessionStorage.getItem('symbolVal')}${parseFloat(record.newROI).toFixed(2)}`
                                    }
                                </span>
                                <span className="pipe">||</span>
                                <span>{Math.round(((record.newROI - roi)/roi)*10000)/100}%</span>
                                <Popover content={content} className="toolPop"><InfoCircleFilled /></Popover>
                            </div>
                        :
                        <div className="newSpend">
                            <span>
                                {
                                    showProfit ? 
                                    `${sessionStorage.getItem('symbolVal')}${Math.round(((roi*profitValueData)/100)*100)/100}`
                                    :
                                    `${sessionStorage.getItem('symbolVal')}${Math.round(roi*100)/100}`
                                    // `${sessionStorage.getItem('symbolVal')}${parseFloat(record.newROI).toFixed(2)}`
                                }
                            </span>
                        </div>
                    }
                </span>
            }},
            { width: 200, title: <span>Brand Revenue <BarChartOutlined className="linkToCharts" onClick={this.showRevenuLTModal} /></span>, dataIndex: 'oldLTRevenue', key: 'oldLTRevenue', render: (oldLTRevenue, record) => {
                const content = (
                    <div className="spenTooltip">
                        <div>{record.newLTRevenue && <strong>Old</strong> } {`${sessionStorage.getItem('symbolVal')}${Math.round(oldLTRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                    {record.newLTRevenue && 
                        <div><strong>New</strong> {`${sessionStorage.getItem('symbolVal')}${Math.round(record.newLTRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                    } 
                    {record.newLTRevenue && Math.round(record.newLTRevenue) - Math.round(oldLTRevenue) != 0 ?
                        Math.round(record.newLTRevenue) - Math.round(oldLTRevenue) > 0 ?
                            <div className="newSpend positive">
                                <span className="title">Change</span>
                                    <span>${Math.round(Math.round(record.newLTRevenue) - Math.round(oldLTRevenue)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                    <span className="pipe">||</span>
                                    <span>{Math.round(((Math.round(record.newLTRevenue) - Math.round(oldLTRevenue))/Math.round(oldLTRevenue))*100)}%</span>
                            </div>
                            :
                            <div className="newSpend negitive">
                                <span className="title">Change</span>
                                    <span>${Math.round(Math.round(record.newLTRevenue) - Math.round(oldLTRevenue)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                    <span className="pipe">||</span>
                                    <span>{Math.round(((Math.round(record.newLTRevenue) - Math.round(oldLTRevenue))/Math.round(oldLTRevenue))*100)}%</span>
                            </div>
                        :
                        <div className="newSpend">$0</div>
                    }
                    </div>
                  );
                return <span className="borderRight">
                    {record.newLTRevenue && Math.round(record.newLTRevenue) - Math.round(oldLTRevenue) != 0 ?
                        Math.round(record.newLTRevenue) - Math.round(oldLTRevenue) > 0 ?
                            <div className="newSpend positive">
                                <span className="oldSpend">{`${sessionStorage.getItem('symbolVal')}${Math.round(record.newLTRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                <span className="pipe">||</span>
                                <span>{Math.round(((Math.round(record.newLTRevenue) - Math.round(oldLTRevenue))/Math.round(oldLTRevenue))*100)}%</span>
                                <Popover content={content} className="toolPop"><InfoCircleFilled /></Popover>
                            </div>
                            :
                            <div className="newSpend negitive">
                               <span className="oldSpend">{`${sessionStorage.getItem('symbolVal')}${Math.round(record.newLTRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                <span className="pipe">||</span>
                                <span>{Math.round(((Math.round(record.newLTRevenue) - Math.round(oldLTRevenue))/Math.round(oldLTRevenue))*100)}%</span>
                                <Popover content={content} className="toolPop"><InfoCircleFilled /></Popover>
                            </div>
                        :
                        <div className="newSpend"><span>{`${sessionStorage.getItem('symbolVal')}${Math.round(oldLTRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span></div>
                    }
                </span>
            }},
            
            { width: 200, title: <span>Brand ROI <BarChartOutlined className="linkToCharts" onClick={this.showROILTModal} /></span>, dataIndex: 'oldLTROI', key: 'oldLTROI', render: (oldLTROI, record) => {
                const content = (
                    <div className="spenTooltip">
                        <div>{record.newLTROI && <strong>Old</strong> } {`${sessionStorage.getItem('symbolVal')}${parseFloat(oldLTROI).toFixed(2)}`}</div>
                    {record.newLTROI && 
                        <div><strong>New</strong> {`${sessionStorage.getItem('symbolVal')}${parseFloat(record.newLTROI).toFixed(2)}`}</div>
                    } 
                    {record.newLTROI && parseFloat(record.newLTROI).toFixed(3) - parseFloat(oldLTROI).toFixed(3) != 0 ?
                        parseFloat(record.newLTROI) - parseFloat(oldLTROI) > 0 ?
                            <div className="newSpend positive">
                                <span className="title">Change</span>
                                    <span>{sessionStorage.getItem('symbolVal')}{parseFloat(parseFloat(record.newLTROI) - parseFloat(oldLTROI)).toFixed(2)}</span>
                                    <span className="pipe">||</span>
                                    <span>{parseFloat(((parseFloat(record.newLTROI) - parseFloat(oldLTROI))/parseFloat(oldLTROI))*100).toFixed(2)}%</span>
                            </div>
                            :
                            <div className="newSpend negitive">
                                <span className="title">Change</span>
                                    <span>{sessionStorage.getItem('symbolVal')}{parseFloat(parseFloat(record.newLTROI) - parseFloat(oldLTROI)).toFixed(2)}</span>
                                    <span className="pipe">||</span>
                                    <span>{parseFloat(((parseFloat(record.newLTROI) - parseFloat(oldLTROI))/parseFloat(oldLTROI))*100).toFixed(2)}%</span>
                            </div>
                        :
                        <div className="newSpend">{sessionStorage.getItem('symbolVal')}0.00</div>
                    }
                    </div>
                  );
                return <span className="borderRight">
                    {record.newROI && parseFloat(record.newLTROI).toFixed(3) - parseFloat(oldLTROI).toFixed(3) != 0 ?
                        parseFloat(record.newLTROI) - parseFloat(oldLTROI) > 0 ?
                            <div className="newSpend positive">
                                <span className="oldSpend">{`${sessionStorage.getItem('symbolVal')}${parseFloat(record.newLTROI).toFixed(2)}`}</span>
                                <span className="pipe">||</span>
                                <span>{parseFloat(((parseFloat(record.newLTROI) - parseFloat(oldLTROI))/parseFloat(oldLTROI))*100).toFixed(2)}%</span>
                                <Popover content={content} className="toolPop"><InfoCircleFilled /></Popover>
                            </div>
                            :
                            <div className="newSpend negitive">
                                <span className="oldSpend">{`${sessionStorage.getItem('symbolVal')}${parseFloat(record.newLTROI).toFixed(2)}`}</span>
                                <span className="pipe">||</span>
                                <span>{parseFloat(((parseFloat(record.newLTROI) - parseFloat(oldLTROI))/parseFloat(oldLTROI))*100).toFixed(2)}%</span>
                                <Popover content={content} className="toolPop"><InfoCircleFilled /></Popover>
                            </div>
                        :
                        <div className="newSpend"><span>{`${sessionStorage.getItem('symbolVal')}${parseFloat(oldLTROI).toFixed(2)}`}</span></div>
                    }
                </span>
            }},
             {width: 200, title: 'Minimum Spending', className: 'maxTdSpend', dataIndex: 'changeInMinSpend', key: 'changeInMinSpend', render: (changeInMinSpend, record) => {
                const content = (
                    <div className="spenTooltip">
                       <div className="optSpend"><strong>Max ROI: </strong> {sessionStorage.getItem('symbolVal')}{Math.round(record.optimalSpend1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({Math.round(record.optimalSpend1Percentage)} %)</div>
                       <div className="optSpend"><strong>Max Marginal: </strong> {sessionStorage.getItem('symbolVal')}{Math.round(record.optimalSpend2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({Math.round(record.optimalSpend2Percentage)} %)</div>
                    </div>
                  );
                return <span className="borderRight">
                        { constraintsVal.minimumSpending === record.changeInMinSpendPercentage ?
                        <span>
                            <span className="constText">No Constraint</span>
                            <Popover content={content} className="toolPop" trigger="focus"><InputNumber disabled={record.spend <=0}  value="" onBlur={(e) => this.handleChangeInMinSpend(e)} onKeyUp={(e) => e.key === 'Enter' && this.handleChangeInMinSpend(e)} id={`minspend_${record.key}`} /></Popover>
                            <Popover content={content} className="toolPop" trigger="focus"><InputNumber className="maxTdSpendPer" disabled={record.spend <=0} min={-100} value="" onBlur={(e) => this.handleChangeInMinSpendPercentage(e)} onKeyUp={(e) => e.key === 'Enter' && this.handleChangeInMinSpendPercentage(e)} id={`minpercentage_${record.key}`} formatter={value => `${value}%`} parser={value => value.replace('%', '')} /></Popover>
                        </span> 
                        :
                        <span>
                            <Popover content={content} className="toolPop" trigger="focus"><InputNumber disabled={record.spend <=0}  value={`${Math.round(changeInMinSpend)}`} onBlur={(e) => this.handleChangeInMinSpend(e)} onKeyUp={(e) => e.key === 'Enter' && this.handleChangeInMinSpend(e)} id={`minspend_${record.key}`} /></Popover>
                            <Popover content={content} className="toolPop" trigger="focus"><InputNumber className="maxTdSpendPer" disabled={record.spend <=0} min={-100} value={`${parseFloat(record.changeInMinSpendPercentage).toFixed(1)}`} onBlur={(e) => this.handleChangeInMinSpendPercentage(e)} onKeyUp={(e) => e.key === 'Enter' && this.handleChangeInMinSpendPercentage(e)} id={`minpercentage_${record.key}`} formatter={value => `${value}%`} parser={value => value.replace('%', '')} /></Popover>
                        </span>
                        }
                    </span>      
                    
             }
            },
            {width: 200, title: 'Maximum Spending', className: 'maxTdSpend', dataIndex: 'changeInMaxSpend', key: 'changeInMaxSpend', render: (changeInMaxSpend, record) => {
                const content = (
                    <div className="spenTooltip">
                       <div className="optSpend"><strong>Max ROI: </strong> {sessionStorage.getItem('symbolVal')}{Math.round(record.optimalSpend1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({Math.round(record.optimalSpend1Percentage)} %)</div>
                       <div className="optSpend"><strong>Max Marginal: </strong> {sessionStorage.getItem('symbolVal')}{Math.round(record.optimalSpend2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({Math.round(record.optimalSpend2Percentage)} %)</div>
                    </div>
                  );
                return <span>
                { constraintsVal.maximumSpending === record.changeInMaxSpendPercentage ?
                    <span className="borderRight">
                        <span className="constText">No Constraint</span>
                        <Popover content={content} className="toolPop" trigger="focus"><InputNumber disabled={record.spend <=0} value="" onBlur={(e) => this.handleChangeInMaxSpend(e)} onKeyUp={(e) => e.key === 'Enter' && this.handleChangeInMaxSpend(e)} id={`maxspend_${record.key}`} /></Popover>
                        <Popover content={content} className="toolPop" trigger="focus"><InputNumber className="maxTdSpendPer" disabled={record.spend <=0} value="" onBlur={(e) => this.handleChangeInMaxSpendPercentage(e)} onKeyUp={(e) => e.key === 'Enter' && this.handleChangeInMaxSpendPercentage(e)} id={`maxpercentage_${record.key}`} formatter={value => `${value}%`} parser={value => value.replace('%', '')} /></Popover>
                    </span>
                    :
                    <span className="borderRight">
                        <Popover content={content} className="toolPop" trigger="focus"><InputNumber disabled={record.spend <=0} value={`${Math.round(changeInMaxSpend)}`} onBlur={(e) => this.handleChangeInMaxSpend(e)} onKeyUp={(e) => e.key === 'Enter' && this.handleChangeInMaxSpend(e)} id={`maxspend_${record.key}`} /></Popover>
                        <Popover content={content} className="toolPop" trigger="focus"><InputNumber className="maxTdSpendPer" disabled={record.spend <=0} value={`${parseFloat(record.changeInMaxSpendPercentage).toFixed(1)}`} onBlur={(e) => this.handleChangeInMaxSpendPercentage(e)} onKeyUp={(e) => e.key === 'Enter' && this.handleChangeInMaxSpendPercentage(e)} id={`maxpercentage_${record.key}`} formatter={value => `${value}%`} parser={value => value.replace('%', '')} /></Popover>
                    </span>
                }
                </span>
            }},
        ];
        const tableData = spendData
        const spendSeries = [];
        const oldSpendSeries = {
            name: 'Previous Plan',
            data: []
        }
        const newSpendSeries = {
            name: 'New Plan',
            data: []
        }
        const revenuSeries = [];
        const oldRevenuSeries = {
            name: 'Previous Plan',
            data: []
        }
        const newRevenuSeries = {
            name: 'New Plan',
            data: []
        }
        const roiSeries = [];
        const oldroiSeries = {
            name: 'Previous Plan',
            data: []
        }
        const newroiSeries = {
            name: 'New Plan',
            data: []
        }
        const revenuLTSeries = [];
        const oldRevenuLTSeries = {
            name: 'Previous Plan',
            data: []
        }
        const newRevenuLTSeries = {
            name: 'New Plan',
            data: []
        }
        const roiLTSeries = [];
        const oldroiLTSeries = {
            name: 'Previous Plan',
            data: []
        }
        const newroiLTSeries = {
            name: 'New Plan',
            data: []
        }
        const keySpendSeries = []
        const keyoldSpendSeries = {
            name: 'Previous Plan',
            data: []
        }
        const keynewSpendSeries = {
            name: 'New Plan',
            data: []
        }
        const keySpendLabels = []
        const keyRevenueSeries = []
        const keyoldRevenuSeries = {
            name: 'Previous Plan',
            data: []
        }
        const keynewRevenuSeries = {
            name: 'New Plan',
            data: []
        }
        const keyBaseRevenueSeries = []
        const keyoldBaseRevenuSeries = {
            name: 'Previous Plan',
            data: []
        }
        const keynewBaseRevenuSeries = {
            name: 'New Plan',
            data: []
        }
        const keyTotalRevenueSeries = []
        const keyoldTotalRevenuSeries = {
            name: 'Previous Plan',
            data: []
        }
        const keynewTotalRevenuSeries = {
            name: 'New Plan',
            data: []
        }
        const keyRevenueLTSeries = []
        const keyoldRevenuLTSeries = {
            name: 'Previous Plan',
            data: []
        }
        const keynewRevenuLTSeries = {
            name: 'New Plan',
            data: []
        }
        const keyROISeries = []
        const keyoldroiSeries = {
            name: 'Previous Plan',
            data: []
        }
        const keynewroiSeries = {
            name: 'New Plan',
            data: []
        }
        const keyROILTSeries = []
        const keyoldroiLTSeries = {
            name: 'Previous Plan',
            data: []
        }
        const keynewroiLTSeries = {
            name: 'New Plan',
            data: []
        }
        const categories = []
        if (tableData && tableData.length > 0) {
            tableData.forEach(element => {
                oldSpendSeries.data.push(element.spend)
                oldRevenuSeries.data.push(element.revenue)
                if (showProfit) {
                    oldroiSeries.data.push((element.roi*profitValueData)/100)
                } else {
                    oldroiSeries.data.push(element.roi)
                }
                oldRevenuLTSeries.data.push(element.oldLTRevenue)
                oldroiLTSeries.data.push(element.oldLTROI)
                categories.push(element.tactic)
                if (element.newSpend) {
                    newSpendSeries.data.push(element.newSpend)
                    newRevenuSeries.data.push(element.newRevenue)
                    if (showProfit) {
                        newroiSeries.data.push((element.newROI*profitValueData)/100)
                    } else {
                        newroiSeries.data.push(element.newROI)
                    }
                    newRevenuLTSeries.data.push(element.newLTRevenue)
                    newroiLTSeries.data.push(element.newLTROI)
                }
            });
        }
        if (keyHighlights && keyHighlights.length > 0) {

            if (keyHighlights.length === 1) {
                for (let i = 0; i < keyHighlights.length; i++) {

                    if (i === 0) {
                        keyoldSpendSeries.data.push(keyHighlights[i].spend)
                        keyoldRevenuSeries.data.push(keyHighlights[i].revenue)
                        keyoldBaseRevenuSeries.data.push(keyHighlights[i].baseRevenue)
                        keyoldTotalRevenuSeries.data.push(keyHighlights[i].revenue + keyHighlights[i].baseRevenue)
                        if (showProfit) {
                            keyoldroiSeries.data.push((keyHighlights[i].roi*profitValueData)/100)
                        } else {
                            keyoldroiSeries.data.push(keyHighlights[i].roi)
                        }
                        keyoldRevenuLTSeries.data.push(keyHighlights[i].ltRevenue)
                        keyoldroiLTSeries.data.push(keyHighlights[i].ltroi)
                    } 
                    if (i === 1) {
                        keynewSpendSeries.data.push(keyHighlights[i].spend)
                        keynewRevenuSeries.data.push(keyHighlights[i].revenue)
                        keynewBaseRevenuSeries.data.push(keyHighlights[i].baseRevenue)
                        keynewTotalRevenuSeries.data.push(keyHighlights[i].revenue + keyHighlights[i].baseRevenue)
                        if (showProfit) {
                            keynewroiSeries.data.push((keyHighlights[i].roi*profitValueData)/100)
                        } else {
                            keynewroiSeries.data.push(keyHighlights[i].roi)
                        }
                        keynewRevenuLTSeries.data.push(keyHighlights[i].ltRevenue)
                        keynewroiLTSeries.data.push(keyHighlights[i].ltroi)
                    }
                    keySpendLabels.push(keyHighlights[i].tactic)
                  }
            } else {
                for (let i = 0; i < keyHighlights.length-1; i++) {

                    if (i === 0) {
                        keyoldSpendSeries.data.push(keyHighlights[i].spend)
                        keyoldRevenuSeries.data.push(keyHighlights[i].revenue)
                        keyoldBaseRevenuSeries.data.push(keyHighlights[i].baseRevenue)
                        keyoldTotalRevenuSeries.data.push(keyHighlights[i].revenue + keyHighlights[i].baseRevenue)
                        if (showProfit) {
                            keyoldroiSeries.data.push((keyHighlights[i].roi*profitValueData)/100)
                        } else {
                            keyoldroiSeries.data.push(keyHighlights[i].roi)
                        }
                        keyoldRevenuLTSeries.data.push(keyHighlights[i].ltRevenue)
                        keyoldroiLTSeries.data.push(keyHighlights[i].ltroi)
                    } 
                    if (i === 1) {
                        keynewSpendSeries.data.push(keyHighlights[i].spend)
                        keynewRevenuSeries.data.push(keyHighlights[i].revenue)
                        keynewBaseRevenuSeries.data.push(keyHighlights[i].baseRevenue)
                        keynewTotalRevenuSeries.data.push(keyHighlights[i].revenue + keyHighlights[i].baseRevenue)
                        if (showProfit) {
                            keynewroiSeries.data.push((keyHighlights[i].roi*profitValueData)/100)
                        } else {
                            keynewroiSeries.data.push(keyHighlights[i].roi)
                        }
                        keynewRevenuLTSeries.data.push(keyHighlights[i].ltRevenue)
                        keynewroiLTSeries.data.push(keyHighlights[i].ltroi)
                    }
                    keySpendLabels.push(keyHighlights[i].tactic)
                  }

            }
        }
        
        oldSpendSeries.data.length > 0 && spendSeries.push(oldSpendSeries)
        newSpendSeries.data.length > 0 && spendSeries.push(newSpendSeries)
        oldRevenuSeries.data.length > 0 && revenuSeries.push(oldRevenuSeries)
        newRevenuSeries.data.length > 0 && revenuSeries.push(newRevenuSeries)
        oldroiSeries.data.length > 0 && roiSeries.push(oldroiSeries)
        newroiSeries.data.length > 0 && roiSeries.push(newroiSeries)
        oldRevenuLTSeries.data.length > 0 && revenuLTSeries.push(oldRevenuLTSeries)
        newRevenuLTSeries.data.length > 0 && revenuLTSeries.push(newRevenuLTSeries)
        oldroiLTSeries.data.length > 0 && roiLTSeries.push(oldroiLTSeries)
        newroiLTSeries.data.length > 0 && roiLTSeries.push(newroiLTSeries)
        keyoldSpendSeries.data.length > 0 && keySpendSeries.push(keyoldSpendSeries)
        keynewSpendSeries.data.length > 0 && keySpendSeries.push(keynewSpendSeries)
        keyoldRevenuSeries.data.length > 0 && keyRevenueSeries.push(keyoldRevenuSeries)
        keynewRevenuSeries.data.length > 0 && keyRevenueSeries.push(keynewRevenuSeries)
        keyoldBaseRevenuSeries.data.length > 0 && keyBaseRevenueSeries.push(keyoldBaseRevenuSeries)
        keynewBaseRevenuSeries.data.length > 0 && keyBaseRevenueSeries.push(keynewBaseRevenuSeries)
        keyoldTotalRevenuSeries.data.length > 0 && keyTotalRevenueSeries.push(keyoldTotalRevenuSeries)
        keynewTotalRevenuSeries.data.length > 0 && keyTotalRevenueSeries.push(keynewTotalRevenuSeries)
        keyoldroiSeries.data.length > 0 && keyROISeries.push(keyoldroiSeries)
        keynewroiSeries.data.length > 0 && keyROISeries.push(keynewroiSeries)
        keyoldRevenuLTSeries.data.length > 0 && keyRevenueLTSeries.push(keyoldRevenuLTSeries)
        keynewRevenuLTSeries.data.length > 0 && keyRevenueLTSeries.push(keynewRevenuLTSeries)
        keyoldroiLTSeries.data.length > 0 && keyROILTSeries.push(keyoldroiLTSeries)
        keynewroiLTSeries.data.length > 0 && keyROILTSeries.push(keynewroiLTSeries)

        const baseValueData = 
            this.props.baseValue !== ""
            ? this.props.baseValue 
            : keyHighlights.length >= 2 
                ? Math.round(keyHighlights[2].baseRevenuePercentage * 1000) / 1000
                : this.props.Globalgeagraphy === "SPAIN" || this.props.Globalgeagraphy === "RUSSIA" ? "6.4" : "0.538"
        const contentBase = (
            <div className="spenTooltip">
                <div><strong>Base Trend Factor</strong></div>
                <InputNumber value={baseValueData} formatter={value => `${value}%`} parser={value => value.replace('%', '')} onChange={this.props.onChangeBase}  />
           
            </div>
          );
        
          const contentProfit = (
            <div className="spenTooltip">
                <div><strong>Profit ROI Factor</strong></div>
                <InputNumber value={this.props.profitValueData} formatter={value => `${value}%`} parser={value => value.replace('%', '')} onChange={this.props.onChangeProfit}  />
           
            </div>
          );

          const contentProfitText = (
            <div className="spenTooltip tooltipContent">
              <p>Select /Edit Profit ROI Factor by clicking on (i) icon. </p>
            </div>
          );

          const spendcontent = (
            <div className="spenTooltip tooltipContent">
              <p>Marketing Spends</p>
            </div>
          );

          const basecontent = (
            <div className="spenTooltip tooltipContent">
              <p>The baseline is any sales achieved independent of marketing activities. They are influenced by various factors like brand value, seasonality and other non-marketing factors like GDP, growth rate, consumer sentiment, etc. </p>
            </div>
          );

          const IncRevenuecontent = (
            <div className="spenTooltip tooltipContent">
              <p>Incremental Revenue is the additional revenue generated by marketing efforts. A baseline revenue is established and it is measured against this baseline revenue</p>
            </div>
          );

          const totalcontent = (
            <div className="spenTooltip tooltipContent">
              <p>Total Revenue is the sum of Baseline Revenue and Incremental Revenue</p>
            </div>
          );

          const BrandRevenuecontent = (
            <div className="spenTooltip tooltipContent">
              <p>Long term revenue is the brand value accumulated over a certain time period due to long-term impact of marketing activities. Impact of long term revenue will be seen in baseline sales over a period of time</p>
            </div>
          );

          const IncROIcontent = (
            <div className="spenTooltip tooltipContent">
              <p>Incremental Revenue/Marketing Spend</p>
            </div>
          );

          const brandROIcontent = (
            <div className="spenTooltip tooltipContent">
              <p>Long Term Revenue/Marketing Spend</p>
            </div>
          );
    
            return (
                <div className="simulateDetails">
                    {
                        this.state.keyVisible && keySpendSeries.length > 0 &&
                            <Modal
                                title="Key Highlights"
                                visible={true}
                                onOk={this.handleKeyOk}
                                onCancel={this.handleKeyCancel}
                                className="cirPopup"
                                >
                                <KeyHighlightsCharts 
                                handleManageOk={this.handleKeyOk} 
                                handleManageCancel={this.handleKeyCancel} 
                                keySpendSeries={keySpendSeries}
                                keySpendLabels={keySpendLabels}
                                keyRevenueSeries={keyRevenueSeries}
                                keyBaseRevenueSeries={keyBaseRevenueSeries}
                                keyTotalRevenueSeries={keyTotalRevenueSeries}
                                keyROISeries={keyROISeries}
                                keyRevenueLTSeries={keyRevenueLTSeries}
                                keyROILTSeries={keyROILTSeries}
                                showProfit={showProfit}
                            />
                            </Modal>
                        }
                    {
                      this.state.spendVisible && spendSeries.length > 0 &&
                        <Modal
                          title={`Spend ( ${sessionStorage.getItem('symbolVal')})`}
                          visible={this.state.spendVisible}
                          onOk={this.handleSpendOk}
                          onCancel={this.handleSpendCancel}
                          className="simPopup"
                        >
                          <SpendCharts 
                            handleManageOk={this.handleSpendOk} 
                            handleManageCancel={this.handleSpendCancel} 
                            spendSeries={spendSeries}
                            categories={categories}
                          />
                        </Modal>
                    }
                    {
                      this.state.revenuVisible && revenuSeries.length > 0 &&
                        <Modal
                          title={`Inc Revenue (${sessionStorage.getItem('symbolVal')})`}
                          visible={this.state.revenuVisible}
                          onOk={this.handleRevenuOk}
                          onCancel={this.handleRevenuCancel}
                          className="simPopup"
                        >
                          <SpendCharts 
                            handleManageOk={this.handleRevenuOk} 
                            handleManageCancel={this.handleRevenuCancel} 
                            spendSeries={revenuSeries}
                            categories={categories}
                          />
                        </Modal>
                    }
                    {
                      this.state.revenuLTVisible && revenuLTSeries.length > 0 &&
                        <Modal
                          title={`Brand Revenue (${sessionStorage.getItem('symbolVal')})`}
                          visible={this.state.revenuLTVisible}
                          onOk={this.handleRevenuLTOk}
                          onCancel={this.handleRevenuLTCancel}
                          className="simPopup"
                        >
                          <SpendCharts 
                            handleManageOk={this.handleRevenuLTOk} 
                            handleManageCancel={this.handleRevenuLTCancel} 
                            spendSeries={revenuLTSeries}
                            categories={categories}
                          />
                        </Modal>
                    }
                    {
                      this.state.roiVisible && roiSeries.length > 0 &&
                        <Modal
                          title={`${showProfit ? "Profit ROI" : "Inc ROI"} (${sessionStorage.getItem('symbolVal')})`}
                          visible={this.state.roiVisible}
                          onOk={this.handleROIOk}
                          onCancel={this.handleROICancel}
                          className="simPopup"
                        >
                          <ROICharts 
                            handleManageOk={this.handleROIOk} 
                            handleManageCancel={this.handleROICancel} 
                            spendSeries={roiSeries}
                            categories={categories}
                          />
                        </Modal>
                    }
                    {
                      this.state.roiLTVisible && roiLTSeries.length > 0 &&
                        <Modal
                          title={`Brand ROI (${sessionStorage.getItem('symbolVal')})`}
                          visible={this.state.roiLTVisible}
                          onOk={this.handleROILTOk}
                          onCancel={this.handleROILTCancel}
                          className="simPopup"
                        >
                          <ROICharts 
                            handleManageOk={this.handleROILTOk} 
                            handleManageCancel={this.handleROILTCancel} 
                            spendSeries={roiLTSeries}
                            categories={categories}
                          />
                        </Modal>
                    }
                    <div className="detailsHead">
                        <Title><Icon type="edit" className="icon" /> {scenarioName}</Title>
                        {brandList.length > 0 &&
                        <div className="FilterSelection">
                            {Globalgeagraphy &&
                                <span>
                                    Geography: {Globalgeagraphy}
                                </span>
                            }
                            {/* {brandList && brandList.length > 0 &&
                                <span>
                                    <span className="pipe">||</span>
                                    Brand: {
                                    brandList.map((item, index) =>
                                    index === brandList.length-1 ?
                                    `${item} `
                                    :
                                    `${item}, `
                                    )
                                    }
                                </span>
                            } */}
                            
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
                            {optimizationType && optimizationType.length > 0 && optimizationType == 'Revenue Target' &&
                                <span>
                                    <span className="pipe">||</span>
                                    Revenue Goal: {Math.round(minimizeSpendValue)+100}%
                                </span>
                            }
                            {optimizationType && optimizationType.length > 0 && optimizationType == 'Spending Target' &&
                                <span>
                                    <span className="pipe">||</span>
                                    Spend Constraint: {Math.round(maximizeRevenueValue)+100}%
                                </span>
                            }
                        </div>
                    }
                </div>
                {
                    brandList.length > 0 && periodValue.length > 0 && tacticValue.length > 0 && subBrandValue.length > 0 &&
                    <div className="simulatorTableData">
                        <ColoredScrollbars>
                        {
                            keyHighlights.length > 0 &&
                            <div className="simulateHeader keyContainer">
                                {/* <h3 className="keyHeading"> Key Highlights <BarChartOutlined className="linkToCharts" onClick={this.showKeyModal} /></h3> */}
                                <div className="keyHiCont">
                                    <div className="spendCont">
                                    <h5 className="spendHead">
                                            <span className="leftHeadTop"><Popover content={spendcontent}>Spend</Popover></span>
                                            <span className="spendTopHead"><span></span></span>
                                        </h5>
                                        <div className="spendContent">
                                            {/* <div className="baseData">Base</div> */}
                                            <div className="planCont">
                                                <div className="leftData">
                                                    <div className="oldPlan">
                                                        <div className="planTitle">{keyHighlights[0].tactic}</div>
                                                        <div className="planData">{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[0].spend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                                                    </div>
                                                    {keyHighlights.length > 1 && 
                                                        <div className="newPlan">
                                                            <div className="planTitle">{keyHighlights[1].tactic}</div>
                                                            <div className="planData">{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[1].spend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                                                        </div>
                                                    }
                                                    {keyHighlights.length > 2 && 
                                                        <div className="changePlan">
                                                            <div className="planTitle">Change: </div>
                                                            <div className="planData">
                                                                {keyHighlights[2].spend >= 0 ?
                                                                <span className="positive">
                                                                    <span>{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[2].spend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                                                    <span className="pipe">||</span>
                                                                    <span>{`${Math.round(keyHighlights[2].spendPercentage *10)/10}%`}</span>
                                                                </span>
                                                                :
                                                                <span className="negitive">
                                                                    <span>{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[2].spend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                                                    <span className="pipe">||</span>
                                                                    <span>{`${Math.round(keyHighlights[2].spendPercentage *10)/10}%`}</span>
                                                                </span>
                                                                }
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="spendCont1">
                                    <h5 className="spendHead">
                                            <span className="leftHeadTop"><Popover content={IncRevenuecontent}>Short Term</Popover> <BarChartOutlined className="linkToCharts" onClick={this.showKeyModal} /></span>
                                            {/* <span className="rightHeadTop">-</span> */}
                                            <span className="leftHead_rev"><Popover content={IncRevenuecontent}>Inc Revenue</Popover></span>
                                            <span className="rightHead_rev"><Popover content={basecontent}>Base Revenue</Popover> <Popover content={contentBase} className="toolPop" trigger="click" ><InfoCircleFilled /></Popover></span>
                                            <span className="rightHead_rev"><Popover content={totalcontent}>Total Revenue</Popover></span>
                                            <span className="rightHead_rev"><span><Popover content={IncROIcontent}>{showProfit ? "Profit ROI": "Inc ROI"}</Popover></span></span>
                                        </h5>
                                        <div className="spendContent">
                                            {/* <div className="baseData">Base<span>{` €${Math.round(keyHighlights[0].baseRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span></div> */}
                                            <div className="planCont">
                                                <div className="leftData_rev">
                                                    <div className="oldPlan">
                                                        <div className="planTitle">{keyHighlights[0].tactic}</div>
                                                        <div className="planData">{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[0].revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                                                    </div>
                                                    {keyHighlights.length > 1 && 
                                                        <div className="newPlan">
                                                            <div className="planTitle">{keyHighlights[1].tactic}</div>
                                                            <div className="planData">{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[1].revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                                                        </div>
                                                    }
                                                    {keyHighlights.length > 2 && 
                                                        <div className="changePlan">
                                                            <div className="planTitle">Change:</div> 
                                                            <div className="planData">
                                                                {keyHighlights[2].revenue >= 0 ?
                                                                    <span className="positive">
                                                                        <span>{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[2].revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                                                        <span className="pipe">||</span>
                                                                        <span>{`${Math.round(keyHighlights[2].revenuePercentage * 10)/10}%`}</span>
                                                                    </span>
                                                                    :
                                                                    <span className="negitive">
                                                                        <span>{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[2].revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                                                        <span className="pipe">||</span>
                                                                        <span>{`${Math.round(keyHighlights[2].revenuePercentage * 10)/10}%`}</span>
                                                                    </span>
                                                                }
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="rightData_rev">
                                                    <div className="oldPlan">
                                                        <div className="planTitle">{keyHighlights[0].tactic}</div>
                                                        <div className="planData">{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[0].baseRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                                                    </div>
                                                    {keyHighlights.length > 1 && 
                                                        <div className="newPlan">
                                                            <div className="planTitle">{keyHighlights[1].tactic}</div>
                                                            <div className="planData">{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[1].baseRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                                                        </div>
                                                    }
                                                    {keyHighlights.length > 2 && 
                                                        <div className="changePlan">
                                                            <div className="planTitle">Change:</div> 
                                                            <div className="planData">
                                                                {keyHighlights[2].baseRevenue >= 0 ?
                                                                    <span className="positive">
                                                                        <span>{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[2].baseRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                                                        <span className="pipe">||</span>
                                                                        <span>{`${Math.round(keyHighlights[2].baseRevenuePercentage * 10)/10}%`}</span>
                                                                    </span>
                                                                    :
                                                                    <span className="negitive">
                                                                        <span>{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[2].baseRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                                                        <span className="pipe">||</span>
                                                                        <span>{`${Math.round(keyHighlights[2].baseRevenuePercentage * 10)/10}%`}</span>
                                                                    </span>
                                                                }
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="rightData_rev">
                                                    <div className="oldPlan">
                                                        <div className="planTitle">{keyHighlights[0].tactic}</div>
                                                        <div className="planData">{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[0].revenue + keyHighlights[0].baseRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                                                    </div>
                                                    {keyHighlights.length > 1 && 
                                                        <div className="newPlan">
                                                            <div className="planTitle">{keyHighlights[1].tactic}</div>
                                                            <div className="planData">{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[1].revenue + keyHighlights[1].baseRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                                                        </div>
                                                    }
                                                    {keyHighlights.length > 2 && 
                                                        <div className="changePlan">
                                                            <div className="planTitle">Change:</div> 
                                                            <div className="planData">
                                                                {(keyHighlights[1].revenue + keyHighlights[1].baseRevenue) - (keyHighlights[0].revenue + keyHighlights[0].baseRevenue) >= 0 ?
                                                                    <span className="positive">
                                                                        <span>{`${sessionStorage.getItem('symbolVal')}${Math.round((keyHighlights[1].revenue + keyHighlights[1].baseRevenue) - (keyHighlights[0].revenue + keyHighlights[0].baseRevenue)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                                                        <span className="pipe">||</span>
                                                                        <span>{`${Math.round((((keyHighlights[1].revenue + keyHighlights[1].baseRevenue) - (keyHighlights[0].revenue + keyHighlights[0].baseRevenue))/(keyHighlights[0].revenue + keyHighlights[0].baseRevenue))*1000)/10}%`}</span>
                                                                    </span>
                                                                    :
                                                                    <span className="negitive">
                                                                        <span>{`${sessionStorage.getItem('symbolVal')}${Math.round((keyHighlights[1].revenue + keyHighlights[1].baseRevenue) - (keyHighlights[0].revenue + keyHighlights[0].baseRevenue)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                                                        <span className="pipe">||</span>
                                                                        <span>{`${Math.round((((keyHighlights[1].revenue + keyHighlights[1].baseRevenue) - (keyHighlights[0].revenue + keyHighlights[0].baseRevenue))/(keyHighlights[0].revenue + keyHighlights[0].baseRevenue))*1000)/10}%`}</span>
                                                                    </span>
                                                                }
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="rightData_rev">
                                                    <div className="oldPlan">
                                                        <div className="planTitle">{keyHighlights[0].tactic}</div>
                                                        <div className="planData">
                                                            {
                                                            showProfit ? 
                                                                `${sessionStorage.getItem('symbolVal')}${Math.round(((keyHighlights[0].roi*profitValueData)/100)*10)/10}`
                                                                :
                                                                `${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[0].roi*10)/10}`
                                                            }
                                                        </div>
                                                    </div>
                                                    {keyHighlights.length > 1 && 
                                                        <div className="newPlan">
                                                            <div className="planTitle">{keyHighlights[1].tactic}</div>
                                                            <div className="planData">
                                                                {
                                                                     showProfit ? 
                                                                     `${sessionStorage.getItem('symbolVal')}${Math.round(((keyHighlights[1].roi*profitValueData)/100)*10)/10}`
                                                                     :
                                                                    `${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[1].roi *10)/10}`
                                                                }
                                                            </div>
                                                        </div>
                                                    }
                                                    {keyHighlights.length > 2 && 
                                                        <div className="changePlan">
                                                            <div className="planTitle">Change:</div> 
                                                            <div className="planData">
                                                                {keyHighlights[2].roi >= 0 ?
                                                                    <span className="positive">
                                                                        <span>
                                                                            {
                                                                                showProfit ? 
                                                                                `${sessionStorage.getItem('symbolVal')}${Math.round(((keyHighlights[2].roi*profitValueData)/100)*10)/10}`
                                                                                :
                                                                                `${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[2].roi*10)/10}`
                                                                            }
                                                                        </span>
                                                                        <span className="pipe">||</span>
                                                                        <span>{`${Math.round(keyHighlights[2].roiPercentage*10)/10}%`}</span>
                                                                    </span>
                                                                    :
                                                                    <span className="negitive">
                                                                        <span>
                                                                            {
                                                                                showProfit ? 
                                                                                `${sessionStorage.getItem('symbolVal')}${Math.round(((keyHighlights[2].roi*profitValueData)/100)*10)/10}`
                                                                                :
                                                                                `${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[2].roi*10)/10}`
                                                                            }
                                                                        </span>
                                                                        <span className="pipe">||</span>
                                                                        <span>{`${Math.round(keyHighlights[2].roiPercentage*10)/10}%`}</span>
                                                                    </span>
                                                                }
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="spendCont2">
                                        <h5 className="spendHead">
                                            <span className="leftHeadTop"><Popover content={BrandRevenuecontent}>Long Term</Popover></span>
                                            <span className="leftHead"><span><Popover content={BrandRevenuecontent}>Brand Revenue</Popover></span></span>
                                            <span className="rightHead"><span><Popover content={brandROIcontent}>Brand ROI</Popover></span></span>
                                        </h5>
                                        <div className="spendContent">
                                            {/* <div className="baseData">Base</div> */}
                                            <div className="planCont">
                                                <div className="leftData">
                                                    <div className="oldPlan">
                                                        <div className="planTitle">{keyHighlights[0].tactic}</div>
                                                        <div className="planData">{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[0].ltRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                                                    </div>
                                                    {keyHighlights.length > 1 && 
                                                        <div className="newPlan">
                                                            <div className="planTitle">{keyHighlights[1].tactic}</div>
                                                            <div className="planData">{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[1].ltRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                                                        </div>
                                                    }
                                                    {keyHighlights.length > 2 && 
                                                        <div className="changePlan">
                                                            <div className="planTitle">Change:</div> 
                                                            <div className="planData">
                                                                {keyHighlights[2].ltRevenue >= 0 ?
                                                                    <span className="positive">
                                                                        <span>{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[2].ltRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                                                        <span className="pipe">||</span>
                                                                        <span>{`${Math.round(keyHighlights[2].ltRevenuePercentage*10)/10}%`}</span>
                                                                    </span>
                                                                    :
                                                                    <span className="negitive">
                                                                        <span>{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[2].ltRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                                                        <span className="pipe">||</span>
                                                                        <span>{`${Math.round(keyHighlights[2].ltRevenuePercentage*10)/10}%`}</span>
                                                                    </span>
                                                                }
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="rightData">
                                                    <div className="oldPlan">
                                                        <div className="planTitle">{keyHighlights[0].tactic}</div>
                                                        <div className="planData">{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[0].ltroi *10)/10}`}</div>
                                                    </div>
                                                    {keyHighlights.length > 1 && 
                                                        <div className="newPlan">
                                                            <div className="planTitle">{keyHighlights[1].tactic}</div>
                                                            <div className="planData">{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[1].ltroi *10)/10}`}</div>
                                                        </div>
                                                    }
                                                    {keyHighlights.length > 2 && 
                                                        <div className="changePlan">
                                                            <div className="planTitle">Change:</div>
                                                            <div className="planData">
                                                                {keyHighlights[2].ltroi >= 0 ?
                                                                    <span className="positive">
                                                                        <span>{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[2].ltroi *10)/10}`}</span>
                                                                        <span className="pipe">||</span>
                                                                        <span>{`${Math.round(keyHighlights[2].ltroiPercentage *10)/10}%`}</span>
                                                                    </span>
                                                                    :
                                                                    <span className="negitive">
                                                                        <span>{`${sessionStorage.getItem('symbolVal')}${Math.round(keyHighlights[2].ltroi *10)/10}`}</span>
                                                                        <span className="pipe">||</span>
                                                                        <span>{`${Math.round(keyHighlights[2].ltroiPercentage *10)/10}%`}</span>
                                                                    </span>
                                                                }
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearClass"></div>
                                </div>
                            </div>
                            // <div className="simulateHeader">
                            //     <h3 className="keyHeading"><span className="smallLeftBorder"></span> Key Highlights <span onClick={this.showKeyModal}><BarChartOutlined className="linkToCharts"  /></span></h3>
                            //     <div className="simulateTable keyHi">
                            //     <div className="keyCont">
                            //         <div className="keyHead">Spend</div>
                            //         <div className="keyContent">
                            //             <div className="keyLeft">

                            //             </div>
                            //             <div className="keyRight">
                            //                 {
                            //                     keyHighlights.map((record, index) => {
                            //                         return (
                                                        
                            //                                 <div>{record.tactic}: 
                            //                                     {record.tactic && record.tactic === 'Change' ?
                            //                                         record.spend >= 0 ?
                            //                                         <span className="positive">
                            //                                             <span>{`${sessionStorage.getItem('symbolVal')}${Math.round(record.spend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                            //                                             <span className="pipe">||</span>
                            //                                             <span>{`${Math.round(record.spendPercentage)}%`}</span>
                            //                                         </span>
                            //                                         : 
                            //                                         <span className="negitive">
                            //                                             <span>{`${sessionStorage.getItem('symbolVal')}${Math.round(record.spend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                            //                                             <span className="pipe">||</span>
                            //                                             <span>{`${Math.round(record.spendPercentage)}%`}</span>
                            //                                         </span>
                            //                                     : 
                            //                                     <span> {` €${Math.round(record.spend).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                            //                                     }
                            //                                 </div>
                                                        
                            //                         )
                            //                     })
                            //                 }
                            //                 </div>
                            //         </div>
                            //     </div>
                            //     <div className="kyeDivide"></div>
                            //     <div className="keyCont">
                            //         <div className="keyHead">Inc Revenue</div>
                            //         <div className="keyContent">
                            //             <div className="keyLeft icon1">

                            //             </div>
                            //             <div className="keyRight">
                            //             {
                            //                 keyHighlights.map((record, index) => {
                            //                     return (
                                                    
                            //                             <div>
                            //                                 {record.tactic === "Previous Plan" &&
                            //                                 <div>Base: <span>{` €${Math.round(record.baseRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span></div>
                            //                                 }
                            //                                 {record.tactic}: 
                            //                                 {record.tactic && record.tactic === 'Change' ?
                            //                                     record.revenue >= 0 ?
                            //                                     <span className="positive">
                            //                                         <span>{`${sessionStorage.getItem('symbolVal')}${Math.round(record.revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                            //                                         <span className="pipe">||</span>
                            //                                         <span>{`${Math.round(record.revenuePercentage)}%`}</span>
                            //                                     </span>
                            //                                     :
                            //                                     <span className="negitive">
                            //                                         <span>{`${sessionStorage.getItem('symbolVal')}${Math.round(record.revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                            //                                         <span className="pipe">||</span>
                            //                                         <span>{`${Math.round(record.revenuePercentage)}%`}</span>
                            //                                     </span>
                            //                                     :
                            //                                     <span>{` €${Math.round(record.revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                            //                                 }
                            //                             </div>
                                                    
                            //                     )
                            //                 })
                            //             }
                            //             </div>
                            //         </div>
                            //     </div>
                            //     <div className="kyeDivide"></div>
                            //     <div className="keyCont">
                            //         <div className="keyHead">Brand Revenue</div>
                            //         <div className="keyContent">
                            //             <div className="keyLeft icon1">

                            //             </div>
                            //             <div className="keyRight">
                            //             {
                            //                 keyHighlights.map((record, index) => {
                            //                     return (
                                                    
                            //                             <div>
                            //                                 {record.tactic === "Previous Plan" &&
                            //                                 <div>Base: <span>{` €${Math.round(record.baseRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span></div>
                            //                                 }
                            //                                 {record.tactic}: 
                            //                                 {record.tactic && record.tactic === 'Change' ?
                            //                                     record.ltRevenue >= 0 ?
                            //                                     <span className="positive">
                            //                                         <span>{`${sessionStorage.getItem('symbolVal')}${Math.round(record.ltRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                                                    
                            //                                     </span>
                            //                                     :
                            //                                     <span className="negitive">
                            //                                         <span>{`${sessionStorage.getItem('symbolVal')}${Math.round(record.ltRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                                                                   
                            //                                     </span>
                            //                                     :
                            //                                     <span>{` €${Math.round(record.ltRevenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                            //                                 }
                            //                             </div>
                                                    
                            //                     )
                            //                 })
                            //             }
                            //             </div>
                            //         </div>
                            //     </div>

                            //     <div className="kyeDivide"></div>
                            //     <div className="keyCont">
                            //         <div className="keyHead">Inc ROI</div>
                            //         <div className="keyContent">
                            //             <div className="keyLeft icon2">

                            //             </div>
                            //             <div className="keyRight">
                            //             {
                            //                 keyHighlights.map((record, index) => {
                            //                     return (
                                                    
                            //                         <div>{record.tactic}: 
                            //                             {record.tactic && record.tactic === 'Change' ?
                            //                                 record.roi >= 0 ?
                            //                                 <span className="positive">
                            //                                     <span>{`${sessionStorage.getItem('symbolVal')}${parseFloat(record.roi).toFixed(2)}`}</span>
                            //                                     <span className="pipe">||</span>
                            //                                     <span>{`${parseFloat(record.roiPercentage).toFixed(2)}%`}</span>
                            //                                 </span>
                            //                                 :
                            //                                 <span className="negitive">
                            //                                     <span>{`${sessionStorage.getItem('symbolVal')}${parseFloat(record.roi).toFixed(2)}`}</span>
                            //                                     <span className="pipe">||</span>
                            //                                     <span>{`${parseFloat(record.roiPercentage).toFixed(2)}%`}</span>
                            //                                 </span>
                            //                                 :
                            //                                 <span>{` €${parseFloat(record.roi).toFixed(2)}`}</span>
                            //                             }
                            //                         </div>
                                                    
                            //                     )
                            //                 })
                            //             }
                            //             </div>
                            //         </div>
                            //     </div>
                            //     <div className="kyeDivide"></div>
                            //     <div className="keyCont">
                            //         <div className="keyHead">Brand ROI</div>
                            //         <div className="keyContent">
                            //             <div className="keyLeft icon2">

                            //             </div>
                            //             <div className="keyRight">
                            //             {
                            //                 keyHighlights.map((record, index) => {
                            //                     return (
                                                    
                            //                         <div>{record.tactic}: 
                            //                             {record.tactic && record.tactic === 'Change' ?
                            //                                 record.ltroi >= 0 ?
                            //                                 <span className="positive">
                            //                                     <span>{`${sessionStorage.getItem('symbolVal')}${parseFloat(record.ltroi).toFixed(2)}`}</span>
                                                               
                            //                                 </span>
                            //                                 :
                            //                                 <span className="negitive">
                            //                                     <span>{`${sessionStorage.getItem('symbolVal')}${parseFloat(record.ltroi).toFixed(2)}`}</span>
                                                               
                            //                                 </span>
                            //                                 :
                            //                                 <span>{` €${parseFloat(record.ltroi).toFixed(2)}`}</span>
                            //                             }
                            //                         </div>
                                                    
                            //                     )
                            //                 })
                            //             }
                            //             </div>
                            //         </div>
                            //     </div>
                            //     </div>
                            // </div>
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
                                    <div className="simButton">
                                    { (!(!this.props.revertActive  && !this.props.setOptimizerDefault)) && this.props.optType.length != 0 ?
                                        <Tooltip title="Optimize">
                                            <Button type="primary" className="createButtom optimize" disabled={!this.props.revertActive  && !this.props.setOptimizerDefault && this.props.optType.length === 0} onClick={this.props.handleSimulate} >
                                            <span className="icon"></span>
                                            Optimize
                                            </Button>
                                        </Tooltip>
                                        :
                                        <Tooltip title="Optimize">
                                            <Button type="primary" className="createButtom optimize disabled"  >
                                            <span className="icon"></span>
                                            Optimize
                                            </Button>
                                        </Tooltip>
                                    }
                                    </div>
                                    <span className="showColumns"> 
                                    <Popover content={contentProfitText} className="toolPop" ><Switch checked={showProfit} disabled={profitValueData === null} onChange={changeShowProfit} /> </Popover>
                                    Profit ROI <Popover content={contentProfit} className="toolPop" trigger="click" ><InfoCircleFilled /></Popover></span>
                                </h3>
                                <div className="simulateTable">
                                <Table
                                    className="components-table-demo-nested"
                                    columns={columns}
                                    dataSource={tableData}
                                    pagination={false}
                                    scroll={{ y: 'calc(100vh - 345px)', x: 'calc(100vw - 140px)' }}
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
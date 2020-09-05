import React, {Fragment} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Button, Typography, Icon, Tabs, Table, Modal, message, Tooltip } from 'antd';
import './Optimizer.less'
import OptimizerOptionsSelection from './OptimizerOptionsSelection'
import OptimizerDetails from './OptimizerDetails'
import { getBrands, getGeography, getPeriod, getTactics, getSubBrands, 
    getSpendingCostData, getKeyHighLights, revertData, simulateData, getSimulatedSpendData,
    getOptimizationType, saveResults, saveAsScenario, resetSaveAsScenario, checkStatus, discardChanges
} from '../../store/optimizer/actionCreator'
import { Redirect } from "react-router-dom";
import  SaveAs from './SaveAs'
import { Spin, Progress  } from 'antd';
import Heartbeat from 'react-heartbeat';
import ShareScenario from '../scenario/ShareScenario'
import { getUsersList, postShareScenario } from '../../store/scenario/actionCreator'
import { apiURL } from '../../config/apiConfig'

const { Title } = Typography;
const { confirm } = Modal;

const alertMsg = (msg) => {
    message.info(msg);
};

export class SimpulateMain extends React.Component {

    state = {
        brandList: [],
        geographyList: [],
        periodValue: [],
        tacticValue: [],
        subBrandValue: ['LGE'],
        optimizationType: [],
        multiProduct: true,
        message: 'Please Select Brand',
        spendNewData: [],
        simulatedMsg: '',
        visibleSaveAs: false,
        shareVisible: false,
        revertActive: false,
        minimizeSpendValue: 0,
        maximizeRevenueValue: 0,
        setOptimizerDefault: false,
    }

    componentDidMount() {
        this.props.resetSaveAsScenario()
        this.props.getSimulatedSpendData(this.props.scenarioId, this.props.modal)
        this.props.getUsersList()
        // if(this.props.isSimulated)
        // {
        //     this.props.getSimulatedSpendData(this.props.scenarioId)
        // } else {
        //     this.props.getBrands(this.props.modal)
        // }
        
    }

    showShareModal = () => {
        this.setState({
          shareVisible: true,
        });
    }

    handleShareOk = data => {
        this.props.postShareScenario(data)
        this.setState({
          shareVisible: false,
        });
      };
    
      handleShareCancel = e => {
        this.setState({
          shareVisible: false,
        });
      };
    
    showSaveAsModal = () => {
        this.setState({
          visibleSaveAs: true,
        });
    };

    handleSaveAsOk = e => {
        this.setState({
          visibleSaveAs: false,
        });
    };
    
      handleSaveAsCancel = e => {
        this.setState({
          visibleSaveAs: false,
        });
    }

    handleProductChange = (value) => {
    //     if (value.length > 2) {
    //         alert("Don't select more than 2 Brand")
    //         this.setState({
    //             brandList: '', 
    //             message: 'Please select Brand'
    //         })
    //     } else {
            this.setState({
                brandList: value,
                geographyList: [],
                periodValue: [],
                tacticValue: [],
                subBrandValue: ['LGE'],
                optimizationType: [],
                setOptimizerDefault: false,
                message: 'Please Select Geography'
            })

            
            this.props.getGeography(value, this.props.modal)
        //}
        
    }

    handleChangeSpendData = (obj) => {
        this.setState({spendNewData: obj, revertActive: true, setOptimizerDefault: false})
    }

    handleCompanyChange = (value) => {
        // if (value > 2) {
        //     alert("Don't select more than 2 Geography")
        //     this.setState({
        //         geographyList: '',
        //         message: 'Please select Geography'
        //     })
        // } else {
            this.props.getPeriod(this.props.modal)
            this.setState({
                geographyList: value,
                periodValue: [],
                tacticValue: [],
                subBrandValue: ['LGE'],
                optimizationType: [],
                message: 'Please Select Period',
                spendNewData: [],
                setOptimizerDefault: false,
            })
        //}
    }

    handleYearChange = (value) => {
        this.props.getTactics(this.state.brandList, this.state.geographyList, this.state.subBrandValue, value, this.props.modal)
        this.setState({
            periodValue: value,
            tacticValue: [],
            optimizationType: [],
            message: 'Please Select Tactics',
            spendNewData: [],
            setOptimizerDefault: false,
        })
    }
    handleTacticsChange = (value) => {
        this.props.getOptimizationType()
        this.setState({
            tacticValue: value,
            optimizationType: [],
            message: 'Please Select Optimization Type',
            spendNewData: [],
            setOptimizerDefault: false,
        })
    }
    handleOptimizationTypeChange = (value) => {
        const typeValue = value === 'Minimize Spend' ? this.state.minimizeSpendValue : this.state.maximizeRevenueValue;
        this.props.getSpendingCostData(this.state.brandList, this.state.geographyList, this.state.subBrandValue, this.state.periodValue, this.state.tacticValue, this.props.modal, value, typeValue)
        this.props.getKeyHighLights(this.state.brandList, this.state.geographyList, this.state.subBrandValue, this.state.periodValue, this.state.tacticValue, this.props.modal, value, typeValue)
        this.setState({
            optimizationType: value,
            message: '',
            spendNewData: [],
            setOptimizerDefault: true,
        })
    }
    handleMinimizeSpendValue = (value) => {
        this.props.getSpendingCostData(this.state.brandList, this.state.geographyList, this.state.subBrandValue, this.state.periodValue, this.state.tacticValue, this.props.modal, this.state.optimizationType, value)
        this.props.getKeyHighLights(this.state.brandList, this.state.geographyList, this.state.subBrandValue, this.state.periodValue, this.state.tacticValue, this.props.modal, this.state.optimizationType, value)
        this.setState({
            minimizeSpendValue: value,
            optimizationType: 'Minimize Spend',
            message: '',
            spendNewData: [],
            setOptimizerDefault: true,
        })
    }

    handleMaximizeRevenueValue = (value) => {
        this.props.getSpendingCostData(this.state.brandList, this.state.geographyList, this.state.subBrandValue, this.state.periodValue, this.state.tacticValue, this.props.modal, this.state.optimizationType, value)
        this.props.getKeyHighLights(this.state.brandList, this.state.geographyList, this.state.subBrandValue, this.state.periodValue, this.state.tacticValue, this.props.modal, this.state.optimizationType, value)
        this.setState({
            maximizeRevenueValue: value,
            optimizationType: 'Maximize Revenue',
            message: '',
            spendNewData: [],
            setOptimizerDefault: true,
        })
    }

    handleSubBrandChange = (value) => {
        this.props.getPeriod(this.props.modal)
        this.setState({
            subBrandValue: value,
            periodValue: [],
            tacticValue: [],
            optimizationType: [],
            spendNewData: [],
            message: 'Please Select Period',
            setOptimizerDefault: false,
        })
    }

    handleRevertChanges = () => {
        const $this = this
        confirm({
            title: 'Revert Changes?',
            content: 'Are you sure you want to revert the changes',
            onOk() {
                $this.props.revertData($this.props.oldSpendData)
                $this.setState({
                    spendNewData: [],
                });
            },
            onCancel() {},
          });
    }
    
    multiProductChange = e => {
        this.props.resetData()
        this.setState({
            multiProduct: e.target.value,
            geographyList: [],
            periodValue: [],
            tacticValue: [],
            subBrandValue: ['LGE'],
            brandList: [],
            optimizationType: [],
            message: 'Please Select Brands',
            spendNewData: [],
            simulatedMsg: '',
            setOptimizerDefault: false,
        });
    };

    static getDerivedStateFromProps(props, state) {
        let checkStatusFunction;
        //console.log(props.isOptimized, props.isSimulated, (!props.isOptimized || !props.isSimulated) && props.spendData.length !==0 && state.spendNewData.length === 0)
        if (props.simulatedMsg && props.simulatedMsg !== state.simulatedMsg) {
            alertMsg(props.simulatedMsg)
            props.setisSimulated()
            return {simulatedMsg: props.simulatedMsg, spendNewData: []}
        }

        if ((props.isOptimized || props.isSimulated) && props.selectedBrand && state.brandList.length <= 0)
        {
            return {
                brandList: props.selectedBrand,
                geographyList: props.selectedGeography,
                periodValue: props.selectedPeriod,
                tacticValue: props.selectedtactic,
                subBrandValue: props.selectedSubBrand,
                optimizationType: props.selectedOptimisationType,
                message: '',
                minimizeSpendValue: props.selectedOptimisationTypeValues && props.selectedOptimisationTypeValues[0].minimizeSpendValue ? props.selectedOptimisationTypeValues[0].minimizeSpendValue : 0,
                maximizeRevenueValue: props.selectedOptimisationTypeValues && props.selectedOptimisationTypeValues[0].maximizeRevenueValue ? props.selectedOptimisationTypeValues[0].maximizeRevenueValue : 0,
            } 
        }
        if ((!props.isOptimized || !props.isSimulated) && props.spendData.length !==0 && state.spendNewData.length === 0)
        {
            return {
                spendNewData: props.spendData,
                revertActive: false,
            } 
        }
        // if(props.setLoader, props.spendData.length === 0)
        // {
            
        //     setTimeout(() => {
        //         clearTimeout(checkStatusFunction)
        //         checkStatusFunction = props.checkStatus(props.scenarioId, state.modal);
        //     }, 10000);
            
        // }
        return null
    }

    handleReset = () => {
        const $this = this
        confirm({
            title: 'Reset Scenario?',
            content: 'Are you sure you want to reset this scenario?',
            onOk() {
                $this.props.resetData()
                $this.setState({
                    geographyList: [],
                    periodValue: [],
                    tacticValue: [],
                    subBrandValue: ['LGE'],
                    brandList: [],
                    optimizationType: [],
                    message: 'Please Select Brands',
                    spendNewData: [],
                    multiProduct: true,
                    simulatedMsg: '',
                    setOptimizerDefault: false,
                });
            },
            onCancel() {},
        });
    }

    handleSimulate = () => {
        const spendData = this.state.spendNewData
        this.setState({spendNewData: [], setOptimizerDefault: false, revertActive: false}) ;
        this.props.simulateData(this.props.modal, this.state.periodValue, this.state.geographyList, this.props.scenarioId, spendData, this.state.optimizationType, this.state.minimizeSpendValue, this.state.maximizeRevenueValue)
    }

    handleDiscard = () => {
        this.props.discardChanges(this.props.scenarioId)
    }

    handleSave = () => {
        this.setState({simulatedMsg: ''})
        this.props.saveResults(this.props.scenarioId)
    }

    saveAsScenarioHandle = (values) => {
        const scenarioNote = values.scenarioNote ? values.scenarioNote : 'NA'
        this.setState({visibleSaveAs: false, spendNewData: []},
            this.props.saveAsScenario(this.props.modal, values.scenarioname, scenarioNote, this.props.scenarioId)
            )
        
    }

    handleDownload = () => {
        window.location = `${apiURL}/Optimiser/Download/${this.props.scenarioId}/${this.props.scenarioName}`
    }

    checkStatusFunction = () => {
        this.props.checkStatus(this.props.scenarioId)
    }
        

    render() {
      const { scenarioName, isSaved, setLoader, spendData, keyHighlights, isSimulated, isOptimized, runSimulate, modal, saveAsId, scenariosList, scenarioList } = this.props
      const { multiProductChange, handleProductChange, handleCompanyChange,  handleOptimizationTypeChange, handleYearChange, handleTacticsChange, handleSubBrandChange } = this
      const url = `/optimizer/${saveAsId}/${modal}/${isSimulated ? `Simulated` : ''}`
            return (
                <div className="simulateContainer simulateNew">
                    { saveAsId && <Redirect to={url} /> }
                    {
                        this.props.setLoader && this.props.spendData.length === 0 &&
                        <Heartbeat heartbeatFunction={this.checkStatusFunction} heartbeatInterval={10000} />
                    }
                    {
                        this.props.setLoader && this.props.spendData.length === 0 &&
                            <div className="LoaderOptimize">
                                <Spin tip="Optimization in Progress..." className="mainLoader" > </Spin>
                            </div>
                    }
                        <div className="manageHeader">
                            { isSimulated ?
                                <Tooltip title="Download">
                                    <Button type="primary" className="createButtom download" disabled={!isSimulated} onClick={this.handleDownload} >Download</Button>
                                </Tooltip>
                                :
                                <Tooltip title="Download">
                                    <div className="buttonSpan createButtom download" disabled={true}>
                                    </div>
                                </Tooltip>
                            }
                            { isSimulated ?
                                <Tooltip title="Share">
                                    <Button type="primary" className="createButtom share" disabled={!isSimulated} onClick={this.showShareModal} >Share</Button>
                                </Tooltip>
                                :
                                <Tooltip title="Share">
                                    <div className="buttonSpan createButtom share" disabled={true}>
                                    </div>
                                </Tooltip>
                            }
                            { !(!(isOptimized || !spendData.length===0) || isSaved) ?
                                <Tooltip title="Save As">
                                    <Button type="primary" className="createButtom saveAs" disabled={!(isOptimized || !spendData.length===0) || isSaved} onClick={this.showSaveAsModal} >Save As</Button>
                                </Tooltip>
                                :
                                <Tooltip title="Save As">
                                    <div className="buttonSpan createButtom saveAs" disabled={true}>
                                    </div>
                                </Tooltip>
                            }
                            { !(!(isOptimized || !spendData.length===0) || isSaved) ?
                                <Tooltip title="Save">
                                    <Button type="primary" className="createButtom save" disabled={!(isOptimized || !spendData.length===0) || isSaved} onClick={this.handleSave} >Save</Button>
                                </Tooltip>
                                :
                                <Tooltip title="Save">
                                    <div className="buttonSpan createButtom save" disabled={true}>
                                    </div>
                                </Tooltip>
                            }
                            { !(!this.state.revertActive  && !this.state.setOptimizerDefault) ?
                                <Tooltip title="Optimize">
                                    <Button type="primary" className="createButtom optimize" disabled={!this.state.revertActive  && !this.state.setOptimizerDefault} onClick={this.handleSimulate} >Optimize</Button>
                                </Tooltip>
                                :
                                <Tooltip title="Optimize">
                                    <div className="createButtom optimize" disabled={true}>
                                    </div>
                                </Tooltip>
                            }
                            { (isSimulated && isOptimized && !isSaved) ?
                                <Tooltip title="Discard">
                                    <Button type="primary" className="createButtom revert discard" disabled={!(isSimulated && isOptimized && !isSaved) } onClick={this.handleDiscard} >Discard</Button>
                                </Tooltip>
                                :
                                <Tooltip title="Discard">
                                    <div className="createButtom revert discard" disabled={true}>
                                    </div>
                                </Tooltip>
                            }
                            { this.state.revertActive ?
                                <Tooltip title="Revert Changes">
                                    <Button type="primary" className="createButtom revert revertChanges" disabled={!this.state.revertActive} onClick={this.handleRevertChanges} >Revert Changes</Button>
                                </Tooltip>
                                :
                                <Tooltip title="Revert Changes">
                                    <div className="createButtom revert revertChanges" disabled={true}>
                                    </div>
                                </Tooltip>
                            }
                            { isSimulated ?
                                <Tooltip title="Reset">
                                    <Button type="primary" className="createButtom revert reset" disabled={!isSimulated} onClick={this.handleReset} >Reset</Button>
                                </Tooltip>
                                :
                                <Tooltip title="Reset">
                                    <div className="createButtom revert reset" disabled={true}>
                                    </div>
                                </Tooltip>
                            }
                            
                        </div>
                        <div className="simulateContent">
                            <OptimizerOptionsSelection 
                                {...this.state}
                                handleProductChange={handleProductChange}
                                handleCompanyChange={handleCompanyChange}
                                handleYearChange={handleYearChange}
                                handleTacticsChange={handleTacticsChange}
                                handleSubBrandChange={handleSubBrandChange}
                                multiProductChange={multiProductChange}
                                handleOptimizationTypeChange={handleOptimizationTypeChange}
                                handleMinimizeSpendValue={this.handleMinimizeSpendValue}
                                handleMaximizeRevenueValue={this.handleMaximizeRevenueValue}
                                {...this.props}
                            />
                            <OptimizerDetails 
                                {...this.state}
                                spendData={spendData}
                                keyHighlights={keyHighlights}
                                handleChangeSpendData={this.handleChangeSpendData}
                                scenarioName={scenarioName}
                            />
                        </div>

                    <Modal
                      title="Save As"
                      visible={this.state.visibleSaveAs}
                      onOk={this.handleSaveAsOk}
                      onCancel={this.handleSaveAsCancel}
                    >
                      <SaveAs 
                        handleOk={this.handleSaveAsOk} 
                        handleCancel={this.handleSaveAsCancel} 
                        scenarios={scenariosList}
                        scenarioList={scenarioList}
                        saveAsScenarioHandle={this.saveAsScenarioHandle}
                        modal={modal}
                        visible={this.state.visibleSaveAs}
                      />
                    </Modal>
                    <Modal
                      title={`Share Scenario ${this.props.scenarioName}`}
                      visible={this.state.shareVisible}
                      onOk={this.handleShareOk}
                      onCancel={this.handleShareCancel}
                    >
                      <ShareScenario 
                        handleOk={this.handleShareOk} 
                        handleCancel={this.handleShareCancel} 
                        usersList={this.props.usersList}
                        visible={this.state.shareVisible}
                        selectedId={this.props.scenarioId}
                        selectedName={this.props.scenarioName}
                        scenarios={scenariosList}
                      />
                    </Modal>
                </div>
            )
          }

}

const mapStateToProps = (state) => {
    const { brandOptions, geographyOptions, periodOptions, tacticsOptions, subBrandOptions, 
        spendData, keyHighlights, oldSpendData, selectedBrand, simulatedMsg, isSaved,
        selectedGeography, selectedPeriod, selectedtactic, selectedSubBrand, selectedOptimisationType, 
        optimizationTypeOptions, saveAsId, runSimulate, setLoader, isOptimized, selectedOptimisationTypeValues
    } =state.optimizer
  return {
      usersList: state.scenario.usersList,
      ajaxCallsInProgress: state.ajaxCallsInProgress,
      brandOptions,
      geographyOptions,
      periodOptions,
      tacticsOptions,
      subBrandOptions,
      optimizationTypeOptions,
      spendData,
      keyHighlights,
      oldSpendData,
      selectedBrand,
      selectedGeography,
      selectedPeriod,
      selectedtactic,
      selectedSubBrand,
      selectedOptimisationType,
      selectedOptimisationTypeValues,
      simulatedMsg,
      runSimulate,
      saveAsId,
      setLoader,
      isOptimized,
      isSaved,
  };
}

const mapDispatchToProps  = dispatch => bindActionCreators({
    getBrands,
    getGeography,
    getPeriod,
    getTactics,
    getSubBrands,
    getSpendingCostData,
    getKeyHighLights,
    revertData,
    simulateData,
    getSimulatedSpendData,
    getOptimizationType,
    saveResults,
    saveAsScenario,
    resetSaveAsScenario,
    checkStatus,
    getUsersList,
    postShareScenario,
    discardChanges
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SimpulateMain)
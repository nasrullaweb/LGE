import React, {Fragment} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Button, Typography, Icon, Tabs, Table, Modal, message, Tooltip} from 'antd';
import './Simulate.less'
import SimpulateOptionsSelection from './SimulateOptionsSelection'
import SimpulateDetails from './SimulateDetails'
import { getBrands, getGeography, getPeriod, getTactics, getSubBrands, saveResults,
    getSpendingCostData, getKeyHighLights, revertData, simulateData, getSimulatedSpendData,
    saveAsScenario, resetSaveAsScenario, removeSimulatedMsg
} from '../../store/simulate/actionCreator'
import { Redirect } from "react-router-dom";
import  SaveAs from './SaveAs'
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
        brandList: ['LGE'],
        geographyList: [],
        periodValue: [],
        tacticValue: [],
        subBrandValue: ['LGE'],
        showColumns: false,
        multiProduct: true,
        message: 'Please Select Period',
        spendNewData: [],
        simulatedMsg: '',
        visibleSaveAs: false,
        shareVisible: false,
    }

    componentDidMount() {
        this.props.resetSaveAsScenario()
        this.props.getUsersList()
        if(this.props.isSimulated)
        {
            this.props.getSimulatedSpendData(this.props.scenarioId)
        } else {

            if (this.props.Globalgeagraphy) {
                this.props.getPeriod(this.props.modal)
            }
            
        }
        
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
    //             message: 'Please select Brand to proceed further'
    //         })
    //     } else {
            this.setState({
                brandList: value,
                geographyList: [],
                periodValue: [],
                tacticValue: [],
                subBrandValue: ['LGE'],
                message: 'Please Select Period'
            })

            
            this.props.getPeriod(this.props.modal)
        //}
        
    }

    handleChangeSpendData = (obj) => {
        this.setState({spendNewData: obj})
    }

    handleCompanyChange = (value) => {
        // if (value > 2) {
        //     alert("Don't select more than 2 Geography")
        //     this.setState({
        //         geographyList: '',
        //         message: 'Please select Geography to proceed further'
        //     })
        // } else {
            this.props.getPeriod(this.props.modal)
            this.setState({
                geographyList: value,
                periodValue: [],
                tacticValue: [],
                subBrandValue: ['LGE'],
                message: 'Please Select Period'
            })
        //}
    }

    handleYearChange = (value) => {
        this.props.getTactics(this.state.brandList, this.props.Globalgeagraphy, this.state.subBrandValue, value, this.props.modal)
        this.setState({
            periodValue: value,
            subBrandValue: ['LGE'],
            tacticValue: [],
            message: 'Please Select Tactics'
        })
    }
    handleTacticsChange = (value) => {
        this.setState({
            tacticValue: value,
        })
    }

    handleTacticsOkChange = () => {
        this.setState({
            message: ''
        }, () => {
            this.props.getSpendingCostData(this.state.brandList, this.props.Globalgeagraphy, this.state.subBrandValue, this.state.periodValue, this.state.tacticValue, this.props.modal)
            this.props.getKeyHighLights(this.state.brandList, this.props.Globalgeagraphy, this.state.subBrandValue, this.state.periodValue, this.state.tacticValue, this.props.modal)
        })
    }

    handleSubBrandChange = (value) => {
        this.props.getPeriod(this.props.modal)
        this.setState({
            subBrandValue: value,
            periodValue: [],
            tacticValue: [],
            message: 'Please Select Period'
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
            brandList: ['LGE'],
            message: 'Please Select Period',
            spendNewData: [],
            simulatedMsg: '',
        });
    };

    changeShowColumns = checked => {
        this.setState({
            showColumns: checked,
        });
    }

    static getDerivedStateFromProps(props, state) {

        if (props.simulatedMsg) {
            alertMsg(props.simulatedMsg)
            props.removeSimulatedMsg()
            return {simulatedMsg: props.simulatedMsg, spendNewData: []}
        }

        if (props.isSimulated && props.selectedPeriod && state.periodValue.length <= 0)
        {
            return {
                brandList: props.selectedBrand,
                geographyList: props.selectedGeography,
                periodValue: props.selectedPeriod,
                tacticValue: props.selectedtactic,
                subBrandValue: props.selectedSubBrand,
                message: '',
            } 
        }
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
                    brandList: ['LGE'],
                    message: 'Please Select Period',
                    spendNewData: [],
                    multiProduct: true,
                    simulatedMsg: '',
                });
            },
            onCancel() {},
        });
    }

    handleSimulate = () => {
        this.props.simulateData(this.props.modal, this.state.periodValue, this.props.Globalgeagraphy, this.props.scenarioId, this.state.spendNewData, this.props.keyHighlights)
    }

    handleSave = () => {
        this.props.saveResults(this.props.modal, this.state.periodValue, this.props.Globalgeagraphy, this.props.scenarioId, this.props.spendData)
        this.props.setisSimulated()
    }

    saveAsScenario = (values) => {
        const scenarioNote = values.scenarioNote ? values.scenarioNote : 'NA'
        this.setState({visibleSaveAs: false, spendNewData: []}, () => {
            this.props.saveAsScenario(this.props.modal, this.state.periodValue, this.props.Globalgeagraphy, values.scenarioname, scenarioNote, this.props.spendData)
            this.props.setisSimulated()
        })
        
    }

    handleDownload = () => {
        window.location = `${apiURL}/Spend/Download/${this.props.scenarioId}/${this.props.scenarioName}`
    }

    render() {
      const { scenarioName, spendData, keyHighlights, isSimulated, runSimulate, modal, saveAsId, scenariosList, scenarioList, Globalgeagraphy } = this.props
      const { multiProductChange, handleProductChange, handleCompanyChange,  handleYearChange, handleTacticsChange, handleSubBrandChange, changeShowColumns, handleTacticsOkChange } = this
      const url = `/simulator/${saveAsId}/${modal}/${Globalgeagraphy}/${isSimulated ? `Simulated` : ''}`  

        return (
                <div className="simulateContainer simulateNew">
                    { saveAsId && <Redirect to={url} /> }
                    <div className="manageHeader ">
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
                        { (runSimulate && this.state.spendNewData.length === 0) ?
                            <Tooltip title="Save As">
                                <Button type="primary" className="createButtom saveAs" disabled={!(runSimulate && this.state.spendNewData.length === 0)} onClick={this.showSaveAsModal} >Save As</Button>
                            </Tooltip>
                            :
                            <Tooltip title="Save As">
                                <div className="buttonSpan createButtom saveAs" disabled={true}>
                                </div>
                            </Tooltip>
                        }
                        { (runSimulate && this.state.spendNewData.length === 0) ?
                            <Tooltip title="Save">
                                <Button type="primary" className="createButtom save" disabled={!(runSimulate && this.state.spendNewData.length === 0)} onClick={this.handleSave} >Save</Button>
                            </Tooltip>
                            :
                            <Tooltip title="Save">
                                <div className="buttonSpan createButtom save" disabled={true}>
                                </div>
                            </Tooltip>
                        }
                        { this.state.spendNewData.length != 0 ?
                            <Tooltip title="Simulate">
                                <Button type="primary" className="createButtom simulate" disabled={this.state.spendNewData.length === 0} onClick={this.handleSimulate} >Simulate</Button>
                            </Tooltip>
                            :
                            <Tooltip title="Simulate">
                                <div className="createButtom simulate" disabled={true}>
                                </div>
                            </Tooltip>
                        }
                        { this.state.spendNewData.length > 0 ?
                            <Tooltip title="Revert Changes">
                                <Button type="primary" className="createButtom revert revertChanges" disabled={this.state.spendNewData.length === 0} onClick={this.handleRevertChanges} >Revert Changes</Button>
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
                        <SimpulateOptionsSelection 
                            {...this.state}
                            handleProductChange={handleProductChange}
                            handleCompanyChange={handleCompanyChange}
                            handleYearChange={handleYearChange}
                            handleTacticsChange={handleTacticsChange}
                            handleSubBrandChange={handleSubBrandChange}
                            multiProductChange={multiProductChange}
                            handleTacticsOkChange={handleTacticsOkChange}
                            {...this.props}
                        />
                        
                        <SimpulateDetails 
                            {...this.state}
                            changeShowColumns={changeShowColumns}
                            spendData={spendData}
                            keyHighlights={keyHighlights}
                            handleChangeSpendData={this.handleChangeSpendData}
                            scenarioName={scenarioName}
                            Globalgeagraphy={Globalgeagraphy}
                            handleSimulate={this.handleSimulate}
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
                        saveAsScenario={this.saveAsScenario}
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
        spendData, keyHighlights, oldSpendData, selectedBrand, simulatedMsg, saveAsId,
        selectedGeography, selectedPeriod, selectedtactic, selectedSubBrand, runSimulate
    } =state.simulate
  return {
      usersList: state.scenario.usersList,
      ajaxCallsInProgress: state.ajaxCallsInProgress,
      brandOptions,
      geographyOptions,
      periodOptions,
      tacticsOptions,
      subBrandOptions,
      spendData,
      keyHighlights,
      oldSpendData,
      selectedBrand,
      selectedGeography,
      selectedPeriod,
      selectedtactic,
      selectedSubBrand,
      simulatedMsg,
      runSimulate,
      saveAsId,
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
    saveResults,
    saveAsScenario,
    resetSaveAsScenario,
    getUsersList,
    postShareScenario,
    removeSimulatedMsg,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SimpulateMain)
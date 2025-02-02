import React, {Fragment} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Select, Button, Modal, Typography, Layout } from 'antd';
import LefNav from '../common/LefNav.js';
import Header from '../common/Header.js';
import Footer from '../common/Footer.js';
import { resetScenario, getScenarios, postScenario, getModelList } from '../../store/scenario/actionCreator'
import { setMenu } from '../../store/auth/actionCreator'
import CreateScenario from '../scenario/CreateScenario'
import Scenario from '../scenario/Scenario'
import './Optimizer.less'
import OptimizerMain from './OptimizerMain'
import Loading from '../common/Loading'
import { clearData, getPeriod } from '../../store/optimizer/actionCreator'
import {PageView, initGA} from '../common/Tracking';

const { Option } = Select;
const { Title } = Typography;
const { Sider } = Layout;

function genareteMYScenarioList(scenarios)  {
  const scenarioList = scenarios.filter((scenario) => {
    return scenario.isShared === 0 && scenario.scenarioName && scenario.isSimulatorOptimiser === 'Optimizer'
  }
  )
  return scenarioList
}

function genareteScenarioList(scenarios)  {
  const scenarioList = scenarios.map((scenario) => {
    return scenario.scenarioName
  }
  )
  return scenarioList
}

export class Optimizer extends React.Component {

  state = {
    scenarioId: '',
    visible: false,
    scenarioName: '',
    modal: '',
    Globalgeagraphy: '',
    isSimulated: false,
    manageVisible: false,
    url: '',
    collapsed: true,
  }

  onCollapse = collapsed => {
      this.setState({ collapsed });
    };

  componentDidMount() {
    this.props.setMenu('optimizer')
    this.props.clearData()
    this.props.resetScenario()
    this.props.getScenarios()
    this.props.getModelList()
    initGA('UA-176821185-1', sessionStorage.getItem('user'));
      PageView();
    this.props.history.push('/optimizer')
    if(this.props.match.params.id && this.props.match.params.modal) {
      const scenarioId = this.props.match.params.id
      const modal= this.props.match.params.modal
      const geography= this.props.match.params.geography
      const isSimulated = this.props.match.params.isSimulated ? true : false

      this.setState({url: window.location.href, scenarioId: scenarioId, modal: modal, Globalgeagraphy: geography, visible: false, isSimulated: isSimulated})
    } else {
      this.setState({url: window.location.href})
    }
  }

  componentWillUnmount() {
    this.props.clearData()
    this.props.resetScenario()
  }

  componentDidUpdate() {
    if (this.state.url !== window.location.href) {
      window.location.reload();
    }
  }

  showManageModal = () => {
    this.setState({
      manageVisible: true,
    });
  };

  handleManageOk = e => {
    this.setState({
      manageVisible: false,
    });
  };

  handleManageCancel = e => {
    this.setState({
      manageVisible: false,
    });
  }

  static getDerivedStateFromProps(props, state) {
    const { addedId, addedIsSimulatorOptimiser, addedIsSimulated, addedModal, addedGeogrophay } = props
    const url = `/optimizer/${addedId}/${addedModal}/${addedGeogrophay}/${addedIsSimulated ? `Simulated` : ''}`
    if (props.saveAsId) {
      return {scenarioId: props.saveAsId, scenarioName: props.saveAsName}
    }
    if (props.addedId && state.scenarioId !== props.addedId) {
      window.location = window.location.origin + url
      return {scenarioId: props.addedId, visible: false, modal: props.addedModal, Globalgeagraphy: props.addedGeogrophay, isSimulated: props.addedIsSimulated }
    }
    if (props.scenariosList && state.scenarioId && !state.scenarioName ) {
      const scenarioObj = props.scenariosList.filter((scenario) => {
        return scenario.id == state.scenarioId
      })
      if(scenarioObj.length > 0) {

        const scenarioName = scenarioObj[0].scenarioName
        const modal = scenarioObj[0].model
        const Globalgeagraphy = scenarioObj[0].geography
        if (props.periodOptions.length <=0 && !state.isSimulated) {
          props.getPeriod(modal, Globalgeagraphy)
        }
        return {scenarioName, modal, Globalgeagraphy}
      }
    }
    //return { };
  }

  handleChange = (value, e) => {
    this.setState({
      scenarioId: value,
      modal: e.props.data_obj.model,
      Globalgeagraphy: e.props.data_obj.geography,
      isSimulated: e.props.data_obj.isSimulated ? true : false,
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  }

  setisSimulated = () => {
    this.setState({
      isSimulated: true,
    });
 }

 resetData = () => {
  this.props.clearData()
  this.props.getPeriod(this.state.modal, this.state.Globalgeagraphy)
  this.setState({
    isSimulated: false,
  });
 }

 postScenarioHandle = (data) => {
  this.setState({
    scenarioName: data.ScenarioName,
  }, this.props.postScenario(data));
}

    render() {
      const { ajaxCallsInProgress, scenariosList, modelList, postScenario } = this.props
      const scenarioList = genareteScenarioList(scenariosList)
      const myScenarioList = genareteMYScenarioList(scenariosList)
            return (
              <div className="container simulatorContainer">
                {ajaxCallsInProgress > 0 && <Loading />}
                <Header modelTitle="OPTIMIZER"  />
                <Layout className="layout">
                <Sider collapsible collapsed={this.state.collapsed} className="layout-aside-nav" onCollapse={this.onCollapse} width="211" collapsedWidth="50">
                  <LefNav  />
                </Sider>
                <Layout className="site-layout">
                  <div className="mainContent">
                  
                    {
                      !this.state.scenarioId &&
                      <div className="setScenario">
                        <div className="setScenarioHeader"></div>
                        <div className="setScenarioContent">
                          <Select
                              showSearch
                              style={{ width: 200 }}
                              placeholder="Select a Scenario"
                              optionFilterProp="children"
                              onChange={this.handleChange}
                              className="setPadding"
                              filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                              {
                                  myScenarioList.map((scenario) =>
                                  <Option key={scenario.id} value={scenario.id} data_obj={scenario}>{scenario.scenarioName}</Option>
                                  )
                              } 
                            </Select>
                            <span className="setPadding">Or</span> <Button type="primary" className="createButtom setPadding" onClick={this.showModal}>Create New Scenario</Button>
                            <Button type="primary" className="createButtom setPadding" onClick={this.showManageModal}>Manage Scenarios</Button>
                        </div>
                        </div>
                    }
                    {
                      this.state.scenarioId && 
                        <OptimizerMain 
                        {...this.state} 
                        setisSimulated={this.setisSimulated}
                        resetData={this.resetData}
                        scenarios={scenariosList}
                        scenarioList={scenarioList}
                        showManageModal={this.showManageModal}
                        showModal={this.showModal}
                      />
                    }
                    
                  </div>

                  <Modal
                      title="Create New Scenario"
                      visible={this.state.visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      className="createSc"
                    >
                      <CreateScenario 
                        handleOk={this.handleOk} 
                        handleCancel={this.handleCancel} 
                        scenarios={scenariosList}
                        scenarioList={scenarioList}
                        modelList={modelList}
                        postScenarioHandle={this.postScenarioHandle}
                        visible={this.state.visible}
                        isSimulatorOptimiser='Optimizer'
                        
                      />
                    </Modal>

                    {
                      this.state.manageVisible &&
                        <Modal
                          title="Manage Scenarios"
                          visible={this.state.manageVisible}
                          onOk={this.handleManageOk}
                          onCancel={this.handleManageCancel}
                          className="managePopup"
                        >
                          <Scenario 
                            handleManageOk={this.handleManageOk} 
                            handleManageCancel={this.handleManageCancel} 
                            pageName="Optimizer"
                          />
                        </Modal>
                    }
                <Footer />
                </Layout>
              </Layout>
              </div>
             
              
            )
          }

}

const mapStateToProps = (state) => {
  return {
      ajaxCallsInProgress: state.ajaxCallsInProgress,
      scenariosList: state.scenario.scenarioList,
      modelList: state.scenario.modelList,
      addedId: state.scenario.addedId,
      addedModal: state.scenario.addedModal,
      addedGeogrophay: state.scenario.addedGeogrophay,
      addedIsSimulated: state.scenario.addedIsSimulated,
      brandOptions: state.optimizer.brandOptions,
      periodOptions: state.simulate.periodOptions,
      saveAsId: state.optimizer.saveAsId,
      saveAsName: state.optimizer.saveAsName
  };
}

const mapDispatchToProps  = dispatch => bindActionCreators({
  getPeriod,
  getScenarios,
  resetScenario,
  setMenu,
  postScenario,
  clearData,
  getModelList,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Optimizer)
import React, {Fragment} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Header from '../common/Header.js';
import Footer from '../common/Footer.js';
import { Table, Menu, Typography, Button, Input, Modal, Icon, Dropdown, Tooltip  } from 'antd';
import './Scenario.less'
import Loading from '../common/Loading'
import { getScenarios, getModelList, postScenario, deleteScenario, getUsersList, postShareScenario } from '../../store/scenario/actionCreator'
//import { postShareScenario } from '../../store/simulate/actionCreator'
import { Link  } from 'react-router-dom'; 
import CreateScenario from './CreateScenario'
import { Redirect } from "react-router-dom";
import { setMenu } from '../../store/auth/actionCreator'
import Moment from 'react-moment';
import ShareScenario from './ShareScenario'
import moment from 'moment';
import {PageView, initGA} from '../common/Tracking';
import ColoredScrollbars from '../common/ColoredScrollbars';



const { Title } = Typography;
const { confirm } = Modal;
const { Search } = Input;


function genareteScenarioList(scenarios)  {
  const scenarioList = scenarios.map((scenario) => {
    return scenario.scenarioName
  }
  )
  return scenarioList
}

export class Scenario extends React.Component {

  state = {
    filterScenario: 'my',
    searchText: '',
    visible: false,
    shareVisible: false,
    scenarioList: [],
    selectedId: '',
    selectedName: '',
  }

  componentDidMount() {
    this.props.getScenarios()
    this.props.getModelList()
    this.props.getUsersList()
    initGA('UA-176821185-1', sessionStorage.getItem('user'));
      PageView();
    // this.props.setMenu('scenario')
    // this.props.history.push('/scenario')
  }

  showConfirm = (id, deleteScenario) => {
    confirm({
      title: 'Do you want to delete these items?',
      content: 'Are you sure you want to delete this scenario',
      onOk() {
        deleteScenario(id)
      },
      onCancel() {},
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.scenario.length > 0 && state.scenarioList.length == 0) {
      return {scenarioList: genareteScenarioList(props.scenario)}
    }
    //return { };
  }

  

  handleClick = (e) => {
    this.setState({
      filterScenario: e.key
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  showShareModal = (id, name) => {
    this.setState({
      shareVisible: true,
      selectedId: id,
      selectedName: name,
    });
  }

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  handleShareOk = data => {
    this.props.postShareScenario(data)
    this.setState({
      shareVisible: false,
      selectedId: '',
      selectedName: '',
    });
  };

  handleShareCancel = e => {
    this.setState({
      shareVisible: false,
      selectedId: '',
      selectedName: '',
    });
  };

  getFilterData = (scenarios) => {
    let scenarioData

    if (this.state.filterScenario === 'my') {
      scenarioData = scenarios.filter(scenario => scenario.isShared === 0 && scenario.isSimulatorOptimiser === this.props.pageName);
    } else if (this.state.filterScenario === 'shared') {
      scenarioData = scenarios.filter(scenario => scenario.isShared === 1 && scenario.isSimulatorOptimiser === this.props.pageName);
    } else {
      scenarioData = scenarios.filter(scenario => scenario.isSimulatorOptimiser === this.props.pageName);
    }
    
    return scenarioData
  }

  searchFilterData = (data) => {
    let scenarioData
    const { searchText } = this.state

      scenarioData = data.filter(scenario => (scenario.scenarioName.toLowerCase().includes(searchText.toLowerCase()) || scenario.scenarioNotes.toLowerCase().includes(searchText.toLowerCase())  || scenario.model.toLowerCase().includes(searchText.toLowerCase())));
    
    
    return scenarioData
  }

  onSearch = (event) => {
    const searchText = event.target.value
    this.setState({searchText})
  }

  postScenarioHandle = (data) => {
    this.props.postScenario(data)
  }

  onChange = (pagination, filters, sorter, extra) => {
  }
    render() {
      const columns = [
        {
          title: 'Scenario Name',
          dataIndex: 'scenarioName',
          key: 'scenarioName',
          //defaultSortOrder: 'descend',
          render: (text, record) => <span className="borderRight"><Link to={`/${record.isSimulatorOptimiser === 'Optimizer' ? 'optimizer' : 'simulator'}/${record.id}/${record.model}/${record.geography}/${record.isSimulated ? `Simulated` : ''}`}>{text}</Link></span>,
          sorter: (a, b) => a.scenarioName.length - b.scenarioName.length,
        },
        // {
        //   title: 'Simulator/Optimizer',
        //   dataIndex: 'isSimulatorOptimiser',
        //   key: 'isSimulatorOptimiser',
        //   render: (text, record) => <span className="borderRight">{text}</span>,
        //   //defaultSortOrder: 'descend',
        //   //sorter: (a, b) => a.scenarioNotes.length - b.scenarioNotes.length,
        // },
        {
          title: 'Scenario Notes',
          dataIndex: 'scenarioNotes',
          key: 'scenarioNotes',
          render: (text, record) => <span className="borderRight moreWidth">{text}</span>,
          //defaultSortOrder: 'descend',
          //sorter: (a, b) => a.scenarioNotes.length - b.scenarioNotes.length,
        },
        {
          title: 'Model',
          dataIndex: 'model',
          sorter: (a, b) => a.model.length - b.model.length,
          render: (text, record) => <span className="borderRight">{text}</span>,
        },
        {
          title: 'Geography',
          dataIndex: 'geography',
          sorter: (a, b) => a.geography.length - b.geography.length,
          render: (text, record) => <span className="borderRight">{text}</span>,
        },
        {
          title: 'Created By',
          dataIndex: 'createdBy',
          sorter: (a, b) => a.createdBy.length - b.createdBy.length,
          sortDirections: ['descend', 'ascend'],
          render: (text, record) => <span className="borderRight">{text}</span>,
        },
        {
          title: 'Created Date',
          dataIndex: 'createdDate',
          render: (text) => <span className="borderRight">{moment(new Date(text)).format("YYYY-MM-DD HH:MM")}</span>,
          sorter: (a, b) => a.createdDate.length - b.createdDate.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Last Modified',
          dataIndex: 'lastModified',
          render: (text) => {
          let newVal = text !== null ? moment(new Date(text)).format("YYYY-MM-DD HH:MM") : ''
          return <span className="borderRight">{newVal}</span>
        },
          sorter: (a, b) => a.createdDate.length - b.createdDate.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Action',
          render: (text, record) => (
            record.isShared ? 
              <div>
                  <Link to={`/${record.isSimulatorOptimiser === 'Optimizer' ? 'optimizer' : 'simulator'}/${record.id}/${record.model}/${record.geography}/${record.isSimulated ? `Simulated` : ''}`}>
                    <Tooltip title="Edit">
                      <Icon type="edit" className="tableActionsIcons" />
                    </Tooltip>
                  </Link>
                  <Icon type="share-alt" className="tableActionsIcons disabled" />
                  <Icon type="delete" className="tableActionsIcons disabled" />
                </div>
              :
              <div>
                <Link to={`/${record.isSimulatorOptimiser === 'Optimizer' ? 'optimizer' : 'simulator'}/${record.id}/${record.model}/${record.geography}/${record.isSimulated ? `Simulated` : ''}`}>
                  <Tooltip title="Edit">
                    <Icon type="edit" className="tableActionsIcons" />
                  </Tooltip>
                </Link>
                { record.isSimulated ? 
                    <Tooltip title="Share"><Icon type="share-alt" className="tableActionsIcons" onClick={() => this.showShareModal(record.id, record.scenarioName)} /></Tooltip>
                  :
                  <Icon type="share-alt" className="tableActionsIcons disabled" />
                }
                <Tooltip title="Delete"><Icon type="delete" className="tableActionsIcons" onClick={() => this.showConfirm(record.id, this.props.deleteScenario)} /></Tooltip></div>
              
          )
        },
      ];
      const { ajaxCallsInProgress, scenario, modelList, postScenario, addedId, usersList, addedIsSimulatorOptimiser, addedIsSimulated, addedModal } = this.props
      const filterData = this.getFilterData(scenario)
      const finalData = this.searchFilterData(filterData)
      const url = `/${addedIsSimulatorOptimiser === 'Optimizer' ? 'optimizer' : 'simulator'}/${addedId}/${addedModal}/${addedIsSimulated ? `Simulated` : ''}`
      const scenarioListNew = genareteScenarioList(this.props.scenario)

            return (
              <div className="container simulatorContainer">
                {/* { addedId && <Redirect to={url} /> }
                {ajaxCallsInProgress > 0 && <Loading />}
                <Header /> */}
                  <div className="mainContent">
                    <div className="manageContainer">
                      <div className="manageFilters">
                        <Menu onClick={this.handleClick} className="menuContainer" selectedKeys={[this.state.filterScenario]} mode="horizontal">
                          <Menu.Item key="my">
                            My Scenarios
                          </Menu.Item>
                          <Menu.Item key="shared">
                            Shared Scenarios
                          </Menu.Item>
                          <Menu.Item key="all">
                            All Scenarios
                          </Menu.Item>
                        </Menu>
                        {/* <Button type="primary" className="createButtom" onClick={this.showModal}>Create New Scenario</Button> */}
                        <Search placeholder="Search" value={this.state.searchText} onChange={this.onSearch} />
                      </div>
                      <div className="manageTable">
                        <ColoredScrollbars>
                          <Table columns={columns} dataSource={finalData} onChange={this.onChange} scroll={{ x: true }} />
                        </ColoredScrollbars>
                      </div>
                    </div>
                    {/* <Modal
                      title="Create New Scenario"
                      visible={this.state.visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                    >
                      <CreateScenario 
                        handleOk={this.handleOk} 
                        handleCancel={this.handleCancel} 
                        scenarios={scenario}
                        scenarioList={scenarioListNew}
                        modelList={modelList}
                        postScenarioHandle={this.postScenarioHandle}
                        visible={this.state.visible}
                      />
                    </Modal> */}
                    <Modal
                      title={`Share Scenario ${this.state.selectedName}`}
                      visible={this.state.shareVisible}
                      onOk={this.handleShareOk}
                      onCancel={this.handleShareCancel}
                    >
                      <ShareScenario 
                        handleOk={this.handleShareOk} 
                        handleCancel={this.handleShareCancel} 
                        usersList={usersList}
                        visible={this.state.shareVisible}
                        selectedId={this.state.selectedId}
                        selectedName={this.state.selectedName}
                        scenarios={scenario}
                      />
                    </Modal>
                  </div>
                {/* <Footer /> */}
              </div>
             
              
            )
          }

}

const mapStateToProps = (state) => {
  return {
      ajaxCallsInProgress: state.ajaxCallsInProgress,
      accessToken: state.auth.accessToken,
      scenario: state.scenario.scenarioList,
      modelList: state.scenario.modelList,
      addedId: state.scenario.addedId,
      addedModal: state.scenario.addedModal,
      addedIsSimulated: state.scenario.addedIsSimulated,
      addedIsSimulatorOptimiser: state.scenario.addedIsSimulatorOptimiser,
      usersList: state.scenario.usersList,
  };
}

const mapDispatchToProps  = dispatch => bindActionCreators({
  getScenarios,
  getModelList,
  postScenario,
  deleteScenario,
  getUsersList,
  setMenu,
  postShareScenario,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Scenario)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../common/Header.js';
import Footer from '../common/Footer.js';
import { Table, Typography, Button, Modal, Switch, Icon, Tabs, Layout } from 'antd';
import LefNav from '../common/LefNav.js';
import { getUsers, postUser, deleteUser, getRolesList, postRole } from '../../store/user/actionCreator'
import Loading from '../common/Loading'
import CreateUsers from './CreateUser.js';
import CreateRoles from './CreateRole.js';
import { setMenu } from '../../store/auth/actionCreator'


const { Title } = Typography;
const { confirm } = Modal;
const { TabPane } = Tabs;
const { Sider } = Layout;

class ManageUser extends Component {
    state = { visible: false, usersList: [], currentActiveTab: 'users', collapsed: true,
}

onCollapse = collapsed => {
    this.setState({ collapsed });
  };

    componentDidMount() {
        this.props.getUsers();
        this.props.getRolesList();
        this.props.setMenu('user')
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

    showRoleModal = () => {
        this.setState({
            roleVisible: true,
        })
    }

    handleRoleOk = e => {
        this.setState({
            roleVisible: false,
        });
    };

    handleRoleCancel = e => {
        this.setState({
            roleVisible: false,
        });
    };

    showConfirm = (id, deleteUser) => {
        confirm({
            title: 'Do you want to delete this user?',
            content: 'Are you sure you want to delete this user',
            onOk() {
                deleteUser(id)
            },
            onCancel() { },
        });
    }

    activateTab = (key) => {
        this.setState({
            currentActiveTab: key
        })
    }

    render() {

        const columns = [
            {
                title: 'Full Name',
                dataIndex: 'fullName',
                key: 'fullName',
                sorter: (a, b) => a.fullName.length - b.fullName.length,
                width: '20%',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                sorter: (a, b) => a.email.length - b.email.length,
                sortDirections: ['descend', 'ascend'],
                width: '30%',
            },
            {
                title: 'Role',
                dataIndex: 'role',
                sorter: (a, b) => a.role.length - b.role.length,
                sortDirections: ['descend', 'ascend'],
                width: '20%',
            },
            {
                title: 'Status',
                dataIndex: 'isActive',
                render: (text, record) => (
                    record.isActive === true && <Switch defaultChecked disabled />
                )
            },
            {
                title: 'Actions',
                render: (text, record) => <Icon type="delete" className="tableActionsIcons" onClick={() => this.showConfirm(record.id, this.props.deleteUser)} />
            }
        ];

        const roleColumns = [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
                width: '50%',
            },
            {
                title: 'Role',
                dataIndex: 'name',
                key: 'name',
                width: '50%',
            }
        ];

        const { ajaxCallsInProgress, users, postUser, rolesList, postRole } = this.props
        return (
            <div className="container simulatorContainer">
                {ajaxCallsInProgress > 0 && <Loading />}
                <Header />
                <Layout className="layout">
                <Sider collapsible collapsed={this.state.collapsed} className="layout-aside-nav" onCollapse={this.onCollapse} width="211" collapsedWidth="50">
                  <LefNav  />
                </Sider>
                <Layout className="site-layout">
                <div className="mainContent">
                    <div className="manageContainer">
                        <div className="manageHeader">
                            <Title>Manage Users</Title>
                            {
                                this.state.currentActiveTab === 'users' ?
                                <Button id="btnUser" type="primary" className="createButtom" onClick={this.showModal}>Create User</Button>
                                :
                                <Button id="btnRole" type="primary" className="createButtom" onClick={this.showRoleModal}>Create Role</Button>
                            }
                        </div>
                        <div className="manageTable">
                            <Tabs defaultActiveKey="1" onChange={this.activateTab}>
                                <TabPane tab="Users" key="users" type="card">
                                    <Table columns={columns} dataSource={users} pagination={false} />
                                </TabPane>
                                <TabPane tab="Roles" key="roles">
                                    <Table columns={roleColumns} dataSource={rolesList} pagination={false} />
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                    <Modal
                        title="Create New User"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}>
                        <CreateUsers
                            handleOk={this.handleOk}
                            handleCancel={this.handleCancel}
                            postUser={postUser}
                            rolesList={rolesList}
                        />
                    </Modal>
                    <Modal
                        title="Create New Role"
                        visible={this.state.roleVisible}
                        onOk={this.handleRoleOk}
                        onCancel={this.handleRoleCancel}
                    >
                        <CreateRoles
                             handleOk={this.handleRoleOk}
                             handleCancel={this.handleRoleCancel}
                             postRole={postRole}
                        />
                    </Modal>
                </div>
                <Footer />
                </Layout>
              </Layout>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        ajaxCallsInProgress: state.ajaxCallsInProgress,
        accessToken: state.auth.accessToken,
        users: state.users.usersList,
        addedId: state.users.addedId,
        rolesList: state.users.rolesList
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getUsers,
    postUser,
    setMenu,
    deleteUser,
    getRolesList,
    postRole
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser)

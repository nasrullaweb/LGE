import React from 'react'
import { Row, Col, Menu, Anchor, Icon, Dropdown } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { setMenu, logOut } from '../../store/auth/actionCreator'
import { Link  } from 'react-router-dom'; 
const { SubMenu } = Menu;

export class LeftNav extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            showModal: false,
            userLoggedIn: false,
        }

    }

    handleClick = (e) => {
        this.props.setMenu(e.key)
    }
    logout = link => {
        this.props.logOut()
    }

     
      
    render() {
        const { user, currentMenu } = this.props
        const Role = JSON.parse(sessionStorage.getItem('role'))
        const menuSetting = (
            <Menu>
                {
                    (Role === 'SuperAdmin') &&
                        <Menu.Item key="user">
                            <Link to="/users">User Management</Link>
                        </Menu.Item>
                }
                <Menu.Item key="changePassword">
                    <Link to="/changePassword">Change Password</Link>
                </Menu.Item>
            </Menu>
          );
            return (
              <div className="nav">
                    {/* <div className="collapsediv" onClick={this.props.collapseChange()}>
                      <span className="collapseIcon"></span>
                    </div> */}
                    { user &&
                        <Menu theme="dark" onClick={this.handleClick} className="menuContainer" selectedKeys={[currentMenu]} mode="inline">
                            {/* <Menu.Item key="home">
                              <Link to="/home">
                                <span className="MenuItems">
                                  <span className="iconMenu"><Icon type="home" /></span>
                                  <span className="textMenu">Home</span>
                                </span>
                              </Link>
                            </Menu.Item> */}
                            <Menu.Item key="dataViewer">
                              <Link to="/DataSnapshot">
                                <span className="MenuItems">
                                  <span className="iconMenu dataSnapshot"></span>
                                  <span className="textMenu">Data Snapshot</span>
                                </span>
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="resultsViewer">
                              <Link to="/MarketingROI">
                                <span className="MenuItems">
                                  <span className="iconMenu resultViewer"></span>
                                  <span className="textMenu">Marketing ROI</span>
                                </span>
                              </Link>
                            </Menu.Item>
                            {/* <Menu.Item key="scenario">
                              <Link to="/scenario">
                                <span className="MenuItems">
                                  <span className="iconMenu"><Icon type="profile" /></span>
                                  <span className="textMenu">Manage Scenarios</span>
                                </span>
                              </Link>
                            </Menu.Item> */}
                            <Menu.Item key="simulator">
                              <Link to="/simulator">
                                <span className="MenuItems">
                                  <span className="iconMenu simulator"></span>
                                  <span className="textMenu">Simulator</span>
                                </span>
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="optimizer">
                              <Link to="/optimizer">
                                <span className="MenuItems">
                                  <span className="iconMenu optimizer"></span>
                                  <span className="textMenu">Optimizer</span>
                                </span>
                              </Link>
                            </Menu.Item>
                            {/* <SubMenu key="sub1" title={
                              <span className="MenuItems">
                                <span className="iconMenu"><Icon type="setting" /></span>
                                <span className="textMenu">Settings</span>
                            </span>
                            }>
                              {
                                  (Role === 'SuperAdmin') &&
                                      <Menu.Item key="user">
                                          <Link to="/users">User Management</Link>
                                      </Menu.Item>
                              }
                              <Menu.Item key="changePassword">
                                  <Link to="/changePassword">Change Password</Link>
                              </Menu.Item>
                            </SubMenu> */}
                            {/* <Menu.Item key="simulator"  onClick={this.logout} className="menuLogout">
                                <span className="MenuItems">
                                  <span className="iconMenu"><Icon type="logout" /></span>
                                  <span className="textMenu">Logout</span>
                                </span>
                            </Menu.Item> */}
                        </Menu>
                    }
                    {/* { user &&
                        <Dropdown overlay={menuSetting} trigger={['hover']} overlayClassName='DropDownOverLay'>
                            <span className="MenuItems">
                              <span className='logout bellIcon iconMenu'><Icon type="setting" /></span>
                              <span className="textMenu">Settings</span>
                            </span>
                        </Dropdown>
                    } */}
              </div>
             
              
            )
          }

}

const mapStateToProps = (state) => {
    return {
        ajaxCallsInProgress: state.ajaxCallsInProgress,
        user: state.auth.user,
        currentMenu: state.auth.currentMenu,
    };
  }
  
  const mapDispatchToProps  = dispatch => bindActionCreators({
    setMenu,
    logOut,
  }, dispatch)
  
  export default connect(mapStateToProps, mapDispatchToProps)(LeftNav)
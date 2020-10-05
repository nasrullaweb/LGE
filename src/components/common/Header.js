import React from 'react'
import { Row, Col, Menu, Anchor, Icon, Dropdown, Tooltip } from 'antd';
import logo from '../../images/LG_LG_Logo_Tool.png';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { setMenu, logOut } from '../../store/auth/actionCreator'
import { Link  } from 'react-router-dom'; 
import IdleTimer from 'react-idle-timer';


export class Header extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            timeout:1000 * 60 * 15,
            showModal: false,
            userLoggedIn: false,
            isTimedOut: false
        }

        this.idleTimer = null
        this.onAction = this._onAction.bind(this)
        this.onActive = this._onActive.bind(this)
        this.onIdle = this._onIdle.bind(this)
    }

    handleClick = (e) => {
        this.props.setMenu(e.key)
    }
    logout = link => {
        this.props.logOut()
    }

    
    _onAction(e) {
        this.setState({isTimedOut: false})
      }
     
      _onActive(e) {
        this.setState({isTimedOut: false})
      }
     
      _onIdle(e) {
        const isTimedOut = this.state.isTimedOut
        if (isTimedOut) {
            this.props.logOut()
        } else {
          this.setState({showModal: true})
          this.idleTimer.reset();
          this.setState({isTimedOut: true})
        }
        
      }
    render() {
        const { user, currentMenu } = this.props
        const Role = JSON.parse(sessionStorage.getItem('role'))
        const menuSetting = (
            <Menu>
                {
                    (Role === 'SuperAdmin') &&
                        <Menu.Item key="user">
                            <Link to="/users"><Icon type="user" /> User Management</Link>
                        </Menu.Item>
                }
                <Menu.Item key="changePassword">
                    <Link to="/changePassword"><Icon type="lock" /> Change Password</Link>
                </Menu.Item>
                {/* <Menu.Item key="logout">
                    <Link onClick={this.logout}><Icon type="logout" /> Logout</Link>
                </Menu.Item> */}
            </Menu>
          );
            return (
              <div className="header">
                <IdleTimer
                    ref={ref => { this.idleTimer = ref }}
                    element={document}
                    onActive={this.onActive}
                    onIdle={this.onIdle}
                    onAction={this.onAction}
                    debounce={250}
                    timeout={this.state.timeout} />
                <Row type="flex" justify="center" align="top">
                <div className="modelTitle">
                           {this.props.modelTitle}
                       </div>
                    <Col xs={24} sm={16}>
                        <div className="logo">
                            <img src={logo} />
                        </div>
                       
                        
                    </Col>
                    <Col xs={24} sm={8}>
                        { user &&
                            <div>
                                <Tooltip title="Logout">
                                    <Link onClick={this.logout} className='logout logoutIcon'>
                                    </Link>
                                </Tooltip>
                                
                                <Dropdown overlay={menuSetting} trigger={['hover']} overlayClassName='DropDownOverLay headerPopup'>
                                    <span className='logout bellIcon'>
                                        
                                    </span>
                                </Dropdown>
                                <Link to="/home"  className='logout homeIcon'>
                                </Link>
                                <span className='logout homeLogo'>
                                </span>
                            </div>
                        }
                    </Col>
                </Row>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header)
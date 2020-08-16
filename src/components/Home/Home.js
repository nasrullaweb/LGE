import React from 'react'
import { Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { setMenu, logOut } from '../../store/auth/actionCreator'
import { Link  } from 'react-router-dom'; 

import Header from '../common/Header.js';
import Footer from '../common/Footer.js';


export class Home extends React.Component {
  componentDidMount() {
    this.props.setMenu('home')
  }
    render() {
            return (
              <div className="container">
                <Header />
                  <div className="mainContent homeContent">
                    <div className="manageContainer homeContainer">
                      <div className="btnContainer">
                      <div className="leftEle">
                        <Link to="/DataSnapshot">
                          <button className="home-button btn1"></button>
                        </Link>
                      </div>
                      <div className="leftEle">
                        <Link to="/MarketingROI">
                          <button className="home-button btn2"></button>
                        </Link>
                      </div>
                      <div className="leftEle">
                        <Link to="/scenario">
                          <button className="home-button btn3"></button>
                        </Link>
                      </div>
                      </div>
                    </div>
                  </div>
                <Footer />
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home)
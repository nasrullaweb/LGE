import React, {Fragment} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom'; 
import { setMenu, logOut } from '../../store/auth/actionCreator'
import { Spin } from 'antd';
import Header from '../common/Header.js';
import Footer from '../common/Footer.js';
import { PrivateRoute } from '../../utils/privateRoute';
import Scenario from '../scenario/Scenario';
import Simulate from '../simulate/Simulate';


export class Layout extends React.Component {
    render() {
      const { ajaxCallsInProgress } = this.props
            return (
              <div className="container">
                {this.props.ajaxCallsInProgress < 0 && <Spin tip="Loading..." > </Spin>}
                <Header {...this.props} />
                  <div className="mainContent">
                        <Switch>
                            <Route  path="/" component={Scenario} />
                            <Route  path="/scenario" component={Scenario} />
                            <Route  path="/simulateor" component={Simulate} />
                        </Switch>
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

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
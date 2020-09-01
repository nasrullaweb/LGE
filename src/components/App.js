import React from 'react';
import Login from './login/Login' 
import ForgetPasswordForm from './login/ForgetPassword'
import ResetPassword from './login/ResetPassword'
import { BrowserRouter, Route, Switch, Redirect, Link, Router  } from 'react-router-dom'
import Layout from './layout/Layout'
import { history } from '../utils/history';
import { PrivateRouteNew } from '../utils/privateRouteNew';
import Scenario from './scenario/Scenario';
import Simulate from './simulate/Simulate';
import Optimizer from './optimizer/Optimizer';
import DataViewer from './dataViewer/DataViewer'
import ResultsViewer from './resultsViewer/ResultsViewer'
import ManageUser from './user/ManageUser'
import Home from './Home/Home'
import ChangePassword from './user/ChangePassword'

import './App.less'

class App extends React.Component {

    

    render() {
        
        return (
            <div className="mainContainer">
                {/* {this.props.ajaxCallsInProgress < 0 && <Spin tip="Loading..." > </Spin>}
                <Header {...this.props} />*/}
                
                    <Router history={history}>
                    <Switch>
                        <PrivateRouteNew  exact path="/" component={Home} />
                        <PrivateRouteNew  path="/home" component={Home} />
                        <PrivateRouteNew  path="/scenario" component={Scenario} />
                        <PrivateRouteNew path="/simulator/:id?/:modal?/:isSimulated?" component={Simulate} />
                        <PrivateRouteNew  path="/optimizer/:id?/:modal?/:isSimulated?" component={Optimizer} />
                        <PrivateRouteNew  path="/users" component={ManageUser} />
                        <PrivateRouteNew  path="/changePassword" component={ChangePassword} />
                        <PrivateRouteNew  path="/DataSnapshot" component={DataViewer} />
                        <PrivateRouteNew  path="/MarketingROI" component={ResultsViewer} />
                        <Route path="/login" component={Login} />
                        <Route path="/forgetPassword" component={ForgetPasswordForm} />
                        <Route path="/resetPassword" component={ResetPassword} />
                        </Switch>
                    </Router>
                
                {/* <Footer /> */}
            </div>
        )
    }
}

  
  export default App
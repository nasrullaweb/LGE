import React, {Fragment} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { logOut } from '../../store/auth/actionCreator'

class isAuth extends React.Component {
    redirectToLogin = () => {
        const url = window.location.origin + '/login'
        window.location = url
    }

    render() {
        
        return (
            <Fragment>
                {!this.props.user &&
                 this.redirectToLogin
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        accessToken: state.auth.accessToken,
    };
  }
  
  const mapDispatchToProps  = dispatch => bindActionCreators({
    logOut
  }, dispatch)
  
  export default connect(mapStateToProps, mapDispatchToProps)(isAuth)
import { combineReducers } from 'redux'
import scenario from '../store/scenario/reducer'
import auth from '../store/auth/reducer'
import ajaxCallsInProgress from '../store/ajaxStatus/reducer'
import RVajaxCallsInProgress from '../store/RVajaxStatus/reducer'
import DVajaxCallsInProgress from '../store/DVajaxStatus/reducer'
import GBajaxCallsInProgress from '../store/GBajaxStatus/reducer'
import simulate from '../store/simulate/reducer'
import optimizer from '../store/optimizer/reducer'
import users from '../store/user/reducer'
import dataViewer from '../store/dataViewer/reducer'
import resultsViewer from '../store/resultsViewer/reducer'

const rootReducer = combineReducers({
    auth,
    scenario,
    simulate,
    optimizer,
    ajaxCallsInProgress,
    RVajaxCallsInProgress,
    DVajaxCallsInProgress,
    GBajaxCallsInProgress,
    users,
    dataViewer,
    resultsViewer,
})

export default rootReducer


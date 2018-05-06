import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { loginUser } from '../Actions';
import App from '../Components/App';

const mapStateToProps = (state, ownProps) => ({ token: state.token, ...ownProps })

const mapDispatchToProps = dispatch => ({ loginUser: token => { dispatch(loginUser(token)) }})

const AppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

export default AppContainer;

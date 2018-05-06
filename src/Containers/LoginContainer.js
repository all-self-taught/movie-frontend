import { connect } from 'react-redux';
import { loginUser } from '../Actions';
import Login from '../Components/login';

const mapStateToProps = (state, ownProps) => ({ token: state.token, ...ownProps })

const mapDispatchToProps = dispatch => ({ loginUser: token => { dispatch(loginUser(token)) }})

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)

export default LoginContainer;

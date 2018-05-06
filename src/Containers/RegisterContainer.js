import { connect } from 'react-redux';
import { loginUser } from '../Actions';
import Register from '../Components/register';

const mapStateToProps = (state, ownProps) => ({ token: state.token, ...ownProps })

const mapDispatchToProps = dispatch => ({ loginUser: token => { dispatch(loginUser(token)) }})

const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register)

export default RegisterContainer;

import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { loginUser } from '../Actions';
import Header from '../Components/header';

const mapStateToProps = (state, ownProps) => ({ token: state.token, ...ownProps })

const mapDispatchToProps = dispatch => ({ loginUser: token => { dispatch(loginUser(token)) }})

const HeaderContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))

export default HeaderContainer;

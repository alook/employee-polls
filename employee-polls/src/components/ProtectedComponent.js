import Login from "./Login"
import {connect} from "react-redux";
import PropTypes from "prop-types";

const ProtectedComponent = (props) => {
  if (!props.authedUser) {
    return <Login/>;
  }
  return props.component.children;
};

const mapStateToProps = (state, component) => {
  return {
    authedUser: state.authedUser,
    component: component
  };
};

ProtectedComponent.propTypes = {
  authedUser: PropTypes.string,
  component: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(ProtectedComponent);
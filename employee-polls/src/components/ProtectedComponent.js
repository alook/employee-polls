import Login from "./Login"
import {connect} from "react-redux";

const ProtectedComponent = (props) => {
  console.log("Protected component: " + props.component + " with user " + props.authedUser)
  if (props.authedUser === null) {
    return <Login/>;
  }
  return props.component.children;
};

const mapStateToProps = ({authedUser}, component) => {
  return {
    authedUser: authedUser,
    component: component
  };
};
export default connect(mapStateToProps)(ProtectedComponent);
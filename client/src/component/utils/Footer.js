import React from "react";
import { Link } from "react-router-dom";
import { connect} from 'react-redux'

import "../blog.css";

function Footer(props) {
  return (
    <div>
      <div className="footer">
        {props.isAdmin.user.isAuth ? (
          <div>
            <Link to="/admin">Add new Page</Link>
          </div>
        ) : (
          ""
        )} 
        <div>Footer terms of use 2021</div>
        {props.isAdmin.user.isAuth ? <div> Sign out </div> : ""} 
        {console.log(props.isAdmin.user.isAuth)} 
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
    return {
      isAdmin: state.admin,
    };
  };
  
export default connect(mapStateToProps)(Footer)

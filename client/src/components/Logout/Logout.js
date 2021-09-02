import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/auth";

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(logout());
    history.push("/login");
    // eslint-disable-next-line
  }, []);

  return <p>Logout in progress</p>;
}
export default Logout

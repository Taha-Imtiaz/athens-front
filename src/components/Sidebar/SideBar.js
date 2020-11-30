import React, { useState } from "react";
import style from "./SideBar.module.css";
import { Link, withRouter } from "react-router-dom";

const SideBar = (props) => {
  const width = window.innerWidth;
  var [active, setActiveLink] = useState(0);

  return (
    <div className={style.sidebar}>
      {props.routes.map((x, i) => {
        return (
          <Link
            key={i}
            to={x.path}
            className={props.location.pathname === x.path ? `${style.active}` : null}
          >
            <div className="row">
              <div className="col-2">{x.icon}</div>
              <div className="col-10">{width < 576 ? "" : x.title}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default withRouter(SideBar);

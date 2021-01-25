import React, { useState } from "react";
import style from "./SideBar.module.css";
import { Link, withRouter } from "react-router-dom";

const SideBar = (props) => {
  const width = window.innerWidth;


  return (
    <div className={style.sidebar}>
      {props.routes.map((x, i) =>

        <div className={`${style.sidebarContent} `} key={i}>
          <Link

            key={i}
            to={x.path}
            className={
              props.location.pathname === x.path ? `${style.active}` : null
            }
          >
            <div className={style.flex}>{x.icon}</div>
            <div >{width < 576 ? "" : x.title}</div>
          </Link>
        </div>

      )}
    </div>
  );
};

export default withRouter(SideBar);

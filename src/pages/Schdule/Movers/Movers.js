import React, { useEffect, useState } from "react";
import style from "./Movers.module.css";
import SideBar from "../../../components/Sidebar/SideBar";
import { getAllMover } from "../../../Redux/Schedule/scheduleAction";
import { faUser, faClock, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";

const MoversSchedule = (props) => {
  const [allMovers, setAllMovers] = useState();
  useEffect(() => {
    let { getAllMover } = props;
    getAllMover(res => setAllMovers(res.data.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routes = [
    {
      title: "Daily Schedule",
      path: "/schedule",
      icon: <FontAwesomeIcon icon={faClock} />,
    },

    {
      title: "Unavailable",
      path: "/schedule/unavailable",

      icon: <FontAwesomeIcon icon={faBan} />,
    },

    {
      title: "Movers",
      path: "/schedule/movers",

      icon: <FontAwesomeIcon icon={faUser} />,
    },
  ];
  return (
    <div className={`${style.moversContainer}`}>
      <div className={style.sidebar}>
        <SideBar routes={routes} />
      </div>
      <div className={style.moversContent}>
        <div className={style.moverHeader}>
          <div>
            <h3>Movers</h3>
          </div>

          <div className={`dropdown ${style.dropdown}`}>
            <Button
              className={style.button}
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Crew Leader
            </Button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <p className="dropdown-item">
                Crew Leader
              </p>
              <p className="dropdown-item">
                Crew Leader in training
              </p>
              <p className="dropdown-item">
                Mover
              </p>
              <p className="dropdown-item">
                New Employee
              </p>
              <p className="dropdown-item">
                On Vacation
              </p>
              <p className="dropdown-item">
                Reserve
              </p>
            </div>
          </div>
        </div>

        <div className={`list-group ${style.moverList}`}>
          <div className={style.listContent}>
            {allMovers && allMovers.length ? (
              allMovers.map((list, i) => {
                return (
                  <div key={i} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className={`mb-1 `}>{list.name}</h5>
                      <small>{list.attributes[0].name}</small>
                    </div>
                    <div>
                      {list.weeklySchedule
                        .filter((day) => day.status)
                        .map((status, i) => {
                          return (
                            <span className="mb-1" key={i}>
                              {status.day.split("", 3).join("")}&nbsp;
                              </span>
                          );
                        })}
                    </div>
                  </div>
                );
              })
            ) : (
                <div className="text-center">
                  <img src="/images/no-data-found.png" alt="" />
                </div>
              )}
          </div>
        </div>
      </div>
    </div >
  );
};

var actions = {
  getAllMover
};

export default connect(null, actions)(MoversSchedule);

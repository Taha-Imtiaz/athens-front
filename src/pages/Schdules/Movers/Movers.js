import React, { useEffect, useState } from "react";
import style from "./Movers.module.css";
import SideBar from "../../../components/Sidebar/SideBar";
import { getAllMover } from "../../../Redux/Schedule/scheduleAction";
import { faUser, faClock, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";

const MoversSchedule = (props) => {
  const [allMovers, setAllMovers] = useState();
  useEffect(() => {
    getAllMover()
      .then((res) => {
        setAllMovers(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
    ,
    {
      title: "Movers",
      path: "/schedule/movers",

      icon: <FontAwesomeIcon icon={faUser} />,
    },
  ];
  console.log(allMovers);
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
            <Button className = {style.button}
             
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Crew Leader
            </Button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">
                Crew Leader
              </a>
              <a className="dropdown-item" href="#">
                Crew Leader in training
              </a>
              <a className="dropdown-item" href="#">
                Mover
              </a>
              <a className="dropdown-item" href="#">
                New Employee
              </a>
              <a className="dropdown-item" href="#">
                On Vacation
              </a>
              <a className="dropdown-item" href="#">
                Reserve
              </a>
            </div>
          </div>
        </div>

        <div className={`list-group ${style.moverList}`}>
          <div className={style.listContent}>
            {allMovers && allMovers.length ? (
              allMovers.map((list) => {
                return (
                  <div>
                    <a
                      href="#"
                      className="list-group-item list-group-item-action flex-column align-items-start"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className={`mb-1 `}>{list.name}</h5>
                        <small>{list.attributes[0].name}</small>
                      </div>
                      <div >
                     
                        {list.weeklySchedule
                          .filter((day) => day.status)
                          .map((status) => {
                            return (
                              <span className="mb-1">
                                {status.day.split("", 3).join("")}&nbsp;
                              </span>
                            );
                          })}
                      </div>
                    </a>
                  </div>
                );
              })
            ) : (
              <div className="text-center">
                <img src="/images/no-data-found.png" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoversSchedule;

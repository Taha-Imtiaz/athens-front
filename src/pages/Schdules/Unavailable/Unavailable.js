import React, { useEffect, useState } from "react";
import style from "./Unavailable.module.css";
import SideBar from "../../../components/Sidebar/SideBar";
import { Button } from "@material-ui/core";
import {
  getAllData,
  approveRequest,
} from "../../../Redux/Unavailable/unavailableAction";

import { connect } from "react-redux";
import { showMessage } from "../../../Redux/Common/commonActions";
import { faUser, faClock, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UnavailableSchedule = (props) => {
  // const [isLoading, setIsLoading] = useState(true);
  const [dates, setDates] = useState([]);

  var { getAllData, unavailable } = props;
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

  useEffect(() => {
    const { getAllData } = props;
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllData]);

  const handleChange = (list) => {
    let index = dates.findIndex((x) => x === list._id);
    if (index !== -1) {
      dates.splice(index, 1);
    } else {
      dates.push(list._id);
      setDates(dates);
    }
  };
  const approveRequests = () => {
    let data = {
      id: dates,
    };
    var { showMessage } = props;
    approveRequest(data).then((res) => {
      showMessage(res.data.message);
      getAllData();
    });
  };

  return (
    <div className={`${style.unavailableContainer}`}>
      <div className={style.sidebar}>
        <SideBar routes={routes} />
      </div>

      <div className={style.unavailableContent}>
        <div className={style.unavailableHeader}>
          <div>
            <h5>Unavailable</h5>
          </div>
          <div className={style.approveBtn}>
            <Button className={style.button} onClick={approveRequests}>
              Approve
            </Button>
          </div>
        </div>
        <div className={style.unavailableList}>
          {unavailable ? (
            unavailable.map((list, i) => {
              return (
                <div className={`list-group`} key={i}>
                  <div>
                    <a
                      href="/#"
                      className={`list-group-item list-group-item-action flex-column align-items-start `}
                    >
                      <div className={`d-flex w-100 justify-content-between`}>
                        <span>
                          <input
                            type="checkbox"
                            id="defaultCheck1"
                            value=""
                            onChange={() => handleChange(list)}
                          />
                          <label
                            className={`checkbox-inline ${style.checkBox}`}
                            htmlFor="defaultCheck1"
                          >
                            {list[0].applicant.name}
                          </label>
                        </span>
                      </div>
                      <div>
                        <p className="mb-1">
                          {list[0].dates[0]} - {list[0].dates[1]}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1">Reason: {list[0].reason}</p>
                      </div>
                    </a>
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
  );
};

var mapStateToProps = (state) => ({
  unavailable: state.unavailable
});
var actions = {
  showMessage,
  getAllData,
};
export default connect(mapStateToProps, actions)(UnavailableSchedule);

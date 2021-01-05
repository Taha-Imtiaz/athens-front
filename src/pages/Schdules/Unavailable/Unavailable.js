import React, { useEffect, useState } from "react";
import style from "./Unavailable.module.css";
import SideBar from "../../../components/Sidebar/SideBar";
import Button from "../../../components/Button/Button";
import {
  getAllData,
  approveRequest,
} from "../../../Redux/Unavailable/unavailableAction";
import { cloneDeep } from "@babel/types";
import { connect } from "react-redux";
import { showMessage } from "../../../Redux/Common/commonActions";
import {
  faInfoCircle,
  faBook,
  faCalendarAlt,
  faUser,
  faClock,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UnavailableSchedule = (props) => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dates, setDates] = useState([]);

  var { getAllData, unavailable } = props;
  const routes = [
    {
      title: "Daily Schedule",
      path: "/schedule/daily",
      icon: (
        <FontAwesomeIcon icon={faClock} style={{ margin: "0.2rem 0.5rem" }} />
      ),
    },

    {
      title: "Unavailable",
      path: "/schedule",

      icon: (
        <FontAwesomeIcon icon={faBan} style={{ margin: "0.2rem 0.5rem" }} />
      ),
    },
    ,
    {
      title: "Movers",
      path: "/schedule/movers",

      icon: (
        <FontAwesomeIcon icon={faUser} style={{ margin: "0.2rem 0.5rem" }} />
      ),
    },
  ];

  useEffect(() => {
    const { getAllData } = props;
    getAllData();
    // .then(res => {
    //     console.log(res.data)
    //     setData(res.data)
    //     setIsLoading(false)
    // })
  }, []);

  const handleChange = (list) => {
    // let newDates = cloneDeep(dates)
    let index = dates.findIndex((x) => x == list._id);
    if (index != -1) {
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
      // .then(res => {
      //     setData(res.data)
      // })
    });
  };
  // console.log(unavailable[0]);
  return (
    <div className={``}>
      <div className="row">
        <div className="col-2 col-md-2">
          <SideBar routes={routes} />
          {/* <SideBar routes={width < 576 ? "" : {routes}} icon={routes.icon} /> */}
        </div>
        <div className="col-10 col-md-10">
          <div className="row">
            <div className={`col-6 ${style.head}`}>
              <h5>Unavailable</h5>
            </div>
            <div className={`col-3 ${style.btn}`}>
              <Button name="Approve" onClick={approveRequests} />
            </div>
          </div>
          {unavailable ? (
            unavailable.map((list) => {
              return (
                <>
                  <div className={`list-group ${style.list}`}>
                    <div className={style.sty}>
                      <a
                        href="#"
                        className={`list-group-item list-group-item-action flex-column align-items-start ${style.l}`}
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
                              className={`checkbox-inline ${style.input}`}
                              htmlFor="defaultCheck1"
                            >
                              {list[0].applicant.name}
                            </label>
                          </span>
                        </div>
                        <div className={style.para}>
                          <p className="mb-1">
                            {list[0].dates[0]} - {list[0].dates[1]}
                          </p>
                        </div>
                        <div className={style.para}>
                          <p className="mb-1">Reason: {list[0].reason}</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </>
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
  );
};
var mapStateToProps = (state) => ({
  unavailable: state?.unavailable,
});
var actions = {
  showMessage,
  getAllData,
};
export default connect(mapStateToProps, actions)(UnavailableSchedule);

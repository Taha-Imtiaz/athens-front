import { GET_ALLDATA } from "./unavailableConstant"
import Axios from '../../utils/api'

export var getAllData = async () => {

  try {
    var unavailableList = await Axios.get("schedule");
    return unavailableList;
    //    dispatch({
    //        type: GET_JOB,

    //    })
  } catch (error) {
    console.log(error);
  }

}

export var approveRequest = async (data) => {

  try {
    var approved = await Axios.put("schedule", data);
    return approved;
    //    dispatch({
    //        type: GET_JOB,

    //    })
  } catch (error) {
    console.log(error);
  }

}


// http://localhost:3000/api/user/approve-holidays
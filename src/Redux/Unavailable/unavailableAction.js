import { GET_UNAVAILABLE_LIST } from "./unavailableConstant"
import Axios from '../../utils/api'
// import { GET_UNAVAILABLE_LIST } from "../Job/jobConstants";

export const getAllData = () => {
return async (dispatch) => {
  try {
    const unavailableList = await Axios.get("schedule");
       dispatch({
           type: GET_UNAVAILABLE_LIST,
           payload:{
             unavailableList:unavailableList
           }

       })
  } catch (error) {
    console.log(error);
  }
}
 

}

export const approveRequest = async (data) => {

  try {
    const approved = await Axios.put("schedule", data);
    return approved;
    //    dispatch({
    //        type: GET_UNAVAILABLE_LIST,

    //    })
  } catch (error) {
    console.log(error);
  }

}


// http://localhost:3000/api/user/approve-holidays
import { GET_ALLDATA } from "./unavailableConstant"
import Axios from '../../utils/api'
export var getAllData = async () => {
           
            try {
                var unavailableList = await Axios.get("user/get-requested-holidays");
                return unavailableList;
                //    dispatch({
                //        type: GET_JOB,
            
                //    })
              } catch (error) {
                console.log(error);
              }
    
}
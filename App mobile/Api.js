import axios from 'axios';
import store from './store';
import { setHabits} from './slices/habitSlice';

const baseUrl = `https://habits-app-api.ew.r.appspot.com/api/v1/users/`;  

const getHabits = async (uid,token,old,setRefreshing) => {      
    const url = baseUrl + uid + '/habits/'    
    await axios.get(url,{headers:{token: token}})
    .then((response) => {             
        if (JSON.stringify(old) != JSON.stringify(response.data)){
            store.dispatch(setHabits(response.data)); 
        }              
      })
    .catch(error => alert(error.message))
    .finally(()=>{if(setRefreshing != undefined) setRefreshing(false);});
};

const updateHabit = async (uid,token,habit,id) => {       
    const url = baseUrl + uid + '/habits/' + id      
    await axios.put(url,habit,{headers:{token: token, 'Content-Type': 'application/json'}})    
    .catch(error =>{ alert(error.message)});    
};

const addHabit = async (uid,token,habit) => {    
    const url = baseUrl + uid + '/habits/'       
    await axios.post(url,habit,{headers:{token: token, 'Content-Type': 'application/json'}})    
    .catch(error =>{ alert(error.message)});    
};

const removeHabit = async (uid,token,habit,id) => {      
    const url = baseUrl + uid + '/habits/' + id      
    await axios.delete(url,habit,{headers:{token: token}})    
    .catch(error =>{ alert(error.message)});    
};

const getDate = () => {
    let today = new Date()
    return today.toISOString().split('T')[0]
}

export default getHabits
export {updateHabit,getDate,addHabit,removeHabit}
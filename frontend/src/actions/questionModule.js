import * as api from '../api';

// Action Creators
export const getModule = () => async (dispatch) => {
    try {
        const {data} = await api.fetchModule();
        dispatch({type: 'FETCH_ALL',payload:data});
    } catch (error) {
        console.log(error.message);
    }
    
    //const action = {type: 'FETCH_ALL',payload:[]};
}

export const getOneModule = (questionNumber) => async (dispatch) => {
    try {
        const {data} = await api.fetchOneModule(questionNumber);
        dispatch({type: 'FETCH_DATA',payload:data});
        //console.log("call function");
        //console.log(data);
    } catch (error) {
        console.log(error.message);
    }
    
    //const action = {type: 'FETCH_ALL',payload:[]};
}
export default (questionModule = [], action) => {
    switch(action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'FETCH_DATA':
            //console.log("overher");
            //console.log(questionModule.map((qM) => qM.questionNumber === action.payload.questionNumber ? action.payload: qM));
            //console.log(action.payload);
            return action.payload[0];
        case 'CREATE':
            return questionModule;
        default:
            return questionModule;
    }
}
export default (questionModule = [], action) => {
    switch(action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return questionModule;
        default:
            return questionModule;
    }
}
//implements the reducer functionality
//takes the state and action type and
//returns the new state based on the action type
export default (posts= [],action) => {
    switch(action.type){
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...posts,action.payload];
        default:
            return posts;
    }
};
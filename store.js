
function createStore(reducer) { //function accepts the reducer which takes 2 parameters (state, action)
    let currentState = reducer(undefined, {}) //take the reducer and pass in an undefined variable. because undefined, initialState applied
                                              //no action when 1st calling reducer, returns the default state from favoritesReducer() switch cases
    return {
      getState: () => currentState,     //will provide the currentState that has been calculated. first call will be initialState, empty []
      dispatch: action => {
         currentState = reducer(currentState, action) //takes the provided action and pass on the action to the reducer and replaced current state.  
      } 
    }
 }
 
 const initialState = { //creating initial state 
   favorites: []  
 }
 
 function favoritesReducer(state = initialState, action) { //setting default parameter of of empty favorites array if state not provided
    switch (action.type) {
       case "ADD_FAVORITE": {
         const addedFavorite = action.payload.favorite  //obtaining favorite data (title/id) from payload
         const favorites = [...state.favorites, addedFavorite] //combine results of addedFavorite to the previous favorites values
         return { favorites }    //returning the state, an object with favorites as both property and value 
       }
       case "REMOVE_FAVORITE": {
         const removedFavorite = action.payload.favorite //obtaining favorite data (title/id) from payload
         const favorites = state.favorites.filter(favorite => favorite.id !== removedFavorite.id) //iterate over each favorite, comparing id in favorites array with id in removedFavorite. 
         return { favorites } //returning the state, an object with favorites as both property and value 
       }
       default:     
         return state 
    } 
 }
 
 const action = { type: "ADD_FAVORITE", payload: { favorite: { title: "story1", id: 1 } } } 
 
 const store = createStore(favoritesReducer) //passing favoritesReducer() in order to get createStore() to work 

 export default store   //making store available to rest of application. app.js will import store 
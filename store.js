/*
overall goal of the store is to allow users to select and identify a 'favorite story' by clicking on the 'add to favorites' span. 
store.js will support a way across all of the pages to share the state to:
  1. click on 'add to favorites' span (the story) added to state/collected somewhere
  2. want to read the 'favorite' story within any of the pages to be able to see that something has already been added to state
  3. if story has been added to favorites, want to display to users option to remove favorites, basically enable user to toggle favorites

a common global data storage is called a store. program will be using a pattern that is shared among major state management 
libraries such as redux and ngrx. the store will perform both essential aspects of working with state which is getting state and setting 
state. this an be accomplished with the use of a reducer. the reducer (favoritesReducer()) takes 2 parameters, the previous state and an 
action to determine what to do with the state. use a switch() statement to determine what to do and switch according to the action.type. 
initially will have 2 cases, add_favorite and remove_favorite. need to also add a default case that returns the prior state, in the event 
neither cases are matched. each action, consists of an object with a type that has a sting in all caps. 1st action will be to 
add_favorite story:

  function favoritesReducer(state, action) {
   switch (action.type) {
      case "ADD_FAVORITE":
      case "REMOVE_FAVORITE": 
      default:
        return state
   } 
}
const action = { type: "ADD_FAVORITE" }

next is to think about collecting the favorites/updating user favorites. an array will be best way to manage collection. begin by
creating the initial state with an empty object assigned to variable initial state which is an empty array. 

the action also needs a payload, which is provided as an object. the payload object will contain an object that has a 
favorite property that will consist of the object with all the data that is associated with the story. the payload will provide the data.
this data is housed in a variable called action. 

can use the variable action to add a favorite. when calling favoritesReducer(), i can provide action as an argument and get the favorite
title and store in variable addedFavorite. then combine the results of addedFavorite to the previous favorites values by creating
a new favorites array and copy in with the spread operator the previous state values from state.favorite. return the state as an object
with favorites ad property and value. 

to remove an item from the array, use the id property from the favorite. can access the data with action.payload.favorite and assigning 
data to variable removedFavorite. use filter method() to iterate over each favorite and check the id and make sure its not equal to the 
id getting from removedFavorite. returns a new favorites array and put results in a variable called favorites. then return the state as 
an object with favorites as property and value. this completes the reducer(). 

now need to create a store because the reducer does not provide a way to conveniently get the state as well as dispatch the actions
(add_favorite, remove_favorite). the createStore() function will accept the reducer (therefore will be creating a higher order function).
the way to get the state from favoritesReducer() is to take the reducer and pass in an undefined variable. that means the initialState 
default parameter will be applied when the 1st argument is undefined. the 2nd argument requires an action. since there is no action when 
1st calling reducer, the 2nd argument will be an empty object, so will return the default state (from favoritesReducer). the 1st time the 
createStore() function runs, will get the initialState. 

within createStore(), return an object with a property called getState. getState is a method on the object that is being returned. getState
will provide the currentState that has been calculated. 2nd property is called dispatch, also a method on the object. dispatch will 
take the provided action and pass on the action to the reducer. 

in order for createStore() function to work, need to provide createStore() with favoritesReducer() -> createStore(favoritesReducer) and 
place object in a variable called store. during the initial call, an object is returned. the store variable will provide the object 
returned in createStore() and will allow getState to read from state and allow to dispatch an action and therefore update state wherever 
needed in application. make the store available to the rest of the application by export default store. 

*/



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
 store.dispatch(action) //dispatch is an arrow function and accepts a parameter, passing action as argument.  
 console.log(store.getState()) 
 export default store   //making store available to rest of application. app.js will import store 
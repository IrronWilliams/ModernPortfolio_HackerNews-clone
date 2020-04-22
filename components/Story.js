/*using component to format stories on the page. component will style and add functionality to each of the stories.
passing the story data to the function Story() passed story data is from Stories() function. 
Story() will initially return div with the text story. this will serve as a placeholder on the page for the stories. 

beginning process to format the story by returning a div with all of the information that i need. story.index is result of adding the 
index field to the story object in the Stories() method (stories.js) this will count the stories starting at 1. 

to begin styling and data to each story, create a separate div an put the following in them:
    for the 1st span, give it a class gray. 
    create another span underneath the 1st and give it class=upvote with a triangle symbol.  
    underneath 2nd span, create anchor tags with a link pointing to the story.url and story.title. 
    add another span to display the url itself via story.domain. 

    after 1st inner div, create another div. within it will have another div with class=gray. this div will have stories.points to 
    display the number of points the story has from the user that posted it from story.user and story.time_ago property.
    add a vertical bar () followed by anchor tags where the link (href) points to individual item page to be able to see the individual 
    story within the application. use ? or query string to see where id = story.id. followed by the # of comments from story.comment_count

    add another vertical bar, followed by a span which will have class=favorite. within in it will be an image of an heart icon, with a 
    class=heart. with the text add to favorites. users ill be able to click on the heart to add to their favorites page. 

at this point, each page now has story listed by number including story url, title, domain, points, user, time, comments and favorites

for each story, i am displaying a link where i am displaying the counts of comments for a given story. i need to create a page to display
the story item individually. this story item will be on a separate page because its going to display all of the comments. when user 
clicks on the comments link, user will be taken to the 'item' page. the 'item' page will include the story itself at the top of page and
underneath it will have all of the related comments. will need to create a dedicated page for this in the pages folder. here is current
code via Story.js:

  <a href="#/item?id=${story.id}">
            ${story.comments_count} comments
          </a>
          |

before creating new dedicated page, need to declare a new route in router.js. within routes array, declare a new route and the path to this
will be '/item' and the page will be called item. need to create this page. within pages directory, create item.js. export default function
to make it available to router. within the item() function, want to reuse the view.js, so import view into item.js. within item() function
set view.innerHtml = `<div>item</div>`

back to router.js, import the item function into router.js. refresh the page and click on the link with the number of comments. a new page
has been created as a result of the item() function and new item route. if on an item route, see the words 'item' on the page and the id
value in the browser. the importance of providing the id value and question mark, is that the ? indicates a query string. what the query 
string does is that after the ? there is a property that includes important data within the url. i will use this data, namely the id, to
be able to get the story based on this id from the api. i need to figure out a way to get the id query string set to the number and 
retrieve it. 
  http://localhost:8888/#/item?id=22889195

back to the item.js file. create function getStory() whose purpose is to retrieve the story data. 1st step is to get the story id. to 
start, i can get information about the route i am on from the window, mainly the location property (window.location). console logging
this returns a 'location' object with a bunch of data. in particular i want the hash(#) property from it because im using a # router and 
the route begins with a #. console.log(window.location.hash) returns the remainder of the url -> #/item?id=21702424. i can use this 
string to split it where i see the text id and just get the value afterwards. to split this string, can use the split() method. 
split() operates on a string and returns an array. pass in argument where i want to split the string. here, i want to split the string 
where it begins with ?id=. 
  const storyId = window.location.hash.split('?id=') -> returns an array ["#/item", "21702424"]

can access the 2nd element in the array by using the [] syntax at the end and entering 1.   
  const storyId = window.location.hash.split('?id=')[1]  -> returns the string of the id 21702424

can use the string 21702424 with the help of the api to fetch an individual story. to do this, need to know the route im making a get
request to. the route for individual stories is '/item/itemId'. from the stories.js page, want to reuse the base url and make a fetch()
request where the route begins with /item/ and concatenate the string with storyId. 
  fetch(`https://node-hnapi.herokuapp.com/item/${storyId}`) 

need to resolve the promise made by fetch(). can resolve the promise by making the getStory() function an async function. also need to 
await the fetch() call and put the response in a response variable. then response.json, await it and put in a story variable. return
story. 

need to resolve the getStory() function so need to make item() an async function, await getStory() and put the result in a story variable.
within the view, want to display the story individually. can reuse the story component. instead of having hard coded text item, import
the story function from story.js. within the view, can now call the story() function by interpolating the function call and passing the 
story data. 

back to story.js. need to account for displaying a story when there is not index. the api does not have an index for story. i added the 
index property via the stories.js page to provide a count related to a given story in the list. since index not in api, i need to add a 
conditional within the story component to avoid an error or display undefined. to avoid this can use a ternary where i check to see if i 
have an index. if there is an index, create an empty string:
  span class="gray">${story.index}</span>   changed to ->   <span class="gray">${story.index ? story.index : ""}</span>

the ternary was updated by way of short circuiting. assess if there is a story, use either story.index or use empty string
   <span class="gray">${story.index || ""}</span>

back to item.js, want to check if story has comments. by checking to see if story.comments (which is an array).length is >0 and put in 
variable called hasComments. within view, can use a ternary, map over each comment and throw on the page the comment data with 
json.stringify(). then chain on the join() method. otherwise if not comments, display message no comments. 
   ${hasComments ? story.comments.map(comment => JSON.stringify(comment)).join('') : 'No comments'}

when user clicks on link with number of comments, user will see the story on top separated by horizontal line with story comments below the
line. add an <hr/> to create the line underneath the div. then map over the comments array 

 

need to address the situation if an incorrect item id is provided. currently, if an incorrect id is provided, the app will kinda break 
by not displaying anything. need to inform user/provide user with a message. this issue can be resolved within the getStory() function 
on the item.js file

on the item.js file, can update storyId variable with a conditional. if we don't have a valid id and the fetch() request can't determine
the id (because its valid). if the fetch() request does not return successfully, can show the user an error message. can set up error 
handling with async functions. with async await can set up a try/catch. can try to get the resolved story data when i call getStory() and
catch any errors. then console.log the errors. this will present a problem because will not have access to either the story or hasComments
variables within the rest of the item() function (meaning the view innerHtml) due to block-scoping. 

to fix this block-scoping issue, outside of try/catch create story and hasComments variables with let. and reinitialize them when i 
get the story and hasComments values in try{}. now blocks-scoping issue has been resolved, can now alert user that there is an error. 
can do this by adding a piece of local state called hasError. when catch/block runs, can set hasError to true, by default it will be false. 
in the event there is an error, display to user there is a problem. want to set view.html conditionally. if there is an error, set 
view.html to the following text in a div and set the class to error to give text a red color. 

now handling both cases. the event when story can be displayed successfully as well as the story comments, and the event when story 
cannot be fetched/when there is an error. 

on the items.js file, i am reusing the base url across the 2 pages (items, stories). it will be better if there was a dedicated variable 
for the base url. this can be housed in a new file called baseUrl.js within the utils folder. just want to export default the string that
i have been using as the 1st part of the api endpoint. 

back to stories.js, can make the baseUrl available to both of the pages by importing the baseUrl.js file. 
can now interpolate the value in the fetch request. up to this point. 

back to item.js, copy the import baseUrl from stories.js to item.js. update the response variable to reference baseUrl.

need to format the comments on the items page because they are still blobs of data. to add some structure to the comments instead of just
throwing them on the page via items.js page with json.stringify, can create a dedicated comments component. within components folder, 
create a new file called comments.js. within comments, create a function that will receive individual comment data. initially return 
html with a div with a class=nested-comments-0. within div, have a comment header between paragraph tags, a class=comment-header. within
paragraph tag, will have comment.user, comment_time_ago, comment.content. console.log comment to confirm access to data. make this 
available to items-page with export default. the use of comment component tidies up the appearance of the data on the page by using 
comment() function. 

in addition to user, time, content, there is also a property called level that is returned. level property speaks to the nested comments.
a comment can have its own comments. a comment can have a comments property, which is an array of objects and each of those objects being
nested comments. if a comment has a nested comments, how do i display them in an area that is a little inset that's pushed to the side so 
its clear that these are responses to the original comment or to other comments within the thread. can address this on the comments.js file.  

within comments need to find a way to continue generating comments if i know there are nested comments. need to make use of a complex 
programming concept called recursion. this means i am going to get my first set of comments with the comment() function but need to keep
calling it if i am able to detect if there are nested comments. to approach this, need to check if there are nested comments. within the
comment() function, add new variable hasNestedComments where i need to take each comment that im getting in the function and check to see
if i have an array of comment.comments and check if the arrays length is >0. if there are comments, this will resolve to true. 
  const hasNestedComments = comment.comments.length > 0

within the return markup, can add a conditional with a ternary that says if there are nested comments, then take comment.comments and
continue to map over each comment. but whats different here is that i am going to call the function from within itself. this is the 
benefit of having a named function declaration. i want to call the comment() function again, once i am already inside of it. the 
otherwise will be an empty string because i do not want to have text saying 'no nested comments' on the page. 

i can make the nested comments more inset or more prominent. using class <div class="nested-comments-0"> treats all nested
comments equally in terms of inset, moving comments by a certain spaces to the right. can provide functionality to change the class
for each nested level of comments (different inset for nested comments, 1-4). this will apply different classes based upon the css style 
file (.nested-comments-0, .nested-comments-2). to make the comments more prominent/readable, can use the level property from comment and 
update the div with to dynamically change the inset based upon the comment level:
  <div class="nested-comments-${comment.level}">

can now see much more clearly the threads within the story or in response to the story. this is the power of using recursion to be able 
to display comments according to the condition set up in the ternary. recursion allows me to continue iterating with the comment function 
itself by calling itself inside itself. 

now going to add active links to the header. so that when user is on a given page, user can see the route user is on. for example, when 
on the home page, want to have the Top link to have active class applied to it that will supply an underline. this will give users a clear
visualization where they are within the app. to accomplish this, go to app.js. within app.js want to figure out a way to apply the active
class to a link that is active that corresponds to the route user is currently on and when the route changes. fortunately, from the window
we get access to a special property that allows me to assign a callback function, and this is window.onhashchange = () => {}.

whenever i have a hash router (#), whenever using a # in the url that changes, can detect the change with the onhashchange property. 
the following will console log the word change when user goes from 1 route to another. 
  window.onhashchange = () => {
    console.log('changed') 
  }

the goal is to apply an active class, which is a class from the css file (.active which contains details for a solid white border-bottom) 
so add the border to header when user is on a route that corresponds to a link. to write the logic for this, create a dedicated function
called setActiveLink() and set it directly above the class App. the setActiveLink() will be called within the window.onhashchange arrow 
function. referencing the html file, each of the links in the header have a class=header-link. <a href="#/" class="header-link">Top</a>.
a good approach will be to find all of these links according to the header-link class. back to app.js, i use document.querySelectAll()
to find the class header-link and put in a variable called links. the links will be returned in a nodelist. can then iterate over the 
nodelist, and for each link can get the href that the link is pointing to (ie, href=#/ask) and can get this by getting the href attribute, 
using getAttribute() and can put in a variable called linkPath. -> const linkPath = link.getAttribute('href'). this will provide the href
that the link is pointing to. can get the current path from window.location.hash. -> const currentPath = window.location.hash. can now 
compare the 2 variables. if the currentPath === linkPath then can add the active class. otherwise/if not equal, remove the active class. 
this process results in a visual way to display to user where they are/which route they are in within the app. 

now want to work on favorites which will allow users to select one these stories by clicking on the 'add to favorites' span. need to find 
a away across all of the pages to share the state to:
  1. click on 'add to favorites' span (the story) added to state/collected somewhere
  2. want to read the 'favorite' story within any of the pages to be able to see that something has already been added to state
  3. if story has been added to favorites, want to display to users option to remove favorites, basically enable user to toggle favorites

to begin, create a file called store.js. will refer to the global state of the app as a store. in the store, will collect all of the 
favorited stories and hold on to them in the global state, meaning to be used across all the pages (top, new, ask, show). the goal
is to store all of the global state in whats know as a store. this is a concepts shared across many state management libraries for 
serious javascript frameworks like react, angular and vue. a common global data storage is called a store. in program i will be using a 
pattern that is shared across among major state management libraries such as redux and ngrx. so how will the store do both essential 
aspects of working with state which is getting state and setting state. this an be accomplished with the use of a reducer. a reducer is 
a basic javascript function and want to name the reducer to the type of state that i am managing. since managing the favorite state, will
call the reducer favoritesReducer().  the reducer takes 2 parameters, the previous state and an action to determine what to do with the 
state. use a switch() statement to determine what to do. we switch according to the action.type. initially will have 2 cases, add_favorite
and remove_favorite. need to also add a default case that returns the prior state, in the event neither cases are matched. 
each action, consists of an object with a type that has a sting in all caps. 1st action will be to add_favorite story:

  function favoritesReducer(state, action) {
   switch (action.type) {
      case "ADD_FAVORITE":
      case "REMOVE_FAVORITE": 
      default:
        return state
   } 
}
const action = { type: "ADD_FAVORITE" }

so how do i update the user's favorites?  first think about the initial state. how am i going to collect all of the favorites? the best 
way to manage this is with an array. begin by creating the initial state with an empty object assigned to variable initial state. the 
state managed by reducers are almost always objects in serious applications. for the state, will have one property called favorites set 
to an empty array. to add a favorite, or anything with help of an action, in addition to action type also need a payload. the payload 
will provide data. want to provide the payload as an object. a good name for a property to put on the payload is favorite and the 
favorite property will consist of the object with all the data that i know is associated with the story. at this time provide a dummy 
story to favorite called story1. this is a sample action to test things out. 
  const action = { type: "ADD_FAVORITE", payload: { favorite: "story1" } }

how do i use this action to add a favorite? 1st think about how i will get access to the data. will obtain access when i call the 
function action (provided as parameter to function favoritesReducer) and get favorite from action.payload.favorite, put in variable 
called addedFavorite. i want to combine the results of addedFavorite to the previous favorites values. to combine results by creating
a new favorites array and copy in with the spread operator the previous state values from state.favorite. a common pattern to make sure
the states always have the properties that i need is to set the initial state object as the default parameter. so even if the state is 
not provided as a parameter to function favoritesReducer(), it will use the fallback of default parameter of the empty favorites array. 
so spread in state.favorites and provide addedFavorite as the final element -> const favorites = [...state.favorites, addedFavorite]. 
then return the state within an objects favorites ->  return { favorites } (returns object with favorites as property and value)

to remove an item from the array, can use the id property from the favorite. begin by gaining access to data with action.payload.favorite
and putting results in a variable called removedFavorite. instead of using the spread operator, want to use filter method(). take 
action.payload.favorite and iterate over each favorite, check the id and make sure its not equal to the id getting from removedFavorite. 
this will return a new favorites array and put results in a variable called favorites. then return the state as an object with 
favorites as property and value: 
  const favorites = state.favorites.filter(favorite => favorite.id !== removedFavorite.id)
  return { favorites }

the reducer has been created. but also need a store. need a store because the reducer does not provide a way for me to conveniently get 
the state as well as dispatch the actions (add_favorite, removed_favorite).  a way to do this is with help of a function called createStore. 
this is at the heart of any state management library such as redux. the createStore() function will accept the reducer. (therefore will be
creating a higher order function). the way to get the state from favoritesReducer() is to take the reducer and pass in an undefined 
variable. that means the initialState (provided by object containing property for an empty array) will be applied when the 1st argument 
is undefined. the 2nd argument requires an action. since there is no action when 1st calling reducer, the 2nd argument will be an empty 
object, so will return the default state (from favoritesReducer). put hte results in a variable called currentState. the 1st time the 
createStore() function runs, will get the initialState. then from createStore(), return a object (method written as an arrow function) 
with a property called getState. getState is a method on the object im returning. the getState arrow function will give me the 
currentState that has been calculated. 2nd property is called dispatch, also a method that will be an arrow function. dispatch will 
take the provided action and pass on the action to the reducer. so take the reducer that was passed in createStore(). reducer() will take 
the currentState (which is the previous state) and the action that just came in and then update the currentState with the new value:
  currentState = reducer(currentState, action)

in order for the createStore() function to work, need to provide it the favoritesReducer() function. to accomplish this, create another 
function called createStore where i can pass in favoritesReducer(). whats returned is an object (from the return statement in createStore).
assign object to a variable called store. then make the store available to the rest of the application by export default store. the store
variable will provide the object returned in createStore(), will allow getState to read from state and allow to dispatch an action and 
therefore update state wherever needed in application. with both functions getState() and dispatch(). will allow getState()

now the store has been created, can use a dispatch function and provide an action. 
  store.dispatch(action)

to get the state after its been updated, can call store.getState
  console.log(store.getState())

to see results can temporary, import store into app.js.  

now i can work with store, get and update state, i can now add and remove favorites across the pages. i can create the store with the 
favoritesReducer. next step is to go to stories.js because this page is where i am providing all of the data for the individual stories 
and passing them to the stories component. in the view.innerHtml, want to provide an additional piece of data for each story that 
determines whether its been favorited or not. to accomplish this, 1st need access to the store. within stories page, import the store.  
withing stories page, need to determine if a given story is within the favorites array in the global state. to do this, go to Stories()
function. in addition to getting stories from api endpoint, also want to get favorites. to get favorites can use the getState method that
the store object is providing (from store.js, store object is const store). at the beginning of Stories() can call store.getState() and
put in variable called state -> const state = store.getState(). since the state object is small, just consisting of favorites array, can
destructure the favorites property -> const { favorites } = store.getState().  

also need to find a way to check when iterating over the stories elements/objects, check if a story is already in the favorites array 
in the global state. will need 2 pieces of info for this. will need the array of favorites and the individual story. this can be 
accomplished with a dedicated function which will be added to the utils folder. within utils folder, create a file called checkFavorite 
and create a function declaration called checkFavorite() that will receive
the favorites array and an individual story. the array method to use to figure out whether a given object exists within an array of objects
is the some() method. the some() method will check if a condition is true and immediately return true if the condition is met or false if
it iterates thru the whole array and the condition is not met. take the favorites array, use some() on it, some() will iterate over every
favorite and we want to see if the favorite.id property is equal to the story.id. if this is the case then the story on the page will be
in the favorites array. want to return the true/false value immediately -> return favorites.some(favorite => favorite.id === story.id).
make sure to export file so that its accessible. stories.js will import. 

back to stories.js and import checkFavorites.js. since stories.js now has access to checkFavorites(), can use directly in the html markup
where i am iterating over each stories array with map. can update the html markup (view.innerHtml) by adding another property to each story
called isFavorite. the isFavorite property will take the results of checkFavorite() which will accept the favorites array from state and the
individual story i am iterating over. 

back to story.js. i want to conditionally change the text based on the isFavorite property. the way to do this is to use a ternary. if 
story.isFavorite is true (meaning user has already favorited it), tell user he/she can remove from favorites, otherwise if user has not 
favorited the story, they can add it to their array. this goes in the class=favorite span. 
  {story.isFavorite ? "Remove From Favorites" : "Add To Favorites"}

now need a way to actually add an item to favorites and once its added, remove from favorites. i can do this by registering a click event. 
the click event will handle a click event for each of the individual favorite spans. within story.js there is a span with a class=favorite. 
every story will have this particular span. i want to get all of these spans and add click events to all of them. the most convenient way 
is to do this within the stories page. go back to stories.js and at the bottom of the stories() function, use document.querySelectorAll()
and select everything with the class favorite, forEach favorite button, want to add a click event. then on it want to get the event. within
callback need to figure out a way to get the story data. can use a different technique by putting objects on each of the stories. go to
story.js, and on the span with class=favorite, can add a data attribute called story. can put the entire story on this attribute by 
interpolating the expression json.stringify and stringify the entire story object: 
  <span class="favorite" data-story='${JSON.stringify(story)}'>

back within stories.js, can now easily grab the story by turning the callback to a function declaration and by referring to the favorite
element itself by saying this.dataset.story. since have this as a json string, can use the opposite operation json.parse() to turn back
into an object and put in a variable called story. now there will be a story when user clicks on one of the spans. can now check to see 
if the the story is in the favorites array, pass in favorites and story. this will determine what action needs to be provided. put the 
results in a variable called isFavorited. then add a conditional to say if user already favorited, remove story. can use the dispatch 
function from store.js for this. store.dispatch takes an action and can write action object where type = remove_favorite. the payload will
be an object with a property on it called favorite set to story. the else statement will add_favorite. at the end want to recall stories 
function to display the new data and set view.Html. do this by awaiting stories() and provide path. 

document.querySelectorAll('.favorite').forEach(favoriteButton => {
     favoriteButton.addEventListener('click', async function() {
       const story = JSON.parse(this.dataset.story);  
       const isFavorited = checkFavorite(favorites, story);
       if (isFavorited) {
         store.dispatch({ type: "REMOVE_FAVORITE", payload: { favorite: story } })  
       } else {
         store.dispatch({ type: "ADD_FAVORITE", payload: { favorite: story } })    
       }
       await Stories(path);
     }); 
  });


in click event, repeating store.dispatch in the conditional. the only thing that im changing is the type. can use a ternary within the 
object to make code more concise. since i am dispatching an action regardless and the type property will resolve to a certain value, can
use a ternary to say if story has been favorited, then provide the type remove_favorite otherwise add_favorite. can still toggle favorites
just like before. 

document.querySelectorAll('.favorite').forEach(favoriteButton => {
     favoriteButton.addEventListener('click', async function() {
       const story = JSON.parse(this.dataset.story);  
       const isFavorited = checkFavorite(favorites, story);
       store.dispatch({ type: isFavorited ? "REMOVE_FAVORITE" : "ADD_FAVORITE", payload: { favorite: story } })  
       await Stories(path);
     }); 
  });

at this point in app, i have completed the following:
  seen how to work with global state
  worked with store 
  know how to get state within stories page 
  used favorites array
  checked to see if a given story has been favorited and passed it down to the story component to conditionally set text based upon state 
  registered a click event for each of the favorite span to be able to toggle favorites into state or remove them from state. 

to build last part of app, need to create the favorites page. on favorites page, want to list all of the favorites user has stored in state
at any given point in time. if there are no favorites stored in state, display 'add some favorites'. want to display each favorite as an 
individual story using story component. the favorites page brings together all of the concepts utilized to bring the app to this point. 
the following steps taken to create favorites page.  

1. 1st step will be to declare a new route in router.js. the path will be /favorites (because the header link on index.html has /favorites)
  <a href="#/favorites" class="header-link">Favorites</a>
the page property will be the result of the favorites() function created in step 2. 


2. create a favorites page (put in pages directory). create a basic function called favorites(). since im creating a page, i want to set
a view. to do this, i want to import the view reference from the utils folder. within function, for testing purposes, set a view.innerHtml
that's a div which has the text favorites -> view.innerHtml = <div>Favorites</div>. make sure to export default function and provide this 
function to the router by going to router.js and importing favorites into the router.js file. now favorites has been imported, now have access
to the function. can now complete the route for /favorites by adding the favorites() function as the page property. can now refresh the 
page. what seen on the favorites page is the text 'favorites' that was returned from the favorites() function view.innerHtml div.   

3. within favorites, i want to read from the store to get the state in order to display favorites. import store from store.js. within 
favorites() function, use the getState() method off of store and destructured the favorites property off of the state object. 
(applied same approach with the Stories() function from stories). next step is to check to see if an array is empty or not by checking 
the length of array and store results in a variable called hasFavorites. update the html text from div from 'Favorites' to default text
that tells user to add favorites if there are not any favorites in the array. to address the default text, add a ternary within the div.
the ternary will evaluate if there are favorites, if so map over them, otherwise tell user to 'add some favorites'. to map over elements, 
want to call elements story because i want to display them with the story component. within map(), i have an arrow function and within 
arrow function i am going to call the story() function from stories.js. when i call story() i want to spread in all of the previous story 
properties and also want to provide the isFavorite value. the isFavorite value will determine to either show the text 'remove from favorites' 
or 'add to favorites'. isFavorite ensure the text is in sync with the global state. this was accomplished in stories.js by using the 
checkFavorite() helper utility function. 

after spreading in previous story properties, also create the isFavorite property and setting it to the return value of the checkFavorite()
function call. make sure to use join() method to join together the string:
  view.innerHTML = `<div>
    ${hasFavorites ? favorites.map(story => Story({
        ...story,
        isFavorite: checkFavorite(favorites, story)
    })).join('') : "Add some favorites!"}
  </div>` 

remember to import story from story.js and checkFavorite from utils folder. refresh page, click 'add to favorites', check favorites page
and see 'favorited' story on page. 

4. on favorites page, nothing will happen when user clicks on 'remove from favorites'.  need to set up event listeners for this. go to 
stories.js and copy the code for the event listener into favorites.js. 

    document.querySelectorAll('.favorite').forEach(favoriteButton => {
     favoriteButton.addEventListener('click', async function() {
       const story = JSON.parse(this.dataset.story);  
       const isFavorited = checkFavorite(favorites, story);
       store.dispatch({ type: isFavorited ? "REMOVE_FAVORITE" : "ADD_FAVORITE", payload: { favorite: story } })  
       await Stories(path);
     }); 
  });
}

a simple copy/paste will not work. this will not work because code is trying to call Stories() function instead of favorites() to be able 
to re-render. do not need to make the event listener async because there is not an async function for favorites(). need to adjust the code 
slightly by calling favorites(). when calling favorites(), do not need to pass in a path because favorites() function was not provided any
path arguments. the last line of code is calling favorites() to re-render after story has been added or removed from state. now on the 
favorites page, when user clicks on 'remove from favorites', the story will be removed from the favorites page. 

Self CONGRATS!!! this was no small feat! i've created an entire hacker news clone utilizing some of the most important concepts of the 
javascript language. particularly advanced and complex concepts including async javascript as well as essential concepts for moving on 
to frameworks such as state management, working with reducers and the global store. 

notes for project are on story.js, stories.js, comments.js, app.js, router.js

*/

export default function Story(story) { //exporting to stories.js  
    //console.log(story)
    //return `<div>story</div>`  //puts placeholders on the page, the word story on each line of the page. 
    //original span class="gray">${story.index}</span>  -> with item page, need to account for the added did not account for index property otherwise my error out or get undefined text on page. 
    //original span updated with ternary  = <span class="gray">${story.index ? story.index : ""}</span>, 
    //replaced repetition with short circuiting <span class="gray">${story.index || ""}</span>. either have story.index or use empty string
    
    /*using ternary to conditionally change text based on isFavorite property. if story.isFavorite is true (user has already favorited), 
    tell user he/she can remove from favorites, otherwise if user has not favorited the story, they can add it to their array. replacing
    Add To Favorites (line following the heart image) with the ternary.
    
    updated class=favorite span by adding a data attribute called story. putting entire story on the data attribute by interpolating
    the expression json.stringify and stringify the entire story object. prior to update span was -> <span class="favorite">.
    this will work with the click event associated with stories.js. 
    */
    return `
    <div class="story">
      <div> 
        <span class="gray">${story.index || ""}</span>
        <span class="upvote">▲</span>
        <a href="${story.url}">${story.title}</a>
        <span>(${story.domain})</span>
      </div>
      <div>
        <div class="gray">
          ${story.points} points by ${story.user} ${story.time_ago}
          |
          <a href="#/item?id=${story.id}">
            ${story.comments_count} comments
          </a>
          |
          <span class="favorite" data-story='${JSON.stringify(story)}'>
            <img class="heart" src="https://icon.now.sh/heart/ccc">
            ${story.isFavorite ? "Remove From Favorites" : "Add To Favorites"}
          </span>
        </div>
      </div>
    </div>
  ` 


  }
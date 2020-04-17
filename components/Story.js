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

can now see much more clearly the threads within the story. 

has functionality for different 
recursion will allow me to generate all of the nested comments. 


simaliar to checking if there are stories or comments within pages, 

*/


export default function Story(story) { //exporting to stories.js  
    //console.log(story)
    //return `<div>story</div>`  //puts placeholders on the page, the word story on each line of the page. 
    //original span class="gray">${story.index}</span>  -> with item page, need to account for the added did not account for index property otherwise my error out or get undefined text on page. 
    //original span updated with ternary  = <span class="gray">${story.index ? story.index : ""}</span>, 
    //replaced repetition with short circuiting <span class="gray">${story.index || ""}</span>. either have story.index or use empty string
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
          <span class="favorite">
            <img class="heart" src="https://icon.now.sh/heart/ccc">
            Add To Favorites
          </span>
        </div>
      </div>
    </div>
  ` 


  }
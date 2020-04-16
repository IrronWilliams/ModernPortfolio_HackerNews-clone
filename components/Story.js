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



*/


export default function Story(story) { //exporting to stories.js  
    //console.log(story)
    //return `<div>story</div>`  //puts placeholders on the page, the word story on each line of the page. 
    return `
    <div class="story">
      <div> 
        <span class="gray">${story.index}</span>
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
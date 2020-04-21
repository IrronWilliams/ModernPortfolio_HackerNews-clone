/*
creating function that determine if a story has already been 'favorited'.  function will receive the favorites array and an individual 
story. using the some() method to compare the id's in the favorites and story arrays. the some() method will check if a condition is 
true and immediately return true if the condition is met or false if it iterates thru the whole array and the condition is not met. 

some() will iterate over every favorite and checks if the favorite.id property is equal to the story.id property. if this evaluates as
true, this means the story on the page will be in the favorites stories.js will import this file. */

export default function checkFavorite(favorites, story) {
    return favorites.some(favorite => favorite.id === story.id)
  }
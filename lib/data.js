// Import the Node.js file system module for reading files
//import fs from 'fs';
// Import the Node.js path module for handling file and directory paths
//import path from 'path';
import got from 'got';

// Create a path to the 'data' directory in the current working directory
const dataSpot = "https://dev-anton-cs-55-13-week12.pantheonsite.io/wp-json/twentytwentyfive-child/v1/latest-posts/1";


// Function that retrieves all posts, sorts them alphabetically by title, and returns a simplified array
export async function getSortedPostsData(){
  // Get the parsed JSON data containing all posts
  let jsonPost;
  try {
    jsonPost = await got(dataSpot);
    console.log(jsonPost.body);
  } catch(error) {
    jsonPost.body = [];
    console.log(error);
  }

  // Parse the JSON string into a JavaScript object
  const jsonParsed = JSON.parse(jsonPost.body);
  // Sort the parsed JSON data alphabetically by title
  jsonParsed.sort(function (a, b){
  // Sort the JSON data alphabetically
    return a.post_title.localeCompare(b.post_title);
  });
  // simplify the array to include just the id, title, and date data
  return jsonParsed.map(item => {
    // Create a new object with only the essential post properties
    return {
      id: item.ID.toString(),
      title: item.post_title,
      date: item.post_date
    }
  });
}

// Function that retrieves all post IDs and formats them for Next.js dynamic routing
export async function getAllPostIds() {
  // Get the parsed JSON data containing all posts
  let jsonPost;
  try {
    jsonPost = await got(dataSpot);
    console.log(jsonPost.body);
  } catch(error) {
    jsonPost.body = [];
    console.log(error);
  }

  // Parse the JSON string into a JavaScript object
  const jsonParsed = JSON.parse(jsonPost.body);
  // Pass the id data as a parameter
  return jsonParsed.map(item => {
    // Give the id data to the function to pass along
    return {
      params:{
        id: item.ID.toString()
      }
    }
  })
}

// Function that retrieves a specific post by ID and returns its data or a default invalid post
export async function getPostData(idReq){
  // Get the parsed JSON data containing all posts
  let jsonPost;
  try {
    jsonPost = await got(dataSpot);
    console.log(jsonPost.body);
  } catch(error) {
    jsonPost.body = [];
    console.log(error);
  }

  // Parse the JSON string into a JavaScript object
  const jsonParsed = JSON.parse(jsonPost.body);
  // Filter the posts array to find the post with the matching ID
  const objMatch = jsonParsed.filter(obj =>{
    // Compare the post's ID (converted to string) with the provided ID parameter
    return obj.ID.toString() === idReq;
  });
  // Check if no post was found with the given ID
  let objReturned;
  if (objMatch.length > 0){
    // If no post was found, return a default object
    objReturned = objMatch[0];
  } else {
    // Return the found post data if a matching post was found
    objReturned = {};
  }
  return objReturned;
}
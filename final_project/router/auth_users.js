const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const session = require('express-session');

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

// Check if the user with the given username and password exists
const authenticatedUser = (username, password) => {
    // Filter the users array for any user with the same username and password
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}


//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
    const password = req.body.password;
    req.session.user = username;
    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access');

        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.reviews;
  const username = req.session.user; // The username is stored in the req.session object
  // Check if the book exists in the database
  let new_array=[];
  for(let i=0; i<books.length; i++){
    if(books[i].ISBN===isbn){
        new_array.push(books[i]);
    }
  
}

if (new_array.hasOwnProperty(username)) {
      // Modify the existing review
      if (new_array.username===username){
        new_array.reviews=review;
    //res.send(new_array.reviews);
        //return res.status(200).json({ message: "Review modified successfully" },new_array);  
} 
//return new_array;
      //new_array.reviews[username].review = review;
      //return res.status(200).json({ message: "Review modified successfully" });
    } else {
      // Add a new review for the user
      
      new_array.forEach((a)=>{a.username=username});
      new_array.forEach((b)=>{b.reviews=review});
      
    res.send("Review Successfully Added", new_array);
    }
  
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

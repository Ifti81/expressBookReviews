const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const ISBN = req.params.isbn;
  let searchValue = (property_value, array) => {
	let new_array = [];
	for (let i = 0; i < array.length; i++) {
		if (array[i].ISBN === property_value) {
			new_array.push(array[i]);
		}
	}
	return new_array;
};

res.send(searchValue(ISBN, books));

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let searchValue = (property_value, array) => {
	let new_array = [];
	for (let i = 0; i < array.length; i++) {
		if (array[i].author === property_value) {
			new_array.push(array[i]);
		}
	}
	return new_array;
};

res.send(searchValue(author, books));


});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let searchValue = (property_value, array) => {
	let new_array = [];
	for (let i = 0; i < array.length; i++) {
		if (array[i].title === property_value) {
			new_array.push(array[i]);
		}
	}
	return new_array;
};

res.send(searchValue(title, books));


});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const ISBN = req.params.isbn;
  let searchValue = (property_value, array) => {
	let new_array = [];
	for (let i = 0; i < array.length; i++) {
		if (array[i].ISBN === property_value) {
			new_array.push(array[i]);
		}
	}
	return new_array;
};

res.send(searchValue(ISBN, books));

});

module.exports.general = public_users;

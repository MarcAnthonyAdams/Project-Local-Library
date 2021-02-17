
//-------- acquired Helper Function --------\\

const { findAuthorById } = require("./books");


      //-------- Tested Functions --------\\

/*
The `getTotalBooksCount()` function in `public/src/home.js` has a single parameter:

- An array of books.

It returns a number that represents the number of book objects inside of the array.
*/
function getTotalBooksCount(books) {
  return books.length;
};

/*
The `getTotalAccountsCount()` function in `public/src/home.js` has a single parameter:

- An array of accounts.

It returns a number that represents the number of account objects inside of the array.
*/
function getTotalAccountsCount(accounts) {
  return accounts.length;
};

/*
The `getBooksBorrowedCount()` function in `public/src/home.js` has a single parameter:

- An array of books.

It returns a number that represents the number of books _that are currently checked out of the library._ 
This number can be found by looking at the first transaction in the `borrows` key of each book. 
If the transaction says the book has not been returned (i.e. `returned: false`), the book has been borrowed.
*/
function getBooksBorrowedCount(books) {
  const booksBorrowed = books.map((book) => book.borrows);
  const merged = [].concat.apply([], booksBorrowed);
  const borrowed = merged.filter((borrows) => borrows.returned === false);
  return borrowed.length;
};



/*
The `getMostCommonGenres()` function in `public/src/home.js` has a single parameter:

- An array of books.

It returns an array containing five objects or fewer that represents the most common occurring genres, 
ordered from most common to least.

Each object in the returned array has two keys:

- The `name` key which represents the name of the genre.
- The `count` key which represents the number of times the genre occurs.

If more than five genres are present, only the top five should be returned.
*/
function getMostCommonGenres(books) {
  const genreName = books.map((book) => book.genre);
  const genreMap = genreName.reduce((prev, cur) => { 
    prev[cur] = (prev[cur] || 0) + 1; 
    return prev; 
  }, []);
  const genreArr = Object.entries(genreMap).map(([name, count]) => ({name, count}));
  const topGenres = genreArr.sort((ctPrev, ctCur) => ctCur.count - ctPrev.count).slice(0,5);
  return topGenres;
};

/*
The `getMostPopularBooks()` function in `public/src/home.js` has a single parameter:

- An array of books.

It returns an array containing five objects or fewer that represents the most popular books in the library. 
Popularity is represented by the number of times a book has been borrowed.

Each object in the returned array has two keys:

- The `name` key which represents the title of the book.
- The `count` key which represents the number of times the book has been borrowed.

If more than five books are present, only the top five should be returned.
*/
function getMostPopularBooks(books) {
  const booksBorrowed = [];
  for (let obj in books) {
    book = books[obj];
      for (let i = 0; i < book.borrows.length; i++) {
      booksBorrowed.push(book.title);
    }
  }
  const popularMap = booksBorrowed.reduce((prev, cur) => { 
    prev[cur] = (prev[cur] || 0) + 1; 
    return prev; 
  }, []);
  const popularArr = Object.entries(popularMap).map(([name, count]) => ({name, count}));
  const topPopularBooks = popularArr.sort((ctPrev, ctCur) => ctCur.count - ctPrev.count).slice(0,5);
  return topPopularBooks;
};

/*
The `getMostPopularAuthors()` function in `public/src/home.js` has two parameters, in the following order:

- An array of books.
- An array of authors.

It returns an array containing five objects or fewer that represents the most popular authors whose books have been checked out the most. 
Popularity is represented by finding all of the books written by the author and then adding up the number of times those books have been borrowed.

Each object in the returned array has two keys:

- The `name` key which represents the first and last name of the author.
- The `count` key which represents the number of times the author's books have been borrowed.

If more than five authors are present, only the top five should be returned.
*/
function getMostPopularAuthors(books, authors) {
  const booksBorrowed = [];
  for (let obj in books) {
    book = books[obj];
      for (let i = 0; i < book.borrows.length; i++) { 
      id = book.authorId;
      const authorId = findAuthorById(authors, id);
      booksBorrowed.push(authorId);
    }
  }
  const authorName = Object.values(booksBorrowed).map((obj) => `${obj.name.first} ${obj.name.last}`);
  const popularMap = authorName.reduce((prev, cur) => { 
    prev[cur] = (prev[cur] || 0) + 1; 
    return prev; 
  }, []);
  const popularArr = Object.entries(popularMap).map(([name, count]) => ({name, count}));
  const topPopularAuthors = popularArr.sort((ctPrev, ctCur) => ctCur.count - ctPrev.count).slice(0, 5);
  return topPopularAuthors;
};


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

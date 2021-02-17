/* 
The "require(commonJS module)" function, 
for this commonJS module, 
is not working correctly in this Qualified assessment.
       ||           ||             ||
       \/           \/             \/
const { findAccountById } = require("./accounts");
*/


      //-------- Helper Function --------\\

function findAccountById(accounts, id) {
  const results = accounts.find((account) => account.id === id);
  return results;
};


      //-------- Tested Functions --------\\

/*
The `findAuthorById()` function in `public/src/books.js` has two parameters, in the following order:

- An array of authors.
- An ID of a single author.

It returns the author object that has the matching ID.
*/
function findAuthorById(authors, id) {
  const results = authors.find((author) => author.id === id);
  return results;
};

/*
The `findBookById()` function in `public/src/books.js` has two parameters, in the following order:

- An array of books.
- An ID of a single book.

It returns the book object that has the matching ID.
*/
function findBookById(books, id) {
  const results = books.find((book) => book.id === id);
  return results;
}

/*
The `partitionBooksByBorrowedStatus()` function in `public/src/books.js` has a single parameter:

- An array of books.

It returns an array with two arrays inside of it. All of the inputted books are present in either the first or second array.

The first array contains books _that have been loaned out, 
and are not yet returned_ while the second array contains books _that have been returned._ 
You can check for the return status by looking at the first transaction in the `borrows` array.
*/
function partitionBooksByBorrowedStatus(books) {
  const booksBorrowed = [];
  const booksReturned = [];
  const borrowedStatus = [];
  for (let obj in books) {
    book = books[obj];
    book.borrows[0].returned ? booksReturned.push(book) : booksBorrowed.push(book);
  }
  borrowedStatus.push(booksBorrowed, booksReturned);
  return borrowedStatus;
};

/*
The `getBorrowersForBook()` function in `public/src/books.js` has two parameters, in the following order:

- A book object.
- An array of all accounts.

It should return an array of all the transactions from the book's `borrows` key. 
However, each transaction should include the related account information and the `returned` key.
*/
function getBorrowersForBook(book, accounts) {
  let borrowers = [];
  let bkBrwListA = [];
  let bkBrwListB = [];
  bkBrwListB.push(book.borrows);
  bkBrwListA = bkBrwListB[0];
  for (let obj in bkBrwListA) {
    bkBrwList = bkBrwListA[obj];
    id = bkBrwList.id;
    const borrower = findAccountById(accounts, id);
    borrowers.push(borrower);
    for (let borrow in borrowers) {
    borrowerList = borrowers[borrow];
      if (borrowerList.id === id) Object.assign(borrowerList, bkBrwList);
    }
  }
  const results = borrowers.sort((ctPrev, ctCur) => ctCur.count - ctPrev.count).slice(0, 10);
  return results;
};

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

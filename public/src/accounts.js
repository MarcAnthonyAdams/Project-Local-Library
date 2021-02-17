
//-------- acquired Helper Function --------\\

const { findAuthorById } = require("./books");


    //-------- Tested Functions --------\\

/*
The `findAccountById()` function in `public/src/accounts.js` has two parameters, in the following order:

- An array of accounts.
- An ID of a single account.

It returns the account object that has the matching ID.
*/
function findAccountById(accounts, id) {
  const results = accounts.find((account) => account.id === id);
  return results;
};

/*
The `sortAccountsByLastName()` function in `public/src/accounts.js` has a single parameter:

- An array of accounts.

It returns a sorted array of objects. The objects are sorted alphabetically by last name.
*/
function sortAccountsByLastName(accounts) {
  const results = accounts.sort((accountA, accountB) => 
  accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase() ? -1 : 1);
  return results;
};

/*
The `getTotalNumberOfBorrows()` function in `public/src/accounts.js` has two parameters, in the following order:

- An account object.
- An array of all books objects.

It returns a _number_ that represents the number of times the account's ID appears in any book's `borrow` array.
*/
function getTotalNumberOfBorrows(account, books) {
  const booksBorrowed = [];
  for (let obj in books) {
    book = books[obj];
      for (let i = 0; i < book.borrows.length; i++) { 
      id = book.borrows[i].id;
      if(id === account.id) {
        booksBorrowed.push(id);
      }
    }
  }
  return booksBorrowed.length;
};

/*
The `getBooksPossessedByAccount` function in `public/src/accounts.js` has three parameters, in the following order:

- An account object.
- An array of all books objects.
- An array of all author objects.

It returns an array of books and authors that represents all books _currently checked out_ by the given account. 
_Look carefully at the object below,_ as it's not just the book object; the author object is embedded inside of it.
*/
function getBooksPossessedByAccount(account, books, authors) {
const booksBorrowed = [];
let results = [];
  for (let obj in books) {
    book = books[obj];
    id = book.authorId;
    for (let i = 0; i < book.borrows.length; i++) { 
      bookborrows = book.borrows[i]
      if (bookborrows.id === account.id && bookborrows.returned === false) {
        booksBorrowed.push(book);
        const authorId = findAuthorById(authors, id);
        for (let borrow in booksBorrowed) {
          bookBorrow = booksBorrowed[borrow]
          if (bookBorrow.authorId === authorId.id) {
            results.push(bookBorrow);
            for (let resultObj in results) {
              result = results[resultObj];
              if (result.authorId === authorId.id) {
                Object.assign(result, {author: authorId});
              }
            } 
          }
        }
      }
    }
  }
  return results;
};

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

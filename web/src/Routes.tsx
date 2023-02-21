// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="SomeTransactions" titleTo="someTransactions" buttonLabel="New SomeTransaction" buttonTo="newSomeTransaction">
        <Route path="/some-transactions/new" page={SomeTransactionNewSomeTransactionPage} name="newSomeTransaction" />
        <Route path="/some-transactions/{id:Int}/edit" page={SomeTransactionEditSomeTransactionPage} name="editSomeTransaction" />
        <Route path="/some-transactions/{id:Int}" page={SomeTransactionSomeTransactionPage} name="someTransaction" />
        <Route path="/some-transactions" page={SomeTransactionSomeTransactionsPage} name="someTransactions" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

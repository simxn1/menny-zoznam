import './css/App.css'
import './css/bootstrap.min.css'
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import ListOfClients from './components/ListOfClients'
import EditClient from './components/EditClient'
import AddClient from './components/AddClient'

/*const Auth = () => {

    return (
      <div>
        <h1 style={{ marginBottom: "5em" }}>
          <strong>enter password</strong>
        </h1>
        <form className="add-new" onSubmit={onSubmit}>
          <input onChange={inputOnChange} type="password" autoFocus />
        </form>
      </div>
    )
 


}*/

const App = (props) => {

  const [inputValue, setInputValue] = React.useState()
  const [isLoggedIn, setIsLoggedIn] = React.useState()

  const inputOnChange = (event) => {
    setInputValue(event.target.value)
  }

  const onSubmit = () => {
    if (inputValue === "serus") {
      setIsLoggedIn(true)
    }
  }

  if (!isLoggedIn) {
    return (
      <div>
        <h1 style={{ marginBottom: "5em" }}>
          <strong>jakub hluchan je kokot</strong>
        </h1>
        <form className="add-new" onSubmit={onSubmit}>
          <input onChange={inputOnChange} type="password" autoFocus />
        </form>
      </div>
    )
  }

  else if (isLoggedIn) {
    return (
      <Router>
        <div className="container">
          <NavBar />
          <Route path="/" exact component={ListOfClients} />
          <Route path="/update/:id" component={EditClient} />
          <Route path="/add" component={AddClient} />
        </div>
      </Router>
    )
  }
}

export default App;

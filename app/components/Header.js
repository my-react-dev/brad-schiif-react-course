import React, { useState } from "react"
import { Link } from "react-router-dom"
import HeaderLoggedIn from "./HeaderLoggedIn"
import HeaderLoggedOut from "./HeaderLoggedOut"

function Header() {
  const [loggedIn, setLoggedin] = useState()

  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            ComplexApp
          </Link>
        </h4>
        {loggedIn ? <HeaderLoggedIn setLoggedin={setLoggedin} /> : <HeaderLoggedOut setLoggedin={setLoggedin} />}
      </div>
    </header>
  )
}

export default Header

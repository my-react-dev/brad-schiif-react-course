import React, { useState } from "react"
import Axios from "axios"

function HeaderLoggedOut({ setLoggedin } = props) {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const respons = await Axios.post("http://localhost:8080/login", { username, password })
      if (respons.data) {
        localStorage.setItem("complexappToken", respons.data.token)
        localStorage.setItem("complexappUsername", respons.data.username)
        localStorage.setItem("complexappAvatar", respons.data.avatar)
        setLoggedin(true)
      } else {
        console.log("Incorrect Username or Password")
      }
    } catch (err) {
      console.log("There was a problem")
    }
  }

  return (
    <form onSubmit={handleLogin} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input onChange={e => setUsername(e.target.value)} name="username" className="form-control form-control-sm input-dark" type="text" placeholder="Username" autoComplete="off" />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input onChange={e => setPassword(e.target.value)} name="password" className="form-control form-control-sm input-dark" type="password" placeholder="Password" />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  )
}

export default HeaderLoggedOut

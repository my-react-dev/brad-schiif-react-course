import React from "react"

function HeaderLoggedIn({ setLoggedin } = props) {
  function handleLogout() {
    setLoggedin(false)
    localStorage.removeItem("complexappToken")
    localStorage.removeItem("complexappUsername")
    localStorage.removeItem("complexappAvatar")
  }

  return (
    <div class="flex-row my-3 my-md-0">
      <a href="#" class="text-white mr-2 header-search-icon">
        <i class="fas fa-search"></i>
      </a>
      <span class="mr-2 header-chat-icon text-white">
        <i class="fas fa-comment"></i>
        <span class="chat-count-badge text-white"> </span>
      </span>
      <a href="#" class="mr-2">
        <img class="small-header-avatar" src={localStorage.getItem("complexappAvatar")} />
      </a>
      <a class="btn btn-sm btn-success mr-2" href="/create-post">
        Create Post
      </a>
      <button onClick={handleLogout} class="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  )
}

export default HeaderLoggedIn

import React, { useEffect, useState, useContext } from "react"
import Page from "./Page"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

// Import Context
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function CreatePost(props) {
  const [title, setTitle] = useState()
  const [body, setBody] = useState()
  const navigate = useNavigate()
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  async function handleCreatePost(e) {
    e.preventDefault()
    try {
      const response = await Axios.post("/create-post", { title, body, token: appState.user.token })
      appDispatch({ type: "flashMessage", value: "You successfully create a post" })
      navigate(`/post/${response.data}`)
    } catch (err) {
      console.log("There was a problem creating post")
    }
  }

  return (
    <Page title="Create New Post">
      <form onSubmit={handleCreatePost}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input onChange={e => setTitle(e.target.value)} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea onChange={e => setBody(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  )
}

export default CreatePost

import React, { useState, useEffect, useContext } from "react"
import { useImmerReducer } from "use-immer"
import Page from "./Page"
import Axios from "axios"
import { useParams } from "react-router-dom"
import LoadingDotsicon from "./LoadingDotsicon"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"

// Eddit post function
function EditPost() {
  // App Context
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  // Reducer Initial Value
  const initialState = {
    title: {
      value: "",
      hasErros: false,
      message: ""
    },
    body: {
      value: "",
      hasErros: false,
      message: ""
    },
    isFetching: true,
    isSaving: false,
    id: useParams().id,
    sendCount: 0
  }

  // Reducer Callback function
  function updatePostReducer(draft, action) {
    switch (action.type) {
      case "fetchComplete":
        draft.title.value = action.value.title
        draft.body.value = action.value.body
        draft.isFetching = false
        return
      case "updateTitle":
        draft.title.value = action.value
        return
      case "updateBody":
        draft.body.value = action.value
        return
      case "submitRequest":
        draft.sendCount++
        return
      case "saveRequestStarted":
        draft.isSaving = true
        return
      case "saveRequestFinished":
        draft.isSaving = false
        return
    }
  }

  const [state, dispatch] = useImmerReducer(updatePostReducer, initialState)

  // On submit update post form
  function updatePostHnadle(e) {
    e.preventDefault()
    dispatch({ type: "submitRequest" })
  }

  // Fetch Post Data
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchSinglePost() {
      try {
        const response = await Axios.get(`/post/${state.id}`, { cancelToken: ourRequest.token })
        dispatch({ type: "fetchComplete", value: response.data })
      } catch (err) {
        console.log(err)
      }
    }
    fetchSinglePost()
    return () => {
      ourRequest.cancel()
    }
  }, [])

  // Update Post
  useEffect(() => {
    if (state.sendCount) {
      dispatch({ type: "saveRequestStarted" })
      const ourRequest = Axios.CancelToken.source()

      async function fetchSinglePost() {
        try {
          const response = await Axios.post(`/post/${state.id}/edit`, { title: state.title.value, body: state.body.value, token: appState.user.token }, { cancelToken: ourRequest.token })
          appDispatch({ type: "flashMessage", value: "Post updated" })
          dispatch({ type: "saveRequestFinished" })
        } catch (err) {
          console.log(err)
        }
      }
      fetchSinglePost()
      return () => {
        ourRequest.cancel()
      }
    }
  }, [state.sendCount])

  // Loading Effect
  if (state.isFetching)
    return (
      <Page title="...">
        <LoadingDotsicon />
      </Page>
    )

  return (
    <Page title="Edit Post">
      <form onSubmit={updatePostHnadle}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            onChange={e => {
              dispatch({ type: "updateTitle", value: e.target.value })
            }}
            autoFocus
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            value={state.title.value}
            placeholder=""
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea
            onChange={e => {
              dispatch({ type: "updateBody", value: e.target.value })
            }}
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
            value={state.body.value}
          ></textarea>
        </div>

        <button className="btn btn-primary" disabled={state.isSaving}>
          Update Post
        </button>
      </form>
    </Page>
  )
}

export default EditPost

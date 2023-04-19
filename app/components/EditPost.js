import React, { useState, useEffect } from "react"
import { useImmerReducer } from "use-immer"
import Page from "./Page"
import Axios from "axios"
import { useParams } from "react-router-dom"
import LoadingDotsicon from "./LoadingDotsicon"

function EditPost() {
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

  function updatePostReducer(draft, action) {
    switch (action.type) {
      case "fetchComplete":
        draft.title.value = action.value.title
        draft.body.value = action.value.body
        draft.isFetching = false
        return
    }
  }

  const [state, dispatch] = useImmerReducer(updatePostReducer, initialState)

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

  if (state.isFetching)
    return (
      <Page title="...">
        <LoadingDotsicon />
      </Page>
    )

  return (
    <Page title="Edit Post">
      <form>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" value={state.title.value} placeholder="" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea name="body" id="post-body" className="body-content tall-textarea form-control" type="text">
            {state.body.value}
          </textarea>
        </div>

        <button className="btn btn-primary">Update Post</button>
      </form>
    </Page>
  )
}

export default EditPost

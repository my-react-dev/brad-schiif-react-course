import React, { useState, useEffect } from "react"
import Page from "./Page"
import Axios from "axios"
import { useParams, Link } from "react-router-dom"
import LoadingDotsicon from "./LoadingDotsicon"
import ReactMarkdown from "react-markdown"
import { Tooltip } from "react-tooltip"

function ViewSinglePost() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState()

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchSinglePost() {
      try {
        const response = await Axios.get(`/post/${id}`, { cancelToken: ourRequest.token })
        setPost(response.data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchSinglePost()
    return () => {
      ourRequest.cancel()
    }
  }, [])

  if (isLoading)
    return (
      <Page title="...">
        <LoadingDotsicon />
      </Page>
    )

  const date = new Date(post.createdDate)
  const dateFormatted = `${date.getMonth() + 1}/${date.getDay()}/${date.getFullYear()}`

  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        <span className="pt-2">
          <a data-tooltip-content="Edit" data-tooltip-id="edit" href="#" className="text-primary mr-2">
            <i className="fas fa-edit"></i>
          </a>
          <Tooltip id="edit" className="custom-tooltip" />{" "}
          <a data-tooltip-content="Delete" data-tooltip-id="delete" className="delete-post-button text-danger">
            <i className="fas fa-trash"></i>
          </a>
          <Tooltip id="delete" className="custom-tooltip" />
        </span>
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img className="avatar-tiny" src={post.author.avatar} />
        </Link>
        Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {dateFormatted}
      </p>

      <div className="body-content">
        <ReactMarkdown children={post.body} />
      </div>
    </Page>
  )
}

export default ViewSinglePost

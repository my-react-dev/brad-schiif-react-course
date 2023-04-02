import React, { useContext, useEffect, useState } from "react"
import Page from "./Page"
import Axios from "axios"
import { useParams } from "react-router-dom"
import StateContext from "../StateContext"
import ProfilePosts from "./ProfilePosts"

function Profile() {
  const { username } = useParams()
  const appState = useContext(StateContext)

  const [profileData, setProfileData] = useState({
    profileUsername: "......",
    profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
    isFollowing: false,
    counts: {
      postCount: 0,
      followerCount: 0,
      followingCount: 0
    }
  })

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function fetchProfileData() {
      try {
        const response = await Axios.post(`/profile/${username}`, { token: appState.user.token, cancelToken: ourRequest.token })
        setProfileData(response.data)
      } catch (err) {
        console.log("There is an error " + err)
      }
    }
    fetchProfileData()
    return () => {
      ourRequest.cancel()
    }
  }, [])

  return (
    <Page title="Profile Screen">
      <h2>
        <img className="avatar-small" src={profileData.profileAvatar} /> {profileData.profileUsername}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: {profileData.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {profileData.counts.followerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following: {profileData.counts.followingCount}
        </a>
      </div>

      <ProfilePosts />
    </Page>
  )
}

export default Profile

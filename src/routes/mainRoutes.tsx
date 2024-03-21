import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import App from '../components/App'
import Posts from '../components/Posts'
import SinglePost from '../components/SinglePost'

const mainRoutes = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<App />}> 
      <Route path="/:pageOfPosts" element={<Posts />} />
      <Route path="/:pageOfPosts/:postId" element={<SinglePost />} />
    </Route>
  )
)

export default mainRoutes

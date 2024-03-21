import { useLocation } from "react-router-dom"

import PostTypes from "../../types/postTypes"

import styles from './SinglePost.module.css'

function SinglePost () {
  const location = useLocation() 
  const state: PostTypes = location.state

  return (
        <article>
          <h1 className={styles['article-title']}>{state.title}</h1>
          <p className={styles['article-body']}>{state.body}</p>
          <p className={styles['article-author']}>Author {state.userId}</p>
        </article>
  )
}

export default SinglePost
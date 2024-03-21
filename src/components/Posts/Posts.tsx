import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import getPostsFromServer from "../../service/getPostsFromServer"

import PostTypes from "../../types/postTypes"
import ErrorPostTypes from "../../types/errorPostTypes"

import styles from './Posts.module.css'

const DOWNLOAD_LIMIT_FOR_SCROLL = 50 // лимити загрузок по скролу: 5 раз по 10 постов

function Posts () {
  const navigate = useNavigate()
  const { pageOfPosts } = useParams()
  const [posts, setPosts] = useState<PostTypes[] | ErrorPostTypes[]>([])

  // В url добавляются параметры пагинации (номер подгруженной порции) и "перенаправляется" на страницу 
  const addNewPageWithPosts = () => {
     const newPage = pageOfPosts && +pageOfPosts + 1
     navigate(`/${newPage}`) 
  }

  const handleScroll = (event: React.UIEvent<HTMLUListElement, UIEvent>) => {
    const { scrollTop } = event.currentTarget  // получаем текущию позицию скрола относительно верхней границы
    const { clientHeight } = event.currentTarget // получаем высоту видимой части списка
    const { scrollHeight } = event.currentTarget // получаем высоту всего списка, включая невидимые элементы
    const limitForScrolling = posts.length < DOWNLOAD_LIMIT_FOR_SCROLL // проверка сколько загрузок было
    
    // проверяем положение скрола относительно всего списка, если он равен всей высоте списка, то это конец и нужна дозагрузка && лимит загрузок по скроллу
    if(scrollTop + clientHeight === scrollHeight && limitForScrolling) {
      addNewPageWithPosts() 
      }  
      return
  }

  useEffect(()=>{
    // ignore, чтобы пропустить повторнй вызов useEffect в режиме StrictMode 
    let ignore = false
    const afterUpdatingPage = (pageOfPosts !== '1' && posts.length === 0) // была ли страница перезагружена (находимся НЕ на стр.1 и стэйт пустой)
    const backButtonIsPressed = (posts.length>Number(pageOfPosts)*10) //  был ли переход "назад" в браузере (кол-во постов больше чем страниц*10)
       
    // если страница перезагружена или пеход "назад" запрашиваем все данные, учитывая параметры порций загрузки
    if( afterUpdatingPage || backButtonIsPressed) {
      (async ()=>{
        const postsAfterUpdatingPage = await getPostsFromServer(pageOfPosts, true)
        setPosts(postsAfterUpdatingPage)}
      )()
     // иначе, запрошиваем постранично
    } else {
      (async ()=>{
        const postsFromServer = await getPostsFromServer(pageOfPosts)
        if(!ignore) {setPosts((posts)=>[...posts, ...postsFromServer])}
      })()
    }
    return ()=>{ ignore = true }
  },[pageOfPosts])

  return (
      <>
        <ul className={styles['posts-list']} onScroll={handleScroll} >
          {posts.map((post:PostTypes | ErrorPostTypes)=>{
            return (
            <li key={post.id} className={styles['one-post-from-list']}>
                <Link to={`/${pageOfPosts}/post${post.id}`} state = {post} className={styles['post-link']}> 
                  {`${post.id}. ${post.title} `} 
                </Link>
            </li>)
          })}
        </ul>
        { pageOfPosts === '5' && 
          <button onClick={addNewPageWithPosts} className={styles['button-show-more']} type='button'> 
            Загрузить еще 
          </button> 
        }
      </>
  )
}

export default Posts
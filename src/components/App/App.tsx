import { useEffect } from 'react'
import { useParams, useNavigate, Outlet } from 'react-router-dom'

import styles from './App.module.css'

function App() {
  const navigate = useNavigate()
  const { pageOfPosts, postId } = useParams()
  
  useEffect(()=>{
    if(!pageOfPosts){
      navigate('/1')
    }
  },[pageOfPosts])
  

  return (
    <div className={styles['app-wrapper']}>
      <header>
        {!postId && <h1 className={styles.title}>Получены посты:</h1>}
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default App

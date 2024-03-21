import PostTypes from "../types/postTypes"
import ErrorPostTypes from "../types/errorPostTypes"

const URL = 'https://jsonplaceholder.typicode.com/posts'
const LIMIT_PER_PAGE = 10

 const getPostsFromServer = async (pageOfPosts ='1', updatingPage=false): Promise<PostTypes[] | ErrorPostTypes[]> => {
  const queryParams = updatingPage ? `_limit=${+pageOfPosts*LIMIT_PER_PAGE}` : `_page=${pageOfPosts}&_limit=${LIMIT_PER_PAGE}`
  try {
    const response = await fetch (`${URL}?${queryParams}`)
    if(!response.ok) {
      throw new Error 
    }
    const data = await response.json()
    return data
  }
  catch {
    return [{id: 1, title: 'Произошла ошибка, скоро все починим'}] 
  }
 
}

export default getPostsFromServer
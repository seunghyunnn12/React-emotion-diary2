import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Edit from './pages/Edit'
import Home from './pages/Home'
import New from './pages/New'
import Diary from './pages/Diary'
import Notfound from './pages/Notfound'

import { useReducer, useRef, useEffect, useState, useContext, createContext } from 'react'
const mockData = [
  {
    id: 1,
    createdDate: new Date('2025-04-02').getTime(),
    emotionId: 2,
    content: '1번 일기의 내용'
  },
  {
    id: 2,
    createdDate: new Date('2025-04-01').getTime(),
    emotionId: 3,
    content: '2번 일기의 내용'
  },
  {
    id: 3,
    createdDate: new Date('2025-03-11').getTime(),
    emotionId: 4,
    content: '2번 일기의 내용'
  },
]

function reducer(state, action) {


  let nextState;

  switch (action.type) {
    case "INIT":
      return action.data
    case "CREATE":
  
    nextState = [action.data, ...state]
    break
    case "UPDATE":
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ?
          action.data : item
      )
      break
    case "DELETE":
      nextState = state.filter(
        (item) => String(item.id) !== String(action.id)
      )
      break

    default:
      return state
  }

  localStorage.setItem('diary', JSON.stringify(nextState))

  return nextState

}

export const DiaryStateContext = createContext()
export const DiaryDispatchContext = createContext()

function App() {

  // localStorage.setItem('test', 'hello')

  const [data, dispatch] = useReducer(reducer, [])
  const idRef = useRef(0)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {

    const storedData = localStorage.getItem('diary')


    if(!storedData) {
      localStorage.setItem('diary', JSON.stringify([]))

      setIsLoading(false)

      return
    }

    const parsedData = JSON.parse(storedData)

    if(!Array.isArray(parsedData)){
      setIsLoading(false)
      return
    }

    let maxId = 0
    parsedData.forEach((item)=> {
      if(Number(item.id)>maxId){
        maxId= item.id
      }
    })

    idRef.current = maxId+1

    dispatch({
      type: "INIT",
      data: parsedData
    })

    setIsLoading(false)


  }, [])


  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content
      }
    })
  }

  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content
      }
    })
  }

  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id
    })
  }


  if (isLoading) {
    return <div>데이터를 불러오는 중입니다.</div>
  } else {
    return (
      <div>
        <DiaryStateContext.Provider value={data} >
          <DiaryDispatchContext.Provider  value={{onCreate,onUpdate,onDelete}}>

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
              <Route path='*' element={<Notfound />} />
            </Routes>
          </DiaryDispatchContext.Provider>

        </DiaryStateContext.Provider>

      </div>
    )
  }

}

export default App

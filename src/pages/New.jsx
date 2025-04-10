import React, { useContext } from 'react'
import Header from '../components/Header'
import Button from '../components/Button'
import Editor from '../components/Editor'
import { useNavigate } from 'react-router-dom'
import { DiaryDispatchContext } from '../App'
import usePageTitle from '../hooks/usePageTitle'
const New = () => {

  const { onCreate } = useContext(DiaryDispatchContext)

  usePageTitle('새 일기쓰기')

  const onSubmit  = (input) => {
    onCreate(
      input.createdDate.getTime(),
      input.emotionId,
      input.content
    )

    nav('/',{replace:true})
  }
  const nav = useNavigate()
  return (
    <div>
      <Header
        leftChild={
          <Button
            onClick={() => nav(-1)}
            text={"< 뒤로가기"} />
        }
        title={"새 일기 쓰기"}

      />
      <Editor onSubmit={onSubmit} />
    </div>
  )
}

export default New
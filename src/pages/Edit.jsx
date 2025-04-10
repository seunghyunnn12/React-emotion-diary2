import React, { useContext, useState, useEffect } from 'react'
import Header from '../components/Header'
import Button from '../components/Button'
import Editor from '../components/Editor'
import { useParams, useNavigate } from 'react-router-dom'
import { DiaryDispatchContext } from '../App'
import { DiaryStateContext } from '../App'
import useDiary from '../hooks/useDiary'
import usePageTitle from '../hooks/usePageTitle'

const Edit = () => {

  const { onDelete, onUpdate } = useContext(DiaryDispatchContext)
  const params = useParams()
  const nav = useNavigate()
  
  const curDiaryItem = useDiary(params.id)

  usePageTitle(`${params.id}의 일기 편집하기`)


  const onSubmit = (input) => {
    if (window.confirm('일기를 정말 수정할까요?')) {
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content
      )
      nav('/', { replace: true })
    }

  }


  const onClickDelete = () => {

    if (window.confirm('일기를 정말 삭제할까요?')) {

      onDelete(params.id)
      nav('/', { replace: true })
    }
  }
  return (
    <div>
      <Header
        title={'일기 수정하기'}
        leftChild={<Button text={'< 뒤로가기'} 
        onClick={()=>nav(-1)}
        />}
        rightChild={<Button
          type={'NEGATIVE'}
          text={'삭제하기'}
          onClick={onClickDelete}
        />}
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  )
}

export default Edit
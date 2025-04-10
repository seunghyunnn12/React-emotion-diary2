import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { DiaryStateContext } from '../App'
import { useNavigate } from 'react-router-dom'

const useDiary = (id) => {


    const [curDiaryItem, setCurDiaryItem] = useState(null)
    const data = useContext(DiaryStateContext)
    const nav = useNavigate()
    useEffect(() => {

        const currentDiaryItem = data.find(
            (item) => String(item.id) === String(id)
        )
        if (!currentDiaryItem) {
            window.alert('존재하지 않는 일기입니다')
            nav('/', { replace: true })
        }
        setCurDiaryItem(currentDiaryItem)



    }, [id, data, nav])
    return curDiaryItem;
}

export default useDiary
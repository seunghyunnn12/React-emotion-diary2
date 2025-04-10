import React, {useState, useContext} from 'react'
import { DiaryStateContext } from '../App'
import Header from '../components/Header'
import Button from '../components/Button'
import DiaryList from '../components/DiaryList'
import usePageTitle from '../hooks/usePageTitle'

const Home = () => {

  const [pivotDate, setPivotDate] = useState(new Date())
  const data = useContext(DiaryStateContext)


  usePageTitle('노승현의 감정일기장')


  const getMonthlyData = (pivotDate, data) => {
    const beginTime = new Date(
      pivotDate.getFullYear(),
      pivotDate.getMonth(),
      1,
      0,
      0,
      0
    ).getTime()

    const endTime = new Date(
      pivotDate.getFullYear(),
      pivotDate.getMonth()+1,
      0,
      23,
      59,
      59
    ).getTime()

    return data.filter(
      (item) => beginTime<= item.createdDate && item.createdDate<=endTime
    )


  }

  const onIncreaseMonth = () => {
    setPivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1)
    )
  }

  const ondecreaseMonth = () => {
    setPivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth()-1)
    )
  }

  const monthlyData = getMonthlyData(pivotDate, data)

  return (
    <div>
      <Header
      title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`}
      leftChild={<Button text={"<"} onClick={ondecreaseMonth}/>}
      rightChild={<Button text={">"} onClick={onIncreaseMonth}/>}
      />
      <DiaryList data={monthlyData}/>
    </div>
  )
}

export default Home
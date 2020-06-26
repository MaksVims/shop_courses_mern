import React, {useMemo} from 'react'
import './ProfileInfo.scss'
import {convertToCurrency} from "../../../other/utils";
import {useAccordion} from "../../../hooks/useAccordion";

const ProfileInfo = (props) => {
  const {data} = props
  const options = useMemo(() => ([
    {
    title: 'Дополнительная информация',
    items: [
      `Курсов создано: ${data.makeOrders}`,
      `Приобретено курсов: ${data.courseCreate}`,
      `Всего потрачено: ${convertToCurrency(data.totalSummary)}`,
      `Отмеченных курсов: ${data.likes}`,
    ]
  }
  ]), [data])

  const body = useAccordion(options)

  return (
    <div className={"more-info"}>
      {body}
    </div>
  )
}

export default ProfileInfo
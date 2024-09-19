
import { format } from "date-fns";
import { constants } from "@/utils/utils";


import '@/components/meterTimeline/MeterTimelineTrn.css'

const MeterTimelineTrn = (props) => {
  // console.log(`props`, props)
  const {trn} = props
  return (
    <div className='meter-timeline-trn'>
      <p>Transaction (Trn)</p>
      <p>{trn?.trnType}</p>
      {/* <p>Updated By Datetime: {format(trn?.updatedAtDatetime?.toDate(),constants?.dateFormat2)}</p> */}
      <p>{trn?.updatedByUser}</p>
    </div>
  )
}

export default MeterTimelineTrn


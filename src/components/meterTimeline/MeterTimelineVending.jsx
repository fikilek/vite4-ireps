
// import { format } from "date-fns";
// import { constants } from "@/utils/utils";


import '@/components/meterTimeline/MeterTimelineVending.css'

const MeterTimelineVending = (props) => {
  // console.log(`props`, props)
  const {vendingData} = props
  return (
    <div className='meter-timeline-trn'>
      <p>Vending</p>
      <p>{vendingData?.amount}</p>
      <p>{vendingData?.meterOwner}</p>
    </div>
  )
}

export default MeterTimelineVending


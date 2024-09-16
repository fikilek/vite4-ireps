import { v4 as uuidv4 } from "uuid";
import { Timestamp } from "firebase/firestore";

import '@/components/meterChats/MeterChat.css'

import MeterChatHeader from '@/components/meterChats/MeterChatHeader'
import MeterChats from '@/components/meterChats/MeterChats'

const MeterChat = (props) => {
  const {ast} = props
  // console.log(`ast`, ast)
  const chats = [
    {
      datetime: Timestamp.now(),
      chatId:  uuidv4(),
      userUid: 'KNfbDIfQfif1eaeEAK4Q9AbXV2',
      displayName: 'Fikile Kentane',
      chatContent: 'This meter seems to be tempered',
      astId: '00e25954-2e9a-413f-a12c-7aa68d039934',
      astNo: '0456532321'
    }, 
    {
      datetime: Timestamp.now(),
      chatId:  uuidv4(),
      userUid: 'KNfbDIfQfif1ehFaeEAK4Q9AbXV2',
      displayName: 'Fikile Kentane',
      chatContent: 'This meter seems to be tempered',
      astId: '00e25954-2e9a-413f-a12c-7aa68d039934',
      astNo: '0456532321'
    }, 
    {
      datetime: Timestamp.now(),
      chatId:  uuidv4(),
      userUid: 'KNfbDIffif1ehFaeEAK4Q9AbXV2',
      displayName: 'Fikile Kentane',
      chatContent: 'This meter seems to be tempered',
      astId: '00e25954-2e9a-413f-a12c-7aa68d039934',
      astNo: '0456532321'
    },  
    {
      datetime: Timestamp.now(),
      chatId:  uuidv4(),
      userUid: 'KNfbDIfQfif1ehFaeEAK4Q9AbXV2',
      displayName: 'Fikile Kentane',
      chatContent: 'This meter seems to be tempered',
      astId: '00e25954-2e9a-413f-a12c-7aa68d039934',
      astNo: '0456532321'
    },  
    {
      datetime: Timestamp.now(),
      chatId:  uuidv4(),
      userUid: 'KNfbDIfQfifhFaeEAK4Q9AbXV2',
      displayName: 'Fikile Kentane',
      chatContent: 'This meter seems to be tempered',
      astId: '00e25954-2e9a-413f-a12c-7aa68d039934',
      astNo: '0456532321'
    },  
    {
      datetime: Timestamp.now(),
      chatId:  uuidv4(),
      userUid: 'KNfbDIfQfifhFaeEAK4Q9AbXV2',
      displayName: 'Fikile Kentane',
      chatContent: 'This meter seems to be tempered',
      astId: '00e25954-2e9a-413f-a12c-7aa68d039934',
      astNo: '0456532321'
    },  
    {
      datetime: Timestamp.now(),
      chatId:  uuidv4(),
      userUid: 'KNfbDIfQfif1ehFaeEAK4Q9AbXV2',
      displayName: 'Fikile Kentane',
      chatContent: 'This meter seems to be tempered',
      astId: '00e25954-2e9a-413f-a12c-7aa68d039934',
      astNo: '0456532321'
    }, 
    {
      datetime: Timestamp.now(),
      chatId:  uuidv4(),
      userUid: 'KNfbDIfQfif1eaeEAK4Q9AbXV2',
      displayName: 'Fikile Kentane',
      chatContent: 'This meter seems to be tempered',
      astId: '00e25954-2e9a-413f-a12c-7aa68d039934',
      astNo: '0456532321'
    }, 
    {
      datetime: Timestamp.now(),
      chatId:  uuidv4(),
      userUid: 'KNfbDIfQfif1ehFaeEAK4Q9AbXV2',
      displayName: 'Fikile Kentane',
      chatContent: 'This meter seems to be tempered',
      astId: '00e25954-2e9a-413f-a12c-7aa68d039934',
      astNo: '0456532321'
    }, 
    {
      datetime: Timestamp.now(),
      chatId:  uuidv4(),
      userUid: 'KNfbDIfQfif1ehFaeEAK4Q9AbXV2',
      displayName: 'Fikile Kentane',
      chatContent: 'This meter seems to be tempered',
      astId: '00e25954-2e9a-413f-a12c-7aa68d039934',
      astNo: '0456532321'
    }, 
    {
      datetime: Timestamp.now(),
      chatId:  uuidv4(),
      userUid: 'KNfbDIfQfif1ehFaeEAK4Q9AbXV2',
      displayName: 'Fikile Kentane',
      chatContent: 'This meter seems to be tempered',
      astId: '00e25954-2e9a-413f-a12c-7aa68d039934',
      astNo: '0456532321'
    }, 
    {
      datetime: Timestamp.now(),
      chatId:  uuidv4(),
      userUid: 'KNfbDIfQfif1ehFaeEAK4Q9AbXV2',
      displayName: 'Fikile Kentane',
      chatContent: 'This meter seems to be tempered',
      astId: '00e25954-2e9a-413f-a12c-7aa68d039934',
      astNo: '0456532321'
    }, 
  ]

  return (
    <div className='meter-chat'>
      <MeterChatHeader  />
      <MeterChats chats={chats} ast={ast} />
    </div>
  )
}

export default MeterChat
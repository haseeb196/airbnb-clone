import React from 'react'

const BookingWidget = ({place}) => {
  return (
   <div className="rounded-2xl bg-white p-4 shadow">
   <div className="text-center text-2xl">Price: ${place.price} / per night</div>
   <div className="mt-4 rounded-2xl border">
     <div className="flex">
       <div className="py-3 px-4">
         <label>Check in:</label>
         <input type="date" />
       </div>
       <div className="border-l py-3 px-4">
         <label>Check out:</label>
         <input type="date" />
       </div>
     </div>
     <div>
       <div className="border-t py-3 px-4">
         <label>Number of guests:</label>
         <input
           type="number"
           value={1}
         />
       </div>
     </div>
   </div>
   <button className="primary mt-4">Book this place</button>
   </div>
  )
}

export default BookingWidget
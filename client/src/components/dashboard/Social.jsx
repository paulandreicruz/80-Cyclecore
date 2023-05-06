import React from 'react'
import fb from "../assets/fb.jpg"
import { FcLike, FcRating } from 'react-icons/fc'
import follow from "../assets/follow-us.png"
import rating from "../assets/rating.png"
import { RiChatFollowUpFill } from 'react-icons/ri'

export const Social = () => {
  return (
    <>
        <div>
            <div>
                <img src={fb} alt="" className='h-[6rem] w-full rounded-t-sm'/>
            </div>

            <div>
                <div className='flex items-center justify-between'>
                    <div className='px-14 py-2 bg-white'>
                     <FcLike fontSize={90}/>
                    </div>
                    <div className='px-14 py-2 text-center bg-[#f9fafb]'>
                        <div className='text-5xl py-[9px]'>+940</div>
                        <div>likes</div>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='px-14 py-2 bg-white'>
                        {/* <img src={follow} alt="" className='w-[90px]'/> */}
                        <RiChatFollowUpFill fontSize={90} className='text-sky-300'/>
                    </div>
                    <div className='px-14 py-2 text-center bg-[#f9fafb]'>
                        <div className='text-5xl py-[9px]'>+977</div>
                        <div>Followers</div>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='px-14 py-2 bg-white'>
                        {/* <img src={rating} alt="" className='w-[90px]'/> */}
                        <FcRating fontSize={90}/>
                    </div>
                    <div className='px-[19%] py-2 text-center bg-[#f9fafb]'>
                        <div className='text-5xl py-[9px]'>45</div>
                        <div>Ratings</div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

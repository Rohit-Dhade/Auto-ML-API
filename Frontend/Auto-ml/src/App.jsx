import React from 'react'
import { FaUpload } from "react-icons/fa6";
import { RiDashboardLine } from "react-icons/ri";
import { BsList } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { MdModelTraining } from "react-icons/md";
import { ImLibreoffice } from "react-icons/im";
import { MdDataObject } from "react-icons/md";
import { MdBatchPrediction } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";

const App = () => {
  return (
    <div className="relative h-screen w-full bg-black">

      <div className="absolute inset-y-0 left-0 h-[20%] top-90 w-[16%]
                  bg-linear-to-r
                  from-green-900 blur-2xl to-transparent">
      </div>

      <div className="relative z-10 text-white p-5 h-full w-[20%] flex flex-col items-start gap-0.5 border-2">
        <div style={{ fontFamily: "NeueMachina", fontSize: "18px", fontWeight: 600 }} className=''>Auto-Ml API</div>
        <div className='w-[90%] bg-amber-300 border border-gray-400'></div>

        {/* Navigation */}
        <div className=' w-full h-[70%] mt-4'>
          <div className='w-full h-[13%] flex items-center text-[10px]'>Navigation</div>

          <div className='h-[85%] w-full flex flex-col gap-1.5 overflow-auto no-scrollbar'>
            <div className='flex items-center gap-2 h-[13%] hover:bg-[#191E18] transition-all duration-200 rounded-md pl-1 shrink-0'>
              <div className='bg-[#2D352F] w-[20%] h-[80%] rounded-md flex items-center justify-center'>
                <RiDashboardLine />
              </div>
              <div style={{fontFamily:"Helvetica"}} className='w-full h-[13%] flex items-center text-[12px] text-gray-400'>Dashboard</div>
            </div>

            <div className='flex items-center gap-2 h-[13%] hover:bg-[#191E18] transition-all duration-200 rounded-md pl-1 shrink-0'>
              <div className='bg-[#2D352F] w-[20%] h-[80%] rounded-md flex items-center justify-center'>
                <FaUpload size={13} />
              </div>
              <div style={{fontFamily:"Helvetica"}} className='w-full h-[13%] flex items-center text-[12px] text-gray-400'> Upload Dataset</div>
            </div>

            <div className='flex items-center gap-2 h-[13%] hover:bg-[#191E18] transition-all duration-200 rounded-md pl-1 shrink-0'>
              <div className='bg-[#2D352F] w-[20%] h-[80%] rounded-md flex items-center justify-center'>
                <BsList />
              </div>
              <div style={{fontFamily:"Helvetica"}} className='w-full h-[13%] flex items-center text-[12px] text-gray-400'> List Datasets</div>
            </div>
            <div className='flex items-center gap-2 h-[13%] hover:bg-[#191E18] transition-all duration-200 rounded-md pl-1 shrink-0'>
              <div className='bg-[#2D352F] w-[20%] h-[80%] rounded-md flex items-center justify-center'>
                <MdDeleteOutline />
              </div>
              <div style={{fontFamily:"Helvetica"}} className='w-full h-[13%] flex items-center text-[12px] text-gray-400'>Delete Datasets</div>
            </div>
            <div className='flex items-center gap-2 h-[13%] hover:bg-[#191E18] transition-all duration-200 rounded-md pl-1 shrink-0'>
              <div className='bg-[#2D352F] w-[20%] h-[80%] rounded-md flex items-center justify-center'>
                <MdModelTraining />
              </div>
              <div style={{fontFamily:"Helvetica"}} className='w-full h-[13%] flex items-center text-[12px] text-gray-400'> Train ML Models</div>
            </div>
            <div className='flex items-center gap-2 h-[13%] hover:bg-[#191E18] transition-all duration-200 rounded-md pl-1 shrink-0'>
              <div className='bg-[#2D352F] w-[20%] h-[80%] rounded-md flex items-center justify-center'>
                <ImLibreoffice size={12}/>
              </div>
              <div style={{fontFamily:"Helvetica"}} className='w-full h-[13%] flex items-center text-[12px] text-gray-400'> Show Models</div>
            </div>
            <div className='flex items-center gap-2 h-[13%] hover:bg-[#191E18] transition-all duration-200 rounded-md pl-1 shrink-0'>
              <div className='bg-[#2D352F] w-[20%] h-[80%] rounded-md flex items-center justify-center'>
                <MdDataObject />
              </div>
              <div style={{fontFamily:"Helvetica"}} className='w-full h-[13%] flex items-center text-[12px] text-gray-400'>Show Meta Data</div>
            </div>
            <div className='flex items-center gap-2 h-[13%] hover:bg-[#191E18] transition-all duration-200 rounded-md pl-1 shrink-0'>
              <div className='bg-[#2D352F] w-[20%] h-[80%] rounded-md flex items-center justify-center'>
                <MdBatchPrediction />
              </div>
              <div style={{fontFamily:"Helvetica"}} className='w-full h-[13%] flex items-center text-[12px] text-gray-400'>Show Prediction</div>
            </div>
            <div className='flex items-center gap-2 h-[13%] hover:bg-[#191E18] transition-all duration-200 rounded-md pl-1 shrink-0'>
              <div className='bg-[#2D352F] w-[20%] h-[80%] rounded-md flex items-center justify-center'>
                <RiDeleteBin6Line size={13}/>
              </div>
              <div style={{fontFamily:"Helvetica"}} className='w-full h-[13%] flex items-center text-[12px] text-gray-400'>Delete Model</div>
            </div>
          </div>
        </div>

        <div className='last-part absolute bottom-1 flex flex-col gap-1'>
          <span className='text-[10px]'>User Account</span>
          <div className='flex items-center justify-center gap-2'>
            <div className='h-10 w-10 rounded-full overflow-hidden'><img className='w-full h-full object-cover' src="https://i.pinimg.com/1200x/19/0a/fc/190afc31e3dd8e7804652d509272edbc.jpg" alt="" /></div>
            <div style={{fontFamily:"NeueMachina" , fontSize:"12px"}}>Rohit Dhade</div>
            <div><BsThreeDotsVertical /></div>
          </div>
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 h-[20%] top-0 w-[20%]
                  bg-linear-to-r
                  from-green-700 blur-2xl to-transparent">
      </div>

    </div>

  )
}

export default App
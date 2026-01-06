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

const SideNavbar = () => {
    return (
        <div className="relative h-screen w-full bg-black">

            <div className="absolute inset-y-0 left-0 h-[20%] top-150 w-[90%]
                  bg-linear-to-r
                  from-green-900 blur-2xl to-transparent">
            </div>

            <div className="relative z-10 text-white p-5 h-full w-full flex flex-col items-start gap-0.5">
                <div style={{ fontFamily: "NeueMachina", fontSize: "26px", fontWeight: 600 }} className=''>Auto-Ml API</div>
                <div className='w-[90%] bg-amber-300 border border-gray-400'></div>

                {/* Navigation */}
                <div className=' w-full h-[70%] mt-4'>
                    <div className='w-full h-[13%] flex items-center text-[15px]'>Navigation</div>

                    <div className='h-[85%] w-full flex flex-col gap-1.5 overflow-auto no-scrollbar scroll-smooth'>
                        <div className='flex items-center gap-2 h-[13%] hover:bg-[#191E18] rounded-md pl-1 shrink-0 active:scale-98 cursor-pointer'>
                            <div className='bg-[#2D352F] w-[20%] h-[80%] rounded-md flex items-center justify-center'>
                                <RiDashboardLine size={20} />
                            </div>
                            <div style={{ fontFamily: "Helvetica" }} className='w-full h-[13%] flex items-center text-[19px] text-gray-400'>Dashboard</div>
                        </div>

                        <div className='flex items-center gap-2 h-[13%] hover:bg-[#191E18] transition-all duration-200 rounded-md pl-1 shrink-0 active:scale-98 cursor-pointer'>
                            <div className='bg-[#2D352F] w-[20%] h-[80%] rounded-md flex items-center justify-center'>
                                <FaUpload size={20} />
                            </div>
                            <div style={{ fontFamily: "Helvetica" }} className='w-full h-[13%] flex items-center text-[19px] text-gray-400'> Upload Dataset</div>
                        </div>

                        <div className='flex items-center gap-2 h-[13%] hover:bg-[#191E18] transition-all duration-200 rounded-md pl-1 shrink-0 active:scale-98 cursor-pointer'>
                            <div className='bg-[#2D352F] w-[20%] h-[80%] rounded-md flex items-center justify-center'>
                                <BsList size={20}/>
                            </div>
                            <div style={{ fontFamily: "Helvetica" }} className='w-full h-[13%] flex items-center text-[19px] text-gray-400'> List Datasets</div>
                        </div>
                        <div className='flex items-center gap-2 h-[13%] hover:bg-[#191E18] transition-all duration-200 rounded-md pl-1 shrink-0 active:scale-98 cursor-pointer'>
                            <div className='bg-[#2D352F] w-[20%] h-[80%] rounded-md flex items-center justify-center'>
                                <MdDeleteOutline size={20}/>
                            </div>
                            <div style={{ fontFamily: "Helvetica" }} className='w-full h-[13%] flex items-center text-[19px] text-gray-400'>Delete Datasets</div>
                        </div>
                        <div className='flex items-center gap-2 h-[13%] hover:bg-[#191E18] transition-all duration-200 rounded-md pl-1 shrink-0 active:scale-98 cursor-pointer'>
                            <div className='bg-[#2D352F] w-[20%] h-[80%] rounded-md flex items-center justify-center'>
                                <MdModelTraining size={20}/>
                            </div>
                            <div style={{ fontFamily: "Helvetica" }} className='w-full h-[13%] flex items-center text-[19px] text-gray-400'> Train ML Models</div>
                        </div>
                        <div className='flex items-center gap-2 h-[13%] hover:bg-[#191E18] transition-all duration-200 rounded-md pl-1 shrink-0 active:scale-98 cursor-pointer'>
                            <div className='bg-[#2D352F] w-[20%] h-[80%] rounded-md flex items-center justify-center'>
                                <ImLibreoffice size={20} />
                            </div>
                            <div style={{ fontFamily: "Helvetica" }} className='w-full h-[13%] flex items-center text-[19px] text-gray-400'> Show Models</div>
                        </div>
                        <div className='flex items-center gap-2 h-[13%] hover:bg-[#191E18] transition-all duration-200 rounded-md pl-1 shrink-0 active:scale-98 cursor-pointer'>
                            <div className='bg-[#2D352F] w-[20%] h-[80%] rounded-md flex items-center justify-center'>
                                <MdDataObject size={20}/>
                            </div>
                            <div style={{ fontFamily: "Helvetica" }} className='w-full h-[13%] flex items-center text-[19px] text-gray-400'>Show Meta Data</div>
                        </div>
                        <div className='flex items-center gap-2 h-[13%] hover:bg-[#191E18] transition-all duration-200 rounded-md pl-1 shrink-0 active:scale-98 cursor-pointer'>
                            <div className='bg-[#2D352F] w-[20%] h-[80%] rounded-md flex items-center justify-center'>
                                <MdBatchPrediction size={20}/>
                            </div>
                            <div style={{ fontFamily: "Helvetica" }} className='w-full h-[13%] flex items-center text-[19px] text-gray-400'>Show Prediction</div>
                        </div>
                        <div className='flex items-center gap-2 h-[13%] hover:bg-[#191E18] transition-all duration-200 rounded-md pl-1 shrink-0 active:scale-98 cursor-pointer'>
                            <div className='bg-[#2D352F] w-[20%] h-[80%] rounded-md flex items-center justify-center'>
                                <RiDeleteBin6Line size={20} />
                            </div>
                            <div style={{ fontFamily: "Helvetica" }} className='w-full h-[13%] flex items-center text-[19px] text-gray-400'>Delete Model</div>
                        </div>
                    </div>
                </div>

                <div className='last-part absolute bottom-3 flex flex-col gap-1'>
                    <span className='text-[15px]'>User Account</span>
                    <div className='flex items-center justify-center gap-4'>
                        <div className='h-12 w-12 rounded-full overflow-hidden'><img className='w-full h-full object-cover' src="https://i.pinimg.com/1200x/19/0a/fc/190afc31e3dd8e7804652d509272edbc.jpg" alt="" /></div>
                        <div style={{ fontFamily: "NeueMachina", fontSize: "16px" }}>Rohit Dhade</div>
                        <div><BsThreeDotsVertical size={16} color='gray' /></div>
                    </div>
                </div>
            </div>

            <div className="absolute inset-y-0 left-0 h-[23%] top-0 w-full
                  bg-linear-to-r
                  from-emerald-700 blur-2xl to-transparent">
            </div>

        </div>

    )
}

export default SideNavbar
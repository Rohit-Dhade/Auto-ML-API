import React from 'react'
import { GrClose } from "react-icons/gr";
import { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteDatasetModal = ({ onClose }) => {
    const [move, setmove] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setmove(true)
        }, 200);
    }, [])
    return (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-2xl w-full h-screen flex items-center justify-center z-100'>
            <div className={`relative bg-gray-200 h-[75%] w-[50%] shadow-2xl rounded-4xl py-4 transform transition-all duration-1000 ease-initial ${move ? "translate-x-0" : "-translate-x-[50%]"}`}>
                <button className='absolute right-7 top-5 flex items-center text-3xl' onClick={onClose}><GrClose size={20} /></button>
                <div style={{ fontFamily: "NeueMachina" }} className='flex items-center justify-center text-3xl'>Delete Dataset</div>
                <div className='flex items-start justify-center  flex-wrap gap-12 mt-8 w-full h-[80%] overflow-auto no-scrollbar'>

                    <form className='w-[80%] h-full flex flex-col gap-5 items-center'>
                        <div className='w-full mt-6 h-[20%] flex items-center justify-center'>
                            <label className="relative flex items-center justify-center w-[90%] h-14 bg-white rounded-2xl cursor-pointer shadow-md">
                                <span className="text-gray-500 text-xl">Enter the correct dataset name</span>
                                <input
                                    type="text"
                                    className="absolute inset-0 opacity-0 cursor-pointer" placeholder='Enter the correct dataset name' required
                                />
                            </label>

                        </div>
                        <button type='submit' className='pt-sans-bold bg-green-500 w-[30%] h-[15%] text-2xl rounded-2xl active:scale-95 transition-all duration-300 ease-in-out tracking-wide'>Upload</button>
                        {/* {filestatus && (
                            <div className='mt-20'>{filestatus.detail}</div>
                        )} */}
                    </form>


                </div>
            </div>
        </div>
    )
}

export default DeleteDatasetModal
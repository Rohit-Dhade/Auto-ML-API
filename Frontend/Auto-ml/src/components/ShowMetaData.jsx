import React from 'react'
import { useState, useEffect } from 'react'
import { GrClose } from "react-icons/gr";

const ShowMetaData = ({ onClose }) => {
    const [state, setstate] = useState(false)
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
                <div style={{ fontFamily: "NeueMachina" }} className='flex items-center justify-center text-3xl'>Meta-Data of Model</div>
                <div className='w-full mt-10 h-[15%] flex items-center justify-center'>
                    <input className='bg-white w-[90%] h-full text-2xl rounded-2xl pl-6 outline-none focus:outline-none ring-0 focus:ring-0 border-0 focus:border-0 hover:shadow-2xl pt-sans-regular' required type="text" placeholder='Enter the correct and exact model_id' />
                </div>
                <div className='bg-red-300 h-[55%] w-full mt-6'>something</div>

                <div className='h-[10%] w-full mt-4 flex text-3xl items-center justify-center rounded-3xl'>
                    <button className='pt-sans-bold bg-green-500 w-[30%] h-full rounded-2xl active:scale-95 transition-all duration-300 ease-in-out'>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default ShowMetaData
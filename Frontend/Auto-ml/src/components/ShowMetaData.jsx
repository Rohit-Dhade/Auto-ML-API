import React from 'react'
import { useState, useEffect } from 'react'
import { GrClose } from "react-icons/gr";
import api from '../api/axios'

const ShowMetaData = ({ onClose }) => {
    const [state, setstate] = useState(false)
    const [move, setmove] = useState(false)
    const [data, setdata] = useState(null)
    const [loading, setloading] = useState(false)
    const [inpValue, setinpValue] = useState(null)

    const fetchdata = async () => {
        if (!inpValue) return (alert("Enter the model id"))
        setloading(true)
        try {
            const response = await api.get(`/ShowMetaData?model_id=${inpValue}`)
            console.log(response.data);
            setdata(response.data)
        } catch (err) {
            console.error(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setmove(true)
        }, 200);
    }, [])
    return (
        <div className='fixed inset-0 bg-black/10 backdrop-blur-sm w-full h-screen flex items-center justify-center z-100'>
            <div className={`relative bg-gray-200 h-[75%] w-[50%] shadow-2xl rounded-4xl py-4 transform transition-all duration-1000 ease-initial ${move ? "translate-x-0" : "-translate-x-[50%]"}`}>
                <button className='absolute right-7 top-5 flex items-center text-3xl' onClick={onClose}><GrClose size={20} /></button>
                <div style={{ fontFamily: "NeueMachina" }} className='flex items-center justify-center text-3xl'>Meta-Data of Model</div>
                <form className='h-full w-full'>
                    <div className='w-full mt-6 h-[15%] flex items-center justify-center'>
                        <input required onChange={(e) => setinpValue(e.target.value)} className='bg-white w-[90%] h-full text-2xl rounded-2xl pl-6 outline-none focus:outline-none ring-0 focus:ring-0 border-0 focus:border-0 hover:shadow-2xl pt-sans-regular' spellCheck="false" type="text" placeholder='Enter the correct and exact model_id' />
                    </div>

                    {data && (
                        <div className='h-[58%] w-full mt-5 px-10 flex flex-col gap-2 overflow-auto no-scrollbar'>

                            <div className='flex items-center text-2xl gap-3'>
                                <span className='bg-red-400 rounded-md p-1 text-xl w-[30%] flex items-center justify-center'>Dataset Name</span>
                                <span className='pt-sans-bold'>:  {data["Dataset name"]}</span>
                            </div>

                            <div className='flex items-center text-2xl gap-3'>
                                <span className='bg-red-400 rounded-md p-1 text-xl w-[30%] flex items-center justify-center'>Algorithm</span>
                                <span className='pt-sans-bold'>:  {data["Algorithm"]}</span>
                            </div>
                            <div className='flex items-center text-2xl gap-3'>
                                <span className='bg-red-400 rounded-md p-1 text-xl w-[30%] flex items-center justify-center'>Target column</span>
                                <span className='pt-sans-bold'>:  {data["Target column"]}</span>
                            </div>
                            <div className='flex items-center text-2xl gap-3'>
                                <span className='bg-red-400 rounded-md p-1 text-xl w-[30%] flex items-center justify-center'>Problem type</span>
                                <span className='pt-sans-bold'>:  {data["Problem type"]}</span>
                            </div>
                            <div className='flex items-center text-2xl gap-3'>
                                <span className='bg-red-400 rounded-md p-1 text-xl w-[30%] flex items-center justify-center'>Categorical features</span>
                                <span className='pt-sans-bold'>:  {data["Categorical features"].length}</span>
                            </div>
                            <div className='flex items-center text-2xl gap-3'>
                                <span className='bg-red-400 rounded-md p-1 text-xl w-[30%] flex items-center justify-center'>Numerical features</span>
                                <span className='pt-sans-bold'>:  {data["Numerical features"].length}</span>
                            </div>
                            <div className='flex items-center text-2xl gap-3'>
                                <span className='bg-red-400 rounded-md p-1 text-xl w-[30%] flex items-center justify-center'>model_id</span>
                                <span className='pt-sans-bold'>:  {data["model_id"]}</span>
                            </div>

                            <div className='flex items-center text-2xl gap-3'>
                                <span className='bg-red-400 rounded-md p-1 text-xl w-[30%] flex items-center justify-center'>labels</span>
                                {data["labels"] && <span className='pt-sans-bold'>:  {`{ 0 - "${data["labels"]["0"]}" , 1 - "${data["labels"]["1"]}" }`}</span>}
                            </div>

                        </div>
                    )}

                    <div className='absolute bottom-2 h-[10%] w-full flex text-3xl items-center justify-center rounded-3xl'>
                        <button type='button' onClick={fetchdata} className='pt-sans-bold bg-green-500 w-[30%] h-full rounded-2xl active:scale-95 transition-all duration-300 ease-in-out'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ShowMetaData
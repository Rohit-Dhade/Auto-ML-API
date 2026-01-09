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

    const [deleteddataset, setdeleteddataset] = useState(null)
    const [deleteresponse, setdeleteresponse] = useState(null)
    const formdata = new FormData()
    formdata.append("filname" , toString(deleteddataset))

    const DeleteDataset = async () => {
        if(!deleteddataset) return(alert("Enter the dataset file name."))
        try{
            const response = await axios.post(`http://127.0.0.1:8000/deleteFile/${deleteddataset}`)
            setdeleteresponse(response.data)
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className='fixed inset-0 bg-black/10 backdrop-blur-sm w-full h-screen flex items-center justify-center z-100'>
            <div className={`relative bg-gray-200 h-[75%] w-[50%] shadow-2xl rounded-4xl py-4 transform transition-all duration-1000 ease-initial ${move ? "translate-x-0" : "-translate-x-[50%]"}`}>
                <button className='absolute right-7 top-5 flex items-center text-3xl' onClick={onClose}><GrClose size={20} /></button>
                <div style={{ fontFamily: "NeueMachina" }} className='flex items-center justify-center text-3xl'>Delete Dataset</div>
                <div className='flex items-start justify-center  flex-wrap gap-12 mt-8 w-full h-[80%] overflow-auto no-scrollbar'>

                    <form className='w-[80%] h-full flex flex-col gap-5 items-center'>
                        <div className='w-full mt-6 h-[20%] flex items-center justify-center'>
                            <input className='cursor-pointer w-full h-[90%] text-center bg-white text-2xl ring-0 focus:ring-0 border-0 focus:border-0 outline-none focus:outline-0 rounded-2xl' type="text" placeholder='Enter the dataset name' onChange={(e) => setdeleteddataset(e.target.value)} />
                        </div>
                        <button type='button' onClick={DeleteDataset} className='pt-sans-bold bg-green-500 w-[30%] h-[15%] text-2xl rounded-2xl active:scale-95 transition-all duration-300 ease-in-out tracking-widest'>Delete</button>
                        {deleteresponse && (
                            <div className='mt-20 text-2xl pt-sans-regular transition-all duration-500 ease-in'>{deleteresponse.message}</div>
                        )}

                    </form>


                </div>
            </div>
        </div>
    )
}

export default DeleteDatasetModal
import React, { useEffect, useState } from 'react'
import SingleDataset from './SingleDataset'
import { GrClose } from "react-icons/gr";
import api from '../api/axios'

const ListDataset = ({ onClose }) => {
    const [listdataset, setlistdataset] = useState([])

    useEffect(() => {
        const listdatasets = async () => {
            try {
                const response = await api.get("/filesUploaded")
                // const mdId = response.data.map(item => item.model_id)
                setlistdataset(response.data.datasets);
                

            } catch (err) {
                console.error(err.response?.data || err.message);
            }
        }
        listdatasets();
    }, [listdataset])

    const [move, setmove] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setmove(true)
        }, 200);
    }, [])

    return (
        <div className='fixed inset-0 bg-black/10 backdrop-blur-sm w-full h-screen flex items-center justify-center z-100'>
            <div className={`relative bg-gray-200 h-[75%] w-[50%] shadow-2xl rounded-4xl py-4 transform transition-all duration-1000 ease-initial ${move ? "translate-x-0" : "-translate-x-[50%]"}`}>
                <button className='absolute right-7 top-5 flex items-center text-3xl' onClick={onClose}><GrClose size={20} /></button>
                <div style={{ fontFamily: "NeueMachina" }} className='flex items-center justify-center text-3xl'>Lists of Datasets</div>
                <div className='flex items-start justify-center  flex-wrap gap-12 mt-8 w-full h-[80%] overflow-auto no-scrollbar'>

                    {listdataset.map((item , idx)=>(
                        <SingleDataset info={item} id = {idx}/>
                    ))}
                    
                </div>
            </div>
        </div>
    )
}

export default ListDataset
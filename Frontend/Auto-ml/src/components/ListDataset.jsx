import React from 'react'
import SingleDataset from './SingleDataset'
import { GrClose } from "react-icons/gr";

const ListDataset = ({onClose}) => {
  return (
    <div className='fixed inset-0 bg-black/40 backdrop-blur-2xl w-full h-screen flex items-center justify-center z-100'>
        <div className='relative bg-gray-200 h-[75%] w-[50%] shadow-2xl rounded-4xl py-4'>
            <button className='absolute right-7 top-5 flex items-center text-3xl' onClick={onClose}><GrClose size={20}/></button>
            <div style={{fontFamily:"NeueMachina"}} className='flex items-center justify-center text-3xl'>Lists of Datasets</div>
            <div className='flex items-start justify-center  flex-wrap gap-12 mt-8 w-full h-[80%] overflow-auto no-scrollbar'>

                <SingleDataset/>
                <SingleDataset/>
                <SingleDataset/>
                <SingleDataset/>
                <SingleDataset/>
                
            </div>
        </div>
    </div>
  )
}

export default ListDataset
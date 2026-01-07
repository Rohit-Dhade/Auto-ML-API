import React from 'react'

const SingleDataset = ({info , id}) => {
    return (
        <div className='sample bg-white w-[40%] h-[60%] shadow-2xl rounded-2xl p-2'>
            <div style={{ fontFamily: "NeueMachina" }} className='flex items-center justify-center font-bold text-2xl'>Dataset - {id+1}</div>

            <div className='mt-3 w-full h-[70%] flex flex-col gap-4 p-2'>
                <div className='flex items-center text-2xl w-full gap-3'>
                    <span className='bg-red-400 rounded-md p-1 text-xl w-[40%] flex items-center justify-center'>Filename</span>
                    <span className='pt-sans-bold whitespace-nowrap'>:  {info["filename"]}</span>
                </div>

                <div className='flex items-center text-2xl gap-3'>
                    <span className='bg-red-400 rounded-md p-1 text-xl w-[40%] flex items-center justify-center'>Columns</span>
                    <span className='pt-sans-bold'>:  {info["No_of_Columns"]}</span>
                </div>

                <div className='flex items-center text-2xl gap-3'>
                    <span className='bg-red-400 rounded-md p-1 text-xl w-[40%] flex items-center justify-center'>Rows</span>
                    <span className='pt-sans-bold'>:  {info["No_of_rows"]}</span>
                </div>
            </div>
        </div>
    )
}

export default SingleDataset
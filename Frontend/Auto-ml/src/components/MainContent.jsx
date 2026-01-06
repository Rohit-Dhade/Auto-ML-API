import React from 'react'
import SingleCardModel from './SingleCardModel'

const MainContent = () => {
    return (
        <div className='bg-white h-full w-full rounded-l-3xl flex flex-col gap-2'>
            <div className='heading flex items-center justify-between mt-3 pr-5 h-[8%] w-full'>
                <span style={{ fontFamily: "NeueMachina", fontSize: "40px" }} className='pl-4 font-bold'>Dashboard</span>
                <span style={{ fontFamily: "NeueMachina" }} className='border-2 flex items-center justify-center text-[18px] w-[20%] rounded-2xl bg-black text-white h-[90%]'>Train. Save. Predict.</span>
            </div>
            <div style={{ font: "Helvetica", fontSize:"20px"}} className='pl-9'>Models Train so far.</div>
            <div className='h-[50%] flex items-center justify-center gap-6'>
                <SingleCardModel />
                <SingleCardModel />
                <SingleCardModel />
            </div>
        </div>
    )
}

export default MainContent 
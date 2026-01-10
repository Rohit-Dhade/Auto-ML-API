import React from 'react'
import { GrClose } from "react-icons/gr";
import { useState, useEffect } from 'react';
import axios from 'axios';

const ResultsRegression = ({onClose , info}) => {
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
                <div style={{ fontFamily: "NeueMachina" }} className='flex items-center justify-center text-3xl'>Training Results</div>
                <div className='flex items-start justify-center pl-6  flex-wrap gap-4 mt-8 w-full h-[80%] overflow-auto no-scrollbar'>

                    <div className='flex items-center text-2xl w-full gap-3'>
                        <span className='bg-red-400 rounded-md p-1 text-xl w-[30%] flex items-center justify-center'>Model ID</span>
                        <span className='pt-sans-bold whitespace-nowrap'>:  {info.model_id}</span>
                    </div>

                    <div className='flex items-center text-2xl w-full gap-3'>
                        <span className='bg-red-400 rounded-md p-1 text-xl w-[30%] flex items-center justify-center'>Problem type</span>
                        <span className='pt-sans-bold whitespace-nowrap'>:  {info.problem_type}</span>
                    </div>

                    <div className='flex items-center text-2xl w-full gap-3'>
                        <span className='bg-red-400 rounded-md p-1 text-xl w-[30%] flex items-center justify-center'>Best Model</span>
                        <span className='pt-sans-bold whitespace-nowrap'>:  {info.best_model}</span>
                    </div>

                    <div className='flex items-center text-2xl w-full gap-3'>
                        <span className='bg-red-400 rounded-md p-1 text-xl w-[30%] flex items-center justify-center'>Mean squared error</span>
                        <span className='pt-sans-bold whitespace-nowrap'>:  {info.Mean_squared_error}</span>
                    </div>

                    <div className='flex items-center text-2xl w-full gap-3'>
                        <span className='bg-red-400 rounded-md p-1 text-xl w-[30%] flex items-center justify-center'>Mean absolute error</span>
                        <span className='pt-sans-bold whitespace-nowrap'>:  {info.Mean_absolute_error}</span>
                    </div>

                    <div className='flex items-center text-2xl w-full gap-3'>
                        <span className='bg-red-400 rounded-md p-1 text-xl w-[30%] flex items-center justify-center'>r2_score</span>
                        <span className='pt-sans-bold whitespace-nowrap'>:  {info.r2_score}</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ResultsRegression
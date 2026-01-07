import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const SingleCardModel = ({ info }) => {


  return (
    <div className='pt-sans-regular h-[95%] w-[33%] border-2 rounded-2xl bg-black relative shrink-0 no-scrollbar overflow-hidden transition-all duration-300 hover:scale-105 ease-out hover:shadow-2xl'>
      <div className="absolute inset-y-0 left-0 h-[25%] top-5 w-full
                  bg-linear-to-r
                  from-green-800 blur-2xl to-transparent">
      </div>

      <div className='absolute z-10 text-white w-full flex flex-col gap-2 h-full'>

        <div className='flex flex-col mt-3  w-full pl-2 gap-2'>
          <div style={{ font: "Helvetica" }}>Dataset Name : {info["Dataset name"]}</div>
          <div>Target column : {info["Target column"]}</div>
          <div>Problem type : {info["Problem type"]}</div>
        </div>

        <div className='flex w-full items-center justify-center gap-6 h-[40%] px-2'>

          <div className='flex flex-col h-full no-scrollbar'>
            <span className='whitespace-nowrap'>Numerical columns</span>
            <div className='flex flex-col overflow-auto no-scrollbar py-4 mt-2'>
              {info["Numerical features"].map((item, idx) => (
                <span>{item}</span>
              ))}
            </div>

          </div>

          <div className='flex flex-col h-full overflow-auto no-scrollbar'>
            <span className='whitespace-nowrap'>Catergorical columns</span>
            <div className='flex flex-col overflow-auto no-scrollbar mt-2 py-4'>
              {info["Categorical features"].map((item, idx) => (
                <span>{item}</span>
              ))}
            </div>
          </div>

        </div>

        <div className='flex flex-col mt-4 pl-2 gap-2'>
          <span>Algorithm : {info["Algorithm"]}</span>
          <span>Model_id : {info["model_id"]}</span>
        </div>

      </div>

      <div className="absolute inset-y-0 left-50 h-[25%] top-65 w-full
                  bg-linear-to-r
                  from-green-900 blur-2xl to-transparent">
      </div>
    </div>
  )
}

export default SingleCardModel
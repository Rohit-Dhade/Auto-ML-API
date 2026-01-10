import React from 'react'
import { GrClose } from "react-icons/gr";
import { useState, useEffect } from 'react';
import { FaUsersSlash } from 'react-icons/fa6';
import axios from 'axios';

const PredictionModal = ({ onClose }) => {
    const [move, setmove] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setmove(true)
        }, 200);
    }, [])

    const [modelid, setmodelid] = useState("")
    const [predictdata, setpredictdata] = useState("")
    const [Prediction, setPrediction] = useState("")

    const GetPredictions = async()=>{
        const payload = {
            model_id:modelid,
            data:JSON.parse(predictdata)
        }
        try{
            const response = await axios.post("http://127.0.0.1:8000/predict" , payload)
            setPrediction(response.data);
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className='fixed inset-0 bg-black/10 backdrop-blur-sm w-full h-screen flex items-center justify-center z-100'>
            <div className={`relative bg-gray-200 h-[75%] w-[50%] shadow-2xl rounded-4xl py-4 transform transition-all duration-1000 ease-initial ${move ? "translate-x-0" : "-translate-x-[50%]"}`}>
                <button className='absolute right-7 top-5 flex items-center text-3xl' onClick={onClose}><GrClose size={20} /></button>
                <div style={{ fontFamily: "NeueMachina" }} className='flex items-center justify-center text-3xl'>Get Predictions</div>
                <div className='flex items-start justify-center  flex-wrap gap-8 mt-5 w-full h-[90%] overflow-auto no-scrollbar'>

                    <form className='w-[80%] h-full flex flex-col gap-5 items-center'>
                        <div className='bg-white w-full  h-[20%] flex flex-col items-center justify-center rounded-2xl'>
                            <input
                                type="text"
                                className="h-full w-full text-2xl pl-4 ring-0 focus:ring-0 border-0 focus:border-0 outline-none focus:outline-0 cursor-pointer" placeholder='Enter Model Id' onChange={(e)=>setmodelid(e.target.value)} row={8}
                            />
                        </div>
                        <input className='bg-white rounded-2xl h-full w-full text-2xl pl-4 ring-0 focus:ring-0 border-0 focus:border-0 outline-none focus:outline-0' type="textarea" placeholder='Enter the data in the form of python dictionary' onChange={(e)=>setpredictdata(e.target.value)}/>
                        <button type='button' onClick={GetPredictions} className='pt-sans-bold bg-green-500 w-[30%] h-[15%] text-2xl rounded-2xl active:scale-95 transition-all duration-300 ease-in-out tracking-wide'>Predict</button>
                        {setPrediction && (
                            <div className='pt-sans-regular text-xl flex flex-col'>
                                <span>Prediction : {Prediction["prediction"]}</span>
                                <span>Confidence Score : {Prediction["confidence score"]}</span>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PredictionModal
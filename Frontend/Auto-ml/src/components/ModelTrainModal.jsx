import { GrClose } from "react-icons/gr";
import { useState, useEffect } from 'react';
import axios from 'axios';
import ResultsCLassification from "./ResultsCLassification";
import ResultsRegression from "./ResultsRegression";

const ModelTrainModal = ({ onClose }) => {
    const [move, setmove] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setmove(true)
        }, 200);
    }, [])

    const [filenm, setfilename] = useState("");
    const [target, settarget] = useState("");
    const [prtype, setprtype] = useState("regression");
    const [trainresponse, settrainresponse] = useState(null);

    const [isRegression, setisRegression] = useState(false)
    const [isClassification, setisClassification] = useState(false)


    const trainmodel = async () => {

        const payload = {
            filename: filenm,
            target_column: target,
            problem_type: prtype
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/train', payload)
            settrainresponse(response.data)
            if(response.data["msg from model"].problem_type === "regression"){
                setisRegression(true);
            }
            else if(response.data["msg from model"].problem_type === "classification"){
                setisClassification(true)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className='fixed inset-0 bg-black/10 backdrop-blur-sm w-full h-screen flex items-center justify-center z-100'>
                <div className={`relative bg-gray-200 h-[75%] w-[50%] shadow-2xl rounded-4xl py-4 transform transition-all duration-1000 ease-initial ${move ? "translate-x-0" : "-translate-x-[50%]"}`}>
                    <button className='absolute right-7 top-5 flex items-center text-3xl' onClick={onClose}><GrClose size={20} /></button>
                    <div style={{ fontFamily: "NeueMachina" }} className='flex items-center justify-center text-3xl'>Train Ml Model</div>
                    <div className="flex items-center justify-center text-gray-500 pt-sans-regular">First upload the dataset then train</div>
                    <div className='flex items-start justify-center  flex-wrap gap-12 mt-8 w-full h-[80%] overflow-auto no-scrollbar'>

                        <form className='w-[80%] h-full flex flex-col gap-5 items-center'>
                            <div className='w-full h-[20%] flex items-center justify-center'>
                                <input className='cursor-pointer w-full h-[90%] text-center bg-white text-2xl ring-0 focus:ring-0 border-0 focus:border-0 outline-none focus:outline-0 rounded-2xl' type="text" placeholder='Enter the Filename' onChange={(e) => setfilename(e.target.value)} />
                            </div>
                            <div className='w-full h-[20%] flex items-center justify-center'>
                                <input className='cursor-pointer w-full h-[90%] text-center bg-white text-2xl ring-0 focus:ring-0 border-0 focus:border-0 outline-none focus:outline-0 rounded-2xl' type="text" placeholder='Enter target column' onChange={(e) => settarget(e.target.value)} />
                            </div>
                            <div className="flex items-center justify-center text-gray-500 pt-sans-regular">Select the problem type</div>
                            <div className='w-full h-[10%] flex items-center justify-center text-2xl bg-white rounded-2xl'>
                                <select onChange={(e) => setprtype(e.target.value)} className="w-full h-full text-center ring-0 focus:ring-0 border-0 focus:border-0 outline-none focus:outline-0" name="" id="">
                                    <option value="regression">regression</option>
                                    <option value="classification">classification</option>
                                </select>
                            </div>
                            <button type='button' onClick={trainmodel} className='pt-sans-bold bg-green-500 w-[30%] h-[15%] text-2xl rounded-2xl active:scale-95 transition-all duration-300 ease-in-out tracking-widest'>Train</button>
                            {/* {trainresponse && (
                            <div className='mt-20 text-2xl pt-sans-regular transition-all duration-500 ease-in'>{trainresponse["msg from model"].model_id}</div>
                        )} */}
                        </form>
                    </div>
                </div>
            </div>
            {isClassification && <ResultsCLassification onClose={()=>setisClassification(false)} info={trainresponse["msg from model"]}/>}
            {isRegression && <ResultsRegression onClose={()=>setisRegression(false)} info={trainresponse["msg from model"]}/>}
        </>
    )
}

export default ModelTrainModal
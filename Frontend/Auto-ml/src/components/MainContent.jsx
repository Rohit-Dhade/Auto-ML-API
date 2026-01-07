import React, { useEffect, useState } from 'react'
import SingleCardModel from './SingleCardModel'
import axios from 'axios';

const MainContent = () => {

    const [modelid, setmodelid] = useState({})
    const [meta_data, setmeta_data] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/logs"
                )
                const mdId = response.data.map(item => item.model_id)
                setmodelid(mdId);

            } catch (err) {
                console.error(err.response?.data || err.message);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        const metadata = async () => {
            if (modelid === 0) return;
            try {
                const request = modelid.map(id => axios.get(`http://127.0.0.1:8000/ShowMetaData?model_id=${id}`))
                const responses = await Promise.all(request)

                const metaD = responses.map(item => item.data)
                setmeta_data(metaD)
            }
            catch (err) {
                console.error(err.response?.data || err.message)
            }
        };

        metadata();
    }, [modelid]);

    return (
        <div className='bg-white h-full w-full rounded-l-3xl flex flex-col gap-2'>
            <div className='heading flex items-center justify-between mt-3 pr-5 h-[8%] w-full'>
                <span style={{ fontFamily: "NeueMachina", fontSize: "40px" }} className='pl-4 font-bold'>Dashboard</span>
                <span style={{ fontFamily: "NeueMachina" }} className='border-2 flex items-center justify-center text-[18px] w-[20%] rounded-2xl bg-black text-white h-[90%]'>Train. Save. Predict.</span>
            </div>
            <div style={{ font: "Helvetica", fontSize: "20px" }} className='pl-9'>Models Train so far.</div>
            <div className='h-[55%] flex items-center justify-center gap-6 overflow-y-auto overflow-x-auto  no-scrollbar flex-nowrap'>
                <div className='w-[95%] h-full flex overflow-auto gap-10 items-center no-scrollbar px-4 scroll-smooth'>
                    {meta_data.map((item, index) => (
                        <SingleCardModel info={item} key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MainContent 
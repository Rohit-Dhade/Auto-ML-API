import React, { useEffect, useState } from 'react'
import SingleCardModel from './SingleCardModel'
import api from '../api/axios'
import bgVideo from '../assets/bg.mp4'

const MainContent = () => {

    const [modelid, setmodelid] = useState({})
    const [meta_data, setmeta_data] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(
                    "/logs"
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
                const request = modelid.map(id => api.get(`/ShowMetaData?model_id=${id}`))
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
        <div className="relative h-full w-full rounded-l-3xl overflow-hidden">

            <div className="absolute inset-0 z-0">
                <video
                    src={bgVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover brightness-90 contrast-100 saturate-95"
                />
                <div className="absolute inset-0 bg-black/10" />
            </div>

            <div className="relative z-10 flex flex-col h-full">

                <div className="flex items-center justify-between px-6 pt-4 h-[10%]">
                    <span
                        style={{ fontFamily: "NeueMachina", fontSize: "40px" }}
                        className="font-bold text-white"
                    >
                        Dashboard
                    </span>

                    <span
                        style={{ fontFamily: "NeueMachina" }}
                        className="border border-white/40 px-6 py-2 rounded-2xl bg-black/60 text-white text-lg"
                    >
                        Train. Save. Predict.
                    </span>
                </div>

                <div
                    style={{ fontFamily: "Helvetica" }}
                    className="px-6 text-lg text-white/80 mb-4"
                >
                    Models trained so far
                </div>

                <div className='z-10 h-[70%] flex items-center justify-center gap-6 overflow-y-auto overflow-x-auto no-scrollbar flex-nowrap'> <div className='w-[95%] h-full flex overflow-auto gap-10 items-center no-scrollbar px-5 scroll-smooth'> {meta_data.map((item, index) => (<SingleCardModel info={item} key={index} />))} </div> </div>

            </div>
        </div>
    );
}

export default MainContent 
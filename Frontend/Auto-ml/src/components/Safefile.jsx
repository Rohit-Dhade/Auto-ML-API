import React from 'react'

const Safefile = () => {
    return (
        <div className='h-full w-[30%] border-2 rounded-2xl bg-black relative overflow-hidden transition-all duration-300 hover:scale-105 ease-out hover:shadow-2xl'>
            <div className="absolute inset-y-0 left-0 h-[25%] top-5 w-full
                  bg-linear-to-r
                  from-emerald-500 blur-2xl to-transparent">
            </div>

            <div className='absolute z-10 text-white w-full flex flex-col gap-2 h-full'>

                <div className='flex flex-col mt-3  w-full pl-2 gap-2'>
                    <div style={{ font: "Helvetica" }}>Dataset Name : item[0]</div>
                    <div>Target column : income</div>
                    <div>Problem type : regression</div>
                </div>

                <div className='flex w-full items-center justify-center gap-9 h-[47%]'>

                    <div className='flex flex-col h-full overflow-auto no-scrollbar'>
                        <span>Numerical columns</span>
                        <span>num 1</span>
                        <span>num 2</span>
                        <span>num 3</span>
                        <span>num 4</span>
                    </div>

                    <div className='flex flex-col h-full overflow-auto no-scrollbar'>
                        <span>Catergorical columns</span>
                        <span>cat 1</span>
                        <span>cat 2</span>
                        <span>cat 3</span>
                    </div>

                </div>

                <div className='flex flex-col mt-2 pl-2 gap-2'>
                    <span>Algorithm : LinearRegression</span>
                    <span>Model_id : 29834h837dby723t6gd263ggf63</span>
                </div>

            </div>
        </div>
    )
}

export default Safefile
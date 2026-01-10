import React from 'react'
import SideNavbar from './components/SideNavbar';
import MainContent from './components/MainContent';
import ListDataset from './components/ListDataset';
import ResultsCLassification from './components/ResultsCLassification';
import ResultsRegression from './components/ResultsRegression';

const App = () => {
  return (
    <div className='flex h-screen w-full bg-black'>
      <div className='left-part h-full w-[20%]'><SideNavbar/></div>
      <div className='h-full w-[80%] pl-6 bg-black flex items-center'><MainContent/></div>
    </div>

      // <ListDataset/>
      // <ResultsCLassification/>

      // <ResultsRegression/>
  )
}

export default App

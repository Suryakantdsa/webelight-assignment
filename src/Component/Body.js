import React from 'react'
import Navbar from './Navbar'
import Accordions from './Accordions'
// import GitHubRepoList from './GitHubRepoList'
import Card from './Card'
import ShimmerAccordion from './ShimmerAccordion'

const Body = () => {
  return (
    <div className='border shadow w-9/12 mx-auto'>
        <Navbar/>
        <Accordions/>
        <ShimmerAccordion/>
        {/* <GitHubRepoList/> */}
        {/* <Card/> */}
    </div>
  )
}

export default Body
import React from 'react'
import HomePage from './Homepage'
import BuyCrops from './BuyCrops'
import DemandingCrops from './DemandingCrops'
import CropInformation from './CropInformation'
import FarmerFeedback from './FarmerFeedback'
import Footer from './Footer'

const HomePageContainingAllComp = () => {
  return (
    <div>
      <HomePage />
      <BuyCrops />
        <DemandingCrops />
        <CropInformation />
        <FarmerFeedback />
    </div>
  )
}

export default HomePageContainingAllComp

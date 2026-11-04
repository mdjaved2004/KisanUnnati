import { Route, Routes } from 'react-router-dom'
import LoginForm from '../Auth/LoginForm'
import RegisterForm from '../Auth/RegisterForm'
import BuyCrops from '../components/BuyCrops'
import PredictForm from '../components/CropDisease'
import CropInformation from '../components/CropInformation'
import DemandingCrops from '../components/DemandingCrops'
import FarmerJobs from '../components/FindJob'
import Footer from '../components/Footer'
import GovernmentSchemes from '../components/GovenmentScheme'
import HomePageContainingAllComp from '../components/HomePageContainingAllComp'
import Navbar from '../components/Navbar'
import SellerPage from '../components/sellerpage'
import WeatherDashboard from '../components/WeatherPage'

const MyRoutes = () => {
  return (
    <>
    <Navbar />
    <div className='p-3'>
      
      <Routes>
                <Route path='/' element={<HomePageContainingAllComp /> }/>
                <Route path='/login' element={<LoginForm />}/>
                <Route path='/buyCrop' element={<BuyCrops />} />
                <Route path='/demCrop' element={<DemandingCrops />} />
                <Route path='/register' element={<RegisterForm />}/>
                <Route path='/wheather' element={<WeatherDashboard />}/>
                <Route path='/sellCrop' element={<SellerPage />}/>
                <Route path='/cropInfo' element={<CropInformation />}/>
                <Route path='/cropdisease' element={<PredictForm />}/>
                <Route path='/govtScheme' element={<GovernmentSchemes />}/>
                <Route path='/findJob' element={<FarmerJobs />}/>



      </Routes>
      
    </div>
    <Footer />
    </>
  )
}

export default MyRoutes

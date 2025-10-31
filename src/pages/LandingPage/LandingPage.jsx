import React from 'react'
import "./LandingPage.css"
import Header from "../../Components/Header/Header"
import SubHeaderHero from "../../Components/SubHeaderhero/SubHeaderHero"
import MidHero from '../../Components/MidHero/MidHero'
import MyHero from '../../Components/Myhero/MyHero'
import NewHero from '../../Components/Newhero/NewHero'
import MoreHero from '../../Components/Morehero/MoreHero'
import DownHero from '../../Components/DownHero/DownHero'
import Footer from '../../Components/Footer/Footer'



const LandingPage = () => {
  return (
    <main className='landing-page-container'>
          <Header />
          <SubHeaderHero />
          <MidHero />
          <MyHero />
          <NewHero />
          <MoreHero />
          <DownHero />
          <Footer/>
          {/* <Footer /> */}
</main>
  )
}

export default LandingPage


import React from 'react'
import "./LandingPage.css"
import Header from "../../Components/Header/Header"
import SubHeaderHero from "../../Components/SubHeaderhero/SubHeaderHero"
 import MyHero from "../../Components/MyHero/MyHero"
import NewHero from "../../Components/NewHero/NewHero"
import MoreHero from "../../Components/MoreHero/MoreHero"
import DownHero from "../../Components/DownHero/DownHero"
import Footer from "../../Components/Footer/Footer"
import MidHero from '../../Components/MidHero/MidHero'

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
          <Footer />
         </main>
  )
}

export default LandingPage



import Header from "../../Components/Header/Header";
import SubHeaderHero from "../../Components/SubHeaderhero/SubHeaderHero";
import MidHero from "../../Components/Midhero/MidHero";
import MyHero from "../../Components/Myhero/MyHero";
import NewHero from "../../Components/Newhero/NewHero";
import MoreHero from "../../Components/Morehero/MoreHero";
import DownHero from "../../Components/DownHero/DownHero";
import Footer from "../../Components/Footer/Footer";
import "./LandingPage.css"

const LandingPage = () => {
  return (
    <main className="landing-page-container">
      <Header />
      <section id="home">
        <SubHeaderHero />
      </section>

      <section id="features">
        <MidHero />
      </section>

      <section id="how-it-works">
        <MyHero />
      </section>

      <section id="about">
        <NewHero />
      </section>

      <MoreHero />
      <DownHero />
      <Footer />
    </main>
  );
};

export default LandingPage;
//checkinghh
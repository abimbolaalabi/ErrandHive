import "./Header.css"
import {Link, useNavigate} from "react-router-dom"

const Header = () => {
  return (
    <header className='header-container'>
      <div className='header-container-wrapper'>
        <div className="header-logo">
        <img src="https://res.cloudinary.com/dwzomhflw/image/upload/v1761056644/IMG-20251021-WA0052_lf7sms.jpg" className ="logo" alt="" />
        <span className="errand">Errandhive</span>
        </div>
        <nav className="header-navlink">
            <ul className="header-navlink-list-holder">
                <li className="header-navlink-list">Home</li>
                 <li className="header-navlink-list">About</li>
                  <li className="header-navlink-list">Features</li>
                  <li className="header-navlink-list">How it Works</li>
            </ul>
        </nav>
        <div className="header-btn-holder">
           <Link to ={"/login"}>
             <button className="sign-in-btn">Sign in</button>
             </Link>
             <Link to = {"/clientvsrunner"}>
                    <button className="get-started-btn" >Get Started</button>
             </Link>
        
        </div>
      </div>
     </header>

  )
}

export default Header
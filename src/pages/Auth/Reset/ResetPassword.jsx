import logo1 from "../../../assets/logo.svg"
import eclipseleft from "../../../assets/eclipse.svg";
import eclipseright from "../../../assets/eclipse2.svg"
import runner from "../../../assets/runner.svg"
import bicycle from "../../../assets/bicycle.svg"
import money from "../../../assets/money.svg"
import security from "../../../assets/security.svg"
import "./Resetpassword.css"

const ResetPassword = () => {
    return(
<main className="verify-section">
    <div className="logo-holder">
      <img src= {logo1}alt="logo" /><span className="errand">Errandhive</span>
    </div>
    <div className="eclipse-left">
      <img src={eclipseleft} alt="eclipse-left"  className="eclipse-left"/>
    </div>
     <div className="eclipse-right">
  <img src={eclipseright} alt="eclipse-right"  className="eclipse-right"/>
 </div>
   <div className="bicycle">
      <img src={bicycle} alt="bicycle"  className="bicycle"/>
   </div>
   <div className="runner">
 <img src={runner} alt="runner"  className="runner"/>
</div>
<div className="money">
     <img src={money} alt="runner"  className="money"/>
      </div>
      <section>
        <form className="verify-form">
           <div className="security-header">
   <div className="security-icon-box">
   <img src={security} alt="security-icon" className="img-security"/>
   </div>
     <div>
      <h1 className="reset">Reset Password</h1>
     </div>
   </div>
        </form>
      </section>
    </main>
    
   )
    }
    export default ResetPassword;
import "./VerifyEmail.css"
import logo1 from "../../../assets/logo.svg"
import eclipseleft from "../../../assets/eclipse.svg";
import eclipseright from "../../../assets/eclipse2.svg"
import runner from "../../../assets/runner.svg"
import bicycle from "../../../assets/bicycle.svg"
import money from "../../../assets/money.svg"
import security from "../../../assets/security.svg"


const VerifyEmail = () => {
  // const [code, setCode] = useState(["","","","","",""]);
  return (
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

                <h1 className="security-header-h1">Verify Your Email</h1>
                <p className="security-header-p">Please input code sent to your email</p>
              </div>
              <div className="input-code-box">
                <div className="input-code-text-holder"><p className="input-code-text-p">Input Code</p></div>
              <div className="input-field-holder">
     <input type="number"className="code-input" />
    <input type="text" maxLength="1" className="code-input" />
  <input type="text" maxLength="1" className="code-input" />
  <input type="text" maxLength="1" className="code-input" />
  <input type="text" maxLength="1" className="code-input" />
  <input type="text" maxLength="1" className="code-input" />
   </div>
                <div className="verify-btn-otp-holder">
                 <button type="submit" className="verify-otp">Verify</button>
                  </div>
                  <div className="resend-holder">
                    <p className="didnt-receive">Didn't receive the code?</p>
                    <p className="resend-timer"> Resend code (59s)</p>
                  </div>
              </div>
            
           </form>
          </section>
    </main>
  )

}

export default VerifyEmail

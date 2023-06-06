import Head from 'next/head';
import Script from 'next/script';


function BasicPlanIntempt() {

 

  return (
    <>
    <Head>
    <script src='https://app.intempt.com/ev/js/ev.min.js'></script>
<script src='https://cdn.intempt.com/intempt.min.js'></script>
    </Head>
  
    <script
  dangerouslySetInnerHTML={{
    __html: `
    window.onload = function() {
      
      console.log("Script works");
      alert("script works payment")
    
      intempt.configure(
        "intempt-demo",
        "saas-demo",
        "496395195262046208",
        '55dfdc136df54b21834a05152da3a921.1d4bdb4365a14405995874813d504c84'
      );
    
      const confirmpaymentintempt = document.querySelector("div.Layout__Wrapper-sc-vuwpgp-0.kKFSOf div.Payment__Wrapper-sc-pvmtqn-0.eatsac div.checkoutForm__Wrapper-sc-jgwy44-0.byKHoE div.ant-spin-nested-loading:nth-child(3) div.ant-spin-container div.checkoutForm__PaymentConfirm-sc-jgwy44-1.eJrHbO > button.PrimaryButton-sc-60hihd-0.gViCWm:nth-child(5)");
      confirmpaymentintempt.addEventListener("click", () => {
        var textElement = document.querySelector("div.Layout__Wrapper-sc-vuwpgp-0.kKFSOf div.Payment__Wrapper-sc-pvmtqn-0.eatsac div.checkoutForm__Wrapper-sc-jgwy44-0.byKHoE div.ant-spin-nested-loading:nth-child(3) div.ant-spin-container div.checkoutForm__PaymentConfirm-sc-jgwy44-1.eJrHbO > h3:nth-child(1)").textContent.toString();
        var basePlan;
    
        if (textElement.includes("Purchasing Standard Plan")) {
          basePlan = textElement;
        }
    
        intempt.recordEvent('basic', {
          basePlan: basePlan
        });
      });
    };
    
    `
  }}
/>
</>

)
}
  

export default  BasicPlanIntempt;



import Head from 'next/head';
import Script from 'next/script';


function OnBoardingIntempt() {

 

  return (
    <>
    <Head>
    <script src='https://app.intempt.com/ev/js/ev.min.js'></script>
<script src='https://cdn.intempt.com/intempt.min.js'></script>
      
    </Head>
  
    <Script
        dangerouslySetInnerHTML={{
          __html: `
            
            window.onload = function() {
             
              console.log("script works");
            intempt.configure(
              "intempt-demo",
      "saas-demo",
      "496395195262046208",
      '55dfdc136df54b21834a05152da3a921.1d4bdb4365a14405995874813d504c84'
            );

            const demooboard = document.querySelector(".PrimaryButton-sc-60hihd-0.gViCWm");
            demooboard.addEventListener("click", () => {
            let onboardstart = document.querySelector(".PrimaryButton-sc-60hihd-0.gViCWm").getAttribute("class").toString();
             

              intempt.recordEvent('completed_onboarding', {
                onboardstart:onboardstart
              });

          
            }, false);}
          `
        }}
       />


</>
  )}
  

export default OnBoardingIntempt;



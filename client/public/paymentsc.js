import Head from 'next/head';
import Script from 'next/script';


function PaymentIntempt() {

 

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
            console.log("script works payment");
           
            intempt.configure(
              "intempt-demo",
              "saas-demo",
              "496395195262046208",
              '55dfdc136df54b21834a05152da3a921.1d4bdb4365a14405995874813d504c84'
            );
          
            const paymentintempt = document.querySelector(".PlanSelect__PlanButton-sc-15ymsow-4.iuifAn");
            
              const regex = /\$(\d+)/;
              const text1 = "Basic Plan$99/monthFeature 1Feature 2Feature 3"
              const match = text1.match(regex);
              const price = 99
              const regex2 = /\$[0-9]+$/
              const text2 = "Premium Plan$299/monthFeature 1Feature 2Feature 3"
              const match2 = text2.match(regex2);
              const price2 = 299
              console.log("premium:", text2);
              console.log(price2,"regex2")
            paymentintempt.addEventListener("click", (event) => {
              event.preventDefault(); // Prevent the default navigation behavior
              let base = document.querySelector(".PlanSelect__PlanCard-sc-15ymsow-5.lilRaz").textContent.toString()
              let premium = document.querySelector(".PlanSelect__PlanCard-sc-15ymsow-5.RwqYc").textContent.toString()
              if (base.includes("Basic Plan$99/monthFeature 1Feature 2Feature 3")) {
                intempt.recordEvent('subscribed_to_basic_plan', {
                  subscribed: base,
                  total_amount: price
                });
              } else {   
                intempt.recordEvent('subscribed_to_premium_plan', {
                  subscribed: premium,
                  total_amount: price2
                });
              }
            }, false);
          };
          
          `
        }}
       />


</>
  )}
  

export default PaymentIntempt;



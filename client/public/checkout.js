import Head from 'next/head';
import Script from 'next/script';


function CheckoutIntempt() {

 

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
            
            
              const price = 99
              
              const price2 = 299
              const form =document.querySelector(".checkoutForm__PaymentConfirm-sc-jgwy44-1.ifrYmp")
            form.addEventListener("submit", (event) => {
              event.preventDefault(); // Prevent the default navigation behavior
              let text = document.querySelector(".checkoutForm__PaymentConfirmRow-sc-jgwy44-10.dcRyjH").textContent.toString()
              
              if (text.includes('Standard$99/month')) {
                intempt.recordEvent('subscriptionbase', {
                  subscribed: "data",
                  price: price
                });
              } else {   
                intempt.recordEvent('subscriptionpremium', {
                  subscribed: "data,
                  price: price2
                });
              }
            }, false);
          };
          
          `
        }}
       />


</>
  )}
  

export default CheckoutIntempt;



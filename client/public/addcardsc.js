import Head from 'next/head';
import Script from 'next/script';


function AddCard() {

 

  return (
    <>
    <Head>
      <script src='https://app.staging.intempt.com/ev/js/ev.min.js'></script>
      <script src='https://cdn.staging.intempt.com/intempt.min.js'></script>
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

           const cardaddintempt = document.querySelector(".__PrivateStripeElement > iframe");
           cardaddintempt.addEventListener("change", () => {
            let cardadded = document.querySelector(".__PrivateStripeElement > iframe").getAttribute("name").toString();
             

              intempt.recordEvent('addcard', {
                cardadded: cardadded,
              });

          
            }, false);}
          `
        }}
       />


</>
  )}
  

export default  AddCard;

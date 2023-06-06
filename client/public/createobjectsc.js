import Head from 'next/head';
import Script from 'next/script';


function CreateObjectIntempt() {

 

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

           const createintempt = document.querySelector(".SecondaryButton-sc-upx9un-0-ivtFPX")
           createintempt.addEventListener("submit", () => {
              let title = document.querySelector("input[name='title']").value.toString();
              let description = document.querySelector("textarea[name='description']").value.toString();
             

              intempt.recordEvent('create_task', {
  
                description:description
              });

          
            }, false);}
          `
        }}
       />


</>
  )}
  

export default CreateObjectIntempt;

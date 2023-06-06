import Head from 'next/head';
import Script from 'next/script';


function OrgCreationIntempt() {

 

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

           const createorgintempt = document.querySelector("[type='submit']");
           createorgintempt.addEventListener("click", () => {
              let name = document.querySelector("input[name='name']").value.toString();
             

              intempt.recordEvent('created_organization', {
                organization_name: name,
              });

          
            }, false);}
          `
        }}
       />


</>
  )}
  

export default OrgCreationIntempt;



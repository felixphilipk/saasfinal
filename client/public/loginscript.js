import React from 'react';
import Head from 'next/head';
import Script from 'next/script';


function LoginIntempt() {


  React.useEffect(() => {
    

      
     
      alert("script works");
    console.log("Hello");
    
    
  },[]);

  return (

    <>
    <Head>
    <script src='https://app.intempt.com/ev/js/ev.min.js'></script>
<script src='https://cdn.intempt.com/intempt.min.js'></script>
      
    </Head>
  
    <Script defer
        dangerouslySetInnerHTML={{
          __html: `
          let loginbtn =document.querySelector("[type='submit']")
          loginbtn.addEventListener("click", () => {
          `
        }}
       />


</>
  )}
  

export default LoginIntempt;



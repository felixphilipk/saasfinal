import Head from 'next/head';
import Script from 'next/script';


function MlIntempt() {

 

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

           const mlsubmitintempt = document.querySelector(".SecondaryButton-sc-upx9un-0.ivtFPX");
           mlsubmitintempt.addEventListener("click", () => {
            let bed = document.querySelector("[name='bedrooms']").value.toString()
            let bathroom = document.querySelector("[name='bathrooms']").value.toString() 
            let sq = document.querySelector("[name='sqlive']").value.toString()
            let sqlot = document.querySelector("[name='sqlot']").value.toString()
            let floors = document.querySelector("[name='floors']").value.toString()
            let water = document.querySelector("[name='water']").value.toString()
            let views = document.querySelector("[name='views']").value.toString()
            let condition = document.querySelector("[name='condition']").value.toString()
            let grade =     document.querySelector("[name='grade']").value.toString()
            let sqabove = document.querySelector("[name='sqabove']").value.toString()
            let basement = document.querySelector("[name='basement']").value.toString()
            let built =   document.querySelector("[name='built']").value.toString()
            let renovate = document.querySelector("[name='renovate']").value.toString()

              intempt.recordEvent('created_ml_task', {
                bed: bed,bathroom:bathroom,sq:sq,sqlot:sqlot,floors:floors,water:water,views:views,
                condition:condition,grade:grade,sqabove:sqabove,basement:basement,built:built,renovate:renovate
              });

          
            }, false)}
          `
        }}
       />


</>
  )}
  

export default  MlIntempt;
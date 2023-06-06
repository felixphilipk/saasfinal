import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import qs from 'qs';
import styled from 'styled-components';

import Button from '../../../components/Common/buttons/SecondaryButton';
import Card from '../../../components/Common/Card';
import FieldLabel from '../../../components/Common/forms/FieldLabel';
import TextInput from '../../../components/Common/forms/TextInput';
import Head from 'next/head'
import MlIntempt from '../../../../public/ml'

const InputWrapper = styled.div`
  padding-top: 1.5rem;
`;

const ButtonWrapper = styled.div`
  padding-top: 1.5rem;
  text-align: left;
`;

const mlServerUrl = 'https://saas-api.staging.intempt.com/machine-learning';

const MachineLearning = () => {
  useEffect(() => {
    const hasRefreshed = localStorage.getItem('hasRefreshed');
    if (!hasRefreshed) {
      localStorage.setItem('hasRefreshed', true);
      window.location.reload();
    } else {
      localStorage.removeItem('hasRefreshed'); // Remove the flag from local storage
      localStorage.removeItem('token'); // Reset the token after refreshing
    }
  }, []);

  const [prediction, setPrediction] = useState();
  const [data, setData] = useState({}); // Declare the 'data' state variable
 

  //send form data as inputs to ml algorithm
  const mlAnalysis = async (event) => {
    event.preventDefault();

    let headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    //set values for ml algorithm
    let data = qs.stringify({
      value1: event.target.bedrooms.value,
      value2: event.target.bathrooms.value,
      value3: event.target.sqlive.value,
      value4: event.target.sqlot.value,
      value5: event.target.floors.value,
      value6: event.target.water.value,
      value7: event.target.views.value,
      value8: event.target.condition.value,
      value9: event.target.grade.value,
      value10: event.target.sqabove.value,
      value11: event.target.basement.value,
      value12: event.target.built.value,
      value13: event.target.renovate.value
    });

    setData(data); // Store the form data in the 'data' state variable

    //let result = await axios.post(mlServerUrl, data, headers).catch((err) => console.log(err));

   // setPrediction(result.data.prediction[0]);
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePredict = async () => {
    setIsSubmitted(true);

    
           
  console.log("script works");
  await window.intempt.configure(
    "intempt-demo",
    "saas-demo",
    "496395195262046208",
    '55dfdc136df54b21834a05152da3a921.1d4bdb4365a14405995874813d504c84'

    );

    await window.intempt.recordEvent('created_ml_task', {
      bed: 1,bathroom:1,sq:1,sqlot: 1,floors:1,water:1,views:1,
      condition:1,grade:1,sqabove:1,basement:1,built:1,renovate:1
    });
  };

  return (
    <>
    <Head>
    <script src='https://app.intempt.com/ev/js/ev.min.js'></script>
<script src='https://cdn.intempt.com/intempt.min.js'></script>
    </Head>
   
    <Card>
      <h2>Fill out the form below to get a ML house price prediction</h2>
      <h3>Your Predicted house price is: {prediction}</h3>
      <form onSubmit={mlAnalysis}>
        <InputWrapper>
          <FieldLabel>
            Bedrooms
            <TextInput name="bedrooms" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Bathrooms
            <TextInput name="bathrooms" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Square Foot Living, number around 2000
            <TextInput name="sqlive" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Square Foot Lot, number around 15,000
            <TextInput name="sqlot" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Number of floors
            <TextInput name="floors" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Water front, 0 or 1
            <TextInput name="water" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Number of views, 0 to 4
            <TextInput name="views" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Condition, number from 1 to 5
            <TextInput name="condition" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Grade, number from 1 to 13
            <TextInput name="grade" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Square foot above, number around 1800
            <TextInput name="sqabove" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Square foot basement, number around 300
            <TextInput name="basement" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Year built, year around 1970
            <TextInput name="built" type="number" />
          </FieldLabel>
        </InputWrapper>
        <InputWrapper>
          <FieldLabel>
            Year renovated, year around 1980
            <TextInput name="renovate" type="number" />
          </FieldLabel>
        </InputWrapper>
        <ButtonWrapper>
          <Button type="submit"onClick={handlePredict}>Predict</Button>
          {isSubmitted && <p style={{ color: 'green' }}>$9090000</p>}
        </ButtonWrapper>
      </form>
    </Card>
    </>
  );
};

export default MachineLearning;

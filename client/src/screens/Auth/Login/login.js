import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Head from 'next/head'
import LoginIntempt from '../../../../public/loginscript'
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import { LoginAuth } from '../helpers';
import { colors } from '../../../styles/theme';

import SEO from '../../../components/Marketing/Layout/seo';
import ErrorText from '../../../components/Common/errorText';
import InputWrapper from '../../../components/Common/forms/TextInputWrapper';
import Button from '../../../components/Auth/Buttons/authButton';
import Label from '../../../components/Auth/authFormLabel';
import Input from '../../../components/Common/forms/TextInput';
import ContinueWith from '../../../components/Auth/continueWith';
import GoogleButton from '../../../components/Auth/Buttons/googleButton';
import LoadingOverlay from '../../../components/Common/loadingOverlay';
import LoginFormHeader from './loginFormHeader';
import AuthCard from '../../../components/Auth/authCard';
import { Partytown } from '@builder.io/partytown/react';

const ForgotPasswordWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
`;

const ForgotPassword = styled.div`
  text-decoration: underline;
  color: blue;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
`;

const RememberMeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RememberMeLabel = styled.label`
  margin-left: 0.1rem;
  font-size: 0.925rem;
  color: ${colors.coolGray900};
`;

const StyledLink = styled.a`
  color: ${colors.royalBlue};
`;

const Login = () => {
  
  const location = useRouter();



  const { firebase, LogIn } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const [invite_key, setInviteKey] = useState();
  const [isInviteFlow, setInviteFlow] = useState();
  
  /* eslint-disable */
  //extract data from query params
  useEffect(() => {
    if (!location.isReady) return;
    setInviteFlow(location.query.isInviteFlow);
    setInviteKey(location.query.verify_key);
  }, [location.isReady]);

  useEffect(() => {
    return () => fetchSuccess();
  }, []);
  const [initialRender, setInitialRender] = useState(true);
   // Refresh on page visit


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




  useEffect(() => {
    const loadIntemptScript = async () => {
      const intemptScript = document.createElement('script');
      intemptScript.src = 'https://cdn.intempt.com/intempt.min.js';
      intemptScript.async = true;
      intemptScript.onload = () => {
        window.intempt.configure(
          "intempt-demo",
          "saas-demo",
          "496395195262046208",
          '55dfdc136df54b21834a05152da3a921.1d4bdb4365a14405995874813d504c84'
        );
      };

      document.body.appendChild(intemptScript);
    };

    loadIntemptScript();
  }, []);
 

  const handleSubmit = async (values) => {
    
    fetchInit();
    let email = values.email;
    let password = values.password;

    await window.intempt.configure(
      "intempt-demo",
      "saas-demo",
      "496395195262046208",
      '55dfdc136df54b21834a05152da3a921.1d4bdb4365a14405995874813d504c84'
  
      );

      console.log(email,intempt)
      await window.intempt.recordEvent('login', {
        email:email
      });

      await window.intempt.identifyUser(email)
   
    

 
   
  

    let authRes = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        fetchFailure(error);
      });

    LoginAuth(authRes, LogIn, firebase, fetchFailure, isInviteFlow, invite_key, location);
  };

  //Google OAuth2 Signin
  const GoogleSignin = async () => {
    fetchInit();
    let provider = new firebase.auth.GoogleAuthProvider();

    let authRes = await firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        fetchFailure(error);
      });

    LoginAuth(authRes, LogIn, firebase, fetchFailure, isInviteFlow, invite_key, location);
  };

  const seoData = {
    title: 'Saas Starter Kit Pro Login Page',
    description: 'Saas Starter Kit Pro Login Page'
  };

 


 


  return (
    <React.Fragment>
         
 <Head>
 <script src='https://app.intempt.com/ev/js/ev.min.js'></script>
<script src='https://cdn.intempt.com/intempt.min.js'></script>
      </Head>
    
      <SEO seoData={seoData} />
      <div>
        {isLoading && <LoadingOverlay />}
        <LoginFormHeader />
        <AuthCard>
          <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Label htmlFor="email">Email:</Label>
                <InputWrapper>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </InputWrapper>
                {errors.email && touched.email && <ErrorText>{errors.email}</ErrorText>}
                <Label htmlFor="password">Password:</Label>
                <InputWrapper>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </InputWrapper>
                {errors.password && touched.password && <ErrorText>{errors.password}</ErrorText>}

                <Button type="submit">Signin</Button>
              </form>
            )}
          </Formik>
          <ForgotPasswordWrapper>
            <RememberMeWrapper>
              <input id="remember_me" name="remember_me" type="checkbox" />
              <RememberMeLabel htmlFor="remember_me">Remember me</RememberMeLabel>
            </RememberMeWrapper>

            <ForgotPassword>
              <Link href="/auth/passwordreset" passHref>
                <StyledLink>Forgot your password?</StyledLink>
              </Link>
            </ForgotPassword>
          </ForgotPasswordWrapper>

          <ContinueWith />
          <GoogleButton GoogleSignin={GoogleSignin} />
        </AuthCard>
      </div>
      
    </React.Fragment>

    
    
  );
};

export default Login;

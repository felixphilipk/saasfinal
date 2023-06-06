import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Spin, message } from 'antd';
import Head from 'next/head'
import AuthContext from '../../../utils/authContext';
import getOrgId from '../../../utils/orgId';
import ApiContext from '../../../utils/apiContext';
import { colors } from '../../../styles/theme';
import axios from '../../../services/axios';
import { sendEventToAnalytics } from '../../../services/analytics';
import  CreateObjectIntempt from '../../../../public/createobjectsc'
import Button from '../../../components/Common/buttons/SecondaryButton';
import Card from '../../../components/Common/Card';
import FieldLabel from '../../../components/Common/forms/FieldLabel';
import TextArea from '../../../components/Common/forms/TextArea';
import TextInput from '../../../components/Common/forms/TextInput';

const Title = styled.h1`
  font-size: 1.25rem;
`;

const InputWrapper = styled.div`
  padding: 1.5rem;
`;

const TextAreaWrapper = styled.div`
  padding: 0 1.5rem;
`;

const ButtonWrapper = styled.div`
  padding: 1.5rem;
  background-color: ${colors.white};
  text-align: left;
`;
// commented 
const CreateTask = () => {
  const org_id = getOrgId();

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

  const [formTitle, setTitle] = useState('');
  const [formDescription, setDescription] = useState('');
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const { authState } = useContext(AuthContext);
  let token = authState?.user.jwt_token;
  const headers = { Authorization: `Bearer ${token}` };

  const postTodo = async (event) => {
    event.preventDefault();
    fetchInit();

    let author = authState?.user.username;
    let title = event.target.title.value;
    let description = event.target.description.value;
    let data = { title, description, author, org_id };

    await window.intempt.configure(
      "intempt-demo",
      "saas-demo",
      "496395195262046208",
      '55dfdc136df54b21834a05152da3a921.1d4bdb4365a14405995874813d504c84'
    );
   

    await window.intempt.recordEvent('create_task', {

      description:description
    });

    console.log(description,intempt)

     
    await axios.post(`/api/post/todo`, data, { headers }).catch((err) => {
      fetchFailure(err);
    });

    sendEventToAnalytics('create_todo', { description: 'user created todo' });

    setTitle('');
    setDescription('');
    message.success('Todo Created');
    fetchSuccess();

   
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescChange = (event) => {
    setDescription(event.target.value);
  };

  return (

    <>
     <Head>
     <script src='https://app.intempt.com/ev/js/ev.min.js'></script>
    <script src='https://cdn.intempt.com/intempt.min.js'></script>
      
      </Head>
    
    
  
    <div>
      <Title>Create Todo</Title>
      <form onSubmit={postTodo}>
        <Card>
          <Spin tip="Loading..." spinning={isLoading}>
            <InputWrapper>
              <FieldLabel htmlFor="title">
                Title
                <TextInput onChange={handleTitleChange} value={formTitle} name="title" />
              </FieldLabel>
            </InputWrapper>
            <TextAreaWrapper>
              <FieldLabel htmlFor="description">
                Description
                <TextArea onChange={handleDescChange} value={formDescription} name="description" />
              </FieldLabel>
            </TextAreaWrapper>
            <ButtonWrapper>
              <Button
                textColor={colors.white}
                backgroundColor={colors.indigo600}
                hoverBackgroundColor={colors.indigo500}
                activeBackgroundColor={colors.indigo600}
              >
                Save
              </Button>
            </ButtonWrapper>
          </Spin>
        </Card>
      </form>
    </div>
    </>
  );
};

export default CreateTask;

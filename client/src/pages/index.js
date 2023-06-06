import React from 'react';
import Landing from '../screens/Marketing/Landing';
import Layout from '../components/Marketing/Layout';
import { useRouter } from 'next/router';

const Home = () => {

  
  return( <Landing />);
};

Home.Layout = Layout;

export default Home;

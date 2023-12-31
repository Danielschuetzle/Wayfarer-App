import React, { useEffect, useState } from 'react';
import GlobalStyle from '../styles/GlobalStyle';
import Head from 'next/head';

const App = ({ Component, pageProps }) => {
  const [travelPlans, setTravelPlans] = useState([]);

  useEffect(() => {
    const storedPlans = localStorage.getItem('travelPlans');
    if (storedPlans) {
      setTravelPlans(JSON.parse(storedPlans));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('travelPlans', JSON.stringify(travelPlans));
  }, [travelPlans]);

  const updatedPageProps = {
    ...pageProps,
    travelPlans,
  };

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Travel Planner</title>
      </Head>
      <Component {...updatedPageProps} />
    </>
  );
};

export default App;

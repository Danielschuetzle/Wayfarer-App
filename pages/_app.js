import React, { useEffect, useState } from 'react';
import GlobalStyle from '../styles/GlobalStyle';
import Head from 'next/head';
import exampleTravelPlans from '../data/exampleTravelPlans';

const App = ({ Component, pageProps }) => {
  const [travelPlans, setTravelPlans] = useState([]);

  useEffect(() => {
    const storedPlans = localStorage.getItem('travelPlans');
    if (storedPlans) {
      setTravelPlans(JSON.parse(storedPlans));
    } else {
      setTravelPlans(exampleTravelPlans); // Set example travel plans as initial data
    }
  }, []);

  const addTravelPlan = (plan) => {
    const newTravelPlan = {
      id: Date.now(), // Generate a unique ID for the new travel plan
      ...plan,
    };
    setTravelPlans((prevTravelPlans) => [...prevTravelPlans, newTravelPlan]);
  };

  useEffect(() => {
    localStorage.setItem('travelPlans', JSON.stringify(travelPlans));
  }, [travelPlans]);

  const updatedPageProps = {
    ...pageProps,
    travelPlans,
    addTravelPlan,
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

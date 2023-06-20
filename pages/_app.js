import { useState } from 'react';
import GlobalStyle from '../styles';
import Head from 'next/head';
import TravelPlanForm from '../components/TravelPlanForm/index.js';
import TravelPlan from '../components/TravelPlan/index.js';

export default function App({ Component, pageProps }) {
  const [travelPlans, setTravelPlans] = useState([]);

  const addTravelPlan = (plan) => {
    setTravelPlans([...travelPlans, plan]);
  };

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Wayfarer App</title>
      </Head>
      <TravelPlanForm addTravelPlan={addTravelPlan} />
      {travelPlans.map((plan, index) => (
        <TravelPlan key={index} plan={plan} />
      ))}
      <Component {...pageProps} />
    </>
  );
}

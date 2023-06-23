import React, { useState } from 'react';
import GlobalStyle from "../styles";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const [travelPlans, setTravelPlans] = useState([]);

  const addTravelPlan = (plan) => {
    setTravelPlans([...travelPlans, plan]); // Save the plan to the local state
  };

  const updatedPageProps = {
    ...pageProps,
    travelPlans,
    addTravelPlan,
  };

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project</title>
      </Head>
      <Component {...updatedPageProps} />
    </>
  );
}

import React, { useState } from 'react';
import GlobalStyle from "../styles";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const [travelPlans, setTravelPlans] = useState(pageProps.travelPlans || []);

  const addTravelPlan = (plan) => {
    setTravelPlans([...travelPlans, plan]);
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

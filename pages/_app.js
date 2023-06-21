import { useState } from "react";
import GlobalStyle from "../styles";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const [travelPlans, setTravelPlans] = useState([]);

  const addTravelPlan = (plan) => {
    setTravelPlans([...travelPlans, plan]);
  };

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Wayfarer Project</title>
      </Head>
      <Component {...pageProps} onAddTravelPlan={addTravelPlan} travelPlans={travelPlans} />
    </>
  );
}

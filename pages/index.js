import React from "react";
import TravelPlanForm from "../components/TravelPlanForm";
import TravelPlan from "../components/TravelPlan"; 

const HomePage = ({travelPlans, onAddTravelPlan}) => {
    const travelPlanItems = travelPlans.map((plan, index) => 
        <TravelPlan key={index} plan={plan} />
    );

    return (
        <>
            <TravelPlanForm addTravelPlan={onAddTravelPlan} />
            {travelPlanItems}
        </>
    )
}

export default HomePage;

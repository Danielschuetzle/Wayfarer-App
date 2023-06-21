import TravelPlanForm from "../components/TravelPlanForm";
import TravelPlan from "../components/TravelPlan"; 


const HomePage = ({travelPlans, onAddTravelPlan}) => {
    return (
    <>
        <TravelPlanForm addTravelPlan={onAddTravelPlan} />
        {travelPlans.map((plan, index) => (
            <TravelPlan key={index} plan={plan} />
        ))}
    </>
    )
}

export default HomePage;

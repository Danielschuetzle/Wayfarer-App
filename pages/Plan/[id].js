import { useRouter } from 'next/router';
import TravelPlanDetail from '../../components/TravelPlanDetail';

const PlanPage = ({ travelPlans }) => {
  const router = useRouter();
  const { id } = router.query;

  // Ensure travel plan exists
  if (!travelPlans[id]) {
    return <div>Travel plan not found.</div>
  }

  return <TravelPlanDetail plan={travelPlans[id]} />;
}

export default PlanPage;

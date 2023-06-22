import { useRouter } from 'next/router';
import TravelPlanDetail from '../../components/TravelPlanDetail';
import fetch from 'node-fetch'; // ensure to install node-fetch if not done yet

const PlanPage = ({ plan }) => {
  // Ensure travel plan exists
  if (!plan) {
    return <div>Travel plan not found.</div>
  }

  return <TravelPlanDetail plan={plan} />;
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:3000/api/plans/${id}`);
  const data = await res.json();

  return {
    props: {
      plan: data
    }
  };
}

export default PlanPage;

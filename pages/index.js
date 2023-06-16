import axios from 'axios';
import PlanList from '../components/PlanList';

const HomePage = ({ plans }) => {
    return (
        <div>
            <h1>Travel Plans</h1>
            <PlanList plans={plans} />
        </div>
    );
}

export const getServerSideProps = async () => {
    const res = await axios.get('http://localhost:3000/api/getAllPlans');
    const plans = res.data;

    return {
        props: {
            plans
        },
    }
}

export default HomePage;

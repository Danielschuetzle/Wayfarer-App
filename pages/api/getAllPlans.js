import dbConnect from '../../utils/dbConnect';
import Plan from '../../models/Plan';

const getAllPlans = async (req, res) => {
    if (req.method === 'GET') {
        await dbConnect();

        const plans = await Plan.find({});

        res.status(200).json(plans);
    } else {
        res.status(400).json({ success: false });
    }
}

export default getAllPlans;

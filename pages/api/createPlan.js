import dbConnect from '../../utils/dbConnect';
import Plan from '../../models/Plan';

// Assign the function to a variable
const createPlan = async (req, res) => {
    if (req.method === 'POST') {
        // connect to the database
        await dbConnect();

        // create a new plan using the model
        const plan = new Plan(req.body);

        // save the plan to the database
        const savedPlan = await plan.save();

        // return the saved plan
        res.status(200).json(savedPlan);
    } else {
        res.status(400).json({ success: false });
    }
}

export default createPlan;

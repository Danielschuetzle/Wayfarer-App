import { getPlans, createPlan } from '../../lib/travelPlanDb';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { id } = req.query;
      const plans = await getPlans(id);
      return res.json(plans);
    } else if (req.method === 'POST') {
      const plan = req.body;
      const savedPlan = await createPlan(plan);
      return res.status(201).json(savedPlan);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

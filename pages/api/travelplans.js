import TravelPlan from '../../models/TravelPlan';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const travelPlans = await TravelPlan.find({});
      res.status(200).json(travelPlans);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching travel plans' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

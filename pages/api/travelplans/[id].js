import TravelPlan from '../../schemas/Travelplan';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const travelPlan = await TravelPlan.findById(id);
      res.status(200).json(travelPlan);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching travel plan' });
    }
  } else if (req.method === 'PUT') {
    const { name, startDate, endDate, activities } = req.body;

    try {
      const updatedTravelPlan = await TravelPlan.findByIdAndUpdate(
        id,
        { name, startDate, endDate, activities },
        { new: true }
      );

      res.status(200).json(updatedTravelPlan);
    } catch (error) {
      res.status(400).json({ message: 'Error updating travel plan' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await TravelPlan.findByIdAndDelete(id);
      res.status(200).json({ message: 'Travel plan deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting travel plan' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

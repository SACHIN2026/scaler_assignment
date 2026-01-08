const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.userId || req.query.userId || 1;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Don't return password
    const { password, ...userProfile } = user;
    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};
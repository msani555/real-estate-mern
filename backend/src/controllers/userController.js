import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.phone = req.body.phone || user.phone;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

// GET /api/users/agents
export const getVerifiedAgents = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [agents, total] = await Promise.all([
    User.find({ role: "agent", isVerified: true })
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit)
      .select("-password"),
    User.countDocuments({ role: "agent", isVerified: true }),
  ]);

  res.json({ agents, total });
};


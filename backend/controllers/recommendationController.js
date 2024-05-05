import UserInteraction from "../models/userInteractionModel.js";

export const getRecommendations = async (req, res) => {
  try {
    const limit = 5;
    const userId = req.user._id;
    // Find recent interactions of the user
    const userInteractions = await UserInteraction.findOne({ userId })
      .sort({ timestamp: -1 })
      .limit(1); // Adjust this number based on how many recent interactions you want to consider

    if (!userInteractions) {
      console.log("Nothing found for user interactions");
      return res.json([]); // Return empty array if no user interactions found
    }

    // Extract productIds from user interactions
    const viewedProductIds = userInteractions.interactions.map(
      (interaction) => interaction._id
    );

    // Find other users who viewed the same products
    const similarUsersInteractions = await UserInteraction.find({
      "interactions._id": { $in: viewedProductIds },
      userId: { $ne: userId }, // Exclude current user
    })
      .sort({ timestamp: -1 })
      .limit(100); // Adjust this limit based on your dataset and performance requirements

    // Group interactions by user
    const groupedInteractions = similarUsersInteractions.reduce(
      (acc, interaction) => {
        interaction.interactions.forEach((int) => {
          if (!acc[interaction.userId]) {
            acc[interaction.userId] = [];
          }
          acc[interaction.userId].push(int._id);
        });
        return acc;
      },
      {}
    );

    // Find products most viewed by similar users
    const recommendations = Object.values(groupedInteractions)
      .flat()
      .reduce((acc, productId) => {
        if (!viewedProductIds.includes(productId)) {
          if (!acc[productId]) {
            acc[productId] = 0;
          }
          acc[productId]++;
        }
        return acc;
      }, {});

    // Sort recommendations by frequency
    const sortedRecommendations = Object.entries(recommendations)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([productId]) => productId);

    console.log("Sorted recommendations:", sortedRecommendations);
    return res.json(sortedRecommendations); // Return sorted recommendations as response
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

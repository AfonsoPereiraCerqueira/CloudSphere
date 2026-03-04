import Recipe from '../models/recipe.model.js';

export const createRecipe = async (req, res) => {

      const { userId, subId, recipeNumber, recipePaymentId, recipeName, recipePrice, recipeSubscriptionId, recipeStartDate, recipeExpireAt, recipeNextPayment } = req.body;

      try {

            console.log(req.body)

            if (!userId || !subId ||!recipeNumber || !recipeName || !recipePrice || !recipePaymentId || !recipeSubscriptionId || !recipeStartDate || !recipeExpireAt || !recipeNextPayment) {
                  return res.status(400).json({ success: false, message: "Please fill in all fields" });
            }

            const recipe = new Recipe({
              userId,
              subId,
              recipeNumber,
              recipeName,
              recipePrice,
              recipePaymentId,
              recipeSubscriptionId,
              recipeStartDate,
              recipeExpireAt,
              recipeNextPayment,
            });

            await recipe.save()
            
            console.log("Recipe created successfully")
            console.log(recipe)

            res.status(201).json({
                  success: true,
                  message: "Recipe created successfully",
                  recipe
            });
 
      } catch (error) {
            res.status(400).json({ success: false, message: error.message });
      }
};

export const getRecipe = async (req, res) => {
      const { subId } = req.body;

      try {
            const recipe = await Recipe.findOne({ recipeSubscriptionId: subId });

            if (!recipe) {
                  return res.status(400).json({ success: false, message: "Recipe not found" });
            }

            res.status(200).json({ success: true, recipe });
      } catch (error) {
            res.status(400).json({ success: false, message: error.message });
      }
};
import React from "react"
import IngredientsList from "./components/IngredientsList"
import ClaudeRecipe from "./components/ClaudeRecipe"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([
        "tomato", "pasta", "onion", "cheese"
    ]);

    const [recipeShown, setRecipeShown] = React.useState(false);
    const [recipe, setRecipe] = React.useState("");    // ⬅ NEW

    function toggleRecipeShown() {
    setRecipeShown(prev => {
        if (!prev) {
            fetchRecipe();
        }
        return !prev;
        });
    }


    function deleteIngredient(index) {
    setIngredients(prev => prev.filter((_, i) => i !== index));
    }


    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient");
        setIngredients(prev => [...prev, newIngredient]);
    }

    async function fetchRecipe() {
        try {
            const res = await fetch("http://localhost:3000/api/get-recipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ingredients })
            });

            const data = await res.json();
            setRecipe(data.recipe);
        } catch (error) {
            console.error("Error fetching recipe:", error);
            setRecipe("Sorry, I could not generate a recipe.");
        }
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 && (
                <IngredientsList
                    ingredients={ingredients}
                    toggleRecipeShown={toggleRecipeShown}
                    deleteIngredient={deleteIngredient}
                />
            )}


            {recipeShown && (
                <ClaudeRecipe recipe={recipe} />
            )}
        </main>
    );
}

export default function ClaudeRecipe({ recipe }) {
    if (!recipe) {
        return (
            <section>
                <h2>Chef Claude Recommends:</h2>
                <p>Generating your recipe...</p>
            </section>
        );
    }

    return (
        <section>
            <h2>Chef Claude Recommends:</h2>
            <article className="suggested-recipe-container">
                <pre style={{ whiteSpace: "pre-wrap" }}>
                    {recipe}
                </pre>
            </article>
        </section>
    );

    return (
  <section className="recipe-section">
    <h2>Chef Claude Recommends</h2>

    <article className="recipe-card">
      <pre>{recipe}</pre>
    </article>
  </section>
);

}

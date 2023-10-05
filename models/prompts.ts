export enum PROMPTS  {
    NOTES = "Create detailed notes of this transcript. Make sure to include all relevant dates, definitions, ingredients, functions, code snippets, formulas or context around bullet points. Make these notes in a logical hierarchy. Put a short paragraph summarizing the whole video at the top. The generated response should be in valid html, with h1, h2, and p tags: ",
    KEY_POINTS = "Generate a concise summary of the most important takeaways from the transcript. The generated response should be in valid html, with h1, h2, and p tags: ",
    DISCUSSION = "Generate prompts for engaging discussions or debates related to the transcript's topic. The generated response should be in valid html, with h1, h2, and p tags: ",
    Q_AND_A = "Create a list of questions based on the content of the transcript and their respective answers. The generated response should be in valid html, with h1, h2, and p tags: ",
    REAL_WORLD = "Explore how the concepts discussed in the transcript can be applied in real-life scenarios. The generated response should be in valid html, with h1, h2, and p tags: "
}
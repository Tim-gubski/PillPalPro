import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
});

export async function response(message: string) {
    const output = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are a pharmacist who gives short but concise explanations about a drug's effects, how to take the drug, and any warnings about the drug's side effects. You will respond in one to two sentences."
            }, 
            {
                role: "user",
                content: message,
            }
        ],
    })

    return output.choices[0];
}
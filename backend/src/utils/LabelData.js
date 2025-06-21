require('dotenv').config();

const LabelData = async (prompt, text) => {
  try{
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-small-3.2-24b-instruct:free",
        messages: [
          { role: "user", content: `Pick out the promted text: ${prompt}\nfrom this text: ${text}. Don't write anything unnecessary, give the output in this format (x, y, z) without the brackets` }
        ]
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }
  catch(err){
    console.log(err.message);
  }
}

module.exports = { LabelData };

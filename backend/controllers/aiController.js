const axios = require("axios");
const Employee = require("../models/Employee");

exports.getRecommendation = async (req, res) => {
  try {
    const employees = await Employee.find();

    const prompt = `
You are an HR performance analyst.

Analyze these employees:
${JSON.stringify(employees, null, 2)}

Give:
1. Promotion recommendations
2. Employee ranking
3. Training suggestions
4. Performance feedback
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      recommendation: response.data.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({
      message: "AI recommendation failed",
      error: error.message
    });
  }
};
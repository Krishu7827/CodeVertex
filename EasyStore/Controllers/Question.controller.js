
const OpenAI = require('openai')
const {GoogleGenerativeAI} = require('@google/generative-ai')
require('dotenv').config()

/** Config. */
const GenAI = new GoogleGenerativeAI(process.env.GoogleGeminiAPI)
const GenerationConfig = {temperature:0.9, topP:1,topK:1,maxOutputToken:4096}
const openai = new OpenAI({
  apiKey: `${process.env.OpenAI_Api_Key}`, // This is the default and can be omitted
});


/** Intialise Model */
const model = GenAI.getGenerativeModel({model:"gemini-pro",GenerationConfig})


const GetQuestions = async (req, res) => {


  const { role, experience } = req.body;

  /** Set the prompt based on the received job role and experience **/
  const prompt = `Act as an Interviewer, For Job role ${role} developer and who's experience is ${experience} years, ask only ten technical interview questions

  And Format(JSON) should be this:
 [
  {Question:"Question"},
  {Question:"Question"},
  {Question:"Question"}
 ]

  **Just send Questions within above format**
  `;

  try {

    const result = await model.generateContent(prompt)

    const data = await result.response.text()
    res.send((data))
    // let stringWithoutNewlines = data.replace(/\n\n/g, "");
    // res.send({ Questions: stringWithoutNewlines.split("\n") })

  } catch (err) {
 console.log(err)
    res.status(400).send({ msg: err })

  }


}



const ReviewtheQuestion = async(req,res)=>{
  console.log(req.body)
    const Prompt =  `
    Interviewer, please evaluate the responses to the questions within this array of objects:

   
    ${JSON.stringify(req.body)}
    
    Carefully consider the difficulty level of each question and assign scores on a scale of 1 to 10. Construct your response in the following JSON format:
    
  
    [
      {
        "score": 8, // Example score (replace with the actual evaluation)
        "feedback": "Demonstrates a solid grasp of core concepts, but could benefit from greater attention to detail.", // Example feedback (replace with actual feedback)
        "extra": "Consider practicing more complex problem-solving and providing more detailed explanations.", // Example suggestion (replace if applicable)
        "error": null // Only include if errors are encountered
    }
    ]
   
    Key guidelines:
    
    Concise, comprehensive feedback: Provide a single overview covering all questions, highlighting strengths, weaknesses, and areas for improvement.
    Adhere to the specified format: Maintain the exact JSON structure without any extra words or commentary.
    Address only questions with responses: If a question lacks a response, ignore it and focus on those with answers.
    Provide a score even without responses: Assign a score based on the overall quality of the responses, even if some questions are unanswered.
    Please ensure your response adheres strictly to these instructions.
      `;

      try {

        const result = await model.generateContent(Prompt)

        const data = await result.response.text()
        res.send((data))
       
      } catch (err) {
    console.log(err)
        res.status(400).send({ msg: err })
    
      }

}






module.exports = { GetQuestions,ReviewtheQuestion }
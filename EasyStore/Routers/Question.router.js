const express = require('express');
const InterviewRouter = express.Router();
const OpenAI = require('openai');
//const {authentication} = require('../Middleware/authentication')
const {GetQuestions,ReviewtheQuestion} = require('../Controllers/Question.controller')
require('dotenv').config()


/** Configuration of GPT Model */
const openai = new OpenAI({
    apiKey: process.env.OpenAI_Api_Key, // This is the default and can be omitted
});




/************* MiddleWare ***********/
//InterviewRouter.use(authentication)

/***** Question Router for Interview ***/
InterviewRouter.post("/Questions",GetQuestions)

/*** Review to the Questions Router */
InterviewRouter.post('/Review',ReviewtheQuestion)


module.exports = {InterviewRouter}


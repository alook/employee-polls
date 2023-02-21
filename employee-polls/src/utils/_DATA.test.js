import {_saveQuestion, _saveQuestionAnswer} from './_DATA.js'

describe('_DATA._saveQuestions', () => {
  it('will return saved question', async () => {
    let newQuestion = {
      optionOneText: "trink water",
      optionTwoText: "trink beer",
      author: "sarahedo"
    }
    let result = await _saveQuestion(newQuestion)
    expect(result.id).not.toBeNull()
    expect(result.time).not.toBeNull()
    expect(result.author).toEqual(newQuestion.author)
    expect(result.optionOne.votes).toHaveLength(0)
    expect(result.optionOne.text).toEqual(newQuestion.optionOneText)
    expect(result.optionTwo.votes).toHaveLength(0)
    expect(result.optionTwo.text).toEqual(newQuestion.optionTwoText)
  })

  it('will return error for invalid input', async () => {
    let invalidQuestion = {
      optionOneText: "trink water",
      optionTwoText: "trink beer",
      // author missing
    }
    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual("Please provide optionOneText, optionTwoText, and author")
  })
})

describe('_DATA._saveQuestionAnswer', () => {
  it('will return saved question answer', async () => {
    let newAnswer = {
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionTwo"
    }
    let result = await _saveQuestionAnswer(newAnswer)
    expect(result).toBeTruthy()
  })

  it('will return error for invalid input', async () => {
    let newAnswer = {
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      // missing answer
    }
    await expect(_saveQuestionAnswer(newAnswer)).rejects.toEqual("Please provide authedUser, qid, and answer")
  })
})
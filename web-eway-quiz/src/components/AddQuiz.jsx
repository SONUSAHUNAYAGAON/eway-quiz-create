import React, { useState } from "react";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddQuiz = () => {
  const navigate = useNavigate();
  // set the quiz topic name
  const [quizTopicName, setQuizTopicName] = useState("");
  // set the questions options and correct answer
  const [questions, setQuestions] = useState([
    { question: "", options: [{ answer: "", isCorrect: false }] },
  ]);

  //*******8****************************************************** */
  // hanlde quiz topic name
  const handleQuizName = (e) => {
    setQuizTopicName(e.target.value);
  };

  //******************************************************************** */
  // Handle submit By user
  const handleSubmit = async (event) => {
    event.preventDefault();
    const quizData = {
      quizTopicName,
      questions,
    };

    // post the data
    const response = await axios.post(
      "http://localhost:5000/quiz/createquiz",
      quizData
    );
    if (response.status === 200) {
      toast.success("Quiz Created successfully");
      // reset the fields
      setQuizTopicName("");
      setQuestions([
        { question: "", options: [{ answer: "", isCorrect: false }] },
      ]);
    }
  };

  // handle questions changes
  const handleQuestionChange = (event, questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].question = event.target.value;
    setQuestions(updatedQuestions);
  };
  // handle handleOptionChange changes
  const handleOptionChange = (event, questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex].answer =
      event.target.value;
    setQuestions(updatedQuestions);
  };
  // handle handleIsCorrectChange changes
  const handleIsCorrectChange = (event, questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex].isCorrect =
      event.target.checked;
    setQuestions(updatedQuestions);
  };

  // handle handleAddQuestion changes
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: [{ answer: "", isCorrect: false }] },
    ]);
  };
  // handle handleRemoveQuestion changes
  const handleRemoveQuestion = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);
    setQuestions(updatedQuestions);
  };

  // handle handleAddOption changes

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push({
      answer: "",
      isCorrect: false,
    });
    setQuestions(updatedQuestions);
  };
  // handle handleRemoveOption changes

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  return (
    <>
      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div className="sm:flex sm:justify-between sm:items-center mb-5">
            <Link to={"/"} className=" mb-4 sm:mb-1">
              <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                Add Quiz✨
              </h1>
            </Link>
          </div>

          {/* HANDLE SUBMIT QUIZ FORM  */}
          <div className="grid  bg-white h-1/2     mt-5 shadow-lg rounded-sm border border-slate-200 ">
            <form onSubmit={handleSubmit}>
              <div className="md:grid grid-cols-2 block py-6 ml-5">
                {/* quiz Topic Name */}
                <div className="d:py-0 py-2 md:block grid">
                  <span className="block text-sm font-medium mb-1">
                    {" "}
                    Topic Name <span className="text-rose-500">*</span>
                  </span>

                  <input
                    type="text"
                    className="w-4/5 py-2 rounded border border-gray-200 dark:border-gray-500 focus:outline-none focus:border-blue-500 form-input placeholder-gray-400"
                    placeholder="Enter Quiz Duration"
                    id="topic-name"
                    value={quizTopicName}
                    onChange={handleQuizName}
                    required
                  />
                </div>
              </div>
              {/* **********************  Quiz Section ********************************** */}
              {/* Quizzes question  */}
              <div className="my-2 text-white border-b-1 dark:border-gray-500 ">
                <hr className="border-gray-300 dark:border-gray-500" />
              </div>
              <div className="md:flex justify-center py-5">
                <h1 className="text-lg font-bold"> Quiz Questions ✨</h1>
              </div>
              <div className="mt-2 mb-4 text-white border-b-1 dark:border-gray-500">
                <hr className="border-gray-300 dark:border-gray-500" />
              </div>
              <div className="md:flex justify-center p-5  ">
                <div className="p-5 w-full">
                  {questions.map((question, questionIndex) => (
                    <div key={questionIndex}>
                      {/* Question */}
                      <div className="my-5">
                        <label classnName="block text-sm font-medium mb-1 dark:text-slate-100">
                          <b> Question {questionIndex + 1}:</b>{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="w-full">
                          <input
                            type="text"
                            className="w-3/4 py-2 rounded border border-gray-200 dark:border-gray-500 focus:outline-none focus:border-blue-500 form-input placeholder-gray-400"
                            placeholder="Enter Your Question Here"
                            id={`question-${questionIndex}`}
                            value={question.question}
                            onChange={(event) =>
                              handleQuestionChange(event, questionIndex)
                            }
                            required
                          />
                          <button
                            className=" font-bold py-2 px-4 rounded text-rose-500 hover:text-rose-600  mx-2"
                            type="button"
                            onClick={() => handleRemoveQuestion(questionIndex)}
                          >
                            Delete
                          </button>{" "}
                        </div>
                      </div>

                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex}>
                          <div className="my-2">
                            <label
                              className="block text-sm font-medium mb-1 dark:text-slate-100"
                              htmlFor={`option-${questionIndex}-${optionIndex}`}
                            >
                              <b> Option {optionIndex + 1}:</b>{" "}
                              <span className="text-red-500">*</span>
                            </label>

                            <input
                              type="text"
                              className="w-2/5  py-2 rounded border border-gray-200 dark:border-gray-500 focus:outline-none focus:border-blue-500 form-input placeholder-gray-400"
                              placeholder="Enter Your Option"
                              id={`option-${questionIndex}-${optionIndex}`}
                              value={option.answer}
                              onChange={(event) =>
                                handleOptionChange(
                                  event,
                                  questionIndex,
                                  optionIndex
                                )
                              }
                              required
                            />
                            <button
                              className=" text-rose-500 hover:text-rose-600 mx-2"
                              type="button"
                              onClick={() =>
                                handleRemoveOption(questionIndex, optionIndex)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-x"
                              >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                          <label
                            className=" mr-2 text-base btn bg-white dark:border-slate-500 hover:border-slate-300 text-indigo-500 hover:text-indigo-700 mx-2 dark:bg-gray-800 border-gray-200"
                            htmlFor={`isCorrect-${questionIndex}-${optionIndex}`}
                          >
                            Correct?
                          </label>
                          <input
                            type="checkbox"
                            className="mx-2  rounded-full dark:bg-gray-500"
                            id={`isCorrect-${questionIndex}-${optionIndex}`}
                            checked={option.isCorrect}
                            onChange={(event) =>
                              handleIsCorrectChange(
                                event,
                                questionIndex,
                                optionIndex
                              )
                            }
                          />{" "}
                        </div>
                      ))}
                      {/* Add Option Button */}
                      <button
                        className="mr-2 my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="button"
                        onClick={() => handleAddOption(questionIndex)}
                      >
                        Add Option
                      </button>

                      <div className="my-4 text-white border-b-1 dark:border-gray-500">
                        <hr className="border-gray-300 dark:border-gray-500" />
                      </div>
                    </div>
                  ))}
                  <br />

                  <button
                    className="mr-2 my-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={handleAddQuestion}
                  >
                    Add Question
                  </button>
                  <br />
                  <div className="my-4 text-white border-b-1 dark:border-gray-500">
                    <hr className="border-gray-300 dark:border-gray-500" />
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="my-3 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      Submit Quiz
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddQuiz;

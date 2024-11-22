import { useState, useEffect } from "react";
import axios from "axios";

export default () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0); 

  const fetchQuestions = async () => {
      const response = await axios.get("http://localhost:3000/questions");
      setQuestions(response.data);
    
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

 
  const handleOptionChange = (questionIndex, selectedOptionIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOptionIndex,
    }));
  };


  const calculateScore = () => {
    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore); 
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 max-w-screen">
      <h1 className="text-4xl font-bold">Quiz 📋</h1>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold">{question.question}</h3>
          <div className="mt-4 flex flex-col gap-2">
            {question.options.map((option, optionIndex) => (
              <label key={optionIndex}>

                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  value={optionIndex}
                  checked={answers[questionIndex] === optionIndex}
                  onChange={() => handleOptionChange(questionIndex, optionIndex)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="flex items-center justify-end">
        <button
          className="bg-black hover:bg-gray-500 transition-all duration-200 m-20 text-white py-2 px-4 rounded-lg"
          onClick={calculateScore} 
        >
          Show Score
        </button>
      </div>
      <span className="text-xl font-semibold">Your score: {score}</span> 
    </div>
  );
};
// src/App.jsx
import React, { useState } from 'react';
import { quizData } from './questions';

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerClick = (option) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(option);
    const correct = option === quizData[currentQuestion].answer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1>AWS GDA-C01 模擬試験</h1>
      <hr />
      
      {showScore ? (
        <div style={{ textAlign: 'center' }}>
          <h2>完了！</h2>
          <p style={{ fontSize: '24px' }}>スコア: {score} / {quizData.length}</p>
          <button onClick={() => window.location.reload()} style={buttonStyle}>最初から解き直す</button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '10px', color: '#666' }}>
            問題 {currentQuestion + 1} / {quizData.length}
          </div>
          <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>
            {quizData[currentQuestion].question}
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {quizData[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                style={{
                  ...optionButtonStyle,
                  backgroundColor: selectedOption === option 
                    ? (option === quizData[currentQuestion].answer ? '#d4edda' : '#f8d7da')
                    : 'white',
                  borderColor: selectedOption === option
                    ? (option === quizData[currentQuestion].answer ? '#28a745' : '#dc3545')
                    : '#ccc'
                }}
              >
                {option}
              </button>
            ))}
          </div>

          {selectedOption && (
            <div style={{ marginTop: '20px', padding: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}>
              <strong style={{ color: isCorrect ? '#28a745' : '#dc3545' }}>
                {isCorrect ? '✅ 正解！' : `❌ 不正解（正解: ${quizData[currentQuestion].answer}）`}
              </strong>
              <p style={{ fontSize: '14px', marginTop: '10px', lineHeight: '1.6' }}>
                <strong>解説:</strong> {quizData[currentQuestion].explanation}
              </p>
              <button onClick={handleNextQuestion} style={buttonStyle}>次へ進む</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const optionButtonStyle = {
  padding: '12px',
  textAlign: 'left',
  border: '2px solid',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: '0.2s',
  fontSize: '16px'
};

const buttonStyle = {
  marginTop: '15px',
  padding: '10px 20px',
  backgroundColor: '#232f3e', // AWS Deep Blue
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold'
};
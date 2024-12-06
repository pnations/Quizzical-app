import React from 'react';

const QuizScreen = ({
    questions,
    selectedAnswers,
    answersChecked,
    setSelectedAnswers,
    checkAnswers,
    playAgain,
    score,
    loading,
}) => {
    const handleAnswerClick = (questionIndex, answer) => {
        if (!answersChecked) {
            setSelectedAnswers({ [questionIndex]: answer });
        }
    };

    // Check if all questions have been answered
    const allQuestionsAnswered =
        Object.keys(selectedAnswers).length === questions.length;

    return (
        <div className="quiz-screen">
            {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="question">
                    <h3 dangerouslySetInnerHTML={{ __html: question.question }}></h3>
                    <div id="answer-container">
                        {question.allAnswers.map((answer, answerIndex) => {
                            const isSelected =
                                selectedAnswers[questionIndex] === answer;
                            const isCorrect =
                                answer === question.correct_answer;
                            const isChecked = answersChecked;

                            // Determine button class
                            let buttonClass = 'answer-button';
                            if (isChecked) {
                                if (isCorrect) {
                                    buttonClass += ' correct';
                                } else if (isSelected) {
                                    buttonClass += ' incorrect';
                                }
                            } else if (isSelected) {
                                buttonClass += ' selected';
                            }

                            return (
                                <button
                                    key={answerIndex}
                                    className={buttonClass}
                                    disabled={answersChecked}
                                    onClick={() =>
                                        handleAnswerClick(questionIndex, answer)
                                    }
                                    dangerouslySetInnerHTML={{ __html: answer }}
                                ></button>
                            );
                        })}
                    </div>
                </div>
            ))}

            {answersChecked ? (
                <div className="score-display">
                    <h2>
                        You scored {score}/{questions.length} correct answers!
                    </h2>
                    <button className="restart-btn" onClick={playAgain}>
                        Play Again
                    </button>
                </div>
            ) : (
                // Hide the button when loading
                !loading && (
                    <button
                        className="button"
                        onClick={checkAnswers}
                        disabled={!allQuestionsAnswered}
                    >
                        Check Answers
                    </button>
                )
            )}
        </div>
    );
};

export default QuizScreen;

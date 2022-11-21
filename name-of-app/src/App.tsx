import { useEffect, useState } from "react";
import "./App.css";

enum Result {
  Correct,
  Wrong,
}

function App() {
  const [color, setColour] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<boolean | undefined>(undefined);

  const generateColour = () => {
    const actualColor = getRandomColor();
    setColour(actualColor);
    setAnswers(
      [actualColor, getRandomColor(), getRandomColor()].sort(
        () => 0.5 - Math.random()
      )
    );
  };

  const getRandomColor = () => {
    // get random hex value
    const hex = Math.floor(Math.random() * 16777215).toString(16);
    // pad with zeros and return
    return "#" + ("000000" + hex).slice(-6);
  };

  useEffect(() => {
    generateColour();
  }, []);

  const handleAnswersClick = (answer: string) => {
    if (answer === color) {
      setResult(true);
      generateColour();
    } else {
      setResult(false);
    }
  };

  return (
    <div className="App">
      <div className="col">
        <div className="colour-box" style={{ background: color }}></div>

        {answers.map((answer) => (
          <button onClick={() => handleAnswersClick(answer)} key={answer}>
            {answer}
          </button>
        ))}
        {result === true && (
          <div className="correct-answer"> Correct answer! </div>
        )}
        {result === false && (
          <div className="wrong-answer"> Wrong answer! </div>
        )}
      </div>
    </div>
  );
}

export default App;

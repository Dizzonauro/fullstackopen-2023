import { useState } from 'react';

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>Give feedback</h2>
      <Button
        text="good"
        onClick={() => setGood((prevState) => prevState + 1)}
      />
      <Button
        text="neutral"
        onClick={() => setNeutral((prevState) => prevState + 1)}
      />
      <Button text="bad" onClick={() => setBad((prevState) => prevState + 1)} />
      <h2>Statistics</h2>
      <p>Good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
};

export default App;

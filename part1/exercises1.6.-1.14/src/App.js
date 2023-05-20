import { useState } from 'react';

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistics = ({
  setAll,
  setGood,
  setBad,
  setNeutral,
  good,
  neutral,
  bad,
  all,
}) => {
  const positive = (good / all) * 100;

  const average = (good + bad * -1) / all;
  return (
    <div>
      <h2>Give feedback</h2>
      <Button
        text="good"
        onClick={() => {
          setGood((prevState) => prevState + 1);
          setAll((prevState) => prevState + 1);
        }}
      />
      <Button
        text="neutral"
        onClick={() => {
          setNeutral((prevState) => prevState + 1);
          setAll((prevState) => prevState + 1);
        }}
      />
      <Button
        text="bad"
        onClick={() => {
          setBad((prevState) => prevState + 1);
          setAll((prevState) => prevState + 1);
        }}
      />
      <h2>Statistics</h2>
      <StatisticsLine text="Good" value={good} />
      <StatisticsLine text="Neutral" value={neutral} />
      <StatisticsLine text="Bad" value={bad} />
      <StatisticsLine text="All" value={all} />
      <StatisticsLine text="Average" value={average} />
      <StatisticsLine text="Positive" value={positive + '%'} />
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [displayOn, setDisplayOn] = useState(false);

  return (
    <>
      {displayOn ? (
        <Statistics
          good={good}
          setGood={setGood}
          neutral={neutral}
          setNeutral={setNeutral}
          bad={bad}
          setBad={setBad}
          all={all}
          setAll={setAll}
        />
      ) : (
        <div>
          <h2>Give feedback</h2>
          <Button
            text="good"
            onClick={() => {
              setGood((prevState) => prevState + 1);
              setAll((prevState) => prevState + 1);
              setDisplayOn(true);
            }}
          />
          <Button
            text="neutral"
            onClick={() => {
              setNeutral((prevState) => prevState + 1);
              setAll((prevState) => prevState + 1);
              setDisplayOn(true);
            }}
          />
          <Button
            text="bad"
            onClick={() => {
              setBad((prevState) => prevState + 1);
              setAll((prevState) => prevState + 1);
              setDisplayOn(true);
            }}
          />
          <h2>Statistics</h2>
          <p>No feedback given</p>
        </div>
      )}
    </>
  );
};

export default App;

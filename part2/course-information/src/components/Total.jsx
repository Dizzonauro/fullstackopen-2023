export const Total = ({ parts }) => (
  <h4>total of exercises {parts.reduce((s, p) => s + p.exercises, 0)}</h4>
);

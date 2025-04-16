import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function ChartsContainer({ data }) {
  return (
    <section>
      <h1>Job Stats</h1>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Bar dataKey='count' fill='#2563eb' />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default ChartsContainer;

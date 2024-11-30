import React from 'react';
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';

function BarChartDashboard({ budgetList }) {
  return (
    <div className="border rounded-lg p-5 flex justify-center items-center">
      <h2 className="font-bold text-lg text-center text-blue-400 mb-4">Activity</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={budgetList}
          margin={{
            top: 7,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Make sure to use the correct key for totalSpend */}
          <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" /> {/* Violet */}
          <Bar dataKey="amount" stackId="a" fill="#C3C2FF" /> {/* Darker Violet */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;
  
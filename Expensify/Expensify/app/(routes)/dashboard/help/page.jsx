import React from 'react'

function Help() {
  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-black via-gray-900 to-[#0b234a] text-white">
      <h1 className="font-bold text-3xl text-center text-blue-400 mb-6">Help and Support</h1>
      
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-4">How to Use This App</h2>
        <p className="text-gray-300">
          Welcome to our expense tracking application! Here are some tips to get started:
        </p>
        <ul className="list-disc ml-6 text-gray-300">
          <li>Set up your budget to start tracking your expenses.</li>
          <li>Log each expense as it occurs to get real-time tracking.</li>
          <li>View your expenses in a dashboard for easy visualization.</li>
          <li>Review the "Latest Expenses" section to keep track of recent purchases.</li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-4">FAQs</h2>
        <div className="text-gray-300">
          <p><strong>Q: How do I add a new expense?</strong></p>
          <p>A: To add a new expense, navigate to the "Expenses" tab, click on "Add New Expense", and enter the necessary details.</p>

          <p><strong>Q: Can I set multiple budgets?</strong></p>
          <p>A: Yes! You can create as many budgets as you need to manage different categories of expenses.</p>

          <p><strong>Q: How do I track my spending in real time?</strong></p>
          <p>A: Simply log each expense as it happens. The app will automatically update your total spend and budget progress.</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
        <p className="text-gray-300">If you need further assistance, feel free to reach out to us:</p>
        <ul className="list-none ml-6 text-gray-300">
          <li>Email: <a href="mailto:202201421@daiict.ac.in" className="text-blue-400">support@expensetracker.com</a></li>
        </ul>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Report an Issue</h2>
        <p className="text-gray-300">
          If you're experiencing any issues with the application, please let us know by sending a detailed message via email or chat.
        </p>
      </div>
    </div>
  )
}

export default Help

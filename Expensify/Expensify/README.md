<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Expense Tracker Next.js Application">
  <title>Expense Tracker - Next.js Application</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css">
</head>
<body class="bg-gray-100 font-sans">
  <div class="container mx-auto p-8">
    <header>
      <h1 class="text-4xl font-bold text-center text-indigo-600">Expense Tracker - Next.js Application</h1>
      <p class="text-xl text-center text-gray-600 mt-2">A full-fledged Expense Tracker web application built with Next.js</p>
    </header>
    <section class="mt-8">
      <h2 class="text-3xl font-semibold text-indigo-500">Features</h2>
      <ul class="mt-4 space-y-2 text-lg text-gray-700">
        <li>User Authentication: Secure login and registration with Clerk for user management.</li>
        <li>Expense Tracking: Track expenses by associating them with specific budgets, categories, and dates.</li>
        <li>Budget Management: Set and manage budgets, view total expenditure, and track remaining balance.</li>
        <li>Visual Reports: Dynamic bar charts and tables to represent financial data.</li>
        <li>Responsive Design: Fully responsive user interface for a seamless experience across devices.</li>
        <li>Custom Fonts and UI Components: Tailored design using Next.js `local/font` optimization and Radix UI components.</li>
      </ul>
    </section>

    <section class="mt-8">
      <h2 class="text-3xl font-semibold text-indigo-500">Getting Started</h2>
      <p class="mt-4 text-lg text-gray-700">To get this project up and running locally, follow these steps:</p>
      
      <h3 class="text-xl font-semibold mt-4">1. Clone the repository</h3>
      <pre class="bg-gray-200 p-4 rounded-lg">
        <code class="text-gray-800">git clone https://github.com/yourusername/expense-tracker.git</code>
      </pre>

      <h3 class="text-xl font-semibold mt-4">2. Install dependencies</h3>
      <p class="text-lg text-gray-700">Navigate into the project directory and install dependencies using your preferred package manager:</p>
      <pre class="bg-gray-200 p-4 rounded-lg">
        <code class="text-gray-800">npm install</code>
        <code class="text-gray-800"># or</code>
        <code class="text-gray-800">yarn install</code>
      </pre>

      <h3 class="text-xl font-semibold mt-4">3. Set up environment variables</h3>
      <p class="text-lg text-gray-700">Create a `.env` file in the root of the project with the following variables:</p>
      <pre class="bg-gray-200 p-4 rounded-lg">
        <code class="text-gray-800">NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api></code>
        <code class="text-gray-800">CLERK_API_KEY=<your-clerk-api-key></code>
        <code class="text-gray-800">DATABASE_URL=postgresql://neondb_owner:mLd0ROVfSh3B@ep-patient-mode-a5gw41hr.us-east-2.aws.neon.tech/Expenses-Tracker?sslmode=require</code>
      </pre>

      <h3 class="text-xl font-semibold mt-4">4. Run the development server</h3>
      <pre class="bg-gray-200 p-4 rounded-lg">
        <code class="text-gray-800">npm run dev</code>
      </pre>

      <h3 class="text-xl font-semibold mt-4">5. Open the application</h3>
      <p class="text-lg text-gray-700">Navigate to <a href="http://localhost:3000" class="text-indigo-600">http://localhost:3000</a> to see the application in action.</p>

      <h3 class="text-xl font-semibold mt-4">6. Start Editing</h3>
      <p class="text-lg text-gray-700">You can begin editing the page by modifying the <code>app/page.js</code> file. Changes will auto-update.</p>
    </section>

    <section class="mt-8">
      <h2 class="text-3xl font-semibold text-indigo-500">Key Technologies Used</h2>
      <ul class="mt-4 space-y-2 text-lg text-gray-700">
        <li><strong>Next.js</strong>: A React framework used for building the app with server-side rendering and static site generation.</li>
        <li><strong>Tailwind CSS</strong>: Utility-first CSS framework for rapid UI development.</li>
        <li><strong>Clerk</strong>: Authentication and user management platform used for secure sign-ups and log-ins.</li>
        <li><strong>Drizzle ORM</strong>: A database toolkit for building queries and managing PostgreSQL data.</li>
        <li><strong>PostgreSQL</strong>: The database used to store user data, expenses, and budgets.</li>
      </ul>
    </section>

    <section class="mt-8">
      <h2 class="text-3xl font-semibold text-indigo-500">Deployment</h2>
      <h3 class="text-xl font-semibold mt-4">Vercel</h3>
      <p class="text-lg text-gray-700">To deploy the application on Vercel, follow these steps:</p>
      <ol class="list-decimal pl-8 text-lg text-gray-700">
        <li>Go to <a href="https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme" class="text-indigo-600">Vercel's New Project</a> page.</li>
        <li>Import your GitHub repository.</li>
        <li>Deploy your app.</li>
      </ol>
      <p class="text-lg text-gray-700">For more details, check out the <a href="https://nextjs.org/docs/deployment" class="text-indigo-600">Next.js Deployment Documentation</a>.</p>
    </section>

    <section class="mt-8">
      <h2 class="text-3xl font-semibold text-indigo-500">Contributing</h2>
      <p class="mt-4 text-lg text-gray-700">We welcome contributions! Here are some ways you can help:</p>
      <ul class="mt-4 space-y-2 text-lg text-gray-700">
        <li>Add new features like recurring expenses or financial goals.</li>
        <li>Improve the UI/UX design.</li>
        <li>Write more tests to cover edge cases.</li>
      </ul>
    </section>

    <section class="mt-8">
      <h2 class="text-3xl font-semibold text-indigo-500">License</h2>
      <p class="mt-4 text-lg text-gray-700">This project is licensed under the MIT License. See the <a href="/LICENSE" class="text-indigo-600">LICENSE</a> file for details.</p>
    </section>

    <section class="mt-8">
      <h2 class="text-3xl font-semibold text-indigo-500">Acknowledgments</h2>
      <ul class="mt-4 space-y-2 text-lg text-gray-700">
        <li><a href="https://nextjs.org/" class="text-indigo-600">Next.js</a> for the powerful framework.</li>
        <li><a href="https://clerk.dev/" class="text-indigo-600">Clerk</a> for secure authentication services.</li>
        <li><a href="https://tailwindcss.com/" class="text-indigo-600">Tailwind CSS</a> for making design easier.</li>
        <li><a href="https://drizzle.team/" class="text-indigo-600">Drizzle ORM</a> for simplifying PostgreSQL interaction.</li>
      </ul>
    </section>
  </div>
</body>
</html>

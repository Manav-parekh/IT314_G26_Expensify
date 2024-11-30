# Expensify - Expense and Budget Management System  

Expensify is a user-friendly and efficient web application designed to help individuals manage their expenses and budgets effectively. It allows users to track their daily expenditures, categorize expenses, set budgets, and visualize spending patterns.  

## Features  
- **Expense Tracking**: Add, edit, and delete expenses with detailed descriptions and categories.  
- **Budget Management**: Set budgets for different categories and monitor spending limits.  
- **Data Visualization**: Interactive charts and graphs to analyze spending trends over time.  
- **Secure Storage**: Data is securely stored and managed using PostgreSQL databases.  

## Installation  

### Prerequisites  
- Node.js (v16+ recommended)  
- PostgreSQL  
- Git  

### Setup  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/KkavyDave/IT314_G26_Expensify.git 
   ```  

2. Install dependencies:  
   ```bash  
   npm install  
   ```  

3. Configure the database:  
   - Update the database connection string in `.env` with:  
     ```  
     DATABASE_URL=postgresql://neondb_owner:mLd0ROVfSh3B@ep-patient-mode-a5gw41hr.us-east-2.aws.neon.tech/Expenses-Tracker?sslmode=require  
     ```  

4. Run database migrations:  
   ```bash  
   npm run migrate  
   ```  

5. Start the server:  
   ```bash  
   npm start  
   ```  

6. Open the application in your browser at `http://localhost:3000`.  

## Technologies Used  
- **Frontend**: React.js, TailwindCSS  
- **Backend**: Node.js, Express.js  
- **Database**: PostgreSQL with NeonDB integration  
- **Visualization**: Chart.js  

## Contribution Guidelines  
We welcome contributions to enhance Expensify!  
- Fork the repository and create a feature branch.  
- Commit your changes and open a pull request.  
- Ensure the code is clean, well-documented, and tested.  


## Contact  
For any queries or feedback, feel free to reach out:  
- Maintainer: IT314 G26  
- Email: Any member of G26 on their DA-IICT ID's  
- Repository: [Expensify GitHub Repository](https://github.com/KkavyDave/IT314_G26_Expensify.git)

---  
 main
 main

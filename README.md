
# Employee Management Dashboard

## Project Overview
This is an Employee Management Dashboard built with React.js and Next.js. The application allows users to log in and manage employee information. We can view the list of employees, add new employees, edit existing employee details, delete employees, and print the employee list. The dashboard also supports searching and filtering employees by name, gender, and status.

## Tech Stack
- **Frontend:** React.js, Next.js  
- **Styling:** Tailwind CSS 
- **State Management:**  Zustand 
- **Data Storage / Nextjs API:** Mock API using data.json
- **Routing & Authentication:** Next.js routing with mock authentication  

## Steps to Run the Project Locally
1. Clone the repository:
```bash
git clone https://github.com/srisruthipopuri25/Employeemanagementdashboard.git
cd Employeemanagementdashboard
````

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to:

```
http://localhost:3000
```

5. Use the mock login to access the dashboard.
Demo credentials: admin / 1234

## Assumptions / Design Decisions

* Authentication is mock and does not use a backend service.
* Employee data is stored in data.json and zustand store.
* The same form is reused for both adding and editing employees.
* Predefined values are used for gender and state selection.
Profile images can be previewed before being saved.
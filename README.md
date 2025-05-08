
Employee Class Tracker
This is a web-based scheduling app built for gym instructors to manage their class responsibilities. Instructors can register, log in, view and edit their profiles, and manage their class schedules. The app provides a visual weekly layout of classes by day, a directory of all employees, and access to uploaded curriculum materials. It helps organize operations for martial arts gyms, fitness studios, or any class-based training business.

TECH STACK: 
- React (Vite) 
- React Router
- Bootstrap 
- JSON Server
-JavaScript

Follow the steps below to run the Employee Class Tracker on your local machine.
1. Clone the Repository
   git clone git@github.com:adeluca43/Class-Build-Weekly.git
   cd capstone-march
2. Install Project Dependencies
   npm install
3. Start the JSON Server
   json-server --watch database.json --port 8088
   This will start the mock backend API at:
   http://localhost:8088
   If you haven't installed JSON Server yet, install it globally with:
   npm install -g json-server
4. Start the React App
   npm run dev
   This will launch the frontend in your browser at:
   http://localhost:5173
Note: Keep both the JSON Server and the React app running in separate terminal windows for the app to function properly.

You can log in using any of the preloaded sample users listed below, or create a new profile by registering through the app.

Sample Users: 
Email,	Password
nicole@gmail.com	pass1
Tina@gmail.com	pass2
Will@gmail.com	pass3
Johnny@gmail.com	pass4

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration
If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

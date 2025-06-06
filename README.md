# SkillNavigator

SkillNavigator is a web application that connects users with job opportunities based on their skill sets. It provides an interactive platform where users can explore companies working with their preferred technologies and apply directly through company career pages. Recruiters can also register, post jobs, and manage them using a simple, intuitive interface.

---

## 🚀 Features

* 🔐 **Authentication**: Secure login and registration for both users and recruiters using Supabase Auth.
* 👨‍💻 **User Portal**:

  * Enter and manage your skillset.
  * View jobs and companies that match your tech stack.
  * Apply via the company’s official career page.
* 🧑‍💼 **Recruiter Portal**:

  * Login securely.
  * Post, update, and delete job listings (CRUD functionality).
  * View list of applicants or job interests (future enhancement).
* 🎨 **Clean & Responsive UI**: Built with React and TailwindCSS (or preferred UI framework) for modern, mobile-first design.
* 🧠 **Interactive Experience**: Smooth transitions, animations, and intuitive navigation to enhance user engagement.

---

## 🛠 Tech Stack

| Area       | Technology                                 |
| ---------- | ------------------------------------------ |
| Frontend   | React (with TypeScript)                    |
| Backend    | Supabase (DB + Auth + API)                 |
| Styling    | TailwindCSS or other modern CSS frameworks |
| Deployment | (e.g., Vercel, Netlify - optional mention) |

---

## 📦 Getting Started

### Prerequisites

* Node.js (v16 or above)
* npm or Yarn
* Supabase account & project setup

### Installation

Clone the repository:

```bash
git clone https://github.com/thvvamshi/skillNavigator.git

```

Install dependencies:

```bash
npm install
# or
yarn install
```

### Supabase Setup

1. Create a new project on [Supabase](https://supabase.com/).
2. Enable authentication (Email/Password).
3. Set up the necessary tables for users, recruiters, and jobs.
4. Copy your project's API URL and Anon Key.
5. Create a `.env` file in the root directory and add:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

---

## 🧪 Running the Project

Start the development server locally:

```bash
npm run dev
# or
yarn dev
```

The app should now be running at:
[http://localhost:8080](http://localhost:8080)

---

## 🛠 Available Scripts

* `npm run dev` – Start development server
* `npm run build` – Build the project for production
* `npm run preview` – Preview the production build

---

## 📁 Project Structure

```
skillnavigator/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   └── main.tsx
├── .env
├── index.html
├── package.json
└── README.md
```

---

## 🛡️ License

This project is licensed under the MIT License.

---

## 💡 Move Yourself

> “Move Yourself” isn’t just a phrase—it’s our call to action. Whether you're searching for the next career move or recruiting top talent, SkillNavigator empowers you to **take the next step forward** in your professional journey.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository, open issues, or submit pull requests.



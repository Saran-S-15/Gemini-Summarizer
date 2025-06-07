# 🧠 Gemini Summarizer API Backend

A modern and secure Node.js + Express backend that integrates Google’s **Gemini AI** to generate intelligent summaries. This API allows users to **sign up, log in**, and securely **generate, retrieve, or delete summaries** using JWT-based authentication.

---

## 🚀 Features

- ✨ **AI Summarization** using Gemini (`@google/genai`)
- 🔐 **JWT-based Authentication**
- 🧾 **User Signup/Login/Logout**
- 📚 **CRUD Operations** for Summaries
- 🧠 **Multiple Summary Types** supported
- 📦 **MongoDB** for persistent storage
- 🧰 Built with **Express**, **Mongoose**, **JWT**, and more

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JWT, bcryptjs, cookie-parser  
- **AI Integration:** Gemini via `@google/genai`  
- **Security:** helmet, cors  
- **Environment Config:** dotenv  

---

## 📬 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint      | Description            |
|--------|---------------|------------------------|
| POST   | `/signup`     | Register a new user    |
| POST   | `/login`      | Authenticate user      |
| POST   | `/logout`     | Log out user           |
| GET    | `/check-auth` | Check auth status      |

### 📄 Summary Routes (Protected)

| Method | Endpoint   | Description                  |
|--------|------------|------------------------------|
| POST   | `/`        | Create a new summary         |
| GET    | `/`        | Get all summaries            |
| GET    | `/:id`     | Get a specific summary       |
| DELETE | `/:id`     | Delete a specific summary    |

---

## 🚀 Future Enhancements

Below are the planned features and improvements to enhance functionality, performance, and user experience:

- 🕘 **Summary History Storage**
  - Track and store all past summaries for each user.
  - Allow users to revisit, re-run, or duplicate past summaries.

- 🧾 **Export Summary to PDF/Other Formats**
  - Provide the option to download generated summaries as:
    - 📄 PDF
    - 📃 DOCX
    - 📑 Plain Text
  - Use libraries like `pdfkit` or `html-pdf` for clean export formatting.

- 🔁 **Update Existing Summaries**
  - Add `PUT /:id` endpoint to enable editing titles, content, or re-summarization.

- 🌐 **Frontend Integration**
  - Build a modern and responsive frontend using **React.js** or **Next.js**.

- 🏷️ **Categories, Tags & Folders**
  - Organize summaries using tags or folders for better management.

- 🔍 **Search & Filter**
  - Search summaries by title, keyword, or summary type.
  - Filter by date range, format, or category.

- 📊 **User Dashboard & Analytics**
  - Show number of summaries created, types used, and recent activity per user.

- 🧠 **Multi-language Summarization**
  - Summarize content in various languages using Gemini's language support.

- 🔐 **Social Authentication (OAuth)**
  - Enable sign-in via Google, GitHub, etc., using Passport.js or Firebase Auth.

- 📥 **File Upload Support**
  - Let users upload files (PDF, DOCX, TXT) for automatic content extraction and summarization.

- 🧪 **Testing & Coverage**
  - Add unit tests (Jest) and integration tests (Supertest) to ensure stability.

- 🚀 **CI/CD Deployment**
  - Use GitHub Actions for automatic testing and deployment pipelines.

- 📚 **Interactive API Documentation**
  - Integrate Swagger or Postman Collection for live API testing.

---

## 🔧 Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/gemini-summarizer-backend.git
cd gemini-summarizer-backend


⸻

2️⃣ Install dependencies

npm install


⸻

3️⃣ Add environment variables

Create a .env file in the root directory and add the following:

1. PORT=5000
2. MONGODB_URI=your_mongodb_connection_string
3. JWT_SECRET=your_jwt_secret
4. GOOGLE_API_KEY=your_gemini_api_key

⸻

4️⃣ Start the server

For development with hot-reloading:

npm run dev

Or to run normally:

npm start


📜 License

This project is licensed under the MIT License.

⸻

👨‍💻 Author

Made with ❤️ by Saran S

⸻

---

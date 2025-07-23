<h1 align="center">CVAI: AI-Powered Resume Analyzer</h1>

<p align="center">
  <b>Smart feedback for your dream job, powered by AI and React Router.</b><br>
  <a href="https://reactrouter.com/">React Router</a> • <a href="https://tailwindcss.com/">Tailwind CSS</a> • <a href="https://www.npmjs.com/package/zustand">Zustand</a> • <a href="https://pdfjs.express/">PDF.js</a>
</p>

<p align="center">
  <img src="public/images/resume-scan.gif" alt="CVAI Banner" width="80%" height="50%"/>
</p>

---

## 🚀 Overview

CVAI is a modern, full-stack web application that leverages AI to analyze resumes and provide actionable feedback for job seekers. Built with React Router, Tailwind CSS, and Puter.js APIs, it offers a seamless experience for uploading, analyzing, and tracking resume submissions.

---

## ✨ Features

- **AI-Powered Resume Feedback:** Get detailed, structured feedback and ATS (Applicant Tracking System) scores.
- **PDF to Image Conversion:** Visualize your resume with high-quality previews.
- **Job Application Tracking:** Store and review all your submissions and feedback.
- **Authentication:** Secure login/logout with Puter.js.
- **Account Management:** View user info and wipe all app data/files.
- **Modern UI:** Responsive, accessible, and styled with Tailwind CSS.
- **Docker Support:** Easy deployment with a multi-stage Dockerfile.
- **TypeScript:** End-to-end type safety.

---

## 🏗️ Project Structure

```
CVAI/
├── app/
│   ├── components/        # Reusable UI components (Navbar, ResumeCard, FileUploader, ScoreBadge, ATS, Details, etc.)
│   ├── lib/               # Utility libraries (Puter.js integration, PDF conversion, etc.)
│   ├── routes/            # Route components (home, upload, auth, resume, wipe)
│   ├── types/             # TypeScript type definitions
│   ├── app.css            # Tailwind and custom styles
│   └── root.tsx           # Root layout and error boundary
├── constants/             # Static data and AI prompt templates
├── public/                # Static assets (images, icons, pdf.worker)
├── build/                 # Production build output (ignored in VCS)
├── package.json           # Project metadata and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite bundler configuration
├── Dockerfile             # Multi-stage Docker build
├── .dockerignore          # Docker build exclusions
├── .gitignore             # Git exclusions
└── README.md              # This documentation
```

---

## 🗺️ Routes

- `/` (Home): Dashboard for resume tracking and feedback.
- `/upload`: Upload your resume (PDF), enter job details, and get AI analysis.
- `/resume/:id`: View detailed feedback and ATS score for a specific resume.
- `/auth`: Authentication page (login/logout).
- `/wipe`: My Account page. View user info, list files, and wipe all app data/files.

---

## 🆕 New & Notable Features

- **My Account Page:**
  - View your username, email, and account ID.
  - List all files stored in your account.
  - Wipe all app data and files with a single click.
  - Navigate back to home easily.
- **Navbar Enhancements:**
  - Added "My Account" button for quick access to account management.
  - Modern icons for upload and logout actions.
- **Improved UI:**
  - Updated color scheme, rounded corners, and responsive layouts.
  - Animated feedback and loading states.
- **Robust Authentication:**
  - Protected routes redirect to `/auth` if not signed in.
  - Uses Puter.js for secure login/logout and user info.

---

## 🖥️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [npm](https://www.npmjs.com/) v8+
- (Optional) [Docker](https://www.docker.com/)

### Installation

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏭 Building for Production

```bash
npm run build
```

---

## 🚢 Deployment

### Vercel

The app is deployed at:

**[https://cvai-phi.vercel.app/](https://cvai-phi.vercel.app/)**

### Docker

Build and run the app in a container:

```bash
docker build -t cvai-app .
docker run -p 3000:3000 cvai-app
```

### Manual/DIY

Deploy the contents of the `build/` directory using any Node.js hosting or serverless platform.

---

## 🔑 Authentication

CVAI uses [Puter.js](https://puter.com/) for authentication and storage. The app will prompt users to log in before accessing protected routes.

---

## 📂 Key Files & Concepts

- **Resume Analysis:**
  - `constants/index.ts`: Defines the feedback format and AI prompt instructions.
  - `app/lib/puter.ts`: Handles Puter.js API integration for auth, file storage, AI, and key-value storage.
  - `app/lib/pdf2img.ts`: Converts PDF resumes to images for preview.
- **UI Components:**
  - `app/components/ResumeCard.tsx`: Displays resume summary and feedback.
  - `app/components/FileUploader.tsx`: Drag-and-drop PDF upload.
  - `app/components/Circle.tsx`: Animated score circle.
  - `app/components/ScoreBadge.tsx`: Dynamic badge for ATS score.
  - `app/components/ATS.tsx`: ATS score and suggestions card.
  - `app/components/Details.tsx`: Accordion for detailed feedback.
- **Routes:**
  - `app/routes/home.tsx`: Dashboard for resume tracking.
  - `app/routes/upload.tsx`: Resume upload and analysis.
  - `app/routes/auth.tsx`: Authentication page.
  - `app/routes/resume.tsx`: Resume review and feedback.
  - `app/routes/wipe.tsx`: My Account page (user info, file management, wipe data).

---

## 📝 Example Usage

1. **Log in** with your Puter account.
2. **Upload** your resume (PDF).
3. **Enter** the target job title and description.
4. **Analyze** to receive AI-powered feedback and ATS score.
5. **Track** all your submissions and feedback on the dashboard.
6. **Manage your account** and wipe data from the My Account page.

---

## 🛠️ Customization

- **Styling:**
  Uses Tailwind CSS. Customize in `app/app.css`.
- **AI Model:**
  Change the model in `app/lib/puter.ts` (`gpt-4o-mini` by default).
- **Feedback Format:**
  Modify the feedback schema in `constants/index.ts`.

---

## 📚 Further Reading

- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Puter.js Documentation](https://puter.com/docs/)

---

## 🤝 Contributing

Pull requests and issues are welcome! Please open an issue to discuss your ideas.

---

<p align="center">
  <img src="https://img.shields.io/badge/Built%20with-React%20Router-blue?logo=reactrouter" alt="React Router" />
  <img src="https://img.shields.io/badge/AI-Powered-orange?logo=ai" alt="AI Powered" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript" alt="TypeScript" />
</p>

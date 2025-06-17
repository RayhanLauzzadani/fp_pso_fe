
# 💱 DooIT – Money Changer Calculator App

DooIT is a modern web-based application designed to help users manage currency conversions in real-time, track financial transactions, and monitor multi-currency balances. The app is built with **Next.js** and integrated with **Firebase**. To ensure efficient and stable development, DooIT implements DevOps best practices with automated **CI/CD using GitHub Actions** and **Google Cloud Run**.

---

## 🚀 Key Features

- 🔄 Real-Time Currency Conversion Calculator  
- 💼 Multi-Currency Balance Management  
- 🗞️ Transaction Input & History Tracking  
- 🔐 Secure Authentication with Firebase  
- ⚙️ Automated CI/CD (Lint, Test, Build, Deploy)  
- ☁️ Cloud Deployment via Docker & Google Cloud Run  
- 📈 Application Monitoring via Google Cloud Monitoring  

---

## 👨‍💻 Development Team

| Name                   | Student ID  | GitHub                                      | Email                      |
|------------------------|-------------|---------------------------------------------|----------------------------|
| M. Fazle M. Sidiki     | 5026221110  | [@mfazms](https://github.com/mfazms)        | fazlesidiki@gmail.com      |
| Athalla Rayya Genaro   | 5026221116  | [@rayyagenaro](https://github.com/rayyagenaro) | gennarorayya05@gmail.com |
| Raihan Fareliansyah    | 5026221160  | [@rfarelll](https://github.com/rfarelll)    | rfareliansyah@gmail.com    |
| Rayhan Lauzzadani      | 5026221186  | [@RayhanLauzzadani](https://github.com/RayhanLauzzadani) | rlauzzadani@gmail.com |

---

## 📁 Repository

- 🔗 [Project Repository](https://github.com/RayhanLauzzadani/fp_pso_fe)

---

## 🧰 Prerequisites

Make sure the following tools are installed on your system:

- Node.js (LTS)
- Docker Desktop
- Git & GitHub Desktop
- Visual Studio Code
- SonarCloud account
- Google Cloud Platform access

---

## ✅ Local Project Setup

```bash
# 1. Clone the repo
git clone https://github.com/RayhanLauzzadani/fp_pso_fe
cd fp_pso_fe

# 2. Install dependencies
npm install

# If errors occur, use:
npm install --legacy-peer-deps
```

📌 **Note**: `--legacy-peer-deps` is used to bypass peer dependency conflicts with older packages.

```bash
# 3. Create .env file with the following content
```

```env
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=xxx
```

🔹 This file is used by `firebaseConfig.ts` to initialize Firebase during local development.

```bash
# 4. Start the development server
npm run dev
```

---

## ⚙️ CI/CD Configuration (GitHub Actions)

1. Create an empty GitHub repository  
2. Add your environment variables as GitHub Secrets via:
   **Settings > Secrets and variables > Actions**
3. Push your local project:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

✅ If `.github/workflows/ci.yml` and `cd.yml` are configured correctly, the CI/CD pipeline will run automatically.

---

## 🔄 DevOps Pipeline Flow

- **CI Workflow**:  
  `Lint → Unit Test (Jest) → Build (Next.js) → SonarCloud Analysis`

- **CD Workflow**:  
  `Authenticate to GCP → Docker Build & Push → Deploy to Google Cloud Run`

- **Monitoring**:  
  `Google Cloud Monitoring for real-time performance visibility`

---

## 🧪 Testing & Coverage

- ✅ Test files are located in: `components/__tests__/*.test.tsx`  
- 🔧 Tools used: **Jest + React Testing Library**  
- 📈 Code coverage is reported to **SonarCloud**, and a minimum of 80% coverage is required to pass.

---

## 📊 Deployment & Monitoring

- ✅ Application is automatically deployed to **Google Cloud Run** after a successful CI pipeline  
- 🐳 Docker image is stored in **Google Artifact Registry**  
- 📉 Application monitoring is done via **Google Cloud Monitoring**

---

## 📙 Additional Documentation

For more detailed documentation including architecture diagrams, CI/CD workflows, and system guides:

- 📄 [DooIT Guide & Documentation + README](https://tekan.id/DooItDocumentation)
- 🌐 [DooIT Live Web App](https://tekan.id/DooIT)
- 📹 [DooIT Rollback System Demo](https://tekan.id/rollbacksystemDooIT)

---

## 🗂️ Folder Structure

```bash
FP_PSO_FE/
├── .github/                 # GitHub Actions CI/CD config (ci.yml, cd.yml)
├── .next/                   # Next.js build output (auto-generated)
├── app/                     # App Router structure and main pages
├── components/              # UI components and unit tests
├── lib/                     # Firebase setup and utility functions
├── node_modules/            # Installed npm dependencies
├── public/                  # Static files (images, icons)
├── types/                   # Global TypeScript types

├── .dockerignore            # Files to exclude during Docker build
├── .env                     # Local environment variables (not committed)
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Git ignored files
├── babel.config.js.bak      # Babel config for testing (temporary use)
├── check-coverage.mjs       # Custom script to verify test coverage
├── components.json          # Optional metadata for components
├── Dockerfile               # Docker image build instructions
├── eslint.config.mjs        # Modular ESLint config
├── jest.config.ts           # Jest configuration
├── jest.setup.js/.ts        # Jest setup scripts
├── next-env.d.ts            # TypeScript declarations for Next.js
├── next.config.ts           # Main Next.js config
├── package-lock.json        # Lock file for exact dependency versions
├── package.json             # Project metadata and dependencies
├── postcss.config.mjs       # PostCSS config (for styling)
├── sonar-project.properties # SonarCloud project setup
├── tsconfig.jest.json       # TypeScript config for Jest
└── tsconfig.json            # Main TypeScript configuration
```

🔹 Note: Some folders like `.next/`, `node_modules/`, and `.env` should be excluded from Git.

---

## 📄 License

This project is licensed under the **MIT License**.  
See the `LICENSE` file for more details.

---

## 📬 Need Help?

If you encounter bugs or have questions, feel free to open an issue via GitHub [Issues](https://github.com/RayhanLauzzadani/fp_pso_fe/issues)  
or contact one of the developers listed above.

---

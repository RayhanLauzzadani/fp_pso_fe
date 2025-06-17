💱 DooIT – Money Changer Calculator App
DooIT is a modern web-based application designed to help users manage currency conversions in real-time, track financial transactions, and monitor multi-currency balances. The app is built with Next.js and integrated with Firebase. To ensure efficient and stable development, DooIT implements DevOps best practices with automated CI/CD using GitHub Actions and Google Cloud Run.

🚀 Key Features
🔄 Real-Time Currency Conversion Calculator
💼 Multi-Currency Balance Management
🗞️ Transaction Input & History Tracking
🔐 Secure Authentication with Firebase
⚙️ Automated CI/CD (Lint, Test, Build, Deploy)
☁️ Cloud Deployment via Docker & Google Cloud Run
📈 Application Monitoring via Google Cloud Monitoring

👨‍💻 Development Team
Name
Student ID
GitHub
Email
M. Fazle M. Sidiki
5026221110
mfazms
fazlesidiki@gmail.com 
Athalla Rayya Genaro
5026221116
rayyagenaro
gennarorayya05@gmail.com 
Raihan Fareliansyah
5026221160
rfarelll
rfareliansyah@gmail.com  
Rayhan Lauzzadani
5026221186
RayhanLauzzadani
rlauzzadani@gmail.com 


📁 Repository
🔗 Repository Link: https://github.com/RayhanLauzzadani/fp_pso_fe 

🧰 Prerequisites
Make sure you have the following tools installed:
Node.js (LTS)
Docker Desktop
Git
Github Desktop
Visual Studio Code
Sonarcloud
Google Cloud Platform

✅ Local Project Setup
# 1. Clone the repo
git clone https://github.com/RayhanLauzzadani/fp_pso_fe
cd fp_pso_fe
# 2. Install dependencies
npm install
# If error occurs:
npm install --legacy-peer-deps
📌 Note: --legacy-peer-deps is used to bypass peer dependency conflicts for older packages.
# 3. Create .env file with the following content:
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=xxx
🔹 This file is used by firebaseConfig.ts to initialize Firebase locally.
# 4. Start the development server
npm run dev

⚙️ CI/CD Configuration (GitHub Actions)
Create an empty GitHub repository


Add your environment variables as GitHub Secrets under:
 Settings > Secrets and variables > Actions


Push your project:
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
If .github/workflows/ci.yml and cd.yml are correctly configured, CI/CD will trigger automatically.

🔄 DevOps Pipeline Flow
CI Workflow: Lint → Unit Test (Jest) → Build (Next.js) → SonarCloud Analysis
CD Workflow: Authenticate to GCP → Docker Build & Push → Deploy to Google Cloud Run
Monitoring: Google Cloud Monitoring for real-time visibility

🧢 Testing & Coverage
Test files located in: components/__tests__/*.test.tsx
Tools: Jest + React Testing Library
Code coverage is reported to SonarCloud (80%+ required to pass)

📊 Deployment & Monitoring
Automatic deployment to Google Cloud Run after successful CI
Docker image stored in Artifact Registry
App monitoring integrated via Google Cloud Monitoring

📙 Additional Documentation
For detailed system architecture, CI/CD pipeline logic, and backend configuration:
 ➡️ DooIT Guide Documentation + ReadME : tekan.id/DooItDocumentation 
 ➡️ DooIT Website APK : tekan.id/DooIT 
 ➡️ DooIT Rollback System Video : tekan.id/rollbacksystemDooIT 

🗂️ Folder Structure
FP_PSO_FE/
├── .github/                 # GitHub Actions CI/CD config (ci.yml, cd.yml)
├── .next/                   # Next.js build output (auto-generated)
├── app/                     # App Router structure and main pages
├── components/              # UI components and unit tests
├── lib/                     # Firebase setup and utility functions
├── node_modules/            # Installed npm dependencies
├── public/                  # Static files (images, icons)
├── types/                   # Global TypeScript types
│
├── .dockerignore            # Files to exclude during Docker build
├── .env                     # Local environment variables (not committed)
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Ignored files for Git
├── babel.config.js.bak      # Babel config for testing (temporary use)
├── check-coverage.mjs       # Custom script to verify test coverage
├── components.json          # Optional metadata for components
├── Dockerfile               # Docker image build instructions
├── eslint.config.mjs        # Modular ESLint config
├── jest.config.ts           # Jest testing configuration
├── jest.setup.js/.ts        # Jest environment setup files
├── next-env.d.ts            # TypeScript declarations for Next.js
├── next.config.ts           # Main configuration for Next.js
├── package-lock.json        # Lock file for package versions
├── package.json             # Project metadata and dependencies
├── postcss.config.mjs       # PostCSS configuration for styling
├── sonar-project.properties # SonarCloud analysis configuration
├── tsconfig.jest.json       # TypeScript config specifically for tests
└── tsconfig.json            # Main TypeScript config
🔹 Some folders like .next/, node_modules/, and .env should not be committed.
📄 License
This project is licensed under the MIT License. See the LICENSE file for more details.
If you have any questions or encounter bugs, please open an issue via GitHub Issues or contact one of the Developers listed above.

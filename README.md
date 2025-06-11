💱 DooIT – Money Changer Calculator App
DooIT is a modern web-based application designed to help users manage and track personal financial transactions — including income, expenses, and multi-currency balance conversion. Built with Next.js and integrated with Firebase, the app offers real-time exchange rate calculation, transaction logging, and DevOps automation with GitHub Actions and Google Cloud Run.
Developed by:

- Rayhan Lazzuardani		| github.com/RayhanLauzzadani 
- Rayhan Farelliansyah		| github.com/rfarelll 
- Athalla Rayya Genaro		| github.com/rayyagenaro 
- M. Fazle M. S. 		| github.com/mfazms 

🚀 Features
- Real-time currency exchange calculator
- Multi-currency balance management
- Transaction input & history tracking
- Secure authentication (via Firebase Auth)
- CI/CD automation (GitHub Actions)
- Cloud deployment with Docker & Google Cloud Run
-  Monitoring via Google Cloud Monitoring

📁 Project Repository
Frontend + Backend : https://github.com/RayhanLauzzadani/fp_pso_fe
Kanban Board: GitHub Project Board
UI/UX Figma : 

🧰 Prerequisites
Before you begin, make sure you have the following tools installed:
Docker
Node.js (Recommended: LTS version)

⚙️ Getting Started
Follow these steps to run the project locally:
1. Clone the Repositoryt
git clone https://github.com/RayhanLauzzadani/fp_pso_fe.git
cd fp_pso_fe
2. Install Dependencies
npm install
# or if errors occur:
npm install --legacy-peer-deps
3. To Start the server
Make sure Docker Desktop is running:
npm run dev

🛠️ CI/CD & Deployment
- CI/CD is handled via GitHub Actions
- Auto lint, test (Jest), and build on every push/PR.
- Auto deploy to Google Cloud Run on merge to main.
- Monitoring is active via Google Cloud Monitoring.

📚 Additional Documentation
For deployment guides, environment config, and architecture diagrams, refer to:
 👉 tekan.id/DooItDocumentation

🤝 Contributing
Please follow GitHub best practices:
Use Pull Requests for code changes
Ensure all CI jobs pass before merging
Coordinate via Kanban Board for tasks

📄 License
This project is licensed under the MIT License — see the LICENSE file for details.

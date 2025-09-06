Taurean IT Logistics - Facility Management Platform
A comprehensive SaaS facility management platform built with Next.js, Node.js, and MongoDB.
Features

🏢 Multi-tenant Architecture - Complete company isolation
📊 Comprehensive Dashboards - User, Admin, and Super Admin dashboards
💳 Payment Integration - Paystack payment processing with callbacks
🧾 Modern Invoice System - Professional PDF generation with company branding
📱 Real-time Updates - Socket.io integration for live notifications
💬 Chat System - Built-in support ticket and messaging system
📈 Analytics & Reporting - Business insights and data export
🔐 Role-based Access Control - Granular permissions system
📱 Mobile Responsive - Optimized for all devices

Getting Started
This project offers two setup options: Docker (recommended for simplicity) or manual setup. For detailed instructions, refer to:

GET_STARTED.md: Step-by-step guide for local setup (Docker or manual).
DEPLOYMENT.md: Guide for production deployment and advanced configurations.

Prerequisites

Docker and Docker Compose (for Docker setup): Install from docker.com.
Git: Install from git-scm.com.
Node.js 18+, MongoDB 7.0+, and Redis 7.2+ (for manual setup).
A text editor (e.g., VS Code) for editing configuration files.
For Windows users: Windows Subsystem for Linux (WSL) is recommended for Redis and MongoDB.

Quick Start with Docker
1. Clone the Repository
git clone https://github.com/theniitettey/taurean-inventory-saas.git
cd taurean-inventory-saas

2. Environment Setup
# Copy environment template
cp .env.example .env

# Edit the .env file with your configuration
nano .env

Required Environment Variables:
# Database
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=your-secure-password

# JWT Secrets (Generate strong random strings)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production

# Paystack (Get from https://paystack.com/)
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key

# URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_API_BASE=http://localhost:3001/api/v1

See GET_STARTED.md for all environment variables.
3. Start the Application
# Start all services
docker-compose -f docker-compose.dev.yml up -d

# Seed the database
docker-compose -f docker-compose.dev.yml exec backend-dev npm run seed

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop all services
docker-compose -f docker-compose.dev.yml down

4. Access the Application

Frontend: http://localhost:3000
Backend API: http://localhost:3001/api/v1
API Documentation: http://localhost:3001/api-docs

Default Credentials:

Admin: admin@taureanit.com / taureanadmin2024
Staff: staff@taureanit.com / taureanstaff2024

Manual Setup (Without Docker)
For developers preferring a manual setup (e.g., for Windows with MongoDB Compass).
Prerequisites for Manual Setup

Node.js 18+: Install from nodejs.org.
MongoDB 7.0+: Use MongoDB Compass or install locally (mongodb.com).
Redis 7.2+: Required for caching and sessions.

Installing Redis on Windows (Using WSL)

Enable WSL (Windows Subsystem for Linux):

Open PowerShell as Administrator and run:wsl --install


Restart your computer and set up Ubuntu (default WSL distro).


Open WSL (type wsl in Command Prompt or PowerShell) and install Redis:
# Update package list
sudo apt update
# Optional: Upgrade packages
sudo apt upgrade -y
# Install Redis
sudo apt-get install redis


Start Redis:
sudo service redis-server start or redis-server

If Redis doesn’t start:

Check status: sudo service redis-server status
Stop and restart: sudo service redis-server stop && sudo service redis-server start


Verify Redis is running:
redis-cli ping

Should return PONG.


Backend Setup
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB and Redis settings (use localhost:27017 for MongoDB Compass)
npm run seed
npm run dev

Frontend Setup
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with NEXT_PUBLIC_API_URL=http://localhost:3001
npm run dev

See GET_STARTED.md for detailed manual setup instructions.
Production Deployment
For production, use Docker with Nginx for SSL and load balancing. See DEPLOYMENT.md for:

SSL certificate setup.
Production environment variables.
Scaling and monitoring.

With Nginx (Recommended)
docker-compose --profile production up -d

Services



Service
Port
Description



Frontend
3000
Next.js application


Backend
3001
Node.js API server


MongoDB
27017
Database


Redis
6379
Caching & sessions


Nginx
80/443
Reverse proxy (production)


Architecture
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Frontend  │    │   Backend   │    │  Database   │
│   (Next.js) │◄──►│  (Node.js)  │◄──►│ (MongoDB)   │
│    :3000    │    │    :3001    │    │   :27017    │
└─────────────┘    └─────────────┘    └─────────────┘
       ▲                   ▲                   ▲
       │                   │                   │
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    Nginx    │    │    Redis    │    │   Socket.io │
│ (Proxy/SSL) │    │ (Cache/Pub) │    │ (Real-time) │
│  :80/:443   │    │    :6379    │    │   Embedded  │
└─────────────┘    └─────────────┘    └─────────────┘

Key Features
🏢 Multi-Tenant SaaS

Complete data isolation between companies
Company-specific branding and settings
Super admin oversight capabilities

💳 Payment Processing

Paystack integration with webhooks
Payment verification and callbacks
Multi-currency support
Automated receipt generation

🧾 Invoice System

Professional PDF templates
Company branding integration
Tax calculation with schedules
Automated numbering systems

📊 Analytics & Reporting

Business performance metrics
Revenue and booking analytics
Data export (CSV/Excel)
Real-time dashboard updates

💬 Communication

Built-in chat system
Support ticket management
Real-time notifications
File attachments

API Documentation
Visit http://localhost:3001/api-docs for complete API documentation.
Environment Variables



Variable
Description
Default



MONGO_ROOT_USERNAME
MongoDB root username
admin


MONGO_ROOT_PASSWORD
MongoDB root password
password123


MONGO_DATABASE
Database name
facility_management


REDIS_PASSWORD
Redis password
redis123


JWT_SECRET
JWT signing secret
Required


JWT_REFRESH_SECRET
JWT refresh secret
Required


PAYSTACK_SECRET_KEY
Paystack secret key
Required


PAYSTACK_PUBLIC_KEY
Paystack public key
Required


EMAIL_HOST
SMTP host
Optional


EMAIL_PORT
SMTP port
587


EMAIL_USER
SMTP username
Optional


EMAIL_PASS
SMTP password
Optional


See DEPLOYMENT.md for all environment variables.
Health Checks
# Check backend health
curl http://localhost:3001/health

# Check frontend health
curl http://localhost:3000/

# Check all services (Docker)
docker-compose ps

Scaling
For production scaling, see DEPLOYMENT.md for:

MongoDB replica sets or sharding
Multiple backend instances with Nginx
Redis cluster for session management
CDN for static assets
Prometheus/Grafana for monitoring

Backup
# Backup MongoDB (Docker)
docker-compose exec mongodb mongodump --out /data/backup

# Backup volumes
docker run --rm -v facility-management-platform_mongodb_data:/data -v $(pwd):/backup alpine tar czf /backup/mongodb-backup.tar.gz /data

Troubleshooting
Common Issues

Port Conflicts: Ensure ports 3000, 3001, 27017, 6379 are free (sudo lsof -i :3000).
Permission Issues: Check Docker or file permissions (sudo chmod -R 755 .).
Memory Issues: Allocate at least 4GB RAM for Docker or manual setup.
Redis on Windows: If Redis doesn’t start, run sudo service redis-server stop and then sudo service redis-server start.
PDF Generation: Ensure Puppeteer dependencies are installed (included in Docker).

Logs
# Docker logs
docker-compose logs

# Specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb

# Manual setup logs
# Check backend/frontend console output
# MongoDB: tail -f /var/log/mongodb/mongod.log
# Redis: tail -f /var/log/redis/redis-server.log

Workflow Status

Support

Email: support@taureanitlogistics.com
Documentation: API Docs, GET_STARTED.md, DEPLOYMENT.md
Issues: Report bugs on GitHub

License
Proprietary - All rights reserved to Taurean IT Logistics

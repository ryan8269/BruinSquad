# BruinSquads

BruinSquads is a web application that connects UCLA students for sports activities. This README provides detailed instructions for setting up and running the application locally.

## Prerequisites

Before you begin, ensure you have the following:
- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB account
- Clerk account
- ngrok account and CLI installed

## Project Structure

```
bruinsquads/
├── backend/         # Express server and API endpoints
├── frontend/        # Next.js frontend application
├── package.json     # Root package.json for scripts
└── README.md       # This file
```

## Initial Setup

1. Clone the repository:
```bash
git clone https://github.com/ryan8269/bruinsquads.git
cd bruinsquads
```

2. Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Environment Configuration

### Backend (.env)
Create a `.env` file in the `backend` directory with the following variables:
```
PORT=4000
MONGODB_URI=your_mongodb_connection_string
WEBHOOK_SECRET=your_clerk_webhook_secret
```

### Frontend (.env.local)
Create a `.env.local` file in the `frontend` directory with the following variables:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/user/profile
```

## Database Setup

1. Create a MongoDB account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster and get your connection string
3. Seed the database with initial location data:
```bash
cd backend
node seed.js
```

## Clerk Authentication Setup

1. Create a Clerk account at [Clerk.dev](https://clerk.dev)
2. Set up a new application in Clerk dashboard
3. Configure webhook:
   - In Clerk Dashboard, go to Webhooks
   - Create a new webhook for "User Created" event
   - Set the endpoint URL to your ngrok public domain + `/api/webhook`
   - Save the webhook secret for your backend `.env` file

## ngrok Setup

1. Install ngrok:
```bash
# macOS (using Homebrew)
brew install ngrok

# Windows (using Chocolatey)
choco install ngrok
```

2. Sign up at [ngrok.com](https://ngrok.com) and get your auth token
3. Configure ngrok:
```bash
ngrok config add-authtoken your_auth_token
```

4. Update the root `package.json` dev script with your ngrok domain:
```json
{
  "scripts": {
    "dev": "ngrok http --domain=your-domain.ngrok-free.app 4000"
  }
}
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend:
```bash
cd frontend
npm run dev
```

3. In a third terminal, start ngrok:
```bash
# From project root
npm run dev
```

4. Access the application:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000](http://localhost:8000)
   - Webhook endpoint will be available at your ngrok domain

## Webhook Configuration

The webhook system synchronizes user data between Clerk and MongoDB. When a user is created in Clerk, it sends a POST request to your backend endpoint:

```
POST https://your-domain.ngrok-free.app/api/webhook
```

For more information about setting up the webhook, refer to [Clerk's documentation on database sync](https://clerk.com/docs/users/sync-data).

## Troubleshooting

Common issues and solutions:

1. **MongoDB Connection Issues**
   - Ensure your IP address is whitelisted in MongoDB Atlas
   - Verify your connection string in the backend `.env` file

2. **Webhook Not Receiving Data**
   - Confirm ngrok is running and the domain is correct
   - Verify the webhook secret in both Clerk dashboard and backend `.env`
   - Check webhook logs in Clerk dashboard

3. **Frontend Authentication Issues**
   - Verify all Clerk environment variables are set correctly
   - Ensure the Clerk publishable key matches your application

## Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Clerk Documentation](https://clerk.dev/docs) - Clerk has good documentation on how to set up nkgrok as well
- [ngrok Documentation](https://ngrok.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
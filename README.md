# Discord Clone

A comprehensive Discord clone built with modern web technologies, featuring real-time communication, user authentication, and server management capabilities.

## 🌟 Features

- **User Authentication**: Secure login and registration system powered by Clerk
- **Real-time Communication**: Text and voice channels with real-time updates
- **Server Management**: Create, join, and manage Discord-like servers
- **User Profiles**: Customizable user profiles with avatars
- **File Uploads**: Media and file sharing capabilities via UploadThing
- **Voice Chat**: Live voice communication using LiveKit integration
- **Direct Messaging**: Private messaging between users
- **Role-based Permissions**: Access control with customizable roles
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Postgres Database**: Reliable data storage with Neon Database

## 🔧 Technology Stack

- **Technology**:

  - Next.js
  - React
  - TailwindCSS
  - ShadcnUI components
  - Node.js
  - PostgreSQL (hosted on Neon)
  - Prisma ORM

- **Authentication**:

  - Clerk Authentication

- **Real-time Communication**:

  - LiveKit (for voice/video)
  - WebSockets

- **File Storage**:
  - UploadThing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16.0.0 or higher)
- [npm](https://www.npmjs.com/) (v8.0.0 or higher) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (or use the provided Neon Database connection)
- [Git](https://git-scm.com/)

## ⚙️ Installation

1. Clone the repository

   ```bash
   git clone https://github.com/omerfarukkanli/discord.git
   cd discord
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following environment variables:

   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=
   NEXT_PUBLIC_FORGE_REDIRECT_URL=

   # Database Connection
   DATABASE_URL=

   # UploadThing Configuration
   UPLOADTHING_SECRET=
   UPLOADTHING_APP_ID=
   UPLOADTHING_TOKEN=

   # LiveKit Configuration
   NEXT_PUBLIC_LIVEKIT_URL=
   LIVEKIT_API_KEY=
   LIVEKIT_API_SECRET=
   ```

   > **Note**: For security reasons, you should generate your own API keys and secrets for production use.

4. Set up the database

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## 🚀 Deployment

This application can be deployed on Netlify, or any other platform that supports Next.js applications:

1. Configure environment variables on your hosting platform
2. Connect your GitHub repository to your hosting platform
3. Deploy the application

### Environment Variables for Production

Make sure to set all the environment variables listed above in your production environment.

## 🗂️ Project Structure

```
discord/
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   ├── (auth)/           # Authentication routes
│   ├── (main)/           # Main application routes
│   └── [serverId]/       # Server-specific routes
├── components/           # Reusable React components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
├── prisma/               # Prisma schema and migrations
├── public/               # Static files
└── styles/               # Global styles
```

## 🔒 Authentication Flow

The application uses Clerk for authentication:

1. Users sign up or log in through the Clerk interface
2. Upon successful authentication, users are redirected to the main application
3. JWT tokens are used to authenticate API requests
4. User sessions are managed by Clerk's built-in session management

## 💾 Database Schema

The application uses a PostgreSQL database with the following main entities:

- **Users**: User profiles and authentication information
- **Servers**: Discord-like servers that users can create and join
- **Channels**: Text and voice channels within servers
- **Messages**: Messages sent in channels or direct conversations
- **Members**: Users' membership in servers with associated roles
- **Roles**: Permission settings for server members

## 🎙️ Voice Chat Implementation

Voice chat is implemented using LiveKit:

1. Users join a voice channel by clicking on it
2. The application connects to the LiveKit server using the provided API key and secret
3. Real-time voice communication is established between users in the same channel
4. Audio quality and connection settings can be adjusted in the user interface

## 📂 File Uploads

The application uses UploadThing for file uploads:

1. Users can upload files through the message input
2. Files are securely stored in UploadThing's storage
3. Files can be viewed and downloaded by other users in the channel

## 👨‍💻 Author

- **Omer Faruk Kanli**
  - [GitHub](https://github.com/omerfarukkanli)

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.dev/)
- [Prisma](https://www.prisma.io/)
- [LiveKit](https://livekit.io/)
- [UploadThing](https://uploadthing.com/)
- [Neon Database](https://neon.tech/)
- [TailwindCSS](https://tailwindcss.com/)

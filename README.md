# To-Do List App

A modern, fully-functional to-do list application built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, and **Supabase**. This app is optimized for deployment on **Vercel** with a cloud database backend.

## 🚀 Features

- ✅ Create, read, update, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Filter todos by status (All, Active, Completed)
- ✅ Edit todo titles inline
- ✅ Responsive design with Tailwind CSS
- ✅ Real-time updates with Supabase
- ✅ Type-safe TypeScript throughout
- ✅ RESTful API routes
- ✅ Production-ready error handling

## 📋 Project Structure

```
to-do-list-app/
├── app/
│   ├── api/
│   │   └── todos/
│   │       ├── route.ts           # GET/POST todos
│   │       └── [id]/
│   │           └── route.ts       # GET/PUT/DELETE specific todo
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page
├── components/
│   ├── AddTodoForm.tsx            # Form to add new todos
│   ├── TodoItem.tsx               # Individual todo item component
│   └── TodoList.tsx               # Todo list container
├── lib/
│   ├── supabase.ts                # Client-side Supabase config
│   ├── supabase-server.ts         # Server-side Supabase config
│   └── todo-queries.ts            # Database queries
├── public/                        # Static assets
├── styles/                        # Additional stylesheets
├── .env.local.example             # Environment variables template
├── .gitignore                     # Git ignore rules
├── database.sql                   # Supabase table schema
├── next.config.js                 # Next.js configuration
├── package.json                   # Dependencies and scripts
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
└── vercel.json                    # Vercel configuration

```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (ready to integrate)
- **Deployment**: Vercel

## 📦 Installation

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd to-do-list-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Supabase

#### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/log in and create a new project
3. Wait for the project to initialize

#### Run Database Schema
1. Go to SQL Editor in your Supabase dashboard
2. Create a new query and paste the contents of `database.sql`
3. Execute the query to create the `todos` table with RLS policies

#### Get Your Credentials
1. In your Supabase project, go to **Settings > API**
2. Copy your `Project URL` and `Anon Key`
3. Also copy the `Service Role Key` from the same page

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## 🚀 Development

### Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

### Lint Code
```bash
npm run lint
```

## 🌐 Deployment to Vercel

### Prerequisites
- GitHub account with your repository pushed
- Vercel account

### Step 1: Create Vercel Project
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select Next.js as the framework (auto-detected)

### Step 2: Set Environment Variables
1. In Vercel dashboard, go to **Settings > Environment Variables**
2. Add the following variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Click "Deploy"

### Step 3: Monitor Deployment
- Vercel will automatically build and deploy your app
- View deployment logs in the Vercel dashboard
- Your app will be available at `https://your-project.vercel.app`

## 📝 API Endpoints

### Get All Todos
```
GET /api/todos
```
Returns array of all todos.

### Create Todo
```
POST /api/todos
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Optional description"
}
```

### Get Specific Todo
```
GET /api/todos/:id
```

### Update Todo
```
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "New title",
  "completed": true
}
```

### Delete Todo
```
DELETE /api/todos/:id
```

## 🔒 Security Notes

### Current Configuration
The database is currently set up with public RLS policies for development. This is convenient for testing but **NOT recommended for production**.

### Production Security
For production, implement proper authentication:

1. Enable Supabase Auth (email/password, OAuth, etc.)
2. Update RLS policies to restrict access to authenticated users:
   ```sql
   CREATE POLICY "Users can only manage their own todos" ON todos
     FOR ALL USING (auth.uid() = user_id);
   ```
3. Add a `user_id` column to the todos table
4. Implement user session management in your app

## 🐛 Troubleshooting

### "Failed to fetch todos" error
- Check that your `.env.local` file has correct Supabase credentials
- Verify that the `todos` table exists in Supabase
- Check browser console for detailed error messages

### Build fails on Vercel
- Ensure all dependencies are in `package.json`
- Check that environment variables are set in Vercel dashboard
- Review Vercel build logs for specific errors

### CORS errors
- Ensure `NEXT_PUBLIC_SUPABASE_URL` is correct
- Verify your Supabase project settings allow your domain

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel Documentation](https://vercel.com/docs)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Built with ❤️ for productivity.

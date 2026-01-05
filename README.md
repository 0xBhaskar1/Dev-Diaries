
# 📝 DevDiaries
A full-stack blogging application built with **React** and **Appwrite**. It features secure authentication, real-time database interactions, a rich text editor, and a responsive UI styled with Tailwind CSS.

### Live Demo : 
Check out the live application here: **[https://dev-diaries-seven.vercel.app](https://dev-diaries-seven.vercel.app)**

## 🚀 Key features
* **Authentication:** Secure Login and Signup using Appwrite Auth.
* **Real-time Database:** Create, Read, Update, and Delete (CRUD) blog posts
* **Rich Text Editor:** **TinyMCE** for writing beautiful blogs
* **State Management:** **Redux Toolkit** for State Management
* **Image Storage:** Upload Blog Thumbnail via appwrite Storage
* **Responsive design:** mobile friendly UI powered by **Shadcn** and **Tailwind CSS** 
* **Like System** Interactive Like System with optimistic UI updates

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite)
* **Backend:** Appwrite Cloud (Auth, Database, Storage)
* **State Management:** Redux Toolkit
* **Styling:** Tailwind CSS and Shadcn
* **Form Handling:** React Hook Form
* **Routing:** React Router DOM
* **Icons:** Lucide React
* **Rich Text Editor:** TinyMCE 

## 📂 Folder Structure

```text
src/
├── appwrite/                   # Appwrite service configuration
│   ├── auth.js                 # Authentication service (Login, Signup, Logout)
│   ├── db.js                   # Database service (CRUD operations)
│
├── components/                 # Reusable UI components
│   ├── Header/                 # Navigation bar and logout button
│   │    ├── Header.jsx
│   │    ├── LogoutBtn.jsx
│   │    ├── MobileLogoutBtn.jsx
│   ├── ui/                     # shadcn ui components
│   ├── AuthLayout.jsx          # Protected route wrapper
│   ├── Contaner.jsx
│   ├── Input.jsx
│   ├── Login.jsx
│   ├── PostCard.jsx            # Individual post preview card
│   ├── PostForm.jsx
│   ├── Select.jsx
│   ├── Signup.jsx
│   ├── footer.jsx   
│   ├── RTE.jsx                 # Rich Text Editor (TinyMCE) wrapper
│   └── index.js
│
├── config
│    ├── config.js               # access environment variables
│
├── pages/                      # Full page components
│   ├── Home.jsx                # Landing page with all posts
│   ├── Login.jsx               # Login page
│   ├── Signup.jsx              # Registration page
│   ├── Post.jsx                # Single post detailed view
│   ├── AddPost.jsx             # Create new post page
│   └── EditPost.jsx            # Update existing post page
│
├── store/                      # Redux configuration
│   ├── store.js                # Main store setup
│   └── authSlice.js            # Authentication slice (user status)
│
├── hooks/                      # Custom React Hooks
│   └── useLikes.js             # Logic for handling post likes
│
├── App.jsx            # Main application entry point
└── main.jsx           # React DOM rendering
```
## Getting Started

To run this project locally follow these steps:

* Clone the repository
``` text
git clone [https://github.com/yourusername/dev-diaries.git](https://github.com/yourusername/dev-diaries.git)
cd dev-diaries
```
* Install Dependencies
```text
npm install
```
* Configure environment 
```text
Create a .env file in the root directory and paste your Appwrite credentials as shown below :

VITE_APPWRITE_URL="[https://cloud.appwrite.io/v1](https://cloud.appwrite.io/v1)"
VITE_APPWRITE_PROJECT_ID="your_project_id_"
VITE_APPWRITE_DATABASE_ID="your_database_id_"
VITE_APPWRITE_COLLECTION_ID="your_collection_id_"
VITE_APPWRITE_BUCKET_ID="your_bucket_id_"
VITE_TINYMCE_API_KEY="your_tinymce_api_key_"

```
* Run the development server
```text
npm run dev
```
Open http://localhost:5173 to view it in the browser.


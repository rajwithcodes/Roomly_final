# 🏡 Roomly

Roomly is a **room listing and review platform** where users can sign up, list their rooms/properties, and leave reviews.  
It’s built using the **Node.js + Express + MongoDB Atlas + EJS** stack with authentication, secure sessions, and cloud image uploads.  
The project is deployed on **Render**.

---

## 🚀 Live Demo
🔗 [Roomly on Render](https://roomly-final.onrender.com)

---

## 🛡️ Tech Badges

![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-5.1-lightgrey?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen?logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-Templating-blueviolet)
![Passport.js](https://img.shields.io/badge/Passport.js-Auth-yellowgreen)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Images-blue?logo=cloudinary&logoColor=white)
![Render](https://img.shields.io/badge/Deployed%20on-Render-blue?logo=render&logoColor=white)

---

## ✨ Features
- 🔑 User authentication (Register/Login/Logout) with **Passport.js**
- 📝 Full CRUD operations for room listings
- ⭐ Add, edit, and delete reviews
- ☁️ Cloud image upload using **Multer + Cloudinary**
- 💾 Persistent storage with **MongoDB Atlas**
- 🔐 Secure sessions with `express-session` & `connect-mongo`
- ⚡ Flash messages for instant feedback
- 🎨 Dynamic views using **EJS + ejs-mate layouts**
- 🛡️ Input validation with **Joi**

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Authentication:** Passport.js (Local strategy)  
- **Templating Engine:** EJS + ejs-mate  
- **Image Storage:** Cloudinary + Multer  
- **Deployment:** Render  

---

## 📂 Folder Structure
Roomly/
│── models/ # Mongoose models (User, Listing, Review)
│── routes/ # Express routes (listing, review, user)
│── utils/ # Utilities (wrapAsync, ExpressError)
│── views/ # EJS templates (home, listings, users, reviews)
│── public/ # Static assets (CSS, JS, images)
│── app.js # Main server file
│── schema.js # Joi validation schemas
│── package.json # Dependencies & scripts

yaml
Copy code

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/roomly.git
cd roomly
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Setup environment variables
Create a .env file in the root directory and add:

env
Copy code
ATLASDB_URL=your_mongodb_atlas_url
SECRET=your_session_secret
CLOUDNAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
4️⃣ Run the project locally
bash
Copy code
nodemon app.js
Server will start at:

arduino
Copy code
http://localhost:3000
🔑 Usage
👤 Register/Login to access features

🏘️ Create and manage your room listings

📸 Upload images to listings via Cloudinary

✏️ Edit or delete your listings

⭐ Add reviews on other listings

⚡ Get success/error alerts with flash messages



📜 License
This project is licensed under the ISC License.

👨‍💻 Author
Developed by Raj Singhania 🚀
Deployed at 🔗 Roomly on Render

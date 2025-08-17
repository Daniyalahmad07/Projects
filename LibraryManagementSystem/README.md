# 📚 Library Management System (Java + File I/O)

A simple console-based Library Management System using *Core Java* and *File I/O* for persistence.

---

## 🚀 Features
- Admin login (username: admin, password: admin123)
- Add / View / Search / Borrow / Return / Delete books
- Persistent storage in books.txt (CSV format)
- Encapsulation with Book and User classes
- Exception handling for invalid inputs

---

## 📂 Project Structure
- Book.java → POJO for book details
- User.java → (Optional) class for users
- LibrarySystem.java → Main class with menu logic
- books.txt → Persistent file storage

---

## ▶ Running the Project
1. Compile:
   ```sh
   javac Book.java User.java LibrarySystem.java
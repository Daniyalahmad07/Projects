package Projects.LibraryManagementSystem;

import java.io.*;
import java.util.*;

public class LibrarySystem {
    private static final String BOOKS_FILE = "books.txt";
    private static List<Book> books = new ArrayList<>();
    private static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        loadBooks();

        if (!login()) {
            System.out.println("Invalid credentials. Exiting...");
            return;
        }

        int choice;
        do {
            showMenu();
            choice = getChoice();
            switch (choice) {
                case 1 -> addBook();
                case 2 -> viewBooks();
                case 3 -> searchBook();
                case 4 -> borrowBook();
                case 5 -> returnBook();
                case 6 -> deleteBook();
                case 7 -> System.out.println("Exiting... Saving data.");
                default -> System.out.println("Invalid choice. Try again!");
            }
        } while (choice != 7);

        saveBooks();
    }

    // Admin login
    private static boolean login() {
        System.out.print("Enter username: ");
        String username = sc.nextLine();
        System.out.print("Enter password: ");
        String password = sc.nextLine();

        return username.equals("admin") && password.equals("admin123");
    }

    private static void showMenu() {
        System.out.println("\n==== Library Management System ====");
        System.out.println("1. Add Book");
        System.out.println("2. View Books");
        System.out.println("3. Search Book");
        System.out.println("4. Borrow Book");
        System.out.println("5. Return Book");
        System.out.println("6. Delete Book");
        System.out.println("7. Exit");
        System.out.print("Enter your choice: ");
    }

    private static int getChoice() {
        try {
            return Integer.parseInt(sc.nextLine());
        } catch (Exception e) {
            return -1;
        }
    }

    private static void addBook() {
        try {
            System.out.print("Enter book ID: ");
            int id = Integer.parseInt(sc.nextLine());
            System.out.print("Enter book title: ");
            String title = sc.nextLine();
            System.out.print("Enter author name: ");
            String author = sc.nextLine();

            books.add(new Book(id, title, author, false));
            System.out.println("Book added successfully!");
        } catch (Exception e) {
            System.out.println("Error adding book. Try again.");
        }
    }

    private static void viewBooks() {
        if (books.isEmpty()) {
            System.out.println("No books found.");
            return;
        }
        System.out.println("\n--- Book List ---");
        for (Book b : books) System.out.println(b);
    }

    private static void searchBook() {
        System.out.print("Enter title/author to search: ");
        String keyword = sc.nextLine().toLowerCase();

        boolean found = false;
        for (Book b : books) {
            if (b.getTitle().toLowerCase().contains(keyword) ||
                b.getAuthor().toLowerCase().contains(keyword)) {
                System.out.println(b);
                found = true;
            }
        }
        if (!found) System.out.println("No matching books found.");
    }

    private static void borrowBook() {
        System.out.print("Enter book ID to borrow: ");
        int id = Integer.parseInt(sc.nextLine());

        for (Book b : books) {
            if (b.getId() == id) {
                if (!b.isBorrowed()) {
                    b.setBorrowed(true);
                    System.out.println("Book borrowed successfully.");
                } else {
                    System.out.println("Book is already borrowed.");
                }
                return;
            }
        }
        System.out.println("Book not found.");
    }

    private static void returnBook() {
        System.out.print("Enter book ID to return: ");
        int id = Integer.parseInt(sc.nextLine());

        for (Book b : books) {
            if (b.getId() == id) {
                if (b.isBorrowed()) {
                    b.setBorrowed(false);
                    System.out.println("Book returned successfully.");
                } else {
                    System.out.println("This book was not borrowed.");
                }
                return;
            }
        }
        System.out.println("Book not found.");
    }

    private static void deleteBook() {
        System.out.print("Enter book ID to delete: ");
        int id = Integer.parseInt(sc.nextLine());

        Iterator<Book> it = books.iterator();
        while (it.hasNext()) {
            Book b = it.next();
            if (b.getId() == id) {
                it.remove();
                System.out.println("Book deleted.");
                return;
            }
        }
        System.out.println("Book not found.");
    }

    // File I/O
    private static void loadBooks() {
        File file = new File(BOOKS_FILE);
        if (!file.exists()) return;

        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null) {
                books.add(Book.fromCSV(line));
            }
        } catch (Exception e) {
            System.out.println("Error loading books: " + e.getMessage());
        }
    }

    private static void saveBooks() {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(BOOKS_FILE))) {
            for (Book b : books) {
                bw.write(b.toCSV());
                bw.newLine();
            }
        } catch (Exception e) {
            System.out.println("Error saving books: " + e.getMessage());
        }
    }
}
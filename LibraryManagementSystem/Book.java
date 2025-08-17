package Projects.LibraryManagementSystem;
public class Book {
    private int id;
    private String title;
    private String author;
    private boolean isBorrowed;

    public Book(int id, String title, String author, boolean isBorrowed) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isBorrowed = isBorrowed;
    }

    // Getters and setters
    public int getId() { return id; }
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public boolean isBorrowed() { return isBorrowed; }

    public void setBorrowed(boolean borrowed) { isBorrowed = borrowed; }

    @Override
    public String toString() {
        return id + " | " + title + " | " + author + " | " + (isBorrowed ? "Borrowed" : "Available");
    }

    // For saving to CSV format
    public String toCSV() {
        return id + "," + title + "," + author + "," + isBorrowed;
    }

    // For loading from CSV
    public static Book fromCSV(String line) {
        String[] parts = line.split(",");
        return new Book(
                Integer.parseInt(parts[0]),
                parts[1],
                parts[2],
                Boolean.parseBoolean(parts[3])
        );
    }
}
package proiectLicenta.clase;

enum TipUtilizator { NORMAL, STUDENT, PROFESOR };

public class User {
    private int id;
    private String nume;
    private String prenume;
    private String username;
    private String parola;
    private String email;
    private TipUtilizator tip;
    
    public User() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public String getPrenume() {
        return prenume;
    }

    public void setPrenume(String prenume) {
        this.prenume = prenume;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getParola() {
        return parola;
    }

    public void setParola(String parola) {
        this.parola = parola;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public void setTip(String tip) {
        if (tip.toLowerCase().equals("normal")) {
            this.tip = TipUtilizator.NORMAL;
        } else if (tip.toLowerCase().equals("student")) {
            this.tip = TipUtilizator.STUDENT;
        } else if (tip.toLowerCase().equals("profesor")) {
            this.tip = TipUtilizator.PROFESOR;
        }
    }

    public TipUtilizator getTip() {
        return tip;
    }
    
    public boolean isProfesor() {
        if (this.tip == TipUtilizator.PROFESOR) {
            return true;
        }
        return false;
    }
    
    public boolean isStudent() {
        if (this.tip == TipUtilizator.STUDENT) {
            return true;
        }
        return false;
    }
    
}

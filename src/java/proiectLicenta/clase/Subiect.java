package proiectLicenta.clase;

import java.io.File;
import java.io.PrintWriter;
import java.util.List;

public class Subiect {

    private int id;
    private String denumireSubiect;
    private String cerintaSubiect;
    private List<Functie> functii;
    private List<VerificareRezultat> verificari;
    private String autor;

    public String getDenumireSubiect() {
        return denumireSubiect;
    }

    public void setDenumireSubiect(String denumireSubiect) {
        this.denumireSubiect = denumireSubiect;
    }

    public String getCerintaSubiect() {
        return cerintaSubiect;
    }

    public void setCerintaSubiect(String cerintaSubiect) {
        this.cerintaSubiect = cerintaSubiect;
    }

    public List<Functie> getFunctii() {
        return functii;
    }

    public void setFunctii(List<Functie> functii) {
        this.functii = functii;
    }

    public List<VerificareRezultat> getVerificari() {
        return verificari;
    }

    public void setVerificari(List<VerificareRezultat> verificari) {
        this.verificari = verificari;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public int nrFunctiiExistente(String input) {
        int nrFunctii = 0;
        for (Functie functie : functii) {
            if (input.contains(functie.getDenumire())) {
                if (functie.getTipReturnat().equals("")
                        || input.contains(functie.getTipReturnat() + " " + functie.getDenumire())) {
                    nrFunctii++;
                }
            }
        }
        return nrFunctii;
    }

    public String verificareOutput(String inputFile, String sourceFile, Consola consola, String userCode) {
        String rezultat;
        String raspuns = "";
        int nrVerificariCorecte = 0;
        for (VerificareRezultat verificare : verificari) {
            try (PrintWriter writer = new PrintWriter(new File(inputFile))) {
                writer.print(verificare.getInput());
            } catch (Exception ex) {
                System.out.println(ex.toString());
            }
            consola.compile(userCode, sourceFile);
            rezultat = consola.result(sourceFile);
            if (rezultat.equals(verificare.getOutput())) {
                raspuns += "Pentru: " + verificare.getInput() + " avem raspuns corect: " + verificare.getOutput() + "\n";
                nrVerificariCorecte++;
            } else {
                raspuns += "Pentru: " + verificare.getInput() + " avem: " + rezultat + " in loc de: " + verificare.getOutput() + "\n";
            }
        }
        raspuns += "Total verificari corecte: " + nrVerificariCorecte + " din " + verificari.size();
        return raspuns;
    }

}

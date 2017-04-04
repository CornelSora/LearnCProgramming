package proiectLicenta.clase;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Subiect {

    private String denumireSubiect;
    private String cerintaSubiect;
    private List<Functie> functii;
    private List<VerificareRezultat> verificari;

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

    public String convertFunctiiToString() {
        StringBuilder functiiBuilder = new StringBuilder();
        this.functii.forEach((functie) -> {
            functiiBuilder.append(functie.getDenumire()).append(";")
                    .append(functie.getTipReturnat()).append(";");
        });
        return functiiBuilder.substring(0, functiiBuilder.length() - 1);
    }

    public String convertVerificariToString() {
        StringBuilder verificariBuilder = new StringBuilder();
        this.verificari.forEach((verificare) -> {
            verificariBuilder.append(verificare.getInput()).append(";")
                    .append(verificare.getOutput()).append(";");
        });
        return verificariBuilder.substring(0, verificariBuilder.length() - 1);
    }

    public void scriereInFisier() {
        try {
            try (FileWriter fisierProbleme = new FileWriter("Subiecte/Probleme.txt", true);
                    PrintWriter out = new PrintWriter(fisierProbleme)) {
                out.println("Denumire: " + this.denumireSubiect);
                out.println("Cerinta: " + this.cerintaSubiect);
                String functiiString = convertFunctiiToString();
                out.println("Functii: ");
                out.println(functiiString);
                out.println("Verificari: ");
                String verificariO = convertVerificariToString();
                out.println(verificariO);
                out.println("Finish");
            }
        } catch (IOException ex) {
            Logger.getLogger(Subiect.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void citireDinFisier() {
        try (BufferedReader reader = new BufferedReader(new FileReader("Subiecte/Probleme.txt"))) {
            StringBuilder readBuilder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                readBuilder.append(line).append("\n");
            }
            String[] rezultat = readBuilder.substring(0, readBuilder.length() - 1).split("Finish");
            System.out.println(rezultat);
        } catch (IOException ex) {
            Logger.getLogger(Subiect.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}

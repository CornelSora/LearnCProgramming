package proiectLicenta.clase;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

public class Exercitiu {

    private String denFisier;
    private StringBuilder enunt;

    public String getDenFisier() {
        return denFisier;
    }

    public void setDenFisier(String denFisier) {
        this.denFisier = denFisier;
    }

    public String getEnunt() {
        return enunt.toString();
    }

    public Exercitiu(String denFisier) {
        enunt = new StringBuilder();
        this.denFisier = denFisier;
    }

    public void citesteEnunt() {
        try {
            File f = new File("E:\\Programe\\Java\\Part1\\exercitiul1.txt");
            FileReader reader = new FileReader(f);
            try (BufferedReader in = new BufferedReader(reader)) {
                String rand = null;
                while ((rand = in.readLine()) != null) {
                    enunt.append(rand).append("\n");
                    System.out.println(rand);
                }
                in.close();
            }
            
        } catch (Exception ex) {
            System.out.println(ex + "\n" + "Eroare la citirea din fisier pentru: " + denFisier + "\n");
        }

    }

}

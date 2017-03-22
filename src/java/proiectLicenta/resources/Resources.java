package proiectLicenta.resources;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Resources {

    private String bibliotecaC;
    private String corpProgram;
    private String programRezultat;
    private String fileName;

    public String getBibliotecaC() {
        return bibliotecaC;
    }

    public void setBibliotecaC(String bibliotecaC) {
        this.bibliotecaC = bibliotecaC;
    }

    public String getCorpProgram() {
        return corpProgram;
    }

    public void setCorpProgram(String corpProgram) {
        this.corpProgram = corpProgram;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getProgramRezultat() {
        getResource();
        verificareFisier();
        return programRezultat;
    }

    private void getResource() {
        try {
            ResourceBundle resource = ResourceBundle.getBundle("strings");
            bibliotecaC = resource.getString("bibliotecaC");
            corpProgram = resource.getString("corpProgram");
            programRezultat = bibliotecaC + "\n" + corpProgram;
        } catch (Exception ex) {
            System.out.println(ex.toString());
        }
    }

    private void verificareFisier() {
        File file = new File(fileName + ".c");
        if (file.exists()) {
            FileReader reader = null;
            try {
                reader = new FileReader(file);
                try (BufferedReader in = new BufferedReader(reader)) {
                    String line = null;
                    StringBuilder sb = new StringBuilder();
                    while ((line = in.readLine()) != null) {
                        sb.append(line).append("\n");
                    }
                    if (!sb.toString().equals("")) {
                        programRezultat = sb.substring(0, sb.length() - 1);
                    }
                } catch (Exception ex) {
                    Logger.getLogger(Resources.class.getName()).log(Level.SEVERE, null, ex);
                }
            } catch (FileNotFoundException ex) {
                Logger.getLogger(Resources.class.getName()).log(Level.SEVERE, null, ex);
            } finally {
                try {
                    reader.close();
                } catch (IOException ex) {
                    Logger.getLogger(Resources.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        }
    }

}

package proiectLicenta.clase;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.Serializable;
import java.util.logging.Level;
import java.util.logging.Logger;

public class CodeTest implements Serializable{

    private String test;
    private String input;
    private String expectedOutput;
    private String id;

    public String getTest() {
        return test;
    }

    public void setTest(String test) {
        this.test = test;
    }

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public String getExpectedOutput() {
        return expectedOutput;
    }

    public void setExpectedOutput(String expectedOutput) {
        this.expectedOutput = expectedOutput;
    }

    public boolean isCorect(String output) {
        return expectedOutput.equals(output);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    
    
    public void initTheTest(String id) {
        int myId = Integer.parseInt(id);
        switch (myId) {
            case 1:
                test = "Suma numerelor";
                break;
            case 2:
                test = "Produsul numerelor";
                break;
            case 3:
                test = "Maximul din vector";
                break;
            case 4:
                test = "Minimul din vector";
                break;
            default:
                break;
        }
        File fisier = new File("inputs.txt");
        try {
            FileReader fileReader = new FileReader(fisier);
            try (BufferedReader reader = new BufferedReader(fileReader)) {
                String line = null;
                int i = 1;
                while ((line = reader.readLine()) != null) {
                    if (i == myId) {
                        String[] inputs = line.split(",");
                        PrintWriter pw = new PrintWriter("input.txt");
                        StringBuilder inputBuilder = new StringBuilder();
                        for (String in : inputs) {
                            pw.write(in.trim());
                            pw.write("\r\n");
                            inputBuilder.append(in.trim()).append(", ");
                        }
                        input = inputBuilder.toString().substring(0, inputBuilder.length() - 2);
                        pw.close();
                        break;
                    }
                    i++;
                }
            }
        } catch (FileNotFoundException ex) {
            Logger.getLogger(CodeTest.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(CodeTest.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        fisier = new File("outputs.txt");
        try {
            FileReader fileReader = new FileReader(fisier);
            try (BufferedReader reader = new BufferedReader(fileReader)) {
                String line = null;
                int i = 1;
                while ((line = reader.readLine()) != null) {
                    if (i == myId) {
                        expectedOutput = line;
                        break;
                    }
                    i++;
                }
            }
        } catch (FileNotFoundException ex) {
            Logger.getLogger(CodeTest.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(CodeTest.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

}

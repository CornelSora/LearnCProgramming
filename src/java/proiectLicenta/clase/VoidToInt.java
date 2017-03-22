package proiectLicenta.clase;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;

public class VoidToInt {

    private File f;

    public VoidToInt(File f) {
        this.f = f;
    }

    public File getF() {
        return f;
    }

    public void setF(File f) {
        this.f = f;
    }

    public void changeIt() {
        try {
            StringBuilder exFinal = new StringBuilder();
            exFinal.append("#include<string.h>").append("\n");
            FileInputStream fis = new FileInputStream(f);
            try (BufferedReader in = new BufferedReader(new InputStreamReader(fis))) {
                String line = null;
                while ((line = in.readLine()) != null) {
                    String replace = line.replace("void main()", "int main()");
                    if (replace != null) {
                        exFinal.append(replace).append("\n");
                    } else {
                        exFinal.append(line).append("\n");
                    }
                }
                String rez = exFinal.toString();
                PrintWriter pw = new PrintWriter(f);
                pw.write(rez);
                pw.close();
            }
        } catch (Exception ex) {
            System.out.println(ex.toString());
        }
    }
}

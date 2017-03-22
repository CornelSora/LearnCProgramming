package proiectLicenta.clase;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;

public class Debug {

    private String command;
    private String result = null;

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public void doIt() {
        Process p = null;
        try {
            p = Runtime.getRuntime().exec("cmd /C  Compilator\\MinGW64\\bin\\gdb.exe 1.exe");
            try (PrintWriter stdin = new PrintWriter(p.getOutputStream())) {
                stdin.flush();
                stdin.println(command);
                if (command.equals("run()")) {
                    try (BufferedReader bf = new BufferedReader(new InputStreamReader(p.getErrorStream()))) {
                        StringBuilder sb = new StringBuilder();
                        while ((result = bf.readLine()) != null) {
                            sb.append(result).append("\n");
                        }
                        result = sb.toString();
                    } catch (Exception e) {
                        System.out.println(e.toString());
                    }
                }
            }

        } catch (IOException e) {
            System.out.println(e.toString());
        }
    }
}

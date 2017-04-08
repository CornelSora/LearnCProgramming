package proiectLicenta.clase;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Consola {

    private Process process;
    private Process finali;
    private String winCommand;
    private String winExe;
    private String linuxComand;
    private String linuxOut;

    public Process getFinali() {
        return finali;
    }

    public void setFinali(Process finali) {
        this.finali = finali;
    }

    public Process getProcess() {
        return process;
    }

    public void setProcess(Process process) {
        this.process = process;
    }

    private void getResources() {
        ResourceBundle resource = ResourceBundle.getBundle("comenzi");
        winCommand = resource.getString("winCommand");
        winExe = resource.getString("winExe");
        linuxComand = resource.getString("linuxComand");
        linuxOut = " ";
    }

    public synchronized void scriereFisier(String info, String denumireFisier) {
        try (PrintWriter pw = new PrintWriter(denumireFisier + ".c")) {
            pw.write(info);
        } catch (Exception ex) {
            System.out.println(ex.toString());
        }
    }

    public synchronized String compile(String info, String denumireFisier) {
        getResources();
        String log = "";
        try {
            String s;
            scriereFisier(info, denumireFisier);
            System.out.println("Working Directory = "
                    + System.getProperty("user.dir"));

            if (System.getProperty("os.name").toLowerCase().contains("windows")) {
                process = Runtime.getRuntime().exec(
                        winCommand + denumireFisier + winExe + denumireFisier + ".c");
            } else {
                process = Runtime.getRuntime().exec(
                        linuxComand + denumireFisier + linuxOut + denumireFisier + ".c");
            }
            int finishCode = process.waitFor();
            System.out.println(finishCode);
            BufferedReader stdError = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            boolean error = false;
            while ((s = stdError.readLine()) != null) {
                log += s;
                error = true;
                log += "\n";
            }
            
            BufferedReader stdInput = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            while ((s = stdInput.readLine()) != null) {
                log += s;
                error = true;
                log += "\n";
            }

            if (!log.contains("error")) {
                log = "";
                error = false;
            }

            if (error == false) {
                log += "Compilation successful !!!";
                System.out.println(log);
            }
            process.destroy();
        } catch (IOException e) {
            System.out.println(e.toString());
        } catch (InterruptedException ex) {
            Logger.getLogger(Consola.class.getName()).log(Level.SEVERE, null, ex);
        }
        return log;
    }

    public synchronized String verifyCode(String denumireFisier) {
        getResources();
        String log = "";
        try {
            String s;
            String fileNameReal = denumireFisier.substring(denumireFisier.lastIndexOf("\\") + 1);

            if (System.getProperty("os.name").toLowerCase().contains("windows")) {
                process = Runtime.getRuntime().exec(
                        winCommand
                        + "temp" + winExe + fileNameReal);
            } else {
                process = Runtime.getRuntime().exec(
                        linuxComand
                        + "temp" + linuxOut + fileNameReal);
            }
            BufferedReader stdError = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            boolean error = false;
            while ((s = stdError.readLine()) != null) {
                if (s.contains("error") || s.equals("error")) {
                    log += "<span style=\"color:red\">" + s + "</span>";
                } else {
                    log += s;
                }

                error = true;
                log += "\n";
            }
            if (error == false) {
                log += "Compilation successful !!!";
            }
            process.destroy();
        } catch (IOException e) {
            System.out.println(e.toString());
        }
        return log;
    }

    public synchronized String result(String denumireFisier) {
        StringBuilder sb = new StringBuilder();
        try {
            if (System.getProperty("os.name").toLowerCase().contains("windows")) {
                finali = Runtime.getRuntime().exec(denumireFisier + ".exe");
            } else {
                finali = Runtime.getRuntime().exec("./" + denumireFisier);
            }
        
            BufferedReader bf = new BufferedReader(
                    new InputStreamReader(finali.getInputStream()));
            String line;
            
            while ((line = bf.readLine()) != null) {
                sb.append(line).append("\n");
            }
            
            bf.close();
            bf = new BufferedReader(
                    new InputStreamReader(finali.getErrorStream()));

            while ((line = bf.readLine()) != null) {
                sb.append(line).append("\n");
            }

            bf.close();

            finali.destroy();

            if (!"".equals(sb.toString())) {
                return sb.toString().substring(0, sb.length() - 1);
            }
        } catch (IOException ex) {
            System.out.println(ex.toString());
            return ex.toString();
        } catch (Error e) {
            System.out.println(e.toString());
        }
        return sb.toString();
    }
}

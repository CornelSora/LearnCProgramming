package proiectLicenta.clase;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.derby.jdbc.ClientDataSource;

public class BazaDeDate {

    private Connection con;
    private Statement statement = null;
    private ClientDataSource cs;
    private final String jdbcDriver = "com.mysql.jdbc.Driver";
    private final String dbURL = "jdbc:mysql://localhost/test";
    private final int portNumber = 1527;
    private final String user = "root";
    private final String password = "123456";
    boolean isStatementFree = true;
    boolean isConnectionFree = true;
    
    private static BazaDeDate instance = null;

    private BazaDeDate() {
    }
    
    public static BazaDeDate getInstance() {
        if (instance == null) {
            instance = new BazaDeDate();
        }
        return instance;
    }

    public synchronized void openConnection() throws SQLException {
        while (isConnectionFree == false) {
            try {
                wait();
            } catch (InterruptedException ex) {
                Logger.getLogger(BazaDeDate.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        isConnectionFree = false;
        notify();
        
        if (System.getProperty("os.name").toLowerCase().contains("windows")) {
            cs = new ClientDataSource();
            cs.setDatabaseName("sample");
            cs.setPortNumber(portNumber);
            cs.setServerName("localhost");
            cs.setUser("app");
            cs.setPassword("app");
            con = cs.getConnection();
            statement = con.createStatement();
        } else {
            try {
                Class.forName(jdbcDriver);
                con = DriverManager.getConnection(dbURL, user, password);
                statement = con.createStatement();
            } catch (ClassNotFoundException ex) {
                Logger.getLogger(BazaDeDate.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    public synchronized Statement getStatement() {
        while (isStatementFree == false) {
            try {
                wait();
            } catch (InterruptedException e) {
            }
        }
        isStatementFree = false;
        notify();
        return statement;
    }

    public synchronized void releaseStatement() {
        while (isStatementFree) {
            try {
                wait();
            } catch (InterruptedException e) {
            }
        }
        isStatementFree = true;
        notify();
    }

    public Connection getCon() {
        return con;
    }
    
    public void closeConnection() {
        try {
            con.close();
            isConnectionFree = true;
        } catch (Exception ex) {
            System.out.println(ex.toString());
        }
    }
}

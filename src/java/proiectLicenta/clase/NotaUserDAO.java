package proiectLicenta.clase;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class NotaUserDAO {
    
    private Statement st;
    private BazaDeDate bd;

    public NotaUserDAO() throws SQLException {
        if (bd == null) {
            bd = new BazaDeDate();
            bd.openConnection();
        }
    }

    //TO DO: introducere nota, denumire test. inserareNotaProfesor, inserareNotaAplicatie, idUser
    //clasa pentru: denumire test, functii necesare, input-output asteptat
    public void closeConnection() {
        if (bd != null) {
            bd.closeConnection();
        }
    }
    
}

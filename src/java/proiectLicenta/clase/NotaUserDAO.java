package proiectLicenta.clase;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class NotaUserDAO {

    private Statement st;
    private BazaDeDate bd;

    public NotaUserDAO() throws SQLException {
        if (bd == null) {
            bd = new BazaDeDate();
            bd.openConnection();
        }
    }

    public synchronized List<NotaUser> extragereNote() {
        List<NotaUser> noteStudenti = new ArrayList<>();
        try {
            st = bd.getStatement();
            String selectCommand = "SELECT * FROM NOTA";
            ResultSet rs = st.executeQuery(selectCommand);
            while (rs.next()) {
                int idUser = rs.getInt(1);
                int notaProfesor = rs.getInt(2);
                int notaAplicatie = rs.getInt(3);
                String denumireTest = rs.getString(4);
                NotaUser notaUser = new NotaUser();
                notaUser.setUserId(idUser);
                notaUser.setNotaProfesor(notaProfesor);
                notaUser.setNotaAplicatie(notaAplicatie);
                notaUser.setDenumireTest(denumireTest);
                noteStudenti.add(notaUser);
            }
        } catch (SQLException ex) {
            Logger.getLogger(NotaUserDAO.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            bd.releaseStatement();
        }
        return noteStudenti;
    }

    public synchronized int inserareNotaProfesor(int idUser, int nota_profesor, String denumire_test) {
        int i = -1;
        try {
            st = bd.getStatement();
            String selectCommand = "SELECT * FROM NOTA WHERE iduser=" + idUser;

            ResultSet rs = st.executeQuery(selectCommand);

            if (rs.next()) {
                String updateCommand = "UPDATE NOTA SET nota_profesor=" + nota_profesor + " WHERE iduser=" + idUser;
                st.executeUpdate(updateCommand);
            } else {
                String insertCommand = "INSERT INTO NOTA(nota_profesor, denumire_test) VALUES ("
                        + nota_profesor + ",'" + denumire_test + "'" + ")";
                st.executeUpdate(insertCommand);
            }

        } catch (SQLException ex) {
            Logger.getLogger(NotaUserDAO.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            bd.releaseStatement();
        }
        return i;
    }

    public synchronized int inserareNotaAplicatie(int idUser, int nota_aplicatie, String denumire_test) {
        int i = -1;
        try {
            st = bd.getStatement();
            String selectCommand = "SELECT * FROM NOTA WHERE iduser=" + idUser;

            ResultSet rs = st.executeQuery(selectCommand);

            if (rs.next()) {
                String updateCommand = "UPDATE NOTA SET nota_aplicatie=" + nota_aplicatie + " WHERE iduser=" + idUser;
                st.executeUpdate(updateCommand);
            } else {
                String insertCommand = "INSERT INTO NOTA(nota_aplicatie) VALUES ("
                        + nota_aplicatie + ",'" + denumire_test + "'" + ")";
                st.executeUpdate(insertCommand);
            }

        } catch (SQLException ex) {
            Logger.getLogger(NotaUserDAO.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            bd.releaseStatement();
        }
        return i;
    }

    //TO DO: introducere nota, denumire test. inserareNotaProfesor, inserareNotaAplicatie, idUser

    public void closeConnection() {
        if (bd != null) {
            bd.closeConnection();
        }
    }

}

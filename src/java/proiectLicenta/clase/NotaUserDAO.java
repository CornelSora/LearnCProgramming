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
            bd = BazaDeDate.getInstance();
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

    public synchronized int inserareNotaProfesor(NotaUser nota) {
        int i = -1;
        try {
            st = bd.getStatement();
            String selectCommand = "SELECT * FROM NOTA WHERE iduser=" + nota.getUserId();

            ResultSet rs = st.executeQuery(selectCommand);

            if (rs.next()) {
                String updateCommand = "UPDATE NOTA SET nota_profesor=" + nota.getNotaProfesor() 
                        + " WHERE iduser=" + nota.getUserId();
                st.executeUpdate(updateCommand);
            } else {
                String insertCommand = "INSERT INTO NOTA(iduser, nota_profesor, denumire_test) VALUES ("
                        + nota.getUserId() + "," + nota.getNotaProfesor() + ",'" + nota.getDenumireTest() + "'" + ")";
                st.executeUpdate(insertCommand);
            }

        } catch (SQLException ex) {
            Logger.getLogger(NotaUserDAO.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            bd.releaseStatement();
        }
        return i;
    }

    public synchronized int inserareNotaAplicatie(NotaUser nota) {
        int i = -1;
        try {
            st = bd.getStatement();
            String selectCommand = "SELECT * FROM NOTA WHERE iduser=" + nota.getUserId();

            ResultSet rs = st.executeQuery(selectCommand);

            if (rs.next()) {
                String updateCommand = "UPDATE NOTA SET nota_aplicatie=" + nota.getNotaAplicatie() 
                        + " AND raspuns_aplicatie='" + nota.getRaspunsAplicatie() + "'"
                        + " WHERE iduser=" + nota.getUserId();
                st.executeUpdate(updateCommand);
            } else {
                String insertCommand = "INSERT INTO NOTA(iduser, nota_aplicatie, denumire_test, raspuns_aplicatie) VALUES ("
                        + nota.getUserId() + nota.getNotaAplicatie() 
                        + ",'" + nota.getDenumireTest() + "'" + nota.getRaspunsAplicatie() + "'" + ")";
                st.executeUpdate(insertCommand);
            }

        } catch (SQLException ex) {
            Logger.getLogger(NotaUserDAO.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            bd.releaseStatement();
        }
        return i;
    }

    public void closeConnection() {
        if (bd != null) {
            bd.closeConnection();
        }
    }

}

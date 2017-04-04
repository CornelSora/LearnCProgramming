package proiectLicenta.clase;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class SubiectDAO {

    private Statement st;
    private BazaDeDate bd;

    public SubiectDAO() {
        if (bd == null) {
            try {
                bd = BazaDeDate.getInstance();
                bd.openConnection();
            } catch (SQLException ex) {
                Logger.getLogger(SubiectDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    public synchronized List<NotaUser> extragereSubiecte() {
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

    public synchronized void inserareSubiect(Subiect subiect) {
        try {
            st = bd.getStatement();
            String selectMaxIdCommand = "SELECT max(IDPROBLEMA) FROM PROBLEMA";
            int id = 1;
            ResultSet rs = st.executeQuery(selectMaxIdCommand);
            if (rs.next()) {
                id = rs.getInt(1) + 1;
            }
            String insertProblemaCommand = "INSERT INTO PROBLEMA(IDPROBLEMA, DENUMIRE, CERINTA) VALUES ("
                    + id + ",'" + subiect.getDenumireSubiect() + "','" + subiect.getCerintaSubiect() + "'" + ")";
            st.executeUpdate(insertProblemaCommand);
            String insertFunctieCommand;

            for (Functie functie : subiect.getFunctii()) {
                insertFunctieCommand = "INSERT INTO FUNCTIE(IDPROBLEMA, DENUMIRE, TIPRETURNAT) VALUES ("
                        + id + ",'" + functie.getDenumire() + "','" + functie.getTipReturnat() + "'" + ")";
                st.executeUpdate(insertFunctieCommand);
            }

            String insertVerificareCommand;
            for (VerificareRezultat verificare : subiect.getVerificari()) {
                insertVerificareCommand = "INSERT INTO VERIFICARI(IDPROBLEMA, INPUTTEXT, OUTPUTTEXT) VALUES ("
                        + id + ",'" + verificare.getInput() + "','" + verificare.getOutput() + "'" + ")";
                st.executeUpdate(insertVerificareCommand);
            }

        } catch (Exception ex) {
            System.out.println(ex.toString());
        } finally {
            bd.releaseStatement();
        }
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

    public void closeConnection() {
        if (bd != null) {
            bd.closeConnection();
        }
    }

}

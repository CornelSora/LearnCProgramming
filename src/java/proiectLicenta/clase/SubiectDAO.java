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

    public synchronized List<Subiect> extragereSubiecte() {
        List<Subiect> subiecte = new ArrayList<>();
        try {
            st = bd.getStatement();
            String selectCommand = "SELECT * FROM PROBLEMA";
            ResultSet rs = st.executeQuery(selectCommand);
            while (rs.next()) {
                int idProblema = rs.getInt(1);
                String denumire = rs.getString(2);
                String cerinta = rs.getString(3);
                String autor = rs.getString(4);
                List<Functie> functii = new ArrayList<>();
                String selectFunctieCommand = "SELECT * FROM FUNCTIE WHERE IDPROBLEMA=" + idProblema;
                Statement newSt = bd.getCon().createStatement();
                ResultSet rsFunctii = newSt.executeQuery(selectFunctieCommand);
                while (rsFunctii.next()) {
                    Functie functie = new Functie();
                    functie.setDenumire(rsFunctii.getString(2));
                    functie.setTipReturnat(rsFunctii.getString(3));
                    functii.add(functie);
                }
                
                List<VerificareRezultat> verificari = new ArrayList<>();
                String selectVerificariCommand = "SELECT * FROM VERIFICARI WHERE IDPROBLEMA=" + idProblema;
                ResultSet rsVerificari = newSt.executeQuery(selectVerificariCommand);
                while(rsVerificari.next()) {
                    VerificareRezultat verif = new VerificareRezultat();
                    verif.setInput(rsVerificari.getString(2));
                    verif.setOutput(rsVerificari.getString(3));
                    verificari.add(verif);
                }
                newSt.close();
                Subiect subiect = new Subiect();
                subiect.setDenumireSubiect(denumire);
                subiect.setCerintaSubiect(cerinta);
                subiect.setFunctii(functii);
                subiect.setVerificari(verificari);
                subiect.setAutor(autor);
                //subiect.setId(subiecte.size());
                subiecte.add(subiect);
            }
        } catch (SQLException ex) {
            Logger.getLogger(NotaUserDAO.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            bd.releaseStatement();
        }
        return subiecte;
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
            String insertProblemaCommand = "INSERT INTO PROBLEMA(IDPROBLEMA, DENUMIRE, CERINTA, AUTOR) VALUES ("
                    + id + ",'" + subiect.getDenumireSubiect() + "','" + subiect.getCerintaSubiect()
                    + "','" + subiect.getAutor()+ "'" + ")";
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

    public void closeConnection() {
        if (bd != null) {
            bd.closeConnection();
        }
    }

}

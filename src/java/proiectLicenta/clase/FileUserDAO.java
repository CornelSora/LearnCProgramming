package proiectLicenta.clase;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class FileUserDAO {

    private BazaDeDate bd;
    private Statement st;

    public FileUserDAO() {
        try {
            if (bd == null) {
                bd = new BazaDeDate();
                bd.openConnection();
            }
        } catch (SQLException ex) {
            Logger.getLogger(FileUserDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public int addFile(FileUser file) {
        int i = 0;
        st = bd.getStatement();
        try {
            i = st.executeUpdate("insert into fileusers(iduser, numefisier) values ("
                    + file.getUserId() + ",'" + file.getFileName() + "'" + ")");
        } catch (Exception ex) {
            System.out.println(ex.toString());
        } finally {
            bd.releaseStatement();
        }
        return i;
    }

    public boolean getFileByNameAndId(int userId, String fileName) {
        st = bd.getStatement();
        ResultSet rs = null;
        try {
            rs = st.executeQuery("select * from fileusers WHERE iduser=" + userId + " AND numefisier='" + fileName + "'");
            if (rs.next()) {
                return true;
            }
        } catch (Exception ex) {
            System.out.println(ex.toString());
        } finally {
            bd.releaseStatement();
        }
        return false;
    }

    public List<String> getFilesById(int userId) {
        List<String> listaFisiere = new ArrayList<>();
        st = bd.getStatement();
        ResultSet rs = null;
        try {
            rs = st.executeQuery("select * from fileusers WHERE iduser=" + userId);
            while (rs.next()) {
                String denumireFisier = rs.getString(2);
                listaFisiere.add(denumireFisier);
            }
        } catch (Exception ex) {
            System.out.println(ex.toString());
        } finally {
            bd.releaseStatement();
        }
        return listaFisiere;
    }

    public int getFileByName(String fileName) {
        int userId = 0;
        st = bd.getStatement();
        try {
            ResultSet rs = null;
            rs = st.executeQuery("select * from fileusers WHERE numefisier='" + fileName + "'");
            if (rs.next()) {
                userId = rs.getInt("IDUSER");
            }
        } catch (Exception ex) {
            System.out.println(ex.toString());
        } finally {
            bd.releaseStatement();
        }
        return userId;
    }

    public void deleteFile(int userId, String fileName) {
        st = bd.getStatement();
        try {
            st.executeUpdate("DELETE from fileusers WHERE iduser=" + userId + " AND numefisier='" + fileName + "'");
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

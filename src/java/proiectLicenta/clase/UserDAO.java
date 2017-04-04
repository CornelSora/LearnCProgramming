package proiectLicenta.clase;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class UserDAO {

    private Statement st;
    private BazaDeDate bd;

    public UserDAO() throws SQLException {
        if (bd == null) {
            bd = BazaDeDate.getInstance();
            bd.openConnection();
        }
    }

    public synchronized int addUser(User user) throws SQLException {
        st = bd.getStatement();
        ResultSet rs = null;
        String selectCommand = "SELECT max(id) FROM accounts";
        int i = -1;
        try {
            rs = st.executeQuery(selectCommand);
            int max = 0;
            if (rs.next()) {
                max = rs.getInt(1) + 1;
            }
            String tip;
            tip = user.getTip().toString();
            String insertCommand = "insert into accounts(id, nume, prenume, username, parola, email, tiputilizator) values ("
                    + max + ",'" + user.getNume() + "','" + user.getPrenume() + "','" + user.getUsername()
                    + "','" + user.getParola() + "','" + user.getEmail() + "','" + user.getTip().toString().toLowerCase() + "'" + ")";
            i = st.executeUpdate(insertCommand);
        } catch (Exception ex) {
            System.out.println(ex.toString());
        } finally {
            bd.releaseStatement();
        }
        return i;
    }

    public synchronized List<User> getAllUsers() throws SQLException {
        List<User> users = new ArrayList<>();
        st = bd.getStatement();
        ResultSet rs = null;
        try {
            rs = st.executeQuery("select * from accounts");
            while (rs.next()) {
                User user = new User();
                user.setId(rs.getInt("ID"));
                user.setNume(rs.getString("NUME"));
                user.setPrenume(rs.getString("PRENUME"));
                user.setUsername(rs.getString("USERNAME"));
                user.setParola(rs.getString("PAROLA"));
                user.setEmail(rs.getString("EMAIL"));
                users.add(user);
            }
        } catch (Exception ex) {
            System.out.println(ex.toString());
        } finally {
            bd.releaseStatement();
        }
        return users;
    }

    public User getUserById(int id) throws SQLException {
        st = bd.getStatement();
        ResultSet rs = null;
        User user = null;
        try {
            rs = st.executeQuery("select * from accounts WHERE id=" + id);
            if (rs.next()) {
                user = new User();
                user.setId(rs.getInt("ID"));
                user.setNume(rs.getString("NUME"));
                user.setPrenume(rs.getString("PRENUME"));
                user.setUsername(rs.getString("USERNAME"));
                user.setParola(rs.getString("PAROLA"));
                user.setEmail(rs.getString("EMAIL"));
                user.setTip(rs.getString("TIPUTILIZATOR"));
            }
        } catch (Exception ex) {
            System.out.println(ex.toString());
        } finally {
            bd.releaseStatement();
        }
        return user;
    }

    public User getUserByUname(String username) throws SQLException {
        st = bd.getStatement();
        ResultSet rs = null;
        User user = null;
        try {
            rs = st.executeQuery("select * from accounts WHERE USERNAME='" + username + "'");
            if (rs.next()) {
                user = new User();
                user.setId(rs.getInt("ID"));
                user.setNume(rs.getString("NUME"));
                user.setPrenume(rs.getString("PRENUME"));
                user.setUsername(rs.getString("USERNAME"));
                user.setParola(rs.getString("PAROLA"));
                user.setEmail(rs.getString("EMAIL"));
                user.setTip(rs.getString("TIPUTILIZATOR"));
            }
        } catch (Exception ex) {
            System.out.println(ex.toString());
        } finally {
            bd.releaseStatement();
        }
        return user;
    }
    
    public List<User> getAllStudents() throws SQLException {
        st = bd.getStatement();
        ResultSet rs = null;
        List<User> users = new ArrayList<>();
        try {
            rs = st.executeQuery("select * from accounts WHERE tiputilizator=" + "'student'");
            while (rs.next()) {
                User user = new User();
                user.setId(rs.getInt("ID"));
                user.setNume(rs.getString("NUME"));
                user.setPrenume(rs.getString("PRENUME"));
                user.setUsername(rs.getString("USERNAME"));
                user.setParola(rs.getString("PAROLA"));
                user.setEmail(rs.getString("EMAIL"));
                user.setTip(rs.getString("TIPUTILIZATOR"));
                users.add(user);
            }
        } catch (Exception ex) {
            System.out.println(ex.toString());
        } finally {
            bd.releaseStatement();
        }
        return users;
    }


    public void updateUser(int id, String pass) throws SQLException {
        Statement st = bd.getStatement();
        try {
            st.executeUpdate("UPDATE ACCOUNTS SET PAROLA='" + pass + "' WHERE ID='" + id + "'");
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

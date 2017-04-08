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
        ResultSet rs;
        String selectCommand = "SELECT max(id) FROM accounts";
        int i = -1;
        try {
            rs = st.executeQuery(selectCommand);
            int max = 0;
            if (rs.next()) {
                max = rs.getInt(1) + 1;
            }
            String insertCommand = "insert into accounts(id, nume, prenume, username, parola, email, tiputilizator, profesor) values ("
                    + max + ",'" + user.getNume() + "','" + user.getPrenume() + "','" + user.getUsername()
                    + "','" + user.getParola() + "','" + user.getEmail() + "','" + user.getTip().toString().toLowerCase() + "','"
                    + user.getProfesor() + "'" + ")";
            i = st.executeUpdate(insertCommand);
        } catch (SQLException ex) {
            System.out.println(ex.toString());
        } finally {
            bd.releaseStatement();
        }
        return i;
    }

    public synchronized List<User> getAllUsers() throws SQLException {
        List<User> users = new ArrayList<>();
        st = bd.getStatement();
        ResultSet rs;
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
                String tip = rs.getString("TIPUTILIZATOR");
                user.setTip(tip);
                if (tip.toLowerCase().equals("student")) {
                    user.setProfesor(rs.getString("PROFESOR"));
                }
                users.add(user);
            }
        } catch (SQLException ex) {
            System.out.println(ex.toString());
        } finally {
            bd.releaseStatement();
        }
        return users;
    }

    public User getUserById(int id) throws SQLException {
        st = bd.getStatement();
        ResultSet rs;
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
                String tip = rs.getString("TIPUTILIZATOR");
                user.setTip(tip);
                if (tip.toLowerCase().equals("student")) {
                    user.setProfesor(rs.getString("PROFESOR"));
                }
            }
        } catch (SQLException ex) {
            System.out.println(ex.toString());
        } finally {
            bd.releaseStatement();
        }
        return user;
    }

    public User getUserByUname(String username) throws SQLException {
        st = bd.getStatement();
        ResultSet rs;
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
                String tip = rs.getString("TIPUTILIZATOR");
                user.setTip(tip);
                if (tip.toLowerCase().equals("student")) {
                    user.setProfesor(rs.getString("PROFESOR"));
                }
            }
        } catch (SQLException ex) {
            System.out.println(ex.toString());
        } finally {
            bd.releaseStatement();
        }
        return user;
    }

    public List<User> getAllStudents(String profesor) throws SQLException {
        st = bd.getStatement();
        ResultSet rs;
        List<User> users = new ArrayList<>();
        try {
            rs = st.executeQuery("select * from accounts WHERE tiputilizator=" + "'student'" + " AND PROFESOR='" + profesor + "'");
            while (rs.next()) {
                User user = new User();
                user.setId(rs.getInt("ID"));
                user.setNume(rs.getString("NUME"));
                user.setPrenume(rs.getString("PRENUME"));
                user.setUsername(rs.getString("USERNAME"));
                user.setParola(rs.getString("PAROLA"));
                user.setEmail(rs.getString("EMAIL"));
                user.setTip(rs.getString("TIPUTILIZATOR"));
                user.setProfesor(rs.getString("PROFESOR"));
                users.add(user);
            }
        } catch (SQLException ex) {
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
        } catch (SQLException ex) {
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

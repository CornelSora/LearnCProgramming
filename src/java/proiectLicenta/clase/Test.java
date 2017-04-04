package proiectLicenta.clase;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class Test {

    private List<Intrebare> intrebari;

    public List<Intrebare> getIntrebari() {
        return intrebari;
    }

    public void setIntrebari(List<Intrebare> intrebari) {
        this.intrebari = intrebari;
    }

    public void initIntrebari() throws SQLException {
        intrebari = new ArrayList<>();
        BazaDeDate bd = BazaDeDate.getInstance();
        bd.openConnection();
        Statement st = bd.getStatement();
        ResultSet rs;
        try {
            rs = st.executeQuery("SELECT * FROM INTREBARI");
            while (rs.next()) {
                String textIntrebare = rs.getString(1);
                String raspunsCorect = rs.getString(2);
                String raspuns1 = rs.getString(3);
                String raspuns2 = rs.getString(4);
                String raspuns3 = rs.getString(5);
                List<String> raspunsuri = new ArrayList();
                raspunsuri.add(raspuns1);
                raspunsuri.add(raspuns2);
                raspunsuri.add(raspuns3);
                raspunsuri.add(raspunsCorect);
                Intrebare intr = new Intrebare(textIntrebare, raspunsCorect, raspunsuri);
                intrebari.add(intr);
            }
        } catch (Exception ex) {
            System.out.println(ex.toString());
        } finally {
            bd.releaseStatement();
            bd.closeConnection();
        }
    }
}

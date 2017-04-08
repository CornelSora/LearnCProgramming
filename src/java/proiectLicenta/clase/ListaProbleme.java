package proiectLicenta.clase;

import java.util.ArrayList;
import java.util.List;

public class ListaProbleme {

    private static List<Subiect> teste = new ArrayList<>();
    private static List<Subiect> listaProblemeProfesori = new ArrayList<>();
    private static List<Subiect> listaProblemeExercitiu = new ArrayList<>();
    private static List<Subiect> listaProbleme = new ArrayList<>();

    private ListaProbleme() {

    }

    public static List<Subiect> getListaProblemeExercitiu() {
        return listaProblemeExercitiu;
    }

    public static List<Subiect> getListaProblemeProfesori() {
        return listaProblemeProfesori;
    }

    public static List<Subiect> getTeste() {
        return teste;
    }

    public static void initializareLista() {
        if (listaProbleme.isEmpty()) {
            SubiectDAO subiectDAO = null;
            try {
                subiectDAO = new SubiectDAO();
                listaProbleme = subiectDAO.extragereSubiecte();
                for (Subiect subiect : listaProbleme) {
                    if (subiect.getAutor() != null && !subiect.getAutor().equals("")) {
                        if (!subiect.getDenumireSubiect().toLowerCase().equals("test")) {
                            subiect.setId(listaProblemeProfesori.size());
                            listaProblemeProfesori.add(subiect);
                        } else {
                            Subiect test = new Subiect();
                            test.setAutor(subiect.getAutor());
                            test.setCerintaSubiect(subiect.getCerintaSubiect());
                            test.setDenumireSubiect(subiect.getDenumireSubiect());
                            test.setId(subiect.getId());
                            List<Functie> functii = new ArrayList<>();
                            for (Functie f : subiect.getFunctii()) {
                                functii.add(f);
                            }
                            test.setFunctii(functii);
                            List<VerificareRezultat> verificari = new ArrayList<>();
                            for (VerificareRezultat verificare : subiect.getVerificari()) {
                                verificari.add(verificare);
                            }
                            test.setVerificari(verificari);
                            teste.add(test);
                        }
                    } else {
                        subiect.setId(listaProblemeExercitiu.size());
                        listaProblemeExercitiu.add(subiect);
                    }
                }
            } catch (Exception ex) {
                System.out.println(ex.toString());
            } finally {
                if (subiectDAO != null) {
                    subiectDAO.closeConnection();
                }
            }
        }
    }
}

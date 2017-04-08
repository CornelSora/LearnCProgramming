package protectLicenta.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import proiectLicenta.clase.Functie;
import proiectLicenta.clase.ListaProbleme;
import proiectLicenta.clase.Subiect;
import proiectLicenta.clase.SubiectDAO;
import proiectLicenta.clase.User;
import proiectLicenta.clase.VerificareRezultat;

@WebServlet(name = "testareAutomataDate", urlPatterns = {"/testareAutomataDate"})
public class testareAutomataDate extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            out.println("Se incarca datele...");
            response.sendRedirect("MenuApp/IntroducereTest.jsp");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String denumireProblema = request.getParameter("denumireProblema");
        String cerintaProblema = request.getParameter("cerintaProblema");
        String tipProblema = request.getParameter("tipProblema");
        List<Functie> functii = new ArrayList<>();
        for (int i = 0; i < 20; i++) {
            if (request.getParameter("denumireFunctie" + i) != null) {
                String denumireFunctie = request.getParameter("denumireFunctie" + i);
                String tipReturnat = request.getParameter("tipReturnat" + i);
                Functie functie = new Functie();
                functie.setDenumire(denumireFunctie);
                functie.setTipReturnat(tipReturnat);
                functii.add(functie);
            } else {
                i = 20;
            }
        }

        List<VerificareRezultat> verificareRezultate = new ArrayList<>();
        VerificareRezultat verif;
        for (int i = 0; i < 20; i++) {
            if (request.getParameter("Input" + i) != null) {
                String input = request.getParameter("Input" + i);
                String output = request.getParameter("Output" + i);
                verif = new VerificareRezultat();
                verif.setInput(input);
                verif.setOutput(output);
                verificareRezultate.add(verif);
            } else {
                i = 20;
            }
        }
        HttpSession session = request.getSession();
        String profesorUName = session.getAttribute("userPath").toString();

        Subiect subiect = new Subiect();
        subiect.setDenumireSubiect(denumireProblema);
        subiect.setCerintaSubiect(cerintaProblema);
        subiect.setFunctii(functii);
        subiect.setVerificari(verificareRezultate);
        subiect.setAutor(profesorUName);
        try {
            SubiectDAO subiectDAO = new SubiectDAO();
            if (tipProblema.toLowerCase().equals("test")) {
                for (Subiect s : ListaProbleme.getTeste()) {
                    if (s.getAutor().toLowerCase().equals(profesorUName)
                            && s.getDenumireSubiect().toLowerCase().equals("test")) {
                        ListaProbleme.getTeste().remove(s);
                    }
                }
                subiect.setDenumireSubiect("test");
                ListaProbleme.getTeste().add(subiect);
            } else {
                if (tipProblema.toLowerCase().equals("tema")) {
                    ListaProbleme.getListaProblemeProfesori().add(subiect);
                } else {
                    ListaProbleme.getListaProblemeExercitiu().add(subiect);
                    subiect.setAutor("");
                }
            }
            subiectDAO.inserareSubiect(subiect);
            subiectDAO.closeConnection();
        } catch (Exception ex) {
            System.out.println(ex.toString());
        }
        processRequest(request, response);

    }

}

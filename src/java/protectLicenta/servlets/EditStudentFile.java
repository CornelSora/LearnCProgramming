/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package protectLicenta.servlets;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import proiectLicenta.clase.FileUserDAO;

/**
 *
 * @author Cornel
 */
@WebServlet(name = "EditStudentFile", urlPatterns = {"/EditStudentFile"})
public class EditStudentFile extends HttpServlet {

    private String studentName;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        response.sendRedirect("/ProiectLicenta/MenuApp/SituatieStudenti.jsp?student=" + studentName);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String button = request.getParameter("button");
        String[] buttonInputs = button.split(",");
        String comanda = buttonInputs[0];
        String fileName = buttonInputs[1];
        String continut = request.getParameter(fileName);
        studentName = request.getParameter("studentName");
        String userPath = null;

        if (System.getProperty("os.name").toLowerCase().contains("windows")) {
            userPath = "Conturi\\" + studentName + "\\";
            try (PrintWriter pw = new PrintWriter(userPath + "\\" + fileName)) {
                pw.write(continut);
            }
        } else {
            userPath = "Conturi/" + studentName + "/";
            try (PrintWriter pw = new PrintWriter(userPath + "/" + fileName)) {
                pw.write(continut);
            }
        }
        processRequest(request, response);
    }

}

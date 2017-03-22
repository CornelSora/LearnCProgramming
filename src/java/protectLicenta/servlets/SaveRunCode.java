/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package protectLicenta.servlets;

import java.io.IOException;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import proiectLicenta.clase.Consola;
import proiectLicenta.clase.User;
import proiectLicenta.clase.UserDAO;

/**
 *
 * @author Cornel
 */
@WebServlet(name = "SaveRunCode", urlPatterns = {"/SaveRunCode"})
public class SaveRunCode extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
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
        String consola = request.getParameter("console");
        
        if ("Save".equals(button)) {
            try {
                Consola c = new Consola();
                UserDAO userDAO = new UserDAO();
                HttpSession session = request.getSession();
                int id = Integer.parseInt(session.getAttribute("userid").toString());
                User userActual = userDAO.getUserById(id);
                String fileName = userActual.getUsername();
                c.scriereFisier(consola, fileName);
            } catch (SQLException ex) {
                Logger.getLogger(SaveRunCode.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else {
            request.getRequestDispatcher("MenuApp/ConsoleExerciseResult.jsp").forward(request, response);
        }
    }

}

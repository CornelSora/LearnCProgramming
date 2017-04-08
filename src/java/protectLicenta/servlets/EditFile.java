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
import javax.servlet.http.HttpSession;
import proiectLicenta.clase.FileUserDAO;

@WebServlet(name = "EditFile", urlPatterns = {"/EditFile"})
public class EditFile extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        HttpSession session = request.getSession();
        if (session.getAttribute("id") != null && !session.getAttribute("id").toString().equals("")) {
            String id = session.getAttribute("id").toString();
            response.sendRedirect("/ProiectLicenta/MenuApp/ConsoleRun.jsp?id=" + id);
        } else {
            response.sendRedirect("/ProiectLicenta/MenuApp/StudentTest.jsp");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession();
        String button = request.getParameter("button");
        String[] buttonInputs = button.split(",");
        String comanda = buttonInputs[0];
        String fileName = buttonInputs[1];
        String continut = request.getParameter(fileName);
        int userId = (int) session.getAttribute("userid");
        String userPath = null;
        if (System.getProperty("os.name").toLowerCase().contains("windows")) {
            userPath = "Conturi\\" + session.getAttribute("userPath").toString();
        } else {
            userPath = "Conturi/" + session.getAttribute("userPath").toString();
        }
        if (comanda.equals("Edit") && continut != null) {
            if (System.getProperty("os.name").toLowerCase().contains("windows")) {
                try (PrintWriter pw = new PrintWriter(userPath + "\\" + fileName)) {
                    pw.write(continut);
                }
            } else {
                try (PrintWriter pw = new PrintWriter(userPath + "/" + fileName)) {
                    pw.write(continut);
                }
            }

        } else if (comanda.equals("Delete")) {
            FileUserDAO fileUserDAO = null;
            try {
                fileUserDAO = new FileUserDAO();
                fileUserDAO.deleteFile(userId, fileName);
                File deleteFile = null;
                if (System.getProperty("os.name").toLowerCase().contains("windows")) {
                    deleteFile = new File(userPath + "\\" + fileName);
                } else {
                    deleteFile = new File(userPath + "/" + fileName);
                }
                deleteFile.delete();
            } catch (Exception ex) {
                System.out.println(ex.toString());
            } finally {
                if (fileUserDAO != null) {
                    fileUserDAO.closeConnection();
                }
            }
        }
        processRequest(request, response);
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

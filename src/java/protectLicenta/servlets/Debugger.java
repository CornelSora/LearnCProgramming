/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package protectLicenta.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import proiectLicenta.clase.Debug;

/**
 *
 * @author Cornel
 */
@WebServlet(name = "Debugger", urlPatterns = {"/Debugger"})
public class Debugger extends HttpServlet {

    private String line;
    private Debug debugger;
    
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet Debugger</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Debugger at " + line + "</h1>");
            out.println("</body>");
            out.println("</html>");
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
        line = request.getParameter("btnDebug");
        String linie;
        debugger = new Debug();
        
        debugger.setCommand("run()");
        debugger.doIt();
        linie = debugger.getResult();
        System.out.println(linie);
        String ceva;
        ceva = "aahsa";
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

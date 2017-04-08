<%-- 
    Document   : login
    Created on : Oct 7, 2016, 12:19:01 PM
    Author     : corne
--%>
<%@page import="java.io.File"%>
<%@page import="proiectLicenta.clase.UserDAO"%>
<%@page import="proiectLicenta.clase.User"%>
<%@page import="proiectLicenta.clase.BazaDeDate"%>
<%@page import="org.apache.derby.jdbc.ClientDataSource"%>
<%@ page import ="java.sql.*" %>


<br>
<%
    String userName = request.getParameter("uname");
    String pwd = request.getParameter("password");
    UserDAO userDAO = null;
    User user = null;
    try {
        userDAO = new UserDAO();
        user = userDAO.getUserByUname(userName.toLowerCase());
        if (user != null && user.getParola().equals(pwd)) {
            int id = user.getId();
            session.setAttribute("userid", id);
            session.setAttribute("userPath", userName.toLowerCase());
            if (user.isProfesor()) {
                session.setAttribute("tip", "profesor");
            } else if (user.isStudent()) {
                session.setAttribute("tip", "student");
            } else {
                session.setAttribute("tip", "oarecare");
            }
            (new File("Conturi")).mkdir();
            if (System.getProperty("os.name").toLowerCase().contains("windows")) {
                (new File("Conturi\\" + userName)).mkdir();
            } else {
                (new File("Conturi/" + userName.toLowerCase())).mkdir();
            }
            response.sendRedirect("../MenuApp/menu.jsp");
        } else {
            session.setAttribute("error", "contInexistent");
            response.sendRedirect("../index.jsp");
        }
    } catch (Exception ex) {
        out.println(ex.toString());
    } finally {
        if (userDAO != null) {
            userDAO.closeConnection();
        }
    }
%>



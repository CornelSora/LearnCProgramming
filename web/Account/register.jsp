<%-- 
    Document   : register
    Created on : Oct 23, 2016, 9:32:12 PM
    Author     : corne
--%>

<%@page import="proiectLicenta.clase.User"%>
<%@page import="proiectLicenta.clase.UserDAO"%>
<%@page import="proiectLicenta.clase.BazaDeDate"%>
<%@page import="org.apache.derby.jdbc.ClientDataSource"%>
<%@ page import ="java.sql.*" %>
<%
    String nume = request.getParameter("Nume");
    String prenume = request.getParameter("Prenume");
    String username = request.getParameter("uname");
    String parola = request.getParameter("password");
    String email = request.getParameter("email");
    String tipUtil = request.getParameter("tipUtil");
    String coordonator = request.getParameter("coordonator");
    UserDAO userDAO = null;
    User user = null;
    try {
        userDAO = new UserDAO();
        user = userDAO.getUserByUname(username);

        if (user != null) { //  && user.getParola().compareTo(parola) == 0
            response.sendRedirect("../index.jsp");
            session.setAttribute("error", "contExistent");
        } else {
            User newUser = new User();
            newUser.setNume(nume);
            newUser.setPrenume(prenume);
            newUser.setUsername(username.toLowerCase());
            newUser.setParola(parola);
            newUser.setEmail(email);
            newUser.setTip(tipUtil);
            newUser.setProfesor(coordonator);
            int i = userDAO.addUser(newUser);
            if (i > 0) {
                response.sendRedirect("succesReg.jsp");
            } else {
                session.setAttribute("error", "Ne pare rau, dar am intampinat o eroare! Incercati din nou");
                response.sendRedirect("../index.jsp");
            }
        }
    } catch (Exception ex) {
        out.println(ex.toString());
    } finally {
        if (userDAO != null) {
            userDAO.closeConnection();
        }
    }
%>

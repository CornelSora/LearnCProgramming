<%-- 
    Document   : VerifNewPass
    Created on : Oct 30, 2016, 3:48:43 PM
    Author     : corne
--%>

<%@page import="proiectLicenta.clase.User"%>
<%@page import="proiectLicenta.clase.UserDAO"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="proiectLicenta.clase.BazaDeDate"%>
<%@page import="java.sql.Connection"%>
<%
    String userName = request.getParameter("uname");
    String email = request.getParameter("email");
    String pass = request.getParameter("password");
    UserDAO userDAO = new UserDAO();
    User user = userDAO.getUserByUname(userName);
    if (user == null || user.getEmail().compareTo(email) != 0) {
        session.setAttribute("error", "Eroare la schimbarea parolei");
        //TO DO MESAJ EROARE
    } else {
        userDAO.updateUser(user.getId(), pass);
        response.sendRedirect("succesReg.jsp");
    }
%>
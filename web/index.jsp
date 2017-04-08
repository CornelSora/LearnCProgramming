<%-- 
    Document   : index
    Created on : Oct 23, 2016, 8:38:54 PM
    Author     : corne
--%>

<%@page import="proiectLicenta.clase.BazaDeDate"%>
<%
    String error = null;
    try {
        error = session.getAttribute("error").toString();
    } catch (Exception ex) {
        System.out.println(ex.toString());
    }
%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="css/customStyle.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="js/validate.js"></script>
        <script src="js/jquery.js"></script>
        <title>Learn C Programming</title>
    </head>
    <body>
        <div class="container">
            <div class="info">
            </div>
        </div> 

        <div class="form">
            <div class="thumbnail"><img src="http://images.clipartpanda.com/laptop-png-laptop1.png"/></div>
            <form action="Account/register.jsp" method="POST" onsubmit="return validateRegister()" class="register-form">

                <% if (error != null && error.equals("contExistent")) {
                        session.setAttribute("error", null);
                %>
                <div class="alert alert-danger" role="alert" id="UsernameExistent">
                    Cont introdus exista deja!
                </div>
                <%} else {
                    session.setAttribute("error", null); %>
                <script>
                    var idDivEroare = document.getElementById("UsernameExistent");
                    if (idDivEroare !== null) {
                        idDivEroare.style.display = 'none';
                    }
                </script>
                <%}%>
                <center><h3>Register</h3></center>
                <input type="text" id="numeId" name="Nume" placeholder="Nume" autocomplete="off"/>
                <input type="text" id="prenumeId" name="Prenume" placeholder="Prenume"/>
                <input type="text" id="unameId" name="uname" placeholder="Username*"/>
                <input type="password" id="passId" name="password" placeholder="Parola*"/>
                <input type="password" id="passId2" name="password2" placeholder="Parola*"/>
                <input type="email" id="emailId" name="email" placeholder="Email address"/>
                <input type="text" id="coordonatorId" name="coordonator" placeholder="Profesor coordonator"/>
                <div class="form-group" >
                    <label for="tipUtil">Tip utilizator:</label>
                    <select class="form-control" id="tipUtil" name="tipUtil">
                        <option>Normal</option>
                        <option>Student</option>
                        <option>Profesor</option>
                    </select>
                </div> <br/>

                <button type="submit">Create</button>
                <br/>
                <div class="alert alert-danger" role="alert" id="unameRegID">
                    Introduceti username-ul
                </div>

                <div class="alert alert-danger" role="alert" id="passRegID">
                    Introduceti parola
                </div>

                <p class="message">Already registered? <a href="#">Sign In</a></p>
            </form>

            <% if (error != null && error.equals("contInexistent")) {
                    session.setAttribute("error", null);
            %>
            <div class="alert alert-danger" role="alert" id="PorUIncorrect">
                Username sau parola introduse incorect
            </div>
            <%} else {
                session.setAttribute("error", null); %>
            <script>
                var idDivEroare = document.getElementById("PorUIncorrect");
                if (idDivEroare !== null) {
                    idDivEroare.style.display = 'none';
                }
            </script>
            <%}%>

            <form class="login-form" action="Account/VerifyAcccount.jsp" method="POST" onsubmit="return validateLogin()">
                <center><h3>Login</h3></center>
                <input type="text" id="usernameId" name="uname" placeholder="username"/>
                <input type="password" id="passwId" name="password" placeholder="password"/>
                <button action="submit">Login</button>
                <div class="alert alert-danger" role="alert" id="unameLoginID">
                    Introduceti username-ul
                </div>

                <div class="alert alert-danger" role="alert" id="passLoginID">
                    Introduceti parola
                </div>
                <p class="message">Not registered? <a href="#">Create an account</a></p>
                <p class="message">Forgot your password? <a href="Account/ChangePassword.jsp">Click here</a></p>
            </form>

        </div>
        <script src="js/index.js"></script>
        <% if (error != null && error.equals("contExistent")) {
                session.setAttribute("error", null);
        %>
        <script>
                $('form').animate({opacity: "toggle"});
        </script>
        <%}%>

        <% if (session.getAttribute("userid") != null) {
                response.sendRedirect("MenuApp/menu.jsp");
            }%>
    </body>
</html>


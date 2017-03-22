<%-- 
    Document   : rezultatTest
    Created on : Oct 14, 2016, 11:32:46 AM
    Author     : corne
--%>

<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="proiectLicenta.clase.Test"%>
<%! int nrRaspCorecte = 0;
%>

<%
    Test t = new Test();
    t.initIntrebari();
%>

<%! String raspunsUser;%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link href="../css/bootstrap.min.css" rel="stylesheet">
        <link href="../css/simple-sidebar.css" rel="stylesheet">
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div id="wrapper">
            <!-- Sidebar -->
            <jsp:include page="menuBar.jsp" />
            <!-- /#sidebar-wrapper -->
            <button class="btn btn-default" id="menu-toggle" style="background-color: #D0D0D0">
                <span class="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
            </button> <br/>

            <!-- Page Content -->
            <div id="page-content-wrapper">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <a href="#menu-toggle" class="btn btn-default" id="menu-toggle">Toggle Menu</a> <br/>
                            <jsp:include page="VerificareSesiune.jsp" />
                            <% for (int i = 0; i < t.getIntrebari().size(); i++) {
                                    String userAnswer = request.getParameter(t.getIntrebari().get(i).getTextIntrebare());
                                    if (userAnswer != null && t.getIntrebari().get(i).getRaspunsCorect().compareTo(userAnswer) == 0) {
                                        nrRaspCorecte++;
                                    }
                            %>
                            <p>pentru : <% out.print(t.getIntrebari().get(i).getTextIntrebare()); %></p><br/>
                            <p>raspunsul tau este:</p><br />
                            <div style="color:red">
                                <% if (userAnswer != null) {
                                        out.print(userAnswer);
                                    } else {
                                        out.print("Niciun raspuns");
                                    }
                                %> </div> <br/>
                            <p>raspunsul corect este:</p> <br />
                            <div style="color:blue"><%out.print(t.getIntrebari().get(i).getRaspunsCorect()); %> </div><br />
                            <% }%>
                            <p>You finished the test with: <% out.print(nrRaspCorecte); %> of <% out.print(t.getIntrebari().size());%></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script src="../js/jquery.js"></script>
        <script src="../js/bootstrap.min.js"></script>
        <script>
            $("#menu-toggle").click(function (e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });
        </script>
    </body>
</html>

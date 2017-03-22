<%-- 
    Document   : test
    Created on : Oct 14, 2016, 11:07:42 AM
    Author     : corne
--%>

<%@page import="java.util.Random"%>
<%@page import="java.util.ArrayList"%>
<%@page import="proiectLicenta.clase.Test"%>
<%@page import="java.util.List"%>
<% if ((session.getAttribute("userid") == null) || (session.getAttribute("userid") == "")) {
        response.sendRedirect("../index.jsp");
    } else { %>
<%
    Test t = new Test();
    t.initIntrebari();

%>

<%!
    List<Integer> intregi = new ArrayList<>();
    int random;
%>

<%!
    int generateRandomNumber() {
        int newV;
        Random rand = new Random();
        int randomNum = rand.nextInt(4);
        newV = randomNum;
        while (intregi.contains(newV)) {
            rand = new Random();
            randomNum = rand.nextInt(4);
            newV = randomNum;
        }
        intregi.add(newV);
        return newV;
    }
%> 

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Test</title>
        <link href="../css/simple-sidebar.css" rel="stylesheet">
        <link href="../css/bootstrap.min.css" rel="stylesheet">
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body> 
        <div id="wrapper">
            <jsp:include page="VerificareSesiune.jsp" />
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
                            <form action = "rezultatTest.jsp" method="POST" >
                                <% for (int i = 0; i < t.getIntrebari().size(); i++) {%>
                                <strong><%=i + 1%>. <%out.print(t.getIntrebari().get(i).getTextIntrebare());%> </strong><br/>
                                <% random = generateRandomNumber(); %>
                                <input type ="radio" name="<%out.print(t.getIntrebari().get(i).getTextIntrebare());%>" value="<%out.print(t.getIntrebari().get(i).getRaspunsuri().get(random));%>"> <%out.print("A.  " + t.getIntrebari().get(i).getRaspunsuri().get(random));%>
                                <% random = generateRandomNumber(); %>
                                <input type ="radio" name="<%out.print(t.getIntrebari().get(i).getTextIntrebare());%>" value="<%out.print(t.getIntrebari().get(i).getRaspunsuri().get(random));%>"> <%out.print("B.  " + t.getIntrebari().get(i).getRaspunsuri().get(random));%>
                                <% random = generateRandomNumber(); %>
                                <input type ="radio" name="<%out.print(t.getIntrebari().get(i).getTextIntrebare());%>" value="<%out.print(t.getIntrebari().get(i).getRaspunsuri().get(random));%>"> <%out.print("C.  " + t.getIntrebari().get(i).getRaspunsuri().get(random));%>
                                <% random = generateRandomNumber(); %>
                                <input type ="radio" name="<%out.print(t.getIntrebari().get(i).getTextIntrebare());%>" value="<%out.print(t.getIntrebari().get(i).getRaspunsuri().get(random));%>"> <%out.print("D.  " + t.getIntrebari().get(i).getRaspunsuri().get(random));%> <BR/>
                                <% intregi.clear();
                                    }%>
                                <input type="submit" value="Send my answers" />
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="../js/jquery.js"></script>
        <script src="../js/bootstrap.min.js"></script>
        <script src="../js/index.js"></script>
        <script>
            $("#menu-toggle").click(function (e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });
        </script>
    </body>
</html>

<% } %>

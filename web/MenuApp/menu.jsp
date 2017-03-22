<%-- 
    Document   : menu
    Created on : Oct 23, 2016, 10:02:07 PM
    Author     : corne
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!DOCTYPE html>
<% if ((session.getAttribute("userid") == null) || (session.getAttribute("userid") == "")) {
        response.sendRedirect("../index.jsp");
    } else { %>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <title>Learning C</title>
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
                            <h1>Welcome <%=session.getAttribute("userid")%></h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <script src="../js/jquery.js"></script>
        <script>
            $("#menu-toggle").click(function (e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });
        </script>
    </body>

</html>
<% } %>
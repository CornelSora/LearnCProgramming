<%-- 
    Document   : IntroducereTest
    Created on : Mar 27, 2017, 10:59:51 PM
    Author     : Cornel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Creare test automat</title>
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
                    <div class="panel-footer row">
                        <div class="col-lg-12">
                            <form action="../testareAutomataDate" method="POST">
                                <div class="form-group">
                                    <label for="denumireProbelma">Denumire: </label>
                                    <input id="denumireProblema" name="denumireProblema" class="form-control" placeholder="Denumirea problemei"/>
                                </div> 
                                <div class="form-group">
                                    <label for="cerintaProblema">Cerinta: </label>
                                    <textarea id="cerintaProblema" name="cerintaProblema" class="form-control" rows="10"> </textarea>
                                </div> 
                                <div class="form-group">
                                    <label for="denumireProbelma">Functii obligatorii:  </label><br/>
                                    <button type="button" class="btn btn-success" id="addFunction" onclick="adaugaFunctii()">Adaugati o noua functie</button><br/>
                                    <div class="form-inline" id="functii-group"><br/>
                                        <label>Denumire: </label>
                                        <input id="denumireFunctie0" name="denumireFunctie0" class="form-control" placeholder="Numele functiei"/><br/>
                                        <label>Tip returnat: </label>
                                        <input id="tipReturnat0" name="tipReturnat0" class="form-control" placeholder="Tipul returnat al functiei"/><br/>
                                    </div>
                                </div>
                                <div class="form-group" id="testGroup">
                                    <button type="button" class="btn btn-success" id="addExpected" onclick="adaugaInputOutput()">Adaugati set: Input/Output asteptat</button><br/>
                                    <div style="float: left; width: 40%; display: block;">
                                        <label>Input: -cum va arata fisierul citit de utilizator</label>
                                        <textarea id="Input0" name="Input0" class="form-control" rows="10"></textarea>
                                    </div>
                                    <div style="margin-left: 50%; width: 40%; display: block;">
                                        <label>Output: -cum trebuie sa arate output-ul acestuia</label>
                                        <textarea id="Output0" name="Output0" class="form-control" rows="10"></textarea><br/>
                                    </div><br/>
                                </div>
                                <button type="submit" class="btn btn-block bg-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="../js/jquery.js"></script>
        <script src="../js/bootstrap.min.js"></script>
        <script src="../js/index.js"></script>
        <script src="../js/createTestHelper.js"></script>
        <script>
            $("#menu-toggle").click(function (e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });
        </script>
    </body>
</html>

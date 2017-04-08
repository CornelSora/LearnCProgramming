<%-- 
    Document   : StudentTest
    Created on : Apr 6, 2017, 12:44:43 AM
    Author     : Cornel
--%>

<%@page import="proiectLicenta.clase.NotaUserDAO"%>
<%@page import="proiectLicenta.clase.NotaUser"%>
<%@page import="proiectLicenta.clase.VerificareRezultat"%>
<%@page import="proiectLicenta.clase.ListaProbleme"%>
<%@page import="proiectLicenta.clase.Subiect"%>
<%@page import="java.util.GregorianCalendar"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.util.Date"%>
<%@page import="java.io.PrintWriter"%>
<%@page import="proiectLicenta.clase.Consola"%>
<%@page import="proiectLicenta.resources.Resources"%>
<%@page import="proiectLicenta.clase.User"%>
<%@page import="proiectLicenta.clase.UserDAO"%>
<%@page import="java.io.File"%>
<%@page import="java.io.FileReader"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="java.util.ResourceBundle"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    if ((session.getAttribute("userid") == null) || (session.getAttribute("userid") == "")) {
        response.sendRedirect("../index.jsp");
    } else {
%>

<%
    String userPath = session.getAttribute("userPath").toString();
    session.setAttribute("id", "");
    String fileName = null;
    User userActual = null;
    UserDAO userDAO = null;
    try {
        userDAO = new UserDAO();
        int uid = Integer.parseInt(session.getAttribute("userid").toString());
        userActual = userDAO.getUserById(uid);
        if (System.getProperty("os.name").toLowerCase().indexOf("windows") > -1) {
            fileName = "Conturi\\" + userPath + "\\" + userActual.getUsername();
            userPath = "Conturi\\" + userPath + "\\";
        } else {
            fileName = "Conturi/" + userPath + "/" + userActual.getUsername();
            userPath = "Conturi/" + userPath + "/";
        }
    } catch (Exception ex) {
        out.println(ex.toString());
    } finally {
        if (userDAO != null) {
            userDAO.closeConnection();
        }
    }
%>
<!--setare test curent-->
<%
    Subiect subiect = null;
    subiect = new Subiect();
    for (Subiect s : ListaProbleme.getTeste()) {
        String profesor = s.getAutor();
        if (profesor != null
                && profesor.equals(userActual.getProfesor())) {
            subiect = new Subiect();
            subiect.setDenumireSubiect(s.getDenumireSubiect());
            subiect.setCerintaSubiect(s.getCerintaSubiect());
            subiect.setFunctii(s.getFunctii());
            subiect.setVerificari(s.getVerificari());
            break;
        }
    };

    session.setAttribute("testCurent", subiect);

%>

<!--initializare date, verificare cerere, rulare cerere -->
<%    Resources resurse = new Resources();
    String programRezultat = "";
    resurse.setFileName(fileName);
    programRezultat = resurse.getProgramRezultat();

    String button = request.getParameter("button");
    String resC = null;
    String resT = null;
    String rezultatVerificare = "";
    Consola c = new Consola();
    try {
        if (button != null) {
            programRezultat = request.getParameter("console");
            if (button.equals("Run")) {
                resC = c.compile(programRezultat, fileName);
                if (resC.compareTo("Compilation successful !!!") == 0) {
                    resT = c.result(fileName);
                } else if (resC.contains("Permission denied")) {
                    resC = "Eroare din cauza unor actiuni anterioare!";
                    resT = "Apasati Stop Process si incercati din nou";
                } else {
                    resT = "";
                }
            } else if (button.equals("Save")) {
                c.scriereFisier(programRezultat, fileName);
            } else if (button.equals("Stop")) {
                if (System.getProperty("os.name").toLowerCase().indexOf("windows") > -1) {
                    Runtime.getRuntime().exec("taskkill /F /IM " + fileName + ".exe");
                } else {
                    Runtime.getRuntime().exec("kill -9 " + fileName);
                }
            } else if (button.equals("Finish")) {
                String finishPath;
                if (System.getProperty("os.name").toLowerCase().indexOf("windows") > -1) {
                    finishPath = fileName + "Finish.c";
                } else {
                    finishPath = fileName + "Finish.c";
                }
                try (PrintWriter pw = new PrintWriter(new File(finishPath))) {
                    pw.write(programRezultat);
                } catch (Exception ex) {
                    System.out.println(ex.toString());
                }
                response.sendRedirect("logout.jsp");
            } else if (button.equals("Verificare") && subiect != null) {
                try {
                    resC = c.compile(programRezultat, fileName);
                    if (resC.compareTo("Compilation successful !!!") == 0) {
                        resT = c.result(fileName);
                        int nrFunctiiCorecte = subiect.nrFunctiiExistente(programRezultat);
                        rezultatVerificare += "Nr. functii corecte: " + nrFunctiiCorecte + " din " + subiect.getFunctii().size() + "\n";
                        String raspunsVerif = subiect.verificareOutput(userPath + "input.txt", fileName, c, programRezultat);
                        rezultatVerificare += raspunsVerif + "\n";
                        NotaUser notaUser = new NotaUser();
                        notaUser.setUserId(userActual.getId());
                        notaUser.setDenumireTest(subiect.getDenumireSubiect());
                        notaUser.setRaspunsAplicatie(rezultatVerificare);
                        NotaUserDAO notaUserDAO = new NotaUserDAO();
                        notaUserDAO.inserareNotaAplicatie(notaUser);
                        notaUserDAO.closeConnection();
                    } else {
                        resT = "Rezolvati mai intai erorile de compilare!";
                    }
                } catch (Exception ex) {
                    System.out.println(ex.toString());
                }
            }
        }
    } catch (Error ex) {
        resC = "Eroare";
        if (ex.toString().contains("Java heap space")) {
            resT = "S-a creat un loop infinit, apasati Stop Process si verificati codul";
        } else {
            resT = ex.toString();
        }
    }
%>

<%    int year, month, day, hours, minutes, seconds;
    if (session.getAttribute("testStarted") == null) {
        Calendar calendar = new GregorianCalendar();
        session.setAttribute("testStarted", calendar);
        year = calendar.get(Calendar.YEAR);
        month = calendar.get(Calendar.MONTH) + 1;
        day = calendar.get(Calendar.DAY_OF_YEAR);
        hours = calendar.get(Calendar.HOUR);
        minutes = calendar.get(Calendar.MINUTE);
        seconds = calendar.get(Calendar.SECOND);
    }
%>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Probleme</title>
        <link href="../css/simple-sidebar.css" rel="stylesheet">
        <link href="../css/consoleCustomStyle.css" rel="stylesheet">
        <link href="../css/codemirror.css" rel="stylesheet" type="text/css" >
        <link href="../css/bootstrap.min.css" rel="stylesheet" type="text/css" >
        <link href="../css/consoleCustomStyle.css" rel="stylesheet">
        <link rel="stylesheet" href="http://codemirror.net/theme/3024-night.css">
        <script type="text/javascript" src="../js/codemirror.js"></script>
        <script type="text/javascript" src="../js/DesignCookies.js"></script>
        <script type="text/javascript" src="../js/validate.js"></script>
        <script src="../js/jquery.js"></script>
        <script type="text/javascript" src="../js/timer.js"></script>
        <script src="../js/bootstrap.min.js"></script>
        <script src="https://codemirror.net/addon/fold/foldcode.js"></script>
    </head>
    <body>
        <div id="wrapper">
            <!-- Sidebar -->
            <div id="sidebar-wrapper">
                <ul class="sidebar-nav">
                    <li class="sidebar-brand">
                        <a href='menu.jsp'>
                            Learn C Programming
                        </a>
                    </li>
                </ul>
            </div>
            <!-- /#sidebar-wrapper -->
            <button class="btn btn-default" id="menu-toggle" style="background-color: #D0D0D0">
                <span class="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
            </button> <br/>
            <div class="input-group clockpicker" style="float: left; margin-left:2%; width: 20%; margin-top:1%; margin-bottom: 1%;">
                <input type="text" class="form-control" id="countdown" readonly>
                <span class="input-group-addon">
                    <span class="glyphicon glyphicon-time"></span>
                </span>
            </div>

            <% if (session.getAttribute("testStarted") != null) {
                    Calendar calendar = (Calendar) session.getAttribute("testStarted");
                    year = calendar.get(Calendar.YEAR);
                    month = calendar.get(Calendar.MONTH);
                    day = calendar.get(Calendar.DAY_OF_MONTH);
                    hours = calendar.get(Calendar.HOUR_OF_DAY);
                    minutes = calendar.get(Calendar.MINUTE);
                    seconds = calendar.get(Calendar.SECOND);%>
            <script>
                setTimer(<%=year%>, <%=month%>, <%=day%>, <%=hours%>, <%=minutes%>, <%=seconds%>);
            </script> 
            <% }
            %>

            <h4 style="float: right; width: 15%">
                Username: <%out.print(userActual.getUsername());%>
            </h4>

            <!-- Page Content -->   
            <div id="page-content-wrapper" onContextMenu="return false">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="row" id="Cerinta" style="display: none">
                                <h2>Numele testului : <%=subiect.getDenumireSubiect()%></h2>
                                <h3>Cerinta: </h3>
                                <ol><li><%=subiect.getCerintaSubiect()%></li></ol>
                                <h3>Exemplu</h3>
                                <table class="table">
                                    <thead>
                                    <th>input.txt</th>
                                    <th>output</th>
                                    </thead>
                                    <tbody>
                                        <% if (subiect != null && subiect.getVerificari() != null) {
                                                for (VerificareRezultat verificare : subiect.getVerificari()) {
                                                    out.print("<tr>");
                                                    out.print("<td>" + verificare.getInput() + "</td>");
                                                    out.print("<td>" + verificare.getOutput() + "</td>");
                                                    out.print("</tr>");
                                                }
                                            }%>
                                    </tbody>
                                </table>
                            </div>
                            <div class="panel-footer row">
                                <%@include file="help.html" %>
                                <div class="btn-group btn-group-sm">
                                    <button class="btn btn-info" type="button" 
                                            data-toggle="modal" data-target="#myModal" 
                                            style="margin-right: 5px">Scrie-ti propriul fisier</button>
                                    <button class="btn btn-info" type="button" 
                                            data-toggle="modal" data-target="#myModal2">Vizualizare fisiere</button>
                                </div>
                                <%@include file="createInputFile.html"%>
                                <%@include file="showMyFiles.jsp"%>
                                <p>Select a theme: </p>
                                <div class="form-group" style="width: 10%">
                                    <select onchange="selectTheme()" id="select">
                                        <option value="0" selected>Dark</option>
                                        <option value="1">Default</option>
                                        <option value="2">3024-night</option>
                                    </select> 
                                </div>
                            </div>

                            <form action="StudentTest.jsp" name="frm" method="POST">
                                <div class="panel-footer row">
                                    <textarea name="console" id="console"><%out.print(programRezultat);%></textarea>
                                </div>
                                <div class="panel-footer row">
                                    <div class="btn-group btn-group-sm" style="margin-left:40px;">
                                        <button type="submit" id="btnRun" name="button" class="btn btn-primary" value="Run"
                                                data-toggle="tooltip" data-placement="bottom" title="CTRL + B" 
                                                style="margin-right: 5px" onclick="btnRunInfoClick();
                                                        makeProgressBarVisible()">Run</button>
                                        <button type="submit" id="btnSave" name="button" class="btn btn-primary" value="Save" 
                                                data-toggle="tooltip" data-placement="bottom" title="CTRL + S"
                                                style="margin-right: 5px" onclick="makeProgressBarVisible()">Save</button>
                                        <button type="submit" id="btnStop" name="button" class="btn btn-primary" value="Stop" 
                                                style="margin-right: 5px"
                                                data-toggle="tooltip" data-placement="bottom" title="CTRL + P">Stop process</button>
                                        <button type="submit" id="btnFinish" name="button" class="btn btn-primary" value="Finish" 
                                                style="margin-right: 5px"
                                                data-toggle="tooltip" data-placement="bottom" title="Finish">Finish</button>
                                        <button type="submit" id="btnVerificareCod" name="button" class="btn btn-primary" value="Verificare"
                                                style="margin-right: 5px"
                                                data-toggle="tooltip" data-placement="bottom" 
                                                title="Codul se va trece printr-o succesiune de verificari. Va rog sa aveti fisierul: input.txt creat">Verificare</button>
                                        <div class="btn-group btn-group-sm" style="display: block; float: right; margin-right: 10px;">
                                            <button type="button" id="btnFullscreen" class="btn btn-primary" value="Fullscreen" 
                                                    style="float:right;" onclick="fullScreen()" style="margin-right: 5px"
                                                    data-toggle="tooltip" data-placement="bottom" title="Fullscreen/F11/Press Esc to exit">Fullscreen</button>
                                            <button type="button" id="btnFormat" class="btn btn-primary" value="Fullscreen" 
                                                    style="float:right;" onclick="formatCode()" style="margin-right: 5px"
                                                    data-toggle="tooltip" data-placement="bottom" title="Format">Format</button>
                                        </div>
                                    </div> <br/>
                                </div>
                            </form> 
                            <div class="panel-footer row" style="display: none" id="progressBar">
                                <div class="progress">
                                    <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                                        Working on progress
                                    </div>
                                </div>
                            </div>

                            <% if (button != null && (button.equals("Run") || button.equals("Verificare"))) { %>
                            <div class="panel-footer row" style="margin-top: -20px;">
                                <textarea name = "consoleRes" id = "consoleRes" class="result"><% out.println(resC);%>Output:<%out.println("\n"
                                            + resT);
                                    if (button.equals("Verificare")) {
                                        out.println("Rezultate verificari: ");
                                        out.println(rezultatVerificare);
                                    }
                                    %>
                                </textarea>
                            </div>
                            <% } else if (button != null && button.equals("Save")) {
                                c.scriereFisier(programRezultat, fileName); %>
                            <div class="panel-footer row"style="margin-top: -20px;">
                                <textarea  name="consoleRes" id="consoleRes" class="result">Salvat!</textarea>
                            </div>
                            <% }%>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="../js/console.js"></script>
        <script type="text/javascript" src="../js/ShowDialog.js"></script>
        <script type="text/javascript" src="../js/keyEvents.js"></script>
        <script>
                                                        $(document).ready(function () {
                                                            $('[data-toggle="tooltip"]').tooltip();
                                                            $("#menu-toggle").click(function (e) {
                                                                e.preventDefault();
                                                                $("#wrapper").toggleClass("toggled");
                                                            });
                                                            var progress = $("#progressBar")[0];
                                                            makeProgressBarVisible = () => {
                                                                progress.style.display = 'block';
                                                            };

                                                            $("#btnFinish").onclick = () => {
                                                                alert("Test finalizat cu succes!");
                                                            };
                                                        });
        </script>
    </body>

</html>
<% }%>


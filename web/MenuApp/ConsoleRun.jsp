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
<%@page import="proiectLicenta.clase.CodeTest"%>
<%@page import="java.util.ResourceBundle"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    if ((session.getAttribute("userid") == null) || (session.getAttribute("userid") == "")) {
        response.sendRedirect("../index.jsp");
    } else {
%>

<!--initializare date, verificare cerere, rulare cerere -->
<%
    Resources resurse = new Resources();
    String userPath = session.getAttribute("userPath").toString();
    String programRezultat = resurse.getProgramRezultat();
    String fileName = null;
    User userActual = null;
    UserDAO userDAO = null;
    try {
        userDAO = new UserDAO();
        int uid = Integer.parseInt(session.getAttribute("userid").toString());
        userActual = userDAO.getUserById(uid);
        if (System.getProperty("os.name").toLowerCase().indexOf("windows") > -1) {
            fileName = "Conturi\\" + userPath + "\\" + userActual.getUsername();
        } else {
            fileName = "Conturi/" + userPath + "/" + userActual.getUsername();
        }
    } catch (Exception ex) {
        out.println(ex.toString());
    } finally {
        if (userDAO != null) {
            userDAO.closeConnection();
        }
    }
    resurse.setFileName(fileName);
    programRezultat = resurse.getProgramRezultat();

    String button = request.getParameter("button");
    String resC = null;
    String resT = null;
    Consola c = new Consola();
    try {
        if (button != null) {
            if (button.equals("Run")) {
                programRezultat = request.getParameter("console");
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
                programRezultat = request.getParameter("console");
                c.scriereFisier(programRezultat, fileName);
            } else if (button.equals("Stop")) {
                if (System.getProperty("os.name").toLowerCase().indexOf("windows") > -1) {
                    Runtime.getRuntime().exec("taskkill /F /IM " + userActual.getUsername() + ".exe");
                } else {
                    Runtime.getRuntime().exec("kill -9 " + userActual.getUsername());
                }
            } else if (button.equals("Finish")) {
                String finishPath;
                if (System.getProperty("os.name").toLowerCase().indexOf("windows") > -1) {
                    finishPath = "Conturi\\" + userActual.getUsername() + "\\" + userActual.getUsername() + "Finish.c";
                } else {
                    finishPath = "Conturi/" + userActual.getUsername() + "/" + userActual.getUsername() + "Finish.c";
                }
                programRezultat = request.getParameter("console");
                try (PrintWriter pw = new PrintWriter(new File(finishPath))) {
                    pw.write(programRezultat);
                } catch (Exception ex) {
                    System.out.println(ex.toString());
                }
                response.sendRedirect("logout.jsp");
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

<!--setare test curent-->
<%
    String idTest = request.getParameter("id");
    CodeTest codeTest;
    if (idTest != null) {
        codeTest = new CodeTest();
        codeTest.initTheTest(idTest);
        codeTest.setId(idTest);
        session.setAttribute("testCurent", codeTest);
    } else {
        codeTest = (CodeTest) session.getAttribute("testCurent");
    }
%>

<%
    int year, month, day, hours, minutes, seconds;
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
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
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
            <jsp:include page="menuBarConsole.jsp" />
            <!-- /#sidebar-wrapper -->
            <button class="btn btn-default" id="menu-toggle" style="background-color: #D0D0D0">
                <span class="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
            </button>
            <div id="countdown">

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
                Username: <%out.print(userActual.getUsername()); %>
            </h4>

            <!-- Page Content -->   
            <div id="page-content-wrapper" onContextMenu="return false">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <%if (!codeTest.getId().equals("0")) {
                            %>
                            <div class="row">
                                <h2>Numele testului : <% out.println(codeTest.getTest()); %></h2>
                                <h3>Date de intrare</h3>
                                Datele de intrare se citesc din fişierul input.txt:
                                <ol><li>Pe cate o linie a fisierului se afla un numar</li></ol>
                                <h3>Exemplu</h3>
                                <table class="table">
                                    <thead>
                                    <th>input.txt</th>
                                    <th>output</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <%out.print(codeTest.getInput());%>
                                            </td>
                                            <td>
                                                <%out.print(codeTest.getExpectedOutput()); %>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <% }%>
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
                                <select onchange="selectTheme()" id="select">
                                    <option value="0" selected>Dark</option>
                                    <option value="1">Default</option>
                                    <option value="2">3024-night</option>
                                </select> 
                            </div>

                            <form action="ConsoleRun.jsp" name="frm" method="POST">
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
                                        <button type="button" id="btnFinish" name="button" class="btn btn-primary" value="Finish" 
                                                style="margin-right: 5px"
                                                data-toggle="tooltip" data-placement="bottom" title="Finish">Finish</button>
                                        <div class="btn-group btn-group-sm" style="display: block; float: right; margin-right: 10px;">
                                            <button type="button" id="btnFullscreen" class="btn btn-primary" value="Fullscreen" 
                                                    style="float:right;" onclick="fullScreen()" style="margin-right: 5px"
                                                    data-toggle="tooltip" data-placement="bottom" title="Fullscreen/F11/Press Esc to exit">Fullscreen</button>
                                            <button type="button" id="btnFullscreen" class="btn btn-primary" value="Fullscreen" 
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

                            <% if (button != null && button.equals("Run")) { %>
                            <div class="panel-footer row" style="margin-top: -20px;">
                                <textarea name = "consoleRes" id = "consoleRes" class="result"><% out.println(resC);%>Output:<%out.println("\n"
                                            + resT);
                                    if (!codeTest.getId().equals("0")) {
                                        if (codeTest.isCorect(resT)) {
                                            out.println("Your answer is correct!");
                                        } else {
                                            out.print("The output should be: " + codeTest.getExpectedOutput());
                                        }

                                    }%>
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


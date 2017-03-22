<%@page import="proiectLicenta.clase.FileUserDAO"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<%@page import="proiectLicenta.clase.Consola"%>
<%@page import="java.io.FileReader"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="java.io.File"%>
<%@page import="proiectLicenta.clase.User"%>
<%@page import="java.util.List"%>
<%@page import="proiectLicenta.clase.UserDAO"%>
<% if ((session.getAttribute("userid") == null)
            || (session.getAttribute("userid") == "")
            || !(session.getAttribute("tip").equals("profesor"))) {
        response.sendRedirect("../index.jsp");
    } else { %>
<%
    User studentActual = null;
    List<User> users = null;
    String studentName = request.getParameter("student");

    UserDAO userDAO = new UserDAO();
    try {
        users = userDAO.getAllStudents();
        for (User user : users) {
            if (user.getUsername().toLowerCase().equals(studentName)) {
                studentActual = new User();
                studentActual.setId(user.getId());
                studentActual.setUsername(user.getUsername());
            }
        }
    } catch (Exception ex) {
        System.out.println(ex.toString());
    } finally {
        if (userDAO != null) {
            userDAO.closeConnection();
        }
    }

    String resC = null;
    String resT = null;
    Consola c = new Consola();
    String studentCode = null;
    String filePath = null;

    if (studentName != null) {
        if (System.getProperty("os.name").toLowerCase().indexOf("windows") > -1) {
            filePath = "Conturi\\" + studentName + "\\" + studentName + "Finish";
        } else {
            filePath = "Conturi/" + studentName + "/" + studentName + "Finish";
        }
    }

    String button = request.getParameter("button");
    if (button != null) {
        if (button.equals("Run")) {
            studentCode = request.getParameter("consolaEvaluare");
            resC = c.compile(studentCode, filePath);
            if (resC.compareTo("Compilation successful !!!") == 0) {
                resT = c.result(filePath);
            } else if (resC.contains("Permission denied")) {
                resC = "Eroare din cauza unor actiuni anterioare!";
                resT = "Apasati Stop Process si incercati din nou";
            } else {
                resT = "";
            }
        } else if (button.equals("Stop")) {
            if (System.getProperty("os.name").toLowerCase().indexOf("windows") > -1) {
                Runtime.getRuntime().exec("taskkill /F /IM " + filePath + ".exe");
            } else {
                Runtime.getRuntime().exec("kill -9 " + filePath);
            }
        }
    }
    if (studentName != null) {
        File studentFile = new File(filePath + ".c");
        if (studentFile.exists()) {
            StringBuilder sbHelper = new StringBuilder();
            try (BufferedReader in = new BufferedReader(new FileReader(studentFile))) {
                String line;
                while ((line = in.readLine()) != null) {
                    sbHelper.append(line).append("\n");
                }
                studentCode = sbHelper.toString();
                if (studentCode != null) {
                    resC = c.compile(studentCode, filePath);
                    if (resC.compareTo("Compilation successful !!!") == 0) {
                        resT = c.result(filePath);
                    } else if (resC.contains("Permission denied")) {
                        resC = "Eroare din cauza unor actiuni anterioare!";
                        resT = "Apasati Stop Process si incercati din nou";
                    } else {
                        resT = "";
                    }
                }
            } catch (Exception ex) {
                System.out.println(ex.toString());
            }
        }
    }

    FileUserDAO fileUserDAO = new FileUserDAO();
    List<String> listaFisiere = null;
    Map<String, String> fisiere = null;
    if (studentName != null) {
        listaFisiere = fileUserDAO.getFilesById(studentActual.getId());
        fisiere = new HashMap<>();
        for (int i = 0; i < listaFisiere.size(); i++) {
            File file = null;
            if (System.getProperty("os.name").toLowerCase().indexOf("windows") > -1) {
                String userPath = "Conturi\\" + studentName + "\\";
                String fileName2 = userPath + listaFisiere.get(i);
                file = new File(fileName2);
            } else {
                String userPath = "Conturi/" + studentName + "/";
                String fileName2 = userPath + listaFisiere.get(i);
                file = new File(fileName2);
            }
            if (file.exists()) {
                try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
                    String line = null;
                    StringBuilder continut = new StringBuilder();
                    while ((line = reader.readLine()) != null) {
                        continut.append(line).append("\n");
                    }
                    if (continut.length() != 0) {
                        fisiere.put(listaFisiere.get(i), continut.substring(0, continut.length() - 1));
                    } else {
                        fisiere.put(listaFisiere.get(i), continut.substring(0, continut.length()));
                    }
                }
            }
        }
    }
    int contor = 0;
%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Situatie studenti</title>
        <link href="../css/simple-sidebar.css" rel="stylesheet">
        <link href="../css/consoleCustomStyle.css" rel="stylesheet">
        <link href="../css/codemirror.css" rel="stylesheet" type="text/css" >
        <link href="../css/bootstrap.min.css" rel="stylesheet">
        <link href="../css/consoleCustomStyle.css" rel="stylesheet">
        <script type="text/javascript" src="../js/codemirror.js"></script>
        <script type="text/javascript" src="../js/DesignCookies.js"></script>
        <script type="text/javascript" src="../js/validate.js"></script>
        <script src="../js/jquery.js"></script>
        <script type="text/javascript" src="../js/bootstrap.min.js"></script>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <!--menubar-->
        <div id="wrapper">
            <div id="sidebar-wrapper">
                <ul class="sidebar-nav">
                    <li class="sidebar-brand">
                        <a href='menu.jsp'>
                            Learn C Programming
                        </a>
                    </li>
                    <li>
                        <a href="#" id="collapse" onclick="collapse(<%=users.size()%>)">Studenti</a>
                    </li>
                    <% if (users != null) {
                            int i = 0;
                            for (User user : users) { %>
                    <li>
                        <a href='SituatieStudenti.jsp?student=<%out.print(user.getUsername());%>' id="student<%=i%>" style="display: block">
                            <%out.println(user.getUsername());%>
                        </a>
                    </li>
                    <%
                                i++;
                            }
                        }
                    %>
                    <li>
                        <a href='menu.jsp'>Inapoi</a>
                    </li>
                </ul>
            </div>

            <!-- button hamb -->
            <button class="btn btn-default" id="menu-toggle" style="background-color: #D0D0D0">
                <span class="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
            </button>
            <!-- content -->
            <div id="page-content-wrapper">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <div>

                                Student: <% if (studentActual != null) {
                                        out.print(studentActual.getUsername());
                                    } else {
                                        out.print("Niciun student selectat");
                                    }%>
                            </div>
                            <div class="panel-footer row" style="float: right; margin-right: 10px;">
                                <form class="form-inline">
                                    <div class="form-group">
                                        <div class="col-xs-8 col-sm-4">
                                            <input type="text" class="form-control" id="nota" placeholder="Nota">
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Submit</button>
                                </form>
                            </div>
                            <div class="panel-footer row">
                                <div class="btn-group btn-group-sm">
                                    <button class="btn btn-info" type="button" 
                                            data-toggle="modal" data-target="#myModal2">Vizualizare fisiere</button>
                                </div>
                                <% if (studentName != null) { %>
                                <form method="POST" action="../EditStudentFile">
                                    <div id="myModal2" class="modal fade" role="dialog">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                    <h4 class="modal-title">Afisare fisiere</h4>
                                                </div>
                                                <% for (String key : fisiere.keySet()) { %>
                                                <div class="modal-body">
                                                    <div class="modal-footer">
                                                        <label for="studentName" style="float:left">Student: </label>
                                                        <input type="text" class="form-control" name="studentName" id="studentName" readonly value="<% out.println(studentName); %>"> <br/>
                                                        <label for="studentName" style="float:left">Nume fisier: </label>
                                                        <input type="text" class="form-control" name="fileName" id="fileName" readonly value="<% out.println(key); %>">
                                                    </div>
                                                    <div class="modal-footer">
                                                        <label for="continut" style="float:left">Input</label><br/>
                                                        <textarea class="form-control" rows="5" id="<% out.print(listaFisiere.get(contor));%>" name="<% out.print(key);%>"><%out.print(fisiere.get(key)); %>
                                                        </textarea>
                                                    </div>
                                                </div>
                                                <center>
                                                    <button type="submit" id="btnEdit" name="button" class="btn btn-info" value="<%out.print("Edit," + key);%>">Edit</button>
                                                </center>
                                                <%
                                                        contor++;
                                                    }
                                                %>
                                                <div class="modal-footer">
                                                    <center><button type="button" data-dismiss="modal" class="btn btn-success">My thanks</button></center>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <div class="form-group" style="width: 10%">
                                <p>Select a theme: </p>
                                    <select class="form-control" onchange="selectTheme()" id="select">
                                        <option value="0" selected>Dark</option>
                                        <option value="1">Default</option>
                                    </select> 
                                </div>
                                <form action="SituatieStudenti.jsp?student=<%out.print(studentName);%>" method="POST">
                                    <div class="panel-footer row">
                                        <textarea name="consolaEvaluare" id="consolaEvaluare"><% if (studentCode != null) {
                                                out.println(studentCode);
                                            }%></textarea>
                                    </div>
                                    <div class="panel-footer row">
                                        <div class="btn-group btn-group-sm" style="margin-left:40px; padding-top: 10px">
                                            <button type="submit" id="btnRun" name="button" class="btn btn-primary" value="Run"
                                                    data-toggle="tooltip" data-placement="bottom" title="CTRL + R" 
                                                    style="margin-right: 5px; margin-top: -13px" onclick="btnRunInfoClick(); makeProgressBarVisible()">Run</button>
                                            <button type="submit" id="btnStop" name="button" class="btn btn-primary" value="Stop" 
                                                    style="margin-right: 5px; margin-top: -13px;"  data-toggle="tooltip" data-placement="bottom" title="CTRL + P">Stop process</button>
                                        </div> <br/>
                                    </div>

                                    <div class="panel-footer row">
                                        <textarea name = "consoleRes" id = "consoleRes" class="result"><% if (resT != null) {
                                                out.println(resC);%>Output:<%out.println("\n" + resT);
                                                    }%>
                                        </textarea>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <% } %>
                </body>
                <script src="../js/profesor.js"></script>
                <script>$('[data-toggle="tooltip"]').tooltip();
                                                        $("#menu-toggle").click(function (e) {
                                                            e.preventDefault();
                                                            $("#wrapper").toggleClass("toggled");
                                                        });</script>
                </html>
                <%}%>

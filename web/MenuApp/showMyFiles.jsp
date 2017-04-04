<%@page import="java.io.File"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="java.io.FileReader"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.List"%>
<%@page import="proiectLicenta.clase.FileUserDAO"%>
<%
    FileUserDAO fileUserDAO = new FileUserDAO();
    int idUser = Integer.parseInt(session.getAttribute("userid").toString());
    String userPathFile = null;
    if (System.getProperty("os.name").toLowerCase().indexOf("windows") > -1) {
        userPathFile = "Conturi\\" + session.getAttribute("userPath").toString();
    } else {
        userPathFile = "Conturi/" + session.getAttribute("userPath").toString();
    }
    List<String> listaFisiere = fileUserDAO.getFilesById(idUser);
    fileUserDAO.closeConnection();
    Map<String, String> fisiere = new HashMap<>();
    for (int i = 0; i < listaFisiere.size(); i++) {
        File file = null;
        if (System.getProperty("os.name").toLowerCase().indexOf("windows") > -1) {
            String fileName2 = userPathFile + "\\" + listaFisiere.get(i);
            file = new File(fileName2);
        } else {
            String fileName2 = userPathFile + "/" + listaFisiere.get(i);
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
    int contor = 0;
%>

<html>
    <head>
        <script src="../js/validate.js"></script>
    </head>
    <body>
        <form method="POST" action="../EditFile">
            <div id="myModal2" class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Afisare fisiere</h4>
                        </div>
                        <%
                            for (String key : fisiere.keySet()) { %>
                        <div class="modal-body">
                            <input onContextMenu="return false" type="text" class="form-control" name="fileName" id="fileName" readonly value="<% out.println(key); %>">
                            <div class="modal-footer">
                                <label for="continut" style="float:left">Input</label><br/>
                                <textarea onContextMenu="return false" class="form-control" rows="5" id="<% out.print(listaFisiere.get(contor));%>" name="<% out.print(key);%>"><%out.print(fisiere.get(key)); %>
                                </textarea>
                            </div>
                        </div>
                        <center>
                            <button type="submit" id="btnEdit" name="button" class="btn btn-info" value="<%out.print("Edit," + key);%>">Edit</button>
                            <button type="submit" id="btnRun" name="button" class="btn btn-danger" value="<%out.print("Delete," + key);%>">Delete</button>
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
    </body>
    <script type="text/javascript">
        var fileName = document.getElementById("fileName");
        var erFile = document.getElementById("fileId");
        var continut = document.getElementById("continut");
        fileName.value = "";
        continut.value = "";
        erFile.style.display = "none";
    </script>

</html>

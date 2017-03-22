<%@page import="java.util.Map.Entry"%>
<%@page import="proiectLicenta.clase.VoidToInt"%>
<%@page import="proiectLicenta.clase.Consola"%>
<%@page import="org.apache.commons.fileupload.FileItem"%>
<%@page import="org.apache.commons.fileupload.disk.DiskFileItemFactory"%>
<%@page import="org.apache.commons.fileupload.servlet.ServletFileUpload"%>
<%@ page import="java.io.*,java.util.*, javax.servlet.*" %>
<%@ page import="javax.servlet.http.*" %>

<%@ page import="java.io.*,java.util.*, javax.servlet.*" %>
<%@ page import="javax.servlet.http.*" %>

<%
    Map<String, String> rezultate = new HashMap<>();
    int nrCorecte = 0;
    Consola c = new Consola();
    File file = null;
    int maxFileSize = 5000 * 1024;
    int maxMemSize = 5000 * 1024;

    String filePath = System.getProperty("user.dir");
    String contentType = request.getContentType();
    if ((contentType.indexOf("multipart/form-data") >= 0)) {

        DiskFileItemFactory factory = new DiskFileItemFactory();
        // maximum size that will be stored in memory
        factory.setSizeThreshold(maxMemSize);
        // Location to save data that is larger than maxMemSize.
        factory.setRepository(new File("c:\\temp"));

        // Create a new file upload handler
        ServletFileUpload upload = new ServletFileUpload(factory);
        // maximum file size to be uploaded.
        upload.setSizeMax(maxFileSize);
        try {
            // Parse the request to get file items.
            List fileItems = upload.parseRequest(request);

            // Process the uploaded file items
            Iterator i = fileItems.iterator();
            while (i.hasNext()) {
                FileItem fi = (FileItem) i.next();
                if (!fi.isFormField()) {
                    // Get the uploaded file parameters
                    String fileName = fi.getName();
                    // Write the file
                    String raspuns = null;
                    if (fileName.lastIndexOf("\\") >= 0) {
                        String finalPath = filePath + fileName.substring(fileName.lastIndexOf("\\"));
                        file = new File(finalPath);
                    } else {
                        String userPath = null;
                        if (System.getProperty("os.name").toLowerCase().indexOf("windows") > -1) {
                            userPath = session.getAttribute("userPath").toString();
                            file = new File(filePath + "\\" + userPath + "\\"
                                    + fileName.substring(fileName.lastIndexOf("\\") + 1));
                        } else {
                            userPath = "Conturi/" + session.getAttribute("userPath").toString();
                            file = new File(filePath + "/" + userPath + "/"
                                    + fileName.substring(fileName.lastIndexOf("\\") + 1));
                        }
                        fi.write(file);
                        String numeFis = "<span style=\"color:blue\"> Uploaded File: " + fileName + "</span> <br>";
                        String ext = fileName.substring(fileName.lastIndexOf("."));
                        if (ext.equals(".c") || ext.equals(".cpp")) {
                            VoidToInt doIt = new VoidToInt(file);
                            doIt.changeIt();
                            raspuns = c.verifyCode(file.toString());
                            StringBuilder raspunsFinal = new StringBuilder();
                            if (raspuns.contains("error")) {
                                raspunsFinal.append("<span style=\"color:red\">The answer is: </span>" + raspuns + "<br>");
                            } else if (raspuns.contains("warning")) {
                                raspunsFinal.append("<span style=\"color:red\">The answer is: </span> just warnings" + "<br>"
                                        + raspuns + "<br>");
                            } else {
                                raspunsFinal.append("<span style=\"color:red\">The answer is: </span>" + raspuns + "<br>");
                            }
                            rezultate.put(numeFis, raspunsFinal.toString());
                            if (!raspuns.contains("error")) {
                                nrCorecte++;
                            }
                        }
                    }
                }
            }
        } catch (Exception ex) {
            out.println(ex);
        }
    } else {
        out.println("<html>");
        out.println("<head>");
        out.println("<title>Servlet upload</title>");
        out.println("</head>");
        out.println("<body>");
        out.println("<p>No file uploaded</p>");
        out.println("</body>");
        out.println("</html>");
    }
%>
<html>
    <head>
        <title>Uploaded files</title>
        <link href="../css/bootstrap.min.css" rel="stylesheet">
        <link href="../css/simple-sidebar.css" rel="stylesheet">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" 
              integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    </head>
    <body>
        <div id="wrapper">
            <!-- Sidebar -->
            <jsp:include page="..//MenuApp//menuBar.jsp" />
            <!-- /#sidebar-wrapper -->
            <button class="btn btn-default" id="menu-toggle" style="background-color: #D0D0D0">
                <span class="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
            </button> <br/>

            <!-- Page Content -->
            <div id="page-content-wrapper">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <%
                                if ((session.getAttribute("userid") == null) || (session.getAttribute("userid") == "")) {
                            %>
                            You are not logged in<br/>
                            <a href="../index.jsp">Please Login</a>
                            <%} else {
                            %>
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Nr.</th>
                                        <th><center>Rezultate:</center></th>
                                </tr>
                                </thead>
                                <tbody>
                                    <%
                                        int i = 0;
                                        for (Entry<String, String> e : rezultate.entrySet()) {
                                            i++;
                                            String fisier = e.getKey();
                                            String rezultat = e.getValue();
                                    %>

                                    <tr>
                                        <th scope="row"><%out.println(i); %></th>
                                        <td><% out.println(fisier); %></td>
                                    </tr>
                                    <% if (!rezultat.contains("error")) { %>
                                    <tr class="success">
                                        <th></th>
                                        <td><% out.println(rezultat); %></td>
                                    </tr>
                                    <% } else { %>
                                    <tr class="danger">
                                        <th></th>
                                        <td><% out.println(rezultat); %></td>
                                    </tr>
                                    <% } %>
                                    <% } %>
                                </tbody>
                                <caption>
                                    <td colspan="2"> <center><%out.println("Numar proiecte corecte: " + nrCorecte);%></center></td>
                                </caption>
                            </table>
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
        <%}%>
    </body>
</html>





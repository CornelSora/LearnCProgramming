<% if ((session.getAttribute("userid") == null) || (session.getAttribute("userid") == "")) {
        response.sendRedirect("../index.jsp");
    } else { %>

<html>
    <head>
        <title>File Uploading Form</title>
        <link href="../css/bootstrap.min.css" rel="stylesheet">
        <link href="../css/simple-sidebar.css" rel="stylesheet">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" 
              integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    </head>
    <body>
        <div id="wrapper">

            <!-- Sidebar -->
            <jsp:include page="../MenuApp/menuBar.jsp" />
            <!-- /#sidebar-wrapper -->
            <button class="btn btn-default" id="menu-toggle" style="background-color: #D0D0D0">
                <span class="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
            </button> <br/>
            <!-- Page Content -->
            <h1><% out.println(System.getProperty("user.dir")); %></h1>
            <div id="page-content-wrapper">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <h3>File Upload:</h3>
                            <label class="control-label">Select a file to upload: </label> <br />
                            <form class="form-control-static" action="FileUpload.jsp" method="post"
                                  enctype="multipart/form-data">
                                <input type="file" name="file" size="50" multiple />
                                <br />
                                <input type="submit" value="Upload File" />
                            </form>
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
<% }%>
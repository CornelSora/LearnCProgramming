<%-- 
    Document   : ChangePassword
    Created on : Oct 24, 2016, 11:59:37 PM
    Author     : corne
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="../css/customStyle.css" >
        <title>Change Password</title>
    </head>
    <body>

        <div class="container">
            <div class="info">
            </div>
        </div>  

        <div class="form">
            <div class="thumbnail"><img src="http://images.clipartpanda.com/laptop-png-laptop1.png"/></div>
            <form class="login-form" action="VerifNewPass.jsp">
                <center><h3>Change Password</h3></center>
                <input type="text" name = "uname" placeholder="username"/>
                <input type="password" name="password" placeholder="new password"/>
                <input type="password" name="password" placeholder="confirm new password"/>
                <input type="email" name="email" placeholder="email"/>
                <button action = "submit">Submit</button>
            </form>
        </div>
        <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
        <script src="../js/index.js"></script>
    </body>
</html>

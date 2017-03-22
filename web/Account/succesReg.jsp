<%-- 
    Document   : succesReg
    Created on : Oct 23, 2016, 9:47:12 PM
    Author     : corne
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="../css/customStyle.css">
        <title>Learn C Programming</title>
    </head>
    <body>
        <div class="container">
            <div class="info">
                Registration successful! <br/>
                Please login here: <br/>
            </div>
        </div>
        <div class="form">
            <div class="thumbnail"><img src="http://images.clipartpanda.com/laptop-png-laptop1.png"/></div>

            <form class="login-form" action="VerifyAcccount.jsp">
                <center><h3>Login</h3></center>
                <input type="text" name = "uname" placeholder="username"/>
                <input type="password" name="password" placeholder="password"/>
                <button action = "submit">Login</button>
            </form>
        </div>
        <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
        <script src="../js/index.js"></script>

    </body>
</html>

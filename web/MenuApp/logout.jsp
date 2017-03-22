<%
session.setAttribute("userid", null);
session.invalidate();
response.reset();
response.sendRedirect("../index.jsp");
%>

<%@page import="proiectLicenta.clase.User"%>
<%@page import="proiectLicenta.clase.UserDAO"%>

<%
    String tip = session.getAttribute("tip").toString();
%>

<div id="sidebar-wrapper">
    <ul class="sidebar-nav">
        <li class="sidebar-brand">
            <a href='menu.jsp'>
                Learn C Programming
            </a>
        </li>
        <li>
            <a href='tests.jsp'>Go to Tests</a>
        </li>
        <li>
            <a href='ConsoleRun.jsp?id=0'>Go to Console</a>
        </li>
        <li>
            <a href='SelectareFisier.jsp'>Verify my files</a>
        </li>
        <% if (tip != null && tip.toLowerCase().equals("profesor")) { %>
        <li>
            <a href='SituatieStudenti.jsp'>Situatie studenti</a>
        </li>
        <% }%>

        <li>
            <a href='logout.jsp'>Iesire</a>
        </li>
    </ul>
</div>


<%@page import="proiectLicenta.clase.Subiect"%>
<%@page import="proiectLicenta.clase.ListaProbleme"%>

<div id="sidebar-wrapper">
    <ul class="sidebar-nav">
        <li class="sidebar-brand">
            <a href="#">
                Learn C Programming
            </a>
        </li>
        <li>
            <a href="ConsoleRun.jsp?id=no">Consola</a>
        </li>
        <%
            int i = 0;
            for (Subiect subiect : ListaProbleme.getListaProblemeExercitiu()) {
                if (!subiect.getDenumireSubiect().toLowerCase().equals("test")) {
                    out.println("<li><a href='ConsoleRun.jsp?id=" + (i++) + "'>"
                            + subiect.getDenumireSubiect() + "</a></li>");
                }
            }
        %>
        <li>
            <a href='menu.jsp'>Inapoi</a>
        </li>
    </ul>
</div>


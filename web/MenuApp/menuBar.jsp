<%@page import="proiectLicenta.clase.ListaProbleme"%>
<%@page import="proiectLicenta.clase.User"%>
<%@page import="proiectLicenta.clase.UserDAO"%>

<%
    ListaProbleme.initializareLista();
%>

<%    String tip = session.getAttribute("tip").toString();
%>

<div id="sidebar-wrapper">
    <ul class="sidebar-nav">
        <li class="sidebar-brand">
            <a href='menu.jsp'>
                Learn C Programming
            </a>
        </li>

        <% if (tip != null && tip.toLowerCase().equals("profesor")) { %>
        <li>
            <a href='SituatieStudenti.jsp'>Situatie studenti</a>
        </li>
        <li>
            <a href='IntroducereTest.jsp'>Inserare noua problema</a>
        </li>
        <li>
            <a href='SelectareFisier.jsp'>Verificare fisiere</a>
        </li>  
        <% } else { %>
        <li>
            <a href='tests.jsp'>Teste grila</a>
        </li>
        <li>
            <a href='ConsoleRun.jsp?id=no'>Probleme</a>
        </li>
        <li>
            <a href='SelectareFisier.jsp'>Verificare fisiere</a>
        </li>  
        <%}%>

        <% if (tip != null && tip.toLowerCase().equals("student")) {%>
        <li>
            <a href='StudentTest.jsp'>Sustinere test</a>
        </li>
        <%}%>

        <li>
            <a href='logout.jsp'>Iesire</a>
        </li>
    </ul>
</div>

package protectLicenta.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import proiectLicenta.clase.CodeTest;
import proiectLicenta.clase.FileUser;
import proiectLicenta.clase.FileUserDAO;

@WebServlet(name = "CreateFile", urlPatterns = {"/CreateFile"})
public class CreateFile extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        HttpSession session = request.getSession();
        CodeTest codeTest = (CodeTest) session.getAttribute("testCurent");
        response.sendRedirect("/ProiectLicenta/MenuApp/ConsoleRun.jsp?id=" + codeTest.getId());
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String numeFisier = request.getParameter("fileName");
        String continut = request.getParameter("continut");
        HttpSession session = request.getSession();
        int userId = (int) session.getAttribute("userid");
        String userPathFile = null;
        if (System.getProperty("os.name").toLowerCase().contains("windows")) {
            userPathFile = "Conturi\\" + session.getAttribute("userPath").toString();
        } else {
            userPathFile = "Conturi/" + session.getAttribute("userPath").toString();
        }
        FileUser fileUser = new FileUser();
        fileUser.setUserId(userId);
        fileUser.setFileName(numeFisier);
        int i = 0;
        FileUserDAO fileUserDAO = null;
        try {
            fileUserDAO = new FileUserDAO();
            boolean fileExists = fileUserDAO.getFileByNameAndId(fileUser.getUserId(), fileUser.getFileName());
            if (!fileExists) {
                i = fileUserDAO.addFile(fileUser);
            }
            if (System.getProperty("os.name").toLowerCase().contains("windows")) {
                try (PrintWriter pw = new PrintWriter(userPathFile + "\\" + numeFisier)) {
                    pw.write(continut);
                }
            } else {
                try (PrintWriter pw = new PrintWriter(userPathFile + "/" + numeFisier)) {
                    pw.write(continut);
                }
            }
        } catch (Exception ex) {
            System.out.println(ex.toString());
        } finally {
            if (fileUserDAO != null) {
                fileUserDAO.closeConnection();
            }
        }
        processRequest(request, response);
    }
}

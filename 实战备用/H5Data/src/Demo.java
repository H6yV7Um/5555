import java.io.IOException;

/**
 * Created by Evil on 16/8/17.
 */
@javax.servlet.annotation.WebServlet(name = "Demo",urlPatterns = {"/url/demo"})
public class Demo extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        final String _name=request.getParameter("name");
        final String _location=request.getParameter("location");

        //response.getWriter().print("abc");
    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

    }
}

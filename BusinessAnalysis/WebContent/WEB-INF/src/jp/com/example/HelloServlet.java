package jp.com.example;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class HelloServlet
 */
@WebServlet("/HelloServlet")
public class HelloServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	  public void doGet (HttpServletRequest req, HttpServletResponse res)
			    throws ServletException, IOException {
			    PrintWriter out;

			    res.setContentType("text/html; charset=UTF-8");
			    try{
			    out = res.getWriter();

			    out.println("<html><body>");
			    out.println("<h1>Hello World!</h1>");
			    out.println("<p>Servletのサンプル（HelloServlet.java）</p>");
			    out.println("</body></html>");
			    }catch(Exception e){
			    	e.printStackTrace();
			    }
			  }

}

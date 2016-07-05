package jp.ba.serv;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jp.com.db.DBComOperation;
import net.sf.json.JSONObject;

/**
 * Servlet implementation class DataPanel
 */
@WebServlet("/DataPanel")
public class DataPanel extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private enum Command{
		RT, //Request Tables
		RD, //Request Data
	}

    /**
     * @see HttpServlet#HttpServlet()
     */
    public DataPanel() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@SuppressWarnings("deprecation")
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		String com = request.getParameter("command");
		Command command = Command.valueOf(com);
		switch(command){
			case RT:
					PrintWriter out = response.getWriter();
					JSONObject json = new JSONObject();
					ArrayList<HashMap<String,String>> array = DBComOperation.GetAllTableNames(request.getRealPath(""));
					array.addAll(DBComOperation.GetAllViewNames(request.getRealPath("")));
					json.accumulate("data", array);
					out.print(json);
				break;
			case RD:
					String tableName = request.getParameter("name");
					PrintWriter outRD = response.getWriter();
					JSONObject jsonRD = new JSONObject();
					ArrayList<HashMap<String, String>> arrayCl = DBComOperation.GetAllFieldNames(request.getRealPath(""), tableName);
					ArrayList<HashMap<String, String>> arrayRD = DBComOperation.GetAllTableData(request.getRealPath(""), tableName);
					jsonRD.accumulate("columns", arrayCl);
					jsonRD.accumulate("data", arrayRD);
					outRD.print(jsonRD);
				break;
			default:
				break;
		}
	}

}

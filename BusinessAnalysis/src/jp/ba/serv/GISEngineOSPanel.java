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
import jp.com.db.DBConnection;
import net.sf.json.JSONObject;

@WebServlet("/GISEngineOSPanel")
public class GISEngineOSPanel extends HttpServlet {
	private static final long serialVersionUID = 1L;
	/**
	 * コマンド
	 * @author h1-taguchi
	 *
	 */
	private enum Command{
		EO, //Request EngineOSTable
	}

    /**
     * @see HttpServlet#HttpServlet()
     */
    public GISEngineOSPanel() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");

		String com = request.getParameter("command");
		Command command = Command.valueOf(com);

		@SuppressWarnings("deprecation")
		String contextRootRealPath = request.getRealPath("");
		switch(command){
			case EO:
				PrintWriter out = response.getWriter();
				JSONObject jsonGO = new JSONObject();

				DBConnection con = new DBConnection();
				con.Connect(contextRootRealPath);

				ArrayList<HashMap<String, String>> fns = DBComOperation.GetAllFieldNames(contextRootRealPath, "v_gisengineos");
				ArrayList<HashMap<String, String>> data = DBComOperation.GetAllTableData(contextRootRealPath, "v_gisengineos");
				jsonGO.accumulate("columns", fns);
				jsonGO.accumulate("data", data);
				out.print(jsonGO);
			break;
		}
	}
}

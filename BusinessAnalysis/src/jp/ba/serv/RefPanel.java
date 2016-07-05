package jp.ba.serv;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jp.com.db.DBConnection;
import net.sf.json.JSONObject;


/**
 * Servlet implementation class RefPanel
 */
@WebServlet("/RefPanel")
public class RefPanel extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public RefPanel() {
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

		DBConnection dbcon = new DBConnection();
		dbcon.Connect(request.getRealPath(""));
		PrintWriter out = response.getWriter();
		try {
			ArrayList<HashMap<String,String>> array = new ArrayList<HashMap<String,String>>();
			JSONObject json = new JSONObject();
			Statement stmt = dbcon.con.createStatement();
			String sql = "select * from reference";
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next()){
				HashMap<String, String> hash = new HashMap<String,String>();
				hash.put("id", rs.getString("id"));
				hash.put("category", rs.getString("category"));
				hash.put("link", "<a href = '" + rs.getString("url") + "'>" +
						rs.getString("title") + "</a>");
				array.add(hash);
			}
			json.accumulate("data", array);
			out.print(json);
			stmt.close();
			dbcon.Close();
		} catch (SQLException e) {
			// TODO 自動生成された catch ブロック
			e.printStackTrace();
		}
	}

}

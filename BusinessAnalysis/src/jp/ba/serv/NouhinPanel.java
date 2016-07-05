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

import jp.com.db.DBComOperation;
import jp.com.db.DBConnection;
import net.sf.json.JSONObject;

/**
 * Servlet implementation class NouhinPanel
 */
@WebServlet("/NouhinPanel")
public class NouhinPanel extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private enum Command{
		AK, //Request Ankens
		NH, //Request NouhinData
	}
    /**
     * @see HttpServlet#HttpServlet()
     */
    public NouhinPanel() {
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
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		String com = request.getParameter("command");
		Command command = Command.valueOf(com);
		@SuppressWarnings("deprecation")
		String contextRootRealPath = request.getRealPath("");

		switch(command){
			case AK:
				PrintWriter out = response.getWriter();
				JSONObject json = new JSONObject();

				DBConnection con = new DBConnection();
				con.Connect(contextRootRealPath);

				ArrayList<HashMap<String, String>> fns = DBComOperation.GetAllFieldNames(contextRootRealPath, "v_anken");
				ArrayList<HashMap<String,String>> array =new ArrayList<HashMap<String,String>>();
				try {
					//フィールド名を取得する
					String sql = "select * from v_anken";
					Statement stmt = con.con.createStatement();
					ResultSet rs = stmt.executeQuery(sql);
					while(rs.next()){
						HashMap<String, String> hm = new HashMap<String, String>();
						for(int i = 0; i < fns.size(); i++){
							String fn = fns.get(i).get("name");
							hm.put(fn, rs.getString(fn));
						}
						array.add(hm);
					}
					con.Close();
					json.accumulate("data", array);
					out.print(json);
				} catch (SQLException e) {
					e.printStackTrace();
				}
			break;
			case NH:
				String ankenID = request.getParameter("anken_id");
				PrintWriter outNH = response.getWriter();
				JSONObject jsonNH = new JSONObject();

				DBConnection conNH = new DBConnection();
				conNH.Connect(contextRootRealPath);
				ArrayList<HashMap<String, String>> fnsNH = getColumnInfo();
				ArrayList<HashMap<String, String>> fnsAll = DBComOperation.GetAllFieldNames(contextRootRealPath, "v_nouhinbutsu");
				ArrayList<HashMap<String,String>> arrayNH =new ArrayList<HashMap<String,String>>();
				try {
					//フィールド名を取得する
					String sql = "select * from v_nouhinbutsu where anken_id = " + ankenID;
					Statement stmt = conNH.con.createStatement();
					ResultSet rs = stmt.executeQuery(sql);
					while(rs.next()){
						HashMap<String, String> hm = new HashMap<String, String>();
						for(int i = 0; i < fnsAll.size(); i++){
							String fn = fnsAll.get(i).get("name");
							hm.put(fn, rs.getString(fn));
						}
						arrayNH.add(hm);
					}
					conNH.Close();
					jsonNH.accumulate("data", arrayNH);
					jsonNH.accumulate("columns", fnsNH);
					outNH.print(jsonNH);
				} catch (SQLException e) {
					e.printStackTrace();
				}

				break;
		default:
			break;
		}
	}
	private ArrayList<HashMap<String, String>> getColumnInfo(){
		ArrayList<HashMap<String, String>> array = new ArrayList<HashMap<String, String>>();
		/*
		HashMap<String, String> hmID = new HashMap<String, String>();
		hmID.put("name", "anken_id");
		hmID.put("label", "案件ID");
		array.add(hmID);

		HashMap<String, String> hmName = new HashMap<String, String>();
		hmName.put("name", "title");
		hmName.put("label", "案件");
		array.add(hmName);

		HashMap<String, String> hmHanbaiten = new HashMap<String, String>();
		hmHanbaiten.put("name", "hanbaiten");
		hmHanbaiten.put("label", "販売店");
		array.add(hmHanbaiten);

		*/
		HashMap<String, String> hmNouhinbutsu = new HashMap<String, String>();
		hmNouhinbutsu.put("name", "syouhin");
		hmNouhinbutsu.put("label", "納品物");
		array.add(hmNouhinbutsu);

		HashMap<String, String> hmNouhinmoto = new HashMap<String, String>();
		hmNouhinmoto.put("name", "syouhin_seller");
		hmNouhinmoto.put("label", "納品元");
		array.add(hmNouhinmoto);

		HashMap<String, String> hmSyouhinType = new HashMap<String, String>();
		hmSyouhinType.put("name", "syouhin_type");
		hmSyouhinType.put("label", "種別");
		array.add(hmSyouhinType);

		HashMap<String, String> hmVersion = new HashMap<String, String>();
		hmVersion.put("name", "version");
		hmVersion.put("label", "バージョン");
		array.add(hmVersion);


		return array;

	}
}

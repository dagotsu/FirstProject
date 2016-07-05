package jp.com.db;

import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

import jp.server.gen.GetSystemSettings;

/**
 * 共通のデータベース操作
 * @author h1-taguchi
 *
 */
public class DBComOperation {
	public static ArrayList<HashMap<String,String>> GetAllTableNames(String contextRootRealPath){
		DBConnection con = new DBConnection();
		con.Connect(contextRootRealPath);

		String SchemaName = GetSystemSettings.GetPropertyValue(contextRootRealPath, "dbname");

		ArrayList<HashMap<String,String>> array =new ArrayList<HashMap<String,String>>();
		try {
			DatabaseMetaData meta = con.con.getMetaData();
			ResultSet rs = meta.getTables(null, SchemaName, "%", new String[]{"TABLE"});
			while(rs.next()){
				HashMap<String,String> hm = new HashMap<String,String>();
				hm.put("name", rs.getString("TABLE_NAME"));
				array.add(hm);
			}
			rs.close();
			con.Close();
			return array;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	public static ArrayList<HashMap<String, String>> GetAllViewNames(String contextRootRealPath){
		DBConnection con = new DBConnection();
		con.Connect(contextRootRealPath);
		String SchemaName = GetSystemSettings.GetPropertyValue(contextRootRealPath, "dbname");
		ArrayList<HashMap<String,String>> array =new ArrayList<HashMap<String,String>>();
		try {
			DatabaseMetaData meta = con.con.getMetaData();
			ResultSet rs = meta.getTables(null, SchemaName, "%", new String[]{"VIEW"});
			while(rs.next()){
				HashMap<String,String> hm = new HashMap<String,String>();
				hm.put("name", rs.getString("TABLE_NAME"));
				array.add(hm);
			}
			rs.close();
			con.Close();
			return array;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	public static ArrayList<HashMap<String,String>> GetAllTableData(String contextRootRealPath, String tableName){
		ArrayList<HashMap<String, String>> fns = DBComOperation.GetAllFieldNames(contextRootRealPath, tableName);

		DBConnection con = new DBConnection();
		ArrayList<HashMap<String,String>> array =new ArrayList<HashMap<String,String>>();
		con.Connect(contextRootRealPath);
		try{
			//フィールド名を取得する
			String sql = "select * from " + tableName;
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
			return array;
		}catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	public static ArrayList<HashMap<String, String>> GetAllFieldNames(String contextRootRealPath, String tableName){
		DBConnection con = new DBConnection();
		ArrayList<HashMap<String,String>> array =new ArrayList<HashMap<String,String>>();
		con.Connect(contextRootRealPath);
		try{
			//フィールド名を取得する
			String sql = "select * from " + tableName;
			Statement stmt = con.con.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			ResultSetMetaData rsmd = rs.getMetaData();
			for(int i = 1; i <= rsmd.getColumnCount(); i++){
				HashMap<String, String> hm = new HashMap<String, String>();
				hm.put("name", rsmd.getColumnName(i));
				array.add(hm);
			}
			stmt.close();
			con.Close();
			return array;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
}

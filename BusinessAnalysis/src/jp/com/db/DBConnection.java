package jp.com.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import jp.server.gen.GetSystemSettings;

public class DBConnection {
	public Connection con;

	public enum ER{
		OK,
	}

	/**
	 *
	 * @param ContextRootRealPath
	 */
	public void Connect(String ContextRootRealPath){
		try{
			String driver = GetSystemSettings.GetPropertyValue(ContextRootRealPath, "dbdriver");
			String dbhost = GetSystemSettings.GetPropertyValue(ContextRootRealPath, "dbhost");
			String dbname = GetSystemSettings.GetPropertyValue(ContextRootRealPath, "dbname");
			String dbuser = GetSystemSettings.GetPropertyValue(ContextRootRealPath, "dbuser");
			String dbpass = GetSystemSettings.GetPropertyValue(ContextRootRealPath, "dbpassword");
			String url = "jdbc:mysql://" + dbhost + "/" + dbname + "?useUnicode=true&characterEncoding=UTF-8";
			Class.forName(driver);
			this.con = DriverManager.getConnection(url, dbuser, dbpass);
		}catch(SQLException e){
			System.err.println("SQL Failed");
			e.printStackTrace();
		}catch(ClassNotFoundException ex){
			ex.printStackTrace();
		}
	}

	/**
	 * コネクションを閉じる
	 */
	public void Close(){
		if(this.con != null){
			try {
				this.con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}

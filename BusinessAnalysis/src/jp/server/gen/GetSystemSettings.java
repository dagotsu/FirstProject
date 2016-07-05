package jp.server.gen;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class GetSystemSettings {
	private static String GetPropertiesFilePath(String ContextRootRealPath){
		return ContextRootRealPath + "/../Properties/System.properties";
	}
	public static String GetPropertyValue(String ContextRootRealPath, String Key){
		Properties configuration = new Properties();
		String PropertyFilePath = GetPropertiesFilePath(ContextRootRealPath);
		InputStream inputStream;
		try {
			inputStream = new FileInputStream(new File(PropertyFilePath));
			configuration.load(inputStream);
			return configuration.getProperty(Key);
		} catch (FileNotFoundException e) {
			// TODO 自動生成された catch ブロック
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			// TODO 自動生成された catch ブロック
			e.printStackTrace();
			return null;
		}
	}
}

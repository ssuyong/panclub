package kr.co.panclub.dao;

import java.util.HashMap;
import java.util.List;

import kr.co.panclub.model.C_cust;
import kr.co.panclub.model.C_custMenu;




public interface IClubDao {

	//팬클럽 이용거래처
	public List<C_cust> c_custList(HashMap<String, Object> params);      
	public int c_custAdd(HashMap<String, Object> params);				
	public int c_custDel(HashMap<String, Object> params);				
	public int c_custUpt(HashMap<String, Object> params);				
	
	//팬클럽 이용거래처별 메뉴
	public int c_custMenuAdd(HashMap<String, Object> params);   // 등록
	public int c_custMenuDel(HashMap<String, Object> params);   // 등록
	public int c_custMenuUpt(HashMap<String, Object> params);   // 등록
	public List<C_custMenu> c_custMenuList(HashMap<String, Object> params);       //리스팅   
	
}

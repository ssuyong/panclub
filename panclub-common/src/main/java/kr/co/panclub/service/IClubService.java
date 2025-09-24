package kr.co.panclub.service;

import java.util.HashMap;
import java.util.List;

import kr.co.panclub.model.C_cust;
import kr.co.panclub.model.C_custMenu;



public interface IClubService {
	
	//팬클럽이용 거래처
	public List<C_cust> c_custList(HashMap<String, Object> params);       
	public int c_custReg(HashMap<String, Object> params);				

	//팬클럽이용 거래처별 메뉴
	public List<C_custMenu> c_custMenuList(HashMap<String, Object> params);       
	public int c_custMenuReg(HashMap<String, Object> params);			
}

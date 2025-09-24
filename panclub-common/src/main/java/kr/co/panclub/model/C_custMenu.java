package kr.co.panclub.model;

import java.util.ArrayList;
import java.util.Date;

public class C_custMenu {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private int idx;
	private String custCode;
	private String custName;
	private String menuCode;
	private String menuName;
	private String validYN;
	private String uptUserId;
	private Date modified;
	
	// 수정 행 리스트
	private ArrayList<C_custMenu> c_custMenuUpdate;	
	// 추가 행 리스트
	private ArrayList<C_custMenu>c_custMenuAdd;	
	// 삭제 행 리스트
	private ArrayList<C_custMenu> c_custMenuRemove;
	public String getWorkingType() {
		return workingType;
	}
	public void setWorkingType(String workingType) {
		this.workingType = workingType;
	}
	public String getDb_resultCode() {
		return db_resultCode;
	}
	public void setDb_resultCode(String db_resultCode) {
		this.db_resultCode = db_resultCode;
	}
	public String getDb_resultMsg() {
		return db_resultMsg;
	}
	public void setDb_resultMsg(String db_resultMsg) {
		this.db_resultMsg = db_resultMsg;
	}
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
	}
	public String getCustCode() {
		return custCode;
	}
	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
	}
	public String getMenuCode() {
		return menuCode;
	}
	public void setMenuCode(String menuCode) {
		this.menuCode = menuCode;
	}
	public String getMenuName() {
		return menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	public String getValidYN() {
		return validYN;
	}
	public void setValidYN(String validYN) {
		this.validYN = validYN;
	}
	public String getUptUserId() {
		return uptUserId;
	}
	public void setUptUserId(String uptUserId) {
		this.uptUserId = uptUserId;
	}
	public Date getModified() {
		return modified;
	}
	public void setModified(Date modified) {
		this.modified = modified;
	}
	public ArrayList<C_custMenu> getC_custMenuUpdate() {
		return c_custMenuUpdate;
	}
	public void setC_custMenuUpdate(ArrayList<C_custMenu> c_custMenuUpdate) {
		this.c_custMenuUpdate = c_custMenuUpdate;
	}
	public ArrayList<C_custMenu> getC_custMenuAdd() {
		return c_custMenuAdd;
	}
	public void setC_custMenuAdd(ArrayList<C_custMenu> c_custMenuAdd) {
		this.c_custMenuAdd = c_custMenuAdd;
	}
	public ArrayList<C_custMenu> getC_custMenuRemove() {
		return c_custMenuRemove;
	}
	public void setC_custMenuRemove(ArrayList<C_custMenu> c_custMenuRemove) {
		this.c_custMenuRemove = c_custMenuRemove;
	}
	@Override
	public String toString() {
		return "C_custMenu [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", idx=" + idx + ", custCode=" + custCode + ", custName=" + custName + ", menuCode="
				+ menuCode + ", menuName=" + menuName + ", validYN=" + validYN + ", uptUserId=" + uptUserId
				+ ", modified=" + modified + ", c_custMenuUpdate=" + c_custMenuUpdate + ", c_custMenuAdd="
				+ c_custMenuAdd + ", c_custMenuRemove=" + c_custMenuRemove + "]";
	}
	
	
	

	
	
	
	
}

package kr.co.panclub.model;

import java.util.ArrayList;
import java.util.Date;

public class Menu {

	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
    private String menuCode;  // 코드
    private String menuName;  // 메뉴명 
    private String regUserId; // 등록자
    private Date created;
    private String menuUrl;    
    private String validYN; //김보경 추가 
    private String comCode; //김보경 추가
    
    private ArrayList<Menu> menuUpdate;//정동근추가
    private ArrayList<Menu> menuAdd;	//정동근추가
    private ArrayList<Menu> menuRemove;	//정동근추가
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
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}
	public Date getCreated() {
		return created;
	}
	public void setCreated(Date created) {
		this.created = created;
	}
	public String getMenuUrl() {
		return menuUrl;
	}
	public void setMenuUrl(String menuUrl) {
		this.menuUrl = menuUrl;
	}
	public String getValidYN() {
		return validYN;
	}
	public void setValidYN(String validYN) {
		this.validYN = validYN;
	}
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public ArrayList<Menu> getMenuUpdate() {
		return menuUpdate;
	}
	public void setMenuUpdate(ArrayList<Menu> menuUpdate) {
		this.menuUpdate = menuUpdate;
	}
	public ArrayList<Menu> getMenuAdd() {
		return menuAdd;
	}
	public void setMenuAdd(ArrayList<Menu> menuAdd) {
		this.menuAdd = menuAdd;
	}
	public ArrayList<Menu> getMenuRemove() {
		return menuRemove;
	}
	public void setMenuRemove(ArrayList<Menu> menuRemove) {
		this.menuRemove = menuRemove;
	}
	@Override
	public String toString() {
		return "Menu [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", menuCode=" + menuCode + ", menuName=" + menuName + ", regUserId=" + regUserId
				+ ", created=" + created + ", menuUrl=" + menuUrl + ", validYN=" + validYN + ", comCode=" + comCode
				+ ", menuUpdate=" + menuUpdate + ", menuAdd=" + menuAdd + ", menuRemove=" + menuRemove + "]";
	}

    
    
    
  
    
    
}

package kr.co.panclub.model;

import java.util.ArrayList;

public class MenuByUser {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;

	private String rowID;
	private String comCode;
	private String userId;
	private String userName;
	private String menuCode;
	private String menuName;
	private String srchAuth;
	private String editAuth;
	private String uptUserId;
	private String modified;
	private int idx;
	
	
	// 추가 행 리스트
	private ArrayList<MenuByUser> menuByUserAdd;
	// 수정 행 리스트
	private ArrayList<MenuByUser> menuByUserUpdate;
	// 삭제 행 리스트
	private ArrayList<MenuByUser> menuByUserRemove;
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
	public String getRowID() {
		return rowID;
	}
	public void setRowID(String rowID) {
		this.rowID = rowID;
	}
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
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
	public String getSrchAuth() {
		return srchAuth;
	}
	public void setSrchAuth(String srchAuth) {
		this.srchAuth = srchAuth;
	}
	public String getEditAuth() {
		return editAuth;
	}
	public void setEditAuth(String editAuth) {
		this.editAuth = editAuth;
	}
	public String getUptUserId() {
		return uptUserId;
	}
	public void setUptUserId(String uptUserId) {
		this.uptUserId = uptUserId;
	}
	public String getModified() {
		return modified;
	}
	public void setModified(String modified) {
		this.modified = modified;
	}
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
	}
	public ArrayList<MenuByUser> getMenuByUserAdd() {
		return menuByUserAdd;
	}
	public void setMenuByUserAdd(ArrayList<MenuByUser> menuByUserAdd) {
		this.menuByUserAdd = menuByUserAdd;
	}
	public ArrayList<MenuByUser> getMenuByUserUpdate() {
		return menuByUserUpdate;
	}
	public void setMenuByUserUpdate(ArrayList<MenuByUser> menuByUserUpdate) {
		this.menuByUserUpdate = menuByUserUpdate;
	}
	public ArrayList<MenuByUser> getMenuByUserRemove() {
		return menuByUserRemove;
	}
	public void setMenuByUserRemove(ArrayList<MenuByUser> menuByUserRemove) {
		this.menuByUserRemove = menuByUserRemove;
	}
	@Override
	public String toString() {
		return "MenuByUser [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", rowID=" + rowID + ", comCode=" + comCode + ", userId=" + userId + ", userName="
				+ userName + ", menuCode=" + menuCode + ", menuName=" + menuName + ", srchAuth=" + srchAuth
				+ ", editAuth=" + editAuth + ", uptUserId=" + uptUserId + ", modified=" + modified + ", idx=" + idx
				+ ", menuByUserAdd=" + menuByUserAdd + ", menuByUserUpdate=" + menuByUserUpdate + ", menuByUserRemove="
				+ menuByUserRemove + "]";
	}
	
	
}

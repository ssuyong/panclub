package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;

public class ItemOe {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private long itemId;
	
	// 추가 행 리스트
	private ArrayList<ItemOe> itemOeAdd;
	// 수정 행 리스트
	private ArrayList<ItemOe> itemOeUpdate;
	// 삭제 행 리스트
	private ArrayList<ItemOe> itemOeRemove;

	private String makerCode;
	private String oeNo;
	private String validYN;
	private String regUserName;
	private String created;
	private String uptUserId;
	private String modified;
	private String makerCode_oe;
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
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public long getItemId() {
		return itemId;
	}
	public void setItemId(long itemId) {
		this.itemId = itemId;
	}
	public ArrayList<ItemOe> getItemOeAdd() {
		return itemOeAdd;
	}
	public void setItemOeAdd(ArrayList<ItemOe> itemOeAdd) {
		this.itemOeAdd = itemOeAdd;
	}
	public ArrayList<ItemOe> getItemOeUpdate() {
		return itemOeUpdate;
	}
	public void setItemOeUpdate(ArrayList<ItemOe> itemOeUpdate) {
		this.itemOeUpdate = itemOeUpdate;
	}
	public ArrayList<ItemOe> getItemOeRemove() {
		return itemOeRemove;
	}
	public void setItemOeRemove(ArrayList<ItemOe> itemOeRemove) {
		this.itemOeRemove = itemOeRemove;
	}
	public String getMakerCode() {
		return makerCode;
	}
	public void setMakerCode(String makerCode) {
		this.makerCode = makerCode;
	}
	public String getOeNo() {
		return oeNo;
	}
	public void setOeNo(String oeNo) {
		this.oeNo = oeNo;
	}
	public String getValidYN() {
		return validYN;
	}
	public void setValidYN(String validYN) {
		this.validYN = validYN;
	}
	public String getRegUserName() {
		return regUserName;
	}
	public void setRegUserName(String regUserName) {
		this.regUserName = regUserName;
	}
	public String getCreated() {
		return created;
	}
	public void setCreated(String created) {
		this.created = created;
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
	public String getMakerCode_oe() {
		return makerCode_oe;
	}
	public void setMakerCode_oe(String makerCode_oe) {
		this.makerCode_oe = makerCode_oe;
	}
	@Override
	public String toString() {
		final int maxLen = 10;
		return "ItemOe [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", itemId=" + itemId + ", itemOeAdd="
				+ (itemOeAdd != null ? itemOeAdd.subList(0, Math.min(itemOeAdd.size(), maxLen)) : null)
				+ ", itemOeUpdate="
				+ (itemOeUpdate != null ? itemOeUpdate.subList(0, Math.min(itemOeUpdate.size(), maxLen)) : null)
				+ ", itemOeRemove="
				+ (itemOeRemove != null ? itemOeRemove.subList(0, Math.min(itemOeRemove.size(), maxLen)) : null)
				+ ", makerCode=" + makerCode + ", oeNo=" + oeNo + ", validYN=" + validYN + ", regUserName="
				+ regUserName + ", created=" + created + ", uptUserId=" + uptUserId + ", modified=" + modified
				+ ", makerCode_oe=" + makerCode_oe + "]";
	}
	
	
	

	
	
	
}

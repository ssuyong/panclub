package kr.co.panclub.model;

import java.util.ArrayList;
import java.util.Date;

public class cCustPurRate {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
    private String comCode; 
    private String custCode; 
    private String custName;
    private String makerCode;
    private String makerName;
    private int itemId;
    private String itemNo;
    private String itemName;
    
    private float purRate;
    
    private int idx;
    
    private String regUserId;
    private String regUserName;
	private String created;
	private String uptUserId;
	private String uptUserName;
	private String modified;
	private String selectCustCode;
	
	
	private ArrayList<cCustPurRate> addList;
	private ArrayList<cCustPurRate> uptList;
	private ArrayList<cCustPurRate> uptItem;
	private ArrayList<cCustPurRate> delList;
	
	 
	private String className;
	private String factoryNo;
	
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
	public String getMakerCode() {
		return makerCode;
	}
	public void setMakerCode(String makerCode) {
		this.makerCode = makerCode;
	}
	public String getMakerName() {
		return makerName;
	}
	public void setMakerName(String makerName) {
		this.makerName = makerName;
	}
	public int getItemId() {
		return itemId;
	}
	public void setItemId(int itemId) {
		this.itemId = itemId;
	}
	public String getItemNo() {
		return itemNo;
	}
	public void setItemNo(String itemNo) {
		this.itemNo = itemNo;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public float getPurRate() {
		return purRate;
	}
	public void setPurRate(float purRate) {
		this.purRate = purRate;
	}
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
	}
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
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
	public String getUptUserName() {
		return uptUserName;
	}
	public void setUptUserName(String uptUserName) {
		this.uptUserName = uptUserName;
	}
	public String getModified() {
		return modified;
	}
	public void setModified(String modified) {
		this.modified = modified;
	}
	public String getSelectCustCode() {
		return selectCustCode;
	}
	public void setSelectCustCode(String selectCustCode) {
		this.selectCustCode = selectCustCode;
	}
	public ArrayList<cCustPurRate> getAddList() {
		return addList;
	}
	public void setAddList(ArrayList<cCustPurRate> addList) {
		this.addList = addList;
	}
	public ArrayList<cCustPurRate> getUptList() {
		return uptList;
	}
	public void setUptList(ArrayList<cCustPurRate> uptList) {
		this.uptList = uptList;
	}
	public ArrayList<cCustPurRate> getUptItem() {
		return uptItem;
	}
	public void setUptItem(ArrayList<cCustPurRate> uptItem) {
		this.uptItem = uptItem;
	}
	public ArrayList<cCustPurRate> getDelList() {
		return delList;
	}
	public void setDelList(ArrayList<cCustPurRate> delList) {
		this.delList = delList;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public String getFactoryNo() {
		return factoryNo;
	}
	public void setFactoryNo(String factoryNo) {
		this.factoryNo = factoryNo;
	}
	@Override
	public String toString() {
		return "cCustPurRate [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", custCode=" + custCode + ", custName=" + custName
				+ ", makerCode=" + makerCode + ", makerName=" + makerName + ", itemId=" + itemId + ", itemNo=" + itemNo
				+ ", itemName=" + itemName + ", purRate=" + purRate + ", idx=" + idx + ", regUserId=" + regUserId
				+ ", regUserName=" + regUserName + ", created=" + created + ", uptUserId=" + uptUserId
				+ ", uptUserName=" + uptUserName + ", modified=" + modified + ", selectCustCode=" + selectCustCode
				+ ", addList=" + addList + ", uptList=" + uptList + ", uptItem=" + uptItem + ", delList=" + delList
				+ ", className=" + className + ", factoryNo=" + factoryNo + "]";
	}
	
}
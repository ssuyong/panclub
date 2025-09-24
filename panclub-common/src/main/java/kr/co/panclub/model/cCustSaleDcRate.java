package kr.co.panclub.model;

import java.util.ArrayList;
import java.util.Date;

public class cCustSaleDcRate {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
    private String comCode; 
    private String custCode; 
    private String custName;
    private String makerCode;
    private String makerName;
   
    
    private float dcRate;
    
    private int idx;
    
    private String regUserId;
    private String regUserName;
	private String created;
	private String uptUserId;
	private String uptUserName;
	private String modified;
	
	private String selectCustCode;
	
	
	private ArrayList<cCustSaleDcRate> addList;
	private ArrayList<cCustSaleDcRate> uptList;
	private ArrayList<cCustSaleDcRate> uptItem;
	private ArrayList<cCustSaleDcRate> delList;
	
	private ArrayList<cCustSaleDcRate> addList2;
	private ArrayList<cCustSaleDcRate> uptList2;
	private ArrayList<cCustSaleDcRate> uptItem2;
	private ArrayList<cCustSaleDcRate> delList2;
	
	private float marginRate;

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
	public float getDcRate() {
		return dcRate;
	}
	public void setDcRate(float dcRate) {
		this.dcRate = dcRate;
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
	public ArrayList<cCustSaleDcRate> getAddList() {
		return addList;
	}
	public void setAddList(ArrayList<cCustSaleDcRate> addList) {
		this.addList = addList;
	}
	public ArrayList<cCustSaleDcRate> getUptList() {
		return uptList;
	}
	public void setUptList(ArrayList<cCustSaleDcRate> uptList) {
		this.uptList = uptList;
	}
	public ArrayList<cCustSaleDcRate> getUptItem() {
		return uptItem;
	}
	public void setUptItem(ArrayList<cCustSaleDcRate> uptItem) {
		this.uptItem = uptItem;
	}
	public ArrayList<cCustSaleDcRate> getDelList() {
		return delList;
	}
	public void setDelList(ArrayList<cCustSaleDcRate> delList) {
		this.delList = delList;
	}
	public ArrayList<cCustSaleDcRate> getAddList2() {
		return addList2;
	}
	public void setAddList2(ArrayList<cCustSaleDcRate> addList2) {
		this.addList2 = addList2;
	}
	public ArrayList<cCustSaleDcRate> getUptList2() {
		return uptList2;
	}
	public void setUptList2(ArrayList<cCustSaleDcRate> uptList2) {
		this.uptList2 = uptList2;
	}
	public ArrayList<cCustSaleDcRate> getUptItem2() {
		return uptItem2;
	}
	public void setUptItem2(ArrayList<cCustSaleDcRate> uptItem2) {
		this.uptItem2 = uptItem2;
	}
	public ArrayList<cCustSaleDcRate> getDelList2() {
		return delList2;
	}
	public void setDelList2(ArrayList<cCustSaleDcRate> delList2) {
		this.delList2 = delList2;
	}
	public float getMarginRate() {
		return marginRate;
	}
	public void setMarginRate(float marginRate) {
		this.marginRate = marginRate;
	}
	@Override
	public String toString() {
		return "cCustSaleDcRate [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", custCode=" + custCode + ", custName=" + custName
				+ ", makerCode=" + makerCode + ", makerName=" + makerName + ", dcRate=" + dcRate + ", idx=" + idx
				+ ", regUserId=" + regUserId + ", regUserName=" + regUserName + ", created=" + created + ", uptUserId="
				+ uptUserId + ", uptUserName=" + uptUserName + ", modified=" + modified + ", selectCustCode="
				+ selectCustCode + ", addList=" + addList + ", uptList=" + uptList + ", uptItem=" + uptItem
				+ ", delList=" + delList + ", addList2=" + addList2 + ", uptList2=" + uptList2 + ", uptItem2="
				+ uptItem2 + ", delList2=" + delList2 + ", marginRate=" + marginRate + "]";
	}
	 
	
	
	
	

}
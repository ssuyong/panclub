package kr.co.panclub.model;

import java.util.ArrayList;

public class SrCust {
	private String db_resultCode;
	private String db_resultMsg;
	private String workingType;
	
	private String srCustIdx;
	private String comCode;
	private String srType;
	private String srCode;
	private String custCode;
	private String custName;
	private float custShareRate;

	private String regUserId;
	private String created;
	private String uptUserId;
	private String modified;	
	
	private String validYN; // 2023.07.13 hsg 사용여부
	
	private ArrayList<SrCust> srCustAdd;
	// 수정 행 리스트
	private ArrayList<SrCust> srCustUpdate;
	// 삭제 행 리스트
	private ArrayList<SrCust> srCustRemove;
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
	public String getWorkingType() {
		return workingType;
	}
	public void setWorkingType(String workingType) {
		this.workingType = workingType;
	}
	public String getSrCustIdx() {
		return srCustIdx;
	}
	public void setSrCustIdx(String srCustIdx) {
		this.srCustIdx = srCustIdx;
	}
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public String getSrType() {
		return srType;
	}
	public void setSrType(String srType) {
		this.srType = srType;
	}
	public String getSrCode() {
		return srCode;
	}
	public void setSrCode(String srCode) {
		this.srCode = srCode;
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
	public float getCustShareRate() {
		return custShareRate;
	}
	public void setCustShareRate(float custShareRate) {
		this.custShareRate = custShareRate;
	}
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
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
	public String getValidYN() {
		return validYN;
	}
	public void setValidYN(String validYN) {
		this.validYN = validYN;
	}
	public ArrayList<SrCust> getSrCustAdd() {
		return srCustAdd;
	}
	public void setSrCustAdd(ArrayList<SrCust> srCustAdd) {
		this.srCustAdd = srCustAdd;
	}
	public ArrayList<SrCust> getSrCustUpdate() {
		return srCustUpdate;
	}
	public void setSrCustUpdate(ArrayList<SrCust> srCustUpdate) {
		this.srCustUpdate = srCustUpdate;
	}
	public ArrayList<SrCust> getSrCustRemove() {
		return srCustRemove;
	}
	public void setSrCustRemove(ArrayList<SrCust> srCustRemove) {
		this.srCustRemove = srCustRemove;
	}
	@Override
	public String toString() {
		return "SrCust [db_resultCode=" + db_resultCode + ", db_resultMsg=" + db_resultMsg + ", workingType="
				+ workingType + ", srCustIdx=" + srCustIdx + ", comCode=" + comCode + ", srType=" + srType + ", srCode="
				+ srCode + ", custCode=" + custCode + ", custName=" + custName + ", custShareRate=" + custShareRate
				+ ", regUserId=" + regUserId + ", created=" + created + ", uptUserId=" + uptUserId + ", modified="
				+ modified + ", validYN=" + validYN + ", srCustAdd=" + srCustAdd + ", srCustUpdate=" + srCustUpdate
				+ ", srCustRemove=" + srCustRemove + "]";
	}

	
	
	
}

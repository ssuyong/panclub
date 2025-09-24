package kr.co.panclub.model;

import java.util.ArrayList;

public class KeyInfo {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private int keyIdx;
	private String comCode;
	private String custCode;
	private String keyVal;
	private String purpose1;
	private String purpose2;
	private String purpose3;
	private String relatedUrl;
	private String validYN;
	private String bizNo;
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
	public int getKeyIdx() {
		return keyIdx;
	}
	public void setKeyIdx(int keyIdx) {
		this.keyIdx = keyIdx;
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
	public String getKeyVal() {
		return keyVal;
	}
	public void setKeyVal(String keyVal) {
		this.keyVal = keyVal;
	}
	public String getPurpose1() {
		return purpose1;
	}
	public void setPurpose1(String purpose1) {
		this.purpose1 = purpose1;
	}
	public String getPurpose2() {
		return purpose2;
	}
	public void setPurpose2(String purpose2) {
		this.purpose2 = purpose2;
	}
	public String getPurpose3() {
		return purpose3;
	}
	public void setPurpose3(String purpose3) {
		this.purpose3 = purpose3;
	}
	public String getRelatedUrl() {
		return relatedUrl;
	}
	public void setRelatedUrl(String relatedUrl) {
		this.relatedUrl = relatedUrl;
	}
	public String getValidYN() {
		return validYN;
	}
	public void setValidYN(String validYN) {
		this.validYN = validYN;
	}
	public String getBizNo() {
		return bizNo;
	}
	public void setBizNo(String bizNo) {
		this.bizNo = bizNo;
	}
	@Override
	public String toString() {
		return "KeyInfo [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", keyIdx=" + keyIdx + ", comCode=" + comCode + ", custCode=" + custCode + ", keyVal="
				+ keyVal + ", purpose1=" + purpose1 + ", purpose2=" + purpose2 + ", purpose3=" + purpose3
				+ ", relatedUrl=" + relatedUrl + ", validYN=" + validYN + ", bizNo=" + bizNo + "]";
	}
	
	
	
	
	
}

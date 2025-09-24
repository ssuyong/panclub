package kr.co.panclub.model;

public class CustManager {

	private String idx;
	private int mgrIdx;
	private String custCode;
	private String comCode;
	private String name;
	private String custName;
	private String role;
	private String position;
	private String phone1;
	private String phone2;
	private String email;
	private String validYN;
	private String memo;
	
	private String aos_aosid;  //aosid 2024.08.06 

	public String getIdx() {
		return idx;
	}

	public void setIdx(String idx) {
		this.idx = idx;
	}

	public int getMgrIdx() {
		return mgrIdx;
	}

	public void setMgrIdx(int mgrIdx) {
		this.mgrIdx = mgrIdx;
	}

	public String getCustCode() {
		return custCode;
	}

	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}

	public String getComCode() {
		return comCode;
	}

	public void setComCode(String comCode) {
		this.comCode = comCode;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getPhone1() {
		return phone1;
	}

	public void setPhone1(String phone1) {
		this.phone1 = phone1;
	}

	public String getPhone2() {
		return phone2;
	}

	public void setPhone2(String phone2) {
		this.phone2 = phone2;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getValidYN() {
		return validYN;
	}

	public void setValidYN(String validYN) {
		this.validYN = validYN;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getAos_aosid() {
		return aos_aosid;
	}

	public void setAos_aosid(String aos_aosid) {
		this.aos_aosid = aos_aosid;
	}

	@Override
	public String toString() {
		return "CustManager [idx=" + idx + ", mgrIdx=" + mgrIdx + ", custCode=" + custCode + ", comCode=" + comCode
				+ ", name=" + name + ", custName=" + custName + ", role=" + role + ", position=" + position
				+ ", phone1=" + phone1 + ", phone2=" + phone2 + ", email=" + email + ", validYN=" + validYN + ", memo="
				+ memo + ", aos_aosid=" + aos_aosid + "]";
	}
	

	
	
	
}

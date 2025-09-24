package kr.co.panclub.model;

public class CustAdmin {
	private String idx;
	private int admIdx;
	private String custCode;
	private String custName;
	private String comCode;
	private String comName;
	private String admType;
	private String admCode;
	private String admName;
	private String memo;
	public String getIdx() {
		return idx;
	}
	public void setIdx(String idx) {
		this.idx = idx;
	}
	public int getAdmIdx() {
		return admIdx;
	}
	public void setAdmIdx(int admIdx) {
		this.admIdx = admIdx;
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
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public String getComName() {
		return comName;
	}
	public void setComName(String comName) {
		this.comName = comName;
	}
	public String getAdmType() {
		return admType;
	}
	public void setAdmType(String admType) {
		this.admType = admType;
	}
	public String getAdmCode() {
		return admCode;
	}
	public void setAdmCode(String admCode) {
		this.admCode = admCode;
	}
	public String getAdmName() {
		return admName;
	}
	public void setAdmName(String admName) {
		this.admName = admName;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	@Override
	public String toString() {
		return "CustAdmin [idx=" + idx + ", admIdx=" + admIdx + ", custCode=" + custCode + ", custName=" + custName
				+ ", comCode=" + comCode + ", comName=" + comName + ", admType=" + admType + ", admCode=" + admCode
				+ ", admName=" + admName + ", memo=" + memo + "]";
	}

	
	
}

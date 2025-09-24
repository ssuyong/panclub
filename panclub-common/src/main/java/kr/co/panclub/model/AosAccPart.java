package kr.co.panclub.model;

public class AosAccPart {
	private String workingType;
	private String logComCode;  //로그인한 회사코드
	private String logUserId;   //로그인한 사용자
	 
	private String reqbizno; //청구서 요청업체 사업자번호 
	private String wrhsyssn; // aos 내부키
	
	private int reqSeq; //순번
	private String buytype; //구매타입
	private String patcrknd; //부품구분  (1:oem , 2:인증부품 , 3:재제조)
	private String patknd;   //부품종류 (1순정 ,2유리 , 3중고,5oes)
	private String patnum;  //품번
	private String patnm;   //부품명
	private String patprc;  //단가
	private String qty;      //수량
	private String itmpatsum; //금액
	private String dcrt;   //할인율
	
	private String custCode; //등록업체코드

	public String getWorkingType() {
		return workingType;
	}

	public void setWorkingType(String workingType) {
		this.workingType = workingType;
	}

	public String getLogComCode() {
		return logComCode;
	}

	public void setLogComCode(String logComCode) {
		this.logComCode = logComCode;
	}

	public String getLogUserId() {
		return logUserId;
	}

	public void setLogUserId(String logUserId) {
		this.logUserId = logUserId;
	}

	public String getReqbizno() {
		return reqbizno;
	}

	public void setReqbizno(String reqbizno) {
		this.reqbizno = reqbizno;
	}

	public String getWrhsyssn() {
		return wrhsyssn;
	}

	public void setWrhsyssn(String wrhsyssn) {
		this.wrhsyssn = wrhsyssn;
	}

	public int getReqSeq() {
		return reqSeq;
	}

	public void setReqSeq(int reqSeq) {
		this.reqSeq = reqSeq;
	}

	public String getBuytype() {
		return buytype;
	}

	public void setBuytype(String buytype) {
		this.buytype = buytype;
	}

	public String getPatcrknd() {
		return patcrknd;
	}

	public void setPatcrknd(String patcrknd) {
		this.patcrknd = patcrknd;
	}

	public String getPatknd() {
		return patknd;
	}

	public void setPatknd(String patknd) {
		this.patknd = patknd;
	}

	public String getPatnum() {
		return patnum;
	}

	public void setPatnum(String patnum) {
		this.patnum = patnum;
	}

	public String getPatnm() {
		return patnm;
	}

	public void setPatnm(String patnm) {
		this.patnm = patnm;
	}

	public String getPatprc() {
		return patprc;
	}

	public void setPatprc(String patprc) {
		this.patprc = patprc;
	}

	public String getQty() {
		return qty;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}

	public String getItmpatsum() {
		return itmpatsum;
	}

	public void setItmpatsum(String itmpatsum) {
		this.itmpatsum = itmpatsum;
	}

	public String getDcrt() {
		return dcrt;
	}

	public void setDcrt(String dcrt) {
		this.dcrt = dcrt;
	}

	public String getCustCode() {
		return custCode;
	}

	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}

	@Override
	public String toString() {
		return "AosAccPart [workingType=" + workingType + ", logComCode=" + logComCode + ", logUserId=" + logUserId
				+ ", reqbizno=" + reqbizno + ", wrhsyssn=" + wrhsyssn + ", reqSeq=" + reqSeq + ", buytype=" + buytype
				+ ", patcrknd=" + patcrknd + ", patknd=" + patknd + ", patnum=" + patnum + ", patnm=" + patnm
				+ ", patprc=" + patprc + ", qty=" + qty + ", itmpatsum=" + itmpatsum + ", dcrt=" + dcrt + ", custCode="
				+ custCode + "]";
	}
	
	
	
}

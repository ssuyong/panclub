package kr.co.panclub.model;

import java.util.ArrayList;

public class Payment {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String payCode;
	private String payCode_origin;
	private String payType;
	private String name;
	private String accoutNo;
	private String validYN;
	private String depoistAccYN;
	private String commonDpYN;
	private String insurDpYN;
	private String accOwner;
	
	private String regPopYN;		//240805 yoonsang 등록버튼을 눌렀을때 구분값을 알기 위해 추가 (김보경매니저 요청사항)
	
	// 추가 행 리스트
	private ArrayList<Payment> paymentAdd;
	// 수정 행 리스트
	private ArrayList<Payment> paymentUpdate;
	// 삭제 행 리스트
	private ArrayList<Payment> paymentRemove;
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
	public String getPayCode() {
		return payCode;
	}
	public void setPayCode(String payCode) {
		this.payCode = payCode;
	}
	public String getPayCode_origin() {
		return payCode_origin;
	}
	public void setPayCode_origin(String payCode_origin) {
		this.payCode_origin = payCode_origin;
	}
	public String getPayType() {
		return payType;
	}
	public void setPayType(String payType) {
		this.payType = payType;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAccoutNo() {
		return accoutNo;
	}
	public void setAccoutNo(String accoutNo) {
		this.accoutNo = accoutNo;
	}
	public String getValidYN() {
		return validYN;
	}
	public void setValidYN(String validYN) {
		this.validYN = validYN;
	}
	public String getDepoistAccYN() {
		return depoistAccYN;
	}
	public void setDepoistAccYN(String depoistAccYN) {
		this.depoistAccYN = depoistAccYN;
	}
	public String getCommonDpYN() {
		return commonDpYN;
	}
	public void setCommonDpYN(String commonDpYN) {
		this.commonDpYN = commonDpYN;
	}
	public String getInsurDpYN() {
		return insurDpYN;
	}
	public void setInsurDpYN(String insurDpYN) {
		this.insurDpYN = insurDpYN;
	}
	public String getAccOwner() {
		return accOwner;
	}
	public void setAccOwner(String accOwner) {
		this.accOwner = accOwner;
	}
	public String getRegPopYN() {
		return regPopYN;
	}
	public void setRegPopYN(String regPopYN) {
		this.regPopYN = regPopYN;
	}
	public ArrayList<Payment> getPaymentAdd() {
		return paymentAdd;
	}
	public void setPaymentAdd(ArrayList<Payment> paymentAdd) {
		this.paymentAdd = paymentAdd;
	}
	public ArrayList<Payment> getPaymentUpdate() {
		return paymentUpdate;
	}
	public void setPaymentUpdate(ArrayList<Payment> paymentUpdate) {
		this.paymentUpdate = paymentUpdate;
	}
	public ArrayList<Payment> getPaymentRemove() {
		return paymentRemove;
	}
	public void setPaymentRemove(ArrayList<Payment> paymentRemove) {
		this.paymentRemove = paymentRemove;
	}
	@Override
	public String toString() {
		return "Payment [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", payCode=" + payCode + ", payCode_origin=" + payCode_origin
				+ ", payType=" + payType + ", name=" + name + ", accoutNo=" + accoutNo + ", validYN=" + validYN
				+ ", depoistAccYN=" + depoistAccYN + ", commonDpYN=" + commonDpYN + ", insurDpYN=" + insurDpYN
				+ ", accOwner=" + accOwner + ", regPopYN=" + regPopYN + ", paymentAdd=" + paymentAdd
				+ ", paymentUpdate=" + paymentUpdate + ", paymentRemove=" + paymentRemove + "]";
	}
	
	
	
	
	
}

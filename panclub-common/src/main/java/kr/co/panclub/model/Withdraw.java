package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;

public class Withdraw {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;


	private String comCode;
	private String wdNo;
	private String wdDate;
	private String custCode;
	private String custName;
	private String accCode;
	private String accName;
	private String payType;
	private String payTypeName;
	private String payCode;
	private String payCodeName;
	private String payCode1;
	private String payCode1Name;
	private String payCode2;
	private String payCode2Name;
	private String payAccNo;
	
	private BigDecimal supPrice;
	private BigDecimal vat;
	private BigDecimal wdMoney;
	private BigDecimal fee;
	private BigDecimal dcMoney;
	
	private String wdReqNo;
	private String memo;
	
	private BigDecimal cashM;
	private BigDecimal cardM;
	private BigDecimal accM;

	
	private String regUserId;
	private String created;
	private String uptUserId;
	private String modified;
	private String withdrawDead; //20230605 bk 마감일자
	
	
	private String clReqNo;
	//현금영수증 관련 2023.09.08 bk  
	private BigDecimal cashRectM; //현금영수증 발행 금액 
	private String countY; //현금영수증 발행수량
	private String cashRectYN; //현금영수증 발행여부
	private String cashRectNo; //현금영수증 발행번호
	private String jobArr; //현금영수증 발행 출금번호 
	
	private ArrayList<Withdraw> wdRemoveList;

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

	public String getWdNo() {
		return wdNo;
	}

	public void setWdNo(String wdNo) {
		this.wdNo = wdNo;
	}

	public String getWdDate() {
		return wdDate;
	}

	public void setWdDate(String wdDate) {
		this.wdDate = wdDate;
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

	public String getAccCode() {
		return accCode;
	}

	public void setAccCode(String accCode) {
		this.accCode = accCode;
	}

	public String getAccName() {
		return accName;
	}

	public void setAccName(String accName) {
		this.accName = accName;
	}

	public String getPayType() {
		return payType;
	}

	public void setPayType(String payType) {
		this.payType = payType;
	}

	public String getPayTypeName() {
		return payTypeName;
	}

	public void setPayTypeName(String payTypeName) {
		this.payTypeName = payTypeName;
	}

	public String getPayCode() {
		return payCode;
	}

	public void setPayCode(String payCode) {
		this.payCode = payCode;
	}

	public String getPayCodeName() {
		return payCodeName;
	}

	public void setPayCodeName(String payCodeName) {
		this.payCodeName = payCodeName;
	}

	public String getPayCode1() {
		return payCode1;
	}

	public void setPayCode1(String payCode1) {
		this.payCode1 = payCode1;
	}

	public String getPayCode1Name() {
		return payCode1Name;
	}

	public void setPayCode1Name(String payCode1Name) {
		this.payCode1Name = payCode1Name;
	}

	public String getPayCode2() {
		return payCode2;
	}

	public void setPayCode2(String payCode2) {
		this.payCode2 = payCode2;
	}

	public String getPayCode2Name() {
		return payCode2Name;
	}

	public void setPayCode2Name(String payCode2Name) {
		this.payCode2Name = payCode2Name;
	}

	public String getPayAccNo() {
		return payAccNo;
	}

	public void setPayAccNo(String payAccNo) {
		this.payAccNo = payAccNo;
	}

	public BigDecimal getSupPrice() {
		return supPrice;
	}

	public void setSupPrice(BigDecimal supPrice) {
		this.supPrice = supPrice;
	}

	public BigDecimal getVat() {
		return vat;
	}

	public void setVat(BigDecimal vat) {
		this.vat = vat;
	}

	public BigDecimal getWdMoney() {
		return wdMoney;
	}

	public void setWdMoney(BigDecimal wdMoney) {
		this.wdMoney = wdMoney;
	}

	public BigDecimal getFee() {
		return fee;
	}

	public void setFee(BigDecimal fee) {
		this.fee = fee;
	}

	public BigDecimal getDcMoney() {
		return dcMoney;
	}

	public void setDcMoney(BigDecimal dcMoney) {
		this.dcMoney = dcMoney;
	}

	public String getWdReqNo() {
		return wdReqNo;
	}

	public void setWdReqNo(String wdReqNo) {
		this.wdReqNo = wdReqNo;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public BigDecimal getCashM() {
		return cashM;
	}

	public void setCashM(BigDecimal cashM) {
		this.cashM = cashM;
	}

	public BigDecimal getCardM() {
		return cardM;
	}

	public void setCardM(BigDecimal cardM) {
		this.cardM = cardM;
	}

	public BigDecimal getAccM() {
		return accM;
	}

	public void setAccM(BigDecimal accM) {
		this.accM = accM;
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

	public String getWithdrawDead() {
		return withdrawDead;
	}

	public void setWithdrawDead(String withdrawDead) {
		this.withdrawDead = withdrawDead;
	}

	public String getClReqNo() {
		return clReqNo;
	}

	public void setClReqNo(String clReqNo) {
		this.clReqNo = clReqNo;
	}

	public BigDecimal getCashRectM() {
		return cashRectM;
	}

	public void setCashRectM(BigDecimal cashRectM) {
		this.cashRectM = cashRectM;
	}

	public String getCountY() {
		return countY;
	}

	public void setCountY(String countY) {
		this.countY = countY;
	}

	public String getCashRectYN() {
		return cashRectYN;
	}

	public void setCashRectYN(String cashRectYN) {
		this.cashRectYN = cashRectYN;
	}

	public String getCashRectNo() {
		return cashRectNo;
	}

	public void setCashRectNo(String cashRectNo) {
		this.cashRectNo = cashRectNo;
	}

	public String getJobArr() {
		return jobArr;
	}

	public void setJobArr(String jobArr) {
		this.jobArr = jobArr;
	}

	public ArrayList<Withdraw> getWdRemoveList() {
		return wdRemoveList;
	}

	public void setWdRemoveList(ArrayList<Withdraw> wdRemoveList) {
		this.wdRemoveList = wdRemoveList;
	}

	@Override
	public String toString() {
		final int maxLen = 10;
		return "Withdraw [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", wdNo=" + wdNo + ", wdDate=" + wdDate + ", custCode="
				+ custCode + ", custName=" + custName + ", accCode=" + accCode + ", accName=" + accName + ", payType="
				+ payType + ", payTypeName=" + payTypeName + ", payCode=" + payCode + ", payCodeName=" + payCodeName
				+ ", payCode1=" + payCode1 + ", payCode1Name=" + payCode1Name + ", payCode2=" + payCode2
				+ ", payCode2Name=" + payCode2Name + ", payAccNo=" + payAccNo + ", supPrice=" + supPrice + ", vat="
				+ vat + ", wdMoney=" + wdMoney + ", fee=" + fee + ", dcMoney=" + dcMoney + ", wdReqNo=" + wdReqNo
				+ ", memo=" + memo + ", cashM=" + cashM + ", cardM=" + cardM + ", accM=" + accM + ", regUserId="
				+ regUserId + ", created=" + created + ", uptUserId=" + uptUserId + ", modified=" + modified
				+ ", withdrawDead=" + withdrawDead + ", clReqNo=" + clReqNo + ", cashRectM=" + cashRectM + ", countY="
				+ countY + ", cashRectYN=" + cashRectYN + ", cashRectNo=" + cashRectNo + ", jobArr=" + jobArr
				+ ", wdRemoveList="
				+ (wdRemoveList != null ? wdRemoveList.subList(0, Math.min(wdRemoveList.size(), maxLen)) : null) + "]";
	}
	
	

	
}

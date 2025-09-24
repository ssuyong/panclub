package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;

public class Deposit {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;


	private String comCode;
	private String depositNo;
	private String depositDate;
	private String custCode;
	private String custName;
	private String carNo;
	private String accCode;
	private String accName;
	private String payType;
	private String payTypeName;
	private String cashRectYN;
	
	private int countY;
	private int cashRectM;
	
	private String cashRectNo;
	private String cardCom;
	private String cardComName;
	private String payCode;
	private String payName;
	private String payAccNo;
	private String cdAllowNo;
	
	private BigDecimal supPrice;
	private BigDecimal vat;
	private BigDecimal depositMoney;
	private BigDecimal cardFee;
	private BigDecimal remitFee;
	private BigDecimal dcMoney;
	
	private BigDecimal cashM;
	private BigDecimal cardM;
	private BigDecimal accM;
	private BigDecimal cardSubM;
	
	private String claimReqNo;
	private String connectCdPay;
	private String memo;
	private String regUserId;
	private String created;
	private String uptUserId;
	private String modified;

	private String clGroupId; //0504 bk 
	private String depositDead; //0605 bk 
	
	private ArrayList<Deposit> depositRemoveList;
	
	private String jobArr;//2023.06.16 bk
	private String depositArr;//2023.06.16 bk
	
	private String cdCode;//2023.07.20 yoonsang
		
	private String conDepositNo;//2023.07.24 yoonsang
	private String preDpMoney;//2023.07.24 yoonsang
	private String clGroupCustName ;//2023.09.27 bk 청구그룹 공업사명 
	private String orderGroupId ;//2023.10.05 bk 주문그룹아이디
	
	private String makerName ;//2023.10.11 yoonsang 차종추가
	private String srCode ;//2023.10.16 bk sr코드
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
	public String getDepositNo() {
		return depositNo;
	}
	public void setDepositNo(String depositNo) {
		this.depositNo = depositNo;
	}
	public String getDepositDate() {
		return depositDate;
	}
	public void setDepositDate(String depositDate) {
		this.depositDate = depositDate;
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
	public String getCarNo() {
		return carNo;
	}
	public void setCarNo(String carNo) {
		this.carNo = carNo;
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
	public String getCashRectYN() {
		return cashRectYN;
	}
	public void setCashRectYN(String cashRectYN) {
		this.cashRectYN = cashRectYN;
	}
	public int getCountY() {
		return countY;
	}
	public void setCountY(int countY) {
		this.countY = countY;
	}
	public int getCashRectM() {
		return cashRectM;
	}
	public void setCashRectM(int cashRectM) {
		this.cashRectM = cashRectM;
	}
	public String getCashRectNo() {
		return cashRectNo;
	}
	public void setCashRectNo(String cashRectNo) {
		this.cashRectNo = cashRectNo;
	}
	public String getCardCom() {
		return cardCom;
	}
	public void setCardCom(String cardCom) {
		this.cardCom = cardCom;
	}
	public String getCardComName() {
		return cardComName;
	}
	public void setCardComName(String cardComName) {
		this.cardComName = cardComName;
	}
	public String getPayCode() {
		return payCode;
	}
	public void setPayCode(String payCode) {
		this.payCode = payCode;
	}
	public String getPayName() {
		return payName;
	}
	public void setPayName(String payName) {
		this.payName = payName;
	}
	public String getPayAccNo() {
		return payAccNo;
	}
	public void setPayAccNo(String payAccNo) {
		this.payAccNo = payAccNo;
	}
	public String getCdAllowNo() {
		return cdAllowNo;
	}
	public void setCdAllowNo(String cdAllowNo) {
		this.cdAllowNo = cdAllowNo;
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
	public BigDecimal getDepositMoney() {
		return depositMoney;
	}
	public void setDepositMoney(BigDecimal depositMoney) {
		this.depositMoney = depositMoney;
	}
	public BigDecimal getCardFee() {
		return cardFee;
	}
	public void setCardFee(BigDecimal cardFee) {
		this.cardFee = cardFee;
	}
	public BigDecimal getRemitFee() {
		return remitFee;
	}
	public void setRemitFee(BigDecimal remitFee) {
		this.remitFee = remitFee;
	}
	public BigDecimal getDcMoney() {
		return dcMoney;
	}
	public void setDcMoney(BigDecimal dcMoney) {
		this.dcMoney = dcMoney;
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
	public BigDecimal getCardSubM() {
		return cardSubM;
	}
	public void setCardSubM(BigDecimal cardSubM) {
		this.cardSubM = cardSubM;
	}
	public String getClaimReqNo() {
		return claimReqNo;
	}
	public void setClaimReqNo(String claimReqNo) {
		this.claimReqNo = claimReqNo;
	}
	public String getConnectCdPay() {
		return connectCdPay;
	}
	public void setConnectCdPay(String connectCdPay) {
		this.connectCdPay = connectCdPay;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
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
	public String getClGroupId() {
		return clGroupId;
	}
	public void setClGroupId(String clGroupId) {
		this.clGroupId = clGroupId;
	}
	public String getDepositDead() {
		return depositDead;
	}
	public void setDepositDead(String depositDead) {
		this.depositDead = depositDead;
	}
	public ArrayList<Deposit> getDepositRemoveList() {
		return depositRemoveList;
	}
	public void setDepositRemoveList(ArrayList<Deposit> depositRemoveList) {
		this.depositRemoveList = depositRemoveList;
	}
	public String getJobArr() {
		return jobArr;
	}
	public void setJobArr(String jobArr) {
		this.jobArr = jobArr;
	}
	public String getDepositArr() {
		return depositArr;
	}
	public void setDepositArr(String depositArr) {
		this.depositArr = depositArr;
	}
	public String getCdCode() {
		return cdCode;
	}
	public void setCdCode(String cdCode) {
		this.cdCode = cdCode;
	}
	public String getConDepositNo() {
		return conDepositNo;
	}
	public void setConDepositNo(String conDepositNo) {
		this.conDepositNo = conDepositNo;
	}
	public String getPreDpMoney() {
		return preDpMoney;
	}
	public void setPreDpMoney(String preDpMoney) {
		this.preDpMoney = preDpMoney;
	}
	public String getClGroupCustName() {
		return clGroupCustName;
	}
	public void setClGroupCustName(String clGroupCustName) {
		this.clGroupCustName = clGroupCustName;
	}
	public String getOrderGroupId() {
		return orderGroupId;
	}
	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
	}
	public String getMakerName() {
		return makerName;
	}
	public void setMakerName(String makerName) {
		this.makerName = makerName;
	}
	public String getSrCode() {
		return srCode;
	}
	public void setSrCode(String srCode) {
		this.srCode = srCode;
	}
	@Override
	public String toString() {
		final int maxLen = 10;
		return "Deposit [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", depositNo=" + depositNo + ", depositDate=" + depositDate
				+ ", custCode=" + custCode + ", custName=" + custName + ", carNo=" + carNo + ", accCode=" + accCode
				+ ", accName=" + accName + ", payType=" + payType + ", payTypeName=" + payTypeName + ", cashRectYN="
				+ cashRectYN + ", countY=" + countY + ", cashRectM=" + cashRectM + ", cashRectNo=" + cashRectNo
				+ ", cardCom=" + cardCom + ", cardComName=" + cardComName + ", payCode=" + payCode + ", payName="
				+ payName + ", payAccNo=" + payAccNo + ", cdAllowNo=" + cdAllowNo + ", supPrice=" + supPrice + ", vat="
				+ vat + ", depositMoney=" + depositMoney + ", cardFee=" + cardFee + ", remitFee=" + remitFee
				+ ", dcMoney=" + dcMoney + ", cashM=" + cashM + ", cardM=" + cardM + ", accM=" + accM + ", cardSubM="
				+ cardSubM + ", claimReqNo=" + claimReqNo + ", connectCdPay=" + connectCdPay + ", memo=" + memo
				+ ", regUserId=" + regUserId + ", created=" + created + ", uptUserId=" + uptUserId + ", modified="
				+ modified + ", clGroupId=" + clGroupId + ", depositDead=" + depositDead + ", depositRemoveList="
				+ (depositRemoveList != null ? depositRemoveList.subList(0, Math.min(depositRemoveList.size(), maxLen))
						: null)
				+ ", jobArr=" + jobArr + ", depositArr=" + depositArr + ", cdCode=" + cdCode + ", conDepositNo="
				+ conDepositNo + ", preDpMoney=" + preDpMoney + ", clGroupCustName=" + clGroupCustName
				+ ", orderGroupId=" + orderGroupId + ", makerName=" + makerName + ", srCode=" + srCode + "]";
	}
	
	

	
	
	


}

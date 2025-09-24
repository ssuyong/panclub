package kr.co.panclub.model;

import java.math.BigDecimal;

public class Transaction {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String stdYmd;              // ,--일자
	private String summary;              // --적요.전표번호
	private String custCode;
	private String ledgType; //입출고 유형 
	private String custName;  // 거래처명 
	private String regYmd;  // 등록일자
	private String regHms;  // 등록시간 
	private String seq;  // 순번 
	private String cnt;  // 수량 
	private BigDecimal unitPrice;  // 단가 
	private BigDecimal sumPrice;  // 공급가액 
	private BigDecimal taxPrice;  // 세액 
	private BigDecimal sumPriceTax;  // 합계금액  
	private String itemId;  // 부품아이디
	private String itemNo;  // 품번
	private String itemName;  // 부품명 
	private String memo;  // 메모
	
	private String carNo;  // 차번 
	private String carType;  // 차종 
	private String orderGroupId;  // 주문그룹아이디 
	private String clType;  // 일반/보험 
	private String regUserId;  // 작성자
	private String userName;  //작성자
	private String makerCode;  //메이커코드
	private String custOrderNo;  //거래처주문번호
	private String ledgCateg;  //구분
	private String rcvCustCode;  //납품처 거래처코드 0705 
	
	private BigDecimal centerPrice;  // 센터가 20230713 bk
	
	private BigDecimal costPrice;   //원가(입고단가) 2023.07.27 hsg
	
	private String orderNo;  //주문번호 2023.09.05 bk
	private String orderSeq;  //주문순번 2023.09.05 bk
	private String withdrawStatus;  //출금요청상태 2023.09.05 bk
	private String srCode;  //sr코드 2023.10.16 bk
	
	private String branchComCode;  //지점 회사 코드 20231123 yoonsang
	
	private BigDecimal salePrice; // supi 2024.01.12  판매가격
	private String summary2; // 240116 yoonsang 적요2(적요에 구분값 나타내기위한 변수) ex) 20240116012(입고)
	private String taxBillRegYN; // 240201 yoonsang 매출처거래상세내역에서 세금계산서 등록하기 위함
	
	private String mainYN; // 240305 yoonsang 대표거래처
	
	private String makerName;
	private String className;
	private String factoryNo;
	
	private String mainCustCode; // 240805 yoonsang 대표거래처코드
	private String mainCustName; // 240805 yoonsang 대표거래처코드
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
	public String getStdYmd() {
		return stdYmd;
	}
	public void setStdYmd(String stdYmd) {
		this.stdYmd = stdYmd;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public String getCustCode() {
		return custCode;
	}
	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}
	public String getLedgType() {
		return ledgType;
	}
	public void setLedgType(String ledgType) {
		this.ledgType = ledgType;
	}
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
	}
	public String getRegYmd() {
		return regYmd;
	}
	public void setRegYmd(String regYmd) {
		this.regYmd = regYmd;
	}
	public String getRegHms() {
		return regHms;
	}
	public void setRegHms(String regHms) {
		this.regHms = regHms;
	}
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public String getCnt() {
		return cnt;
	}
	public void setCnt(String cnt) {
		this.cnt = cnt;
	}
	public BigDecimal getUnitPrice() {
		return unitPrice;
	}
	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
	}
	public BigDecimal getSumPrice() {
		return sumPrice;
	}
	public void setSumPrice(BigDecimal sumPrice) {
		this.sumPrice = sumPrice;
	}
	public BigDecimal getTaxPrice() {
		return taxPrice;
	}
	public void setTaxPrice(BigDecimal taxPrice) {
		this.taxPrice = taxPrice;
	}
	public BigDecimal getSumPriceTax() {
		return sumPriceTax;
	}
	public void setSumPriceTax(BigDecimal sumPriceTax) {
		this.sumPriceTax = sumPriceTax;
	}
	public String getItemId() {
		return itemId;
	}
	public void setItemId(String itemId) {
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
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String getCarNo() {
		return carNo;
	}
	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}
	public String getCarType() {
		return carType;
	}
	public void setCarType(String carType) {
		this.carType = carType;
	}
	public String getOrderGroupId() {
		return orderGroupId;
	}
	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
	}
	public String getClType() {
		return clType;
	}
	public void setClType(String clType) {
		this.clType = clType;
	}
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getMakerCode() {
		return makerCode;
	}
	public void setMakerCode(String makerCode) {
		this.makerCode = makerCode;
	}
	public String getCustOrderNo() {
		return custOrderNo;
	}
	public void setCustOrderNo(String custOrderNo) {
		this.custOrderNo = custOrderNo;
	}
	public String getLedgCateg() {
		return ledgCateg;
	}
	public void setLedgCateg(String ledgCateg) {
		this.ledgCateg = ledgCateg;
	}
	public String getRcvCustCode() {
		return rcvCustCode;
	}
	public void setRcvCustCode(String rcvCustCode) {
		this.rcvCustCode = rcvCustCode;
	}
	public BigDecimal getCenterPrice() {
		return centerPrice;
	}
	public void setCenterPrice(BigDecimal centerPrice) {
		this.centerPrice = centerPrice;
	}
	public BigDecimal getCostPrice() {
		return costPrice;
	}
	public void setCostPrice(BigDecimal costPrice) {
		this.costPrice = costPrice;
	}
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	public String getOrderSeq() {
		return orderSeq;
	}
	public void setOrderSeq(String orderSeq) {
		this.orderSeq = orderSeq;
	}
	public String getWithdrawStatus() {
		return withdrawStatus;
	}
	public void setWithdrawStatus(String withdrawStatus) {
		this.withdrawStatus = withdrawStatus;
	}
	public String getSrCode() {
		return srCode;
	}
	public void setSrCode(String srCode) {
		this.srCode = srCode;
	}
	public String getBranchComCode() {
		return branchComCode;
	}
	public void setBranchComCode(String branchComCode) {
		this.branchComCode = branchComCode;
	}
	public BigDecimal getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
	}
	public String getSummary2() {
		return summary2;
	}
	public void setSummary2(String summary2) {
		this.summary2 = summary2;
	}
	public String getTaxBillRegYN() {
		return taxBillRegYN;
	}
	public void setTaxBillRegYN(String taxBillRegYN) {
		this.taxBillRegYN = taxBillRegYN;
	}
	public String getMainYN() {
		return mainYN;
	}
	public void setMainYN(String mainYN) {
		this.mainYN = mainYN;
	}
	public String getMakerName() {
		return makerName;
	}
	public void setMakerName(String makerName) {
		this.makerName = makerName;
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
	public String getMainCustCode() {
		return mainCustCode;
	}
	public void setMainCustCode(String mainCustCode) {
		this.mainCustCode = mainCustCode;
	}
	public String getMainCustName() {
		return mainCustName;
	}
	public void setMainCustName(String mainCustName) {
		this.mainCustName = mainCustName;
	}
	@Override
	public String toString() {
		return "Transaction [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", stdYmd=" + stdYmd + ", summary=" + summary + ", custCode=" + custCode
				+ ", ledgType=" + ledgType + ", custName=" + custName + ", regYmd=" + regYmd + ", regHms=" + regHms
				+ ", seq=" + seq + ", cnt=" + cnt + ", unitPrice=" + unitPrice + ", sumPrice=" + sumPrice
				+ ", taxPrice=" + taxPrice + ", sumPriceTax=" + sumPriceTax + ", itemId=" + itemId + ", itemNo="
				+ itemNo + ", itemName=" + itemName + ", memo=" + memo + ", carNo=" + carNo + ", carType=" + carType
				+ ", orderGroupId=" + orderGroupId + ", clType=" + clType + ", regUserId=" + regUserId + ", userName="
				+ userName + ", makerCode=" + makerCode + ", custOrderNo=" + custOrderNo + ", ledgCateg=" + ledgCateg
				+ ", rcvCustCode=" + rcvCustCode + ", centerPrice=" + centerPrice + ", costPrice=" + costPrice
				+ ", orderNo=" + orderNo + ", orderSeq=" + orderSeq + ", withdrawStatus=" + withdrawStatus + ", srCode="
				+ srCode + ", branchComCode=" + branchComCode + ", salePrice=" + salePrice + ", summary2=" + summary2
				+ ", taxBillRegYN=" + taxBillRegYN + ", mainYN=" + mainYN + ", makerName=" + makerName + ", className="
				+ className + ", factoryNo=" + factoryNo + ", mainCustCode=" + mainCustCode + ", mainCustName="
				+ mainCustName + "]";
	}

	
	
	
	
	
}

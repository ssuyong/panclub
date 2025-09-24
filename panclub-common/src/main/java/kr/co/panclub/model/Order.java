package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.ArrayList;

public class Order {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	private String db_resultSeq;

	private String comCode;
	private String orderGroupId;
	private String orderNo;
	private String orderYmd;
	private int orderType;
	private String custCode;
	private String custName;
	private String custMgrName;
	private String custMgrPhone;
	private String supplyCustCode;
	private String supplyCustName;
	private String supplyMgrName;
	private String supplyMgrPhone;
	private String carNo;
	private String vinNo;
	private String colorCode;
	private String makerCode;
	private String makerName;
	private String carType;
	private String memo1;
	private String memo2;
	private String taxType;
	private String regUserId;
	private String regUserName;
	private String created;
	private String uptUserId;
	private String uptUserName;
	private String modified;
	private int itemCnt;
	private String sumPrice;
	private BigDecimal salePrice;
	private BigDecimal taxPrice;
	private BigDecimal sumSupplyPrice;
	private BigDecimal supplyPrice;
	private BigDecimal supplyTaxPrice;
	private float dcRate;
	private int dcDspType;
	private float agencyFeeRate;
	private float marginRate;
	private String insure1Code;
	private String insure1Name;
	private String insure1MgrName;
	private String insure1MgrPhone;
	private String insure2Code;
	private String insure2Name;
	private String insure2MgrName;
	private String insure2MgrPhone;
	private String estiNo;
	
	private String insure1Fax;        // --보험1팩스
	private String insure1AcceptNo;        // --보험1접수번호
	private float insure1AcciRate;        // --보험1과실
	private String insure2Fax;        // --보험2팩스
	private String insure2AcceptNo;        // --보험2접수번호
	private float insure2AcciRate;        // --보험2과실
	
	private String sumPriceKor; //  --합계금액
	
	private float expectMarginRate;  //예상마진율
	private String taxTypeName;
	
	private String placeCustArr;
	
	private String orderTypeName;     //2023.3.14 hsg - 주문유형명
	
	private String branchCode;    //관리지점
	private String branchName;    // 2023.05.22 관리지점명
	
	private String costMarginRate;  //원가(예상)마진율 2023.06.16 hsg
	private BigDecimal placeUnitAmt;   //발주예정단가 sum
	private BigDecimal costAmt;        //재고원가 sum
	private String pcYN;        //2023.08.23 주문접수여부 bk
	
	// 추가 행 리스트
	private ArrayList<OrderItem> orderItemAdd;
	// 수정 행 리스트
	private ArrayList<OrderItem> orderItemUpdate;
	// 삭제 행 리스트
	private ArrayList<OrderItem> orderItemRemove;
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
	public String getDb_resultSeq() {
		return db_resultSeq;
	}
	public void setDb_resultSeq(String db_resultSeq) {
		this.db_resultSeq = db_resultSeq;
	}
	public String getComCode() {
		return comCode;
	}
	public void setComCode(String comCode) {
		this.comCode = comCode;
	}
	public String getOrderGroupId() {
		return orderGroupId;
	}
	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
	}
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	public String getOrderYmd() {
		return orderYmd;
	}
	public void setOrderYmd(String orderYmd) {
		this.orderYmd = orderYmd;
	}
	public int getOrderType() {
		return orderType;
	}
	public void setOrderType(int orderType) {
		this.orderType = orderType;
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
	public String getCustMgrName() {
		return custMgrName;
	}
	public void setCustMgrName(String custMgrName) {
		this.custMgrName = custMgrName;
	}
	public String getCustMgrPhone() {
		return custMgrPhone;
	}
	public void setCustMgrPhone(String custMgrPhone) {
		this.custMgrPhone = custMgrPhone;
	}
	public String getSupplyCustCode() {
		return supplyCustCode;
	}
	public void setSupplyCustCode(String supplyCustCode) {
		this.supplyCustCode = supplyCustCode;
	}
	public String getSupplyCustName() {
		return supplyCustName;
	}
	public void setSupplyCustName(String supplyCustName) {
		this.supplyCustName = supplyCustName;
	}
	public String getSupplyMgrName() {
		return supplyMgrName;
	}
	public void setSupplyMgrName(String supplyMgrName) {
		this.supplyMgrName = supplyMgrName;
	}
	public String getSupplyMgrPhone() {
		return supplyMgrPhone;
	}
	public void setSupplyMgrPhone(String supplyMgrPhone) {
		this.supplyMgrPhone = supplyMgrPhone;
	}
	public String getCarNo() {
		return carNo;
	}
	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}
	public String getVinNo() {
		return vinNo;
	}
	public void setVinNo(String vinNo) {
		this.vinNo = vinNo;
	}
	public String getColorCode() {
		return colorCode;
	}
	public void setColorCode(String colorCode) {
		this.colorCode = colorCode;
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
	public String getCarType() {
		return carType;
	}
	public void setCarType(String carType) {
		this.carType = carType;
	}
	public String getMemo1() {
		return memo1;
	}
	public void setMemo1(String memo1) {
		this.memo1 = memo1;
	}
	public String getMemo2() {
		return memo2;
	}
	public void setMemo2(String memo2) {
		this.memo2 = memo2;
	}
	public String getTaxType() {
		return taxType;
	}
	public void setTaxType(String taxType) {
		this.taxType = taxType;
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
	public int getItemCnt() {
		return itemCnt;
	}
	public void setItemCnt(int itemCnt) {
		this.itemCnt = itemCnt;
	}
	public String getSumPrice() {
		return sumPrice;
	}
	public void setSumPrice(String sumPrice) {
		this.sumPrice = sumPrice;
	}
	public BigDecimal getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
	}
	public BigDecimal getTaxPrice() {
		return taxPrice;
	}
	public void setTaxPrice(BigDecimal taxPrice) {
		this.taxPrice = taxPrice;
	}
	public BigDecimal getSumSupplyPrice() {
		return sumSupplyPrice;
	}
	public void setSumSupplyPrice(BigDecimal sumSupplyPrice) {
		this.sumSupplyPrice = sumSupplyPrice;
	}
	public BigDecimal getSupplyPrice() {
		return supplyPrice;
	}
	public void setSupplyPrice(BigDecimal supplyPrice) {
		this.supplyPrice = supplyPrice;
	}
	public BigDecimal getSupplyTaxPrice() {
		return supplyTaxPrice;
	}
	public void setSupplyTaxPrice(BigDecimal supplyTaxPrice) {
		this.supplyTaxPrice = supplyTaxPrice;
	}
	public float getDcRate() {
		return dcRate;
	}
	public void setDcRate(float dcRate) {
		this.dcRate = dcRate;
	}
	public int getDcDspType() {
		return dcDspType;
	}
	public void setDcDspType(int dcDspType) {
		this.dcDspType = dcDspType;
	}
	public float getAgencyFeeRate() {
		return agencyFeeRate;
	}
	public void setAgencyFeeRate(float agencyFeeRate) {
		this.agencyFeeRate = agencyFeeRate;
	}
	public float getMarginRate() {
		return marginRate;
	}
	public void setMarginRate(float marginRate) {
		this.marginRate = marginRate;
	}
	public String getInsure1Code() {
		return insure1Code;
	}
	public void setInsure1Code(String insure1Code) {
		this.insure1Code = insure1Code;
	}
	public String getInsure1Name() {
		return insure1Name;
	}
	public void setInsure1Name(String insure1Name) {
		this.insure1Name = insure1Name;
	}
	public String getInsure1MgrName() {
		return insure1MgrName;
	}
	public void setInsure1MgrName(String insure1MgrName) {
		this.insure1MgrName = insure1MgrName;
	}
	public String getInsure1MgrPhone() {
		return insure1MgrPhone;
	}
	public void setInsure1MgrPhone(String insure1MgrPhone) {
		this.insure1MgrPhone = insure1MgrPhone;
	}
	public String getInsure2Code() {
		return insure2Code;
	}
	public void setInsure2Code(String insure2Code) {
		this.insure2Code = insure2Code;
	}
	public String getInsure2Name() {
		return insure2Name;
	}
	public void setInsure2Name(String insure2Name) {
		this.insure2Name = insure2Name;
	}
	public String getInsure2MgrName() {
		return insure2MgrName;
	}
	public void setInsure2MgrName(String insure2MgrName) {
		this.insure2MgrName = insure2MgrName;
	}
	public String getInsure2MgrPhone() {
		return insure2MgrPhone;
	}
	public void setInsure2MgrPhone(String insure2MgrPhone) {
		this.insure2MgrPhone = insure2MgrPhone;
	}
	public String getEstiNo() {
		return estiNo;
	}
	public void setEstiNo(String estiNo) {
		this.estiNo = estiNo;
	}
	public String getInsure1Fax() {
		return insure1Fax;
	}
	public void setInsure1Fax(String insure1Fax) {
		this.insure1Fax = insure1Fax;
	}
	public String getInsure1AcceptNo() {
		return insure1AcceptNo;
	}
	public void setInsure1AcceptNo(String insure1AcceptNo) {
		this.insure1AcceptNo = insure1AcceptNo;
	}
	public float getInsure1AcciRate() {
		return insure1AcciRate;
	}
	public void setInsure1AcciRate(float insure1AcciRate) {
		this.insure1AcciRate = insure1AcciRate;
	}
	public String getInsure2Fax() {
		return insure2Fax;
	}
	public void setInsure2Fax(String insure2Fax) {
		this.insure2Fax = insure2Fax;
	}
	public String getInsure2AcceptNo() {
		return insure2AcceptNo;
	}
	public void setInsure2AcceptNo(String insure2AcceptNo) {
		this.insure2AcceptNo = insure2AcceptNo;
	}
	public float getInsure2AcciRate() {
		return insure2AcciRate;
	}
	public void setInsure2AcciRate(float insure2AcciRate) {
		this.insure2AcciRate = insure2AcciRate;
	}
	public String getSumPriceKor() {
		return sumPriceKor;
	}
	public void setSumPriceKor(String sumPriceKor) {
		this.sumPriceKor = sumPriceKor;
	}
	public float getExpectMarginRate() {
		return expectMarginRate;
	}
	public void setExpectMarginRate(float expectMarginRate) {
		this.expectMarginRate = expectMarginRate;
	}
	public String getTaxTypeName() {
		return taxTypeName;
	}
	public void setTaxTypeName(String taxTypeName) {
		this.taxTypeName = taxTypeName;
	}
	public String getPlaceCustArr() {
		return placeCustArr;
	}
	public void setPlaceCustArr(String placeCustArr) {
		this.placeCustArr = placeCustArr;
	}
	public String getOrderTypeName() {
		return orderTypeName;
	}
	public void setOrderTypeName(String orderTypeName) {
		this.orderTypeName = orderTypeName;
	}
	public String getBranchCode() {
		return branchCode;
	}
	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public String getCostMarginRate() {
		return costMarginRate;
	}
	public void setCostMarginRate(String costMarginRate) {
		this.costMarginRate = costMarginRate;
	}
	public BigDecimal getPlaceUnitAmt() {
		return placeUnitAmt;
	}
	public void setPlaceUnitAmt(BigDecimal placeUnitAmt) {
		this.placeUnitAmt = placeUnitAmt;
	}
	public BigDecimal getCostAmt() {
		return costAmt;
	}
	public void setCostAmt(BigDecimal costAmt) {
		this.costAmt = costAmt;
	}
	public String getPcYN() {
		return pcYN;
	}
	public void setPcYN(String pcYN) {
		this.pcYN = pcYN;
	}
	public ArrayList<OrderItem> getOrderItemAdd() {
		return orderItemAdd;
	}
	public void setOrderItemAdd(ArrayList<OrderItem> orderItemAdd) {
		this.orderItemAdd = orderItemAdd;
	}
	public ArrayList<OrderItem> getOrderItemUpdate() {
		return orderItemUpdate;
	}
	public void setOrderItemUpdate(ArrayList<OrderItem> orderItemUpdate) {
		this.orderItemUpdate = orderItemUpdate;
	}
	public ArrayList<OrderItem> getOrderItemRemove() {
		return orderItemRemove;
	}
	public void setOrderItemRemove(ArrayList<OrderItem> orderItemRemove) {
		this.orderItemRemove = orderItemRemove;
	}
	@Override
	public String toString() {
		final int maxLen = 10;
		return "Order [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", db_resultSeq=" + db_resultSeq + ", comCode=" + comCode + ", orderGroupId="
				+ orderGroupId + ", orderNo=" + orderNo + ", orderYmd=" + orderYmd + ", orderType=" + orderType
				+ ", custCode=" + custCode + ", custName=" + custName + ", custMgrName=" + custMgrName
				+ ", custMgrPhone=" + custMgrPhone + ", supplyCustCode=" + supplyCustCode + ", supplyCustName="
				+ supplyCustName + ", supplyMgrName=" + supplyMgrName + ", supplyMgrPhone=" + supplyMgrPhone
				+ ", carNo=" + carNo + ", vinNo=" + vinNo + ", colorCode=" + colorCode + ", makerCode=" + makerCode
				+ ", makerName=" + makerName + ", carType=" + carType + ", memo1=" + memo1 + ", memo2=" + memo2
				+ ", taxType=" + taxType + ", regUserId=" + regUserId + ", regUserName=" + regUserName + ", created="
				+ created + ", uptUserId=" + uptUserId + ", uptUserName=" + uptUserName + ", modified=" + modified
				+ ", itemCnt=" + itemCnt + ", sumPrice=" + sumPrice + ", salePrice=" + salePrice + ", taxPrice="
				+ taxPrice + ", sumSupplyPrice=" + sumSupplyPrice + ", supplyPrice=" + supplyPrice + ", supplyTaxPrice="
				+ supplyTaxPrice + ", dcRate=" + dcRate + ", dcDspType=" + dcDspType + ", agencyFeeRate="
				+ agencyFeeRate + ", marginRate=" + marginRate + ", insure1Code=" + insure1Code + ", insure1Name="
				+ insure1Name + ", insure1MgrName=" + insure1MgrName + ", insure1MgrPhone=" + insure1MgrPhone
				+ ", insure2Code=" + insure2Code + ", insure2Name=" + insure2Name + ", insure2MgrName=" + insure2MgrName
				+ ", insure2MgrPhone=" + insure2MgrPhone + ", estiNo=" + estiNo + ", insure1Fax=" + insure1Fax
				+ ", insure1AcceptNo=" + insure1AcceptNo + ", insure1AcciRate=" + insure1AcciRate + ", insure2Fax="
				+ insure2Fax + ", insure2AcceptNo=" + insure2AcceptNo + ", insure2AcciRate=" + insure2AcciRate
				+ ", sumPriceKor=" + sumPriceKor + ", expectMarginRate=" + expectMarginRate + ", taxTypeName="
				+ taxTypeName + ", placeCustArr=" + placeCustArr + ", orderTypeName=" + orderTypeName + ", branchCode="
				+ branchCode + ", branchName=" + branchName + ", costMarginRate=" + costMarginRate + ", placeUnitAmt="
				+ placeUnitAmt + ", costAmt=" + costAmt + ", pcYN=" + pcYN + ", orderItemAdd="
				+ (orderItemAdd != null ? orderItemAdd.subList(0, Math.min(orderItemAdd.size(), maxLen)) : null)
				+ ", orderItemUpdate="
				+ (orderItemUpdate != null ? orderItemUpdate.subList(0, Math.min(orderItemUpdate.size(), maxLen))
						: null)
				+ ", orderItemRemove="
				+ (orderItemRemove != null ? orderItemRemove.subList(0, Math.min(orderItemRemove.size(), maxLen))
						: null)
				+ "]";
	}
	
	
	
	
	
}

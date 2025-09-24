package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.ArrayList;

public class Place {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;

	private String comCode;
	private String placeNo;    //  --발주번호
	private String custCode;    // --구매처처코드
	private String custMgrName;    //  --구매처담당자
	private String custMgrPhone;    // --구매처전화번호
	private String supplyCustCode;    //  --납품처코드
	private String supplyMgrName;    // --납품처담당자
	private String supplyMgrPhone;    //  --납품처전화번호
	private String placeDmdYmd;    //  --발주요청일
	private String whSchYmd;    //  --입고예정일
	private String turnNum;    // --차수
	private String memo1;    // --비고1
	private String memo2;    // --비고2
	private BigDecimal price;    // --공급가액
	private BigDecimal taxPrice;    // --세액
	private BigDecimal sumPrice;    //  --합계
	private String regUserId;    // --등록자
	private String regYmd;    // --등록일
	private String regHms;    //  --등록시
	private String uptUserId;    //  --수정자
	private String uptYmd;    // --수정일
	private String uptHms;    // --수정시	
	
	private String custOrderNo;
	private int itemCnt;          //품목수량
	private int sumCnt;          //합계수량
	private int whItemCnt;          //입고품목수량
	private int whSumCnt;          //입고합계수량
	private String whStatus;          //입고여부
	private String reqUserName;          //요청자
	private String regUserName;       //처리자"
	
	private String custName;
	private String wdReqStatus; //출금요청 여부 2023.04.14 bokyung 추가
	
	private String directYN; //2023.06.09 bk  직송여부 
	private int directCost; //2023.06.09 bk 운송비 
	private String branchCode; //2023.06.28 bk 지점 
	
	private String linkGvKey; //2023.08.21 yoonsang 발급해준키
	private String linkTkKey; //2023.08.21 yoonsang 발급받은키
	private String gvPlacNo; //2023.08.22 yoonsang 주문요청발주번호

	private String placeYmd; //2023.09.07 bk 발주일
	private String whSchTime; //2023.09.07 bk 입고예상시간 
	private String pcYN; //2023.09.26 bk 주문접수여부
	private String pcProcStep; //2023.09.26 bk 주문접수단계

	private String taxType; 
	
	// 추가 행 리스트
	private ArrayList<PlaceItem> placeItemAdd;
	// 수정 행 리스트
	private ArrayList<PlaceItem> placeItemUpdate;
	// 삭제 행 리스트
	private ArrayList<PlaceItem> placeItemRemove;
	
	private String dataComCode;   //데이터체크용 . 2023.10.04 hsg

	private String carNo;   //231023 yoonsang
	private String orderGroupId;   //231023 yoonsang
	
	private String orderReqPlaceCustCode;   //240404 yoonsang
	private String orderReqPlaceCustName;   //240404 yoonsang
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
	public String getPlaceNo() {
		return placeNo;
	}
	public void setPlaceNo(String placeNo) {
		this.placeNo = placeNo;
	}
	public String getCustCode() {
		return custCode;
	}
	public void setCustCode(String custCode) {
		this.custCode = custCode;
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
	public String getPlaceDmdYmd() {
		return placeDmdYmd;
	}
	public void setPlaceDmdYmd(String placeDmdYmd) {
		this.placeDmdYmd = placeDmdYmd;
	}
	public String getWhSchYmd() {
		return whSchYmd;
	}
	public void setWhSchYmd(String whSchYmd) {
		this.whSchYmd = whSchYmd;
	}
	public String getTurnNum() {
		return turnNum;
	}
	public void setTurnNum(String turnNum) {
		this.turnNum = turnNum;
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
	public BigDecimal getPrice() {
		return price;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	public BigDecimal getTaxPrice() {
		return taxPrice;
	}
	public void setTaxPrice(BigDecimal taxPrice) {
		this.taxPrice = taxPrice;
	}
	public BigDecimal getSumPrice() {
		return sumPrice;
	}
	public void setSumPrice(BigDecimal sumPrice) {
		this.sumPrice = sumPrice;
	}
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
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
	public String getUptUserId() {
		return uptUserId;
	}
	public void setUptUserId(String uptUserId) {
		this.uptUserId = uptUserId;
	}
	public String getUptYmd() {
		return uptYmd;
	}
	public void setUptYmd(String uptYmd) {
		this.uptYmd = uptYmd;
	}
	public String getUptHms() {
		return uptHms;
	}
	public void setUptHms(String uptHms) {
		this.uptHms = uptHms;
	}
	public String getCustOrderNo() {
		return custOrderNo;
	}
	public void setCustOrderNo(String custOrderNo) {
		this.custOrderNo = custOrderNo;
	}
	public int getItemCnt() {
		return itemCnt;
	}
	public void setItemCnt(int itemCnt) {
		this.itemCnt = itemCnt;
	}
	public int getSumCnt() {
		return sumCnt;
	}
	public void setSumCnt(int sumCnt) {
		this.sumCnt = sumCnt;
	}
	public int getWhItemCnt() {
		return whItemCnt;
	}
	public void setWhItemCnt(int whItemCnt) {
		this.whItemCnt = whItemCnt;
	}
	public int getWhSumCnt() {
		return whSumCnt;
	}
	public void setWhSumCnt(int whSumCnt) {
		this.whSumCnt = whSumCnt;
	}
	public String getWhStatus() {
		return whStatus;
	}
	public void setWhStatus(String whStatus) {
		this.whStatus = whStatus;
	}
	public String getReqUserName() {
		return reqUserName;
	}
	public void setReqUserName(String reqUserName) {
		this.reqUserName = reqUserName;
	}
	public String getRegUserName() {
		return regUserName;
	}
	public void setRegUserName(String regUserName) {
		this.regUserName = regUserName;
	}
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
	}
	public String getWdReqStatus() {
		return wdReqStatus;
	}
	public void setWdReqStatus(String wdReqStatus) {
		this.wdReqStatus = wdReqStatus;
	}
	public String getDirectYN() {
		return directYN;
	}
	public void setDirectYN(String directYN) {
		this.directYN = directYN;
	}
	public int getDirectCost() {
		return directCost;
	}
	public void setDirectCost(int directCost) {
		this.directCost = directCost;
	}
	public String getBranchCode() {
		return branchCode;
	}
	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}
	public String getLinkGvKey() {
		return linkGvKey;
	}
	public void setLinkGvKey(String linkGvKey) {
		this.linkGvKey = linkGvKey;
	}
	public String getLinkTkKey() {
		return linkTkKey;
	}
	public void setLinkTkKey(String linkTkKey) {
		this.linkTkKey = linkTkKey;
	}
	public String getGvPlacNo() {
		return gvPlacNo;
	}
	public void setGvPlacNo(String gvPlacNo) {
		this.gvPlacNo = gvPlacNo;
	}
	public String getPlaceYmd() {
		return placeYmd;
	}
	public void setPlaceYmd(String placeYmd) {
		this.placeYmd = placeYmd;
	}
	public String getWhSchTime() {
		return whSchTime;
	}
	public void setWhSchTime(String whSchTime) {
		this.whSchTime = whSchTime;
	}
	public String getPcYN() {
		return pcYN;
	}
	public void setPcYN(String pcYN) {
		this.pcYN = pcYN;
	}
	public String getPcProcStep() {
		return pcProcStep;
	}
	public void setPcProcStep(String pcProcStep) {
		this.pcProcStep = pcProcStep;
	}
	public String getTaxType() {
		return taxType;
	}
	public void setTaxType(String taxType) {
		this.taxType = taxType;
	}
	public ArrayList<PlaceItem> getPlaceItemAdd() {
		return placeItemAdd;
	}
	public void setPlaceItemAdd(ArrayList<PlaceItem> placeItemAdd) {
		this.placeItemAdd = placeItemAdd;
	}
	public ArrayList<PlaceItem> getPlaceItemUpdate() {
		return placeItemUpdate;
	}
	public void setPlaceItemUpdate(ArrayList<PlaceItem> placeItemUpdate) {
		this.placeItemUpdate = placeItemUpdate;
	}
	public ArrayList<PlaceItem> getPlaceItemRemove() {
		return placeItemRemove;
	}
	public void setPlaceItemRemove(ArrayList<PlaceItem> placeItemRemove) {
		this.placeItemRemove = placeItemRemove;
	}
	public String getDataComCode() {
		return dataComCode;
	}
	public void setDataComCode(String dataComCode) {
		this.dataComCode = dataComCode;
	}
	public String getCarNo() {
		return carNo;
	}
	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}
	public String getOrderGroupId() {
		return orderGroupId;
	}
	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
	}
	public String getOrderReqPlaceCustCode() {
		return orderReqPlaceCustCode;
	}
	public void setOrderReqPlaceCustCode(String orderReqPlaceCustCode) {
		this.orderReqPlaceCustCode = orderReqPlaceCustCode;
	}
	public String getOrderReqPlaceCustName() {
		return orderReqPlaceCustName;
	}
	public void setOrderReqPlaceCustName(String orderReqPlaceCustName) {
		this.orderReqPlaceCustName = orderReqPlaceCustName;
	}
	@Override
	public String toString() {
		return "Place [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", placeNo=" + placeNo + ", custCode=" + custCode
				+ ", custMgrName=" + custMgrName + ", custMgrPhone=" + custMgrPhone + ", supplyCustCode="
				+ supplyCustCode + ", supplyMgrName=" + supplyMgrName + ", supplyMgrPhone=" + supplyMgrPhone
				+ ", placeDmdYmd=" + placeDmdYmd + ", whSchYmd=" + whSchYmd + ", turnNum=" + turnNum + ", memo1="
				+ memo1 + ", memo2=" + memo2 + ", price=" + price + ", taxPrice=" + taxPrice + ", sumPrice=" + sumPrice
				+ ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms + ", uptUserId=" + uptUserId
				+ ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", custOrderNo=" + custOrderNo + ", itemCnt=" + itemCnt
				+ ", sumCnt=" + sumCnt + ", whItemCnt=" + whItemCnt + ", whSumCnt=" + whSumCnt + ", whStatus="
				+ whStatus + ", reqUserName=" + reqUserName + ", regUserName=" + regUserName + ", custName=" + custName
				+ ", wdReqStatus=" + wdReqStatus + ", directYN=" + directYN + ", directCost=" + directCost
				+ ", branchCode=" + branchCode + ", linkGvKey=" + linkGvKey + ", linkTkKey=" + linkTkKey + ", gvPlacNo="
				+ gvPlacNo + ", placeYmd=" + placeYmd + ", whSchTime=" + whSchTime + ", pcYN=" + pcYN + ", pcProcStep="
				+ pcProcStep + ", taxType=" + taxType + ", placeItemAdd=" + placeItemAdd + ", placeItemUpdate="
				+ placeItemUpdate + ", placeItemRemove=" + placeItemRemove + ", dataComCode=" + dataComCode + ", carNo="
				+ carNo + ", orderGroupId=" + orderGroupId + ", orderReqPlaceCustCode=" + orderReqPlaceCustCode
				+ ", orderReqPlaceCustName=" + orderReqPlaceCustName + "]";
	}
	
	

	
}

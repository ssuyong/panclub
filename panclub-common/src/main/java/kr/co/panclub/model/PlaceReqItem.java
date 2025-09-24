package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.Date;

public class PlaceReqItem {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;             //   --회사코드
	private String placeReqNo;             //--발주요청번호
	private String reqSeq;             //  --발주순번
	private String orderNo;             //--주문q번호
	private String orderSeq;             // --주문순번
	private String placeCustCode;
	private String placeCustName;
	private int cnt;          // --발주수량
	private BigDecimal unitPrice;          // --단가
	private BigDecimal sumPrice;          //	 --합계
	private String regUserId;          //-- 등록자
    private String created;          // 
    private String uptUserId;          //--수정자
    private String modified;          //
    
    private String reqArr;
    private String rseArr;
    private String ordArr;
    private String seqArr;
    private String cusArr;
    private String cntArr;
    
	//private Date reqChkDate;  //요청확인일
	//private String reqChkDate_RUI;   //요청확인자
    private Date chkDate;  //요청확인일
	private String chkUserId;   //요청확인자	
	
	private BigDecimal whUnitPrice;   //입고단가 
	private String whUnitPrice_RUI;  //입고단가입력자 
	private String custOrderNo;     //거래처(발주처)주문번호
	private String custOrderNo_RUI; //주문번호 입력자  
	
	private String statusCode;  //상태코드
	private String statusName;  //상태명
	
	private String makerName;
	private String whSumPrice;
	private String placeNo;
	private String orderGroupId;
	private String regUserName;
		
	private String placeDmdYmd;          // --발주처발주요청일
	private String whSchYmd;           // ,--입고예정일
	private String placeMgr;            // --발주담당자 또는 부서
    private String memo;               // --메모
    
    private long itemId;
	private String itemNo;
	private String itemName;
	private String itemNameEn;
	private BigDecimal salePrice;   //부품판매단가
	
	private String supplyCustCode;
	private String supplyCustName;
	
	private String reqChkYmd;

	private BigDecimal orderSalePrice;    //2023.03.14 hsg - 주문할인단가 orderItem.salePrice
	private String uniPriArr;       //2023.03.14 hsg  - 발주단가 배열
	private String memo1Arr;		//2023.03.14 hsg  - 메모1 배열
	private String memo2Arr; 		//2023.03.14 hsg  - 메모2 배열
	
    private String memo1;        //2023.03.14 hsg  - 메모1 db칼럼추가로 
    private String memo2;		 //2023.03.14 hsg  - 메모2 db칼럼추가로..
    
	//납품처 2023.03.20 hsg
	private String rcvCustCode;
	private String rcvCustName;
	
	private String branchCode; //2023.06.28 bk 지점
	
	private String carNo; //2024.02.23 hsg 차량번호
	
	private String rcvLogisCodeArr; // 2024.03.04 수령물류센터 supi
	private String rcvLogisCode;
	
	private String orderReqYN; //240205 yoonsang 주문연동여부
	private String cusArr2;
	
	private String orderReqPlaceCustCode;	//240402 yoonsang 
	private String orderReqPlaceCustName;
	private String gvComCode;
	private String gvComName;
	
	private String className;//20240725 supi 구분,공장품번
	private String factoryNo;
	
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
	public String getPlaceReqNo() {
		return placeReqNo;
	}
	public void setPlaceReqNo(String placeReqNo) {
		this.placeReqNo = placeReqNo;
	}
	public String getReqSeq() {
		return reqSeq;
	}
	public void setReqSeq(String reqSeq) {
		this.reqSeq = reqSeq;
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
	public String getPlaceCustCode() {
		return placeCustCode;
	}
	public void setPlaceCustCode(String placeCustCode) {
		this.placeCustCode = placeCustCode;
	}
	public String getPlaceCustName() {
		return placeCustName;
	}
	public void setPlaceCustName(String placeCustName) {
		this.placeCustName = placeCustName;
	}
	public int getCnt() {
		return cnt;
	}
	public void setCnt(int cnt) {
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
	public String getReqArr() {
		return reqArr;
	}
	public void setReqArr(String reqArr) {
		this.reqArr = reqArr;
	}
	public String getRseArr() {
		return rseArr;
	}
	public void setRseArr(String rseArr) {
		this.rseArr = rseArr;
	}
	public String getOrdArr() {
		return ordArr;
	}
	public void setOrdArr(String ordArr) {
		this.ordArr = ordArr;
	}
	public String getSeqArr() {
		return seqArr;
	}
	public void setSeqArr(String seqArr) {
		this.seqArr = seqArr;
	}
	public String getCusArr() {
		return cusArr;
	}
	public void setCusArr(String cusArr) {
		this.cusArr = cusArr;
	}
	public String getCntArr() {
		return cntArr;
	}
	public void setCntArr(String cntArr) {
		this.cntArr = cntArr;
	}
	public Date getChkDate() {
		return chkDate;
	}
	public void setChkDate(Date chkDate) {
		this.chkDate = chkDate;
	}
	public String getChkUserId() {
		return chkUserId;
	}
	public void setChkUserId(String chkUserId) {
		this.chkUserId = chkUserId;
	}
	public BigDecimal getWhUnitPrice() {
		return whUnitPrice;
	}
	public void setWhUnitPrice(BigDecimal whUnitPrice) {
		this.whUnitPrice = whUnitPrice;
	}
	public String getWhUnitPrice_RUI() {
		return whUnitPrice_RUI;
	}
	public void setWhUnitPrice_RUI(String whUnitPrice_RUI) {
		this.whUnitPrice_RUI = whUnitPrice_RUI;
	}
	public String getCustOrderNo() {
		return custOrderNo;
	}
	public void setCustOrderNo(String custOrderNo) {
		this.custOrderNo = custOrderNo;
	}
	public String getCustOrderNo_RUI() {
		return custOrderNo_RUI;
	}
	public void setCustOrderNo_RUI(String custOrderNo_RUI) {
		this.custOrderNo_RUI = custOrderNo_RUI;
	}
	public String getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}
	public String getStatusName() {
		return statusName;
	}
	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}
	public String getMakerName() {
		return makerName;
	}
	public void setMakerName(String makerName) {
		this.makerName = makerName;
	}
	public String getWhSumPrice() {
		return whSumPrice;
	}
	public void setWhSumPrice(String whSumPrice) {
		this.whSumPrice = whSumPrice;
	}
	public String getPlaceNo() {
		return placeNo;
	}
	public void setPlaceNo(String placeNo) {
		this.placeNo = placeNo;
	}
	public String getOrderGroupId() {
		return orderGroupId;
	}
	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
	}
	public String getRegUserName() {
		return regUserName;
	}
	public void setRegUserName(String regUserName) {
		this.regUserName = regUserName;
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
	public String getPlaceMgr() {
		return placeMgr;
	}
	public void setPlaceMgr(String placeMgr) {
		this.placeMgr = placeMgr;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public long getItemId() {
		return itemId;
	}
	public void setItemId(long itemId) {
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
	public String getItemNameEn() {
		return itemNameEn;
	}
	public void setItemNameEn(String itemNameEn) {
		this.itemNameEn = itemNameEn;
	}
	public BigDecimal getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
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
	public String getReqChkYmd() {
		return reqChkYmd;
	}
	public void setReqChkYmd(String reqChkYmd) {
		this.reqChkYmd = reqChkYmd;
	}
	public BigDecimal getOrderSalePrice() {
		return orderSalePrice;
	}
	public void setOrderSalePrice(BigDecimal orderSalePrice) {
		this.orderSalePrice = orderSalePrice;
	}
	public String getUniPriArr() {
		return uniPriArr;
	}
	public void setUniPriArr(String uniPriArr) {
		this.uniPriArr = uniPriArr;
	}
	public String getMemo1Arr() {
		return memo1Arr;
	}
	public void setMemo1Arr(String memo1Arr) {
		this.memo1Arr = memo1Arr;
	}
	public String getMemo2Arr() {
		return memo2Arr;
	}
	public void setMemo2Arr(String memo2Arr) {
		this.memo2Arr = memo2Arr;
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
	public String getRcvCustCode() {
		return rcvCustCode;
	}
	public void setRcvCustCode(String rcvCustCode) {
		this.rcvCustCode = rcvCustCode;
	}
	public String getRcvCustName() {
		return rcvCustName;
	}
	public void setRcvCustName(String rcvCustName) {
		this.rcvCustName = rcvCustName;
	}
	public String getBranchCode() {
		return branchCode;
	}
	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}
	public String getCarNo() {
		return carNo;
	}
	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}
	public String getRcvLogisCodeArr() {
		return rcvLogisCodeArr;
	}
	public void setRcvLogisCodeArr(String rcvLogisCodeArr) {
		this.rcvLogisCodeArr = rcvLogisCodeArr;
	}
	public String getRcvLogisCode() {
		return rcvLogisCode;
	}
	public void setRcvLogisCode(String rcvLogisCode) {
		this.rcvLogisCode = rcvLogisCode;
	}
	public String getOrderReqYN() {
		return orderReqYN;
	}
	public void setOrderReqYN(String orderReqYN) {
		this.orderReqYN = orderReqYN;
	}
	public String getCusArr2() {
		return cusArr2;
	}
	public void setCusArr2(String cusArr2) {
		this.cusArr2 = cusArr2;
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
	public String getGvComCode() {
		return gvComCode;
	}
	public void setGvComCode(String gvComCode) {
		this.gvComCode = gvComCode;
	}
	public String getGvComName() {
		return gvComName;
	}
	public void setGvComName(String gvComName) {
		this.gvComName = gvComName;
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
	@Override
	public String toString() {
		return "PlaceReqItem [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", placeReqNo=" + placeReqNo + ", reqSeq=" + reqSeq
				+ ", orderNo=" + orderNo + ", orderSeq=" + orderSeq + ", placeCustCode=" + placeCustCode
				+ ", placeCustName=" + placeCustName + ", cnt=" + cnt + ", unitPrice=" + unitPrice + ", sumPrice="
				+ sumPrice + ", regUserId=" + regUserId + ", created=" + created + ", uptUserId=" + uptUserId
				+ ", modified=" + modified + ", reqArr=" + reqArr + ", rseArr=" + rseArr + ", ordArr=" + ordArr
				+ ", seqArr=" + seqArr + ", cusArr=" + cusArr + ", cntArr=" + cntArr + ", chkDate=" + chkDate
				+ ", chkUserId=" + chkUserId + ", whUnitPrice=" + whUnitPrice + ", whUnitPrice_RUI=" + whUnitPrice_RUI
				+ ", custOrderNo=" + custOrderNo + ", custOrderNo_RUI=" + custOrderNo_RUI + ", statusCode=" + statusCode
				+ ", statusName=" + statusName + ", makerName=" + makerName + ", whSumPrice=" + whSumPrice
				+ ", placeNo=" + placeNo + ", orderGroupId=" + orderGroupId + ", regUserName=" + regUserName
				+ ", placeDmdYmd=" + placeDmdYmd + ", whSchYmd=" + whSchYmd + ", placeMgr=" + placeMgr + ", memo="
				+ memo + ", itemId=" + itemId + ", itemNo=" + itemNo + ", itemName=" + itemName + ", itemNameEn="
				+ itemNameEn + ", salePrice=" + salePrice + ", supplyCustCode=" + supplyCustCode + ", supplyCustName="
				+ supplyCustName + ", reqChkYmd=" + reqChkYmd + ", orderSalePrice=" + orderSalePrice + ", uniPriArr="
				+ uniPriArr + ", memo1Arr=" + memo1Arr + ", memo2Arr=" + memo2Arr + ", memo1=" + memo1 + ", memo2="
				+ memo2 + ", rcvCustCode=" + rcvCustCode + ", rcvCustName=" + rcvCustName + ", branchCode=" + branchCode
				+ ", carNo=" + carNo + ", rcvLogisCodeArr=" + rcvLogisCodeArr + ", rcvLogisCode=" + rcvLogisCode
				+ ", orderReqYN=" + orderReqYN + ", cusArr2=" + cusArr2 + ", orderReqPlaceCustCode="
				+ orderReqPlaceCustCode + ", orderReqPlaceCustName=" + orderReqPlaceCustName + ", gvComCode="
				+ gvComCode + ", gvComName=" + gvComName + ", className=" + className + ", factoryNo=" + factoryNo
				+ "]";
	}
	
	
    
}

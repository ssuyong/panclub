package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.Date;

public class RlReqItem {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;            //
	private String rlReqNo;            //
	private String reqSeq;            //
	private String custOrderNo;            //
	private String orderNo;            //
	private String orderSeq;            //
	private long itemId;            // -- 품목ID,  
	//private int saleUnitPrice;            //--판매단가
	//private int cnt;            // -- 수량
	//private int rlUnitPrice;            // --입고단가
	//private int rlSumPrice;            // --합계
	private String memo1;            // -- 메모1
	private String memo2;            //
	private String placeCustCode;            // --발주처
	//private String storUse;            // --창고사용
	private String regUserId;            //
	private String regYmd;            //--등록일
	private String regHms;            // --등록시
	private String uptUserId;            // --수정자
	private String uptYmd;            //--수정일
	private String uptHms;            //--수정시	
	private Date chkDate;
	private String chkUserId;
	
	private String ordArr;   
	private String seqArr;	       
	private String cntArr;	
	private String reqArr; 
	private String rseArr;
	private String mm1Arr; 
	private String mm2Arr;
	
	private String claimType;			//청구구분 보험/일반
	private String itemNo;				//품번
	private String itemName;			//품명
	private String itemNameEn;			//영문품명
	private int orderCnt;				//주문수량
	private int rlReqCnt;				//출고요청수량
	private int rlCnt;					//실제출고수량
	private BigDecimal salePrice;		//판매단가
	private BigDecimal sumPrice;		//합계
	private BigDecimal taxPrice;		//세액
	private String placeCustName;		//발주처명
	private String storageCode;			//사용창고코드
	private String storageName;			//사용창고명
	private String orderGroupId;		//주문그룹ID
	private String rlNo;				//출고번호
	
	private BigDecimal saleUnitPrice;		//단가 2023.05.16 bk

	private int rlStandByQty;          // 2023.05.20 hsg  --출고대기수량
	private String rlStandByRackCode;
	private String rlStandByRackName;
	private String rlStandByStorCode;
	private String rlStandByStorName;
	
	//처리상태,거래처 2023.08.31 hsg
	private String procStatus;			
	private String custCode;
	private String custName;

	private String gvComCode; // 2023.09.14 yoonsang

	private String supplyCustCode; //20231013
	private String supplyCustName; //20231013 
	private String supplyMgrName; //20231013 
	private String supplyMgrPhone; //20231013 
	
	private String rlComCode; //20240228 yoonsang 

	private String reqPlaceCustCode; //20240328 yoonsang 
	private String reqPlaceCustName; //20240328 yoonsang 
	
	private String makerName;
	private String className;
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
	public String getRlReqNo() {
		return rlReqNo;
	}
	public void setRlReqNo(String rlReqNo) {
		this.rlReqNo = rlReqNo;
	}
	public String getReqSeq() {
		return reqSeq;
	}
	public void setReqSeq(String reqSeq) {
		this.reqSeq = reqSeq;
	}
	public String getCustOrderNo() {
		return custOrderNo;
	}
	public void setCustOrderNo(String custOrderNo) {
		this.custOrderNo = custOrderNo;
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
	public long getItemId() {
		return itemId;
	}
	public void setItemId(long itemId) {
		this.itemId = itemId;
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
	public String getPlaceCustCode() {
		return placeCustCode;
	}
	public void setPlaceCustCode(String placeCustCode) {
		this.placeCustCode = placeCustCode;
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
	public String getCntArr() {
		return cntArr;
	}
	public void setCntArr(String cntArr) {
		this.cntArr = cntArr;
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
	public String getMm1Arr() {
		return mm1Arr;
	}
	public void setMm1Arr(String mm1Arr) {
		this.mm1Arr = mm1Arr;
	}
	public String getMm2Arr() {
		return mm2Arr;
	}
	public void setMm2Arr(String mm2Arr) {
		this.mm2Arr = mm2Arr;
	}
	public String getClaimType() {
		return claimType;
	}
	public void setClaimType(String claimType) {
		this.claimType = claimType;
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
	public int getOrderCnt() {
		return orderCnt;
	}
	public void setOrderCnt(int orderCnt) {
		this.orderCnt = orderCnt;
	}
	public int getRlReqCnt() {
		return rlReqCnt;
	}
	public void setRlReqCnt(int rlReqCnt) {
		this.rlReqCnt = rlReqCnt;
	}
	public int getRlCnt() {
		return rlCnt;
	}
	public void setRlCnt(int rlCnt) {
		this.rlCnt = rlCnt;
	}
	public BigDecimal getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
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
	public String getPlaceCustName() {
		return placeCustName;
	}
	public void setPlaceCustName(String placeCustName) {
		this.placeCustName = placeCustName;
	}
	public String getStorageCode() {
		return storageCode;
	}
	public void setStorageCode(String storageCode) {
		this.storageCode = storageCode;
	}
	public String getStorageName() {
		return storageName;
	}
	public void setStorageName(String storageName) {
		this.storageName = storageName;
	}
	public String getOrderGroupId() {
		return orderGroupId;
	}
	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
	}
	public String getRlNo() {
		return rlNo;
	}
	public void setRlNo(String rlNo) {
		this.rlNo = rlNo;
	}
	public BigDecimal getSaleUnitPrice() {
		return saleUnitPrice;
	}
	public void setSaleUnitPrice(BigDecimal saleUnitPrice) {
		this.saleUnitPrice = saleUnitPrice;
	}
	public int getRlStandByQty() {
		return rlStandByQty;
	}
	public void setRlStandByQty(int rlStandByQty) {
		this.rlStandByQty = rlStandByQty;
	}
	public String getRlStandByRackCode() {
		return rlStandByRackCode;
	}
	public void setRlStandByRackCode(String rlStandByRackCode) {
		this.rlStandByRackCode = rlStandByRackCode;
	}
	public String getRlStandByRackName() {
		return rlStandByRackName;
	}
	public void setRlStandByRackName(String rlStandByRackName) {
		this.rlStandByRackName = rlStandByRackName;
	}
	public String getRlStandByStorCode() {
		return rlStandByStorCode;
	}
	public void setRlStandByStorCode(String rlStandByStorCode) {
		this.rlStandByStorCode = rlStandByStorCode;
	}
	public String getRlStandByStorName() {
		return rlStandByStorName;
	}
	public void setRlStandByStorName(String rlStandByStorName) {
		this.rlStandByStorName = rlStandByStorName;
	}
	public String getProcStatus() {
		return procStatus;
	}
	public void setProcStatus(String procStatus) {
		this.procStatus = procStatus;
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
	public String getGvComCode() {
		return gvComCode;
	}
	public void setGvComCode(String gvComCode) {
		this.gvComCode = gvComCode;
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
	public String getRlComCode() {
		return rlComCode;
	}
	public void setRlComCode(String rlComCode) {
		this.rlComCode = rlComCode;
	}
	public String getReqPlaceCustCode() {
		return reqPlaceCustCode;
	}
	public void setReqPlaceCustCode(String reqPlaceCustCode) {
		this.reqPlaceCustCode = reqPlaceCustCode;
	}
	public String getReqPlaceCustName() {
		return reqPlaceCustName;
	}
	public void setReqPlaceCustName(String reqPlaceCustName) {
		this.reqPlaceCustName = reqPlaceCustName;
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
	@Override
	public String toString() {
		return "RlReqItem [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", rlReqNo=" + rlReqNo + ", reqSeq=" + reqSeq
				+ ", custOrderNo=" + custOrderNo + ", orderNo=" + orderNo + ", orderSeq=" + orderSeq + ", itemId="
				+ itemId + ", memo1=" + memo1 + ", memo2=" + memo2 + ", placeCustCode=" + placeCustCode + ", regUserId="
				+ regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms + ", uptUserId=" + uptUserId + ", uptYmd="
				+ uptYmd + ", uptHms=" + uptHms + ", chkDate=" + chkDate + ", chkUserId=" + chkUserId + ", ordArr="
				+ ordArr + ", seqArr=" + seqArr + ", cntArr=" + cntArr + ", reqArr=" + reqArr + ", rseArr=" + rseArr
				+ ", mm1Arr=" + mm1Arr + ", mm2Arr=" + mm2Arr + ", claimType=" + claimType + ", itemNo=" + itemNo
				+ ", itemName=" + itemName + ", itemNameEn=" + itemNameEn + ", orderCnt=" + orderCnt + ", rlReqCnt="
				+ rlReqCnt + ", rlCnt=" + rlCnt + ", salePrice=" + salePrice + ", sumPrice=" + sumPrice + ", taxPrice="
				+ taxPrice + ", placeCustName=" + placeCustName + ", storageCode=" + storageCode + ", storageName="
				+ storageName + ", orderGroupId=" + orderGroupId + ", rlNo=" + rlNo + ", saleUnitPrice=" + saleUnitPrice
				+ ", rlStandByQty=" + rlStandByQty + ", rlStandByRackCode=" + rlStandByRackCode + ", rlStandByRackName="
				+ rlStandByRackName + ", rlStandByStorCode=" + rlStandByStorCode + ", rlStandByStorName="
				+ rlStandByStorName + ", procStatus=" + procStatus + ", custCode=" + custCode + ", custName=" + custName
				+ ", gvComCode=" + gvComCode + ", supplyCustCode=" + supplyCustCode + ", supplyCustName="
				+ supplyCustName + ", supplyMgrName=" + supplyMgrName + ", supplyMgrPhone=" + supplyMgrPhone
				+ ", rlComCode=" + rlComCode + ", reqPlaceCustCode=" + reqPlaceCustCode + ", reqPlaceCustName="
				+ reqPlaceCustName + ", makerName=" + makerName + ", className=" + className + ", factoryNo="
				+ factoryNo + "]";
	}
	
	
	
}

package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.Date;

public class RlItem {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String rlNo;
	private String rlSeq;
	private String rlReqNo;        // -- 요청번호
	private String rlReqSeq;        //  --요청순번
	private long itemId;        //  -- 품목ID,  
	private BigDecimal saleUnitPrice;        //  --판매단가
	private int cnt;        //  -- 수량
	private BigDecimal rlUnitPrice;        //  int, --입고단가
	private BigDecimal rlSumPrice;        //  --합계
	private String memo1;        //  -- 메모1
	private String memo2;        // 
	private String regUserId; 
	private String regYmd;        // --등록일
	private String regHms;        //  --등록시
	private String uptUserId;        //  --수정자
	private String uptYmd;        // --수정일
	private String uptHms;        // --수정시
	
	private String custOrderNo;
	private String orderGroupId;
	private String orderNo;
	private String orderSeq;
	
	private String itemNo;
	private String itemName;
	private String itemNameEn;

	private String custName;

	private String rlYmd;
	private String custCode;
	private String rlCnt;
	private String rlRegUserId;
	private String rlStatus;
	private String rlUnitPriceReg; 
	private String reout;  // --반출
	private String placeYmd; 
	
	private String reqNoArr;
	private String reqSeqArr;
	private String storCdArr;
	private String memo1Arr;
	private String memo2Arr;
	
	private String rlUnitPriceArr;
	private String rlCntArr;
	private String rlNoArr;
	private String rlSeqArr;
	
	private String claimType;				//2023.04.11 yoonsang 추가 청구구분
	private String makerCode;				// 차종
	private String reqRegUserId;				// 요청자
	
	private String makerName;    //2023.08.23. hsg 제조사명 

	private String gvComCode;    //20230914

	private String supplyCustCode; //20231013
	private String supplyCustName; //20231013 
	private String supplyMgrName; //20231013 
	private String supplyMgrPhone; //20231013 
	
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
	public String getRlNo() {
		return rlNo;
	}
	public void setRlNo(String rlNo) {
		this.rlNo = rlNo;
	}
	public String getRlSeq() {
		return rlSeq;
	}
	public void setRlSeq(String rlSeq) {
		this.rlSeq = rlSeq;
	}
	public String getRlReqNo() {
		return rlReqNo;
	}
	public void setRlReqNo(String rlReqNo) {
		this.rlReqNo = rlReqNo;
	}
	public String getRlReqSeq() {
		return rlReqSeq;
	}
	public void setRlReqSeq(String rlReqSeq) {
		this.rlReqSeq = rlReqSeq;
	}
	public long getItemId() {
		return itemId;
	}
	public void setItemId(long itemId) {
		this.itemId = itemId;
	}
	public BigDecimal getSaleUnitPrice() {
		return saleUnitPrice;
	}
	public void setSaleUnitPrice(BigDecimal saleUnitPrice) {
		this.saleUnitPrice = saleUnitPrice;
	}
	public int getCnt() {
		return cnt;
	}
	public void setCnt(int cnt) {
		this.cnt = cnt;
	}
	public BigDecimal getRlUnitPrice() {
		return rlUnitPrice;
	}
	public void setRlUnitPrice(BigDecimal rlUnitPrice) {
		this.rlUnitPrice = rlUnitPrice;
	}
	public BigDecimal getRlSumPrice() {
		return rlSumPrice;
	}
	public void setRlSumPrice(BigDecimal rlSumPrice) {
		this.rlSumPrice = rlSumPrice;
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
	public String getOrderSeq() {
		return orderSeq;
	}
	public void setOrderSeq(String orderSeq) {
		this.orderSeq = orderSeq;
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
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
	}
	public String getRlYmd() {
		return rlYmd;
	}
	public void setRlYmd(String rlYmd) {
		this.rlYmd = rlYmd;
	}
	public String getCustCode() {
		return custCode;
	}
	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}
	public String getRlCnt() {
		return rlCnt;
	}
	public void setRlCnt(String rlCnt) {
		this.rlCnt = rlCnt;
	}
	public String getRlRegUserId() {
		return rlRegUserId;
	}
	public void setRlRegUserId(String rlRegUserId) {
		this.rlRegUserId = rlRegUserId;
	}
	public String getRlStatus() {
		return rlStatus;
	}
	public void setRlStatus(String rlStatus) {
		this.rlStatus = rlStatus;
	}
	public String getRlUnitPriceReg() {
		return rlUnitPriceReg;
	}
	public void setRlUnitPriceReg(String rlUnitPriceReg) {
		this.rlUnitPriceReg = rlUnitPriceReg;
	}
	public String getReout() {
		return reout;
	}
	public void setReout(String reout) {
		this.reout = reout;
	}
	public String getPlaceYmd() {
		return placeYmd;
	}
	public void setPlaceYmd(String placeYmd) {
		this.placeYmd = placeYmd;
	}
	public String getReqNoArr() {
		return reqNoArr;
	}
	public void setReqNoArr(String reqNoArr) {
		this.reqNoArr = reqNoArr;
	}
	public String getReqSeqArr() {
		return reqSeqArr;
	}
	public void setReqSeqArr(String reqSeqArr) {
		this.reqSeqArr = reqSeqArr;
	}
	public String getStorCdArr() {
		return storCdArr;
	}
	public void setStorCdArr(String storCdArr) {
		this.storCdArr = storCdArr;
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
	public String getRlUnitPriceArr() {
		return rlUnitPriceArr;
	}
	public void setRlUnitPriceArr(String rlUnitPriceArr) {
		this.rlUnitPriceArr = rlUnitPriceArr;
	}
	public String getRlCntArr() {
		return rlCntArr;
	}
	public void setRlCntArr(String rlCntArr) {
		this.rlCntArr = rlCntArr;
	}
	public String getRlNoArr() {
		return rlNoArr;
	}
	public void setRlNoArr(String rlNoArr) {
		this.rlNoArr = rlNoArr;
	}
	public String getRlSeqArr() {
		return rlSeqArr;
	}
	public void setRlSeqArr(String rlSeqArr) {
		this.rlSeqArr = rlSeqArr;
	}
	public String getClaimType() {
		return claimType;
	}
	public void setClaimType(String claimType) {
		this.claimType = claimType;
	}
	public String getMakerCode() {
		return makerCode;
	}
	public void setMakerCode(String makerCode) {
		this.makerCode = makerCode;
	}
	public String getReqRegUserId() {
		return reqRegUserId;
	}
	public void setReqRegUserId(String reqRegUserId) {
		this.reqRegUserId = reqRegUserId;
	}
	public String getMakerName() {
		return makerName;
	}
	public void setMakerName(String makerName) {
		this.makerName = makerName;
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
		return "RlItem [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", rlNo=" + rlNo + ", rlSeq=" + rlSeq + ", rlReqNo=" + rlReqNo
				+ ", rlReqSeq=" + rlReqSeq + ", itemId=" + itemId + ", saleUnitPrice=" + saleUnitPrice + ", cnt=" + cnt
				+ ", rlUnitPrice=" + rlUnitPrice + ", rlSumPrice=" + rlSumPrice + ", memo1=" + memo1 + ", memo2="
				+ memo2 + ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms + ", uptUserId="
				+ uptUserId + ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", custOrderNo=" + custOrderNo
				+ ", orderGroupId=" + orderGroupId + ", orderNo=" + orderNo + ", orderSeq=" + orderSeq + ", itemNo="
				+ itemNo + ", itemName=" + itemName + ", itemNameEn=" + itemNameEn + ", custName=" + custName
				+ ", rlYmd=" + rlYmd + ", custCode=" + custCode + ", rlCnt=" + rlCnt + ", rlRegUserId=" + rlRegUserId
				+ ", rlStatus=" + rlStatus + ", rlUnitPriceReg=" + rlUnitPriceReg + ", reout=" + reout + ", placeYmd="
				+ placeYmd + ", reqNoArr=" + reqNoArr + ", reqSeqArr=" + reqSeqArr + ", storCdArr=" + storCdArr
				+ ", memo1Arr=" + memo1Arr + ", memo2Arr=" + memo2Arr + ", rlUnitPriceArr=" + rlUnitPriceArr
				+ ", rlCntArr=" + rlCntArr + ", rlNoArr=" + rlNoArr + ", rlSeqArr=" + rlSeqArr + ", claimType="
				+ claimType + ", makerCode=" + makerCode + ", reqRegUserId=" + reqRegUserId + ", makerName=" + makerName
				+ ", gvComCode=" + gvComCode + ", supplyCustCode=" + supplyCustCode + ", supplyCustName="
				+ supplyCustName + ", supplyMgrName=" + supplyMgrName + ", supplyMgrPhone=" + supplyMgrPhone
				+ ", className=" + className + ", factoryNo=" + factoryNo + "]";
	}
	

}

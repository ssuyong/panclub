package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.Date;

public class ClReqItem {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;	
	
	private String comCode; 		//  --회사코드
	private String clReqNo; 		//--요청번호
	private String reqSeq; 		//  --순번
	private String orderNo; 		//--주문q번호
	private String orderSeq; 		// --주문순번
	private long itemId; 		// 
	private int cnt; 		//  --수량
	private BigDecimal unitPrice; 		// --단가
	private BigDecimal sumPrice; 		//	 --합계
	private String regUserId; 		//-- 등록자
	private String regYmd; 		// 
	private String regHms; 		//
	private String uptUserId; 		//--수정자
	private String uptYmd; 		//
	private String uptHms; 		//
	
	private String ordArr;
	private String seqArr;
	private String rlNoArr;		//2023.05.12 yoonsang 일반청구에서사용하기위해 추가
	private String rlSeqArr;
	private String cntArr;
	private String reqArr;
	private String rseArr;
	private String mm1Arr;
	private String mm2Arr;
	private String itemArr;
	private String uPriArr;
	private String sPriArr;		// 2023.05.03 일반건청구요청은 판매금액으로해야함 (보험건은 센터가)
	
	private String memo1;
	private String memo2;
	
	private String clType;  // 청구구분이 디테일단에 존해해야해서 추가. hsg 2023.04.12 
	private String clTypeArr;

	private String itemNo; //20230420 bk 부품번호 
	private String itemName;//20230420 bk 부품명 
	private String orderGroupId;//20230420 bk
	private String placeCustName;//20230420 bk 발주처명
	
	private String centerYN;//20230424 bk 외부재고/센터재고 여부 
	private String centerPrice;//20230424 bk 센터가  
	private String clGroupId; //20230424 bk 청구그룹아이디 
	
	private String insure1DcRate; //20230424 bk  보험사1 할인율
	private String insure2DcRate; //20230424 bk 보험사2 할인율
	
	private BigDecimal insure1ClPrice; 
	private BigDecimal insure2ClPrice; 
	
	private String itemNameEn;
	private BigDecimal salePrice;   //부품판매단가
	private String plCustCode;
	private String plCustName;
	
	//2023.04.25 hsg
	private String insure1DcRateArr;
	private String insure1ClPriArr;
	private String insure2DcRateArr;
	private String insure2ClPriArr;
	private String centerPriArr;
	
	private String plCustCenterYN;   //2023.04.26 발주처센터여부:보험청구시에만 Y, N  일반인경우 공백

	private String chkRegUserId;
	private Date chkDate;
	
	private String ins1DcLC;          //  2023.05.08 yoonsang 히든처리
	private String ins1DcWS;          // 
	private String ins2DcLC;          // 
	private String ins2DcWS;          //
	
	private String chkDate2; //2023.05.12 청구아이템 청구일자 표시 
	private String rdoInsure; //2023.05.15 보험사 1/2구분 2023.05.15 bk
	private String insureDcRate; //보험사 할인율 2023.05.15 bk
	private BigDecimal insureClPrice; //2023.05.15 bk
	
	private String checkYN; 			//2023.05.30 yoonsang - 진행,기결 체크
	private String centUnitPrice ;//2023.07.03 bk 주문그룹 단가 (할인전 )
	private String brandName ;//2023.07.13 bk 부품 제조사 
	private String noClTypeArr ;	//2023.07.13 yoonsang 미청구품목내역에서 출고반입 구분
	
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
	public String getClReqNo() {
		return clReqNo;
	}
	public void setClReqNo(String clReqNo) {
		this.clReqNo = clReqNo;
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
	public long getItemId() {
		return itemId;
	}
	public void setItemId(long itemId) {
		this.itemId = itemId;
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
	public String getItemArr() {
		return itemArr;
	}
	public void setItemArr(String itemArr) {
		this.itemArr = itemArr;
	}
	public String getuPriArr() {
		return uPriArr;
	}
	public void setuPriArr(String uPriArr) {
		this.uPriArr = uPriArr;
	}
	public String getsPriArr() {
		return sPriArr;
	}
	public void setsPriArr(String sPriArr) {
		this.sPriArr = sPriArr;
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
	public String getClType() {
		return clType;
	}
	public void setClType(String clType) {
		this.clType = clType;
	}
	public String getClTypeArr() {
		return clTypeArr;
	}
	public void setClTypeArr(String clTypeArr) {
		this.clTypeArr = clTypeArr;
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
	public String getOrderGroupId() {
		return orderGroupId;
	}
	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
	}
	public String getPlaceCustName() {
		return placeCustName;
	}
	public void setPlaceCustName(String placeCustName) {
		this.placeCustName = placeCustName;
	}
	public String getCenterYN() {
		return centerYN;
	}
	public void setCenterYN(String centerYN) {
		this.centerYN = centerYN;
	}
	public String getCenterPrice() {
		return centerPrice;
	}
	public void setCenterPrice(String centerPrice) {
		this.centerPrice = centerPrice;
	}
	public String getClGroupId() {
		return clGroupId;
	}
	public void setClGroupId(String clGroupId) {
		this.clGroupId = clGroupId;
	}
	public String getInsure1DcRate() {
		return insure1DcRate;
	}
	public void setInsure1DcRate(String insure1DcRate) {
		this.insure1DcRate = insure1DcRate;
	}
	public String getInsure2DcRate() {
		return insure2DcRate;
	}
	public void setInsure2DcRate(String insure2DcRate) {
		this.insure2DcRate = insure2DcRate;
	}
	public BigDecimal getInsure1ClPrice() {
		return insure1ClPrice;
	}
	public void setInsure1ClPrice(BigDecimal insure1ClPrice) {
		this.insure1ClPrice = insure1ClPrice;
	}
	public BigDecimal getInsure2ClPrice() {
		return insure2ClPrice;
	}
	public void setInsure2ClPrice(BigDecimal insure2ClPrice) {
		this.insure2ClPrice = insure2ClPrice;
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
	public String getPlCustCode() {
		return plCustCode;
	}
	public void setPlCustCode(String plCustCode) {
		this.plCustCode = plCustCode;
	}
	public String getPlCustName() {
		return plCustName;
	}
	public void setPlCustName(String plCustName) {
		this.plCustName = plCustName;
	}
	public String getInsure1DcRateArr() {
		return insure1DcRateArr;
	}
	public void setInsure1DcRateArr(String insure1DcRateArr) {
		this.insure1DcRateArr = insure1DcRateArr;
	}
	public String getInsure1ClPriArr() {
		return insure1ClPriArr;
	}
	public void setInsure1ClPriArr(String insure1ClPriArr) {
		this.insure1ClPriArr = insure1ClPriArr;
	}
	public String getInsure2DcRateArr() {
		return insure2DcRateArr;
	}
	public void setInsure2DcRateArr(String insure2DcRateArr) {
		this.insure2DcRateArr = insure2DcRateArr;
	}
	public String getInsure2ClPriArr() {
		return insure2ClPriArr;
	}
	public void setInsure2ClPriArr(String insure2ClPriArr) {
		this.insure2ClPriArr = insure2ClPriArr;
	}
	public String getCenterPriArr() {
		return centerPriArr;
	}
	public void setCenterPriArr(String centerPriArr) {
		this.centerPriArr = centerPriArr;
	}
	public String getPlCustCenterYN() {
		return plCustCenterYN;
	}
	public void setPlCustCenterYN(String plCustCenterYN) {
		this.plCustCenterYN = plCustCenterYN;
	}
	public String getChkRegUserId() {
		return chkRegUserId;
	}
	public void setChkRegUserId(String chkRegUserId) {
		this.chkRegUserId = chkRegUserId;
	}
	public Date getChkDate() {
		return chkDate;
	}
	public void setChkDate(Date chkDate) {
		this.chkDate = chkDate;
	}
	public String getIns1DcLC() {
		return ins1DcLC;
	}
	public void setIns1DcLC(String ins1DcLC) {
		this.ins1DcLC = ins1DcLC;
	}
	public String getIns1DcWS() {
		return ins1DcWS;
	}
	public void setIns1DcWS(String ins1DcWS) {
		this.ins1DcWS = ins1DcWS;
	}
	public String getIns2DcLC() {
		return ins2DcLC;
	}
	public void setIns2DcLC(String ins2DcLC) {
		this.ins2DcLC = ins2DcLC;
	}
	public String getIns2DcWS() {
		return ins2DcWS;
	}
	public void setIns2DcWS(String ins2DcWS) {
		this.ins2DcWS = ins2DcWS;
	}
	public String getChkDate2() {
		return chkDate2;
	}
	public void setChkDate2(String chkDate2) {
		this.chkDate2 = chkDate2;
	}
	public String getRdoInsure() {
		return rdoInsure;
	}
	public void setRdoInsure(String rdoInsure) {
		this.rdoInsure = rdoInsure;
	}
	public String getInsureDcRate() {
		return insureDcRate;
	}
	public void setInsureDcRate(String insureDcRate) {
		this.insureDcRate = insureDcRate;
	}
	public BigDecimal getInsureClPrice() {
		return insureClPrice;
	}
	public void setInsureClPrice(BigDecimal insureClPrice) {
		this.insureClPrice = insureClPrice;
	}
	public String getCheckYN() {
		return checkYN;
	}
	public void setCheckYN(String checkYN) {
		this.checkYN = checkYN;
	}
	public String getCentUnitPrice() {
		return centUnitPrice;
	}
	public void setCentUnitPrice(String centUnitPrice) {
		this.centUnitPrice = centUnitPrice;
	}
	public String getBrandName() {
		return brandName;
	}
	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}
	public String getNoClTypeArr() {
		return noClTypeArr;
	}
	public void setNoClTypeArr(String noClTypeArr) {
		this.noClTypeArr = noClTypeArr;
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
		return "ClReqItem [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", clReqNo=" + clReqNo + ", reqSeq=" + reqSeq + ", orderNo="
				+ orderNo + ", orderSeq=" + orderSeq + ", itemId=" + itemId + ", cnt=" + cnt + ", unitPrice="
				+ unitPrice + ", sumPrice=" + sumPrice + ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms="
				+ regHms + ", uptUserId=" + uptUserId + ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", ordArr="
				+ ordArr + ", seqArr=" + seqArr + ", rlNoArr=" + rlNoArr + ", rlSeqArr=" + rlSeqArr + ", cntArr="
				+ cntArr + ", reqArr=" + reqArr + ", rseArr=" + rseArr + ", mm1Arr=" + mm1Arr + ", mm2Arr=" + mm2Arr
				+ ", itemArr=" + itemArr + ", uPriArr=" + uPriArr + ", sPriArr=" + sPriArr + ", memo1=" + memo1
				+ ", memo2=" + memo2 + ", clType=" + clType + ", clTypeArr=" + clTypeArr + ", itemNo=" + itemNo
				+ ", itemName=" + itemName + ", orderGroupId=" + orderGroupId + ", placeCustName=" + placeCustName
				+ ", centerYN=" + centerYN + ", centerPrice=" + centerPrice + ", clGroupId=" + clGroupId
				+ ", insure1DcRate=" + insure1DcRate + ", insure2DcRate=" + insure2DcRate + ", insure1ClPrice="
				+ insure1ClPrice + ", insure2ClPrice=" + insure2ClPrice + ", itemNameEn=" + itemNameEn + ", salePrice="
				+ salePrice + ", plCustCode=" + plCustCode + ", plCustName=" + plCustName + ", insure1DcRateArr="
				+ insure1DcRateArr + ", insure1ClPriArr=" + insure1ClPriArr + ", insure2DcRateArr=" + insure2DcRateArr
				+ ", insure2ClPriArr=" + insure2ClPriArr + ", centerPriArr=" + centerPriArr + ", plCustCenterYN="
				+ plCustCenterYN + ", chkRegUserId=" + chkRegUserId + ", chkDate=" + chkDate + ", ins1DcLC=" + ins1DcLC
				+ ", ins1DcWS=" + ins1DcWS + ", ins2DcLC=" + ins2DcLC + ", ins2DcWS=" + ins2DcWS + ", chkDate2="
				+ chkDate2 + ", rdoInsure=" + rdoInsure + ", insureDcRate=" + insureDcRate + ", insureClPrice="
				+ insureClPrice + ", checkYN=" + checkYN + ", centUnitPrice=" + centUnitPrice + ", brandName="
				+ brandName + ", noClTypeArr=" + noClTypeArr + ", makerName=" + makerName + ", className=" + className
				+ ", factoryNo=" + factoryNo + "]";
	}
	
	
}

package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.Date;

public class WhItem {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String whNo;
	private String whSeq;
	private String placeNo;        // -- 발주번호
	private String placeSeq;        //  --발주순번
	private long itemId;        //  -- 품목ID,  
	private BigDecimal saleUnitPrice;        //  --판매단가
	private int cnt;        //  -- 수량
	private BigDecimal whUnitPrice;        //  int, --입고단가
	private BigDecimal whSumPrice;        //  --합계
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

	private String whYmd;
	private String custCode;
	private String whCnt;
	private String whRegUserId;
	private String whStatus;
	private String whUnitPriceReg; 
	private String withdrawStatus;   // --출금상태
	private String reout;  // --반출
	private String placeYmd; 
	
	private String placeNoArr;
	private String placeSeqArr;
	private String whUnitPriceArr;
	private String whCntArr;
	private String whNoArr;
	private String whSeqArr;
	
	private String buyChk;      // -- 매입확정여부
    private Date buyChkDate;      //   -- 매입확정여부
	private String buyChkUserId;     //   -- 매입확정자
	
	private String bizNo;    //ㄱ발주입고에서 검색시 custCode 대신 사용 . 2023.03.21 hsg
	private String storageCode;  //창고 , 입고시 사용.  2023.03.21 hsg
	private String storageName;  //  , 입고시 사용.  2023.03.21 hsg
	private String rackCode;     //랙  , 입고시 사용.  2023.03.21 hsg
	private String rackName;     // , 입고시 사용.  2023.03.21 hsg
	
	private String itemNoNew;    //품번변경 시 사용. 2023.03.22  hsg
	private String itemIdNew;    //품번변경 시 사용. 2023.03.23  hsg. itemNoNew를 사용하려다 이게 정확해서 이걸 사용
	private String allItemChnYN;  //품번변경시 주문그룹전체 변경할건지에 대한 옵션. 2023.03.23 hsg 
	
	private String placeCnt;  //발주수량. 2023.03.23 hsg
	
	private String priceChk;	//입고가 입력 완료 체크 2023.03.27 yoonsang
	
	private String priceChkYmd;	//입고가 입력 완료 일자 2023.03.28 yoonsang
	
	private String placeRegUserId;	//누락 추가
	
	private String placeUnitPrice;	//발주단가와 입고단가를 구분 2023.03.29 yoonsang

	private String rcvCustCode; //납품처코드 2023.05.31 bokyung
	private String rcvCustName;//납품처명 2023.05.31 bokyung
	private String branchCode;//지점 2023.05.31 bokyung
	
	private String placeRegUserName;//요청자명 2023.06.01 bokyung
	private String whRegUserName;//처리자명 2023.06.01 bokyung
	private String inDead;//마감일자 2023.06.05 bokyung
	
	private String placeRlYmd;//마감일자 2023.06.30 yoonsang
	private String placeCustName;//발주처 2023.06.30 yoonsang
	private String placeCustCode;//발주처 2023.06.30 yoonsang
	
	private String whSchYmd;//입고예상일 2023.07.03 yoonsang

	private String saleUnitPriceNew;  //품번변경시 단가 2023.07.05 hsg
	
	private String printCnt;//프린트 횟수 2023.07.07 bk
	private String printUser;//프린트 2023.07.07 bk
	private String placeHms;//발주시간 2023.07.14 bk
	
	private BigDecimal rlUnitPrice; //출고단가. 2023.07.27 hsg
	private String ref1; // 참고1 2023.08.22 bk
	private String ref2;//참고2 2023.08.22 bk
	
	// 2023.08.23 hsg. 제조사
	private String makerCode;
	private String makerName;
	//2023.09.04 bk 연동관련 
	private String rlSchYmd; //거래처 출고일 bk
	private String dlvType; // 배송유형 
	
	private String whSchTime; // 입고예정시간 2023.09.11 bk
	private BigDecimal plSumPrice; //발주금액 합계. 2023.07.27 hsg
	
	private String gvComCode;
	private String gvComName;
	private String rcvLogisCode;  // 수령물류센터 2024.03.04 supi
	
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
	public String getWhNo() {
		return whNo;
	}
	public void setWhNo(String whNo) {
		this.whNo = whNo;
	}
	public String getWhSeq() {
		return whSeq;
	}
	public void setWhSeq(String whSeq) {
		this.whSeq = whSeq;
	}
	public String getPlaceNo() {
		return placeNo;
	}
	public void setPlaceNo(String placeNo) {
		this.placeNo = placeNo;
	}
	public String getPlaceSeq() {
		return placeSeq;
	}
	public void setPlaceSeq(String placeSeq) {
		this.placeSeq = placeSeq;
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
	public BigDecimal getWhUnitPrice() {
		return whUnitPrice;
	}
	public void setWhUnitPrice(BigDecimal whUnitPrice) {
		this.whUnitPrice = whUnitPrice;
	}
	public BigDecimal getWhSumPrice() {
		return whSumPrice;
	}
	public void setWhSumPrice(BigDecimal whSumPrice) {
		this.whSumPrice = whSumPrice;
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
	public String getWhYmd() {
		return whYmd;
	}
	public void setWhYmd(String whYmd) {
		this.whYmd = whYmd;
	}
	public String getCustCode() {
		return custCode;
	}
	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}
	public String getWhCnt() {
		return whCnt;
	}
	public void setWhCnt(String whCnt) {
		this.whCnt = whCnt;
	}
	public String getWhRegUserId() {
		return whRegUserId;
	}
	public void setWhRegUserId(String whRegUserId) {
		this.whRegUserId = whRegUserId;
	}
	public String getWhStatus() {
		return whStatus;
	}
	public void setWhStatus(String whStatus) {
		this.whStatus = whStatus;
	}
	public String getWhUnitPriceReg() {
		return whUnitPriceReg;
	}
	public void setWhUnitPriceReg(String whUnitPriceReg) {
		this.whUnitPriceReg = whUnitPriceReg;
	}
	public String getWithdrawStatus() {
		return withdrawStatus;
	}
	public void setWithdrawStatus(String withdrawStatus) {
		this.withdrawStatus = withdrawStatus;
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
	public String getPlaceNoArr() {
		return placeNoArr;
	}
	public void setPlaceNoArr(String placeNoArr) {
		this.placeNoArr = placeNoArr;
	}
	public String getPlaceSeqArr() {
		return placeSeqArr;
	}
	public void setPlaceSeqArr(String placeSeqArr) {
		this.placeSeqArr = placeSeqArr;
	}
	public String getWhUnitPriceArr() {
		return whUnitPriceArr;
	}
	public void setWhUnitPriceArr(String whUnitPriceArr) {
		this.whUnitPriceArr = whUnitPriceArr;
	}
	public String getWhCntArr() {
		return whCntArr;
	}
	public void setWhCntArr(String whCntArr) {
		this.whCntArr = whCntArr;
	}
	public String getWhNoArr() {
		return whNoArr;
	}
	public void setWhNoArr(String whNoArr) {
		this.whNoArr = whNoArr;
	}
	public String getWhSeqArr() {
		return whSeqArr;
	}
	public void setWhSeqArr(String whSeqArr) {
		this.whSeqArr = whSeqArr;
	}
	public String getBuyChk() {
		return buyChk;
	}
	public void setBuyChk(String buyChk) {
		this.buyChk = buyChk;
	}
	public Date getBuyChkDate() {
		return buyChkDate;
	}
	public void setBuyChkDate(Date buyChkDate) {
		this.buyChkDate = buyChkDate;
	}
	public String getBuyChkUserId() {
		return buyChkUserId;
	}
	public void setBuyChkUserId(String buyChkUserId) {
		this.buyChkUserId = buyChkUserId;
	}
	public String getBizNo() {
		return bizNo;
	}
	public void setBizNo(String bizNo) {
		this.bizNo = bizNo;
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
	public String getRackCode() {
		return rackCode;
	}
	public void setRackCode(String rackCode) {
		this.rackCode = rackCode;
	}
	public String getRackName() {
		return rackName;
	}
	public void setRackName(String rackName) {
		this.rackName = rackName;
	}
	public String getItemNoNew() {
		return itemNoNew;
	}
	public void setItemNoNew(String itemNoNew) {
		this.itemNoNew = itemNoNew;
	}
	public String getItemIdNew() {
		return itemIdNew;
	}
	public void setItemIdNew(String itemIdNew) {
		this.itemIdNew = itemIdNew;
	}
	public String getAllItemChnYN() {
		return allItemChnYN;
	}
	public void setAllItemChnYN(String allItemChnYN) {
		this.allItemChnYN = allItemChnYN;
	}
	public String getPlaceCnt() {
		return placeCnt;
	}
	public void setPlaceCnt(String placeCnt) {
		this.placeCnt = placeCnt;
	}
	public String getPriceChk() {
		return priceChk;
	}
	public void setPriceChk(String priceChk) {
		this.priceChk = priceChk;
	}
	public String getPriceChkYmd() {
		return priceChkYmd;
	}
	public void setPriceChkYmd(String priceChkYmd) {
		this.priceChkYmd = priceChkYmd;
	}
	public String getPlaceRegUserId() {
		return placeRegUserId;
	}
	public void setPlaceRegUserId(String placeRegUserId) {
		this.placeRegUserId = placeRegUserId;
	}
	public String getPlaceUnitPrice() {
		return placeUnitPrice;
	}
	public void setPlaceUnitPrice(String placeUnitPrice) {
		this.placeUnitPrice = placeUnitPrice;
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
	public String getPlaceRegUserName() {
		return placeRegUserName;
	}
	public void setPlaceRegUserName(String placeRegUserName) {
		this.placeRegUserName = placeRegUserName;
	}
	public String getWhRegUserName() {
		return whRegUserName;
	}
	public void setWhRegUserName(String whRegUserName) {
		this.whRegUserName = whRegUserName;
	}
	public String getInDead() {
		return inDead;
	}
	public void setInDead(String inDead) {
		this.inDead = inDead;
	}
	public String getPlaceRlYmd() {
		return placeRlYmd;
	}
	public void setPlaceRlYmd(String placeRlYmd) {
		this.placeRlYmd = placeRlYmd;
	}
	public String getPlaceCustName() {
		return placeCustName;
	}
	public void setPlaceCustName(String placeCustName) {
		this.placeCustName = placeCustName;
	}
	public String getPlaceCustCode() {
		return placeCustCode;
	}
	public void setPlaceCustCode(String placeCustCode) {
		this.placeCustCode = placeCustCode;
	}
	public String getWhSchYmd() {
		return whSchYmd;
	}
	public void setWhSchYmd(String whSchYmd) {
		this.whSchYmd = whSchYmd;
	}
	public String getSaleUnitPriceNew() {
		return saleUnitPriceNew;
	}
	public void setSaleUnitPriceNew(String saleUnitPriceNew) {
		this.saleUnitPriceNew = saleUnitPriceNew;
	}
	public String getPrintCnt() {
		return printCnt;
	}
	public void setPrintCnt(String printCnt) {
		this.printCnt = printCnt;
	}
	public String getPrintUser() {
		return printUser;
	}
	public void setPrintUser(String printUser) {
		this.printUser = printUser;
	}
	public String getPlaceHms() {
		return placeHms;
	}
	public void setPlaceHms(String placeHms) {
		this.placeHms = placeHms;
	}
	public BigDecimal getRlUnitPrice() {
		return rlUnitPrice;
	}
	public void setRlUnitPrice(BigDecimal rlUnitPrice) {
		this.rlUnitPrice = rlUnitPrice;
	}
	public String getRef1() {
		return ref1;
	}
	public void setRef1(String ref1) {
		this.ref1 = ref1;
	}
	public String getRef2() {
		return ref2;
	}
	public void setRef2(String ref2) {
		this.ref2 = ref2;
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
	public String getRlSchYmd() {
		return rlSchYmd;
	}
	public void setRlSchYmd(String rlSchYmd) {
		this.rlSchYmd = rlSchYmd;
	}
	public String getDlvType() {
		return dlvType;
	}
	public void setDlvType(String dlvType) {
		this.dlvType = dlvType;
	}
	public String getWhSchTime() {
		return whSchTime;
	}
	public void setWhSchTime(String whSchTime) {
		this.whSchTime = whSchTime;
	}
	public BigDecimal getPlSumPrice() {
		return plSumPrice;
	}
	public void setPlSumPrice(BigDecimal plSumPrice) {
		this.plSumPrice = plSumPrice;
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
	public String getRcvLogisCode() {
		return rcvLogisCode;
	}
	public void setRcvLogisCode(String rcvLogisCode) {
		this.rcvLogisCode = rcvLogisCode;
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
		return "WhItem [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", whNo=" + whNo + ", whSeq=" + whSeq + ", placeNo=" + placeNo
				+ ", placeSeq=" + placeSeq + ", itemId=" + itemId + ", saleUnitPrice=" + saleUnitPrice + ", cnt=" + cnt
				+ ", whUnitPrice=" + whUnitPrice + ", whSumPrice=" + whSumPrice + ", memo1=" + memo1 + ", memo2="
				+ memo2 + ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms + ", uptUserId="
				+ uptUserId + ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", custOrderNo=" + custOrderNo
				+ ", orderGroupId=" + orderGroupId + ", orderNo=" + orderNo + ", orderSeq=" + orderSeq + ", itemNo="
				+ itemNo + ", itemName=" + itemName + ", itemNameEn=" + itemNameEn + ", custName=" + custName
				+ ", whYmd=" + whYmd + ", custCode=" + custCode + ", whCnt=" + whCnt + ", whRegUserId=" + whRegUserId
				+ ", whStatus=" + whStatus + ", whUnitPriceReg=" + whUnitPriceReg + ", withdrawStatus=" + withdrawStatus
				+ ", reout=" + reout + ", placeYmd=" + placeYmd + ", placeNoArr=" + placeNoArr + ", placeSeqArr="
				+ placeSeqArr + ", whUnitPriceArr=" + whUnitPriceArr + ", whCntArr=" + whCntArr + ", whNoArr=" + whNoArr
				+ ", whSeqArr=" + whSeqArr + ", buyChk=" + buyChk + ", buyChkDate=" + buyChkDate + ", buyChkUserId="
				+ buyChkUserId + ", bizNo=" + bizNo + ", storageCode=" + storageCode + ", storageName=" + storageName
				+ ", rackCode=" + rackCode + ", rackName=" + rackName + ", itemNoNew=" + itemNoNew + ", itemIdNew="
				+ itemIdNew + ", allItemChnYN=" + allItemChnYN + ", placeCnt=" + placeCnt + ", priceChk=" + priceChk
				+ ", priceChkYmd=" + priceChkYmd + ", placeRegUserId=" + placeRegUserId + ", placeUnitPrice="
				+ placeUnitPrice + ", rcvCustCode=" + rcvCustCode + ", rcvCustName=" + rcvCustName + ", branchCode="
				+ branchCode + ", placeRegUserName=" + placeRegUserName + ", whRegUserName=" + whRegUserName
				+ ", inDead=" + inDead + ", placeRlYmd=" + placeRlYmd + ", placeCustName=" + placeCustName
				+ ", placeCustCode=" + placeCustCode + ", whSchYmd=" + whSchYmd + ", saleUnitPriceNew="
				+ saleUnitPriceNew + ", printCnt=" + printCnt + ", printUser=" + printUser + ", placeHms=" + placeHms
				+ ", rlUnitPrice=" + rlUnitPrice + ", ref1=" + ref1 + ", ref2=" + ref2 + ", makerCode=" + makerCode
				+ ", makerName=" + makerName + ", rlSchYmd=" + rlSchYmd + ", dlvType=" + dlvType + ", whSchTime="
				+ whSchTime + ", plSumPrice=" + plSumPrice + ", gvComCode=" + gvComCode + ", gvComName=" + gvComName
				+ ", rcvLogisCode=" + rcvLogisCode + ", className=" + className + ", factoryNo=" + factoryNo + "]";
	}
	
	

}

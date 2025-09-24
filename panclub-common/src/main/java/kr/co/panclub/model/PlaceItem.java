package kr.co.panclub.model;
import java.math.BigDecimal;
import java.util.Date;

public class PlaceItem {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String placeNo;
	private String placeSeq;
	private String placeReqNo;  // 발주요청번호
	private String reqSeq;  //  --발주요청순번
	private String makerCode;  //  --제조사코드
	private long itemId;  //  -- 품목ID,  
	private BigDecimal saleUnitPrice;  // --판매단가
	private int cnt;  //  -- 수량
	private BigDecimal unitPrice;  // --발주(입고)단가
	private BigDecimal sumPrice;  // --합계
	private String supplyCustCode;  // -- 납품처
	private String memo1;  //  -- 메모1
	private String memo2;  // 
	private String regUserId;  // 
	private Date created;  // 
	private String uptUserId;  // 
	private Date modified;  // 
	private String custOrderNo;
	private String orderGroupId;
	private String orderGroupNo;
	private String orderSeq;
	
	private String noArr;
	private String seqArr;
	
	private String buyChk;      // -- 매입확정여부
    private Date buyChkDate;      //   -- 매입확정여부
	private String buyChkUserId;     //   -- 매입확정자
	
	private int dspNo;    //.노출순서 2023.03.17 hsg
	
	//납품처 2023.03.20 hsg
	private String rcvCustCode;
	private String rcvCustName;

	private String itemNo;
	private String itemName;
	private String itemNameEn;
	private BigDecimal salePrice;   //부품판매단가
	
	private String orderNo;			//주문번호 추가 2023.03.23 yoonsang
	
	//2023.08.23 hsg
	private String regYmd;
	private String custCode;
	private String custName;
	private String makerName;

	private String dlvType; //2023.09.01 배송유형 
	
	private BigDecimal taxPrice;   //231016
	private String taxType;
	
	private String orderArr;
	private String orderSeqArr;
	
	private String carNo; //2024.02.23 hsg 차량번호
	private String rcvLogisCode;   // 2024.03.04 수령물류센터 supi
	
	//2024.03.06 hsg
	private String comName;
	private String placeYmd;
	private String whYmd;
	private String whNo;
	private String whSeq;
	private String placeCustCode;
	private String placeCustName;
	private int whCnt;
	private BigDecimal whUnitPrice;
	private BigDecimal whSumPrice;
	private String regUserName;
	private String whRegUserName;
	
	private String gvComCode;
	private String gvComName;
	private String importYN; // 20240715 supi 수입품
	
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
	public String getMakerCode() {
		return makerCode;
	}
	public void setMakerCode(String makerCode) {
		this.makerCode = makerCode;
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
	public String getSupplyCustCode() {
		return supplyCustCode;
	}
	public void setSupplyCustCode(String supplyCustCode) {
		this.supplyCustCode = supplyCustCode;
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
	public Date getCreated() {
		return created;
	}
	public void setCreated(Date created) {
		this.created = created;
	}
	public String getUptUserId() {
		return uptUserId;
	}
	public void setUptUserId(String uptUserId) {
		this.uptUserId = uptUserId;
	}
	public Date getModified() {
		return modified;
	}
	public void setModified(Date modified) {
		this.modified = modified;
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
	public String getOrderGroupNo() {
		return orderGroupNo;
	}
	public void setOrderGroupNo(String orderGroupNo) {
		this.orderGroupNo = orderGroupNo;
	}
	public String getOrderSeq() {
		return orderSeq;
	}
	public void setOrderSeq(String orderSeq) {
		this.orderSeq = orderSeq;
	}
	public String getNoArr() {
		return noArr;
	}
	public void setNoArr(String noArr) {
		this.noArr = noArr;
	}
	public String getSeqArr() {
		return seqArr;
	}
	public void setSeqArr(String seqArr) {
		this.seqArr = seqArr;
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
	public int getDspNo() {
		return dspNo;
	}
	public void setDspNo(int dspNo) {
		this.dspNo = dspNo;
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
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	public String getRegYmd() {
		return regYmd;
	}
	public void setRegYmd(String regYmd) {
		this.regYmd = regYmd;
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
	public String getMakerName() {
		return makerName;
	}
	public void setMakerName(String makerName) {
		this.makerName = makerName;
	}
	public String getDlvType() {
		return dlvType;
	}
	public void setDlvType(String dlvType) {
		this.dlvType = dlvType;
	}
	public BigDecimal getTaxPrice() {
		return taxPrice;
	}
	public void setTaxPrice(BigDecimal taxPrice) {
		this.taxPrice = taxPrice;
	}
	public String getTaxType() {
		return taxType;
	}
	public void setTaxType(String taxType) {
		this.taxType = taxType;
	}
	public String getOrderArr() {
		return orderArr;
	}
	public void setOrderArr(String orderArr) {
		this.orderArr = orderArr;
	}
	public String getOrderSeqArr() {
		return orderSeqArr;
	}
	public void setOrderSeqArr(String orderSeqArr) {
		this.orderSeqArr = orderSeqArr;
	}
	public String getCarNo() {
		return carNo;
	}
	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}
	public String getRcvLogisCode() {
		return rcvLogisCode;
	}
	public void setRcvLogisCode(String rcvLogisCode) {
		this.rcvLogisCode = rcvLogisCode;
	}
	public String getComName() {
		return comName;
	}
	public void setComName(String comName) {
		this.comName = comName;
	}
	public String getPlaceYmd() {
		return placeYmd;
	}
	public void setPlaceYmd(String placeYmd) {
		this.placeYmd = placeYmd;
	}
	public String getWhYmd() {
		return whYmd;
	}
	public void setWhYmd(String whYmd) {
		this.whYmd = whYmd;
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
	public int getWhCnt() {
		return whCnt;
	}
	public void setWhCnt(int whCnt) {
		this.whCnt = whCnt;
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
	public String getRegUserName() {
		return regUserName;
	}
	public void setRegUserName(String regUserName) {
		this.regUserName = regUserName;
	}
	public String getWhRegUserName() {
		return whRegUserName;
	}
	public void setWhRegUserName(String whRegUserName) {
		this.whRegUserName = whRegUserName;
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
	public String getImportYN() {
		return importYN;
	}
	public void setImportYN(String importYN) {
		this.importYN = importYN;
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
		return "PlaceItem [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", placeNo=" + placeNo + ", placeSeq=" + placeSeq
				+ ", placeReqNo=" + placeReqNo + ", reqSeq=" + reqSeq + ", makerCode=" + makerCode + ", itemId="
				+ itemId + ", saleUnitPrice=" + saleUnitPrice + ", cnt=" + cnt + ", unitPrice=" + unitPrice
				+ ", sumPrice=" + sumPrice + ", supplyCustCode=" + supplyCustCode + ", memo1=" + memo1 + ", memo2="
				+ memo2 + ", regUserId=" + regUserId + ", created=" + created + ", uptUserId=" + uptUserId
				+ ", modified=" + modified + ", custOrderNo=" + custOrderNo + ", orderGroupId=" + orderGroupId
				+ ", orderGroupNo=" + orderGroupNo + ", orderSeq=" + orderSeq + ", noArr=" + noArr + ", seqArr="
				+ seqArr + ", buyChk=" + buyChk + ", buyChkDate=" + buyChkDate + ", buyChkUserId=" + buyChkUserId
				+ ", dspNo=" + dspNo + ", rcvCustCode=" + rcvCustCode + ", rcvCustName=" + rcvCustName + ", itemNo="
				+ itemNo + ", itemName=" + itemName + ", itemNameEn=" + itemNameEn + ", salePrice=" + salePrice
				+ ", orderNo=" + orderNo + ", regYmd=" + regYmd + ", custCode=" + custCode + ", custName=" + custName
				+ ", makerName=" + makerName + ", dlvType=" + dlvType + ", taxPrice=" + taxPrice + ", taxType="
				+ taxType + ", orderArr=" + orderArr + ", orderSeqArr=" + orderSeqArr + ", carNo=" + carNo
				+ ", rcvLogisCode=" + rcvLogisCode + ", comName=" + comName + ", placeYmd=" + placeYmd + ", whYmd="
				+ whYmd + ", whNo=" + whNo + ", whSeq=" + whSeq + ", placeCustCode=" + placeCustCode
				+ ", placeCustName=" + placeCustName + ", whCnt=" + whCnt + ", whUnitPrice=" + whUnitPrice
				+ ", whSumPrice=" + whSumPrice + ", regUserName=" + regUserName + ", whRegUserName=" + whRegUserName
				+ ", gvComCode=" + gvComCode + ", gvComName=" + gvComName + ", importYN=" + importYN + ", className="
				+ className + ", factoryNo=" + factoryNo + "]";
	}
	
	 
}

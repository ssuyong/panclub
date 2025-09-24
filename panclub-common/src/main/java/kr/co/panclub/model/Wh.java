package kr.co.panclub.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;

public class Wh {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;	
	
	private String comCode;
	private String whNo;               //  --발주번호
	private String custCode;               //--구매처처코드
	private String whYmd;               // --입고일
	private String custOrderNo;               // --구매처주문번호
	private String memo1;               //--비고1
	private BigDecimal price;               //--공급가액
	private BigDecimal taxPrice;               //--세액
	private BigDecimal sumPrice;               //--합계
	private String regUserId;               //--등록자
	private String regYmd;               //--등록일
	private String regHms;               // --등록시
	private String uptUserId;               // --수정자
	private String uptYmd;               //--수정일
	private String uptHms;               //--수정시	
	
	private int itemCnt;
	private int cnt;
	private String custName;
	private String payYmd;
	private String storageCode;
	private String storageName;  
	private String payStatus;   //결제상태
	private String payAmt;    //결제금액

	private String rackCode;     //랙  , 입고시 사용.  2023.03.21 hsg
	private String rackName;     // , 입고시 사용.  2023.03.21 hsg
	
	private String wdNo;   //출금번호. 입고현황에서 사용. 2023.03.23 hsg
	
	private String regUserName;               //--등록자 이름 2023.04.10 bokyung

	private String wdReqStatus; //출금요청 여부 2023.04.14 bokyung
	
	//출금(요청)된 건과 안된건이 같이 입고처리 안되게 처리위한 용도. 2023.04.10 hsg
	private String placeNoArr;
	private String placeSeqArr;
	
	private String buyChk;      // -- 매입확정여부 2023.04.18 bokyung
    private String buyChkDate;      //   -- 매입확정일자 2023.04.18 bokyung
	private String buyChkUserId;     //   -- 매입확정자 2023.04.18 bokyung
	private String whNoArr; // 입고리스트 2023.04.18 bokyung 

	private String whDateType; //기준일자 유형 (매입확정/입고) 2023.05.25 bokyung
	
	private String whSeqArr; // 230622 yoonsang
	private String placeRlYmd; // 230630 yoonsang
	
	private String branchCode; // 230628 bk
	
	// 추가 행 리스트
	private ArrayList<WhItem> whItemAdd;
	// 수정 행 리스트
	private ArrayList<WhItem> whItemUpdate;
	// 삭제 행 리스트
	private ArrayList<WhItem> whItemRemove;
	
	private String whUnitPriceArr;  //단가. 2023.07.31 hsg 마스터 디테일 같이 SP에서 등록하는 것으로 변경해서 필요
	private String whCntArr;        //수량. 2023.07.31 hsg 마스터 디테일 같이 SP에서 등록하는 것으로 변경해서 필요
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
	public String getCustCode() {
		return custCode;
	}
	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}
	public String getWhYmd() {
		return whYmd;
	}
	public void setWhYmd(String whYmd) {
		this.whYmd = whYmd;
	}
	public String getCustOrderNo() {
		return custOrderNo;
	}
	public void setCustOrderNo(String custOrderNo) {
		this.custOrderNo = custOrderNo;
	}
	public String getMemo1() {
		return memo1;
	}
	public void setMemo1(String memo1) {
		this.memo1 = memo1;
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
	public int getItemCnt() {
		return itemCnt;
	}
	public void setItemCnt(int itemCnt) {
		this.itemCnt = itemCnt;
	}
	public int getCnt() {
		return cnt;
	}
	public void setCnt(int cnt) {
		this.cnt = cnt;
	}
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
	}
	public String getPayYmd() {
		return payYmd;
	}
	public void setPayYmd(String payYmd) {
		this.payYmd = payYmd;
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
	public String getPayStatus() {
		return payStatus;
	}
	public void setPayStatus(String payStatus) {
		this.payStatus = payStatus;
	}
	public String getPayAmt() {
		return payAmt;
	}
	public void setPayAmt(String payAmt) {
		this.payAmt = payAmt;
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
	public String getWdNo() {
		return wdNo;
	}
	public void setWdNo(String wdNo) {
		this.wdNo = wdNo;
	}
	public String getRegUserName() {
		return regUserName;
	}
	public void setRegUserName(String regUserName) {
		this.regUserName = regUserName;
	}
	public String getWdReqStatus() {
		return wdReqStatus;
	}
	public void setWdReqStatus(String wdReqStatus) {
		this.wdReqStatus = wdReqStatus;
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
	public String getBuyChk() {
		return buyChk;
	}
	public void setBuyChk(String buyChk) {
		this.buyChk = buyChk;
	}
	public String getBuyChkDate() {
		return buyChkDate;
	}
	public void setBuyChkDate(String buyChkDate) {
		this.buyChkDate = buyChkDate;
	}
	public String getBuyChkUserId() {
		return buyChkUserId;
	}
	public void setBuyChkUserId(String buyChkUserId) {
		this.buyChkUserId = buyChkUserId;
	}
	public String getWhNoArr() {
		return whNoArr;
	}
	public void setWhNoArr(String whNoArr) {
		this.whNoArr = whNoArr;
	}
	public String getWhDateType() {
		return whDateType;
	}
	public void setWhDateType(String whDateType) {
		this.whDateType = whDateType;
	}
	public String getWhSeqArr() {
		return whSeqArr;
	}
	public void setWhSeqArr(String whSeqArr) {
		this.whSeqArr = whSeqArr;
	}
	public String getPlaceRlYmd() {
		return placeRlYmd;
	}
	public void setPlaceRlYmd(String placeRlYmd) {
		this.placeRlYmd = placeRlYmd;
	}
	public String getBranchCode() {
		return branchCode;
	}
	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}
	public ArrayList<WhItem> getWhItemAdd() {
		return whItemAdd;
	}
	public void setWhItemAdd(ArrayList<WhItem> whItemAdd) {
		this.whItemAdd = whItemAdd;
	}
	public ArrayList<WhItem> getWhItemUpdate() {
		return whItemUpdate;
	}
	public void setWhItemUpdate(ArrayList<WhItem> whItemUpdate) {
		this.whItemUpdate = whItemUpdate;
	}
	public ArrayList<WhItem> getWhItemRemove() {
		return whItemRemove;
	}
	public void setWhItemRemove(ArrayList<WhItem> whItemRemove) {
		this.whItemRemove = whItemRemove;
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
	@Override
	public String toString() {
		return "Wh [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg=" + db_resultMsg
				+ ", comCode=" + comCode + ", whNo=" + whNo + ", custCode=" + custCode + ", whYmd=" + whYmd
				+ ", custOrderNo=" + custOrderNo + ", memo1=" + memo1 + ", price=" + price + ", taxPrice=" + taxPrice
				+ ", sumPrice=" + sumPrice + ", regUserId=" + regUserId + ", regYmd=" + regYmd + ", regHms=" + regHms
				+ ", uptUserId=" + uptUserId + ", uptYmd=" + uptYmd + ", uptHms=" + uptHms + ", itemCnt=" + itemCnt
				+ ", cnt=" + cnt + ", custName=" + custName + ", payYmd=" + payYmd + ", storageCode=" + storageCode
				+ ", storageName=" + storageName + ", payStatus=" + payStatus + ", payAmt=" + payAmt + ", rackCode="
				+ rackCode + ", rackName=" + rackName + ", wdNo=" + wdNo + ", regUserName=" + regUserName
				+ ", wdReqStatus=" + wdReqStatus + ", placeNoArr=" + placeNoArr + ", placeSeqArr=" + placeSeqArr
				+ ", buyChk=" + buyChk + ", buyChkDate=" + buyChkDate + ", buyChkUserId=" + buyChkUserId + ", whNoArr="
				+ whNoArr + ", whDateType=" + whDateType + ", whSeqArr=" + whSeqArr + ", placeRlYmd=" + placeRlYmd
				+ ", branchCode=" + branchCode + ", whItemAdd=" + whItemAdd + ", whItemUpdate=" + whItemUpdate
				+ ", whItemRemove=" + whItemRemove + ", whUnitPriceArr=" + whUnitPriceArr + ", whCntArr=" + whCntArr
				+ "]";
	}
	

	
	
	
	
}

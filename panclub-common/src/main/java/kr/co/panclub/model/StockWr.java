package kr.co.panclub.model;

import java.util.ArrayList;
import java.util.Date;

public class StockWr {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String wrType;             //  --입출고유형
	private String orderGroupId;             //   --주문관리id
	private String whNo;             //   --입고번호
	private String plCustCode;             //   --발주처코드
	private String plCustName;             //  --발주처명
	private String storUseReqNo;             //   --창고사용요청번호
	private String suCustCode;             //   --납품처코드
	private String suCustName;             //  --납품처명
	private int whQty;             //  --입고수량
	private int rlQty;             //  --출고수량
	private String rackCode;             //  --랙위치코드
	private String rackName;             //  --랙위치명
	private int stockQty;             //   --재고
	private String regYmd;             //   --발생일
	
	private String itemNo;
	private String itemName;
	private String itemNameEn;
	
	private long itemId;
	private String stockYm;
	private String storCode;
	
	//수정입출고처리.위해 추가 2023.09.01 hsg .
	private String wrNo;
	private String wrYmd;
	private String bizType;
	private String consignCustCode;
	private String consignCustName;
	private int qty;
	private String uptUserId;
	private String uptUserName;
	private Date modified;
	private String memo1;
	private int wrSeq; // 수동입출고 페이지에서 바코드 스캔시 해당 순번 체크박스 표시를 위해 생성
	private String regUserName; // 수동입출고페이지의 작성자 표시를 위한 변수 마스터 테이블의 수정자 이름
	
	//2024.05.30 supi -수동입출고 내역에 필요한 속성 추가
	private int itemCount; // 수동입출고 내역 - 품목수
	private int itemChkCount;//  처리된 품목수
	private int itemMemoCount; // 메모작성된 품목수
	private String wrState;  // 처리상태
	private String consignComCode; // 품목정리시 위탁업체 코드
	private String consignComName; // ''  위탁업체이름
	
	// 추가 행 리스트
	private ArrayList<StockWrItem> stockWrItemAdd;
	// 수정 행 리스트
	private ArrayList<StockWrItem> stockWrItemUpdate;
	// 삭제 행 리스트
	private ArrayList<StockWrItem> stockWrItemRemove;
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
	public String getWrType() {
		return wrType;
	}
	public void setWrType(String wrType) {
		this.wrType = wrType;
	}
	public String getOrderGroupId() {
		return orderGroupId;
	}
	public void setOrderGroupId(String orderGroupId) {
		this.orderGroupId = orderGroupId;
	}
	public String getWhNo() {
		return whNo;
	}
	public void setWhNo(String whNo) {
		this.whNo = whNo;
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
	public String getStorUseReqNo() {
		return storUseReqNo;
	}
	public void setStorUseReqNo(String storUseReqNo) {
		this.storUseReqNo = storUseReqNo;
	}
	public String getSuCustCode() {
		return suCustCode;
	}
	public void setSuCustCode(String suCustCode) {
		this.suCustCode = suCustCode;
	}
	public String getSuCustName() {
		return suCustName;
	}
	public void setSuCustName(String suCustName) {
		this.suCustName = suCustName;
	}
	public int getWhQty() {
		return whQty;
	}
	public void setWhQty(int whQty) {
		this.whQty = whQty;
	}
	public int getRlQty() {
		return rlQty;
	}
	public void setRlQty(int rlQty) {
		this.rlQty = rlQty;
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
	public int getStockQty() {
		return stockQty;
	}
	public void setStockQty(int stockQty) {
		this.stockQty = stockQty;
	}
	public String getRegYmd() {
		return regYmd;
	}
	public void setRegYmd(String regYmd) {
		this.regYmd = regYmd;
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
	public long getItemId() {
		return itemId;
	}
	public void setItemId(long itemId) {
		this.itemId = itemId;
	}
	public String getStockYm() {
		return stockYm;
	}
	public void setStockYm(String stockYm) {
		this.stockYm = stockYm;
	}
	public String getStorCode() {
		return storCode;
	}
	public void setStorCode(String storCode) {
		this.storCode = storCode;
	}
	public String getWrNo() {
		return wrNo;
	}
	public void setWrNo(String wrNo) {
		this.wrNo = wrNo;
	}
	public String getWrYmd() {
		return wrYmd;
	}
	public void setWrYmd(String wrYmd) {
		this.wrYmd = wrYmd;
	}
	public String getBizType() {
		return bizType;
	}
	public void setBizType(String bizType) {
		this.bizType = bizType;
	}
	public String getConsignCustCode() {
		return consignCustCode;
	}
	public void setConsignCustCode(String consignCustCode) {
		this.consignCustCode = consignCustCode;
	}
	public String getConsignCustName() {
		return consignCustName;
	}
	public void setConsignCustName(String consignCustName) {
		this.consignCustName = consignCustName;
	}
	public int getQty() {
		return qty;
	}
	public void setQty(int qty) {
		this.qty = qty;
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
	public Date getModified() {
		return modified;
	}
	public void setModified(Date modified) {
		this.modified = modified;
	}
	public String getMemo1() {
		return memo1;
	}
	public void setMemo1(String memo1) {
		this.memo1 = memo1;
	}
	public ArrayList<StockWrItem> getStockWrItemAdd() {
		return stockWrItemAdd;
	}
	public void setStockWrItemAdd(ArrayList<StockWrItem> stockWrItemAdd) {
		this.stockWrItemAdd = stockWrItemAdd;
	}
	public ArrayList<StockWrItem> getStockWrItemUpdate() {
		return stockWrItemUpdate;
	}
	public void setStockWrItemUpdate(ArrayList<StockWrItem> stockWrItemUpdate) {
		this.stockWrItemUpdate = stockWrItemUpdate;
	}
	public ArrayList<StockWrItem> getStockWrItemRemove() {
		return stockWrItemRemove;
	}
	public void setStockWrItemRemove(ArrayList<StockWrItem> stockWrItemRemove) {
		this.stockWrItemRemove = stockWrItemRemove;
	}
	public int getWrSeq() {
		return wrSeq;
	}
	public void setWrSeq(int wrSeq) {
		this.wrSeq = wrSeq;
	}
	public String getRegUserName() {
		return regUserName;
	}
	public void setRegUserName(String regUserName) {
		this.regUserName = regUserName;
	}
	public int getItemCount() {
		return itemCount;
	}
	public void setItemCount(int itemCount) {
		this.itemCount = itemCount;
	}
	public int getItemChkCount() {
		return itemChkCount;
	}
	public void setItemChkCount(int itemChkCount) {
		this.itemChkCount = itemChkCount;
	}
	public int getItemMemoCount() {
		return itemMemoCount;
	}
	public void setItemMemoCount(int itemMemoCount) {
		this.itemMemoCount = itemMemoCount;
	}
	public String getWrState() {
		return wrState;
	}
	public void setWrState(String wrState) {
		this.wrState = wrState;
	}
	public String getConsignComCode() {
		return consignComCode;
	}
	public void setConsignComCode(String consignComCode) {
		this.consignComCode = consignComCode;
	}
	public String getConsignComName() {
		return consignComName;
	}
	public void setConsignComName(String consignComName) {
		this.consignComName = consignComName;
	}
	@Override
	public String toString() {
		return "StockWr [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", wrType=" + wrType + ", orderGroupId=" + orderGroupId
				+ ", whNo=" + whNo + ", plCustCode=" + plCustCode + ", plCustName=" + plCustName + ", storUseReqNo="
				+ storUseReqNo + ", suCustCode=" + suCustCode + ", suCustName=" + suCustName + ", whQty=" + whQty
				+ ", rlQty=" + rlQty + ", rackCode=" + rackCode + ", rackName=" + rackName + ", stockQty=" + stockQty
				+ ", regYmd=" + regYmd + ", itemNo=" + itemNo + ", itemName=" + itemName + ", itemNameEn=" + itemNameEn
				+ ", itemId=" + itemId + ", stockYm=" + stockYm + ", storCode=" + storCode + ", wrNo=" + wrNo
				+ ", wrYmd=" + wrYmd + ", bizType=" + bizType + ", consignCustCode=" + consignCustCode
				+ ", consignCustName=" + consignCustName + ", qty=" + qty + ", uptUserId=" + uptUserId
				+ ", uptUserName=" + uptUserName + ", modified=" + modified + ", memo1=" + memo1 + ", wrSeq=" + wrSeq
				+ ", regUserName=" + regUserName + ", itemCount=" + itemCount + ", itemChkCount=" + itemChkCount
				+ ", itemMemoCount=" + itemMemoCount + ", wrState=" + wrState + ", consignComCode=" + consignComCode
				+ ", consignComName=" + consignComName + ", stockWrItemAdd=" + stockWrItemAdd + ", stockWrItemUpdate="
				+ stockWrItemUpdate + ", stockWrItemRemove=" + stockWrItemRemove + "]";
	}
	

	
	
}

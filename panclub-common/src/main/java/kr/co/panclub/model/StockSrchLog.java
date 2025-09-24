package kr.co.panclub.model;

public class StockSrchLog {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private String comCode;
	private String comName;
	private String userId;
	private String multiYN;
	private String itemId;
	private String itemNo;
	private String itemName;
	private String makerCode;
	private String origin;
	private String created;
	
	private int allSrchCnt;  //전체검색수
	private int exSrchCnt;   //외부업체검색수
	private int allCustQty;  //전체검색업체수 
	private int exCustQty;   //외부검색업체수
	private int totalRank;   //전체검색수순위
	private int custRank;    //외부업체검색수순위
	
	
	//2024.08.02 hsg 
	private String firstSrchYmd;  //최초검색일
	private String lastSrchYmd;   //마지막검색일
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
	public String getComName() {
		return comName;
	}
	public void setComName(String comName) {
		this.comName = comName;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getMultiYN() {
		return multiYN;
	}
	public void setMultiYN(String multiYN) {
		this.multiYN = multiYN;
	}
	public String getItemId() {
		return itemId;
	}
	public void setItemId(String itemId) {
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
	public String getMakerCode() {
		return makerCode;
	}
	public void setMakerCode(String makerCode) {
		this.makerCode = makerCode;
	}
	public String getOrigin() {
		return origin;
	}
	public void setOrigin(String origin) {
		this.origin = origin;
	}
	public String getCreated() {
		return created;
	}
	public void setCreated(String created) {
		this.created = created;
	}
	public int getAllSrchCnt() {
		return allSrchCnt;
	}
	public void setAllSrchCnt(int allSrchCnt) {
		this.allSrchCnt = allSrchCnt;
	}
	public int getExSrchCnt() {
		return exSrchCnt;
	}
	public void setExSrchCnt(int exSrchCnt) {
		this.exSrchCnt = exSrchCnt;
	}
	public int getAllCustQty() {
		return allCustQty;
	}
	public void setAllCustQty(int allCustQty) {
		this.allCustQty = allCustQty;
	}
	public int getExCustQty() {
		return exCustQty;
	}
	public void setExCustQty(int exCustQty) {
		this.exCustQty = exCustQty;
	}
	public int getTotalRank() {
		return totalRank;
	}
	public void setTotalRank(int totalRank) {
		this.totalRank = totalRank;
	}
	public int getCustRank() {
		return custRank;
	}
	public void setCustRank(int custRank) {
		this.custRank = custRank;
	}
	public String getFirstSrchYmd() {
		return firstSrchYmd;
	}
	public void setFirstSrchYmd(String firstSrchYmd) {
		this.firstSrchYmd = firstSrchYmd;
	}
	public String getLastSrchYmd() {
		return lastSrchYmd;
	}
	public void setLastSrchYmd(String lastSrchYmd) {
		this.lastSrchYmd = lastSrchYmd;
	}
	@Override
	public String toString() {
		return "StockSrchLog [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", comCode=" + comCode + ", comName=" + comName + ", userId=" + userId + ", multiYN="
				+ multiYN + ", itemId=" + itemId + ", itemNo=" + itemNo + ", itemName=" + itemName + ", makerCode="
				+ makerCode + ", origin=" + origin + ", created=" + created + ", allSrchCnt=" + allSrchCnt
				+ ", exSrchCnt=" + exSrchCnt + ", allCustQty=" + allCustQty + ", exCustQty=" + exCustQty
				+ ", totalRank=" + totalRank + ", custRank=" + custRank + ", firstSrchYmd=" + firstSrchYmd
				+ ", lastSrchYmd=" + lastSrchYmd + "]";
	} 
	

	
	

	
}

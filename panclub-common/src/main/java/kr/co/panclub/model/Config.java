package kr.co.panclub.model;

public class Config {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;
	
	private int idx;
	private String comCode;
	private String partsmallCustCode;   //  --재고확인에 나오는 파츠몰의 거래처코드
	private String glozenCustCode;    
	private String hallaCustCode;
	private String skCustCode;
	private String dekoCustCode;
	private String eapsCustCode;
	private String partsmallCustName;
	private String glozenCustName;    
	private String hallaCustName;
	private String skCustName;
	private String dekoCustName;
	private String eapsCustName;
	
	private float cCustRate;  //수탁업체 기본매입율 2023.11.01
	private float saleDcRate; // 센터가 기준일 경우 할인율
	private float saleMarginRate;  // 매입가 기준일 경우 마진율
	private String stockConsignCustCode; // 맡긴 위탁부품을 판매해주는 업체코드
	private String stockConsignCustName; // 맡긴 위탁부품을 판매해주는 업체명
	
	private String orderReqCustCode; // 주문연동 설정 업체 코드
	private String orderReqCustName; // 주문연동 설정 업체 이름
	
	private String childComCodeStr; //관리중인 회사 유효성 변경을 위한 변수

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

	public int getIdx() {
		return idx;
	}

	public void setIdx(int idx) {
		this.idx = idx;
	}

	public String getComCode() {
		return comCode;
	}

	public void setComCode(String comCode) {
		this.comCode = comCode;
	}

	public String getPartsmallCustCode() {
		return partsmallCustCode;
	}

	public void setPartsmallCustCode(String partsmallCustCode) {
		this.partsmallCustCode = partsmallCustCode;
	}

	public String getGlozenCustCode() {
		return glozenCustCode;
	}

	public void setGlozenCustCode(String glozenCustCode) {
		this.glozenCustCode = glozenCustCode;
	}

	public String getHallaCustCode() {
		return hallaCustCode;
	}

	public void setHallaCustCode(String hallaCustCode) {
		this.hallaCustCode = hallaCustCode;
	}

	public String getSkCustCode() {
		return skCustCode;
	}

	public void setSkCustCode(String skCustCode) {
		this.skCustCode = skCustCode;
	}

	public String getDekoCustCode() {
		return dekoCustCode;
	}

	public void setDekoCustCode(String dekoCustCode) {
		this.dekoCustCode = dekoCustCode;
	}

	public String getEapsCustCode() {
		return eapsCustCode;
	}

	public void setEapsCustCode(String eapsCustCode) {
		this.eapsCustCode = eapsCustCode;
	}

	public String getPartsmallCustName() {
		return partsmallCustName;
	}

	public void setPartsmallCustName(String partsmallCustName) {
		this.partsmallCustName = partsmallCustName;
	}

	public String getGlozenCustName() {
		return glozenCustName;
	}

	public void setGlozenCustName(String glozenCustName) {
		this.glozenCustName = glozenCustName;
	}

	public String getHallaCustName() {
		return hallaCustName;
	}

	public void setHallaCustName(String hallaCustName) {
		this.hallaCustName = hallaCustName;
	}

	public String getSkCustName() {
		return skCustName;
	}

	public void setSkCustName(String skCustName) {
		this.skCustName = skCustName;
	}

	public String getDekoCustName() {
		return dekoCustName;
	}

	public void setDekoCustName(String dekoCustName) {
		this.dekoCustName = dekoCustName;
	}

	public String getEapsCustName() {
		return eapsCustName;
	}

	public void setEapsCustName(String eapsCustName) {
		this.eapsCustName = eapsCustName;
	}

	public float getcCustRate() {
		return cCustRate;
	}

	public void setcCustRate(float cCustRate) {
		this.cCustRate = cCustRate;
	}

	public float getSaleDcRate() {
		return saleDcRate;
	}

	public void setSaleDcRate(float saleDcRate) {
		this.saleDcRate = saleDcRate;
	}

	public float getSaleMarginRate() {
		return saleMarginRate;
	}

	public void setSaleMarginRate(float saleMarginRate) {
		this.saleMarginRate = saleMarginRate;
	}

	public String getStockConsignCustCode() {
		return stockConsignCustCode;
	}

	public void setStockConsignCustCode(String stockConsignCustCode) {
		this.stockConsignCustCode = stockConsignCustCode;
	}

	public String getStockConsignCustName() {
		return stockConsignCustName;
	}

	public void setStockConsignCustName(String stockConsignCustName) {
		this.stockConsignCustName = stockConsignCustName;
	}

	public String getChildComCodeStr() {
		return childComCodeStr;
	}

	public void setChildComCodeStr(String childComCodeStr) {
		this.childComCodeStr = childComCodeStr;
	}

	public String getOrderReqCustCode() {
		return orderReqCustCode;
	}

	public void setOrderReqCustCode(String orderReqCustCode) {
		this.orderReqCustCode = orderReqCustCode;
	}

	public String getOrderReqCustName() {
		return orderReqCustName;
	}

	public void setOrderReqCustName(String orderReqCustName) {
		this.orderReqCustName = orderReqCustName;
	}

	@Override
	public String toString() {
		return "Config [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", idx=" + idx + ", comCode=" + comCode + ", partsmallCustCode=" + partsmallCustCode
				+ ", glozenCustCode=" + glozenCustCode + ", hallaCustCode=" + hallaCustCode + ", skCustCode="
				+ skCustCode + ", dekoCustCode=" + dekoCustCode + ", eapsCustCode=" + eapsCustCode
				+ ", partsmallCustName=" + partsmallCustName + ", glozenCustName=" + glozenCustName + ", hallaCustName="
				+ hallaCustName + ", skCustName=" + skCustName + ", dekoCustName=" + dekoCustName + ", eapsCustName="
				+ eapsCustName + ", cCustRate=" + cCustRate + ", saleDcRate=" + saleDcRate + ", saleMarginRate="
				+ saleMarginRate + ", stockConsignCustCode=" + stockConsignCustCode + ", stockConsignCustName="
				+ stockConsignCustName + ", orderReqCustCode=" + orderReqCustCode + ", orderReqCustName="
				+ orderReqCustName + ", childComCodeStr=" + childComCodeStr + "]";
	}

	
}

package kr.co.panclub.model;

public class OrderExcel {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;

	private String xls_itemNo;           // 품명
	private String xls_qty;           // 수량
	private String xls_unitPrice;           // 단가
	private String xls_memo;           //   --비고
	private String xls_placeCustCode;           //   발주처코드
	private String xls_placeUnitPrice;           //  --발주단가
	private int xls_sRow;           //  --시작row
	private String connectYN;           //   --이어붙이기
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
	public String getXls_itemNo() {
		return xls_itemNo;
	}
	public void setXls_itemNo(String xls_itemNo) {
		this.xls_itemNo = xls_itemNo;
	}
	public String getXls_qty() {
		return xls_qty;
	}
	public void setXls_qty(String xls_qty) {
		this.xls_qty = xls_qty;
	}
	public String getXls_unitPrice() {
		return xls_unitPrice;
	}
	public void setXls_unitPrice(String xls_unitPrice) {
		this.xls_unitPrice = xls_unitPrice;
	}
	public String getXls_memo() {
		return xls_memo;
	}
	public void setXls_memo(String xls_memo) {
		this.xls_memo = xls_memo;
	}
	public String getXls_placeCustCode() {
		return xls_placeCustCode;
	}
	public void setXls_placeCustCode(String xls_placeCustCode) {
		this.xls_placeCustCode = xls_placeCustCode;
	}
	public String getXls_placeUnitPrice() {
		return xls_placeUnitPrice;
	}
	public void setXls_placeUnitPrice(String xls_placeUnitPrice) {
		this.xls_placeUnitPrice = xls_placeUnitPrice;
	}
	public int getXls_sRow() {
		return xls_sRow;
	}
	public void setXls_sRow(int xls_sRow) {
		this.xls_sRow = xls_sRow;
	}
	public String getConnectYN() {
		return connectYN;
	}
	public void setConnectYN(String connectYN) {
		this.connectYN = connectYN;
	}
	@Override
	public String toString() {
		return "EstiExcel [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", xls_itemNo=" + xls_itemNo + ", xls_qty=" + xls_qty + ", xls_unitPrice="
				+ xls_unitPrice + ", xls_memo=" + xls_memo + ", xls_placeCustCode=" + xls_placeCustCode
				+ ", xls_placeUnitPrice=" + xls_placeUnitPrice + ", xls_sRow=" + xls_sRow + ", connectYN=" + connectYN
				+ "]";
	}
	

	
	
	
}

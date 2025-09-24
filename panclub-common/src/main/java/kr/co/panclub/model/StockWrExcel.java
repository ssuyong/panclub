package kr.co.panclub.model;

public class StockWrExcel {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;

	private String xls_itemNo;           // 품명
	private String xls_qty;           // 수량
	private String xls_memo;           //   --비고
	private String xls_rackCode;           //   랙코드
	private String xls_moveRackCode;           //  --이동랙코드
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
	public String getXls_memo() {
		return xls_memo;
	}
	public void setXls_memo(String xls_memo) {
		this.xls_memo = xls_memo;
	}
	public String getXls_rackCode() {
		return xls_rackCode;
	}
	public void setXls_rackCode(String xls_rackCode) {
		this.xls_rackCode = xls_rackCode;
	}
	public String getXls_moveRackCode() {
		return xls_moveRackCode;
	}
	public void setXls_moveRackCode(String xls_moveRackCode) {
		this.xls_moveRackCode = xls_moveRackCode;
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
		return "StockWrExcel [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", xls_itemNo=" + xls_itemNo + ", xls_qty=" + xls_qty + ", xls_memo=" + xls_memo
				+ ", xls_rackCode=" + xls_rackCode + ", xls_moveRackCode=" + xls_moveRackCode + ", xls_sRow=" + xls_sRow
				+ ", connectYN=" + connectYN + "]";
	}

	
	

	
	

	
	
	
}

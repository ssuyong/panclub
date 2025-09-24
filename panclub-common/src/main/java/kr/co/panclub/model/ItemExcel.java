package kr.co.panclub.model;

public class ItemExcel {
	private String workingType;
	private String db_resultCode;
	private String db_resultMsg;

	private String xls_itemNo;  		         
	private String xls_itemName;           
	private String xls_centerPrice;   	//센터가      
	private String xls_makerCode;		//제조사     
	private String xls_classCode;           
	private int xls_sRow;           //  --시작row
	
	
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
	public String getXls_itemName() {
		return xls_itemName;
	}
	public void setXls_itemName(String xls_itemName) {
		this.xls_itemName = xls_itemName;
	}
	public String getXls_centerPrice() {
		return xls_centerPrice;
	}
	public void setXls_centerPrice(String xls_centerPrice) {
		this.xls_centerPrice = xls_centerPrice;
	}
	public String getXls_makerCode() {
		return xls_makerCode;
	}
	public void setXls_makerCode(String xls_makerCode) {
		this.xls_makerCode = xls_makerCode;
	}
	public String getXls_classCode() {
		return xls_classCode;
	}
	public void setXls_classCode(String xls_classCode) {
		this.xls_classCode = xls_classCode;
	}
	public int getXls_sRow() {
		return xls_sRow;
	}
	public void setXls_sRow(int xls_sRow) {
		this.xls_sRow = xls_sRow;
	}
	@Override
	public String toString() {
		return "ItemExcel [workingType=" + workingType + ", db_resultCode=" + db_resultCode + ", db_resultMsg="
				+ db_resultMsg + ", xls_itemNo=" + xls_itemNo + ", xls_itemName=" + xls_itemName + ", xls_centerPrice="
				+ xls_centerPrice + ", xls_makerCode=" + xls_makerCode + ", xls_classCode=" + xls_classCode
				+ ", xls_sRow=" + xls_sRow + "]";
	}
	
	
	
	
	
	
	
	
}

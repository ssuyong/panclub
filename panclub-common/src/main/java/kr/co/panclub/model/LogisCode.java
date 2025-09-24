package kr.co.panclub.model;

public class LogisCode {  // 수령물류센터 코드를 담기위한 모델
	
	private String code;  //코드
	private String codeName; //코드명
	private int codeOrderBy; //정렬순서
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getCodeName() {
		return codeName;
	}
	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}
	public int getCodeOrderBy() {
		return codeOrderBy;
	}
	public void setCodeOrderBy(int codeOrderBy) {
		this.codeOrderBy = codeOrderBy;
	}
	@Override
	public String toString() {
		return "LogisCode [code=" + code + ", codeName=" + codeName + ", codeOrderBy=" + codeOrderBy + "]";
	}
	
	
}

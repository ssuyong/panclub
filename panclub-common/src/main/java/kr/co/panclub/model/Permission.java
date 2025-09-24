package kr.co.panclub.model;

public class Permission {
	private int idx;  // 권한 id (기본키)
	private String code; // 권한 코드(메뉴코드) (유니크)
	private String name; // 권한명
	private String type; // 권한 타입 (접근, 기능)
	private String url; // 접근 권한의 경우 url
	private boolean hiddenMenu; // 접근권한의 경우 이 값이 true일때 권한이 없으면 메뉴바에서 안보이게 됨
	private boolean valid; // 권한의 유효성
	private String memo; // 메모
	private boolean templateValid; //템플릿의 유효성
	
	private int pccCount; // 권한을 가진 업체수
	private int puCount; // 권한을 가진 사용자수(자신의 업체내)
	private String modified; 
	
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public boolean isHiddenMenu() {
		return hiddenMenu;
	}
	public void setHiddenMenu(boolean hiddenMenu) {
		this.hiddenMenu = hiddenMenu;
	}
	public boolean isValid() {
		return valid;
	}
	public void setValid(boolean valid) {
		this.valid = valid;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public boolean isTemplateValid() {
		return templateValid;
	}
	public void setTemplateValid(boolean templateValid) {
		this.templateValid = templateValid;
	}
	public int getPccCount() {
		return pccCount;
	}
	public void setPccCount(int pccCount) {
		this.pccCount = pccCount;
	}
	public int getPuCount() {
		return puCount;
	}
	public void setPuCount(int puCount) {
		this.puCount = puCount;
	}
	public String getModified() {
		return modified;
	}
	public void setModified(String modified) {
		this.modified = modified;
	}
	@Override
	public String toString() {
		return "Permission [idx=" + idx + ", code=" + code + ", name=" + name + ", type=" + type + ", url=" + url
				+ ", hiddenMenu=" + hiddenMenu + ", valid=" + valid + ", memo=" + memo + ", templateValid="
				+ templateValid + ", pccCount=" + pccCount + ", puCount=" + puCount + ", modified=" + modified + "]";
	}
	
}

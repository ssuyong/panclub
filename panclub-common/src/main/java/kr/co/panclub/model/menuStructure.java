package kr.co.panclub.model;

public class menuStructure {
	private int idx; //메뉴구조 인덱스
	private String menuName; //메뉴상 노출되는 이름
	private int permissionIdx; // 권한인덱스
	private int parentMenuIdx; // 상위메뉴인덱스(null일경우 rootMenu)
	private int seq;  //순번 낮을수록 좌측 상단
	private String permissionName;
	private String permissionCode;
	private String url; // 권한테이블에서 받아오는 url
	private boolean hiddenMenu; // 권한이 없을경우 숨겨지는 메뉴인지 여부
	private boolean valid; // 메뉴 자체의 유효성 false일경우 권한이 있더라도 안보임
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
	}
	public String getMenuName() {
		return menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	public int getPermissionIdx() {
		return permissionIdx;
	}
	public void setPermissionIdx(int permissionIdx) {
		this.permissionIdx = permissionIdx;
	}
	public int getParentMenuIdx() {
		return parentMenuIdx;
	}
	public void setParentMenuIdx(int parentMenuIdx) {
		this.parentMenuIdx = parentMenuIdx;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getPermissionName() {
		return permissionName;
	}
	public void setPermissionName(String permissionName) {
		this.permissionName = permissionName;
	}
	public String getPermissionCode() {
		return permissionCode;
	}
	public void setPermissionCode(String permissionCode) {
		this.permissionCode = permissionCode;
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
	@Override
	public String toString() {
		return "menuStructure [idx=" + idx + ", menuName=" + menuName + ", permissionIdx=" + permissionIdx
				+ ", parentMenuIdx=" + parentMenuIdx + ", seq=" + seq + ", permissionName=" + permissionName
				+ ", permissionCode=" + permissionCode + ", url=" + url + ", hiddenMenu=" + hiddenMenu + ", valid="
				+ valid + "]";
	}
	
}

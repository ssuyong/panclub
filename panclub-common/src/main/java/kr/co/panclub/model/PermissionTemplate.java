package kr.co.panclub.model;

public class PermissionTemplate {
	private int idx;
	private String name;
	private String memo;
	private int permissionCount;
	private String templateType; // 업체 or 유저
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public int getPermissionCount() {
		return permissionCount;
	}
	public void setPermissionCount(int permissionCount) {
		this.permissionCount = permissionCount;
	}
	public String getTemplateType() {
		return templateType;
	}
	public void setTemplateType(String templateType) {
		this.templateType = templateType;
	}
	@Override
	public String toString() {
		return "PermissionTemplate [idx=" + idx + ", name=" + name + ", memo=" + memo + ", permissionCount="
				+ permissionCount + ", templateType=" + templateType + "]";
	}
	
	
	
}

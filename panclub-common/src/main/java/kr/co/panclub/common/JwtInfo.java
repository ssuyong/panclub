package kr.co.panclub.common;

//토큰에 대한 정적 정보 저장용 클래스
public class JwtInfo {
	//토큰 시크릿키 , 리플래시 키 
	public static final String JWT_ACCESS_SECRET_KEY = "t4jETbRH2IAtyuUJ32F99oZcLYf+UGIfkdY0wgR+UJk=";
	public static final String JWT_REFRESH_SECRET_KEY = "vrqbnOlPdGZhGbuI3ER1jF1stpEAJaKWNYNggdq2JTM=";
	
	//액서스키 유효기간 1시간 (밀리세컨드)
	public static final long JWT_ACCESS_EXPIRED = 3600000;
	//액서스키 유효기간 (초)
	public static final int JWT_ACCESS_EXPIRED_SECOND = 3600;  
	//리플래시키 유효기간 12시간 (밀리세컨드)
	public static final long JWT_REFRESH_EXPIRED = 43200000;
	//리플래시키 유효기간(초)
	public static final int JWT_REFRESH_EXPIRED_SECOND = 43200;
	
	
}

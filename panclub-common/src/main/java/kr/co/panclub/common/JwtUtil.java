package kr.co.panclub.common;

import java.util.Base64;
import java.util.Date;

import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

@Component
public class JwtUtil {

    private final SecretKey accessKey; // 액서스 암호키
    private final Long accessExpired;
    private final SecretKey refreshKey; // 리플래시 암호키
    private final Long refreshExpired;
  
    @Autowired
	private HttpServletRequest request;

    public JwtUtil() {
        accessKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(JwtInfo.JWT_ACCESS_SECRET_KEY));
        refreshKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(JwtInfo.JWT_REFRESH_SECRET_KEY));
        accessExpired = JwtInfo.JWT_ACCESS_EXPIRED;
        refreshExpired = JwtInfo.JWT_REFRESH_EXPIRED;
    }

    // 암호키 생성(신규 암호키가 필요할경우만)
    public String hs256KeyGen() {
        SecretKey secretkey = Jwts.SIG.HS256.key().build();
        String hs256key = Base64.getEncoder().encodeToString(secretkey.getEncoded());
        return hs256key;
    }

    public String genJwtToken(SecretKey key, Long expired, String comCode,String comName, String userId ,String userName, String ip) {
    	 
        String jwt = Jwts.builder()
                .issuer(request.getServerName())
                .subject("Jwt")
                .claim("userId", userId)
                .claim("userName", userName)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expired))
                .claim("comCode", comCode)
                .claim("comName", comName)
                .claim("pk", SHA256Util.getSha256(ip)) //ip정보는 암호화해서 비교
                .signWith(key).compact();

        return jwt;
    }

    // 액세스 토큰 발행
    public String genAccessJwt(String comCode,String comName,  String userId,String userName , String ip) {
        return genJwtToken(accessKey, accessExpired, comCode,comName,  userId,userName ,ip);
    }

    // 리프레시 토큰 발행
    public String genRefreshJwt(String comCode,String comName,  String userId,String userName , String ip)  {

        return genJwtToken(refreshKey, refreshExpired, comCode,comName,  userId,userName ,ip);
    }

    // 토큰 데이터 가져오는 메소드
    public Claims getTokenData(SecretKey key, String jwtToken) {
        try {
            if (isTokenExpired(key, jwtToken))
                return null;
            return Jwts.parser().verifyWith(key).build()
                    .parseSignedClaims(jwtToken).getPayload();
        } catch (Exception e) {
            return null;
        }
    }

    //토큰 파싱
    public Claims getDataAccessToken(String jwtToken) {
        return getTokenData(accessKey, jwtToken);
    }

    public Claims getDataRefreshToken(String jwtToken) {
        return getTokenData(refreshKey, jwtToken);
    }

    // 토큰 만료 확인하는 메소드 true면 만료
    public boolean isTokenExpired(SecretKey key, String jwtToken) {
        try {
            Claims claims = Jwts.parser().verifyWith(key).build()
                    .parseSignedClaims(jwtToken).getPayload();

            return claims.getExpiration().before(new Date());
        } catch (SignatureException | ExpiredJwtException e) {
            // 토큰 만료
            return true;
        } catch (Exception e) {
            return true;
        }
    }

    public boolean isAccessTokenExpired(String jwtToken) {
        return isTokenExpired(accessKey, jwtToken);
    }

    public boolean isRefreshTokenExpired(String jwtToken) {
        return isTokenExpired(refreshKey, jwtToken);
    }

}
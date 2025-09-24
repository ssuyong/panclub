package kr.co.panclub.common;

import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.util.Base64;


public class SHA256Util {

	public static String getSha256(String inputVal) {
		inputVal = inputVal + code.SHA256_key;
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			byte[] hash = digest.digest(inputVal.getBytes("UTF-8"));
			StringBuffer output = new StringBuffer();

			for (int i = 0; i < hash.length; i++) {
				String hex = Integer.toHexString(0xff & hash[i]);
				if (hex.length() == 1)
					output.append('0');
				output.append(hex);
			}

			return output.toString();
		} catch (Exception ex) {
			return "";
		}
	}
	
	public static String getSha512(String inputVal) {
		//inputVal = inputVal + code.SHA512_key;
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-512");
			byte[] hash = digest.digest(inputVal.getBytes("UTF-8"));
			StringBuffer output = new StringBuffer();

			for (int i = 0; i < hash.length; i++) {
				String hex = Integer.toHexString(0xff & hash[i]);
				if (hex.length() == 1)
					output.append('0');
				output.append(hex);
			}

			return output.toString();
		} catch (Exception ex) {
			ex.printStackTrace();
			return "";
		}
	}
	
	public static String getSha512Base64(String plainText) {

//		    MessageDigest md = MessageDigest.getInstance( "SHA-512" );
//		    md.update( inbytes );
//		    byte[] aMessageDigest = md.digest();
//
//		    String outEncoded = Base64.getEncoder().encodeToString( aMessageDigest );
//		    return( outEncoded );
//		    
		    
	        try {

	            MessageDigest md = MessageDigest.getInstance("SHA-512");

	            byte[] bytes = plainText.getBytes(Charset.forName("UTF-8"));

	            md.update(bytes);

	            byte[] aMessageDigest = md.digest();

			    String outEncoded = Base64.getEncoder().encodeToString( aMessageDigest );
			    
	            //Encoder encoder = Base64.getEncoder();
	           // String hash = encoder.encodeToString(bytes);
	            //return Base64.encode(md.digest());
	            return outEncoded;

	        } catch (Exception e) {

	           

	            e.printStackTrace();

	            return null;

	        }

	    }

		
	
}

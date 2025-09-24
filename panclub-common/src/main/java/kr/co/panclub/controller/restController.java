package kr.co.panclub.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import kong.unirest.json.JSONArray;
import kong.unirest.json.JSONObject;
import kr.co.panclub.model.TaxBill;
import kr.co.panclub.model.TaxContact;
import kr.co.panclub.model.TaxInformation;
import kr.co.panclub.model.TaxInvoice;
import kr.co.panclub.model.TaxInvoiceType;
import kr.co.panclub.model.TaxInvoicee;
import kr.co.panclub.model.TaxItem;
import kr.co.panclub.service.IBaseService;

@RestController
@RequestMapping("/rest/*")
public class restController {

	@Autowired
	private HttpSession session;

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private IBaseService baseService;
	
	@RequestMapping(value = "/taxBillSend", method = RequestMethod.POST)
	public HashMap<String, Object> taxBillSend(@RequestBody TaxBill taxBillSet) {
		//System.out.println("taxBillSet : " + taxBillSet);
		String taxBillNo = taxBillSet.getCheckedList().get(0).getTaxBillNo();
		String stringDate = taxBillSet.getCheckedList().get(0).getTaxBillDate();
		String[] dateParts = stringDate.split("-");
		String year = dateParts[0];
		String month = dateParts[1];
		String date = dateParts[2];

		String invoicerNo = taxBillSet.getSaveBizNo();
		String purposeType = "";
		String bizType = "";
		String bizClassification = "";
		String partyTypeCode = "";

		String body = "";
		// String documentId = "" ;

		if (("청구").equals(taxBillSet.getCheckedList().get(0).getClType())) {
			purposeType = "C";
		}
		if (("영수").equals(taxBillSet.getCheckedList().get(0).getClType())) {
			purposeType = "R";
		}

		if (("사업자").equals(taxBillSet.getCheckedList().get(0).getBizType())) {
			bizType = "도소매";
			bizClassification = "자동차";
			partyTypeCode = "01";
		}
		if (("개인").equals(taxBillSet.getCheckedList().get(0).getBizType())) {
			bizType = "";
			bizClassification = "";
			partyTypeCode = "02";
		}

		TaxInvoice taxInvoice = new TaxInvoice();
		TaxInformation taxInformation = new TaxInformation();
		TaxInvoiceType taxInvoiceType = new TaxInvoiceType();
		TaxInvoicee taxInvoicee = new TaxInvoicee();
		TaxContact taxContact1 = new TaxContact();
		TaxContact taxContact2 = new TaxContact();
		TaxItem taxItem = new TaxItem();
		ArrayList<TaxItem> taxItemList = new ArrayList<TaxItem>();

		taxItem.setMonth(month);
		taxItem.setDay(date);
		taxItem.setSubject(taxBillSet.getCheckedList().get(0).getItemName());
		taxItem.setUnit("");
		taxItem.setQuantity("1");
		taxItem.setUnitPrice(Integer.toString(taxBillSet.getCheckedList().get(0).getSupPrice()));
		taxItem.setSupplyPrice(Integer.toString(taxBillSet.getCheckedList().get(0).getSupPrice()));
		taxItem.setTax(Integer.toString(taxBillSet.getCheckedList().get(0).getVat()));
		taxItem.setDescription(taxBillSet.getCheckedList().get(0).getMemo());
		taxItemList.add(taxItem);

		taxContact1.setCell("");
		taxContact1.setEmail(taxBillSet.getCheckedList().get(0).getTaxEmail());
		taxContact1.setName("회계담당자");
		taxContact1.setPhone(taxBillSet.getCheckedList().get(0).getPhone().replace("-", ""));

		taxContact2.setCell("");
		taxContact2.setEmail("");
		taxContact2.setName("");
		taxContact2.setPhone("");

		taxInvoicee.setCompanyNumber(taxBillSet.getCheckedList().get(0).getBizNo());
		taxInvoicee.setTaxNumber("");
		taxInvoicee.setCompanyName(taxBillSet.getCheckedList().get(0).getCustName());
		taxInvoicee.setCompanyAddress(taxBillSet.getCheckedList().get(0).getAddress()); // null
		taxInvoicee.setCeoName(taxBillSet.getCheckedList().get(0).getCeoName()); // null
		taxInvoicee.setBizType(bizType); // 업태 null
		taxInvoicee.setBizClassification(bizClassification); // 업종 null
		taxInvoicee.setPartyTypeCode(partyTypeCode); // 공급받는자 구분 01:기업 02:개인(내국인) 03:개인(외국인) //null
		taxInvoicee.setPrimaryContact(taxContact1);
		taxInvoicee.setSecondaryContact(taxContact2);

		taxInvoiceType.setTransactionType("S");
		taxInvoiceType.setPurposeType(purposeType);
		taxInvoiceType.setTaxType(taxBillSet.getCheckedList().get(0).getTaxTypeCode()); // null
		taxInvoiceType.setTypeCode("A");

		taxInformation.setIssueDate(taxBillSet.getCheckedList().get(0).getTaxBillDate());
		taxInformation.setMemo("");
		taxInformation.setBookNo("-");
		taxInformation.setSerial("000-000");
		taxInformation.setDescription("");
		taxInformation.setCash("0");
		taxInformation.setCheck("0");
		taxInformation.setDraft("0");
		taxInformation.setUncollected("0");
		taxInformation.setTotalSupplyPrice(Integer.toString(taxBillSet.getCheckedList().get(0).getSupPrice())); // String
																												// 처리해줘야함
		taxInformation.setTotalTax(Integer.toString(taxBillSet.getCheckedList().get(0).getVat())); // String 처리해줘야함

		taxInvoice.setInformation(taxInformation);
		taxInvoice.setInvoicee(taxInvoicee);
		taxInvoice.setInvoicer(invoicerNo);
		taxInvoice.setInvoiceType(taxInvoiceType);
		taxInvoice.setItems(taxItemList);

		ObjectMapper mapper = new ObjectMapper();
		try {
			String json = mapper.writeValueAsString(taxInvoice);
			body = "{ \"data\" : " + json + "}";
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		String url = taxBillSet.getSaveUrl();
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.add("Office-Authorization", taxBillSet.getSaveOfficeKey());
		headers.add("Bill-Access-Authorization", taxBillSet.getSaveAccessKey());
		HttpEntity<String> entity = new HttpEntity(body, headers);

		HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
		RestTemplate restTemplate = new RestTemplate(factory);
		factory.setReadTimeout(5000); // 읽기시간초과, ms
		factory.setConnectTimeout(3000); // 연결시간초과, ms
		
		
		HashMap<String, Object> params = new HashMap<String, Object>();
		HashMap<String, Object> map = new HashMap<String, Object>();

		/*
		 * 세금계산서 통신하기전 유효성검사 start
		 * */
		
		//companyNumber taxBillSet.getCheckedList().get(0).getBizNo()
		//email taxBillSet.getCheckedList().get(0).getTaxEmail() 20240412 yoonsang 이메일은 당장은 검사안해도 될듯하다.
		//phone taxBillSet.getCheckedList().get(0).getPhone().replace("-", "")
		boolean isValid = true;
		
		isValid = Pattern.matches("[0-9]+", taxBillSet.getCheckedList().get(0).getBizNo().replace("-", ""));
		if(isValid == true && taxBillSet.getCheckedList().get(0).getBizNo().replace("-", "").length() != 10) {
			isValid = false;
		}
		if(isValid == false) {
			map.put("result_code", "Err");
			map.put("result_msg", "사업자번호 입력 오류입니다.");
			
			return map;
		}
		
		// 2024.05.27 hsg - 장윤상매니저 요청으로 주설 풀음 
		isValid = Pattern.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", taxBillSet.getCheckedList().get(0).getTaxEmail());
		if(isValid == false) {
			map.put("result_code", "Err");
			map.put("result_msg", "이메일 입력 오류입니다.");
			
			return map;
		}
		
		isValid = Pattern.matches("[0-9]+", taxBillSet.getCheckedList().get(0).getPhone().replace("-", ""));
		if(taxBillSet.getCheckedList().get(0).getPhone().replace("-", "") != "" && isValid == false) {
			map.put("result_code", "Err");
			map.put("result_msg", "전화 입력 오류입니다.");
			
			return map;
		}
		

		/*
		 * 세금계산서 통신하기전 유효성검사 finish
		 * */
		
		
		ResponseEntity<HashMap> response = restTemplate.exchange(url, HttpMethod.POST, entity, HashMap.class);
		
		//System.out.println("response : " + response);

		/*
		 * 반환되는 response 값
		 * 
		 * <200,{data={documentId=[20230209111316UBUQXWI9RDGATN8PISGD4FUBLJEY4C1S]},
		 * meta={}},[date:"Thu, 09 Feb 2023 02:13:16 GMT",
		 * content-type:"application/json", transfer-encoding:"chunked" ,
		 * vary:"Accept-Encoding", cache-control:"no-cache, private",
		 * x-ratelimit-limit:"1000", x-ratelimit-remaining:"999",
		 * x-frame-options:"SAMEORIGIN", x-xss-protection:"1; mode=block",
		 * x-content-type-options:"nosniff",
		 * set-cookie:"lbg_100_1=lbg_100_1_to_10.4.96.201; path=/"]>
		 */
		Map<String, Object> data = (Map<String, Object>) response.getBody().get("data");
		List<String> documentIdList = (List<String>) data.get("documentId");
		String documentId = documentIdList.get(0);


		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		//int result = 0;
		TaxBill o_taxBill = new TaxBill();

		String result_code = "";
		String result_msg = "";
		String appStatusCode = "W";
		String docStatusCode = "0";
		taxBillSet.setTaxBillNo(taxBillNo);
		

		params.put("workingType", "UPT_HW");
		params.put("logComCode", comCode);
		params.put("logUserId", userId);
		//params.put("taxBillNo", taxBillNo);
		params.put("documentId", documentId);
		params.put("appStatusCode", appStatusCode);
		params.put("docStatusCode", docStatusCode);
		params.put("taxBill", taxBillSet);
		
		//System.out.println("params : " + params);
		o_taxBill = baseService.taxBillAdd(params);
		//System.out.println("o_taxBill : " + o_taxBill);

		if (("OK").equals(o_taxBill.getDb_resultCode())) {
			map.put("result_code", "OK");
			map.put("result_msg", "처리되었습니다.");
		} else {
			map.put("result_code", o_taxBill.getDb_resultCode());
			map.put("result_msg", o_taxBill.getDb_resultMsg());
		}

		return map;

	}

	@RequestMapping(value = "/taxBillFind", method = RequestMethod.POST)
	public HashMap<String, Object> taxBillFind(@RequestParam String list,
			@RequestParam String saveUrl, String saveOfficeKey, String saveAccessKey, String saveBizNo) {

		JSONArray jsonArr = new JSONArray(list);

		String url = saveUrl;
		String url2;
		String documentId = "";
		String appStatusCode;
		String declareStautsNum;
		String declareStatusCode;
		String issueId;
		int result = 0;

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.add("Office-Authorization", saveOfficeKey);
		headers.add("Bill-Access-Authorization", saveAccessKey);
		HttpEntity<String> entity = new HttpEntity(headers);

		HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
		RestTemplate restTemplate = new RestTemplate(factory);
		factory.setReadTimeout(5000); // 읽기시간초과, ms factory.setConnectTimeout(3000);
		// 연결시간초과, ms

		HashMap<String, Object> params = new HashMap<String, Object>();
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		for (int i = 0; i < jsonArr.length(); i++) {
			JSONObject jsonObj = jsonArr.getJSONObject(i);

			if (jsonObj.get("documentId") == null) {

				result = -1;
			} else {
				documentId = jsonObj.getString("documentId");
				url2 = url + "/" + documentId;

				try {
					ResponseEntity<HashMap> response = restTemplate.exchange(url2, HttpMethod.GET, entity,
							HashMap.class);

					Map<String, Object> data = (Map<String, Object>) response.getBody().get("data");
					Map<String, Object> status = (Map<String, Object>) data.get("status");

					appStatusCode = (String) status.get("approvalStatus");

					declareStautsNum = (String) status.get("declareStatus");

					declareStatusCode = (String) status.get("declareStatusCode");

					issueId = (String) status.get("issueId");

					params.put("comCode", comCode);
					params.put("userId", userId);
					params.put("documentId", documentId);

					params.put("appStatusCode", appStatusCode);
					params.put("declareStautsNum", declareStautsNum);
					params.put("declareStatusCode", declareStatusCode);
					params.put("issueId", issueId);

					result = baseService.taxBillFind(params);
					params.clear();

				} catch (HttpClientErrorException e) {
					int statusCode = e.getStatusCode().value();
					String errorMessage = e.getMessage();
					if (("W").equals(jsonObj.get("appStatusCode"))) {
						params.put("comCode", comCode);
						params.put("userId", userId);
						params.put("taxBillNo", jsonObj.get("taxBillNo"));
						
						result = baseService.taxBillReset(params);
						
					}
				} catch (Exception e) {
					// TODO: handle exception
					//System.out.println(" Exception in : ");
					e.printStackTrace();
				}

			}

		}

		/*
		 * String result_code = ""; String result_msg = "";
		 * 
		 * if (result >= 1) { result_code = "OK"; result_msg = "성공"; } else {
		 * result_code = "Err"; result_msg = "실패"; }
		 */

		HashMap<String, Object> map = new HashMap<String, Object>();
		// map.put("result_code", result_code);
		// map.put("result_msg", result_msg);

		return map;

	}

	@RequestMapping(value = "/taxBillDel", method = RequestMethod.POST)
	public HashMap<String, Object> taxBillDel(@RequestBody TaxBill taxBillSet) {

		String taxBillNo = taxBillSet.getCheckedList().get(0).getTaxBillNo();
		String documentId = taxBillSet.getCheckedList().get(0).getDocumentId();

		String url = taxBillSet.getSaveUrl();
		String url2 = url + "/" + documentId;

		int result = 0;

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.add("Office-Authorization", taxBillSet.getSaveOfficeKey());
		headers.add("Bill-Access-Authorization", taxBillSet.getSaveAccessKey());
		HttpEntity<String> entity = new HttpEntity(headers);

		HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
		RestTemplate restTemplate = new RestTemplate(factory);
		factory.setReadTimeout(5000); // 읽기시간초과, ms factory.setConnectTimeout(3000);
		// 연결시간초과, ms

		HashMap<String, Object> params = new HashMap<String, Object>();
		String comCode = (String) session.getAttribute("comCode");
		String userId = (String) session.getAttribute("userId");

		ResponseEntity<HashMap> response = restTemplate.exchange(url2, HttpMethod.DELETE, entity, HashMap.class);

		/*
		 * response : <304,[date:"Tue, 14 Feb 2023 01:02:53 GMT",
		 * cache-control:"no-cache, private", x-ratelimit-limit:"1000",
		 * x-ratelimit-remaining:"999", x-frame-options:"SAMEORIGIN",
		 * x-xss-protection:"1; mode=block", x-content-type-options:"nosniff",
		 * set-cookie:"lbg_116_1=lbg_116_1_to_10.4.96.61; path=/"]>
		 */

		params.put("comCode", comCode);
		params.put("userId", userId);
		params.put("taxBillNo", taxBillNo);

		result = baseService.taxBillReset(params);

		HashMap<String, Object> map = new HashMap<String, Object>();
		// map.put("result_code", result_code);
		// map.put("result_msg", result_msg);

		return map;
	}
	
	/*
	public List<SseEmitter> emitters = new CopyOnWriteArrayList();
	
	@CrossOrigin
	@RequestMapping(value = "/subscribe", consumes = MediaType.ALL_VALUE)
	public SseEmitter subscribe() {
		SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
		try {
			sseEmitter.send(SseEmitter.event().name("INIT"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		sseEmitter.onCompletion(()-> emitters.remove(sseEmitter));
		
		emitters.add(sseEmitter);
		return sseEmitter;
	}
	
	
	@PostMapping(value = "/dispatchEvent")
	public void dispatchEventToClients (@RequestParam String title, @RequestParam String text) {
		
		String eventFormatted = new JSONObject().put("title", title).put("text", text).toString();
		
		
		for(SseEmitter emitter : emitters) {
			try {
				emitter.send(SseEmitter.event().name("latestNews").data(eventFormatted));
			} catch (IOException e) {
				emitters.remove(emitter);
			}
		}
	}
	*/

}

















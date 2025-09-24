package kr.co.panclub.common;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.ClientAnchor;
import org.apache.poi.ss.usermodel.Comment;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Drawing;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.RichTextString;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.usermodel.Workbook;

import kr.co.panclub.model.StockItem;

public class StorListExcelView extends AbstractExcelPOIView {
	    @SuppressWarnings("unchecked")
	    @Override
	    protected void buildExcelDocument(Map<String, Object> model, Workbook workbook, HttpServletRequest request, HttpServletResponse response) throws Exception {
	    	 
            //Sheet 생성
            Sheet sheet = workbook.createSheet("sheet1");
            Row row = null;
            int rowCount = 0;
            int cellCount = 0;
            Cell cell = null;
            
  
            List<StockItem> stockItemList = (List<StockItem>) model.get("stockItemList"); 
            
            	//전달받은 양식의 기본 배율이 85%라서 일단 85퍼로 해둠
	            sheet.setZoom(85);
	        	//베이스폰트설정
            	HSSFFont  fontBase = (HSSFFont) workbook.createFont(); // 폰트
		        fontBase.setFontHeight((short)(11*20)); //사이즈
		        fontBase.setFontName("맑은 고딕");
		        
		        
	            
	            //텍스트서식+ 외곽
		        HSSFCellStyle cellStyle1 = (HSSFCellStyle) workbook.createCellStyle();
	            cellStyle1.setFont(fontBase); 
	            cellStyle1.setBorderRight(BorderStyle.THIN);
	            cellStyle1.setBorderLeft(BorderStyle.THIN);
	            cellStyle1.setBorderTop(BorderStyle.THIN); 
	            cellStyle1.setBorderBottom(BorderStyle.THIN); 
	            cellStyle1.setDataFormat(HSSFDataFormat.getBuiltinFormat("@"));
	            cellStyle1.setAlignment(HorizontalAlignment.CENTER);
	            cellStyle1.setVerticalAlignment(VerticalAlignment.CENTER);
	            //일반서식+ 외곽
	            HSSFCellStyle cellStyle2 = (HSSFCellStyle) workbook.createCellStyle();
	            cellStyle2.setFont(fontBase); 
	            cellStyle2.setBorderRight(BorderStyle.THIN);
	            cellStyle2.setBorderLeft(BorderStyle.THIN);
	            cellStyle2.setBorderTop(BorderStyle.THIN); 
	            cellStyle2.setBorderBottom(BorderStyle.THIN);  
	            cellStyle2.setAlignment(HorizontalAlignment.CENTER);
	            cellStyle2.setVerticalAlignment(VerticalAlignment.CENTER);
	            
	            //텍스트서식 
	            HSSFCellStyle cellStyle3 = (HSSFCellStyle) workbook.createCellStyle();
	            cellStyle3.setFont(fontBase);  
	            cellStyle3.setDataFormat(HSSFDataFormat.getBuiltinFormat("@"));
	            cellStyle3.setVerticalAlignment(VerticalAlignment.CENTER);
	            //일반서식 
	            HSSFCellStyle cellStyle4 = (HSSFCellStyle) workbook.createCellStyle();
	            cellStyle4.setVerticalAlignment(VerticalAlignment.CENTER);
	            cellStyle4.setFont(fontBase);   
   
	            sheet.setColumnWidth(0, 7000);   
	            sheet.setColumnWidth(1, 7000);
	            sheet.setColumnWidth(2, 7000);
	            sheet.setColumnWidth(3, 3000);
	            
	            row = sheet.createRow(rowCount++);
	            row.setHeight((short)(21*20));
	           
	            cellCount = 0;
	            cell = row.createCell(cellCount++); cell.setCellValue("부품번호"); cell.setCellStyle(cellStyle1);  
	            cell = row.createCell(cellCount++); cell.setCellValue("정품구분"); cell.setCellStyle(cellStyle2); createComment(workbook, sheet, cell, cellCount, "G : 정품\nO : 정품외");
	            cell = row.createCell(cellCount++); cell.setCellValue("브랜드코드"); cell.setCellStyle(cellStyle2);  createComment(workbook, sheet, cell, cellCount, "- 정품은 브랜드코드 입력/미입력 하셔도 협력사 재고관리에 전혀 무관합니다.");
	            cell = row.createCell(cellCount++); cell.setCellValue("재고수량"); cell.setCellStyle(cellStyle2); 	
	            
	             
	            for(StockItem stockItem : stockItemList)
	            {
	            	row = sheet.createRow(rowCount++);
	            	cellCount = 0;
	            	cell = row.createCell(cellCount++); cell.setCellValue(itemNoXlsxFormat(stockItem.getItemNo(),stockItem.getMakerCode())); cell.setCellStyle(cellStyle3);
	            	cell = row.createCell(cellCount++); cell.setCellValue(isGenuine(stockItem.getMakerCode())); cell.setCellStyle(cellStyle4);
	            	cell = row.createCell(cellCount++); cell.setCellValue(stockItem.getMakerCode()); cell.setCellStyle(cellStyle4);
	            	cell = row.createCell(cellCount++); cell.setCellValue(stockItem.getStockQty()); cell.setCellStyle(cellStyle4);
	            	
	            }
 
	    }
	    
	    @Override
	    protected Workbook createWorkbook() {
	        return new HSSFWorkbook();
	    }
	    
	    private String itemNoXlsxFormat(String str,String type) // 혼다와 일본 브랜드 부품번호 변조용 함수
	    {
	    	
	    	
	    	if(type.equals("HD")) //혼다 aaaaa-bbb-ccccccc
	    	{
	    		StringBuffer sb = new StringBuffer();
	    		int strLength = str.length();
	    		sb.append(str.substring(0,strLength>4?5:strLength));
	    		if(str.length()>5) 
	    		{
	    			sb.append("-");
	    			sb.append(str.substring(5,strLength>7?8:strLength));
	    		}
	    		if(str.length()>8) 
	    		{
	    			sb.append("-");
	    			sb.append(str.substring(8));
	    		}
	    		return sb.toString();
	    	}
	    	else if(type.equals("TT") || type.equals("LX") || type.equals("NI") || type.equals("IF") || type.equals("MI") || type.equals("SB")) //혼다외 일본차 aaaaa-bbbbb-cccccccc
	    	{
	    		StringBuffer sb = new StringBuffer();
	    		int strLength = str.length();
	    		sb.append(str.substring(0,strLength>4?5:strLength));
	    		if(str.length()>5) 
	    		{
	    			sb.append("-");
	    			sb.append(str.substring(5,strLength>9?10:strLength));
	    		}
	    		if(str.length()>10) 
	    		{
	    			sb.append("-");
	    			sb.append(str.substring(10));
	    		}
	    		return sb.toString();
	    	}
	    	else // 그외 aaaaaaaaaaaaaaaaaaaaaaaa
	    	{
	    		return str;
			} 
	    }
	    private String isGenuine(String makerCode) //정품 표시용
	    {
	    	if(makerCode.equals("AT") || makerCode.equals("OT") || makerCode.equals("t1")) //애프터,기타,테스트는 비정품 나머지는 정품
	    	{
	    		return "O";
	    	}
	    	else 
	    	{
	    		return "G";
			}
	    }
	    private void createComment(Workbook workbook , Sheet sheet , Cell cell , int rowIndex , String commentText  ) //메모남기는용도
	    {
	    	CreationHelper creationHelper = workbook.getCreationHelper();
	    	Drawing<?> drawing = sheet.createDrawingPatriarch();
	    	ClientAnchor anchor = creationHelper.createClientAnchor();
	    	
	    	anchor.setCol1(0);
	    	anchor.setRow1(rowIndex);
	    	anchor.setCol2(3);
	    	anchor.setRow2(rowIndex+3);
	    	
	    	Comment comment = drawing.createCellComment(anchor);
	    	RichTextString str = creationHelper.createRichTextString(commentText);
	    	comment.setString(str);
	    	
	    	cell.setCellComment(comment);
		}

	}

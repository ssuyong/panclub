$(document).ready(function() {
var urlParams = new URLSearchParams(window.location.search);
var reqArr = urlParams.get('reqArr');
var reqArr2 = urlParams.get('reqArr2');
var reqArr3 = urlParams.get('reqArr3');
var comCode = $("#comCode").val();

//console.log("urlParams" + urlParams);
//console.log ("reqArr"+reqArr);
//console.log ("reqArr2"+reqArr2)
//console.log ("comCode" + comCode);
var qrCodes = reqArr.split('^');
var itemNo  = reqArr2.split('^');
var itemName  = reqArr3.split('^');

function findDataToServer(url) {
	
	var comCode = $("#comCode").val();
	
	//console.log("comCode:"+comCode);

	$.ajax(	{
		type : "POST",
		url : url,
		dataType : "json",
		data: {
			
			"custCode":comCode,
			 "workingType":"PAN_LIST",
		},
		async: false,
		//contentType: "application/json; charset=utf-8",
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		success:function(data){
			
			if (data.custList.length == 0){
				alert("조건에 맞는 자료가 없습니다.");
				//$("#iDiv_noDataPop").css("display","block");							
			}else {
                var custName = data.custList[0].custName;
              //  console.log("custName: " + custName);
                $("#custName").val(custName);
                
            }
		},
		error: function(x, e) {
			if (x.status == 0) {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(You are offline!!n Please Check Your Network.)');
			} else if (x.status == 404) {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Requested URL not found.)');
			} else if (x.status == 500) {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Internel Server Error.)');
			} else if (e == 'parsererror') {
				alert('시간경과로 로그아웃되었습니다.\n재로그인 후  다시 조회하세요.\n(Error.nParsing JSON Request failed.)');
			} else if (e == 'timeout') {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Request Time out.)');
			} else {
				alert('조회에 실패했습니다. 추후 다시 시도해 주세요.\n(Unknow Error.n' + x.responseText + ')');
			}
		}
	});
}

 findDataToServer("/base/cust-list");

//QR 코드 생성
qrCodes.forEach(function(code, index) {

var parentContainer = document.createElement("div");
parentContainer.classList.add("flex-container");

var rowContainer = document.createElement("div");
rowContainer.classList.add("container-row");

var qrContainer = document.createElement("div");
qrContainer.classList.add("qrcode-container");

var imgContainer = document.createElement("div");
imgContainer.classList.add("img-container");

var img = document.createElement("img");
//img.src = "http://img.panclub.co.kr/custImg/" + comCode + ".png";
img.src = "/resources/img/panauto_v1.png";
img.style.height = "15px";
img.style.marginBottom = "10px";
img.style.marginTop = "5px";
img.style.marginLeft = "10px";
imgContainer.style.width = "80px";
imgContainer.style.height = "80px";

var idNameContainer = document.createElement("div");
idNameContainer.classList.add("rackname-container");
idNameContainer.textContent =  itemNo[index];
idNameContainer.style.marginTop = " -2px";

var idContainer = document.createElement("div");
idContainer.classList.add("rackname-container");
idContainer.textContent =  qrCodes[index];
idContainer.style.marginTop = "-5px";


var nameContainer = document.createElement("div");
nameContainer.classList.add("rackname-container");
nameContainer.textContent =  itemName[index];
nameContainer.style.marginTop = "-0.5px";

// QR 코드 생성
var qr = new QRCode(qrContainer, {
  text: code,
  width: 60,
  height: 60
});

//imgContainer.appendChild(img);
qrContainer.appendChild(imgContainer);
imgContainer.appendChild(img);
rowContainer.appendChild(qrContainer);
rowContainer.appendChild(imgContainer);
parentContainer.appendChild(rowContainer);
parentContainer.appendChild(idContainer);
parentContainer.appendChild(idNameContainer);
parentContainer.appendChild(nameContainer);

var custName =   $("#custName").val();

var additionalContentContainer = document.createElement("div");
additionalContentContainer.classList.add("additional-content");
additionalContentContainer.textContent = custName;
additionalContentContainer.style.fontSize = "16px";
additionalContentContainer.style.fontWeight = "bold"; 
additionalContentContainer.style.marginLeft = "10px";

imgContainer.appendChild(additionalContentContainer);

var qrContainerParent = document.getElementById("qr-container");
qrContainerParent.appendChild(parentContainer);
parentContainer.classList.add("page-break");
});



});
//인쇄
function printQR() {
  var qrContainers = document.querySelectorAll(".flex-container");
  var printWindow = window.open("", "_blank", "width=600,height=400");
  var printContent = "<html><head>";
  printContent += "<style>@media print {";
  printContent += "@page { size: 60mm 40mm; margin: 3mm; }"; 
  printContent += ".page-break { page-break-after: always; }";
  printContent += ".container-row { display: table-row; }";
  printContent += ".flex-container { margin: 0px;  }";
  printContent += ".qrcode-container, .img-container { display: table-cell; vertical-align: top;  margin-right: 20px;  }";
  printContent += ".img-container { margin-left: 20px; }";
  printContent += ".rackname-container { font-size: 14px; font-weight: bold; margin-top: 10px; }";
  printContent += "header, footer { display: none; }"; // 추가된 부분
  printContent += "}";
  printContent += "</style>";
  printContent += "</head><body>";

  qrContainers.forEach(function(qrContainer, index) {
    printContent += "<div class='page-break'>";
    printContent += "<div class='container-row'>";
    printContent += qrContainer.outerHTML;
    printContent += "</div>";
    printContent += "</div>";
  });

  printContent += "</body></html>";

  printWindow.document.open();
  printWindow.document.write(printContent);
  printWindow.document.close();

  printWindow.onload = function() {
    setTimeout(function() {
      printWindow.print();
      printWindow.close();
    }, 100);
  };
};
//인쇄
/*
function printQR() {
  var qrContainers = document.querySelectorAll(".qrcode-container");
  
  qrContainers.forEach(function(qrContainer) {
    var printWindow = window.open("", "_blank","width=600,height=400");
    var printContent = "<html><head><title>Print QR Code</title></head><body>";
     printContent += "<style>@media print { @page { margin: 10; } }</style>";
     printContent += "</head><body>";
     
    printContent += qrContainer.innerHTML; // qrContainer의 내용 추가
    printContent += "</body></html>";
  
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
  
    printWindow.onload = function() {
      printWindow.print();
      printWindow.close();
    };
  });
}

*/

//QR 다운로드

function downloadQR() {
  var urlParams = new URLSearchParams(window.location.search);
  var reqArr = urlParams.get('reqArr');
  var qrCodes = reqArr.split('^');
  var width = 150; 
  var height = 150;

  qrCodes.forEach(function(code, index) {
    var qrContainer = document.querySelectorAll(".flex-container")[index];
    var containerRect = qrContainer.getBoundingClientRect();
   // var captureWidth = containerRect.width;
    //var captureHeight = containerRect.height;

    setTimeout(function() {
      html2canvas(qrContainer, { width: width, height: height }).then(function(canvas) {
        var imageDataURL = canvas.toDataURL("image/png");
        var downloadLink = document.createElement("a");
        downloadLink.href = imageDataURL;
        downloadLink.download = "qr_code_" + index + ".png";
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      });
    }, 100 * index); // 30 seconds delay for each iteration
  });
}
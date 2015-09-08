
	
	
var email_signature = "";


// JavaScript Document
$(document).ready(function() {
	
	

	
	//get rid of other styling
	$(".content_style span").filter(function (index) {
				 
				  return $(this).attr("style").toLowerCase().indexOf("font-size:") == -1;
                })
            .attr("style", "");
	
	
	//for font 14pt, 18pt, 24pt, 36pt -> 14 pt
	$(".content_style span").filter(function (index) {
				  condition = false;
				  if($(this).attr("style").toLowerCase().indexOf("font-size: 14pt") != -1 || $(this).attr("style").toLowerCase().indexOf("font-size: 18pt") != -1 || $(this).attr("style").toLowerCase().indexOf("font-size: 24pt") != -1 || $(this).attr("style").toLowerCase().indexOf("font-size: 36pt") != -1)
                  	condition = true;
					
				  return condition;
                })
            .attr("style", "font-size: 14pt");
	
	//font 12pt -> 12pt
	$(".content_style span").filter(function (index) {
				 
				  return $(this).attr("style").toLowerCase().indexOf("font-size: 12pt") != -1;
                })
            .attr("style", "font-size: 12pt");
	
	//font 10pt -> 10pt
	$(".content_style span").filter(function (index) {
				 
				  return $(this).attr("style").toLowerCase().indexOf("font-size: 10pt") != -1;
                })
            .attr("style", "font-size: 10pt");
	
	
	//font 8pt -> 8pt
	$(".content_style span").filter(function (index) {
				 
				  return $(this).attr("style").toLowerCase().indexOf("font-size: 82pt") != -1;
                })
            .attr("style", "font-size: 82pt");
			
	
	 $('a.load-local').cluetip({local:true, showTitle: false, cursor: 'pointer'});
	
	
});// end doc ready


function validateEmailForm()
{
	if(document.getElementById("firstname").value.length < 1)
	{	
		alert("First name is required");
		document.getElementById("firstname").focus();
		return false;
	}
		
	if(document.getElementById("lastname").value.length < 1)
	{	
		alert("Last name is required");
		document.getElementById("lastname").focus();
		return false;
	}
	if(document.getElementById("title").value.length < 1)
	{	
		alert("Title is required");
		document.getElementById("title").focus();
		return false;
	}
		
	if(document.getElementById("department1").value.length < 1)
	{	
		alert("At least one department must be specified");
		document.getElementById("department1").focus();
		return false;
	}
	
	if(document.getElementById("organization").value == "-1")
	{	
		alert("Please specify which organization you belong to");
		document.getElementById("organization").focus();
		return false;
	}
	
	if(document.getElementById("phone_area").value.length < 1 || document.getElementById("phone_pre").value.length < 1 || document.getElementById("phone_end").value.length < 1)
	{	
		alert("Phone number is required");
		return false;
	}
	
	return true;
}


function generateSignature()
{
	var firstname = document.getElementById("firstname").value;
	var middlename = document.getElementById("middlename").value;
	var lastname = document.getElementById("lastname").value;
	var title = document.getElementById("title").value;
	var department1 = document.getElementById("department1").value;
	var department2 = document.getElementById("department2").value;
	var organization = document.getElementById("organization").value;
	var phone = document.getElementById("phone_area").value + "." + document.getElementById("phone_pre").value + "." + document.getElementById("phone_end").value ;
	var fax = "";
	if(document.getElementById("fax_area").value.length > 0 && document.getElementById("fax_pre").value.length > 0 && document.getElementById("fax_end").value.length > 0)
		fax = document.getElementById("fax_area").value + "." + document.getElementById("fax_pre").value + "." + document.getElementById("fax_end").value ;
	var cellphone = "";
	if(document.getElementById("cellphone_area").value.length > 0 && document.getElementById("cellphone_pre").value.length > 0 && document.getElementById("cellphone_end").value.length > 0)
		cellphone = document.getElementById("cellphone_area").value + "." + document.getElementById("cellphone_pre").value + "." + document.getElementById("cellphone_end").value ;
	
	
	email_signature = "";
	email_signature += "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\">";
	email_signature += "	<TR>";
	email_signature += "<TD class=\"text_12\"><B>" + firstname;
	if(middlename != "")
		email_signature += " " + middlename;
	email_signature += " " + lastname + "</B></TD>";
	email_signature += "	</TR>";
	email_signature += "	<TR>";
	email_signature += "		<TD class=\"text_12\">" + title + "</TD>";
	email_signature += "	</TR>";
	email_signature += "	<TR>";
	email_signature += "		<TD class=\"text_12\">" + department1 + "</TD>";
	email_signature += "	</TR>";
	if(department2 != "")
	{
		email_signature += "	<TR>";
		email_signature += "		<TD class=\"text_12\">" + department2 + "</TD>";
		email_signature += "	</TR>";	
	}
	email_signature += "	<TR>";
	email_signature += "		<TD>&nbsp;</TD>";
	email_signature += "	</TR>";
	email_signature += "	<TR>";
	email_signature += "		<TD class=\"text_10\">Tel &nbsp;" + phone + "</TD>";
	email_signature += "	</TR>";
	if(fax != "")
	{
		email_signature += "	<TR>";
		email_signature += "		<TD class=\"text_10\">Fax &nbsp;" + fax + "</TD>";
		email_signature += "	</TR>";
	}
	
	if(cellphone != "")
	{
		email_signature += "	<TR>";
		email_signature += "		<TD class=\"text_10\">Cell &nbsp;" + cellphone + "</TD>";
		email_signature += "	</TR>";
	}
	email_signature += "	<TR>";
	email_signature += "		<TD>&nbsp;</TD>";
	email_signature += "	</TR>";
	email_signature += "	<TR>";
	email_signature += "		<TD><a href=\"http://www.lmu.edu\"><img src=\"images/test-logo.gif\" /></a></TD>";
	email_signature += "	</TR>";
	email_signature += "	<TR>";
	email_signature += "		<TD>&nbsp;</TD>";
	email_signature += "	</TR>";
	email_signature += "	<TR>";
	email_signature += "		<TD class=\"text_8\"><a href=\"http://www.lmu.edu\">www.lmu.edu</a> | 1 LMU Drive, Los Angeles, Ca 90045 | <a href=\"http://www.lmu.edu\">Privacy + Legal</a></TD>";
	email_signature += "	</TR>";
	email_signature += "</table><BR><BR><span class=\"warning\">If you are satisfied with the preview above, follow the instructions below to add it to your Outlook. Otherwise, update the form and click \"preview\" again.</span>";
	
	document.getElementById("email_sig_preview_content").innerHTML = email_signature;
	document.getElementById("codecontainer").value = email_signature;
	document.getElementById("direction").className = "shown"
}//end of function

//to highligth textarea
function highlight()
{
	document.getElementById("codecontainer").select();
}//end of function






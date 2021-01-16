//Compute Cost Funtions
$( document ).ready(function() {    
	//call fuction to set currency
	setCurrencyText();

	//set currency type
	function setCurrencyText(){
		if($("#Currency").val() !== "")
		{
			var currency_selected = $("#Currency").val();
			//item price currency
			$('.ItemPriceCurrency').text("("+currency_selected+")");
		}
	}


	//shipping price options
	var selectValues = {"0": "0.0", "100": "100", "150": "150", "200": "200", "250": "250", "300": "300", "350": "350", "400": "400", "450": "450", "500": "500" };
	$.each(selectValues, function(key, value) {   
		if(value == "300"){
			$('#ShippingCost').append($("<option selected></option>").attr("value", key).text(value)); 
		}
		else{
			$('#ShippingCost').append($("<option></option>").attr("value", key).text(value)); 
		}		
	});


	//keyup function for item price and shipping cost
	$("#ItemPrice, #ShippingCost, #Miscellaneous").on("keyup change", function(e) {
		//get item price
		var item_price = $("#ItemPrice").val();
		
		//get shipping cost
		var shipping_cost =  $("#ShippingCost").val();	
		
		//get percentage added
		var percentage_added =  $("#PercentageAdded").val();
		
		//get miscellaneous cost
		var other_cost =  $("#Miscellaneous").val();
		
		//if variables are not empty
		if(shipping_cost !== '' && percentage_added !== ''&& item_price !== '' && other_cost !== ''){
			//set selling price
			setSellingPrice(item_price, percentage_added, shipping_cost, other_cost);
		}
	});


	//if options changed, compute price
	$('#PercentageAdded, #Currency').on('change', function (e) {
	  //Get selected percentage
	  //var percentage_added = $(this).children("option:selected").val();
	  var percentage_added = $("#PercentageAdded").val();

	  //get item price
	  var item_price = $("#ItemPrice").val();
	  
	  //get shipping cost
	  var shipping_cost =  $("#ShippingCost").val();
	  
	  //get miscellaneous cost
	  var other_cost =  $("#Miscellaneous").val();

	  
	  //if variables are not empty
	  if(shipping_cost !== '' && percentage_added !== '' && item_price !== ''){
		//set selling price
		setSellingPrice(item_price, percentage_added, shipping_cost, other_cost);
	  }
	  
	  //call fuction to set currency
	  setCurrencyText();

	});


	//set final selling price
	function setSellingPrice(item_price, percentage_added, shipping_cost, other_cost){
		var purchase_total = parseFloat(item_price) + parseFloat(shipping_cost) + parseFloat(other_cost);
		var selling_price = (percentage_added * purchase_total) + purchase_total;
		
		
		//get currency
		var currency_selected =  $("#Currency").val();
		
		if(currency_selected !== ''){
			//$("#ProductCost").val(currency_selected+" "+purchase_total.toFixed(2));
			//$("#SellingPrice").val(currency_selected+" "+selling_price.toFixed(2));
			$("#ProductCost").val(purchase_total.toFixed(2));
			$("#SellingPrice").val(selling_price.toFixed(2));
		}
		else{
			$("#ProductCost").val(purchase_total.toFixed(2));
			$("#SellingPrice").val(selling_price.toFixed(2));
		}
	}   

	  
	//For Decimal Only
	//allows only decimals for input
	$('.decimal-only').keyup(function(){
	  var val = $(this).val();
	  if(isNaN(val)){
		val = val.replace(/[^0-9\.]/g,'');
		if(val.split('.').length>2) 
		  val =val.replace(/\.+$/,"");
	  }
	  $(this).val(val); 
	});
	
});
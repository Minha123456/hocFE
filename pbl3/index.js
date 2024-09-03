var database = firebase.database().ref();

jQuery(document).ready(function(){
	var database = firebase.database().ref();
	
	database.child("a").on('value',function(datasnapshot){
		});
		
	/******************************************************************/
	/************************UPDATE TIMER******************************/
	/******************************************************************/
	$("#Update_Button").click(function(){
		var Timer_Data_Array = [15];
		
		/*Phán đoán dữ liệu Timer của ĐẠM*/
		if ($("#Timer_DAM_state").is(':checked')) { 
			Timer_Data_Array[0] = 1;
			} else {
			Timer_Data_Array[0] = 0;
			}
		Timer_Data_Array[1] = $("#Timer_DAM_Hour_On").find(":selected").val();
		Timer_Data_Array[2] = $("#Timer_DAM_Min_On").find(":selected").val();
		Timer_Data_Array[3] = $("#Timer_DAM_Hour_Off").find(":selected").val();
		Timer_Data_Array[4] = $("#Timer_DAM_Min_Off").find(":selected").val();
		
		/*Phán đoán dữ liệu Timer của LÂN*/
		if ($("#Timer_LAN_state").is(':checked')) { 
			Timer_Data_Array[5] = 1;
			} else {
			Timer_Data_Array[5] = 0;
			}
		Timer_Data_Array[6] = $("#Timer_LAN_Hour_On").find(":selected").val();
		Timer_Data_Array[7] = $("#Timer_LAN_Min_On").find(":selected").val();
		Timer_Data_Array[8] = $("#Timer_LAN_Hour_Off").find(":selected").val();
		Timer_Data_Array[9] = $("#Timer_LAN_Min_Off").find(":selected").val();
		
		/*Phán đoán dữ liệu Timer của KALI*/
		if ($("#Timer_KALI_state").is(':checked')) { 
			Timer_Data_Array[10] = 1;
			} else {
			Timer_Data_Array[10] = 0;
			}
		Timer_Data_Array[11] = $("#Timer_KALI_Hour_On").find(":selected").val();
		Timer_Data_Array[12] = $("#Timer_KALI_Min_On").find(":selected").val();
		Timer_Data_Array[13] = $("#Timer_KALI_Hour_Off").find(":selected").val();
		Timer_Data_Array[14] = $("#Timer_KALI_Min_Off").find(":selected").val();
		
		var data = "*TIM";
		
		for (var i = 0; i<15; i++){
			data = data + ";" + Timer_Data_Array[i];
			}
		data = data + "#";
		
		database.child("timer").set(data);
		
		alert("ĐÃ CẬP NHẬT !!!");
		});
		/******************************************************************/
// 	$("#buttonBtn").click(function(){
	
// 		alert("ĐÃ CẬP NHẬT !!!");
// 		});	

    
	/******************************************************************/
	/*******************GET TIMER DATA FROM FIREBASE*******************/
	/******************************************************************/
	database.child("timer").on('value',function(datasnapshot){
		var data = datasnapshot.val();
		if (data.startsWith("*") && data.endsWith("#")){
			data = data.substr(5, data.length-6).concat(";");
			var Timer_Data_Array = [15];
			for (var i=0; i<15; i++){
				Timer_Data_Array[i] = data.substring(0,data.indexOf(";"));
				data = data.substring(data.indexOf(";")+1);
				}	
			
			if (Timer_Data_Array[0] == "0"){	
				$("#Timer_DAM_state").prop('checked', false);
				} 
			if (Timer_Data_Array[0] == "1"){	
				$("#Timer_DAM_state").prop('checked', true);
				}
			$("#Timer_DAM_Hour_On").val(Timer_Data_Array[1]);	
			$("#Timer_DAM_Min_On").val(Timer_Data_Array[2]);	
			$("#Timer_DAM_Hour_Off").val(Timer_Data_Array[3]);	
			$("#Timer_DAM_Min_Off").val(Timer_Data_Array[4]);	
			
			if (Timer_Data_Array[5] == "0"){	
				$("#Timer_LAN_state").prop('checked', false);
				} 
			if (Timer_Data_Array[5] == "1"){	
				$("#Timer_LAN_state").prop('checked', true);
				}
			$("#Timer_LAN_Hour_On").val(Timer_Data_Array[6]);	
			$("#Timer_LAN_Min_On").val(Timer_Data_Array[7]);	
			$("#Timer_LAN_Hour_Off").val(Timer_Data_Array[8]);	
			$("#Timer_LAN_Min_Off").val(Timer_Data_Array[9]);
			
			if (Timer_Data_Array[10] == "0"){	
				$("#Timer_KALI_state").prop('checked', false);
				} 
			if (Timer_Data_Array[10] == "1"){	
				$("#Timer_KALI_state").prop('checked', true);
				}
			$("#Timer_KALI_Hour_On").val(Timer_Data_Array[11]);	
			$("#Timer_KALI_Min_On").val(Timer_Data_Array[12]);	
			$("#Timer_KALI_Hour_Off").val(Timer_Data_Array[13]);	
			$("#Timer_KALI_Min_Off").val(Timer_Data_Array[14]);
					
			} else {
				alert("Data in node timer is wrong");	
			}
		});
		
	/******************************************************************/
	/*********************GET FARM STATUS FROM FIREBASE****************/
	/******************************************************************/
	
	/*GET CURRENT DATE*/
	var toDay = new Date();
	let dateDisplay = toDay.getDate();
	if(dateDisplay < 10){
		dateDisplay = "0" + dateDisplay;
	}
	let monthDisplay = toDay.getMonth() + 1;
	if(monthDisplay < 10){
		monthDisplay = "0" + monthDisplay;
	}
	let yearDisplay = toDay.getFullYear();
	//var Data_Display = toDay.getDate() + '/' + (toDay.getMonth() + 1) + '/' + toDay.getFullYear();
	var Data_Display = dateDisplay + "/" + monthDisplay + "/" + yearDisplay;
	
	$("#Date_Table_Status").html(Data_Display);		/*DISPLAY ON STATUS TABLE*/
	
	/*CONVERST STRING FROM '-' TO '_'*/
	//var Date_Get_Data = toDay.getDate() + '_' + (toDay.getMonth() + 1) + '_' + toDay.getFullYear();
	var Date_Get_Data = dateDisplay + "_" + monthDisplay + "_" + yearDisplay;
	console.log(Date_Get_Data);
	
	/*GET BIGEST_ID IN [DATA] FROM FIREBASE*/
	database.child("Farm_Status").child(Date_Get_Data).child("Bigest_ID").on('value',function(datasnapshot){
		var Bigest_ID_In_Date = datasnapshot.val();
		console.log(Bigest_ID_In_Date);
		
		/*GET DATA FOR STATUS_TABLE FROM FIREBASE*/
		database.child("Farm_Status").child(Date_Get_Data).child(Bigest_ID_In_Date - 0).once('value',function(datasnapshot){	
			var data = datasnapshot.val();
			Display_Data(data, Bigest_ID_In_Date, 1);
			});
		
		database.child("Farm_Status").child(Date_Get_Data).child(Bigest_ID_In_Date - 1).once('value',function(datasnapshot){	
			var data = datasnapshot.val();
			Display_Data(data, Bigest_ID_In_Date, 2);
			});
			
		database.child("Farm_Status").child(Date_Get_Data).child(Bigest_ID_In_Date - 2).once('value',function(datasnapshot){	
			var data = datasnapshot.val();
			Display_Data(data, Bigest_ID_In_Date, 3);
			});
			
		database.child("Farm_Status").child(Date_Get_Data).child(Bigest_ID_In_Date - 3).once('value',function(datasnapshot){	
			var data = datasnapshot.val();
			Display_Data(data, Bigest_ID_In_Date, 4);
			});
		
		database.child("Farm_Status").child(Date_Get_Data).child(Bigest_ID_In_Date - 4).once('value',function(datasnapshot){	
			var data = datasnapshot.val();
			Display_Data(data, Bigest_ID_In_Date, 5);
			});
			
		database.child("Farm_Status").child(Date_Get_Data).child(Bigest_ID_In_Date - 5).once('value',function(datasnapshot){	
			var data = datasnapshot.val();
			Display_Data(data, Bigest_ID_In_Date, 6);
			});
			
		database.child("Farm_Status").child(Date_Get_Data).child(Bigest_ID_In_Date - 6).once('value',function(datasnapshot){	
			var data = datasnapshot.val();
			Display_Data(data, Bigest_ID_In_Date, 7);
			});
		});
		
	/*WHEN DATA [Bigest_ID_In_Date] ON FIREBSE CHANGE*/
	/*database.child("Farm_Status").child(Date_Get_Data).child("Bigest_ID").once('value',function(datasnapshot){
		var Bigest_ID_In_Date = datasnapshot.val();
		//alert(Bigest_ID_In_Date);
		});*/
		
	});
	
function alert1(){
        var data = "@T1:1";
		data = data + "#";
		database.child("control").set(data);
		
		alert("ĐÃ ĐIỀU KHIỂN VAN 1");
}
function alert2(){
        var data = "@T2:1";
		data = data + "#";
		database.child("control").set(data);
		
		alert("ĐÃ ĐIỀU KHIỂN VAN 2");
}
function alert3(){
        var data = "@T3:1";
		data = data + "#";
		database.child("control").set(data);
		
		alert("ĐÃ ĐIỀU KHIỂN VAN 3");
}	
function Display_Data(data, Bigest_ID_In_Date, n) {
	if (data.startsWith("*") && data.endsWith("#")){
		data = data.substr(5, data.length-6).concat(";");
		var Data_Array = [12];
		for (var k=0; k<12; k++){
			Data_Array[k] = data.substring(0,data.indexOf(";"));
			data = data.substring(data.indexOf(";")+1);
			}
			
		$('#' + (n) + 'id').html(Bigest_ID_In_Date - n +1);
		$('#' + (n) + 'humd').html(Data_Array[0]);
		$('#' + (n) + 'dam').html(Data_Array [1]);
		$('#' + (n) + 'lan').html(Data_Array [2]);
		$('#' + (n) + 'kal').html(Data_Array [3]);
		$('#' + (n) + 'temk').html(Data_Array [4]);
		$('#' + (n) + 'humk').html(Data_Array [5]);
		$('#' + (n) + 'o2k').html(Data_Array [6]);
		$('#' + (n) + 'co2').html(Data_Array [7]);
		$('#' + (n) + 'lux').html(Data_Array [8]);
		$('#' + (n) + 'ph').html(Data_Array [9]);
		$('#' + (n) + 'tg').html(Data_Array [10] + ':' +Data_Array [11]);		
		} else {
			alert("DATA: Farm_Status is wrong");
		};
	}
	
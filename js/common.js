
var baseUrl = "http://192.168.16.44:8080/clear/webServices/all?testLocal=1";
var downUrl = "http://192.168.16.44:8080/clear/webServices/excel?";
var settle_baseUrl = "http://192.168.16.44:8080/clear/webServices/all?testLocal=1";
var settle_downUrl = "http://192.168.16.44:8080/clear/webServices/excel?";

$(function() {
	$.cookie("userName", "123456", {
		expires: 14,
		path: "/"
	});
	/**
     * ajax封装
     * url 发送请求的地址
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * async 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
     *       注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
     * type 请求方式("POST" 或 "GET")， 默认为 "GET"
     * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
     * successfn 成功回调函数
     * errorfn 失败回调函数
     */
	jQuery.ax = function(url, data, async, type, dataType, successfn, errorfn) {
		async = (async == null || async == "" || typeof(async) == "undefined") ? "true" : async;
		type = (type == null || type == "" || typeof(type) == "undefined") ? "post" : type;
		dataType = (dataType == null || dataType == "" || typeof(dataType) == "undefined") ? "json" : dataType;
		data = (data == null || data == "" || typeof(data) == "undefined") ? {
			"date": new Date().getTime()
		} : data;
		$.ajax({
			type: type,
			async: async,
			data: data,
			url: url,
			dataType: dataType,
			success: function(d) {
				successfn(d);
			},
			error: function(e) {
				errorfn(e);
			}
		});
	};

	/**
	 * ajax封装
	 * url 发送请求的地址
	 * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
	 * successfn 成功回调函数
	 */
	jQuery.axjson = function(url, data, successfn) {
		data = (data == null || data == "" || typeof(data) == "undefined") ? {
			"date": new Date().getTime()
		} : data;
		$.ajax({
			type: "post",
			data: data,
			url: url,
			dataType: "json",
			success: function(d) {
				successfn(d);
			}
		});
	};

	/**
	 * ajax封装
	 * url 发送请求的地址
	 * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
	 * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
	 * successfn 成功回调函数
	 * errorfn 失败回调函数
	 */
	jQuery.axjsonex = function(url, data, successfn, errorfn) {
		data = (data == null || data == "" || typeof(data) == "undefined") ? {
			"date": new Date().getTime()
		} : data;
		$.ajax({
			type: "post",
			data: data,
			url: url,
			dataType: "json",
			success: function(d) {
				successfn(d);
			},
			error: function(e) {
				errorfn(e);
			}
		});
	};

	/**
	 * ajax封装
	 * Jsonp格式，用于跨域调用
	 * url 发送请求的地址
	 * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
	 * successfn 成功回调函数
	 */
	jQuery.axjsonp = function(url, data, successfn) {
		data = (data == null || data == "" || typeof(data) == "undefined") ? {
			"date": new Date().getTime()
		} : data;
		$.ajax({
			//提交数据的类型 POST GET
			type: "POST",
			//async:false,  
			//提交的网址
			url: url,
			//提交的数据
			data: data,
			//返回数据的格式
			dataType: "jsonp", //"xml", "html", "script", "json", "jsonp", "text".
			jsonp: "callbackparam", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
			jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
			//在请求之前调用的函数
			beforeSend: function() {
				$("#btn_loading").css('display', '');
			},
			//成功返回之后调用的函数             
			success: function(data) {
				successfn(data);
			},
			//调用执行后调用的函数
			complete: function(XMLHttpRequest, textStatus) {
				$("#btn_loading").css('display', 'none');
				//$("#btn_loading").css('display','none');
			},
			//调用出错执行的函数
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("AJAX请求错误：请求状态码：" + XMLHttpRequest.status + " readyState:" + XMLHttpRequest.readyState + "错误：" + textStatus);
			}
		});
	};

});

//添加或者修改json数据 
function setJson(jsonStr, name, value) {
	if (!jsonStr) jsonStr = "{}";
	var jsonObj = JSON.parse(jsonStr);
	jsonObj[name] = value;
	return JSON.stringify(jsonObj)
}
//删除数据 
function deleteJson(jsonStr, name) {
	if (!jsonStr) return null;
	var jsonObj = JSON.parse(jsonStr);
	delete jsonObj[name];
	return JSON.stringify(jsonObj)
}

//JSON集合排序(降序)
function sortDownJson(json, key) {
	for (var i = 0; i < json.length; i++) {
		for (var j = 0; j < json.length - 1; j++) {
			if (json[j][key] < json[j + 1][key]) {
				var temp = json[j];
				json[j] = json[j + 1];
				json[j + 1] = temp;
			};
		};
	};
	return json;
};
//JSON集合排序(升序)
function sortUpJson(json, key) {
	for (var i = 0; i < json.length; i++) {
		for (var j = 0; j < json.length - 1; j++) {
			if (json[j][key] > json[j + 1][key]) {
				var temp = json[j];
				json[j] = json[j + 1];
				json[j + 1] = temp;
			};
		};
	};
	return json;
};

function sortUpJsonInt(json, key) {
	for (var i = 0; i < json.length; i++) {
		for (var j = 0; j < json.length - 1; j++) {
			if (parseInt(json[j][key]) > parseInt(json[j + 1][key])) {
				var temp = json[j];
				json[j] = json[j + 1];
				json[j + 1] = temp;
			};
		};
	};
	return json;
};
// 功能：时间处理函数
function addDate(date, days) {
	var str = date.toString().replace("-", "/").replace("-", "/"); //字符分割

	var d = new Date(str);

	d.setDate(d.getDate() + days);
	var month = d.getMonth() + 1;
	var day = d.getDate();
	if (month < 10) {
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}

	var val = d.getFullYear().toString() + "-" + month.toString() + "-" + day.toString();
	return val;
}
//日期格式化
//使用方法
/*
//var now = new Date(); 
//var nowStr = now.format("yyyy-MM-dd hh:mm:ss"); 
////使用方法2: 
//var testDate = new Date(); 
//var testStr = testDate.format("YYYY年MM月dd日hh小时mm分ss秒"); 
//alert(testStr); 
////示例： 
//alert(new Date().Format("yyyy年MM月dd日")); 
//alert(new Date().Format("MM/dd/yyyy")); 
//alert(new Date().Format("yyyyMMdd")); 
//alert(new Date().Format("yyyy-MM-dd hh:mm:ss"));
*/
Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //month 
		"d+": this.getDate(), //day 
		"h+": this.getHours(), //hour 
		"m+": this.getMinutes(), //minute 
		"s+": this.getSeconds(), //second 
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
		"S": this.getMilliseconds() //millisecond 
	}

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};

//获取URL请求参数
var request = {
	QueryString: function(val) {
		var searchStr = location.search; //由于searchStr属性值包括“?”，所以除去该字符 
		searchStr = searchStr.substr(1); //将searchStr字符串分割成数组，数组中的每一个元素为一个参数和参数值 
		var searchs = searchStr.split("&"); //获得第一个参数和值 
		for (var item in searchs) {
			var parms = searchs[item].split("=");
			if (parms[0] == val) {
				return parms[1];
			}
		}
		return "";
	}
}
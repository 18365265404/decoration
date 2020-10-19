//搜索页面传来的参数
	var getHref = window.location.href;
	let getId=getHref.split("?")[1].split("=")[1];
	let getKey=getHref.split("?")[2].split("=")[1];
	
//搜索框值

$(".searchV2").val(decodeURI(getId))


//分页酒店
demo();
function demo(curr){
	$.ajax({
	type:"post",    //请求方式
	url:myServer+jyj_detailsSelectAllHotels+getKey,
	dataType:"json",
	data:{
		cityId:localStorage.getItem("city_id"),

		pageNum: curr || 1,
		likeName:decodeURI(getId)
	}, 

    success: function(data) {
    	if(data.status=='503'){
			window.location.href='error.html'
		}
		console.log("查询所有酒店",data.data)

		let JDSJList=data.data.JDSJ.list


		
		let JDSJStr=""
		    for(let i=0;i<JDSJList.length;i++){
		    	JDSJStr+=`
		    	
		    		<li onclick="(window.location.href='hotelDetail.html?id=${JDSJList[i].id}?key=${getKey}')">
						<img src="${QiNiu}${JDSJList[i].hotelsUrl}"/>
						<p>${JDSJList[i].hotelsName}</p>
						<h1>${JDSJList[i].hotelsType}</h1>
						
						<h3>
							<span class="poins" >${JDSJList[i].menuNum}</span>
							<span>
								<span>￥</span>
								<span style="font-size:18px; margin-left:-3px">${JDSJList[i].hotelsAddress}</span>
							</span>
							
							
							
						</h3>
					</li>

		    	`
		    }
		$(".search-list").html(JDSJStr)
		$("body,html").animate({/*scrollTop對象一般都是body和html*/
            "scrollTop":0
        },300)

        //显示分页
        laypage({
            cont: 'biuuu_city', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
            pages: data.data.JDSJ.pages, //通过后台拿到的总页数
            curr: curr || 1, //当前页
            skip: true, //是否开启跳页
    		skin: '#AF0000',
            jump: function(obj, first){ //触发分页后的回调
                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                    demo(obj.curr);
                }
            }
        });
    },
	error: function() {
		//请求出错处理
		}
	});	
    
};


///**********酒店套餐**************/
//	$.ajax({
//	type:"post",    //请求方式
//	url:myServer+jyj_detailsSelectAllHotels,
//	dataType:"json",
//	data:{
//		likeName:decodeURI(getId),
//		cityId:localStorage.getItem("city_id"),
//		hotelsType:""
//	},    //请求参数		
//	success: function(data) {
//		if(data.status=='503'){
//			window.location.href='error.html'
//		}
//		console.log("查询所有酒店",data.data)
//
//		let JDSJList=data.data.JDSJ.list
//
//
//		
//		let JDSJStr=""
//		    for(let i=0;i<JDSJList.length;i++){
//		    	JDSJStr+=`
//		    	
//		    		<li onclick="(window.location.href='hotelDetail.html?id=${JDSJList[i].id}')">
//						<img src="${QiNiu}${JDSJList[i].hotelsUrl}"/>
//						<p>${JDSJList[i].hotelsName}</p>
//						<h1>${JDSJList[i].hotelsType}</h1>
//						
//						<h3>
//							<span>￥</span>
//							<span style="display:block; width:190px">${JDSJList[i].hotelsPrice}</span>
//							<span class="poins" >${JDSJList[i].hotelsAddress}</span>
//							
//						</h3>
//					</li>
//
//		    	`
//		    }
//		$(".search-list").html(JDSJStr)
//
//		
//		
//
//
//	},
//	error: function() {
//		//请求出错处理
//		}
//	});
	
//搜索跳转
function goSearch(){
	
		window.location.href=encodeURI('searchHotel.html?id='+$(".searchV2").val()+"?key="+getKey);
	
}	
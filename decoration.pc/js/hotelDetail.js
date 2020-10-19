//上级传递过来的参数
	var getHref = window.location.href;
	let getId=getHref.split("?")[1].split("=")[1];
	let getKey=getHref.split("?")[2].split("=")[1];
//	alert(getKey)
/***************************热门酒店详情**********************************************/
	$.ajax({
	type:"post",    //请求方式
	url:myServer+jyj_detailsSelectHotelsDetails,
	dataType:"json",
	data:{
		hotelsId:getId
	},    //请求参数		
	success: function(data) {
		if(data.status=='503'){
			window.location.href='error.html'
		}
		console.log("热门酒店详情",data.data)
		
		/****************************导航标题***************************************/
		$(".hotelDetail-tag").html(data.data.JDXX.hotelsName)

		/****************************酒店详情图**************************************/
		let JDXQTStr=''
		let JDXQTlist=data.data.JDXQT
		if(JDXQTlist.length>=5){
			JDXQTlist=JDXQTlist.slice(0,5)
		}
		console.log("123123",JDXQTlist)
		if(JDXQTlist.length!=0){
			$(".hotHotel-showImg-content").html(`<img class="hotHotel-showImg" src="${QiNiu}${JDXQTlist[0].pictureUrl}"/>`)
			for(let i=0;i<JDXQTlist.length;i++){
			    	JDXQTStr+=`
						<img src="${QiNiu}${JDXQTlist[i].pictureUrl}"/>
			    	`
			}
		}
		//轮播图显示图
		
		$(".hotHotel-content1-list").html(JDXQTStr)
		imgMouseEnter()
		
		/****************************宴会菜单详情描述**************************************/
		
		let JDXXStr=''
		let JDXXData =data.data.JDXX
		$(".hotHotel-content2").html(`
				<h1>${JDXXData.hotelsName}</h1>
					<div class="hotHotel-content2-des">
						<h2>
							<i>￥</i>
							<span>${JDXXData.hotelsAddress}</span>
							<i>/m²</i>
						</h2>
						<h3>
							<i>类型</i>
							<span>${JDXXData.hotelsArea}</span>
							<i style="display:none">|</i>
							<i style="display:none">类型</i>
							<span style="display:none">${JDXXData.hotelsType}</span>
						</h3>
						<h4>
							<i>${JDXXData.hallNum}</i>
							<span>天装修工期</span>
							<em style="opacity:0">|</em>
							<i style="opacity:0">${JDXXData.menuNum}</i>
							<span style="opacity:0">套婚宴菜单</span>
							<em style="opacity:0">|</em>
							<i style="opacity:0">${JDXXData.tableNumber}</i>
							<span style="opacity:0">桌婚宴席</span>
						</h4>
						<h5 onclick="window.open('http://p.qiao.baidu.com/cps/chat?siteId=12777208&userId=26759148', '_blank')">
							<span >
								免费预约
							</span>
						</h5>
						<h6 style="opacity:0">
							<i>特</i>
							<span>angelbaby、邓伦电视剧取景</span>
						</h6>
						<h6>
							<i>独</i>
							<span>预约送优惠礼包</span>
						</h6>
						<h1>
							<span class="glyphicon glyphicon-map-marker"></span>
							<span>酒店地址：${JDXXData.menuNum}</span>
						</h1>
					</div>	
		
		`)
		
		
		/****************************宴会厅   **************************************/
		let YHTList=data.data.YHT
		let YHTStr=""
		    for(let i=0;i<YHTList.length;i++){
		    	YHTStr+=`
					<li onclick="showDialogValue('${YHTList[i].id}')">
						<img src="${QiNiu}${YHTList[i].hallUrl}"/>
						<div class="hotelDetail-list-des">
							<h1 style="opacity:0">${YHTList[i].hallName}</h1>
							<h2>
								<span>户型：</span>
								<span>${YHTList[i].hallName}</span>
							</h2>
							<h2>
								<span>面积：</span>
								<span>${YHTList[i].storeyHeight} m²</span>
							</h2>
							<h2>
								<span>造价：</span>
								<span>${YHTList[i].columnNum} 万</span>
							</h2>
							<h2>
								<span>风格：</span>
								<span>${YHTList[i].floorArea}</span>
							</h2>
						</div>
					</li>
		    	`
		    }
		$(".hotelDetail-list").html(YHTStr)
		
		/****************************宴会菜单**************************************/
		let HYCDList=data.data.HYCD
		let HYCDStr=""
		    for(let i=0;i<HYCDList.length;i++){
		    	HYCDStr+=`
					<div class="hotelDetail-menu">
						<div class="hotelDetail-menu-left">
							<p>${HYCDList[i].menuName}</p>
							<h1 class="hotelDetail-menu-squer">
								<div class="hotelDetail-menu-text">
									<span>￥</span>
									<i>${HYCDList[i].menuPrice}</i>
									<span>/桌</span>
								</div>
								
							</h1>
						</div>
						<div class="hotelDetail-menu-right">
							<p>${HYCDList[i].menuType}</p>
							<div class="hotelDetail-menu-detail">
								${dishNameStr(HYCDList[i].dishNameStr)}
							</div>
							<h1>${HYCDList[i].remarks}</h1>
						</div>
						
					</div>
		    	`
		    }
		$(".hotelDetail-menu-content").html(HYCDStr)
		
		/****************************宴会菜单**************************************/
		
		if(data.data.JDJS!=undefined){
			$(".hotelDetail-intro-msg p").html("<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>"+data.data.JDJS.content)
		}
		
		

		

		
	},
	error: function() {
		//请求出错处理
		}
	});


	
/***************************查询热门酒店  右侧的列表**********************************************/
$.ajax({
	type:"post",    //请求方式
	url:myServer+jyj_indexSelectHotHotels+getKey,
	dataType:"json",
	data:{

	},    //请求参数		
	success: function(data) {
		if(data.status=='503'){
			window.location.href='error.html'
		}
		console.log("查询热门酒店",data.data)
		
		let hotHotel=data.data

		let str=`<h1 class="hotel-kind-right-title" style="background:#23AF65">热门设计公司 </h1>`
		for(let i=0;i<hotHotel.length;i++){
			 str+=`
		    		<li onclick="(window.location.href='hotelDetail.html?id=${hotHotel[i].id}?key=${getKey}')">
						<h2>
							<span class="No1">${i+1}.</span>
							<span>${hotHotel[i].hotelsName}</span>
							
						</h2>
						<ul class="hotel-hot hotel-hot-gone">
							<li>
								<img src="${QiNiu}${hotHotel[i].hotelsUrl}"/>
								<div class="hotel-hot-detail">
									<p>风格:${hotHotel[i].hotelsPrice}</p>
									<p style="margin-top:-5px">类型:${hotHotel[i].hotelsArea}</p>
									<p  class="poins" style="width:85px;margin-top:-5px">位置:${hotHotel[i].menuNum}</p>
										
										
								</div>
							</li>
						</ul>
					</li>
		    `
		}
	
		
//		$(".hotel-kind-right").html('<h1 class="hotel-kind-right-title">热门婚宴酒店</h1>')
		
		$(".hotel-kind-right").html(str)

		hotelHover()
	},
	error: function() {
		//请求出错处理
		}
	});	
	
/*******************************************二级菜单*****************************************************/
	function dishNameStr(lists){
		let arr=lists.split('，')
		console.log("9999999",arr)
		let str=''
		for(let i=0;i<arr.length;i++){
			str+=`<span>${arr[i]}</span>`
		}
		return str
	}
	
			
			
//点击出现弹窗
		
function showDialogValue(idV){

	$(".dialog").css({'display':'block'})
/****************************宴会厅详情**************************************/
		
$.ajax({
	type:"post",    //请求方式
	url:myServer+jyj_detailsSelectBanquetHallDetails,
	dataType:"json",
	data:{
		banquetHallId:idV
	},    //请求参数		
	success: function(data) {
		if(data.status=='503'){
			window.location.href='error.html'
		}
		console.log("宴会厅详情",data.data)
		//弹窗操作
		showDialog()
		let YHXQTlist=data.data.YHXQT
		let allLength=YHXQTlist.length
		
		getBanner(YHXQTlist)	
		
		let YHTXQXXobj=data.data.YHTXQXX

		$(".dialog-banner-des").html(`
					<h1>
						<span>${YHTXQXXobj.hallName}</span>
						<span>(2)</span>
					</h1>
					<h2>
						<span>户型：</span>
						<i>${YHTXQXXobj.hallName}</i>
						
						<span>风格：</span>
						<i>${YHTXQXXobj.floorArea}</i>
						
						<span>面积：</span>
						<i>${YHTXQXXobj.storeyHeight}m²</i>
						
						<span>造价：</span>
						<i>${YHTXQXXobj.columnNum}万</i>
						
						<span>装修方式：</span>
						<i>${YHTXQXXobj.shape}</i>
						
						<span>装修工期：</span>
						<i>${YHTXQXXobj.tableNum}</i>
						
						<span>位置：</span>
						<i>${YHTXQXXobj.minimumConsumption}</i>

					</h2>	
		`)
	},
	error: function() {
		//请求出错处理
		}
	});	
}



/****************************************************JS特效**********************************************************************/
		function getBanner(lists){
			aList=lists
			allLength=aList.length
			let changeIndex=0
			if(aList.length==0){
				$('.dialog-banner-show').html('')
				
				
			}else{
				$('.dialog-banner-show').html(`<img src="${QiNiu}${aList[0].pictureUrl}"/>`)
			}
			
			
			let str=''
			for(let i=0;i<aList.length;i++){
				str+=`
					<img src="${QiNiu}${aList[i].pictureUrl}"/>
				`
			}
			$(".dialog-banner-list").html(str)
			$(".dialog-banner-list img").eq(0).addClass("dialog-banner-active")
			$(".dialog-banner-list img").click(function(){
				
				
				changeIndex=$(this).index()
				$('.dialog-banner-show').html(`<img src="${QiNiu}${aList[changeIndex].pictureUrl}"/>`)
				showBorder()
				console.log("index",changeIndex)
			})
			$(".banner-right").click(function(){
				if(allLength==0){
					return
				}
				
				changeIndex++
				if(changeIndex==allLength){
					changeIndex=0
				}
				$('.dialog-banner-show').html(`<img src="${QiNiu}${aList[changeIndex].pictureUrl}"/>`)
				showBorder()
				console.log("index",changeIndex)
			})
			$(".banner-left").click(function(){
				if(allLength==0){
					return
				}
				changeIndex--
				if(changeIndex<0){
					changeIndex=allLength-1
				}
				$('.dialog-banner-show').html(`<img src="${QiNiu}${aList[changeIndex].pictureUrl}"/>`)
				showBorder()
				console.log("index",changeIndex)
			})
			
			function showBorder(){
				$(".dialog-banner-list img").removeClass('dialog-banner-active')
				$(".dialog-banner-list img").eq(changeIndex).addClass("dialog-banner-active")
			}
		}
		
		//鼠标移入特效
		function hotelHover(){
			$(".hotel-kind-right li").find(".hotel-hot").css({"display":"none"})
			$(".hotel-kind-right li").eq(0).find(".hotel-hot").css({"display":"block"})
			$(".hotel-kind-title1 p").click(function(){
				$(".hotel-kind-title1 p").removeClass("hotel-title-active")
				$(this).addClass("hotel-title-active")
			})
			
			$(".hotel-kind-right li").mouseenter(function(){

				$(".hotel-kind-right li").find(".hotel-hot").css({"display":"none"})
				$(this).find(".hotel-hot").css({"display":"block"})

			}).mousemove(function (){  
            	$(this).find(".hotel-hot").css({"display":"block"})
        	});  
		}

//搜索跳转
function goSearch(){
	
		window.location.href=encodeURI('searchHotel.html?id='+$(".serachV").val()+"?key="+getKey);
	
}		
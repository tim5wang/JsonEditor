function jsonArea (inputEle,insert,nth){
	let thisare = new Object();
	if (!inputEle) {
		throw new Error('没有提供数据源.');
	}
	// 如果选择器指向多个元素
	if(nth){
		thisare.data = document.querySelectorAll(inputEle)[nth-1];
	}else{
		let all=document.querySelectorAll(inputEle);
		for(var i=0;i<all.length;i++){
			jsonArea (inputEle,insert,i+1)
		}
		thisare.data = document.querySelector(inputEle);
	}
	// 创建容器
	thisare.container = document.createElement('div');
    thisare.data.parentElement.insertBefore(thisare.container,thisare.data);
	// 判断字符串是否为json
	thisare.isJson = function (str) {
		if(!isNaN(str)) return false;
		if(str=="") return false;
		if(str=='""') return false;
	    if (typeof str == 'string') {
	        try {
	            JSON.parse(str);
	            return true;
	        } catch(e) {
//	            console.log(e);
	            return false;
	        }
	    }
	    console.log('不是一个stringify')    
	}
	// json数据
	thisare.jsonval="{}";
	// 编辑过程中改变后触发
	thisare.syn = function(){};
	// 判断是 textarea还是input	
	if(thisare.data.tagName == "TEXTAREA"){
		thisare.jsonval=thisare.data.innerHTML;
		thisare.syn = function(){
			thisare.data.innerHTML = JSON.stringify(thisare.jsonEditor.get());
		}
	}else if(thisare.data.tagName == 'INPUT'){
		thisare.jsonval=thisare.data.value;
		thisare.syn = function(){
			thisare.data.value=JSON.stringify(thisare.jsonEditor.get());
		}
	}
	// 里面不是json,并且不是插入，就不成为json编辑器
	thisare.hashJson = thisare.isJson(thisare.jsonval);
	if(!thisare.hashJson && !insert) return;
	thisare.data.style.display='none';
	// 为容器创建编辑器
	thisare.jsonEditor = new JSONEditor(thisare.container, {
		change: function () {
			thisare.lastChanged = thisare.jsonEditor;
			thisare.syn();
		}
	});
	if(thisare.hashJson){
		thisare.jsonEditor.set(JSON.parse(thisare.jsonval));
	}
	return thisare;
}


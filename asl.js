var ASL = {};
ASL = 
(function(){

	var selector = {};
	var utils = {addListener:null, removeListener:null};
	var showASLTimer;
	var options = {};
	var setup = function (){}
	var defaults = {};

	if(typeof window.addEventListener === 'function'){
		utils.addListener = function(el, type, callback,flag){
			if(flag === undefined) flag = false;
			el.addEventListener(type,callback,flag);
		}
	}else if(typeof window.attachEvent === 'function'){
		utils.addListener = function(el, type, callback){
			el.attachEvent(type,callback);
		} 
	}else{
		utils.addListener = function(el, type, callback){
			el['on'+type] = callback;
		}
	}
	
	selector.getSelected = function(e){
		var t = '';
		if(window.getSelection){
			t = window.getSelection();
		}else if(document.getSelection){
			t = document.getSelection();
		}else if(document.selection){
			t = document.selection.createRange().text;
		}
		return t;
	}

	selector.showASL = function(e){
		var str = String(selector.getSelected(e));
		if(str != ''){
			// trim spaces
			str = str.replace(/^\s+|\s+$/g,"");
			str = str.replace(/[\.\!\?\,\)\(\]\[\-\!]/g,"");
			var src = "http://cats.gatech.edu/cats/MySignLink/dictionary/html/pages/"+str.toLowerCase()+".htm";
            clearTimeout(showASLTimer);			
			var imgWrapper = document.getElementById("asl-img-wrapper");
			var html = "<div id='asl-wrapper' style='background-color:white; width: 240px; height:200px; right:10px; position:fixed; text-align:center; z-index:10; border: 1px solid #666;'><a style='position:absolute; top:2px; right:15px; z-index:20' href='"+src+"'>See More</a>";
			html += "<iframe id='asl-iframe' style='margin-right:10px;height:180px; width:220px; border:none' scrolling='no' name='asl-iframe' src='"+src+"'/>"
			html += "</div>	";

			imgWrapper.innerHTML = html;
			imgWrapper.style.display = 'block';
			
			document.getElementById('asl-iframe').style.display = 'none';
			
			var iframe = document.getElementById("asl-iframe");
			var loadImg = document.createElement('img');
			loadImg.setAttribute('id', 'asl-load-img');
			loadImg.setAttribute('src', 'http://naduism.com/hacks/ASL/loading.gif');
			loadImg.style.position = 'fixed';
			loadImg.style.right = '30px';
			loadImg.style.top = '50px';
			
			var aslWrapper = document.getElementById("asl-wrapper");
			aslWrapper.appendChild(loadImg);
						
			setTimeout(function(){
				var loadImg = document.getElementById('asl-load-img');
				aslWrapper.removeChild(loadImg); 
				document.getElementById('asl-iframe').style.display = 'inline';
			},1000);
			showASLTimer = setTimeout(function(){imgWrapper.style.display = 'none';},7500);
		}
	};
	
	var init = function(){
		utils.addListener(document, "dblclick", selector.showASL, false);
		var imgWrap = document.createElement('div');
		imgWrap.setAttribute('id', 'asl-img-wrapper');
		document.body.insertBefore(imgWrap,document.body.childNodes[0]);
		imgWrap.style.display = 'none';
		setup(options);
		//console.log(window.location);
	};
	window.onload = init;	



	return {
		setup: setup,
		options:options
	}

}());




			

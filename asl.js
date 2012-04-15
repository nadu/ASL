var ASL = {};
ASL = 
(function(){

	var selector = {};
	var utils = {addListener:null, removeListener:null};
	var showASLTimer;
	var options = {};
	var defaults = {displayTime: 86400, callback : function(){}};


	var init = function(){
		utils.addListener(document, "dblclick", selector.showASL, false);
		var imgWrap = document.createElement('div');
		imgWrap.setAttribute('id', 'asl-outer-container');
		document.body.insertBefore(imgWrap,document.body.childNodes[0]);
		imgWrap.style.display = 'none';
	};

	var setup = function (_options, callback){
		_options = _options || {};
		options.callback = callback || defaults.callback;
		options.displayTime = _options.displayTime ? _options.displayTime : defaults.displayTime;
		init();
	};

	// wrapping event handlers for all browsers
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
	
	// this returns the selected text
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

	// this gets called when a dblclick is done on the document
	selector.showASL = function(e){
		var str = String(selector.getSelected(e));
		var loadImg;


		if(str != ''){
			// trim spaces
			str = str.replace(/^\s+|\s+$/g,"");
			str = str.replace(/[\.\!\?\,\)\(\]\[\-\!]/g,"");
			var src = "http://cats.gatech.edu/cats/MySignLink/dictionary/html/pages/"+str.toLowerCase()+".htm";
            clearTimeout(showASLTimer);			
			var outerContainer = document.getElementById("asl-outer-container");
			var html = "<div id='asl-container'><a href='"+src+"'>See More</a>";
			html += "<iframe id='asl-iframe' frameBorder='0' scrolling='no' name='asl-iframe' src='"+src+"'/>"
			html += "</div>	";

			outerContainer.innerHTML = html;
			outerContainer.style.display = 'block';
			
			//hide iframe
			var iframe = document.getElementById("asl-iframe");
			iframe.style.display = 'none';

			var aslContainer = document.getElementById("asl-container");
			if(!loadImg){
				loadImg = document.createElement('img');
				loadImg.setAttribute('id', 'asl-load-img');
				loadImg.setAttribute('src', 'http://naduism.com/hacks/ASL/loading.gif');
				aslContainer.appendChild(loadImg);
			}else{
				loadImg.style.display = 'block';
			}

			setTimeout(function(){	
				loadImg.style.display = 'none';
				iframe.style.display = 'inline';
				options.callback.apply(null,[]);
			},1000);
			showASLTimer = setTimeout(function(){outerContainer.style.display = 'none';}, options.displayTime*1000);

		}
	};
	
	return {
		setup: setup,
		options:options
	}

}());




			

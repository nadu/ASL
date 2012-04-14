/**
			 * Copyright (c) 2009 Mark S. Kolich
			 * http://mark.kolich.com
			 *
			 * Permission is hereby granted, free of charge, to any person
			 * obtaining a copy of this software and associated documentation
			 * files (the "Software"), to deal in the Software without
			 * restriction, including without limitation the rights to use,
			 * copy, modify, merge, publish, distribute, sublicense, and/or sell
			 * copies of the Software, and to permit persons to whom the
			 * Software is furnished to do so, subject to the following
			 * conditions:
			 *
			 * The above copyright notice and this permission notice shall be
			 * included in all copies or substantial portions of the Software.
			 *
			 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
			 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
			 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
			 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
			 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
			 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
			 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
			 * OTHER DEALINGS IN THE SOFTWARE.
			 
			 This code was modified by Narayanan Ramakrishnan to create a user script that can show ASL representations for words
*/


(function(){
	var ASL = {};
	ASL.Selector = {};
	ASL.Selector.getSelected = function(e){
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

	ASL.Selector.mouseup = function(e){
		var str = String(ASL.Selector.getSelected(e));
		//console.log("in Kolich.Selector.mouseup" + pos.x +":"+pos.y);
		if(str != ''){
			// trim spaces
			str = str.replace(/^\s+|\s+$/g,"");
			str = str.replace(/[\.\!\?\,\)\(\]\[\-\!]/g,"");
            clearTimeout(showASLTimer);			
			document.getElementById("imgWrapper").innerHTML = 
			"<div id='aslWrapper' style='background-color:white; opacity=1; width: 240px; height:200px; right:10px; position:fixed; background-position:center;background-repeat:no-repeat; -moz-border-radius: 6px; z-index:1000; border: 2px black solid;'><div style='width:240px; height:200px; text-align:center'><iframe id='iframe-0' style='margin-left:-10px;' class=' iframe-delta-0' height='180' width='220' frameborder='0' scrolling='no' name='iframe-0' src='http://cats.gatech.edu/cats/MySignLink/dictionary/html/pages/"+str.toLowerCase()+".htm'/></div></div>";
			
			document.getElementById('imgWrapper').style.display = 'block';
			document.getElementById('iframe-0').style.display = 'none';
			
			var iframe = document.getElementById("iframe-0");
			var loadImg = document.createElement('img');
			var imgWrap = document.getElementById("imgWrapper");
			loadImg.setAttribute('id', 'loadImg');
			loadImg.setAttribute('src', 'http://naduism.com/hacks/ASL/loading.gif');
			loadImg.style.position = 'fixed';
			loadImg.style.right = '30px';
			loadImg.style.top = '50px';
			
			document.getElementById("aslWrapper").appendChild(loadImg);
			
			setTimeout(function(){
				var loadImg = document.getElementById('loadImg');
				document.getElementById("aslWrapper").removeChild(loadImg); 
				document.getElementById('iframe-0').style.display = 'inline';
			},1000);
			showASLTimer = setTimeout(function(){document.getElementById('imgWrapper').style.display = 'none';},7500);
		}
	};
	var showASLTimer;
			
	ASL.Selector.init = function(){
		console.log(ASL);
		if(document.addEventListener){
			document.addEventListener("mouseup", ASL.Selector.mouseup, true);
		}
		else if(document.attachEvent){
			document.attachEvent("mouseup", ASL.Selector.mouseup);
		}
		var imgWrap = document.createElement('div');
		imgWrap.setAttribute('id', 'imgWrapper');
		document.body.insertBefore(imgWrap,document.body.childNodes[0]);
		document.getElementById('imgWrapper').style.display = 'none';
		//console.log(window.location);
	};
	window.onload = ASL.Selector.init;	

}());




			

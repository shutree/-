/*
	对象方法插件：扩展jQuery的原型
 */

jQuery.prototype.lxzoom = function(options){
	// 这里的this指向：实例（jquery对象）

	var defaults = {
		// 大图区域宽高
		width:300,
		height:300,

		// 位置：right,bottom,left,top
		position:'right',

		// 大图小图间距
		gap:15
	}

	// 扩展参数
	var opt = $.extend({},defaults,options);


	/*
		小图相关
	 */
	// 获取小图容器
	var $small = this;
	// 添加特定样式
	$small.addClass('lx-zoom');

	// 获取小图
	var $smallImg = $small.children('img');


	// 获取大图url
	var bigUrl = $smallImg.attr('data-big');

	/*
		大图相关
	 */
	// 创建大图容器,并写入页面
	var $big = $('<div/>').addClass('lx-bigzoom').appendTo('body');
	var $bigImg = $('<img/>').attr('src',bigUrl).appendTo($big);

	// 大图与小图的比例
	var ratio;

	// 定义样式
	$big.css({
		width:opt.width,
		height:opt.height,
	});

	/*
		放大镜相关
	 */
	// 创建放大镜，并写入小图位置
	var $zoom = $('<div/>').addClass('zoom').appendTo($small);

	// 鼠标移入移出
	$small.on('mouseover',function(){
		$zoom.show();
		$big.show();

		// 计算大图与小图的比例
		ratio = $bigImg.outerWidth()/$smallImg.outerWidth();

	}).on('mouseout',function(){
		$zoom.hide();
		$big.hide();
	})

	// 鼠标移动
	.on('mousemove','img',function(e){
		// 计算left,top
		var left = e.pageX - $zoom.outerWidth()/2 - $small.offset().left;
		var top = e.pageY - $zoom.outerHeight()/2 - $small.offset().top;

		$zoom.css({
			left:left,
			top:top
		});


		// 移动大图
		$bigImg.css({
			left:-left*ratio,
			top:-top*ratio
		});
	})

}
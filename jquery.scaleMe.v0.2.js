(function($){
	$.fn.scaleMe = function(options) {
	
		var settings = {
			fadeSpeed: 500,
			fade: false,
			container: null,
			position: 'relative',
			onLoad: null,
			onError: null,
			onLoadAll: null
		}, len = this.length, eq = 0;
		
		this.hide();
		
		return this.each(function() {
			
			var src = this.src,
				img = $(this);

			eq++;

			if (options) {
				$.extend(settings, options);
			}
			
			var complete =  function() {
			
				if(settings.onLoad && typeof settings.onLoad === 'function') {
					settings.onLoad(img);
				}
			
				var parent = settings.container ? settings.container : img.parent(),
					imgW = img.width(),
					imgH = img.height(),
					parentW = parent.width(),
					parentH = parent.height();
				
				img.appendTo(parent);
					
				if(imgH > parentH && imgW > parentW) {
					img.css({
						maxHeight: '100%',
						maxWidth: '100%'
					});
				} else if(imgH > parentH) {
					img.css({
						maxHeight: '100%'
					});
				} else if(imgW > parentW) {
					img.css({
						maxWidth: '100%'
					});
				}
				
				if(settings.fade) {
					img.fadeIn(settings.fadeSpeed);
				} else {
					img.show();
				}

				img.css({
					position: settings.position,
					top: '50%',
					left: '50%',
					marginLeft: (img.width() / 2) * -1,
					marginTop: (img.height() / 2) * -1
				});

			};

			img.bind('load', complete);
			
			this.src = src;
			
			if(!this.complete) {
				var self = this,
					i = setInterval(function() {
						if(self.complete) {
							complete();
							clearInterval(i);
						}
					}, 500);
			}
			
			img.bind('error', function() {
			
				if(settings.onError && typeof settings.onError === 'function') {
					settings.onError(img);
				}
			
			});
			
			if(eq === len && settings.onLoadAll && typeof settings.onLoadAll === 'function') {
				settings.onLoadAll();
			}
		});

	};
})(jQuery);
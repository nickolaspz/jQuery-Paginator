(function() {
	this.Pagination = function() {
	    // Define option defaults
	    var defaults = {
    		pages: 1,
    		pageNumb: 0,
    		itemsPerPage: 24,
    		itemCount: 0,
    		list: [],
    		currentPageItems: [],
    		scrollTopOffset: 400,
    		element: null,
    		index: null,
    		displayItems: function(items) {
    			console.log('Display Item Function');
    			console.log(items);
    		}
	    }
	    
	    // Create options by extending defaults with the passed in arguments
	    if (arguments[0] && typeof arguments[0] === "object") {
	    	this.opts = extendDefaults(defaults, arguments[0]);
	    } else {
	    	this.opts = extendDefaults(defaults, null);
	    }
	};
	
	// Public Methods
	
	Pagination.prototype.setPageNumb = function(page) {
		this.opts.pageNumb = page;
	};
	
	Pagination.prototype.getPageNumb = function() {
		return this.opts.pageNumb;
	};
	
	Pagination.prototype.setPages = function(pages) {
		this.opts.pages = pages;
	};
	
	Pagination.prototype.getPages = function() {
		return this.opts.pages;
	};
	
	Pagination.prototype.setItemCount = function(count) {
		this.opts.itemCount = count;
	};
	
	Pagination.prototype.getItemCount = function() {
		return this.opts.itemCount;
	};
	
	Pagination.prototype.setItemsPerPage = function(items) {
		this.opts.itemsPerPage = items;
	};
	
	Pagination.prototype.getItemsPerPage = function() {
		return this.opts.itemsPerPage;
	};
	
	Pagination.prototype.setCurrentPageItems = function(items) {
		this.opts.currentPageItems = items;
    };
	
	Pagination.prototype.getCurrentPageItems = function() {
		return getCurrentPageItems.call(this);
    };
	
	Pagination.prototype.setList = function(list) {
		this.opts.list = list;
		this.opts.pageNumb = 0;
	};
	
	Pagination.prototype.getList = function() {
		return this.opts.list;
    };
	
	Pagination.prototype.render = function() {
		render.call(this);
	};
	
	// Private Methods
	
	// Utility method to extend defaults with user options
    function extendDefaults(source, properties) {
    	var property;
    	for (property in properties) {
	        if (properties.hasOwnProperty(property) && properties[property] != null) {
	        	source[property] = properties[property];
	        }
    	}
    	return source;
    }
    
    function _updateSettings() {
    	this.opts.itemCount = this.opts.list.length;
		this.opts.pages = Math.ceil(this.opts.itemCount / this.opts.itemsPerPage);
    }
    
    function displayPagination() {
    	if (this.opts.element != null) {
    		if (this.opts.element instanceof Array) {
    			for (var i in this.opts.element) {
    				$(this.opts.element[i]).empty();
                	$(this.opts.element[i]).html(createPagenationElement.call(this));
    			}
    		} else {
    			$(this.opts.element).empty();
            	$(this.opts.element).html(createPagenationElement.call(this));
    		}
    		displayCurrentItemRange.call(this);
    	}
    }
    
    function displayCurrentItemRange() {
    	var first = (this.opts.itemsPerPage * this.opts.pageNumb) + 1;
    	var last = (this.opts.itemsPerPage * this.opts.pageNumb) + this.opts.itemsPerPage < this.opts.itemCount ? 
				(this.opts.itemsPerPage * this.opts.pageNumb) + this.opts.itemsPerPage : this.opts.itemCount;
    	var currentItemsDisplayed = first + ' - ' + last + ' / ' + this.opts.itemCount;
    	
    	if (this.opts.index != null) {
    		if (this.opts.index instanceof Array) {
    			for (var i in this.opts.index) {
    				$(this.opts.index[i]).html(currentItemsDisplayed);
    			}
    		} else {
    			$(this.opts.index).html(currentItemsDisplayed);
    		}
    	}
    }
    
    function createPagenationElement() {
    	var currentPageNumber = this.opts.pageNumb + 1;
    	var pagenationContent;
    	var args = {};
    	
    	var ul = document.createElement('UL');
    	ul.className = 'pagination';
    	
    	if (this.opts.pages <= 1) {
    		return "";
    	}
    	
    	if (currentPageNumber != 1) {
    		args = {
    			li: {
    				onclick: 'previous'
    			}
    		};
    	} else {
    		args = {};
    	}
    	
    	ul.appendChild(_createPaginationListItem.call(this, args));
    	
    	var pagesToDisplay = [];
    	if (this.opts.pages <= 5) {
    		for (var i = 1; i <= this.opts.pages; i++) {
    			args = {};
    			if (i == currentPageNumber) {
    				args = {
    					a: {
    						id: 'activePageBtn',
    						content: i
    					}
    				};
    			} else {
    				args = {
    					a: {
    						onclick: 'goto',
    						content: i
    					}
    				};
    			}
    			
    			ul.appendChild(_createPaginationListItem.call(this, args));
    		}
    	} else {
    		if (currentPageNumber == 1 || currentPageNumber == 2) {
    			pagesToDisplay = ["1", "2", "3", "...", this.opts.pages];
    		} else if (currentPageNumber == this.opts.pages || currentPageNumber == (this.opts.pages - 1)) {
    			pagesToDisplay = ["1", "...", this.opts.pages - 2, this.opts.pages - 1, this.opts.pages];
    		} else {
    			pagesToDisplay = ["1", "...", currentPageNumber -1, currentPageNumber, currentPageNumber + 1, "...", this.opts.pages];
    		}
    		
    		for (var i = 0; i < pagesToDisplay.length; i++) {
    			var pageLink;
    			args = {};
    			if (pagesToDisplay[i] == "...") {
    				args = {
    					span: {
    						content: '...'
    					}
    				};
    			} else if (pagesToDisplay[i] == currentPageNumber) {
    				args = {
    					a: {
    						id: 'activePageBtn',
							content: pagesToDisplay[i]
    					}
    				};
    			} else {
    				args = {
    					a: {
    						onclick: 'goto',
							content: pagesToDisplay[i]
    					}
    				};
    			}
    			
    			ul.appendChild(_createPaginationListItem.call(this, args));
    		}
    	}

    	if (currentPageNumber != this.opts.pages) {
    		ul.appendChild(_createPaginationListItem.call(this, {
    			li: {
					onclick: 'next'
				}
			}));
    	} else {
    		ul.appendChild(_createPaginationListItem.call(this));
    	}
    	
    	return ul;
    }
    
    function _createPaginationListItem() {
    	var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    	
    	var li = document.createElement("li");
		li.className = 'page-item d-flex flex-column justify-content-center';
		
		var a = document.createElement("a");
		a.className = 'page-link';
		
		if (options.li != null) {
			if (options.li.onclick != null && options.li.onclick == 'next') {
				li.onclick = nextPage.bind(this, a);
			}
			
			if (options.li.onclick != null && options.li.onclick == 'previous') {
				li.onclick = previousPage.bind(this, a);
			}
		}
		
		if (options.a != null) {
			if (options.a.onclick != null && options.a.onclick == 'goto') {
				a.onclick = goToPage.bind(this, a, options.a.content);
			}
			
			if (options.a.content) {
				a.innerHTML = options.a.content;
			}
			
			if (options.a.id != null) {
				a.id = options.a.id;
			}
		}
		
		if (options.span != null) {
			a = document.createElement('span');
			a.innerHTML = options.span.content;
		}
		
		li.appendChild(a);
		return li;
    }
    
    function getCurrentPageItems() {
    	var firstAssetIndex = this.opts.pageNumb * this.opts.itemsPerPage; // inclusive index
    	var lastAssetIndex = firstAssetIndex + this.opts.itemsPerPage; // exclusive index
    	
    	// Making sure assetList is not empty
    	if (this.opts.list != null && this.opts.list.length > 0) { 
    		if (lastAssetIndex < this.opts.list.length) {
    			this.opts.currentPageItems = this.opts.list.slice(firstAssetIndex, lastAssetIndex);
    		} else {
    			this.opts.currentPageItems = this.opts.list.slice(firstAssetIndex);
    		}
    	} else {
    		return [];
    	}
    	
    	return this.opts.currentPageItems;
    }

    function scrollToTop() {
	 	$('html, body').animate({
	 		scrollTop: ($('body').offset().top)
	 	}, this.opts.scrollTopOffset);
    }
    
    function goToPage(pNumber) {
    	this.opts.pageNumb = pNumber - 1;
		render.call(this);
    }
    
    function nextPage() {
    	this.opts.pageNumb++;
    	render.call(this);
    }
    
    function previousPage() {
    	this.opts.pageNumb--;
    	render.call(this);
    }
    
    function render() {
    	_updateSettings.call(this);
    	
    	// Get items in list for current page
    	this.opts.currentPageItems = getCurrentPageItems.call(this);
		
		// Exec display items function
		this.opts.displayItems(this.opts.currentPageItems);
		
		// Scroll back to top of list
		scrollToTop.call(this);
		
		// Display pagination
		displayPagination.call(this);
    }
}( jQuery ));
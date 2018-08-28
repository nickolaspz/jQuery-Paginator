# jQuery-Paginator
ES5 jQuery Paginator with custom display function capabilities

## Default Settings
- pages: 1,
- pageNumb: 0,
- itemsPerPage: 24,
- itemCount: 0,
- list: [],
- currentPageItems: [],
- scrollTopOffset: 400,
- element: null,
- index: null,
- displayItems: : function(items) {
  console.log('Display Item Function');
  console.log(items);
}

## Public Methods
- setPageNumb: Set the current page number
- getPageNumb: Get the current page number
- setPages: Set the number of pages (by default this is calculated during render)
- getPages: Get the number of pages
- setItemCount: Set the number of items in your list (by default this is calculated during render)
- getItemCount: Get the number of items
- setItemsPerPage: Set the number of items per page (default is 24)
- getItemsPerPage: Get the number of items per page
- setCurrentPageItems: Set current page items to display (by default happens during render)
- getCurrentPageItems: Get current page items
- setList: Set list of items to paginate (resets page number to 0)
- getList: Get list of items
- render: Updates page count, item count, set current page items, executes displayItems(), invokes scrollToTop function and displays pagination on 'element'

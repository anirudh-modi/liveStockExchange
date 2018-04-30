(function(){
  function LiveStock_vm()
  {
    var self = this;

    self.isConnectedToServer = false;

    self.vmInstance = null;

    self.mainBodyContainer = document.getElementById('mainBodyContainer');
  }

  LiveStock_vm.prototype.setInitialState = function()
  {
    var self = this;

    self.setAppAsDisconnectedToServer();

    socketHandlerInstance.connectToServer();
  }
  LiveStock_vm.prototype.cleanMainBodyContainerAndDestroyInstance = function()
  {
    var self = this;

    $(self.mainBodyContainer).empty();

    if(self.vmInstance && self.vmInstance.destroy)
    {
      self.vmInstance.destroy();
    }

    ko.cleanNode(self.mainBodyContainer);
  };
  // This function will set the state of the app as connected to the server
  // and create an instance of StockDataList Vm which will be used to render
  // viewing of the stock list
  LiveStock_vm.prototype.setAppAsConnectedToServer = function()
  {
    var self = this;

    self.isConnectedToServer = true;

    self.cleanMainBodyContainerAndDestroyInstance();

    self.mainBodyContainer.innerHTML = document.getElementById('StockDataList').innerHTML;

    self.vmInstance = new StockDataList_vm();

    ko.applyBindings(self.vmInstance,document.getElementById('mainBodyContainer'));
  };

  // This function will set the state of the app as not connected to the server
  LiveStock_vm.prototype.setAppAsDisconnectedToServer = function()
  {
    var self = this;

    self.isConnectedToServer = false;

    self.cleanMainBodyContainerAndDestroyInstance();

    self.mainBodyContainer.innerHTML = document.getElementById('NotConnectedToServer').innerHTML;
  };

  ko.bindingHandlers['agoTimePattern'] =
	{
		update: function(element,valueAccessor,allBindings,viewModel)
		{
			var sysTime = ko.unwrap(valueAccessor());

			var createdAt = $(element).attr('ca');

			var previousText = $(element).text();

			var timeInAgoPattern = utility.getTimeInAgoPattern(sysTime,new Date(parseInt(createdAt)));

			if(previousText.toLowerCase()!==timeInAgoPattern.toLowerCase())
			{
				$(element).text(timeInAgoPattern);
			}

			ko.utils.domNodeDisposal.addDisposeCallback(element, function()
			{
				sysTime=null;
			});
		}
	};
  
  if(!window.LiveStockVmInstance)
  {
    ko.cleanNode(document.getElementById('mainContainer'));

    window.LiveStockVmInstance = new LiveStock_vm();

    ko.applyBindings(window.LiveStockVmInstance,document.getElementById('mainContainer'));

    window.LiveStockVmInstance.setInitialState();
  }
})();

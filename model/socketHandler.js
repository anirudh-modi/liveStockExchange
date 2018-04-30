"use strict";
(function() {
    function SocketHandler()
    {
        var self = this;

        self.socketHandler;
    }

    /**
    * Function to create a connection t the socket server
    * The reason writing a function, if the registration fails
    * then an uneccsary connection will be established
    */
    SocketHandler.prototype.connectToServer = function()
    {
        var self = this;

        self.socketHandler = io('http://52.87.164.228:3000/',{
          'reconnection':true
        });

        self.listenToEmits();
    };

    /**
    * Listening to emit form the server
    */
    SocketHandler.prototype.listenToEmits = function()
    {
        var self = this;

        self.socketHandler.on('connect',function()
        {
          LiveStockVmInstance.setAppAsConnectedToServer();
        });

        self.socketHandler.on('disconnect',function()
        {
          LiveStockVmInstance.setAppAsDisconnectedToServer();
            //window.location.reload();
        });

        self.socketHandler.on('data', function(data)
        {
          var newStocks = [];

          data.forEach(function(stock)
          {
            var stockDetail = {
              'name':stock[0],
              'price':stock[1]
            };

            var stockObservable = window.StockByNameCollection.collection[stockDetail.name.toLowerCase()];

            if(stockObservable)
            {
              stockObservable.updateStockDetail(stockDetail);
            }
            else
            {
              newStocks.push(stockDetail);
            }
          });

          if(newStocks.length)
          {
            StockByNameCollection.addToCollection(newStocks);
          }
        });
    };

    if(!window['socketHandlerInstance'])
    {
        window['socketHandlerInstance'] = new SocketHandler();
    }
})();

(function(){
  function StockByNameCollection()
  {
      var self = this;

      self.collection = {};

      self.subscribers = [];

      self.sysTime = ko.observable(new Date());

      setInterval(function(){
        self.updateSysTime();
      },5000);
  }

  StockByNameCollection.prototype.updateSysTime = function()
  {
    var self = this;

    self.sysTime(new Date());
  }

  StockByNameCollection.prototype.subscribe = function(sender,callback)
  {
      this.subscribers.push({sender:sender,callback:callback});
  }

  StockByNameCollection.prototype.unsubscribe = function(sender)
  {
    var self=this;

    self.subscribers.filter(function(value,index){
        if(value['sender'] === sender){
            self.subscribers.splice(index,1);
            return true;
        }
    })
  }

  StockByNameCollection.prototype.publish = function(stocks,event)
  {
      for(var i=0;i<this.subscribers.length;i++)
      {
          this.subscribers[i].callback(event,stocks);
      }
  };

  StockByNameCollection.prototype.addToCollection = function(stocks)
  {
    var self = this;

    var obsStocks = [];

    stocks.forEach(function(stock)
    {
        self.collection[stock.name] = new Stock(stock,self.sysTime);

        obsStocks.push(self.collection[stock.name]);
    });

    self.publish(obsStocks,'create');
  }

  window.StockByNameCollection = new StockByNameCollection();

})();

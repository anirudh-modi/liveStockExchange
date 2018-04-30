function StockDataList_vm()
{
  var self = this;

  self.alive = true;

  self.stockList = ko.observableArray([]);

  var sl = self.stockList();

  for(var i in window.StockByNameCollection.collection)
  {
    if(sl.indexOf(window.StockByNameCollection.collection[i])<0)
    {
      sl.push(window.StockByNameCollection.collection[i]);
    }
  }

  self.sortListByName(sl);

  self.stockList.valueHasMutated();

  window.StockByNameCollection.subscribe(self,function(event,stocks)
  {
    if(self.alive)
    {
      if(event==='create')
      {
        self.addToListAndSort();
      }
    }
  });
}

StockDataList_vm.prototype.addToListAndSort = function()
{
  var self = this;

  var sl = self.stockList();

  sl.length = 0;

  for(var i in window.StockByNameCollection.collection)
  {
    if(sl.indexOf(window.StockByNameCollection.collection[i])<0)
    {
      sl.push(window.StockByNameCollection.collection[i]);
    }
  }

  self.sortListByName(sl);

  self.stockList.valueHasMutated();
};

StockDataList_vm.prototype.sortListByName = function(stockListArray)
{
  stockListArray.sort(function(a,b)
  {
    if(a.name()>b.name())
    {
      return 1
    }
    else if(a.name()<b.name())
    {
      return -1;
    }
    else
    {
      return 0;
    }
  });
}


StockDataList_vm.prototype.destory = function()
{
  var self = this;

  window.StockByNameCollection.unsubsribe(self);

  for(var i in self)
  {
    self[i] = null;
  }

  console.log(window.StockByNameCollection);
}

function Stock(detail,sysTime)
{
  var self = this;

  self.name = ko.observable(detail['name']);

  self.price = ko.observable(detail['price']);

  self.lastPrice = ko.observable(detail['price']);

  self.monitorPriceReponse = ko.computed(function()
  {
    if(self.price()>self.lastPrice())
    {
      return 'green';
    }
    else if(self.price()<self.lastPrice())
    {
        return 'red';
    }
    else
    {
      return 'blue';
    }
  });

  self.isNew = ko.observable(true);

  self.createdAt = ko.observable(new Date());

  self.lastUpdatedAt =ko.observable(new Date());

  self.sysTime = sysTime;
}

Stock.prototype.updateStockDetail = function(stockDetail)
{
  var self = this;

  self.lastPrice(self.price());

  self.price(stockDetail['price']);

  self.isNew(false);

  self.lastUpdatedAt(new Date());
}

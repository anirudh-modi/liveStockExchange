var utility = {
  'getDateWithTime':function(dt)
    {
	    var date = new Date(dt);

      if(date == 0)
      {
          return 0;
      }
      var display;

      var monthShort = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

      var day = date.getDate(),
          month = date.getMonth(),
          year = date.getYear() - 100;

      var currentYear = new Date().getYear()-100;

      var _date = monthShort[month]+" "+day+", ";

      if(year <= 0)
      {
          year = date.getFullYear()+"  ";
      }
      else if(year == currentYear)
      {
          year = '';
      }
  		else
  		{
  			year = year+" ";
  		}

      _date+=year;

      var _time;

      var pHrs = date.getHours();

      var pMins = date.getMinutes();

      var ampm;

      if(pHrs > 12)
      {
          ampm = "p";
          pHrs -= 12;
      }
      else if(pHrs == 12)
      {
          ampm = "p";
      }
      else if(pHrs == 0)
      {
          pHrs += 12;
          ampm = "a";
      }
      else
      {
          ampm = "a";
      }

      if(pHrs < 10)
      {
          pHrs = pHrs;
      }
      if(pMins < 10)
      {
          pMins = "0"+pMins;
      }

      _time = pHrs+":"+pMins+ampm;

      display = _date+_time;
      
      //return "2:30 PM";
      return display;
    },
  'getTimeInAgoPattern':function(sysTime,createdTime) {
    var self = this;

		var sysTimeInMs,creationTimeInMs;

		if(ko.isObservable(sysTime))
		{
			sysTimeInMs = sysTime().getTime();
		}
		else
		{
			sysTimeInMs = sysTime.getTime();
		}

		if(ko.isObservable(createdTime))
		{
			creationTimeInMs = createdTime().getTime();
		}
		else
		{
			creationTimeInMs = createdTime.getTime();
		}

		var self = this;

		var diffOfSysAndCreatedInMs = sysTimeInMs - creationTimeInMs;

		var diffOfSACInMsModuloThousand = diffOfSysAndCreatedInMs / 1000;

		if (diffOfSACInMsModuloThousand < 60)
		{
			return 'Just now';
		}
		else if (diffOfSACInMsModuloThousand > 60 && diffOfSACInMsModuloThousand < 3600)
		{
			if (diffOfSACInMsModuloThousand / 60 < 2)
			{
				return ' 1 min ago';
			}
			else
			{
				return Math.floor(diffOfSACInMsModuloThousand / 60) + ' mins ago';
			}
		}
		else if (diffOfSACInMsModuloThousand > 3600 && diffOfSACInMsModuloThousand < 3600 * 12)
		{
			if ((diffOfSACInMsModuloThousand / 3600) < 2)
			{
				return ' 1 hr ago';
			}
			else
			{
				return Math.floor(diffOfSACInMsModuloThousand / 3600) + ' hrs ago';
			}
		}
		else
		{
			if(ko.isObservable(createdTime))
			{
				return self.getDateWithTime(createdTime(),1,1);
			}
			else
			{
				return self.getDateWithTime(createdTime,1,1);
			}
		}
	}
}

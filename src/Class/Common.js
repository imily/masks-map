class Common {
	static gererateBusinessHours(text) {
		return text.split('、');
	}

	static gererateTimeTable(list, type, icon) {
    // console.log(list);
		const week = {
			sunday: '',
			monday: '',
			tuesday: '',
			wednesday: '',
			thursday: '',
			friday: '',
			saturday: '',
		};
		list.forEach(item => {
			switch (item) {
				case `星期日${type}看診`:
					week.sunday = icon;
				  break;
				case `星期一${type}看診`:
					week.monday = icon;
				  break;
				case `星期二${type}看診`:
					week.tuesday = icon;
					break;
				case `星期三${type}看診`:
					week.wednesday = icon;
					break;
				case `星期四${type}看診`:
					week.thursday = icon;
					break;
				case `星期五${type}看診`:
					week.friday = icon;
					break;
				case `星期六${type}看診`:
					week.saturday = icon;
					break;
				default:
			  }
		});

		return week;
	}
}

export default Common;

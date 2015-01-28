var casper = require('casper').create({
    verbose: true,
    logLevel: "info",
	silentErrors: true,
	pageSettings: {
        loadImages:  false,
		loadPlugins: false }
});

var fs = require('fs');

//addr_path = 'prep_addr_uglyfied2.csv';
//addr = 'find=%EF%F0%EE%E5%E7%E4+%C7%E0%E3%EE%F0%FC%E5%E2%F1%EA%E8%E9+%E4.11';
//stat_link = 'http://gorod.mos.ru/?show=search&' + addr;

addr_path = (casper.cli.args[0] ) ? casper.cli.args[0] : 'prep_addr_uglyfied2.csv';
logpath = (casper.cli.has("log")) ?  casper.cli.get("log") : "logs/";

var write = function(args) {
 var debugcounter = new Date();
 var filename = (typeof args.name === "undefined") ?  "debug" + debugcounter.getTime() : args.name;
 var accessmode = (typeof args.mode === "undefined") ? "a" : args.mode;
 var data = (typeof args.data === "undefined") ? "NO DATA" : args.data;
 
 fs.write( logpath + filename + '.html',  data, {
  opts: {
    mode: accessmode, 
    charset: 'UTF-8' 
  }
	});
  
};
var get_data = function(selectors) {
	var data = "";
	for (var i=0; i < selectors.length; i++) {
		data = data + this.getHTML(selectors[i]).replace("\n"," ").replace("&nbsp;"," ").trim();
		}
	return data;
	};


var skip = function() {
	this.echo('Timeout reached, Not found!');
	};
	
var click_addr = function() {
		//		write({'data': this.getHTML()});	
				this.click('div.text a');
			}
var search_addr = function() {
				this.echo('Working on:   --------' + link);	
				house = {};
				this.waitForSelector('div.text a', click_addr, skip);
			}

var choose_addr_type = function() {		
				this.click('div[idcat="16"] > div > a');
			};

var get_house_data = function() {		
				
				// #descriptionBlockPart > div > div > table:nth-child(1) > tbody > tr:nth-child(3) > td.tab3-td-first
				try { 
				house.buildDate = this.getHTML('table.tab3 > tbody > tr:nth-child(2) > td.tab3-td-first').replace("/n"," ").trim() + ":" + this.getHTML('table.tab3 > tbody > tr:nth-child(2) > td:nth-child(2)').replace("/n"," ").trim(); } // 
				catch(err) {
					this.echo('No BuildDate!');
					}
					
				try { 
				house.edition = his.getHTML('table.tab3 > tbody > tr:nth-child(3) > td.tab3-td-first').trim() .replace("/n"," ").trim() + ":" + this.getHTML('table.tab3 > tbody > tr:nth-child(3) > td:nth-child(2)').replace("/n"," ").trim(); }
				catch(err) {
					this.echo('No edition!');
					}
					
				try { 				
				house.floors = this.getHTML('table.tab3 > tbody > tr:nth-child(4) > td.tab3-td-first').trim() .replace("/n"," ").trim() + ":" + this.getHTML('table.tab3 > tbody > tr:nth-child(4) > td:nth-child(2)').replace("/n"," ").trim(); }
				catch(err) {
					this.echo('No floors!');
					}
					
				
				// #descriptionBlockPart > div > div > table:nth-child(1) > tbody > tr:nth-child(5) > td.tab3-td-first
				try { 
				house.totalMetres = this.getHTML('table.tab3 > tbody > tr:nth-child(5) > td.tab3-td-first').trim() .replace("/n"," ").trim() + ":" + this.getHTML('table.tab3 > tbody > tr:nth-child(5) > td:nth-child(2)').replace("/n"," ").trim(); }
				catch(err) {
					this.echo('No Metres!');
					}
					
				
				// #descriptionBlockPart > div > div > table:nth-child(1) > tbody > tr:nth-child(6) > td.tab3-td-first
				try { 
				house.flats =  this.getHTML('table.tab3 > tbody > tr:nth-child(6) > td.tab3-td-first').trim() .replace("/n"," ").trim() + ":" + this.getHTML('table.tab3 > tbody > tr:nth-child(6) > td:nth-child(2)').replace("/n"," ").trim(); }
				catch(err) {
					this.echo('No flats!');
					}
					
				
				// #descriptionBlockPart > div > div > table:nth-child(1) > tbody > tr:nth-child(7) > td.tab3-td-first
				try { 
				house.livingSpace = this.getHTML('table.tab3 > tbody > tr:nth-child(7) > td.tab3-td-first').trim() .replace("/n"," ").trim() + ":" + this.getHTML('table.tab3 > tbody > tr:nth-child(7) > td:nth-child(2)').replace("/n"," ").trim(); }
				catch(err) {
					this.echo('No living space!');
					}
					
				try { 
				house.nonLivingSpace = this.getHTML('table.tab3 > tbody > tr:nth-child(8) > td.tab3-td-first').trim() .replace("/n"," ").trim() + ":" + this.getHTML('table.tab3 > tbody > tr:nth-child(8) > td:nth-child(2)').replace("/n"," ").trim(); }
				catch(err) {
					this.echo('No workspace!');
					}
					
				try { 
				house.porch = this.getHTML('table.tab3 > tbody > tr:nth-child(9) > td.tab3-td-first').trim() .replace("/n"," ").trim() + ":" + this.getHTML('table.tab3 > tbody > tr:nth-child(9) > td:nth-child(2)').replace("/n"," ").trim(); }
				catch(err) {
					this.echo('No porches!');
					}
					
				try { 
				house.smallElevators = this.getHTML('table.tab3 > tbody > tr:nth-child(10) > td.tab3-td-first').trim() .replace("/n"," ").trim() + ":" + this.getHTML('table.tab3 > tbody > tr:nth-child(10) > td:nth-child(2)').replace("/n"," ").trim(); }
				catch(err) {
					this.echo('No small elevators!');
					}
					
				try { 
				house.bigElevators = this.getHTML('table.tab3 > tbody > tr:nth-child(11) > td.tab3-td-first').trim() .replace("/n"," ").trim() + ":" + this.getHTML('table.tab3 > tbody > tr:nth-child(11) > td:nth-child(2)').replace("/n"," ").trim(); }
				catch(err) {
					this.echo('No big elevators!');
					}
					
				
				// #descriptionBlockPart > div > div > table:nth-child(1) > tbody > tr:nth-child(12) > td.tab3-td-first
				try { 
				house.material = this.getHTML('table.tab3 > tbody > tr:nth-child(12) > td.tab3-td-first').trim() .replace("/n"," ").trim() + ":" + this.getHTML('table.tab3 > tbody > tr:nth-child(12) > td:nth-child(2)').replace("/n"," ").trim(); }
				catch(err) {
					this.echo('No Material!');
					}
					
								
				// ”правление
				this.click('#sidebar-r > div > div > div.tub-box > a:nth-child(4)');
			}
			
var got_to_house = function() {
		//		this.echo(this.getCurrentUrl());			
				house.addr = this.getTitle().trim();			
				house.link = this.getCurrentUrl().trim();
				this.waitForSelector('table.tab3 > tbody > tr:nth-child(4)', get_house_data, skip);
				};
			
var get_governor_data = function() {
				try {
				house.governor = this.getHTML('div.p3 > div > a.h4').trim();		
					}
				catch(err) {
					this.echo('No Governor!');
					}
				// Go to next step
				this.click("#sidebar-r > div > div > div.tub-box > a:nth-child(5)");	
			}			

var got_to_governor = function() {	
			//	this.echo(this.getCurrentUrl());
				this.waitForSelector('div.p3 > div > a.h4', get_governor_data, skip);
				
			}

var get_ongoing_data = function() {
				try {
				house.failedRepairs = this.getHTML('#houseWorks > table > tbody > tr:nth-child(3) > td:nth-child(1)').replace("/n"," ").trim() + this.getHTML('#houseWorks > table > tbody > tr:nth-child(3) > td.icon-elements').replace("/n"," ").trim();
					}
				catch(err) {
					this.echo('No Failed Repairs!');
					}
				
				try {
				house.failedCommunal = this.getHTML('#houseWorks > table > tbody > tr:nth-child(4) > td:nth-child(1)').replace("/n"," ").trim() + this.getHTML('#houseWorks > table > tbody > tr:nth-child(4) > td.icon-elements').replace("/n"," ").trim();
					}
				catch(err) {
					this.echo('No Failed Communals!');
					}
				// Go to next step							
				this.click("#sidebar-r > div > div > div.tub-box > a:nth-child(7)");
				
			}
			
var got_to_ongoing = function() {
				this.waitForSelector('#houseWorks > table > tbody > tr:nth-child(3) > td:nth-child(1)',get_ongoing_data, skip);
			}
			
var get_message_data =  function()  {
				try {
				house.messages = this.getHTML('#combo1 > span').match(/\(([0-9]+) /g)[0].replace("(","").trim();
					}
				catch(err) {
					this.echo('No Messages!');
					}
							
			}
			
var got_to_messages = function() {
				this.waitForSelector('#combo1 > span',get_message_data, skip);
		
			};			
			
var up_counter = function() {
				write({'data': JSON.stringify(house), 'name': counter2 + 'all', 'mode': 'w'});
				counter2++;
			};			

var is_test = function(counter, max_num) {
	if (casper.cli.has("test"))	{
		if (counter <= max_num) {
			return true; }
		else {
			return false; }		
		}
	else {
		return true;
	};
}

			
// precaution for testing - not to run all addrs
counter = 1;
max_num = 5;
counter2 = 1;

casper.start();

if (casper.cli.args.length === 0) {
	casper.echo('No address file found!').exit();
	}

if (fs.exists(addr_path)) {
	var addr_file = fs.open(addr_path, { mode: 'r'});	

	while(!addr_file.atEnd() && ( !casper.cli.has("test") || counter <= max_num ))  { // precaution for testing - not to run all addrs
		
		console.log(counter);
		
		var link = addr_file.readLine(); 
		var house = {};
		
		casper.thenOpen(link);
		
		casper.then(search_addr);			
		
		casper.then(choose_addr_type);

		casper.then(got_to_house);			
	
		casper.then(got_to_governor);
			
		casper.then(got_to_ongoing);
		
		casper.then(got_to_messages);
		
		casper.then(up_counter);
		
		counter++;
		
	}


	addr_file.close();

}
else {
	casper.echo('Could not find address file!').exit();
}

casper.run();
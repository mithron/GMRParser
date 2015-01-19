var casper = require('casper').create({
    verbose: true,
    logLevel: "debug",
	silentErrors: true,
	pageSettings: {
        loadImages:  true,
		loadPlugins: true }
});

var fs = require('fs');

var debugcounter = new Date();
logpath = "logs/";

var log = function() {
	this.echo(this.getCurrentUrl());
	this.echo(this.getTitle());
	write({'data': this.getHTML()});
}


var skip = function() {
	console.log('Timeout reached, Not found!');
	};

var write = function(args) {
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

addr_path = 'prep_addr_uglyfied2.csv';

addr = 'find=%EF%F0%EE%E5%E7%E4+%C7%E0%E3%EE%F0%FC%E5%E2%F1%EA%E8%E9+%E4.11';
stat_link = 'http://gorod.mos.ru/?show=search&' + addr;



// precaution for testing - not to run all addrs
counter = 1;
max_num = 5;

counter2 = 1;

casper.start();

if (fs.exists(addr_path)) {
	var addr_file = fs.open(addr_path, { mode: 'r'});
	while(!addr_file.atEnd() && counter <= max_num)  { // precaution for testing - not to run all addrs
		
		console.log(counter);
		
		var link = addr_file.readLine(); 
		var house = {};
		
		casper.thenOpen(link);
		
		casper.then(function search_addr() {
				this.echo('Working on:   --------' + link);	
				house = {};
				this.waitForSelector('div.text a', function click_addr() {
		//		write({'data': this.getHTML()});	
				this.click('div.text a');
			}, skip);

			});			
		
		casper.then(function choose_addr_type() {
		//		write({'data':  this.getHTML()});	
		//		this.echo(this.getCurrentUrl());
		//		this.echo(this.getTitle());
				this.click('div[idcat="16"] > div > a');
			});

		casper.then(function got_to_house() {
		//		write({'data':  this.getHTML()});	
				this.echo(this.getCurrentUrl());			
				house.addr = this.getTitle().trim();			
				house.link = this.getCurrentUrl().trim();
				this.waitForSelector('table.tab3 > tbody > tr:nth-child(4)', function get_house_data() {		
				
				// #descriptionBlockPart > div > div > table:nth-child(1) > tbody > tr:nth-child(3) > td.tab3-td-first
				try { 
				house.buildDate = this.getHTML('table.tab3 > tbody > tr:nth-child(2) > td.tab3-td-first').replace("/n"," ").trim() + ":" + this.getHTML('table.tab3 > tbody > tr:nth-child(2) > td:nth-child(2)').replace("/n"," ").trim(); }
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
			}, skip);

				});
			
	
		casper.then(function got_to_governor() {
		//		write({'data':  this.getHTML()});	
				this.echo(this.getCurrentUrl());
				this.waitForSelector('div.p3 > div > a.h4', function get_governor_data() {
				try {
				house.governor = this.getHTML('div.p3 > div > a.h4').trim();		
					}
				catch(err) {
					this.echo('No Governor!');
					}
				this.click("#sidebar-r > div > div > div.tub-box > a:nth-child(5)");	
			}, skip);
				
			});
			
		casper.then(function got_to_ongoing() {
				this.waitForSelector('#houseWorks > table > tbody > tr:nth-child(3) > td:nth-child(1)', function get_ongoing_data() {
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
											
				this.click("#sidebar-r > div > div > div.tub-box > a:nth-child(7)");	
			}, skip);
			});
		
		casper.then(function got_to_messages() {
				this.waitForSelector('#combo1 > span', function get_ongoing_data() {
				try {
				house.messages = this.getHTML('#combo1 > span').match(/\(([0-9]+) /g)[0].replace("(","").trim();
					}
				catch(err) {
					this.echo('No Messages!');
					}
							
			}, skip);
		
			});
		
		casper.then(function up_counter(){
				write({'data': JSON.stringify(house), 'name': counter2 + 'all', 'mode': 'w'});
				counter2++;
			});
		
		counter++;
		
	}


addr_file.close();

}


casper.run();
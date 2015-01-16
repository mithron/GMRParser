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

var log = function(){
	this.echo(this.getCurrentUrl());
	this.echo(this.getTitle());
	write({'data': this.getHTML()});
}


// precaution for testing - not to run all addrs
counter = 1;
max_num = 6;

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
			});
			
		casper.waitForSelector('div.text a', function click_addr() {
		//		write({'data': this.getHTML()});	
				this.click('div.text a');
			}, skip);

		casper.then(function choose_addr_type() {
		//		write({'data':  this.getHTML()});	
				this.echo(this.getCurrentUrl());
		//		this.echo(this.getTitle());
				this.click('div[idcat="16"] > div > a');
			});

		casper.then(function got_to_house() {
		//		write({'data':  this.getHTML()});	
				this.echo(this.getCurrentUrl());
			//	this.echo(this.getTitle());
				house.addr = this.getTitle();
			//	write({'data': this.getTitle(), 'name': counter2 + 'addr', 'mode': 'a'});
				house.link = this.getCurrentUrl();
			//	write({'data': this.getCurrentUrl(), 'name': counter2 + 'link', 'mode': 'a'});
				});
				
		// этажность #descriptionBlockPart > div > div > table:nth-child(1) > tbody > tr:nth-child(4) > td.tab3-td-first 
		casper.waitForSelector('table.tab3 > tbody > tr:nth-child(4)', function get_house_data() {		
				house.floors = this.getHTML('table.tab3 > tbody > tr:nth-child(4)');
		//		write({'data':  this.getHTML('table.tab3 > tbody > tr:nth-child(4)'), 'name': counter2 + 'floors' , 'mode': 'a' });				
				// ”правление
				this.click('#sidebar-r > div > div > div.tub-box > a:nth-child(4)');
			}, skip);

		casper.then(function go_to_governor() {
		//		write({'data':  this.getHTML()});	
				this.echo(this.getCurrentUrl());
		//		this.echo(this.getTitle());
			});
	
		casper.waitForSelector('div.p3 > div > a.h4', function get_governor_data() {
				house.governor = this.getHTML('div.p3 > div > a.h4');
		//		write( {'data': this.getHTML('div.p3 > div > a.h4'), 'name': counter2 + 'governor' , 'mode': 'a' } );
			}, skip);
		
		casper.then(function up_counter(){
				write({'data': JSON.stringify(house), 'name': counter2 + 'all', 'mode': 'w'});
				counter2++;
			});
		
		counter++;
		
	}


addr_file.close();

}


casper.run();
#GMRParser
Casper.js script for http://gorod.mos.ru data extraction and some tools for it. Contains Moscow addresses data from hubofdata.ru (big thanks to them) and python script to uglify it to make it work as search string in gorod.mos.ru http address space. 
#Prequisitions
You need to install phantom.js and casper.js . Next, you need to prepare a list of addresses in Moscow to search gorod.mos.ru with.  That list then has to be converted with python script (or any script you write youself) to uglified state (UTF-8 encoded as cp-1251 and then urlencoded) gorod.mos.ru demands. 
#State
Working proto. In current state the script correctly takes addresses from supplied list and saves data for the address in separate file for each address. 
#Running
In command promt:
casperjs direct.js
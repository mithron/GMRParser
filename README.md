#GMRParser
Casper.js script for http://gorod.mos.ru data extraction and some tools for it. Contains Moscow addresses data from hubofdata.ru (big thanks to them) and python script to uglify it to make it work as search string in gorod.mos.ru http address space. 

Скрипт для выполнения в среде CasperJS с целью получения данных о домах города с портала "Мой город" gorod.mos.ru . Также репозиторий содержит вспомогальные данные - базу адресов из открытого датасета http://hubofdata.ru/dataset/mos-buildings-years и скрипт на языке python для приведения их к требуемому gorod.mos.ru виду.

#Prequisitions
You need to install phantomjs and casperjs . The script was developed with casperjs 1.1.0-beta3 and phantomjs 1.9.8. Next, you need to prepare a list of addresses in Moscow to search gorod.mos.ru with.  That list then has to be converted with python script (or any script you write youself) to uglified state (UTF-8 encoded as cp-1251 and then urlencoded) gorod.mos.ru demands. 

Для работы скрипта требуется установить casperjs и phantomjs . При разработке использовался casperjs 1.1.0-beta3 и phantomjs 1.9.8. Также требуется подготовить список адресов для работы скрипта и сконвертировать его в нужный формат (utf-8, закодированный как cp1251 и затем зауученный).

#State
Working proto. In current state the script correctly takes addresses from supplied list and saves data for the address in separate file for each address. Also, currently works not with addresses but with gorod.mos.ru search links (though they are made from addresses by supplied python script).

На данный момент скрипт пробегается по адресам из списка поставки и сохраняет данные о домах в файлы по одному файлу на дом. Работает на данный момент не с адресами, а со ссылками на поиск адреса на сайте gorod.mos.ru. Список ссылок делается из списка адресов все тем же скриптом на python. 

#Running
In command promt:
casperjs direct.js addr_file [--test]
where: 
  addr_file - path to file containing gorod.mos.ru search links
  --test - for test run with first five links

Запускается путем вызова в коммандном режиме:
casperjs direct.js addr_file [--test]
  addr_file - фаил со ссылками на gorod.mos.ru
  --test - задает запуск в режиме теста (только первые 5 ссылок)

__author__ = 'II'
# encoding: UTF-8

import csvkit
import urllib

'''Func to get addr from moscow-buildings.csv (from reformazkh, from hubofdata.ru dataset of buildings age)
 we must from 'проезд Загорьевский д.11' get '%EF%F0%EE%E5%E7%E4%20%C7%E0%E3%EE%F0%FC%E5%E2%F1%EA%E8%E9%20%E4.11' '''

def reencode(file):
    for line in file:
        yield line.decode('windows-1251').encode('utf-8')

def get_addr_from_moscow_buildings():
    with open("prep_addr_uglyfied2.csv", "w") as write_file:
        addr_writer = csvkit.writer(write_file)
        with open("moscow-buildings.csv", 'r') as read_file:
            buildings_reader = csvkit.reader(read_file,  delimiter=",")
            buildings_reader.next()
            for row in buildings_reader:
                # it's crucial to make error in encoding - the gorod.mos.ru search makes that error
                addr_writer.writerow(['http://gorod.mos.ru/?show=search&'+urllib.urlencode({'find': row[3].encode('windows-1251')})])



get_addr_from_moscow_buildings()
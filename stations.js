
var simpleStationsList = [
["NS1", "NS2", "NS3", "NS4", "NS5", "NS7", "NS8", "NS9", "NS10", "NS11", "NS12", "NS13", "NS14", "NS15", "NS16", "NS17", "NS18", "NS19", "NS20", "NS21", "NS22", "NS23", "NS24", "NS25", "NS26", "NS27", "NS28",],
["NE1", "NE3", "NE4", "NE5", "NE6", "NE7", "NE8", "NE9", "NE10", "NE11", "NE12", "NE13", "NE14", "NE15", "NE16", "NE17",],
["TE1", "TE2", "TE3",],
["DT1", "DT2", "DT3", "DT5", "DT6", "DT7", "DT8", "DT9", "DT10", "DT11", "DT12", "DT13", "DT14", "DT15", "DT16", "DT17", "DT18", "DT19", "DT20", "DT21", "DT22", "DT23", "DT24", "DT25", "DT26", "DT27", "DT28", "DT29", "DT30", "DT31", "DT32", "DT33", "DT34", "DT35",],
["EW1", "EW2", "EW3", "EW4", "EW5", "EW6", "EW7", "EW8", "EW9", "EW10", "EW11", "EW12", "EW13", "EW14", "EW15", "EW16", "EW17", "EW18", "EW19", "EW20", "EW21", "EW22", "EW23", "EW24", "EW25", "EW26", "EW27", "EW28", "EW29", "EW30", "EW31", "EW32", "EW33",],
["CG", "CG1", "CG2", ],
["CC1", "CC2", "CC3", "CC4", "CC5", "CC6", "CC7", "CC8", "CC9", "CC10", "CC11", "CC12", "CC13", "CC14", "CC15", "CC16", "CC17", "CC19", "CC20", "CC21", "CC22", "CC23", "CC24", "CC25", "CC26", "CC27", "CC28", "CC29",],
["CE1", "CE2", ],
["BP1", "BP6",],
//["STC", "PTC", "PE4", "RTS"]
]

stationsMap = {


"Jurong East":["NS1", "EW24"],
"Bukit Batok":["NS2"],
"Bukit Gombak":["NS3"],

"Choa Chu Kang":["NS4", "BP1"],
"Yew Tee":["NS5"],

"Kranji":["NS7"],
"Marsiling":["NS8"],
"Woodlands":["NS9", "TE2"],

"Admiralty":["NS10"],
"Sembawang":["NS11"],
"Canberra":["NS12"],
"Yishun":["NS13"],
"Khatib":["NS14"],
"Yio Chu Kang":["NS15"],
"Ang Mo Kio":["NS16"],
"Bishan":["NS17", "CC15"],
"Braddell":["NS18"],
"Toa Payoh":["NS19"],
"Novena":["NS20"],
"Newton":["NS21", "DT11"],
"Orchard":["NS22"],
"Somerset":["NS23"],
"Dhoby Ghaut":["NS24", "NE6", "CC1"],
"City Hall":["NS25", "EW13"],
"Raffles Place":["NS26", "EW14"],
"Marina Bay":["NS27", "CE2"],
"Marina South Pier":["NS28"],

"Pasir Ris":["EW1"],
"Tampines":["EW2", "DT32"],
"Simei":["EW3"],
"Tanah Merah":["EW4", "CG"],
"Bedok":["EW5"],
"Kembangan":["EW6"],
"Eunos":["EW7"],
"Paya Lebar":["EW8", "CC9"],
"Aljunied":["EW9"],
"Kallang":["EW10"],
"Lavender":["EW11"],
"Bugis":["EW12", "DT14"],
"City Hall":["EW13", "NS25"],
"Raffles Place":["EW14", "NS26"],
"Tanjong Pagar":["EW15"],
"Outram Park":["EW16", "NE3"],
"Tiong Bahru":["EW17"],
"Redhill":["EW18"],
"Queenstown":["EW19"],
"Commonwealth":["EW20"],
"Buona Vista":["EW21", "CC22"],
"Dover":["EW22"],
"Clementi":["EW23"],
"Jurong East":["EW24", "NS1"],
"Chinese Garden":["EW25"],
"Lakeside":["EW26"],
"Boon Lay":["EW27"],
"Pioneer":["EW28"],
"Joo Koon":["EW29"],
"Gul Circle":["EW30"],
"Tuas Crescent":["EW31"],
"Tuas West Road":["EW32"],
"Tuas Link":["EW33"],

"Expo":["CG1", "DT35"],
"Changi Airport":["CG2"],

"HarbourFront":["NE1", "CC29"],


"Outram Park":["NE3", "EW16"],
"Chinatown":["NE4", "DT19"],
"Clarke Quay":["NE5"],
"Dhoby Ghaut":["NE6", "NS24", "CC1"],
"Little India":["NE7", "DT12"],
"Farrer Park":["NE8"],
"Boon Keng":["NE9"],
"Potong Pasir":["NE10"],
"Woodleigh":["NE11"],
"Serangoon":["NE12", "CC13"],
"Kovan":["NE13"],
"Hougang":["NE14"],
"Buangkok":["NE15"],
"Sengkang":["NE16", "STC"],

"Punggol":["NE17", "PTC"],



"Dhoby Ghaut":["CC1", "NS24", "NE6"],
"Bras Basah":["CC2"],
"Esplanade":["CC3"],
"Promenade":["CC4", "DT15"],
"Nicoll Highway":["CC5"],
"Stadium":["CC6"],
"Mountbatten":["CC7"],
"Dakota":["CC8"],
"Paya Lebar":["CC9", "EW8"],
"MacPherson":["CC10", "DT26"],
"Tai Seng":["CC11"],
"Bartley":["CC12"],
"Serangoon":["CC13", "NE12"],
"Lorong Chuan":["CC14"],
"Bishan":["CC15", "NS17"],
"Marymount":["CC16"],
"Caldecott":["CC17"],

"Botanic Gardens":["CC19", "DT9"],//Botanic Gardens • Kebun Bunga
"Farrer Road":["CC20"],
"Holland Village":["CC21"],
"Buona Vista":["CC22", "EW21"],

"one-north":["CC23"],
"Kent Ridge":["CC24"],
"Haw Par Villa":["CC25"],
"Pasir Panjang":["CC26"],
"Labrador Park":["CC27"],
"Telok Blangah":["CC28"],
"HarbourFront":["CC29", "NE1"],





"Bayfront":["CE1", "DT16"],
"Marina Bay":["CE2", "NS27"],


"Bukit Panjang":["DT1", "BP6"],
"Cashew":["DT2"],
"Hillview":["DT3"],

"Beauty World":["DT5"],
"King Albert Park":["DT6"],
"Sixth Avenue":["DT7"],
"Tan Kah Kee":["DT8"],
"Botanic Gardens":["DT9", "CC19"],
"Stevens":["DT10"],
"Newton":["DT11", "NS21"],
"Little India":["DT12", "NE7"],
"Rochor":["DT13"],
"Bugis":["DT14", "EW12"],
"Promenade":["DT15", "CC4"],
"Bayfront":["DT16", "CE1"],
"Downtown":["DT17"],
"Telok Ayer":["DT18"],
"Chinatown":["DT19", "NE4"],
"Fort Canning":["DT20"],
"Bencoolen":["DT21"],
"Jalan Besar":["DT22"],
"Bendemeer":["DT23"],
"Geylang Bahru":["DT24"],
"Mattar":["DT25"],
"MacPherson":["DT26", "CC10"],
"Ubi":["DT27"],
"Kaki Bukit":["DT28"],
"Bedok North":["DT29"],
"Bedok Reservoir":["DT30"],
"Tampines West":["DT31"],
"Tampines":["DT32", "EW2"],

"Tampines East":["DT33"],
"Upper Changi":["DT34"],
"Expo":["DT35", "CG1"],




"Woodlands North":["TE1", "RTS"],
"Woodlands":["TE2", "NS9"],

"Woodlands South":["TE3"],






"Caldecott":["CC17"],


"Stevens":["DT10"],


"Orchard":["NS22"],


"Outram Park":["EW16", "NE3"],


"Marina Bay":["NS27", "CE2"],

















"Changi Airport":["CG2"],
"Expo":["CG1", "DT35"],
"Tanah Merah":["EW4", "CG"],


"Choa Chu Kang":["NS4", "BP1"],






"Boon Lay":["EW27"],







"Jurong East":["NS1", "EW24"],
















"Pasir Ris":["EW1"],


"Hougang":["NE14"],


"Ang Mo Kio":["NS16"],




"Riviera":["PE4"],
"Punggol":["NE17", "PTC"],

}
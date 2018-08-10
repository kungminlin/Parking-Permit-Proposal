const {ipcRenderer} = require('electron');
const $ = require('jQuery');

var users = []
var sorted = {eligibility: false, name: false, seniority: false, distance: false};

$.getScript('https://maps.google.com/maps/api/js?key=' + process.env.API_KEY).done(function() {
  const coords1 = [{lat:37.39676333950141, lng:-122.11436265042056}, {lat:37.396447, lng:-122.11438980000003}, {lat:37.396447, lng:-122.11438980000003}, {lat:37.39639295644276, lng:-122.11438975200343}, {lat:37.39584797463434, lng:-122.11438926800372}, {lat:37.3955462, lng:-122.11438899999996}, {lat:37.3955462, lng:-122.11438899999996}, {lat:37.39524155380631, lng:-122.11438555721429}, {lat:37.39516570000001, lng:-122.11438469999996}, {lat:37.39516570000001, lng:-122.11438469999996}, {lat:37.394896100000004, lng:-122.1143568}, {lat:37.394896100000004, lng:-122.1143568}, {lat:37.39460146732228, lng:-122.11432096502182}, {lat:37.394581200000005, lng:-122.11431849999997}, {lat:37.394581200000005, lng:-122.11431849999997}, {lat:37.394386, lng:-122.11429329999999}, {lat:37.3940947, lng:-122.11426440000002}, {lat:37.39408209182144, lng:-122.1142637210969}, {lat:37.393951699999995, lng:-122.1142567}, {lat:37.393951699999995, lng:-122.1142567}, {lat:37.393814299999995, lng:-122.11425020000001}, {lat:37.3934212, lng:-122.11424729999999}, {lat:37.39337712531725, lng:-122.11424747335235}, {lat:37.3931161, lng:-122.11424849999997}, {lat:37.3931161, lng:-122.11424849999997}, {lat:37.392831122587964, lng:-122.11424955303642}, {lat:37.39268309999999, lng:-122.11425009999999}, {lat:37.39268309999999, lng:-122.11425009999999}, {lat:37.39237101447644, lng:-122.11425076486188}, {lat:37.3922137, lng:-122.11425109999999}, {lat:37.3922137, lng:-122.11425109999999}, {lat:37.391782928524734, lng:-122.11424861296342}, {lat:37.391711400000005, lng:-122.11424820000002}, {lat:37.391711400000005, lng:-122.11424820000002}, {lat:37.391419299999995, lng:-122.11425409999998}, {lat:37.391419299999995, lng:-122.11425409999998}, {lat:37.3909888, lng:-122.11426940000001}, {lat:37.3909888, lng:-122.11426940000001}, {lat:37.39097005317384, lng:-122.11426977334537}, {lat:37.3906122, lng:-122.1142769}, {lat:37.3901416, lng:-122.11427989999999}, {lat:37.3901416, lng:-122.11427989999999}, {lat:37.389989070622086, lng:-122.1142801364802}, {lat:37.3898191, lng:-122.11428039999998}, {lat:37.3898191, lng:-122.11428039999998}, {lat:37.3894858873269, lng:-122.11427821456442}, {lat:37.389041500000005, lng:-122.11427529999997}, {lat:37.389041500000005, lng:-122.11427529999997}, {lat:37.3889448, lng:-122.11426919999997}, {lat:37.3889448, lng:-122.11426919999997}, {lat:37.388704313946505, lng:-122.11426458083929}, {lat:37.388380122699324, lng:-122.11425835394937}, {lat:37.38794535732409, lng:-122.11425000329598}, {lat:37.387794199999995, lng:-122.1142471}, {lat:37.387794199999995, lng:-122.1142471}, {lat:37.387400053020734, lng:-122.11424823232949}, {lat:37.386993600000004, lng:-122.1142494}, {lat:37.386961899999996, lng:-122.11424729999999}, {lat:37.3869458, lng:-122.11423709999997}, {lat:37.3869458, lng:-122.11423709999997}, {lat:37.386918016129904, lng:-122.11423677871005}, {lat:37.3867642, lng:-122.11423500000001}, {lat:37.3867642, lng:-122.11423500000001}, {lat:37.386558846444586, lng:-122.11423460530898}, {lat:37.38636284326432, lng:-122.11423422859144}, {lat:37.38589583829097, lng:-122.11423333101726}, {lat:37.3858797, lng:-122.11423330000002}, {lat:37.3858797, lng:-122.11423330000002}, {lat:37.38547379999999, lng:-122.11423409999998}, {lat:37.38547379999999, lng:-122.11423409999998}, {lat:37.385390727792455, lng:-122.11423382189139}, {lat:37.38505775761078, lng:-122.11423270718205}, {lat:37.384966000000006, lng:-122.11423239999999}, {lat:37.384966000000006, lng:-122.11423239999999}, {lat:37.38477146143023, lng:-122.11422856308172}, {lat:37.384416585932684, lng:-122.1142215638614}, {lat:37.38425110000001, lng:-122.1142183}, {lat:37.38420988356377, lng:-122.11421824115052}, {lat:37.384015876610405, lng:-122.11421796414504}, {lat:37.383795884095996, lng:-122.11421765003888}, {lat:37.3836908, lng:-122.1142175}, {lat:37.3836908, lng:-122.1142175}, {lat:37.38357468395428, lng:-122.11421709651756}, {lat:37.38334469667016, lng:-122.11421629735662}, {lat:37.3832879, lng:-122.11421610000002}, {lat:37.3832879, lng:-122.11421610000002}, {lat:37.38313111336037, lng:-122.1142180736365}, {lat:37.38285805324462, lng:-122.11422151090846}, {lat:37.382477599999994, lng:-122.11422629999998}, {lat:37.382477599999994, lng:-122.11422629999998}, {lat:37.382331097112704, lng:-122.11422809142067}, {lat:37.3821423, lng:-122.1142304}, {lat:37.3821423, lng:-122.1142304}, {lat:37.3820391, lng:-122.11423339999999}, {lat:37.3820391, lng:-122.11423339999999}, {lat:37.38202262803045, lng:-122.11423407568014}, {lat:37.3819489, lng:-122.11423709999997}, {lat:37.38180923156422, lng:-122.11423897894798}, {lat:37.3817928, lng:-122.11423919999999}, {lat:37.38153549113168, lng:-122.11423769371464}, {lat:37.381502399999995, lng:-122.1142375}, {lat:37.381502399999995, lng:-122.1142375}, {lat:37.3813579, lng:-122.11423669999999}, {lat:37.3813579, lng:-122.11423669999999}, {lat:37.381325145274545, lng:-122.11423675589543}, {lat:37.381299299999995, lng:-122.11423680000001}, {lat:37.381299299999995, lng:-122.11423680000001}, {lat:37.38116, lng:-122.11423669999999}, {lat:37.38116, lng:-122.11423669999999}, {lat:37.38111017341612, lng:-122.11423679784326}, {lat:37.3809563, lng:-122.11423709999997}, {lat:37.3809563, lng:-122.11423709999997}, {lat:37.380880499999996, lng:-122.11423760000002}, {lat:37.380880499999996, lng:-122.11423760000002}, {lat:37.38062180000001, lng:-122.11423530000002}, {lat:37.38062180000001, lng:-122.11423530000002}, {lat:37.3805901, lng:-122.11423500000001}, {lat:37.3805901, lng:-122.11423500000001}, {lat:37.380497399999996, lng:-122.11424160000001}, {lat:37.3804319, lng:-122.11424849999997}, {lat:37.3803652, lng:-122.11424999999997}, {lat:37.38026189794589, lng:-122.11424987035332}, {lat:37.3799668, lng:-122.11424950000003}, {lat:37.3799668, lng:-122.11424950000003}, {lat:37.37995488911611, lng:-122.11424948371041}, {lat:37.379601199999996, lng:-122.11424899999997}, {lat:37.379601199999996, lng:-122.11424899999997}, {lat:37.37940202855904, lng:-122.11424907363119}, {lat:37.37906019999999, lng:-122.11424920000002}, {lat:37.37906019999999, lng:-122.11424920000002}, {lat:37.37901039905961, lng:-122.11424945697195}, {lat:37.37875839677915, lng:-122.11425075729392}, {lat:37.3786726, lng:-122.11425120000001}, {lat:37.3786726, lng:-122.11425120000001}, {lat:37.37842356060319, lng:-122.11424986537656}, {lat:37.3780195, lng:-122.11424769999996}, {lat:37.3780195, lng:-122.11424769999996}, {lat:37.378008597055114, lng:-122.1142476403441}, {lat:37.37774861923916, lng:-122.1142462178708}, {lat:37.37770879999999, lng:-122.11424599999998}, {lat:37.37770879999999, lng:-122.11424599999998}, {lat:37.377416943803524, lng:-122.11426327406377}, {lat:37.3773202, lng:-122.11426899999998}, {lat:37.3773202, lng:-122.11426899999998}, {lat:37.377161978566846, lng:-122.1142670469153}, {lat:37.376832018105205, lng:-122.11426297391131}, {lat:37.37663001415762, lng:-122.11426048040943}, {lat:37.3766235, lng:-122.11426040000003}, {lat:37.3766235, lng:-122.11426040000003}, {lat:37.37640879999999, lng:-122.11426600000004}, {lat:37.37640879999999, lng:-122.11426600000004}, {lat:37.37620451207486, lng:-122.1142881753475}, {lat:37.3762006, lng:-122.11428860000001}, {lat:37.3760754, lng:-122.1142969}, {lat:37.37597590000001, lng:-122.1143002}, {lat:37.37595595374202, lng:-122.11430046089095}, {lat:37.375807699999996, lng:-122.11430239999999}, {lat:37.375807699999996, lng:-122.11430239999999}, {lat:37.37569952534528, lng:-122.11429883270324}, {lat:37.37554340349146, lng:-122.11429368426047}, {lat:37.3754802, lng:-122.1142916}, {lat:37.3754802, lng:-122.1142916}, {lat:37.37525587779719, lng:-122.1142912504522}, {lat:37.3752235, lng:-122.11429120000003}, {lat:37.3752235, lng:-122.11429120000003}, {lat:37.37489488256068, lng:-122.11429067142956}, {lat:37.37462187488816, lng:-122.11429023230909}, {lat:37.37438486918671, lng:-122.11428985109876}, {lat:37.3743531, lng:-122.1142898}, {lat:37.3743531, lng:-122.1142898}, {lat:37.3740585129253, lng:-122.11428782100768}, {lat:37.3740405, lng:-122.11428769999998}, {lat:37.3740405, lng:-122.11428769999998}];
  const coords2 = [{lat:37.373994425127506, lng:-122.11421462421185}, {lat:37.3739661, lng:-122.11416969999999}, {lat:37.3739661, lng:-122.11416969999999}, {lat:37.37396008392703, lng:-122.11396095053419}, {lat:37.37395190000001, lng:-122.113677}, {lat:37.37395190000001, lng:-122.113677}, {lat:37.37395417264036, lng:-122.11335508016452}, {lat:37.373956199999995, lng:-122.11306780000001}, {lat:37.373956199999995, lng:-122.11306780000001}, {lat:37.373957353454074, lng:-122.11287205927505}, {lat:37.3739598, lng:-122.1124567}, {lat:37.3739598, lng:-122.1124567}, {lat:37.37395976883405, lng:-122.11243799797114}, {lat:37.3739588, lng:-122.11185749999999}, {lat:37.3739588, lng:-122.11185749999999}, {lat:37.37395869515675, lng:-122.11164599394914}, {lat:37.3739585, lng:-122.11125429999998}, {lat:37.3739585, lng:-122.11125429999998}, {lat:37.37395987711373, lng:-122.1111038822516}, {lat:37.37396404900134, lng:-122.11064807315904}, {lat:37.373964099999995, lng:-122.11064249999998}, {lat:37.373964099999995, lng:-122.11064249999998}, {lat:37.373978699999995, lng:-122.11021289999996}, {lat:37.3739874, lng:-122.11005510000001}, {lat:37.37399664197175, lng:-122.10998172638091}, {lat:37.3740566, lng:-122.1095057}, {lat:37.37406248337124, lng:-122.1094487699803}, {lat:37.37410607054187, lng:-122.10902699334804}, {lat:37.37414259999999, lng:-122.10867350000001}, {lat:37.374181719312325, lng:-122.10835536123517}, {lat:37.3741841, lng:-122.10833600000001}, {lat:37.3741978, lng:-122.1080897}, {lat:37.374199, lng:-122.10804109999998}, {lat:37.374198892531716, lng:-122.10803929257196}, {lat:37.37419570000001, lng:-122.1079856}, {lat:37.37419570000001, lng:-122.1079856}, {lat:37.374197, lng:-122.10797379999997}, {lat:37.3741931, lng:-122.10790689999999}, {lat:37.374176600000006, lng:-122.10783350000003}, {lat:37.37415175583417, lng:-122.1077575370482}, {lat:37.374143600000004, lng:-122.10773259999996}, {lat:37.3741238, lng:-122.1076875}, {lat:37.3741238, lng:-122.1076875}, {lat:37.37408299999999, lng:-122.1075917}];
  const coords3 = [{lat:37.37410094219895, lng:-122.10763382895158}, {lat:37.37408299999999, lng:-122.1075917}, {lat:37.37408299999999, lng:-122.1075917}, {lat:37.37415010000001, lng:-122.10758950000002}, {lat:37.37415010000001, lng:-122.10758950000002}, {lat:37.374387799999994, lng:-122.1073758}, {lat:37.374387799999994, lng:-122.1073758}, {lat:37.374599315351226, lng:-122.10718354938706}, {lat:37.374655700000005, lng:-122.10713229999999}, {lat:37.374655700000005, lng:-122.10713229999999}, {lat:37.3748228, lng:-122.10697900000002}, {lat:37.3748228, lng:-122.10697900000002}, {lat:37.37501434586249, lng:-122.10680069145542}, {lat:37.375016699999996, lng:-122.10679849999997}, {lat:37.375016699999996, lng:-122.10679849999997}, {lat:37.37531704886768, lng:-122.10652236183404}, {lat:37.375471999999995, lng:-122.10637989999998}, {lat:37.3754822564571, lng:-122.10636733139535}, {lat:37.3754893, lng:-122.10635869999999}, {lat:37.375502399999995, lng:-122.10633460000003}, {lat:37.3755192, lng:-122.10629849999998}, {lat:37.3755192, lng:-122.10629849999998}, {lat:37.37553421015725, lng:-122.10628405489138}, {lat:37.37576177796108, lng:-122.10606505283005}, {lat:37.37598249160168, lng:-122.10585264529777}, {lat:37.37643138753366, lng:-122.1054206376653}, {lat:37.3765477, lng:-122.10530870000002}, {lat:37.3765477, lng:-122.10530870000002}, {lat:37.37668510634371, lng:-122.10517493282543}, {lat:37.376980136046946, lng:-122.10488771475104}, {lat:37.377204899999995, lng:-122.10466889999998}, {lat:37.377204899999995, lng:-122.10466889999998}, {lat:37.37725575677747, lng:-122.10461980271617}, {lat:37.377494415052986, lng:-122.10438940015786}, {lat:37.3775518, lng:-122.104334}, {lat:37.37771740000001, lng:-122.10416570000001}, {lat:37.37771740000001, lng:-122.10416570000001}, {lat:37.37775836107274, lng:-122.10412473902079}, {lat:37.3778885, lng:-122.10399459999996}, {lat:37.378192759833304, lng:-122.10370006352048}, {lat:37.378408, lng:-122.1034917}, {lat:37.378408, lng:-122.1034917}, {lat:37.37849520970688, lng:-122.10340794132844}, {lat:37.37875929999999, lng:-122.10315430000003}, {lat:37.378952757707125, lng:-122.10297428958518}, {lat:37.378993799999996, lng:-122.10293609999997}, {lat:37.378993799999996, lng:-122.10293609999997}, {lat:37.379203499999996, lng:-122.102754}, {lat:37.379203499999996, lng:-122.102754}, {lat:37.379296813839424, lng:-122.1026617019383}, {lat:37.3796171, lng:-122.10234489999999}, {lat:37.3796171, lng:-122.10234489999999}, {lat:37.37963403279129, lng:-122.10232990517483}, {lat:37.3798469, lng:-122.1021414}, {lat:37.3798469, lng:-122.1021414}, {lat:37.379899057571755, lng:-122.102091759811}, {lat:37.38042558911845, lng:-122.10159063631215}, {lat:37.38077821490543, lng:-122.10125502160241}, {lat:37.380874899999995, lng:-122.10116299999999}, {lat:37.380874899999995, lng:-122.10116299999999}, {lat:37.381115199999996, lng:-122.10092739999999}, {lat:37.38115019581596, lng:-122.10089230928503}, {lat:37.3812626, lng:-122.10077960000001}, {lat:37.38139290000001, lng:-122.10064190000003}, {lat:37.38139290000001, lng:-122.10064190000003}, {lat:37.381450099999995, lng:-122.10057619999998}, {lat:37.381450099999995, lng:-122.10057619999998}, {lat:37.3815079643546, lng:-122.10052052557313}, {lat:37.381518799999995, lng:-122.10051010000001}, {lat:37.381518799999995, lng:-122.10051010000001}, {lat:37.38188157530686, lng:-122.10017440776386}, {lat:37.3821283, lng:-122.09994610000001}, {lat:37.3821283, lng:-122.09994610000001}, {lat:37.38234026615333, lng:-122.09973851660845}, {lat:37.38234109999999, lng:-122.09973769999999}, {lat:37.38234109999999, lng:-122.09973769999999}, {lat:37.382644899999995, lng:-122.09945249999998}, {lat:37.382644899999995, lng:-122.09945249999998}, {lat:37.382762480647315, lng:-122.09933987380828}, {lat:37.383226367729904, lng:-122.09889552893372}, {lat:37.38355619583766, lng:-122.09857959120814}, {lat:37.383623, lng:-122.09851560000004}, {lat:37.383623, lng:-122.09851560000004}, {lat:37.38380646896387, lng:-122.0983437931917}, {lat:37.3840887, lng:-122.09807949999998}, {lat:37.3840887, lng:-122.09807949999998}, {lat:37.3843033, lng:-122.09789710000001}, {lat:37.3843033, lng:-122.09789710000001}, {lat:37.38450763923458, lng:-122.09771389589082}, {lat:37.38494460002573, lng:-122.09732212643416}, {lat:37.385013, lng:-122.09726080000002}, {lat:37.385013, lng:-122.09726080000002}, {lat:37.38525120051142, lng:-122.09704835609875}, {lat:37.38568721419212, lng:-122.09665948418223}, {lat:37.385830600000006, lng:-122.09653159999999}, {lat:37.385830600000006, lng:-122.09653159999999}, {lat:37.3858872, lng:-122.09647199999995}, {lat:37.3858872, lng:-122.09647199999995}, {lat:37.3859308, lng:-122.09642529999996}, {lat:37.3859308, lng:-122.09642529999996}, {lat:37.3859761, lng:-122.09637629999997}, {lat:37.385995099999995, lng:-122.0963471}, {lat:37.3860094, lng:-122.096317}, {lat:37.38602180000001, lng:-122.0962859}, {lat:37.3860375, lng:-122.09622920000004}, {lat:37.386042599999996, lng:-122.09619830000003}, {lat:37.386047600000005, lng:-122.09614899999997}, {lat:37.38605820000001, lng:-122.09600669999998}, {lat:37.38605820000001, lng:-122.09600669999998}, {lat:37.38605820000001, lng:-122.09600669999998}, {lat:37.38610342549201, lng:-122.09600699674127}, {lat:37.38618914544591, lng:-122.09600755918274}, {lat:37.38624487039799, lng:-122.0960079248162}, {lat:37.38631859904129, lng:-122.09600840857985}, {lat:37.38642346359947, lng:-122.09600909664056}, {lat:37.386493283546216, lng:-122.0960095547598}, {lat:37.38651006352504, lng:-122.09600966486073}, {lat:37.3865459, lng:-122.09600990000001}, {lat:37.3865459, lng:-122.09600990000001}, {lat:37.386881870344716, lng:-122.0960049788896}, {lat:37.386948700000005, lng:-122.096004}, {lat:37.386948700000005, lng:-122.096004}, {lat:37.3872918, lng:-122.09599960000003}, {lat:37.3872918, lng:-122.09599960000003}, {lat:37.387309000390275, lng:-122.095999628632}, {lat:37.38773000385738, lng:-122.09600032944371}, {lat:37.38809998954903, lng:-122.09600094533658}, {lat:37.3881929, lng:-122.09600109999997}, {lat:37.3881929, lng:-122.09600109999997}, {lat:37.388623996505984, lng:-122.0959936785012}, {lat:37.388657599999995, lng:-122.09599309999999}, {lat:37.388657599999995, lng:-122.09599309999999}, {lat:37.38914404139871, lng:-122.09597697877297}, {lat:37.3892822, lng:-122.0959724}, {lat:37.3892822, lng:-122.0959724}, {lat:37.389639022487025, lng:-122.09596341458575}, {lat:37.389969985379715, lng:-122.09595508028485}, {lat:37.38999700000001, lng:-122.09595439999998}, {lat:37.38999700000001, lng:-122.09595439999998}, {lat:37.390084699999996, lng:-122.09595059999998}, {lat:37.390084699999996, lng:-122.09595059999998}, {lat:37.39014641833502, lng:-122.0959404158803}, {lat:37.390285899999995, lng:-122.09591739999996}, {lat:37.390285899999995, lng:-122.09591739999996}, {lat:37.39030507639655, lng:-122.09591645446784}, {lat:37.390535159042855, lng:-122.09590510972635}, {lat:37.3907118, lng:-122.09589640000002}, {lat:37.3907118, lng:-122.09589640000002}, {lat:37.39071201422018, lng:-122.09589751604142}, {lat:37.39071442706135, lng:-122.09591008643383}]
  const coords4 = [{lat:37.39071339404199, lng:-122.09590470462041}, {lat:37.39084551883495, lng:-122.09659305849624}, {lat:37.3908595, lng:-122.0966659}, {lat:37.3908595, lng:-122.0966659}, {lat:37.39096441836775, lng:-122.09721017761296}, {lat:37.391039181248395, lng:-122.09759802855922}, {lat:37.3911253, lng:-122.09804480000003}, {lat:37.3911253, lng:-122.09804480000003}, {lat:37.3911332, lng:-122.09808950000001}, {lat:37.3911427, lng:-122.09812629999999}, {lat:37.39114582980693, lng:-122.09813605303873}, {lat:37.3911668, lng:-122.0982014}, {lat:37.39121228398183, lng:-122.09830880949374}, {lat:37.3912343, lng:-122.09836080000002}, {lat:37.3912343, lng:-122.09836080000002}, {lat:37.391318878319176, lng:-122.09854808705165}, {lat:37.39143346102245, lng:-122.09880181640136}, {lat:37.391540299999996, lng:-122.09903839999998}, {lat:37.391540299999996, lng:-122.09903839999998}, {lat:37.39157108079786, lng:-122.09910441758268}, {lat:37.3915852, lng:-122.09913469999998}, {lat:37.3915852, lng:-122.09913469999998}, {lat:37.391651008503665, lng:-122.09929375064917}, {lat:37.39174880962399, lng:-122.09953012478559}, {lat:37.3917783, lng:-122.09960139999998}, {lat:37.39183370000001, lng:-122.09974}, {lat:37.39183370000001, lng:-122.09974}, {lat:37.391905152924174, lng:-122.09990686110734}, {lat:37.39200376902205, lng:-122.100137156691}, {lat:37.392105500987796, lng:-122.100374730407}, {lat:37.3921251, lng:-122.10042050000004}, {lat:37.3921251, lng:-122.10042050000004}, {lat:37.392258058640444, lng:-122.10071624601972}, {lat:37.39235830204648, lng:-122.10093922381566}, {lat:37.39245003168133, lng:-122.10114326522631}, {lat:37.392493491837, lng:-122.1012399375008}, {lat:37.39255391696087, lng:-122.10137434693422}, {lat:37.39263509921825, lng:-122.10155492933632}, {lat:37.3926412, lng:-122.10156849999998}, {lat:37.3926412, lng:-122.10156849999998}, {lat:37.39268595657548, lng:-122.10167202974037}, {lat:37.39278305859709, lng:-122.10189664474126}, {lat:37.39287387316999, lng:-122.10210671712218}, {lat:37.3928944, lng:-122.10215419999997}, {lat:37.3928944, lng:-122.10215419999997}, {lat:37.39290382437917, lng:-122.10218163968193}, {lat:37.3929091, lng:-122.10219699999999}, {lat:37.392912859596024, lng:-122.10222203340595}, {lat:37.392913199999995, lng:-122.10222429999999}, {lat:37.3929117, lng:-122.10224699999998}, {lat:37.39290951233113, lng:-122.10225750939304}, {lat:37.392906599999996, lng:-122.10227150000003}, {lat:37.392906599999996, lng:-122.10227150000003}, {lat: 37.39291168565558, lng: -122.10228085552205}, {lat: 37.39313224254613, lng: -122.10269190405359}, {lat:37.393138558422535, lng:-122.10270396356452}, {lat:37.39326422112303, lng:-122.10297811324483}, {lat:37.3932842, lng:-122.1030217}, {lat:37.3932842, lng:-122.1030217}, {lat:37.39338062791675, lng:-122.10317538176935}, {lat:37.393440999999996, lng:-122.10327160000003}, {lat:37.393466599999996, lng:-122.1033074}, {lat:37.39349041311111, lng:-122.10333658851948}, {lat:37.393510899999995, lng:-122.1033617}, {lat:37.3935545, lng:-122.10340439999999}, {lat:37.3935545, lng:-122.10340439999999}, {lat:37.3935746, lng:-122.10342079999998}, {lat:37.39360258012104, lng:-122.1034408981177}, {lat:37.3937418, lng:-122.10354089999998}, {lat:37.393746285937475, lng:-122.10354376890962}, {lat:37.39382799104846, lng:-122.10359602217517}, {lat:37.3938364, lng:-122.1036014}, {lat:37.3939782, lng:-122.10370590000002}, {lat:37.3940728, lng:-122.10378400000002}, {lat:37.39410360000001, lng:-122.1038165}, {lat:37.39410360000001, lng:-122.1038165}, {lat:37.3941351, lng:-122.10385640000004}, {lat:37.39415340000001, lng:-122.10388490000003}, {lat:37.394178999999994, lng:-122.10393060000001}, {lat:37.394216899999996, lng:-122.10400470000002}, {lat:37.3944726, lng:-122.10456120000003}, {lat:37.3944726, lng:-122.10456120000003}, {lat:37.3948785, lng:-122.10546649999998}, {lat:37.3948785, lng:-122.10546649999998}, {lat:37.395291, lng:-122.10636740000001}, {lat:37.395291, lng:-122.10636740000001}, {lat:37.395414499999994, lng:-122.10663790000001}, {lat:37.395414499999994, lng:-122.10663790000001}, {lat:37.395479, lng:-122.10677629999998}, {lat:37.3956016, lng:-122.1069817}, {lat:37.395684200000005, lng:-122.1071407}, {lat:37.395684200000005, lng:-122.1071407}, {lat:37.395817265010116, lng:-122.10743928247587}, {lat:37.3959136432548, lng:-122.10765554581178}, {lat:37.395917499999996, lng:-122.10766419999999}, {lat:37.395917499999996, lng:-122.10766419999999}, {lat:37.39598260669814, lng:-122.10781993578479}, {lat:37.395997599999994, lng:-122.10785579999998}, {lat:37.395997599999994, lng:-122.10785579999998}, {lat:37.39602860000001, lng:-122.10792249999997}, {lat:37.396047321123355, lng:-122.10797593198464}, {lat:37.3960615, lng:-122.1080164}, {lat:37.396082799999995, lng:-122.10809030000001}, {lat:37.396098685515334, lng:-122.10815171908501}, {lat:37.3961045, lng:-122.10817420000001}, {lat:37.3961045, lng:-122.10817420000001}, {lat:37.3961631, lng:-122.10831869999998}, {lat:37.39619374098702, lng:-122.10838676557154}, {lat:37.39631154797232, lng:-122.10864846211535}, {lat:37.396444397530374, lng:-122.10894357676784}, {lat:37.39657524675879, lng:-122.10923425046354}, {lat:37.39666069767734, lng:-122.10942407594365}, {lat:37.396724000000006, lng:-122.10956470000002}, {lat:37.396724000000006, lng:-122.10956470000002}, {lat:37.396723186746854, lng:-122.10956526233292}, {lat:37.39644751136235, lng:-122.10975588033727}, {lat:37.3963892, lng:-122.1097962}, {lat:37.3963892, lng:-122.1097962}, {lat:37.39607089183737, lng:-122.11001927699647}, {lat:37.39586849523728, lng:-122.11016111961527}, {lat:37.395827, lng:-122.11019019999998}, {lat:37.395827, lng:-122.11019019999998}, {lat:37.39582702859301, lng:-122.1101902632468}, {lat:37.3959105088087, lng:-122.1103749192851}, {lat:37.39604456372674, lng:-122.11067144742248}, {lat:37.396164514722294, lng:-122.11093678011213}, {lat:37.3962487, lng:-122.11112300000002}, {lat:37.3962487, lng:-122.11112300000002}, {lat:37.3962703178637, lng:-122.11117061325848}, {lat:37.396379785236235, lng:-122.11141171577651}, {lat:37.39648645993988, lng:-122.11164666914016}, {lat:37.3965926957679, lng:-122.11188065755289}, {lat:37.396653081695774, lng:-122.11201366058191}, {lat:37.396668399999996, lng:-122.1120474}, {lat:37.3966916, lng:-122.11210870000002}, {lat:37.3966965741714, lng:-122.11212566246985}, {lat:37.3967094, lng:-122.11216939999997}, {lat:37.3967244, lng:-122.11227539999999}, {lat:37.39672497282062, lng:-122.11228800195744}, {lat:37.3967287, lng:-122.11237}, {lat:37.3967282, lng:-122.11244119999998}, {lat:37.396729057967256, lng:-122.11246411520466}, {lat:37.3967337, lng:-122.11258809999998}, {lat:37.3967337, lng:-122.11258809999998}, {lat:37.39673234840775, lng:-122.11270300649346}, {lat:37.39672970077881, lng:-122.11292806898422}, {lat:37.39672635993444, lng:-122.11321200671074}, {lat:37.396726300000005, lng:-122.11321710000004}, {lat:37.396733022169336, lng:-122.11338918430101}, {lat:37.3967398, lng:-122.11356269999999}, {lat:37.3967398, lng:-122.11356269999999}, {lat:37.3967419441094, lng:-122.1135933388282}, {lat:37.396757876575556, lng:-122.11382101368457}, {lat:37.39677181801105, lng:-122.11402024192012}, {lat:37.39678555849931, lng:-122.11421660329245}, {lat:37.396786299999995, lng:-122.11422719999996}, {lat:37.396786299999995, lng:-122.11422719999996}, {lat:37.39678522377285, lng:-122.11432990409384}, {lat:37.396784918529434, lng:-122.1143590318552}]
  const coords = coords1.concat(coords2, coords3, coords4);

  const boundary = new google.maps.Polyline({
    path: coords,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  sync();

  function sync() {
    users = [];
    $('#user-data').find('tbody').empty();

    var query = "SELECT * FROM " + process.env.TABLE_ID;
    var encodedQuery = encodeURIComponent(query);
    var url = ['https://www.googleapis.com/fusiontables/v2/query'];
    url.push('?sql=' + encodedQuery);
    url.push('&key=' + process.env.API_KEY);
    url.push('&callback=?');

    $.ajax({
      url: url.join(''),
      dataType: 'jsonp',
      success: function (data) {
        var index = 0;
        for (var i=0; i<data.columns.length; i++) {
          if (data.rows.length == users.length) return;
          for (var i=0; i<data.rows.length; i++) {
            users.push({
              id: data.rows[i][process.env.USER_ID],
              email: data.rows[i][process.env.EMAIL_ID],
              first_name: data.rows[i][process.env.FIRST_NAME_ID],
              last_name: data.rows[i][process.env.LAST_NAME_ID],
              address: data.rows[i][process.env.ADDRESS_ID],
              class: parseInt(data.rows[i][process.env.CLASS_ID].substring(9))
            })
          }
        }
      }
    }).done(function() {
      console.log(users);
      calcDistance().then(
        calcEligible().then(function() {
          displayUsers();
        })
      );
    })
  }

  function calcDistance() {
    var deferred = $.Deferred();
    var service = new google.maps.DistanceMatrixService();
    var addresses = [];

    for (var i in users) addresses.push(users[i].address)
    service.getDistanceMatrix(
      {
        origins: addresses,
        destinations: [process.env.DESTINATION],
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status == 'OK') {
          for (var i=0; i<response.rows.length; i++) {
            users[i].distance = Math.round(response.rows[i].elements[0].distance.value * 0.000621371192 * 100)/100;
          }
          deferred.resolve('OK');
        }
        else {
          deferred.reject(status);
        }
      }
    )
    return deferred.promise();
  }

  function calcEligible() {
    var deferred = $.Deferred();
    var geocoder = new google.maps.Geocoder();

    users.forEach(function(user) {
      geocoder.geocode({'address': user.address}, function(results, status) {
        if (status == 'OK') {
          user.address = results[0].formatted_address;
          var location = results[0].geometry.location;
          var latLng = new google.maps.LatLng(location.lat, location.lng);
          if (google.maps.geometry.poly.containsLocation(latLng, boundary)) {
            user.eligible = false;
            console.log(user.eligible);
          } else {
            user.eligible = true;
            console.log(user.eligible);
          }
          deferred.resolve('OK');
        } else {
          alert('Quota Exceeded: Please Try Again Later');
          deferred.reject(status);
        }
      })
    });
    return deferred.promise();
  }
});

function displayUsers() {
  $('#user-data').find('tbody').empty()
  for (var i=0; i<users.length; i++) {
    $('#user-data').find('tbody').append("<tr data-eligible=" + users[i].eligible +
      "><td class='id'>" + users[i].id +
      "</td><td class='class'>" + users[i].class +
      "</td><td class='name'>" + users[i].last_name + ", " + users[i].first_name +
      "</td><td class='email'>" + users[i].email +
      "</td><td class='address'>" + users[i].address +
      "</td><td class='distance'>" + users[i].distance +
      "</td></tr>");
  }
}

ipcRenderer.on('sort:eligibility', function() {
  users.sort(function(a, b) {
    return a.eligible ? 1 : -1;
  })
  displayUsers();
});
ipcRenderer.on('sort:name', function() {
  users.sort(function(a, b) {
    if (a.last_name + a.first_name < b.last_name + b.first_name) return -1;
    if (a.last_name + a.first_name > b.last_name + b.first_name) return 1;
    return 0;
  })
  displayUsers();
});
ipcRenderer.on('sort:seniority', function() {
  users.sort(function(a, b) {
    return a.class-b.class;
  })
  displayUsers();
});
ipcRenderer.on('sort:distance', function() {
  users.sort(function(a, b) {
    return a.distance-b.distance;
  })
  displayUsers();
});

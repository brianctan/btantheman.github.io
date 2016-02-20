var c, ctx, mx = my = 0, md = false, PI = Math.PI, TAU = PI * 2;

var keyCodes = {};

var objects = [], nearestPoint = null;

var G = 1, F = 0.98, C = 1/30;

function windowLoad(){
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");

  windowResize();
  window.addEventListener("resize", windowResize, false);

  c.addEventListener("mousemove", mouseMove, false);
  c.addEventListener("mousedown", mouseDown, false);
  c.addEventListener("mouseup", mouseUp, false);

  document.addEventListener("keydown", keyDown, false);
  document.addEventListener("keyup", keyUp, false);

  var po = new PhysicsObject([]);
  var _a = new Point(700, 500, 1, [], [50, 50]);
  var _b = new Point(510, 500, 1, [], [50]);
  var _c = new Point(500, 510, 1, [], [50, Math.sqrt(2) * 50]);
  var _d = new Point(500, 510, 1, [], [Math.sqrt(2) * 50]);
  _a.connections = [_b, _d];
  _b.connections = [_c];
  _c.connections = [_d, _a];
  _d.connections = [_b];
  po.points.push(_a, _b, _c, _d);
  objects.push(po);

  var po = new PhysicsObject([]);
  var _a = new Point(300, 300, 1, [], [10]);
  var _b = new Point(310, 310, 1, [_a], [20]);
  var _c = new Point(310, 310, 1, [_b], [30]);
  var _d = new Point(310, 310, 1, [_c], [40]);
  var _e = new Point(310, 310, 1, [_d], [50]);
  po.points.push(_a, _b, _c, _d, _e);
  objects.push(po);

  var _x = 50;

  var po = new PhysicsObject([]);
  var _a = new Point(100, 100, 1, [], [_x, Math.sqrt(Math.pow(_x/2, 2) + Math.pow(_x/2 + _x/Math.sqrt(3), 2))]);
  var _b = new Point(110, 100, 1, [], [Math.sqrt(Math.pow(_x/2, 2) + Math.pow(_x/2 + _x/Math.sqrt(3), 2))]);
  var _c = new Point(700, 110, 1, [], [_x/Math.sqrt(2), _x]);
  var _d = new Point(100, 110, 1, [], [_x/Math.sqrt(2), _x/Math.sqrt(2), _x/Math.sqrt(3)]);
  var _e = new Point(100, 110, 1, [], [_x/Math.sqrt(2), _x]);
  var _f = new Point(100, 110, 1, [], [2 * _x/Math.sqrt(3), 2 * _x/Math.sqrt(3)]);
  _a.connections = [_b, _f];
  _b.connections = [_f];
  _c.connections = [_a, _d];
  _d.connections = [_a, _b, _f];
  _e.connections = [_b, _d];
  _f.connections = [_c, _e];
  po.points.push(_a, _b, _c, _d, _e, _f);

  po.getAngle = function(){
    this.angle = Math.atan2(this.points[3].y - this.points[5].y, this.points[3].x - this.points[5].x);
    return this.angle
  }

  objects.push(po);

  function addPhysicsObjects007562371180392802(x, y){var po = new PhysicsObject([]);
var _0 = new Point(x + -53.5, y + 11.75, 1, [], []);
var _1 = new Point(x + -42.5, y + 19.75, 1, [], []);
var _2 = new Point(x + -26.5, y + 23.75, 1, [], []);
var _3 = new Point(x + -9.5, y + 26.75, 1, [], []);
var _4 = new Point(x + 9.5, y + 26.75, 1, [], []);
var _5 = new Point(x + 37.5, y + 23.75, 1, [], []);
var _6 = new Point(x + 56.5, y + 12.75, 1, [], []);
var _7 = new Point(x + 67.5, y + 5.75, 1, [], []);
var _8 = new Point(x + -59.5, y + -2.25, 1, [], []);
var _9 = new Point(x + 74.5, y + -9.25, 1, [], []);
var _10 = new Point(x + -61.5, y + -17.25, 1, [], []);
var _11 = new Point(x + 7.5, y + -122.25, 1, [], []);
_1.connections.push(_0);
_1.elasticDistance.push(13.601470508735444);
_2.connections.push(_0);
_2.elasticDistance.push(29.546573405388315);
_2.connections.push(_1);
_2.elasticDistance.push(16.492422502470642);
_3.connections.push(_0);
_3.elasticDistance.push(46.486557196677836);
_3.connections.push(_1);
_3.elasticDistance.push(33.734255586866);
_3.connections.push(_2);
_3.elasticDistance.push(17.26267650163207);
_4.connections.push(_0);
_4.elasticDistance.push(64.76109943476871);
_4.connections.push(_1);
_4.elasticDistance.push(52.46903848937962);
_4.connections.push(_2);
_4.elasticDistance.push(36.124783736376884);
_4.connections.push(_3);
_4.elasticDistance.push(19);
_5.connections.push(_0);
_5.elasticDistance.push(91.7877987534291);
_5.connections.push(_1);
_5.elasticDistance.push(80.09993757800315);
_5.connections.push(_2);
_5.elasticDistance.push(64);
_5.connections.push(_3);
_5.elasticDistance.push(47.095647357266465);
_5.connections.push(_4);
_5.elasticDistance.push(28.160255680657446);
_6.connections.push(_0);
_6.elasticDistance.push(110.00454536063498);
_6.connections.push(_1);
_6.elasticDistance.push(99.24716620639605);
_6.connections.push(_2);
_6.elasticDistance.push(83.72574275573791);
_6.connections.push(_3);
_6.elasticDistance.push(67.468511173732);
_6.connections.push(_4);
_6.elasticDistance.push(49.040799340956916);
_6.connections.push(_5);
_6.elasticDistance.push(21.95449840010015);
_7.connections.push(_0);
_7.elasticDistance.push(121.1486689980538);
_7.connections.push(_1);
_7.elasticDistance.push(110.8873302050329);
_7.connections.push(_2);
_7.elasticDistance.push(95.70788891204319);
_7.connections.push(_3);
_7.elasticDistance.push(79.81227975693966);
_7.connections.push(_4);
_7.elasticDistance.push(61.68468205316454);
_7.connections.push(_5);
_7.elasticDistance.push(34.9857113690718);
_7.connections.push(_6);
_7.elasticDistance.push(13.038404810405298);
_8.connections.push(_0);
_8.elasticDistance.push(15.231546211727817);
_8.connections.push(_1);
_8.elasticDistance.push(27.80287754891569);
_8.connections.push(_2);
_8.elasticDistance.push(42.01190307520001);
_8.connections.push(_3);
_8.elasticDistance.push(57.8013840664737);
_8.connections.push(_4);
_8.elasticDistance.push(74.84650960465692);
_8.connections.push(_5);
_8.elasticDistance.push(100.42410069301094);
_8.connections.push(_6);
_8.elasticDistance.push(116.96580696938743);
_8.connections.push(_7);
_8.elasticDistance.push(127.251719045363);
_9.connections.push(_0);
_9.elasticDistance.push(129.71121771072848);
_9.connections.push(_1);
_9.elasticDistance.push(120.5404496424333);
_9.connections.push(_2);
_9.elasticDistance.push(106.25441167311595);
_9.connections.push(_3);
_9.elasticDistance.push(91.3892772703669);
_9.connections.push(_4);
_9.elasticDistance.push(74.30343195303969);
_9.connections.push(_5);
_9.elasticDistance.push(49.57822102496216);
_9.connections.push(_6);
_9.elasticDistance.push(28.42534080710379);
_9.connections.push(_7);
_9.elasticDistance.push(16.55294535724685);
_9.connections.push(_8);
_9.elasticDistance.push(134.18271125595876);
_10.connections.push(_0);
_10.elasticDistance.push(30.083217912982647);
_10.connections.push(_1);
_10.elasticDistance.push(41.593268686170845);
_10.connections.push(_2);
_10.elasticDistance.push(53.907327887774215);
_10.connections.push(_3);
_10.elasticDistance.push(68.11754546370561);
_10.connections.push(_4);
_10.elasticDistance.push(83.52843827104634);
_10.connections.push(_5);
_10.elasticDistance.push(107.15409464878138);
_10.connections.push(_6);
_10.elasticDistance.push(121.75385004179539);
_10.connections.push(_7);
_10.elasticDistance.push(131.03434664239754);
_10.connections.push(_8);
_10.elasticDistance.push(15.132745950421556);
_10.connections.push(_9);
_10.elasticDistance.push(136.23509092741122);
_11.connections.push(_0);
_11.elasticDistance.push(147.2311108427835);
_11.connections.push(_1);
_11.elasticDistance.push(150.5456741324705);
_11.connections.push(_2);
_11.elasticDistance.push(149.90663761154806);
_11.connections.push(_3);
_11.elasticDistance.push(149.96666296213968);
_11.connections.push(_4);
_11.elasticDistance.push(149.01342221424215);
_11.connections.push(_5);
_11.elasticDistance.push(149.05032707109368);
_11.connections.push(_6);
_11.elasticDistance.push(143.6175476743702);
_11.connections.push(_7);
_11.elasticDistance.push(141.36477637657833);
_11.connections.push(_8);
_11.elasticDistance.push(137.43725841270262);
_11.connections.push(_9);
_11.elasticDistance.push(131.36970731489052);
_11.connections.push(_10);
_11.elasticDistance.push(125.64234954823155);
po.points.push(_0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11);
objects.push(po);
}
addPhysicsObjects007562371180392802(400, 100);

function addPhysicsObjects008045998588204384(x, y){var po = new PhysicsObject([]);var _0 = new Point(x + -82.72727272727275, y + 8.409090909090935, 1, [], []);var _1 = new Point(x + -82.72727272727275, y + 32.409090909090935, 1, [], []);var _2 = new Point(x + -65.72727272727275, y + 64.40909090909093, 1, [], []);var _3 = new Point(x + -38.72727272727275, y + 74.40909090909093, 1, [], []);var _4 = new Point(x + -6.727272727272748, y + 75.40909090909093, 1, [], []);var _5 = new Point(x + 38.27272727272725, y + 75.40909090909093, 1, [], []);var _6 = new Point(x + 59.27272727272725, y + 68.40909090909093, 1, [], []);var _7 = new Point(x + 78.27272727272725, y + 49.409090909090935, 1, [], []);var _8 = new Point(x + 85.27272727272725, y + 15.409090909090935, 1, [], []);var _9 = new Point(x + 83.27272727272725, y + -19.590909090909065, 1, [], []);var _10 = new Point(x + 68.27272727272725, y + -54.590909090909065, 1, [], []);var _11 = new Point(x + 34.27272727272725, y + -80.59090909090907, 1, [], []);var _12 = new Point(x + -11.727272727272748, y + -90.59090909090907, 1, [], []);var _13 = new Point(x + -47.72727272727275, y + -90.59090909090907, 1, [], []);var _14 = new Point(x + -65.72727272727275, y + -71.59090909090907, 1, [], []);var _15 = new Point(x + -81.72727272727275, y + -39.590909090909065, 1, [], []);var _16 = new Point(x + -84.72727272727275, y + -13.590909090909065, 1, [], []);var _17 = new Point(x + 79.27272727272725, y + -34.590909090909065, 1, [], []);var _18 = new Point(x + 20.272727272727252, y + 77.40909090909093, 1, [], []);var _19 = new Point(x + -77.72727272727275, y + 51.409090909090935, 1, [], []);var _20 = new Point(x + 86.27272727272725, y + -4.590909090909065, 1, [], []);var _21 = new Point(x + 13.272727272727252, y + -92.59090909090907, 1, [], []);_1.connections.push(_0);_1.elasticDistance.push(24);_2.connections.push(_0);_2.elasticDistance.push(58.52349955359813);_2.connections.push(_1);_2.elasticDistance.push(36.235341863986875);_3.connections.push(_0);_3.elasticDistance.push(79.32212806020776);_3.connections.push(_1);_3.elasticDistance.push(60.8276253029822);_3.connections.push(_2);_3.elasticDistance.push(28.792360097775937);_4.connections.push(_0);_4.elasticDistance.push(101.31633629380802);_4.connections.push(_1);_4.elasticDistance.push(87.32124598286491);_4.connections.push(_2);_4.elasticDistance.push(60.01666435249463);_4.connections.push(_3);_4.elasticDistance.push(32.01562118716424);_5.connections.push(_0);_5.elasticDistance.push(138.31124321616085);_5.connections.push(_1);_5.elasticDistance.push(128.41339493993607);_5.connections.push(_2);_5.elasticDistance.push(104.58011283222064);_5.connections.push(_3);_5.elasticDistance.push(77.00649323271382);_5.connections.push(_4);_5.elasticDistance.push(45);_6.connections.push(_0);_6.elasticDistance.push(154.1557653803451);_6.connections.push(_1);_6.elasticDistance.push(146.4923206178399);_6.connections.push(_2);_6.elasticDistance.push(125.06398362438324);_6.connections.push(_3);_6.elasticDistance.push(98.18350166906862);_6.connections.push(_4);_6.elasticDistance.push(66.37017402418047);_6.connections.push(_5);_6.elasticDistance.push(22.135943621178654);_7.connections.push(_0);_7.elasticDistance.push(166.13849644197458);_7.connections.push(_1);_7.elasticDistance.push(161.89502771858065);_7.connections.push(_2);_7.elasticDistance.push(144.77914214416384);_7.connections.push(_3);_7.elasticDistance.push(119.64113005150027);_7.connections.push(_4);_7.elasticDistance.push(88.88756943465155);_7.connections.push(_5);_7.elasticDistance.push(47.70744176750625);_7.connections.push(_6);_7.elasticDistance.push(26.870057685088806);_8.connections.push(_0);_8.elasticDistance.push(168.14577009250038);_8.connections.push(_1);_8.elasticDistance.push(168.8579284487406);_8.connections.push(_2);_8.elasticDistance.push(158.75137794677562);_8.connections.push(_3);_8.elasticDistance.push(137.32079230764728);_8.connections.push(_4);_8.elasticDistance.push(109.83624174196785);_8.connections.push(_5);_8.elasticDistance.push(76.21679604916491);_8.connections.push(_6);_8.elasticDistance.push(59.033888572581766);_8.connections.push(_7);_8.elasticDistance.push(34.713109915419565);_9.connections.push(_0);_9.elasticDistance.push(168.34488409215172);_9.connections.push(_1);_9.elasticDistance.push(173.95401691251627);_9.connections.push(_2);_9.elasticDistance.push(171.04677722775136);_9.connections.push(_3);_9.elasticDistance.push(154.01298646542764);_9.connections.push(_4);_9.elasticDistance.push(130.86252328302402);_9.connections.push(_5);_9.elasticDistance.push(105.11898020814318);_9.connections.push(_6);_9.elasticDistance.push(91.21403400793103);_9.connections.push(_7);_9.elasticDistance.push(69.18092222571191);_9.connections.push(_8);_9.elasticDistance.push(35.05709628591621);_10.connections.push(_0);_10.elasticDistance.push(163.6154026979123);_10.connections.push(_1);_10.elasticDistance.push(174.26990560621763);_10.connections.push(_2);_10.elasticDistance.push(179.21216476567656);_10.connections.push(_3);_10.elasticDistance.push(167.6007159889241);_10.connections.push(_4);_10.elasticDistance.push(150.08331019803634);_10.connections.push(_5);_10.elasticDistance.push(133.41664064126334);_10.connections.push(_6);_10.elasticDistance.push(123.3288287465668);_10.connections.push(_7);_10.elasticDistance.push(104.47966309287182);_10.connections.push(_8);_10.elasticDistance.push(72.03471385380801);_10.connections.push(_9);_10.elasticDistance.push(38.07886552931954);_11.connections.push(_0);_11.elasticDistance.push(147.00340132119393);_11.connections.push(_1);_11.elasticDistance.push(162.65915283192643);_11.connections.push(_2);_11.elasticDistance.push(176.13914953808538);_11.connections.push(_3);_11.elasticDistance.push(171.3300907604966);_11.connections.push(_4);_11.elasticDistance.push(161.29786111415117);_11.connections.push(_5);_11.elasticDistance.push(156.05127362504928);_11.connections.push(_6);_11.elasticDistance.push(151.08275877809487);_11.connections.push(_7);_11.elasticDistance.push(137.2443077143821);_11.connections.push(_8);_11.elasticDistance.push(108.70602559196064);_11.connections.push(_9);_11.elasticDistance.push(78.24321056807422);_11.connections.push(_10);_11.elasticDistance.push(42.80186911806539);_12.connections.push(_0);_12.elasticDistance.push(121.82774724995944);_12.connections.push(_1);_12.elasticDistance.push(142.0211251891774);_12.connections.push(_2);_12.elasticDistance.push(164.13713778423212);_12.connections.push(_3);_12.elasticDistance.push(167.1944975171133);_12.connections.push(_4);_12.elasticDistance.push(166.0752841334315);_12.connections.push(_5);_12.elasticDistance.push(173.3666634621547);_12.connections.push(_6);_12.elasticDistance.push(174.13213373757299);_12.connections.push(_7);_12.elasticDistance.push(166.43316977093238);_12.connections.push(_8);_12.elasticDistance.push(143.68368035375485);_12.connections.push(_9);_12.elasticDistance.push(118.6001686339442);_12.connections.push(_10);_12.elasticDistance.push(87.72684879784524);_12.connections.push(_11);_12.elasticDistance.push(47.07440918375928);_13.connections.push(_0);_13.elasticDistance.push(105.00476179678711);_13.connections.push(_1);_13.elasticDistance.push(127.88275880665071);_13.connections.push(_2);_13.elasticDistance.push(156.0416611036937);_13.connections.push(_3);_13.elasticDistance.push(165.24527224704494);_13.connections.push(_4);_13.elasticDistance.push(170.98830369355676);_13.connections.push(_5);_13.elasticDistance.push(186.9545399288287);_13.connections.push(_6);_13.elasticDistance.push(191.65072397463047);_13.connections.push(_7);_13.elasticDistance.push(188.35073665903195);_13.connections.push(_8);_13.elasticDistance.push(170.07351351694948);_13.connections.push(_9);_13.elasticDistance.push(149.00335566691106);_13.connections.push(_10);_13.elasticDistance.push(121.45781160551181);_13.connections.push(_11);_13.elasticDistance.push(82.60750571225353);_13.connections.push(_12);_13.elasticDistance.push(36);_14.connections.push(_0);_14.elasticDistance.push(81.78630692236935);_14.connections.push(_1);_14.elasticDistance.push(105.38026380684383);_14.connections.push(_2);_14.elasticDistance.push(136);_14.connections.push(_3);_14.elasticDistance.push(148.47558721890948);_14.connections.push(_4);_14.elasticDistance.push(158.39823231336896);_14.connections.push(_5);_14.elasticDistance.push(180.06943105369106);_14.connections.push(_6);_14.elasticDistance.push(187.6832437912346);_14.connections.push(_7);_14.elasticDistance.push(188.08774548066654);_14.connections.push(_8);_14.elasticDistance.push(174.26990560621763);_14.connections.push(_9);_14.elasticDistance.push(157.8131806916013);_14.connections.push(_10);_14.elasticDistance.push(135.07405376311175);_14.connections.push(_11);_14.elasticDistance.push(100.40418317978589);_14.connections.push(_12);_14.elasticDistance.push(57.245087125446844);_14.connections.push(_13);_14.elasticDistance.push(26.1725046566048);_15.connections.push(_0);_15.elasticDistance.push(48.010415536631214);_15.connections.push(_1);_15.elasticDistance.push(72.00694410957877);_15.connections.push(_2);_15.elasticDistance.push(105.22357150372724);_15.connections.push(_3);_15.elasticDistance.push(121.8400590938793);_15.connections.push(_4);_15.elasticDistance.push(137.2953021774598);_15.connections.push(_5);_15.elasticDistance.push(166.20770138594662);_15.connections.push(_6);_15.elasticDistance.push(177.6091213873882);_15.connections.push(_7);_15.elasticDistance.push(183.08741081789321);_15.connections.push(_8);_15.elasticDistance.push(175.82377541163197);_15.connections.push(_9);_15.elasticDistance.push(166.20770138594662);_15.connections.push(_10);_15.elasticDistance.push(150.74813431681335);_15.connections.push(_11);_15.elasticDistance.push(123.03251602726817);_15.connections.push(_12);_15.elasticDistance.push(86.6083136886985);_15.connections.push(_13);_15.elasticDistance.push(61.29437168288782);_15.connections.push(_14);_15.elasticDistance.push(35.77708763999664);_16.connections.push(_0);_16.elasticDistance.push(22.090722034374522);_16.connections.push(_1);_16.elasticDistance.push(46.04345773288535);_16.connections.push(_2);_16.elasticDistance.push(80.2807573457052);_16.connections.push(_3);_16.elasticDistance.push(99.29753269845128);_16.connections.push(_4);_16.elasticDistance.push(118.3427226321923);_16.connections.push(_5);_16.elasticDistance.push(151.82226450688975);_16.connections.push(_6);_16.elasticDistance.push(165.71059109181888);_16.connections.push(_7);_16.elasticDistance.push(174.7512517837855);_16.connections.push(_8);_16.elasticDistance.push(172.45579143653018);_16.connections.push(_9);_16.elasticDistance.push(168.1071087134628);_16.connections.push(_10);_16.elasticDistance.push(158.39823231336896);_16.connections.push(_11);_16.elasticDistance.push(136.56500283747664);_16.connections.push(_12);_16.elasticDistance.push(106.10372283760829);_16.connections.push(_13);_16.elasticDistance.push(85.42833253669417);_16.connections.push(_14);_16.elasticDistance.push(61.032778078668514);_16.connections.push(_15);_16.elasticDistance.push(26.1725046566048);_17.connections.push(_0);_17.elasticDistance.push(167.60966559241146);_17.connections.push(_1);_17.elasticDistance.push(175.30829986055994);_17.connections.push(_2);_17.elasticDistance.push(175.5733464965568);_17.connections.push(_3);_17.elasticDistance.push(160.63934760823702);_17.connections.push(_4);_17.elasticDistance.push(139.62807740565648);_17.connections.push(_5);_17.elasticDistance.push(117.39250401963491);_17.connections.push(_6);_17.elasticDistance.push(104.92378186092989);_17.connections.push(_7);_17.elasticDistance.push(84.00595217006948);_17.connections.push(_8);_17.elasticDistance.push(50.35871324805669);_17.connections.push(_9);_17.elasticDistance.push(15.524174696260024);_17.connections.push(_10);_17.elasticDistance.push(22.825424421026653);_17.connections.push(_11);_17.elasticDistance.push(64.35060217278468);_17.connections.push(_12);_17.elasticDistance.push(106.85036265731624);_17.connections.push(_13);_17.elasticDistance.push(138.7984149765407);_17.connections.push(_14);_17.elasticDistance.push(149.64624953536256);_17.connections.push(_15);_17.elasticDistance.push(161.07762104029226);_17.connections.push(_16);_17.elasticDistance.push(165.33904560024533);_18.connections.push(_0);_18.elasticDistance.push(123.97580409095961);_18.connections.push(_1);_18.elasticDistance.push(112.40106761058811);_18.connections.push(_2);_18.elasticDistance.push(86.97700845625813);_18.connections.push(_3);_18.elasticDistance.push(59.07622195096772);_18.connections.push(_4);_18.elasticDistance.push(27.073972741361768);_18.connections.push(_5);_18.elasticDistance.push(18.110770276274835);_18.connections.push(_6);_18.elasticDistance.push(40.024992192379);_18.connections.push(_7);_18.elasticDistance.push(64.40496875241847);_18.connections.push(_8);_18.elasticDistance.push(89.8276126811795);_18.connections.push(_9);_18.elasticDistance.push(115.66330446602328);_18.connections.push(_10);_18.elasticDistance.push(140.4563989286355);_18.connections.push(_11);_18.elasticDistance.push(158.61904047118682);_18.connections.push(_12);_18.elasticDistance.push(171.0204666114556);_18.connections.push(_13);_18.elasticDistance.push(181.24017214734707);_18.connections.push(_14);_18.elasticDistance.push(172.03778654702577);_18.connections.push(_15);_18.elasticDistance.push(155.21919984331836);_18.connections.push(_16);_18.elasticDistance.push(138.94603268895446);_18.connections.push(_17);_18.elasticDistance.push(126.58988901172162);_19.connections.push(_0);_19.elasticDistance.push(43.289721643826724);_19.connections.push(_1);_19.elasticDistance.push(19.6468827043885);_19.connections.push(_2);_19.elasticDistance.push(17.69180601295413);_19.connections.push(_3);_19.elasticDistance.push(45.27692569068709);_19.connections.push(_4);_19.elasticDistance.push(74.94664769020693);_19.connections.push(_5);_19.elasticDistance.push(118.45674315968678);_19.connections.push(_6);_19.elasticDistance.push(138.0507153186828);_19.connections.push(_7);_19.elasticDistance.push(156.01281998605114);_19.connections.push(_8);_19.elasticDistance.push(166.9281282468596);_19.connections.push(_9);_19.elasticDistance.push(175.96022277776305);_19.connections.push(_10);_19.elasticDistance.push(180.42172818150257);_19.connections.push(_11);_19.elasticDistance.push(173.11268006705922);_19.connections.push(_12);_19.elasticDistance.push(156.58863304850706);_19.connections.push(_13);_19.elasticDistance.push(145.13442045221387);_19.connections.push(_14);_19.elasticDistance.push(123.58397954427588);_19.connections.push(_15);_19.elasticDistance.push(91.08786966440702);_19.connections.push(_16);_19.elasticDistance.push(65.37583651472461);_19.connections.push(_17);_19.elasticDistance.push(179.0111728356641);_19.connections.push(_18);_19.elasticDistance.push(101.39033484509261);_20.connections.push(_0);_20.elasticDistance.push(169.49926253526885);_20.connections.push(_1);_20.elasticDistance.push(173.0028901492689);_20.connections.push(_2);_20.elasticDistance.push(166.9281282468596);_20.connections.push(_3);_20.elasticDistance.push(147.87156589419075);_20.connections.push(_4);_20.elasticDistance.push(122.67436570041843);_20.connections.push(_5);_20.elasticDistance.push(93.29523031752481);_20.connections.push(_6);_20.elasticDistance.push(77.83315488916018);_20.connections.push(_7);_20.elasticDistance.push(54.589376255824725);_20.connections.push(_8);_20.elasticDistance.push(20.024984394500787);_20.connections.push(_9);_20.elasticDistance.push(15.297058540778355);_20.connections.push(_10);_20.elasticDistance.push(53.14132102234569);_20.connections.push(_11);_20.elasticDistance.push(92.0869154657707);_20.connections.push(_12);_20.elasticDistance.push(130.38404810405297);_20.connections.push(_13);_20.elasticDistance.push(159.22311389996113);_20.connections.push(_14);_20.elasticDistance.push(166.1114083980989);_20.connections.push(_15);_20.elasticDistance.push(171.60710940983768);_20.connections.push(_16);_20.elasticDistance.push(171.23667831396403);_20.connections.push(_17);_20.elasticDistance.push(30.805843601498726);_20.connections.push(_18);_20.elasticDistance.push(105.26157893552613);_20.connections.push(_19);_20.elasticDistance.push(173.29743217947575);_21.connections.push(_0);_21.elasticDistance.push(139.34489585198304);_21.connections.push(_1);_21.elasticDistance.push(157.610278852618);_21.connections.push(_2);_21.elasticDistance.push(175.75551200460256);_21.connections.push(_3);_21.elasticDistance.push(174.9085475327035);_21.connections.push(_4);_21.elasticDistance.push(169.1862878604528);_21.connections.push(_5);_21.elasticDistance.push(169.84993376507393);_21.connections.push(_6);_21.elasticDistance.push(167.44252745345193);_21.connections.push(_7);_21.elasticDistance.push(156.16977940690063);_21.connections.push(_8);_21.elasticDistance.push(129.79984591670362);_21.connections.push(_9);_21.elasticDistance.push(101.13851887386922);_21.connections.push(_10);_21.elasticDistance.push(66.85057965343307);_21.connections.push(_11);_21.elasticDistance.push(24.186773244895647);_21.connections.push(_12);_21.elasticDistance.push(25.079872407968907);_21.connections.push(_13);_21.elasticDistance.push(61.032778078668514);_21.connections.push(_14);_21.elasticDistance.push(81.74350127074322);_21.connections.push(_15);_21.elasticDistance.push(108.78419002777932);_21.connections.push(_16);_21.elasticDistance.push(125.87692401707312);_21.connections.push(_17);_21.elasticDistance.push(87.86353054595519);_21.connections.push(_18);_21.elasticDistance.push(170.14405661086138);_21.connections.push(_19);_21.elasticDistance.push(170.3437700651245);_21.connections.push(_20);_21.elasticDistance.push(114.33722053644648);po.points.push(_0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21);objects.push(po);}


//addPhysicsObjects008045998588204384(600, 100);

function addPhysicsObjects013343541300855577(x, y){var po = new PhysicsObject([]);var _0 = new Point(x + -70.33333333333331, y + -5.333333333333314, 1, [], []);var _1 = new Point(x + 70.66666666666669, y + -5.333333333333314, 1, [], []);var _2 = new Point(x + -0.3333333333333144, y + -5.333333333333314, 1, [], []);var _3 = new Point(x + -35.333333333333314, y + 31.666666666666686, 1, [], []);var _4 = new Point(x + 35.666666666666686, y + 31.666666666666686, 1, [], []);var _5 = new Point(x + -0.3333333333333144, y + -47.333333333333314, 1, [], []);_1.connections.push(_0);_1.elasticDistance.push(141);_2.connections.push(_0);_2.elasticDistance.push(70);_2.connections.push(_1);_2.elasticDistance.push(71);_3.connections.push(_0);_3.elasticDistance.push(50.93132631298737);_3.connections.push(_1);_3.elasticDistance.push(112.27199116431488);_3.connections.push(_2);_3.elasticDistance.push(50.93132631298737);_4.connections.push(_0);_4.elasticDistance.push(112.27199116431488);_4.connections.push(_1);_4.elasticDistance.push(50.93132631298737);_4.connections.push(_2);_4.elasticDistance.push(51.62363799656123);_4.connections.push(_3);_4.elasticDistance.push(71);_5.connections.push(_0);_5.elasticDistance.push(81.6333265278342);_5.connections.push(_1);_5.elasticDistance.push(82.49242389456137);_5.connections.push(_2);_5.elasticDistance.push(42);_5.connections.push(_3);_5.elasticDistance.push(86.4060183089118);_5.connections.push(_4);_5.elasticDistance.push(86.81589716175259);po.points.push(_0, _1, _2, _3, _4, _5);objects.push(po);}


//addPhysicsObjects013343541300855577(500, 100);
  //objects[1].points[0].connections.push(objects[0].points[0]); objects[1].points[0].elasticDistance[0] = [10]; objects[1].points[4].connections.push(objects[2].points[3]); objects[1].points[4].elasticDistance.push(60);

  update();
}

function update(){
  ctx.clearRect(0, 0, c.width, c.height);

  if(nearestPoint){
    nearestPoint.pinned = md;

    if(md){
      nearestPoint.x = mx;
      nearestPoint.y = my;
    } else{
      nearestPoint = null;
    }
  }

  if(keyCodes[32]){
    objects[2].points[5].x -= Math.cos(objects[2].getAngle()) * 1;
    objects[2].points[5].y -= Math.sin(objects[2].getAngle()) * 1;
  }

  torque = 1/3;

  if(keyCodes[37]){
    objects[2].points[4].x -= Math.cos(objects[2].getAngle()) * torque;
    objects[2].points[4].y -= Math.sin(objects[2].getAngle()) * torque;
  }

  if(keyCodes[39]){
    objects[2].points[2].x -= Math.cos(objects[2].getAngle()) * torque;
    objects[2].points[2].y -= Math.sin(objects[2].getAngle()) * torque;
  }

  for(var i in objects){
    var o = objects[i];
    for(var j in o.points){
      var p = o.points[j];
      p.applyPhysics(o);
    }
    o.draw();
  }

  window.requestAnimationFrame(update);
}

var PhysicsObject = function(points){
  this.points = points || [];
  this.draw = function(){
    for(var i in points){
      var p = points[i];


      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, TAU);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
      for(var j in p.connections){
        var q = p.connections[j];
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
      }

      ctx.stroke();

    }
  }
}

var Point = function(x, y, mass, connections, elasticDistance){
  this.x = x;
  this.y = y;

  this.nx = 0;
  this.ny = 0;

  this.px = x;
  this.py = y;

  this.vx = 0;
  this.vy = 0;

  this.f = 0.98;

  this.pinned = false;

  this.mass = mass;
  this.connections = connections || [];
  this.elasticDistance = elasticDistance || 10;

  this.solveConstraints = function(p, i){
    var dx = this.x - p.x,
        dy = this.y - p.y,
        dist = Math.sqrt(dx * dx + dy * dy),
        diff = (this.elasticDistance[i] - dist) / dist,
        scalar1 = (1/this.mass)/((1/this.mass) + (1/p.mass)),
        scalar2 = 1 - scalar1;

    if(!this.pinned){
      this.x += dx * scalar1 * diff * C;
      this.y += dy * scalar1 * diff * C;
    }

    if(!p.pinned){
      p.x -= dx * scalar2 * diff * C;
      p.y -= dy * scalar2 * diff * C;
    }
  }

  this.applyPhysics = function(o){
    this.vy += G;

    this.vx *= F;
    this.vy *= F;


    this.nx = this.x + (this.x - this.px) + this.vx * Math.pow(C, 2);
    this.ny = this.y + (this.y - this.py) + this.vy * Math.pow(C, 2);

    this.px = this.x;
    this.py = this.y;

    if(!this.pinned){
      this.x = this.nx;
      this.y = this.ny;
    }

    if(this.y > c.height){
      this.y = c.height;
    }

    if(this.x < 0){
      this.x = 0;
    }

    if(this.x > c.width){
      this.x = c.width;
    }

    if(this.connections.length > 0){
      for(var t = 0; t < 50; t++) {
          for(var i in this.connections){
            this.solveConstraints(this.connections[i], i);
          }
      }
    }
  }
}

window.addEventListener("load", windowLoad, false);

function windowResize(){
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}

function mouseMove(e){
  setMousePosition(e);
}

function mouseDown(e){
  setMousePosition(e);
  md = true;

  for(var i in objects){
    for(var j in objects[i].points){
      var p = objects[i].points[j];
      if(nearestPoint == null) nearestPoint = p;
      if(distance(p.x, p.y, mx, my) <= distance(nearestPoint.x, nearestPoint.y, mx, my))  nearestPoint = p;
    }
  }
}

function mouseUp(e){
  setMousePosition(e);
  md = false;
}

function setMousePosition(e){
  mx = e.clientX;
  my = e.clientY;
}

function distance(fx, fy, tx, ty){
  return Math.sqrt(Math.pow(fx - tx, 2) + Math.pow(fy - ty, 2));
}

function keyDown(e){
  keyCodes[e.keyCode] = true;
}

function keyUp(e){
  keyCodes[e.keyCode] = false;
}

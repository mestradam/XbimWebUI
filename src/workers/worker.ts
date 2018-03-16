export const worker = "!function(r,t){for(var e in t)r[e]=t[e]}(this,function(r){var t={};function e(I){if(t[I])return t[I].exports;var E=t[I]={i:I,l:!1,exports:{}};return r[I].call(E.exports,E,E.exports,e),E.l=!0,E.exports}return e.m=r,e.c=t,e.d=function(r,t,I){e.o(r,t)||Object.defineProperty(r,t,{configurable:!1,enumerable:!0,get:I})},e.r=function(r){Object.defineProperty(r,\"__esModule\",{value:!0})},e.n=function(r){var t=r&&r.__esModule?function(){return r.default}:function(){return r};return e.d(t,\"a\",t),t},e.o=function(r,t){return Object.prototype.hasOwnProperty.call(r,t)},e.p=\"\",e(e.s=6)}([function(r,t,e){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var I=function(){return function(){}}();t.Message=I,function(r){r[r.PROGRESS=0]=\"PROGRESS\",r[r.COMPLETED=1]=\"COMPLETED\",r[r.FAILED=2]=\"FAILED\"}(t.MessageType||(t.MessageType={}))},function(r,t,e){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var I=e(0),E=function(){function r(){this._buffer=null,this._view=null,this._position=0,this._progress=function(r){},this._lastProgress=0}return Object.defineProperty(r.prototype,\"Position\",{get:function(){return this._position},enumerable:!0,configurable:!0}),r.prototype.getSubReader=function(t){var e=new r,I=this._buffer.slice(this._position,this._position+t);return e.load(I,null,null),this._position+=t,e},r.prototype.load=function(r,t,e){this._position=0;var E=this;if(e=e||function(r){},this._progress=e,void 0===r||null==r)throw\"Source must be defined\";if(\"string\"==typeof r){var C=new XMLHttpRequest;C.open(\"GET\",r,!0),C.onreadystatechange=function(){if(4==C.readyState&&200==C.status){var r=new FileReader;r.onloadend=function(){r.result&&(E._buffer=r.result,E._view=new DataView(E._buffer),E.onloaded&&E.onloaded(E))},r.onprogress=function(r){e({message:\"Downloading geometry\",percent:Math.floor(r.loaded/r.total*100),type:I.MessageType.PROGRESS})},r.readAsArrayBuffer(C.response)}if(4==C.readyState&&200!=C.status){var t=\"Failed to fetch binary data from server. Server code: \"+C.status+\". This might be due to CORS policy of your browser if you run this as a local file.\";throw e({message:\"Downloading geometry\",percent:0,type:I.MessageType.FAILED}),E.onerror&&E.onerror(t),t}},C.responseType=\"blob\",null!=t&&Object.keys(t).forEach(function(r){var e=t[r];C.setRequestHeader(r,e)}),C.send()}else if(r instanceof Blob||r instanceof File){var n=new FileReader;n.onloadend=function(){n.result&&(E._buffer=n.result,E._view=new DataView(E._buffer),E.onloaded&&E.onloaded(E))},n.onprogress=function(r){e({message:\"Loading binary data\",percent:Math.floor(r.loaded/r.total*100),type:I.MessageType.PROGRESS})},n.readAsArrayBuffer(r)}else r instanceof ArrayBuffer&&(this._buffer=r,this._view=new DataView(E._buffer),E.onloaded&&E.onloaded(E))},r.prototype.seek=function(r){if(r<0||r>this._buffer.byteLength)throw\"Position out of range.\";this._position=r},r.prototype.isEOF=function(){if(null==this._position)throw\"Position is not defined\";return this._position==this._buffer.byteLength},r.prototype.readArray=function(r,t,e){null==t&&(t=1);var I=r*t,E=this._position;return this._position+=I,this.reportProgress(),1===t?new e(this._buffer.slice(E,E+I))[0]:new e(this._buffer.slice(E,E+I))},r.prototype.move=function(r){var t=this._position;return this._position+=r,this.reportProgress(),t},r.prototype.reportProgress=function(){null!=this._progress&&this._position-this._lastProgress>5e5&&(this._lastProgress=this._position,this._progress({type:I.MessageType.PROGRESS,message:\"Processing data\",percent:Math.floor(100*this._position/this._buffer.byteLength)}))},r.prototype.readByte=function(){return this.readUint8()},r.prototype.readByteArray=function(r){return this.readUint8Array(r)},r.prototype.readUint8=function(){var r=this.move(1);return this._view.getUint8(r)},r.prototype.readUint8Array=function(r){return this.readArray(1,r,Uint8Array)},r.prototype.readInt16=function(){var r=this.move(2);return this._view.getInt16(r,!0)},r.prototype.readInt16Array=function(r){return this.readArray(2,r,Int16Array)},r.prototype.readUInt16=function(){var r=this.move(2);return this._view.getUint16(r,!0)},r.prototype.readUint16Array=function(r){return this.readArray(2,r,Uint16Array)},r.prototype.readInt32=function(){var r=this.move(4);return this._view.getInt32(r,!0)},r.prototype.readInt32Array=function(r){return this.readArray(4,r,Int32Array)},r.prototype.readUint32=function(){var r=this.move(4);return this._view.getUint32(r,!0)},r.prototype.readUint32Array=function(r){return this.readArray(4,r,Uint32Array)},r.prototype.readFloat32=function(){var r=this.move(4);return this._view.getFloat32(r,!0)},r.prototype.readFloat32Array=function(r){return this.readArray(4,r,Float32Array)},r.prototype.readFloat64=function(){var r=this.move(8);return this._view.getFloat64(r,!0)},r.prototype.readFloat64Array=function(r){return this.readArray(8,r,Float64Array)},r.prototype.readChar=function(r){null==r&&(r=1);var t=this.readByteArray(r),e=new Array(r);for(var I in t)e[I]=String.fromCharCode(t[I]);return 1===r?e[0]:e},r.prototype.readPoint=function(r){null==r&&(r=1);for(var t=this.readFloat32Array(3*r),e=new Array(r),I=0;I<r;I++){var E=3*I*4,C=new Float32Array(t.buffer,E,3);e[I]=C}return 1===r?e[0]:e},r.prototype.readRgba=function(r){null==r&&(r=1);for(var t=this.readByteArray(4*r),e=new Array(r),I=0;I<r;I++){var E=4*I,C=new Uint8Array(t.buffer,E,4);e[I]=C}return 1===r?e[0]:e},r.prototype.readPackedNormal=function(r){null==r&&(r=1);for(var t=this.readUint8Array(2*r),e=new Array(r),I=0;I<r;I++){var E=new Uint8Array(t.buffer,2*I,2);e[I]=E}return 1===r?e[0]:e},r.prototype.readMatrix4x4=function(r){null==r&&(r=1);for(var t=this.readFloat32Array(16*r),e=new Array(r),I=0;I<r;I++){var E=16*I*4,C=new Float32Array(t.buffer,E,16);e[I]=C}return 1===r?e[0]:e},r.prototype.readMatrix4x4_64=function(r){null==r&&(r=1);for(var t=this.readFloat64Array(16*r),e=new Array(r),I=0;I<r;I++){var E=16*I*8,C=new Float64Array(t.buffer,E,16);e[I]=C}return 1===r?e[0]:e},r.prototype.readData=function(r){var t=this.move(r);return this._buffer.slice(t,t+r)},r}();t.BinaryReader=E},function(r,t,e){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0}),function(r){r[r.IFCPRODUCT=20]=\"IFCPRODUCT\",r[r.IFCELEMENT=19]=\"IFCELEMENT\",r[r.IFCBUILDINGELEMENT=26]=\"IFCBUILDINGELEMENT\",r[r.IFCFOOTING=120]=\"IFCFOOTING\",r[r.IFCPILE=572]=\"IFCPILE\",r[r.IFCBEAM=171]=\"IFCBEAM\",r[r.IFCBEAMSTANDARDCASE=1104]=\"IFCBEAMSTANDARDCASE\",r[r.IFCBUILDINGELEMENTPROXY=560]=\"IFCBUILDINGELEMENTPROXY\",r[r.IFCCHIMNEY=1120]=\"IFCCHIMNEY\",r[r.IFCCOLUMN=383]=\"IFCCOLUMN\",r[r.IFCCOLUMNSTANDARDCASE=1126]=\"IFCCOLUMNSTANDARDCASE\",r[r.IFCCOVERING=382]=\"IFCCOVERING\",r[r.IFCCURTAINWALL=456]=\"IFCCURTAINWALL\",r[r.IFCDOOR=213]=\"IFCDOOR\",r[r.IFCDOORSTANDARDCASE=1151]=\"IFCDOORSTANDARDCASE\",r[r.IFCMEMBER=310]=\"IFCMEMBER\",r[r.IFCMEMBERSTANDARDCASE=1214]=\"IFCMEMBERSTANDARDCASE\",r[r.IFCPLATE=351]=\"IFCPLATE\",r[r.IFCPLATESTANDARDCASE=1224]=\"IFCPLATESTANDARDCASE\",r[r.IFCRAILING=350]=\"IFCRAILING\",r[r.IFCRAMP=414]=\"IFCRAMP\",r[r.IFCRAMPFLIGHT=348]=\"IFCRAMPFLIGHT\",r[r.IFCROOF=347]=\"IFCROOF\",r[r.IFCSHADINGDEVICE=1265]=\"IFCSHADINGDEVICE\",r[r.IFCSLAB=99]=\"IFCSLAB\",r[r.IFCSLABELEMENTEDCASE=1268]=\"IFCSLABELEMENTEDCASE\",r[r.IFCSLABSTANDARDCASE=1269]=\"IFCSLABSTANDARDCASE\",r[r.IFCSTAIR=346]=\"IFCSTAIR\",r[r.IFCSTAIRFLIGHT=25]=\"IFCSTAIRFLIGHT\",r[r.IFCWALL=452]=\"IFCWALL\",r[r.IFCWALLELEMENTEDCASE=1314]=\"IFCWALLELEMENTEDCASE\",r[r.IFCWALLSTANDARDCASE=453]=\"IFCWALLSTANDARDCASE\",r[r.IFCWINDOW=667]=\"IFCWINDOW\",r[r.IFCWINDOWSTANDARDCASE=1316]=\"IFCWINDOWSTANDARDCASE\",r[r.IFCELEMENTCOMPONENT=424]=\"IFCELEMENTCOMPONENT\",r[r.IFCREINFORCINGELEMENT=262]=\"IFCREINFORCINGELEMENT\",r[r.IFCREINFORCINGBAR=571]=\"IFCREINFORCINGBAR\",r[r.IFCREINFORCINGMESH=531]=\"IFCREINFORCINGMESH\",r[r.IFCTENDON=261]=\"IFCTENDON\",r[r.IFCTENDONANCHOR=675]=\"IFCTENDONANCHOR\",r[r.IFCBUILDINGELEMENTPART=220]=\"IFCBUILDINGELEMENTPART\",r[r.IFCDISCRETEACCESSORY=423]=\"IFCDISCRETEACCESSORY\",r[r.IFCFASTENER=535]=\"IFCFASTENER\",r[r.IFCMECHANICALFASTENER=536]=\"IFCMECHANICALFASTENER\",r[r.IFCVIBRATIONISOLATOR=1312]=\"IFCVIBRATIONISOLATOR\",r[r.IFCFEATUREELEMENT=386]=\"IFCFEATUREELEMENT\",r[r.IFCSURFACEFEATURE=1287]=\"IFCSURFACEFEATURE\",r[r.IFCFEATUREELEMENTSUBTRACTION=499]=\"IFCFEATUREELEMENTSUBTRACTION\",r[r.IFCVOIDINGFEATURE=1313]=\"IFCVOIDINGFEATURE\",r[r.IFCOPENINGELEMENT=498]=\"IFCOPENINGELEMENT\",r[r.IFCOPENINGSTANDARDCASE=1217]=\"IFCOPENINGSTANDARDCASE\",r[r.IFCFEATUREELEMENTADDITION=385]=\"IFCFEATUREELEMENTADDITION\",r[r.IFCPROJECTIONELEMENT=384]=\"IFCPROJECTIONELEMENT\",r[r.IFCFURNISHINGELEMENT=253]=\"IFCFURNISHINGELEMENT\",r[r.IFCFURNITURE=1184]=\"IFCFURNITURE\",r[r.IFCSYSTEMFURNITUREELEMENT=1291]=\"IFCSYSTEMFURNITUREELEMENT\",r[r.IFCDISTRIBUTIONELEMENT=44]=\"IFCDISTRIBUTIONELEMENT\",r[r.IFCDISTRIBUTIONFLOWELEMENT=45]=\"IFCDISTRIBUTIONFLOWELEMENT\",r[r.IFCDISTRIBUTIONCHAMBERELEMENT=180]=\"IFCDISTRIBUTIONCHAMBERELEMENT\",r[r.IFCENERGYCONVERSIONDEVICE=175]=\"IFCENERGYCONVERSIONDEVICE\",r[r.IFCAIRTOAIRHEATRECOVERY=1097]=\"IFCAIRTOAIRHEATRECOVERY\",r[r.IFCBOILER=1105]=\"IFCBOILER\",r[r.IFCBURNER=1109]=\"IFCBURNER\",r[r.IFCCHILLER=1119]=\"IFCCHILLER\",r[r.IFCCOIL=1124]=\"IFCCOIL\",r[r.IFCCONDENSER=1132]=\"IFCCONDENSER\",r[r.IFCCOOLEDBEAM=1141]=\"IFCCOOLEDBEAM\",r[r.IFCCOOLINGTOWER=1142]=\"IFCCOOLINGTOWER\",r[r.IFCENGINE=1164]=\"IFCENGINE\",r[r.IFCEVAPORATIVECOOLER=1166]=\"IFCEVAPORATIVECOOLER\",r[r.IFCEVAPORATOR=1167]=\"IFCEVAPORATOR\",r[r.IFCHEATEXCHANGER=1187]=\"IFCHEATEXCHANGER\",r[r.IFCHUMIDIFIER=1188]=\"IFCHUMIDIFIER\",r[r.IFCTUBEBUNDLE=1305]=\"IFCTUBEBUNDLE\",r[r.IFCUNITARYEQUIPMENT=1310]=\"IFCUNITARYEQUIPMENT\",r[r.IFCELECTRICGENERATOR=1160]=\"IFCELECTRICGENERATOR\",r[r.IFCELECTRICMOTOR=1161]=\"IFCELECTRICMOTOR\",r[r.IFCMOTORCONNECTION=1216]=\"IFCMOTORCONNECTION\",r[r.IFCSOLARDEVICE=1270]=\"IFCSOLARDEVICE\",r[r.IFCTRANSFORMER=1303]=\"IFCTRANSFORMER\",r[r.IFCFLOWCONTROLLER=121]=\"IFCFLOWCONTROLLER\",r[r.IFCAIRTERMINALBOX=1096]=\"IFCAIRTERMINALBOX\",r[r.IFCDAMPER=1148]=\"IFCDAMPER\",r[r.IFCFLOWMETER=1182]=\"IFCFLOWMETER\",r[r.IFCVALVE=1311]=\"IFCVALVE\",r[r.IFCELECTRICDISTRIBUTIONBOARD=1157]=\"IFCELECTRICDISTRIBUTIONBOARD\",r[r.IFCELECTRICTIMECONTROL=1162]=\"IFCELECTRICTIMECONTROL\",r[r.IFCPROTECTIVEDEVICE=1235]=\"IFCPROTECTIVEDEVICE\",r[r.IFCSWITCHINGDEVICE=1290]=\"IFCSWITCHINGDEVICE\",r[r.IFCFLOWFITTING=467]=\"IFCFLOWFITTING\",r[r.IFCDUCTFITTING=1153]=\"IFCDUCTFITTING\",r[r.IFCPIPEFITTING=1222]=\"IFCPIPEFITTING\",r[r.IFCCABLECARRIERFITTING=1111]=\"IFCCABLECARRIERFITTING\",r[r.IFCCABLEFITTING=1113]=\"IFCCABLEFITTING\",r[r.IFCJUNCTIONBOX=1195]=\"IFCJUNCTIONBOX\",r[r.IFCFLOWMOVINGDEVICE=502]=\"IFCFLOWMOVINGDEVICE\",r[r.IFCCOMPRESSOR=1131]=\"IFCCOMPRESSOR\",r[r.IFCFAN=1177]=\"IFCFAN\",r[r.IFCPUMP=1238]=\"IFCPUMP\",r[r.IFCFLOWSEGMENT=574]=\"IFCFLOWSEGMENT\",r[r.IFCDUCTSEGMENT=1154]=\"IFCDUCTSEGMENT\",r[r.IFCPIPESEGMENT=1223]=\"IFCPIPESEGMENT\",r[r.IFCCABLECARRIERSEGMENT=1112]=\"IFCCABLECARRIERSEGMENT\",r[r.IFCCABLESEGMENT=1115]=\"IFCCABLESEGMENT\",r[r.IFCFLOWSTORAGEDEVICE=371]=\"IFCFLOWSTORAGEDEVICE\",r[r.IFCTANK=1293]=\"IFCTANK\",r[r.IFCELECTRICFLOWSTORAGEDEVICE=1159]=\"IFCELECTRICFLOWSTORAGEDEVICE\",r[r.IFCFLOWTERMINAL=46]=\"IFCFLOWTERMINAL\",r[r.IFCFIRESUPPRESSIONTERMINAL=1179]=\"IFCFIRESUPPRESSIONTERMINAL\",r[r.IFCSANITARYTERMINAL=1262]=\"IFCSANITARYTERMINAL\",r[r.IFCSTACKTERMINAL=1277]=\"IFCSTACKTERMINAL\",r[r.IFCWASTETERMINAL=1315]=\"IFCWASTETERMINAL\",r[r.IFCAIRTERMINAL=1095]=\"IFCAIRTERMINAL\",r[r.IFCMEDICALDEVICE=1212]=\"IFCMEDICALDEVICE\",r[r.IFCSPACEHEATER=1272]=\"IFCSPACEHEATER\",r[r.IFCAUDIOVISUALAPPLIANCE=1099]=\"IFCAUDIOVISUALAPPLIANCE\",r[r.IFCCOMMUNICATIONSAPPLIANCE=1127]=\"IFCCOMMUNICATIONSAPPLIANCE\",r[r.IFCELECTRICAPPLIANCE=1156]=\"IFCELECTRICAPPLIANCE\",r[r.IFCLAMP=1198]=\"IFCLAMP\",r[r.IFCLIGHTFIXTURE=1199]=\"IFCLIGHTFIXTURE\",r[r.IFCOUTLET=1219]=\"IFCOUTLET\",r[r.IFCFLOWTREATMENTDEVICE=425]=\"IFCFLOWTREATMENTDEVICE\",r[r.IFCINTERCEPTOR=1193]=\"IFCINTERCEPTOR\",r[r.IFCDUCTSILENCER=1155]=\"IFCDUCTSILENCER\",r[r.IFCFILTER=1178]=\"IFCFILTER\",r[r.IFCDISTRIBUTIONCONTROLELEMENT=468]=\"IFCDISTRIBUTIONCONTROLELEMENT\",r[r.IFCPROTECTIVEDEVICETRIPPINGUNIT=1236]=\"IFCPROTECTIVEDEVICETRIPPINGUNIT\",r[r.IFCACTUATOR=1091]=\"IFCACTUATOR\",r[r.IFCALARM=1098]=\"IFCALARM\",r[r.IFCCONTROLLER=1139]=\"IFCCONTROLLER\",r[r.IFCFLOWINSTRUMENT=1181]=\"IFCFLOWINSTRUMENT\",r[r.IFCSENSOR=1264]=\"IFCSENSOR\",r[r.IFCUNITARYCONTROLELEMENT=1308]=\"IFCUNITARYCONTROLELEMENT\",r[r.IFCCIVILELEMENT=1122]=\"IFCCIVILELEMENT\",r[r.IFCELEMENTASSEMBLY=18]=\"IFCELEMENTASSEMBLY\",r[r.IFCGEOGRAPHICELEMENT=1185]=\"IFCGEOGRAPHICELEMENT\",r[r.IFCTRANSPORTELEMENT=416]=\"IFCTRANSPORTELEMENT\",r[r.IFCVIRTUALELEMENT=168]=\"IFCVIRTUALELEMENT\",r[r.IFCSTRUCTURALACTIVITY=41]=\"IFCSTRUCTURALACTIVITY\",r[r.IFCSTRUCTURALACTION=40]=\"IFCSTRUCTURALACTION\",r[r.IFCSTRUCTURALCURVEACTION=1279]=\"IFCSTRUCTURALCURVEACTION\",r[r.IFCSTRUCTURALLINEARACTION=463]=\"IFCSTRUCTURALLINEARACTION\",r[r.IFCSTRUCTURALSURFACEACTION=1284]=\"IFCSTRUCTURALSURFACEACTION\",r[r.IFCSTRUCTURALPLANARACTION=39]=\"IFCSTRUCTURALPLANARACTION\",r[r.IFCSTRUCTURALPOINTACTION=356]=\"IFCSTRUCTURALPOINTACTION\",r[r.IFCSTRUCTURALREACTION=355]=\"IFCSTRUCTURALREACTION\",r[r.IFCSTRUCTURALCURVEREACTION=1280]=\"IFCSTRUCTURALCURVEREACTION\",r[r.IFCSTRUCTURALPOINTREACTION=354]=\"IFCSTRUCTURALPOINTREACTION\",r[r.IFCSTRUCTURALSURFACEREACTION=1285]=\"IFCSTRUCTURALSURFACEREACTION\",r[r.IFCSTRUCTURALITEM=226]=\"IFCSTRUCTURALITEM\",r[r.IFCSTRUCTURALCONNECTION=265]=\"IFCSTRUCTURALCONNECTION\",r[r.IFCSTRUCTURALCURVECONNECTION=534]=\"IFCSTRUCTURALCURVECONNECTION\",r[r.IFCSTRUCTURALPOINTCONNECTION=533]=\"IFCSTRUCTURALPOINTCONNECTION\",r[r.IFCSTRUCTURALSURFACECONNECTION=264]=\"IFCSTRUCTURALSURFACECONNECTION\",r[r.IFCSTRUCTURALMEMBER=225]=\"IFCSTRUCTURALMEMBER\",r[r.IFCSTRUCTURALCURVEMEMBER=224]=\"IFCSTRUCTURALCURVEMEMBER\",r[r.IFCSTRUCTURALCURVEMEMBERVARYING=227]=\"IFCSTRUCTURALCURVEMEMBERVARYING\",r[r.IFCSTRUCTURALSURFACEMEMBER=420]=\"IFCSTRUCTURALSURFACEMEMBER\",r[r.IFCSTRUCTURALSURFACEMEMBERVARYING=421]=\"IFCSTRUCTURALSURFACEMEMBERVARYING\",r[r.IFCPORT=179]=\"IFCPORT\",r[r.IFCDISTRIBUTIONPORT=178]=\"IFCDISTRIBUTIONPORT\",r[r.IFCANNOTATION=634]=\"IFCANNOTATION\",r[r.IFCSPATIALELEMENT=1273]=\"IFCSPATIALELEMENT\",r[r.IFCSPATIALSTRUCTUREELEMENT=170]=\"IFCSPATIALSTRUCTUREELEMENT\",r[r.IFCBUILDING=169]=\"IFCBUILDING\",r[r.IFCBUILDINGSTOREY=459]=\"IFCBUILDINGSTOREY\",r[r.IFCSITE=349]=\"IFCSITE\",r[r.IFCSPACE=454]=\"IFCSPACE\",r[r.IFCEXTERNALSPATIALSTRUCTUREELEMENT=1175]=\"IFCEXTERNALSPATIALSTRUCTUREELEMENT\",r[r.IFCEXTERNALSPATIALELEMENT=1174]=\"IFCEXTERNALSPATIALELEMENT\",r[r.IFCSPATIALZONE=1275]=\"IFCSPATIALZONE\",r[r.IFCGRID=564]=\"IFCGRID\",r[r.IFCPROXY=447]=\"IFCPROXY\"}(t.ProductType||(t.ProductType={}))},function(r,t,e){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0}),function(r){r[r.UNDEFINED=255]=\"UNDEFINED\",r[r.HIDDEN=254]=\"HIDDEN\",r[r.HIGHLIGHTED=253]=\"HIGHLIGHTED\",r[r.XRAYVISIBLE=252]=\"XRAYVISIBLE\",r[r.PICKING_ONLY=251]=\"PICKING_ONLY\",r[r.UNSTYLED=225]=\"UNSTYLED\"}(t.State||(t.State={}))},function(r,t,e){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var I=e(1),E=function(){function r(){this.load=function(r){var t=new I.BinaryReader,e=this;t.onloaded=function(){e.parse(t),e.onloaded&&e.onloaded(this)},t.load(r,null,null)}}return r.prototype.parse=function(r){r.readByte();var t=r.readInt32(),e=r.readInt32();this.vertices=r.readFloat32Array(3*t),this.indices=new Uint32Array(3*e),this.normals=new Uint8Array(6*e);var I,E=0;I=t<=255?function(t){return r.readByteArray(t)}:t<=65535?function(t){return r.readUint16Array(t)}:function(t){return r.readInt32Array(t)};var C=r.readInt32();if(0!==t&&0!==e)for(var n=0;n<C;n++){var a=r.readInt32();if(0!=a){var o=a>0;if(a=Math.abs(a),o){var i=r.readByteArray(2),T=I(3*a);this.indices.set(T,E);for(var F=0;F<3*a;F++)this.normals[2*E]=i[0],this.normals[2*E+1]=i[1],E++}else for(F=0;F<a;F++)this.indices[E]=I(),this.normals.set(r.readByteArray(2),2*E),E++,this.indices[E]=I(),this.normals.set(r.readByteArray(2),2*E),E++,this.indices[E]=I(),this.normals.set(r.readByteArray(2),2*E),E++}}},r}();t.TriangulatedShape=E},function(r,t,e){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var I=e(1),E=e(4),C=e(3),n=e(2),a=e(0),o=function(){function r(){this.meter=1e3,this._iVertex=0,this._iIndexForward=0,this._iIndexBackward=0,this._iTransform=0,this._iMatrix=0,this.productMaps={},this.productIdLookup=[],this._styleMap=new F}return r.prototype.parse=function(r){this._reader=r;var t=r;if(94132117!=t.readInt32())throw\"Magic number mismatch.\";var e=t.readByte(),I=t.readInt32(),C=t.readInt32(),n=t.readInt32(),o=t.readInt32(),i=t.readInt32(),F=t.readInt32();this.meter=t.readFloat32();var s=t.readInt16();this.vertices=new Float32Array(this.square(4,3*C)),this.normals=new Uint8Array(6*n),this.indices=new Float32Array(3*n),this.styleIndices=new Uint16Array(3*n),this.styles=new Uint8Array(this.square(1,4*(F+1))),this.products=new Float32Array(3*n),this.states=new Uint8Array(3*n*2),this.transformations=new Float32Array(3*n),this.matrices=new Float32Array(this.square(4,16*o)),this.productMaps={},this.regions=new Array(s),this._iVertex=0,this._iIndexForward=0,this._iIndexBackward=3*n,this._iTransform=0,this._iMatrix=0;for(var A=0;A<s;A++){(U=new T).population=t.readInt32(),U.centre=t.readFloat32Array(3),U.bbox=t.readFloat32Array(6),this.regions[A]=U}for(var R=0;R<F;R++){var N=t.readInt32(),L=255*t.readFloat32(),O=255*t.readFloat32(),u=255*t.readFloat32(),d=255*t.readFloat32();this.styles.set([L,O,u,d],4*R),this._styleMap.Add({id:N,index:R,transparent:d<254})}this.styles.set([255,255,255,255],4*R);var S={id:-1,index:R,transparent:!1};this._styleMap.Add(S);for(A=0;A<i;A++){var p=t.readInt32(),l={productID:p,renderId:A+1,type:t.readInt16(),bBox:t.readFloat32Array(6),spans:[]};this.productMaps[p]=l,this.productIdLookup[A+1]=p}if(e>=3)for(var M=0;M<s;M++)for(var U=this.regions[M],f=t.readInt32(),h=0;h<f;h++){var y=this.readShape(e),c=t.readInt32(),D=t.getSubReader(c);if((v=new E.TriangulatedShape).parse(D),!D.isEOF())throw new Error(\"Incomplete reading of geometry for shape instance \"+y[0].iLabel);this.feedDataArrays(y,v)}else for(var P=0;P<I;P++){var v,b=this.readShape(e);(v=new E.TriangulatedShape).parse(t),this.feedDataArrays(b,v)}if(!t.isEOF())throw this.progress({type:a.MessageType.FAILED,message:\"Processing data\",percent:0}),new Error(\"Binary reader is not at the end of the file.\");this.progress({type:a.MessageType.PROGRESS,message:\"Processing data\",percent:100}),this.transparentIndex=this._iIndexForward},r.prototype.square=function(r,t){if(void 0===r||void 0===t)throw new Error('Wrong arguments for \"square\" function.');if(0==t)return 0;for(var e=t*r,I=Math.ceil(Math.sqrt(e/4));4*I%r!=0;)I++;return I*I*4/r},r.prototype.feedDataArrays=function(r,t){var e=this;r.forEach(function(r){var I=0,E=I=r.transparent?e._iIndexBackward-t.indices.length:e._iIndexForward,a=e.productMaps[r.pLabel];void 0===a&&(a={productID:0,renderId:0,type:n.ProductType.IFCOPENINGELEMENT,bBox:new Float32Array(6),spans:[]},e.productMaps[r.pLabel]=a),e.normals.set(t.normals,2*I);for(var o=a.type==n.ProductType.IFCSPACE||a.type==n.ProductType.IFCOPENINGELEMENT?C.State.HIDDEN:255,i=0;i<t.indices.length;i++)e.indices[I]=t.indices[i]+e._iVertex/3,e.products[I]=a.renderId,e.styleIndices[I]=r.style,e.transformations[I]=r.transform,e.states[2*I]=o,e.states[2*I+1]=255,I++;var T=I;a.spans.push(new Int32Array([E,T])),r.transparent?e._iIndexBackward-=t.indices.length:e._iIndexForward+=t.indices.length},this),this.vertices.set(t.vertices,this._iVertex),this._iVertex+=t.vertices.length},r.prototype.readShape=function(r){for(var t=this._reader,e=t.readInt32(),I=new Array,E=0;E<e;E++){var C=t.readInt32(),n=(t.readInt16(),t.readInt32()),a=t.readInt32(),o=null;e>1&&(o=1===r?t.readFloat32Array(16):t.readFloat64Array(16),this.matrices.set(o,this._iMatrix),this._iMatrix+=16);var i=this._styleMap.GetStyle(a);null===i&&(i=this._styleMap.GetStyle(-1)),I.push({pLabel:C,iLabel:n,style:i.index,transparent:i.transparent,transform:null!=o?this._iTransform++:-1})}return I},r.prototype.load=function(r,t,e){var E=this;this.progress=e||function(r){};var C=new I.BinaryReader,n=this;C.onloaded=function(){n.parse(C),n.onloaded&&n.onloaded(E)},C.onerror=function(r){n.onerror&&n.onerror(r)},C.load(r,t,e)},r}();t.ModelGeometry=o;var i=function(){return function(){}}();t.ProductMap=i;var T=function(){function r(r){this.population=-1,this.centre=null,this.bbox=null,r&&(this.population=r.population,this.centre=new Float32Array(r.centre),this.bbox=new Float32Array(r.bbox))}return r.prototype.clone=function(){var t=new r;return t.population=this.population,t.centre=new Float32Array(this.centre),t.bbox=new Float32Array(this.bbox),t},r.prototype.merge=function(t){if(-1===this.population&&null===this.centre&&null===this.bbox)return new r(t);var e=new r;e.population=this.population+t.population;var I=Math.min(this.bbox[0],t.bbox[0]),E=Math.min(this.bbox[1],t.bbox[1]),C=Math.min(this.bbox[2],t.bbox[2]),n=Math.max(this.bbox[0]+this.bbox[3],t.bbox[0]+t.bbox[3]),a=Math.max(this.bbox[1]+this.bbox[4],t.bbox[1]+t.bbox[4]),o=Math.max(this.bbox[2]+this.bbox[5],t.bbox[2]+t.bbox[5]),i=n-I,T=a-E,F=o-C,s=(I+n)/2,A=(E+a)/2,R=(C+o)/2;return e.bbox=new Float32Array([I,E,C,i,T,F]),e.centre=new Float32Array([s,A,R]),e},r}();t.Region=T;var F=function(){function r(){this._internal={}}return r.prototype.Add=function(r){this._internal[r.id]=r},r.prototype.GetStyle=function(r){var t=this._internal[r];return t||null},r}()},function(r,t,e){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var I=e(5),E=e(0);if(self&&self instanceof DedicatedWorkerGlobalScope){var C=self;C.onmessage=function(r){var t=r.data.model,e=r.data.headers,n=new I.ModelGeometry;n.onerror=function(r){var t={type:E.MessageType.FAILED,message:r,percent:0};C.postMessage(t),console.error(r),C.close()},n.onloaded=function(){try{var r={},t=[];for(var e in n)if(n.hasOwnProperty(e)){var I=n[e];\"function\"==typeof I||e.startsWith(\"_\")||(r[e]=I,ArrayBuffer.isView(I)&&t.push(I.buffer))}var a={type:E.MessageType.COMPLETED,message:\"Completed\",percent:100,result:r};C.postMessage(a,t),C.close()}catch(r){a={type:E.MessageType.FAILED,message:r,percent:0};C.postMessage(a),console.error(r),C.close()}},n.load(t,e,function(r){C.postMessage(r)})}}}]));"
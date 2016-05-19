var fs,
	folderName,
	chartDataJSON;
fs = require('fs');

(function() {
	var chartJSONDataFileName,
		getJSONContentFromFile,
		parseAndPrepareFinalJSON;

	getJSONContentFromFile = (function(fileName, callBack) {
		fs.readFile(fileName, function(error, data) {
			if(typeof callBack != "undefined") {
				callBack(data.toString('ascii', 0, data.length));
			}
		});
	});	

	parseAndPrepareFinalJSON = (function(chartSpecData) {
		var finalData,
			mainObjectName,
			chartSpecDataKeys,
			index,
			chartSpecDataObject,
			updateData;
		finalData = {};
		mainObjectName = folderName.substring(0, folderName.length-1);
		finalData[mainObjectName] = {};
		finalData[mainObjectName].description =  mainObjectName + " Chart from testing GUI ";
		finalData[mainObjectName].id = mainObjectName;
		finalData[mainObjectName].options = {};
		finalData[mainObjectName].action = [];

		chartSpecDataObject = JSON.parse(chartSpecData);
		chartSpecDataKeys = Object.keys(chartSpecDataObject);
		updateData = [];
		for(index in chartSpecDataKeys) {
			if(index == 0) {
				finalData[mainObjectName].options = chartSpecDataObject[chartSpecDataKeys[index]].options;
			} else {
				updateData.push(chartSpecDataObject[chartSpecDataKeys[index]].options);
			}
		}
		finalData[mainObjectName].action.push({updateData: updateData});		
		fs.writeFile(mainObjectName+".json",JSON.stringify(finalData, null, 4), function(err){});
		

	});

	if(process.argv.length<3) {
		console.error("Chart data folder name not specified");
	} else {
		folderName = process.argv[2];
		chartJSONDataFileName = folderName + "chartsSpec.json";
		getJSONContentFromFile(chartJSONDataFileName,function() {
			parseAndPrepareFinalJSON(arguments[0])
		});
	}
	
})();
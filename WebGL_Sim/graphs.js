var tick_count = 10;
var temp_array = makeArrayOf(0,tick_count);
var temp_sub1_array = makeArrayOf(0,tick_count);
var temp_sub2_array = makeArrayOf(0,tick_count);
var velRange_array = makeArrayOf(0,tick_count);
var velRange_sub1_array = makeArrayOf(0,tick_count);
var velRange_sub2_array = makeArrayOf(0,tick_count);

function sortVelocity(velocity){
	var vRange = parseFloat($("#ball_speed").html());
	var tick_range = vRange/tick_count;
	for(j=0;j<=tick_count;j++){
		var velMag = vec3.length(velocity);
		if( (velMag > (2*(j) * tick_range))&&
			(velMag < (2*(j+1) * tick_range))){
				temp_array[j] += 1;
		}
	}
}

function sortSub1(velocity){
	var vRange = parseFloat($("#ball_speed").html());
	var tick_range = vRange/tick_count;
	for(j=0;j<=tick_count;j++){
		var velMag = vec3.length(velocity);
		if( (velMag > (2*(j) * tick_range))&&
			(velMag < (2*(j+1) * tick_range))){
				temp_array[j] += 1;
		}
	}
}

function sortSub2(velocity){
	var vRange = parseFloat($("#ball_speed").html());
	var tick_range = vRange/tick_count;
	for(j=0;j<=tick_count;j++){
		var velMag = vec3.length(velocity);
		if( (velMag > (2*(j) * tick_range))&&
			(velMag < (2*(j+1) * tick_range))){
				temp_array[j] += 1;
		}
	}
}

$(function () {
    
    //load velocity data
    var vRange = 100 * parseFloat($("#ball_speed").html());
    //totalPoints = vRange;
    totalPoints = tick_count;
    function getData() {
        //get total number of balls for each range
        var data = [];
        //console.log(totalPoints);
        for (var i = 1; i <= totalPoints; ++i){
            //data.push([i, velRange_array[i]]);
            data.push([i, velRange_array[i-1]]);
		}
        return data;
    }

    // setup control widget
    var updateInterval = 30;
    $("#updateInterval").val(updateInterval).change(function () {
        var v = $(this).val();
        if (v && !isNaN(+v)) {
            updateInterval = +v;
            if (updateInterval < 1)
                updateInterval = 1;
            if (updateInterval > 2000)
                updateInterval = 2000;
            $(this).val("" + updateInterval);
        }
    });
    
    function getTicks(){
		var ticks = [];
		for(i=1;i<=totalPoints;i++){
			ticks.push([i,i.toString()]);
		}
		//console.log("ticks are: "+ ticks);
		return ticks;	
	};
	
	//var ballCount = parseInt($("#ball_number").html());
    // setup plot
    var options = {
        series: { shadowSize: 0 }, // drawing is faster without shadows
        yaxis: { min: 0, max: parseInt($("#ball_number").html())},
        xaxis: { ticks: getTicks()},
        bars: {
			show: true,
			barWidth: 0.8,
			align: "center"
		}
    };
    
    function update() {
		options.yaxis.max = parseInt($("#ball_number").html())/2;
		plot = $.plot($("#graph_1"), [ getData() ], options);
        //plot.draw();
        setTimeout(update, updateInterval);
    }
    update();
});


$(function () {
    // we use an inline data source in the example, usually data would
    // be fetched from a server
    var data = [], totalPoints = 100;
    function getVolumeData() {
        if (data.length > 0)
            data = data.slice(1);

        // update value with current enclosure volume
        while (data.length < totalPoints) {
            var prev = data.length > 0 ? data[data.length - 1] : 50;
            var y = parseInt($("#box_enclosed").html());
            data.push(y);
        }

        // zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i)
            res.push([i, data[i]])
        return res;
    }

    // setup control widget
    var updateInterval = 30;
    $("#updateInterval").val(updateInterval).change(function () {
        var v = $(this).val();
        if (v && !isNaN(+v)) {
            updateInterval = +v;
            if (updateInterval < 1)
                updateInterval = 1;
            if (updateInterval > 2000)
                updateInterval = 2000;
            $(this).val("" + updateInterval);
        }
    });

    // setup plot
    var options = {
        series: { shadowSize: 0 }, // drawing is faster without shadows
        yaxis: { min: 0, max: 1000 },
        xaxis: { show: true }
    };
    var plot = $.plot($("#graph_2"), [ getVolumeData() ], options);

    function update() {
        plot.setData([ getVolumeData() ]);
        // since the axes don't change, we don't need to call plot.setupGrid()
        plot.draw();
        
        setTimeout(update, updateInterval);
    }

    update();
});

$(function () { 
    //load velocity data
    var vRange = 100 * parseFloat($("#ball_speed").html());
    //totalPoints = vRange;
    totalPoints = tick_count;
    function getData() {
        //get total number of balls for each range
        var data = [];
        //console.log(totalPoints);
        for (var i = 1; i <= totalPoints; ++i){
            //data.push([i, velRange_array[i]]);
            data.push([i, velRange_sub1_array[i-1]]);
		}
        return data;
    }

    // setup control widget
    var updateInterval = 30;
    $("#updateInterval").val(updateInterval).change(function () {
        var v = $(this).val();
        if (v && !isNaN(+v)) {
            updateInterval = +v;
            if (updateInterval < 1)
                updateInterval = 1;
            if (updateInterval > 2000)
                updateInterval = 2000;
            $(this).val("" + updateInterval);
        }
    });
    
    function getTicks(){
		var ticks = [];
		for(i=1;i<=totalPoints;i++){
			ticks.push([i,i.toString()]);
		}
		//console.log("ticks are: "+ ticks);
		return ticks;	
	};
	
	//var ballCount = parseInt($("#ball_number").html());
    // setup plot
    var options = {
        series: { shadowSize: 0 }, // drawing is faster without shadows
        yaxis: { min: 0, max: parseInt($("#ball_number").html())},
        xaxis: { ticks: getTicks()},
        bars: {
			show: true,
			barWidth: 0.8,
			align: "center"
		}
    };
    
    function update() {
		options.yaxis.max = parseInt($("#ball_number").html())/2;
		plot = $.plot($("#graph_3"), [ getData() ], options);
        //plot.draw();
        setTimeout(update, updateInterval);
    }
    update();
});

$(function () {
    //load velocity data
    var vRange = 100 * parseFloat($("#ball_speed").html());
    //totalPoints = vRange;
    totalPoints = tick_count;
    function getData() {
        //get total number of balls for each range
        var data = [];
        //console.log(totalPoints);
        for (var i = 1; i <= totalPoints; ++i){
            //data.push([i, velRange_array[i]]);
            data.push([i, velRange_sub2_array[i-1]]);
		}
        return data;
    }

    // setup control widget
    var updateInterval = 30;
    $("#updateInterval").val(updateInterval).change(function () {
        var v = $(this).val();
        if (v && !isNaN(+v)) {
            updateInterval = +v;
            if (updateInterval < 1)
                updateInterval = 1;
            if (updateInterval > 2000)
                updateInterval = 2000;
            $(this).val("" + updateInterval);
        }
    });
    
    function getTicks(){
		var ticks = [];
		for(i=1;i<=totalPoints;i++){
			ticks.push([i,i.toString()]);
		}
		//console.log("ticks are: "+ ticks);
		return ticks;	
	};
	
	//var ballCount = parseInt($("#ball_number").html());
    // setup plot
    var options = {
        series: { shadowSize: 0 }, // drawing is faster without shadows
        yaxis: { min: 0, max: parseInt($("#ball_number").html())},
        xaxis: { ticks: getTicks()},
        bars: {
			show: true,
			barWidth: 0.8,
			align: "center"
		}
    };
    
    function update() {
		options.yaxis.max = parseInt($("#ball_number").html())/2;
		plot = $.plot($("#graph_4"), [ getData() ], options);
        //plot.draw();
        setTimeout(update, updateInterval);
    }
    update();
});

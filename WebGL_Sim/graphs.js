var tick_count = 10;
var temp_array = makeArrayOf(0,tick_count);
var temp_sub1_array = makeArrayOf(0,tick_count);
var temp_sub2_array = makeArrayOf(0,tick_count);
var velRange_array = makeArrayOf(0,tick_count);
var velRange_sub1_array = makeArrayOf(0,tick_count);
var velRange_sub2_array = makeArrayOf(0,tick_count);
var axis_font = {size: 8,family: "sans-serif",variant: "small-caps"};


/**
 * Take current velocity and increment the appropriate value in 
 * the velocity range array
 */
function sortVelocity(velocity){
	var vRange = parseFloat($("#ball_speed").html());
	var tick_range = vRange/tick_count;
	for(j=0;j<=tick_count;j++){
		var velMag = vec3.length(velocity);
		if( (velMag >= (2*(j) * tick_range))&&
			(velMag < (2*(j+1) * tick_range))){
				temp_array[j] += 1;
		}
	}
}

/**
 * Take current velocity and increment the appropriate value in 
 * the first sub system velocity range array
 */
function sortSub1(velocity){
	var vRange = parseFloat($("#ball_speed").html());
	var tick_range = vRange/tick_count;
	for(j=0;j<=tick_count;j++){
		var velMag = vec3.length(velocity);
		if( (velMag >= (2*(j) * tick_range))&&
			(velMag < (2*(j+1) * tick_range))){
				temp_sub1_array[j] += 1;
		}
	}
}

/**
 * Take current velocity and increment the appropriate value in 
 * the second sub system velocity range array
 */
function sortSub2(velocity){
	var vRange = parseFloat($("#ball_speed").html());
	var tick_range = vRange/tick_count;
	for(j=0;j<=tick_count;j++){
		var velMag = vec3.length(velocity);
		if( (velMag >= (2*(j) * tick_range))&&
			(velMag < (2*(j+1) * tick_range))){
				temp_sub2_array[j] += 1;
		}
	}
}

/**
 * Plot the Total system Velocity distribution
 * by sorting the data into the appropriate array
 * and calling the Flot plotting function
 */
$(function () {
    
    //load velocity data
    var vRange = 100 * parseFloat($("#ball_speed").html());
    //totalPoints = vRange;
    totalPoints = tick_count;
    function getData() {
        //get total number of balls for each range
        var data = [];
        //console.log(totalPoints);
        for (var i = 0; i <= totalPoints; i++){
            data.push([i, velRange_array[i]]);
		}
		var tot_data = {label:'Total System',bars:{align:"right"},data:data};
        return tot_data;
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
		var speed = parseFloat($("#ball_speed").html());
		var ticks = [];
		for(i=0;i<=totalPoints;i++){
			var scaled_index = Math.round(i*2*speed*100/tick_count)/100;
			//console.log(scaled_index);
			//ticks.push([i,(20*i).toString()+"%"]);
			//ticks.push([i,i.toString()]);
			ticks.push([i,scaled_index.toString()]);
		}
		//console.log("ticks are: "+ ticks);
		return ticks;	
	};
	
	//var ballCount = parseInt($("#ball_number").html());
    // setup plot
    var options = {
        series: { shadowSize: 0 }, // drawing is faster without shadows
        yaxis: { min: 0, max: parseInt($("#ball_number").html()),font:axis_font},
        xaxis: { ticks: getTicks(), font:axis_font},
        bars: {
			show: true,
			barWidth: 0.8,
			//align: "center"
		}
    };
    
    function update() {
		options.yaxis.max = parseInt($("#ball_number").html())/2;
		options.xaxis.ticks = getTicks();
		plot = $.plot($("#graph_1"), [ getData() ], options);
        //plot.draw();
        setTimeout(update, updateInterval);
    }
    update();
});

/**
 * Plot the Sub System Velocity distribution
 * by sorting the data into the appropriate arrays
 * and calling the Flot plotting function
 */
$(function () { 
    //load velocity data
    //var vRange = 100 * parseFloat($("#ball_speed").html());
    //totalPoints = vRange;
    totalPoints = tick_count;
    function getSubData() {
        //get total number of balls for each range
        var sub1_data = [];
        var sub2_data = [];
        //console.log(totalPoints);
        for (var i = 0; i <= totalPoints; i++){
            //data.push([i, velRange_array[i]]);
            sub1_data.push([i, velRange_sub1_array[i]]);
            sub2_data.push([i, velRange_sub2_array[i]]);
		}
		var sub1 = {label:'Sub System 1',color:'blue',bars:{align:"left"},data:sub1_data};
		var sub2 = {label:'Sub System 2',color:'red',bars:{align:"right"},data:sub2_data};
        return [sub1,sub2];
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
		var speed = parseFloat($("#ball_speed").html());
		var ticks = [];
		for(i=0;i<=totalPoints;i++){
			var scaled_index = Math.round(i*2*speed*100/tick_count)/100;
			//ticks.push([i,i.toString()]);
			ticks.push([i,scaled_index.toString()]);
		}
		return ticks;	
	};
	
	//var ballCount = parseInt($("#ball_number").html());
    // setup plot
    var options = {
        series: { shadowSize: 0 }, // drawing is faster without shadows
        yaxis: { min: 0, max: parseInt($("#ball_number").html()),font:axis_font},
        xaxis: { ticks: getTicks(),font:axis_font},
        bars: {
			show: true,
			barWidth: 0.4,
			//align: "center"
		}
    };
    
    function update() {
		options.yaxis.max = parseInt($("#ball_number").html())/2;
		options.xaxis.ticks = getTicks();
		var data = getSubData();
		plot = $.plot($("#graph_2"), data, options);
		//plot = $.plot($("#graph_3"), [ data.sub2 ], options);
		//plot.setupGrid();
        //plot.draw();
        setTimeout(update, updateInterval);
    }
    update();
});

/**
 * Plot the Pressure-Volume data
 * by sorting the data into the appropriate array
 * and calling the Flot plotting function
 */
$(function () {
    // we use an inline data source in the example, usually data would
    // be fetched from a server
    var vol_stats = [],pres_stats = [], totalPoints = 100;
    function getVolumeData() {
        if (vol_stats.length > 0){
            vol_stats = vol_stats.slice(1);
            pres_stats = pres_stats.slice(1);
		}

        // update value with current enclosure volume
        while (vol_stats.length < totalPoints) {
            var prev = vol_stats.length > 0 ? vol_stats[vol_stats.length - 1] : 50;
            var y = parseInt($("#box_enclosed").html());
            vol_stats.push(y);
            pres_stats.push(10*parseInt($("#box_pressure").html()));
        }

        // zip the generated y values with the x values
        var vol_data = [];
        var pres_data = [];
        for (var i = 0; i < vol_stats.length; ++i){
            vol_data.push([(i/10 -10), vol_stats[i]]);
            pres_data.push([(i/10 -10), pres_stats[i]]);
		}
		var volDat = {label:'Pressure',color:'green', data:pres_data};
		var presDat = {label:'Volume',color:'orange', data:vol_data};
		return [volDat,presDat];
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
        yaxis: { min: 0, max: 1000,font:axis_font},
        xaxis: { show: true, min: -10, max: 0,font:axis_font}
    };
    var plot = $.plot($("#graph_3"),getVolumeData(), options);

    function update() {
        plot.setData(getVolumeData());
        // since the axes don't change, we don't need to call plot.setupGrid()
        plot.draw();
        
        setTimeout(update, updateInterval);
    }

    update();
});

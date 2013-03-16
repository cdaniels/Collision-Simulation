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
            data.push([i, velRange_array[i]]);
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
	
	var ballCount = parseInt($("#ball_number").html());
    // setup plot
    var options = {
        series: { shadowSize: 0 }, // drawing is faster without shadows
        yaxis: { min: 0, max: ballCount },
        xaxis: { ticks: getTicks()},
        bars: {
			show: true,
			barWidth: 0.8,
			align: "center"
		}
    };
    //var plot = $.plot($("#graph_1"), [ getRandomData() ], options);
    var plot = $.plot($("#graph_1"), [ getData() ], options);

    function update() {
        plot.setData([ getData() ]);
        // since the axes don't change, we don't need to call plot.setupGrid()
        plot.draw();
        
        setTimeout(update, updateInterval);
    }

    update();
});


$(function () {
    // we use an inline data source in the example, usually data would
    // be fetched from a server
    var data = [], totalPoints = 300;
    function getRandomData() {
        if (data.length > 0)
            data = data.slice(1);

        // do a random walk
        while (data.length < totalPoints) {
            var prev = data.length > 0 ? data[data.length - 1] : 50;
            var y = prev + Math.random() * 10 - 5;
            if (y < 0)
                y = 0;
            if (y > 100)
                y = 100;
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
        yaxis: { min: 0, max: 100 },
        xaxis: { show: false }
    };
    //var plot = $.plot($("#graph_1"), [ getRandomData() ], options);
    var plot = $.plot($("#graph_2"), [ getRandomData() ], options);

    function update() {
        plot.setData([ getRandomData() ]);
        // since the axes don't change, we don't need to call plot.setupGrid()
        plot.draw();
        
        setTimeout(update, updateInterval);
    }

    update();
});

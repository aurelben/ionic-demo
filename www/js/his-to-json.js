$(function () {

Highcharts.setOptions({
        global : {
            useUTC : false
        }
    });
});

function GraphGenerator(data) {
    this.data = data;
    this.directions = {
        eight: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
        sixteen: ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
                  "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"],
        thirtyTwo: ['N', 'NBE', 'NNE', 'NEBN', 'NE', 'NEBE', 'ENE',
                    'EBN', 'E', 'EBS', 'ESE', 'SEBS', 'SE', 'SEBS',
                    'SSE', 'SBE', 'S', 'SBW', 'SSW', 'SWBS', 'SW',
                    'SWBW', 'WSW', 'WBS', 'W', 'WBN', 'WNW', 'NWBW',
                    'NW', 'NWBN', 'NNW', 'NBW']
    }
}

GraphGenerator.prototype.getItems = function(name) {
    return this.getFullData(name);
}

GraphGenerator.prototype.generateGraphs = function(name) {
    var items = this.getItems(name);
    $("#windrose").hide();

    this.fullDataGraph(name, items);
    this.averageByHourGraph(name, items);

    if (name === "LOCAL_WS_2MIN_MNM") {
        this.generateWindRose('eight');
    }
};

GraphGenerator.prototype.generateWindRose = function(directionsKey) {
    var items = this.getFullData('LOCAL_WD_2MIN_MNM');
    var windsTicks = this.generateWindroseData(directionsKey, items);
    this.windRoseGraph(directionsKey, windsTicks);
};

GraphGenerator.prototype.swapDirections = function(directionsKey) {
    var items = this.getFullData('LOCAL_WD_2MIN_MNM');
    var windsTicks = this.generateWindroseData(directionsKey, items);
    this.windRoseGraph(directionsKey, windsTicks);
};

GraphGenerator.prototype.getDirection = function(degrees, directions) {
    var i = (degrees + 11.25) / (360 / directions.length);
    i = ~~i;
    return directions[i % directions.length]
};

GraphGenerator.prototype.generateWindroseData = function(directionsKey, items) {
    var nbByDirection = [];
    var results = [];
    var directions = this.directions[directionsKey];

    for (var x = 0; x < directions.length; x++) {
        nbByDirection.push(0);
    }

    for (var i = 0; i < items.length; i++) {
        nbByDirection[directions.indexOf(this.getDirection(items[i][1], directions))] += 1;
    }

    for (var i = 0; i < nbByDirection.length; i++) {
        results.push([directions[i], ~~((nbByDirection[i] / items.length) * 100)]);
    }
    return results;
};

GraphGenerator.prototype.windRoseGraph = function(directionsKey, serie) {
    var directions = this.directions[directionsKey];
    $("#windrose").show();
    $('#third-graph').highcharts({
        chart: {
            polar: true,
            type: 'column'
        },

        title: {
            text: 'Rose des vents pour la journee'
        },

        pane: {
            size: '85%'
        },

        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 100,
            layout: 'vertical'
        },

        xAxis: {
            tickmarkPlacement: 'on',
            type: "",
            tickInterval: 1,
            labels: {
                formatter: function () {
                    return directions[this.value];
                }
            }
        },

        yAxis: {
            min: 0,
            endOnTick: false,
            showLastLabel: true,
            title: {
                text: 'Frequence (%)'
            },
            labels: {
                formatter: function () {
                    return this.value + '%';
                }
            },
            reversedStacks: false
        },

        tooltip: {
            valueSuffix: '%'
        },

        plotOptions: {
            series: {
                stacking: 'normal',
                shadow: false,
                groupPadding: 0,
                pointPlacement: 'on'
            }
        },
        series: [{
            data: serie
        }]
    });
};


GraphGenerator.prototype.fullDataGraph = function(name, items) {
    $("#first-graph").highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: name
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Valeurs'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null,
                }
            },
            series: [{
                type: 'area',
                name: name,
                data: items
            }]
        });
};

GraphGenerator.prototype.getHourValues = function(name, items, hour) {
    var filtered_items = items.filter(function (element) {
        var element_hour = new Date(element[0]).getHours();
        return element_hour == hour;
    });

    filtered_items = filtered_items.map(function (element) {
        if (element[1] === null)
            return [element[0], 0];
        else
            return element;
    });

    var min = null;
    for (var x = 0; x < filtered_items.length; x++) {
        if (min === null || filtered_items[x][1] <= min) {
            min = filtered_items[x][1];
        }
    }

    var max = null;
    for (var x = 0; x < filtered_items.length; x++) {
        if (max === null || filtered_items[x][1] > max) {
            max = filtered_items[x][1];
        }
    }

    var total = 0;
    for (var x = 0; x < filtered_items.length; x++) {
        total += filtered_items[x][1];
    }
    var avg = Math.round(total / filtered_items.length);
    return {
        min: min,
        max: max,
        avg: avg
    }
}

GraphGenerator.prototype.averageByHourGraph = function(name, items) {
    var xAxis = [];
    var values = [];
    for (var x = 0; x < 24; x++) {
        xAxis.push(x + "h");
        values.push(this.getHourValues(name, items, x));
    }

    $('#second-graph').highcharts({
        title: {
            text: name,
            x: -20 //center
        },
        xAxis: {
            categories: xAxis,
            title: {
                text: 'Heures de la journee'
            }
        },
        yAxis: {
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        series: [{
            name: 'minimun',
            data: values.map(function (item) {return item.min})
        }, {
            name: 'moyenne',
            data: values.map(function (item) {return item.avg})
        }, {
            name: 'maximum',
            data: values.map(function (item) {return item.max})
        }]
    });
};

GraphGenerator.prototype.getFullData = function(name) {
    var results = [];
    for (var x = 0; x < this.data.length; x++) {
        if (this.data[x][name] === " ") {
            results.push([new Date(this.data[x]['CREATEDATE']), null]);
        } else {
            results.push([new Date(this.data[x]['CREATEDATE']), this.data[x][name]]);
        }
    }
    return results;
};


function Table(data) {
    this.data = data;
    this.columns = ['AIR_TEMPERATURE', 'REL_HUMIDITY', 'AIR_PRESSURE'];
    this.graphGenerator = new GraphGenerator(this.data);
}

Table.prototype.getMin = function(name) {
    var min = null;
    var hour = null;
    for (var x = 0; x < this.data.length; x++) {
        if ((min === null || this.data[x][name] < min) && this.data[x][name] != " ") {
            min = this.data[x][name];
            hour = this.data[x]['CREATEDATE'];
        }
    }
    return [min, hour];
};

Table.prototype.getMax = function(name) {
    var max = null;
    var hour = null;
    for (var x = 0; x < this.data.length; x++) {
        if ((max === null || this.data[x][name] > max) && this.data[x][name] != " ") {
            max = this.data[x][name];
            hour = this.data[x]['CREATEDATE'];
        }
    }
    return [max, hour];
};

Table.prototype.getAverage = function(name) {
    var avg = null;
    var sum = null;
    for (var x = 0; x < this.data.length; x++) {
        if (this.data[x][name] !== " ") {
            sum = sum + this.data[x][name];
        }
    }
    return Math.round(sum / this.data.length);
};

Table.prototype.getMinWsDisplay = function() {
    var name = "LOCAL_WS_2MIN_MNM";
    var min = null;
    var hour = null;
    var associated = null;
    for (var x = 0; x < this.data.length; x++) {
        if ((min === null || this.data[x][name] < min) && this.data[x][name] != " ") {
            min = this.data[x][name];
            associated = this.data[x]['LOCAL_WD_2MIN_MNM'];
            hour = this.data[x]['CREATEDATE'];
        }
    }
    return [min + "(" + associated + "°)", hour];
}

Table.prototype.getMaxWsDisplay = function() {
    var name = "LOCAL_WS_2MIN_MNM";
    var max = null;
    var hour = null;
    var associated = null;
    for (var x = 0; x < this.data.length; x++) {
        if ((max === null || this.data[x][name] > max) && this.data[x][name] != " ") {
            max = this.data[x][name];
            associated = this.data[x]['LOCAL_WD_2MIN_MNM'];
            hour = this.data[x]['CREATEDATE'];
        }
    }
    return [max + "(" + associated + "°)", hour];
}

Table.prototype.createJsonForTable = function() {
    var required = ['AIR_TEMPERATURE', 'REL_HUMIDITY', 'AIR_PRESSURE'];
    var results = [];
    for (var x = 0; x < required.length; x++) {
        var max = this.getMax(required[x], this.data);
        var min = this.getMin(required[x], this.data);
        var average = this.getAverage(required[x], this.data);
        var tmp = {
            name: required[x],
            min: min[0],
            min_hour: min[1],
            average: average,
            max: max[0],
            max_hour: max[1]
        };
        results.push(tmp);
    }
    var max = this.getMaxWsDisplay(this.data);
    var min = this.getMinWsDisplay(this.data);
    var avg = this.getAverage('LOCAL_WS_2MIN_MNM', this.data);
    results.push({
        name: 'LOCAL_WS_2MIN_MNM',
        min: min[0],
        min_hour: min[1],
        average: avg,
        max: max[0],
        max_hour: max[1]
    });
    return results;
}

Table.prototype.writeTable = function() {
    var items = this.createJsonForTable();
}

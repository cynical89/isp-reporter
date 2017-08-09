var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
          label: 'Ping',
          data: [12, 19, 3, 5, 2, 3],
					borderColor: "rgba(0,0,255,0.75)",
					fill: false
        },
				{
					label: 'Mb/s',
					data: [1, 2, 3, 4, 5, 6],
					borderColor: "rgba(255,0,0, 0.75)",
					fill: false
				},
				{
					label: 'Mb/s',
					data: [6, 5, 4, 3, 2, 1],
					borderColor: "rgba(0,255,0, 0.75)",
					fill: false
				}]
    },
    options: {

    }
});


var ChartData1 = {
    labels  : [
      '20',
      '50',
      '100',
      '500',
      '1000',
      '5000',
    ],
    datasets: [{
      label: 'algo KMR',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30],
    },
    {
      label: 'algo naif',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'blue',
      data: [20, 10, 55, 25, 40, 20],
    }]
  }
  
  var ChartData2 = {
    labels: ['KMR', 'naif'],
  
    datasets: [{
      label: 'My First Dataset',
      data: [30, 59],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)'
      ],
      borderWidth: 1
    }]
  }
  
  var ChartLineOption = {
    
    responsive: true,
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    },
    scales: {
      y: { // defining min and max so hiding the dataset does not change scale range
        min: 0,
        max: 100
      }
    },
  }
  
  
  window.onload = function(){
    //var line = document.getElementById('line').getContext("2d");
    window.myLine = new Chart(document.getElementById('line').getContext("2d") , {
      type : "line",
      data : ChartData1,
      option: ChartLineOption,
    });
    // var bar = document.getElementById('bar').getContext("2d");
    window.myBar = new Chart(document.getElementById('bar').getContext("2d") , {
      type : "bar",
      data : ChartData2,
    });
  }
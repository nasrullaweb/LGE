import React, { Component } from "react";
import Chart from "react-apexcharts";


class MainTab3Charts extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        subBrandValue: '',
        
        cart3: {
            series: [{
                data: [
                      {
                  x: 'Team A',
                  y: [0, 5]
                }, {
                  x: 'Team B',
                  y: [0, 3]
                }, {
                  x: 'Team C',
                  y: [-4, 0]
                }, {
                  x: 'Team D',
                  y: [0, 7]
                }]
            }, 
        ],
            options: {
                colors: ['#4CAF50'],
                yaxis: [
                    {
                      labels: {
                        show: true,
                        style: {
                          fontSize: '12px',
                          color: '#fff',
                        },
                      },
                      axisTicks: {
                        show: true,
                        color: '#fff'
                      },
                      axisBorder: {
                        show: true,
                        color: '#fff'
                      },
                    },
                    
                    
                  ],
                  xaxis: {
                      show: false,
                    axisTicks: {
                      show: false,
                    },
                    axisBorder: {
                      show: false,
                      color: '#fff'
                    },
                    labels: {
                        show: false,
                      style: {
                        fontSize: '12px',
                        color: '#fff',
                      },
                      
                    },
                  },
              chart: {
                type: 'rangeBar',
                height: 450,
                fontFamily: '"Lato", sans-serif',
                zoom: {
                  enabled: true
                }
              },
              grid: {
                show: false,
              },
              tooltip: {
                enabled: false,
              },
              plotOptions: {
                bar: {
                  dataLabels: {
                    position: 'top'
                  },
                  horizontal: true,
                  colors: {
                    ranges: [{
                      from: -100,
                      to: 0,
                      color: '#d32f2f'
                    }]
                  },
                }
              },
              dataLabels: {
                enabled: true,
                offsetX: 40,
                formatter: function (val, opt) {
                  const index = opt.dataPointIndex
                  let value;
                  if (val <= 0) {
                    value = opt.w.config.series[0].data[index].y[0]
                  } else {
                    value = val
                  }
                  return parseFloat(value).toFixed(2) + '%'
              },
              style: {
                colors: ['#666'],
                fontSize: '12px',
              }
              },
              annotations: {
                xaxis: [
                  {
                    x: 0,
                    borderColor: '#999',
                    strokeDashArray: 0,
                  }
                ]
              }
            },
          },
          cart4: {
            series: [{
                data: [
                      {
                  x: 'Team A',
                  y: [0, 5]
                }, {
                  x: 'Team B',
                  y: [0, 3]
                }, {
                  x: 'Team C',
                  y: [-4, 0]
                }, {
                  x: 'Team D',
                  y: [0, 7]
                }]
            }, 
        ],
            options: {
                colors: ['#4CAF50'],
                yaxis: [
                    {
                      labels: {
                        show: true,
                        style: {
                          fontSize: '11px',
                          color: '#fff',
                        },
                      },
                      axisTicks: {
                        show: true,
                        color: '#fff'
                      },
                      axisBorder: {
                        show: true,
                        color: '#fff'
                      },
                    },
                    
                    
                  ],
                  xaxis: {
                      show: false,
                    axisTicks: {
                      show: false,
                    },
                    axisBorder: {
                      show: false,
                      color: '#fff'
                    },
                    labels: {
                        show: false,
                      style: {
                        fontSize: '12px',
                        color: '#fff',
                      },
                      
                    },
                  },
              chart: {
                type: 'rangeBar',
                height: 450,
                fontFamily: '"Lato", sans-serif',
                
              },
              grid: {
                show: false,
              },
              tooltip: {
                enabled: false,
              },
              plotOptions: {
                bar: {
                  dataLabels: {
                    position: 'top'
                  },
                  horizontal: true,
                  colors: {
                    ranges: [{
                      from: -100,
                      to: 0,
                      color: '#d32f2f'
                    }]
                  },
                }
              },
              dataLabels: {
                enabled: true,
                offsetX: 40,
                formatter: function (val, opt) {
                  const index = opt.dataPointIndex
                  let value;
                  if (val <= 0) {
                    value = opt.w.config.series[0].data[index].y[0]
                  } else {
                    value = val
                  }
                  return parseFloat(value).toFixed(2) + '%'
              },
              style: {
                colors: ['#333'],
                fontSize: '12px'
              }
              },
              annotations: {
                xaxis: [
                  {
                    x: 0,
                    borderColor: '#999',
                    strokeDashArray: 0,
                  }
                ]
              }
            },
          }
          
    };
    
  }

  static getDerivedStateFromProps(props, state) {
    let { cart3, subBrandValue, cart4 } = state
    
    if (props.graphData3 && props.graphData3.series1 && subBrandValue !== props.subBrandValue) {
        cart3.series = props.graphData3.series1

    }

    if (props.graphData3 && props.graphData3.series2 && subBrandValue !== props.subBrandValue) {
      cart4.series = props.graphData3.series2

  }


    return {
        cart3,
        cart4,
        subBrandValue
    }
    
    //return { };
  }
  

    render() {
      return (
        

  <div id="chart">
            <div className="chartContent">
              <div className="widthHalf titleAdded emptyChart">
              <div className="chartTitle"><span className="smallLeftBorder"></span>Base</div>
              <div className="emptyChartdiv">

              </div>
              </div>
              <div className="widthHalfRight titleAdded">
              <div className="chartTitle"><span className="smallLeftBorder"></span>Incremental</div>
              <Chart
                        options={this.state.cart4.options}
                        series={this.state.cart4.series}
                        type="rangeBar" 
                        height={450}
                        />
              </div>
              <div className="spaceBetween"></div>
            </div>
      
</div>


      );
    }
  }

  export default MainTab3Charts
  
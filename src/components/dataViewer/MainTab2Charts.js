import React, { Component } from "react";
import Chart from "react-apexcharts";
import moment from 'moment';


class MainTab2Charts extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        var1Value: '',
        var2Value: '',
        cart1: {
          titleValue: '',
            series: [{
                data: []
              }],
              options: {
                chart: {
                  type: 'bar',
                  height: 250,
                },
                grid: {
                  show: false,
                },
                colors: ['#d32f2f', '#7b1fa2', '#303f9f', '#0288d1', '#00796b', '#689f38', '#afb42b', '#ffa000', '#e64a19', '#c2185b', '#512da8', '#1976d2',
              '#0097a7', '#5d4037', '#388e3c', '#fbc02d', '#616161', '#f57c00', '#455a64'],
                plotOptions: {
                  bar: {
                    horizontal: false,
                    columnWidth: '90%',
                  }
                  
                },
                dataLabels: {
                  enabled: true,
                  formatter: function (value) {
                    let val = value;
                    if(val < 999 && val > -1000) {
                      val = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }

                    if(val < -1000) {
                      val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                    }
                  
                    if(val > 1000) {
                      val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                    }
                    return val;
                  },
                  style: {
                    colors: ['#333'],
                    fontSize: '8px',
                    fontFamily: '"futura-pt", sans-serif',
                  },
                },
                stroke: {
                    show: true,
                    width: 15,
                    colors: ['transparent']
                  },
                xaxis: {
                  categories: [],
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: '#999'
                  },
                  labels: {
                    style: {
                      fontSize: '12px',
                      fontFamily: '"futura-pt", sans-serif',
                    },
                  }
                },
                yaxis: [
                  {
                    // min: 0,
                    // max: 10,
                    type: 'numeric',
                  tickAmount: 5,
                  title: {
                    text: "Tactic",
                    style: {
                      color: '#333',
                      fontWeight:  'normal',
                      fontSize:  '12px',
                      fontFamily: '"futura-pt", sans-serif',
                    }
                  },
                    axisTicks: {
                      show: true,
                    },
                    axisBorder: {
                      show: true,
                      color: '#999'
                    },
                    labels: {
                      formatter: function (value) {
                        let val = value;
                        if(val < 999 && val > -1000) {
                          val = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        }

                        if(val < -1000) {
                          val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                        }
                      
                        if(val > 1000) {
                          val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                        }
                        return val;
                      },
                      style: {
                        fontSize: '12px',
                        fontFamily: '"futura-pt", sans-serif',
                      },
                    },
                  },
                ],
                legend: {
                    horizontalAlign: 'center',
                    position: 'bottom',
                  },
                  tooltip: {
                    enabled: true,
                    style: {
                      fontSize: '12px',
                      fontFamily: undefined,
                      background: '#fff',
                      fontFamily: '"futura-pt", sans-serif',
                    },
                    y: {
                      title: {
                        formatter: (seriesName) => seriesName,
                      },
                      formatter: function (value) {
                        let val = value;
                          val = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        
                        return val;
                      },
                    },
                  }
              },
        },
      
        cart2: {
          titleValue: '',
            series: [{
                data: []
              }],
              options: {
                chart: {
                  type: 'bar',
                  height: 250,
                  fontFamily: '"futura-pt", sans-serif',
                },
                grid: {
                  show: false,
                },
                colors: ['#d32f2f', '#7b1fa2', '#303f9f', '#0288d1', '#00796b', '#689f38', '#afb42b', '#ffa000', '#e64a19', '#c2185b', '#512da8', '#1976d2',
              '#0097a7', '#5d4037', '#388e3c', '#fbc02d', '#616161', '#f57c00', '#455a64'],
                plotOptions: {
                  bar: {
                    horizontal: false,
                    columnWidth: '90%',
                  }
                },
                dataLabels: {
                  enabled: true,
                  formatter: function (value) {
                    let val = value;
                    if(val < 999 && val > -1000) {
                      val = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }

                    if(val < -1000) {
                      val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                    }
                  
                    if(val > 1000) {
                      val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                    }
                    return val;
                  },
                  style: {
                    colors: ['#333'],
                    fontSize: '9px',
                    fontFamily: '"futura-pt", sans-serif',
                  },
                },
                stroke: {
                    show: true,
                    width: 15,
                    colors: ['transparent']
                  },
                xaxis: {
                  categories: [],
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: '#999'
                  },
                  labels: {
                    style: {
                      fontSize: '12px',
                      fontFamily: '"futura-pt", sans-serif',
                    },
                  }
                },
                yaxis: [
                  {
                    // min: 0,
                    // max: 10,
                    type: 'numeric',
                    tickAmount: 5,
                    title: {
                      text: "Tactic",
                      style: {
                        color: '#333',
                        fontWeight:  'normal',
                        fontSize:  '12px',
                        fontFamily: '"futura-pt", sans-serif',
                      }
                    },
                    axisTicks: {
                      show: true,
                    },
                    axisBorder: {
                      show: true,
                      color: '#999'
                    },
                    labels: {
                      formatter: function (value) {
                        let val = value;
                        if(val < 999 && val > -1000) {
                          val = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        }

                        if(val < -1000) {
                          val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                        }
                      
                        if(val > 1000) {
                          val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                        }
                        return val;
                      },
                      style: {
                        fontSize: '12px',
                        fontFamily: '"futura-pt", sans-serif',
                      },
                    },
                  },
                ],
                legend: {
                    horizontalAlign: 'center',
                    position: 'bottom',
                  },
                  tooltip: {
                    enabled: true,
                    style: {
                      fontSize: '12px',
                      fontFamily: undefined,
                      background: '#fff',
                      fontFamily: '"futura-pt", sans-serif',
                    },
                    y: {
                      title: {
                        formatter: (seriesName) => seriesName,
                      },
                      formatter: function (value) {
                        let val = value;
                          val = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        
                        return val;
                      },
                    },
                  }
              },
        },

        cart3: {
            series: [{
                data: []
              }],
              options: {
                chart: {
                  type: 'bar',
                  height: 400,
                  fontFamily: '"futura-pt", sans-serif',
                  stacked: true,
                  stackedType: '100%',
                    zoom: {
                        enabled: false
                    },
                },
                grid: {
                  show: false,
                },
                colors: ['#1976D2', '#d32f2f', '#7b1fa2', '#303f9f', '#0288d1', '#00796b', '#689f38', '#afb42b', '#ffa000', '#e64a19', '#c2185b', '#512da8', '#1976d2',
              '#0097a7', '#5d4037', '#388e3c', '#fbc02d', '#616161', '#f57c00', '#455a64'],
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  width: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
                },
                xaxis: {
                  type: 'datetime',
                  tickAmount: 24,
                  categories: [],
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: '#999'
                  },
                  labels: {
                    hideOverlappingLabels: true,
                    style: {
                      fontSize: '12px',
                      fontFamily: '"futura-pt", sans-serif',
                    },
                    formatter: function(val) {
                      return moment(new Date(val)).format("DD MMM YY");
                    }
                  }
                },
                yaxis: [
                  {
                    min: 0,
                    axisTicks: {
                      show: true,
                    },
                    axisBorder: {
                      show: true,
                      color: '#1976D2'
                    },
                    title: {
                      text: "Tactic",
                      style: {
                        color: '#1976D2',
                        fontWeight:  'normal',
                        fontSize:  '12px',
                        fontFamily: '"futura-pt", sans-serif',
                      }
                    },
                    labels: {
                      style: {
                        colors: '#1976D2',
                        fontSize: '12px',
                        fontFamily: '"futura-pt", sans-serif',
                      },
                      formatter: function (value) {
                        let val = value;
                        if(val < 999 && val > -1000) {
                          val = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        }

                        if(val < -1000) {
                          val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                        }
                      
                        if(val > 1000) {
                          val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                        }
                        return val;
                      },
                    },
                  },
                  
                  {
                    seriesName: "Digital (All OLED)",
                    min: 0,
                    opposite: true,
                    axisTicks: {
                      show: true,
                    },
                    axisBorder: {
                      show: true,
                      color: '#999'
                    },
                    title: {
                      text: "Tactic",
                      rotate: -90,
                      style: {
                        color: '#333',
                        fontWeight:  'normal',
                        fontSize:  '12px',
                        fontFamily: '"futura-pt", sans-serif',
                      }
                    },
                    labels: {
                      style: {
                        colors: '#333',
                        fontSize: '12px',
                        fontFamily: '"futura-pt", sans-serif',
                      },
                      formatter: function (value) {
                        let val = value;
                        if(val < 999 && val > -1000) {
                          val = parseFloat(value).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        }

                        if(val < -1000) {
                          val = parseFloat(value/1000).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                        }
                      
                        if(val > 1000) {
                          val = parseFloat(value/1000).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                        }
                        return val;
                      },
                    },
                  },
                  
                  
                ],
                // tooltip: {
                //   fixed: {
                //     enabled: true,
                //     position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                //     offsetY: 30,
                //     offsetX: 60
                //   },
                // },
                legend: {
                  horizontalAlign: 'center',
                  position: 'bottom',
                },
                tooltip: {
                  enabled: true,
                  style: {
                    fontSize: '12px',
                    fontFamily: undefined,
                    background: '#fff',
                    fontFamily: '"futura-pt", sans-serif',
                  },
                  y: {
                    title: {
                      formatter: (seriesName) => seriesName,
                    },
                    formatter: function (value) {
                      let val = value;
                        val = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      
                      return val;
                    },
                  },
                }
              },
            },
          
    };
  }

  static getDerivedStateFromProps(props, state) {
    let { cart1, cart2, cart3, var2Value } = state
    
    if (props.graphData2 && props.graphData2.series && var2Value !== props.var2Value) {

      const obj = {
        seriesName: props.graphData1.series[1].name,
        show: false,
        max: props.graphData1.maxValue,
        min: 0,
      }
        cart1.series = props.graphData2.series
        cart1.options.xaxis.categories = props.graphData2.xValue
        cart1.titleValue = props.graphData2.xValue
        var2Value = props.var2Value
        cart3.series = props.graphData1.series
        cart3.options.xaxis.categories = props.graphData1.xValue
        cart2.series = props.graphData3.series
        cart2.options.xaxis.categories = props.graphData3.xValue
        cart2.titleValue = props.graphData3.xValue
        cart1.options.yaxis[0].max = props.graphData2.max >= props.graphData3.max ? props.graphData2.max : props.graphData3.max
        //cart2.options.yaxis[0].min = props.graphData2.min <= props.graphData3.min ? props.graphData2.min : props.graphData3.min
        cart2.options.yaxis[0].max = props.graphData2.max >= props.graphData3.max ? props.graphData2.max : props.graphData3.max
        cart3.options.yaxis[1].seriesName = props.graphData1.series[1].name
        cart3.options.yaxis[0].title.text = props.var1Value
        cart3.options.yaxis[1].max = props.graphData1.maxValue
        for (let i=2; i<=props.graphData1.series.length; i++ ) {
          cart3.options.yaxis.push(obj)
        }
        
    }


    return {
        cart1,
        cart2,
        cart3,
        var2Value
    }
    
    //return { };
  }
  

    render() {
      return (
        

  <div id="chart">
      {
          this.props.graphData1 &&
            <div className="chartContent">
                <div className="downChart titleAdded">
                <div className="chartTitle">KPI vs Tactics</div>
                <Chart
                        options={this.state.cart3.options}
                        series={this.state.cart3.series}
                        type="line" 
                        height={400}
                        />
                </div>
                <div className="spaceBetween"></div>
                <div className="widthHalf titleAdded">
                <div className="chartTitle">{this.state.cart1.titleValue}</div>
                    <Chart
                        options={this.state.cart1.options}
                        series={this.state.cart1.series}
                        type="bar" 
                        height={250}
                        />
                </div>
                <div className="widthHalfRight titleAdded">
                <div className="chartTitle">{this.state.cart2.titleValue}</div>
                    <Chart
                        options={this.state.cart2.options}
                        series={this.state.cart2.series}
                        type="bar" 
                        height={250}
                        />
                </div>
                <div className="spaceBetween"></div>
            </div>
      }
      
</div>


      );
    }
  }

  export default MainTab2Charts
  
import React, { Component } from "react";
import Chart from "react-apexcharts";
import moment from 'moment';


class MainTab1Charts extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
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
                  fontFamily: '"futura-pt", sans-serif',
                },
                grid: {
                  show: false,
                },
                colors: ['#d32f2f', '#7b1fa2', '#303f9f', '#0288d1', '#00796b', '#689f38', '#afb42b', '#ffa000', '#e64a19', '#c2185b', '#512da8', '#1976d2', '#0097a7',
              '#5d4037', '#388e3c', '#fbc02d', '#616161', '#f57c00', '#455a64'],
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
                  labels: {
                    style: {
                      fontSize: '12px',
                      fontFamily: '"futura-pt", sans-serif',
                    },
                  },
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: '#999'
                  },
                  title: {
                    text: "Sales Value (USD)",
                    style: {
                      color: '#333',
                      fontWeight:  'normal',
                      fontSize:  '12px',
                      fontFamily: '"futura-pt", sans-serif',
                    }
                  },
                },
                yaxis: [
                  {
                    type: 'numeric',
                    tickAmount: 5,
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
                colors: ['#d32f2f', '#7b1fa2', '#303f9f', '#0288d1', '#00796b', '#689f38', '#afb42b', '#ffa000', '#e64a19', '#c2185b', '#512da8', '#1976d2', '#0097a7',
              '#5d4037', '#388e3c', '#fbc02d', '#616161', '#f57c00', '#455a64'],
                plotOptions: {
                  bar: {
                    horizontal: false,
                    columnWidth: '90%',
                  }
                },
                dataLabels: {
                  enabled: true,
                  style: {
                    colors: ['#333'],
                    fontSize: '9px',
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
                stroke: {
                    show: true,
                    width: 15,
                    colors: ['transparent']
                  },
                xaxis: {
                  categories: [],
                  labels: {
                    style: {
                      fontSize: '12px',
                      fontFamily: '"futura-pt", sans-serif',
                    },
                  },
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: '#999'
                  },
                  title: {
                    text: "Sales Value (USD)",
                    style: {
                      color: '#333',
                      fontWeight:  'normal',
                      fontSize:  '12px',
                      fontFamily: '"futura-pt", sans-serif',
                    }
                  },
                },
                yaxis: [
                  {
                    type: 'numeric',
                    tickAmount: 5,
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
                        color: '#333',
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
                  height: 400,
                  type: 'line',
                  fontFamily: '"futura-pt", sans-serif',
                  stacked: false,
                    zoom: {
                        enabled: false
                    },
                },
                grid: {
                  show: false,
                },
                colors: ['#d32f2f', '#7b1fa2', '#303f9f', '#0288d1', '#00796b', '#689f38', '#afb42b', '#ffa000', '#e64a19', '#c2185b', '#512da8', '#1976d2', '#0097a7',
              '#5d4037', '#388e3c', '#fbc02d', '#616161', '#f57c00', '#455a64'],
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  width: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
                  curve: 'smooth',
                },
                xaxis: {
                  categories: [],
                  type: 'datetime',
                  tickAmount: 24,
                  labels: {
                    style: {
                      fontSize: '12px',
                      fontFamily: '"futura-pt", sans-serif',
                    },
                    formatter: function(val) {
                      return moment(new Date(val)).format("DD MMM YY");
                    }
                  },
                  tooltip: {
                    enabled: false
                  },
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: '#999'
                  },
                },
                yaxis: [
                  {
                    axisTicks: {
                      show: true,
                    },
                    axisBorder: {
                      show: true,
                      color: '#999'
                    },
                    title: {
                      text: "Sales Value (USD)",
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
                    // title: {
                    //   text: "Sales_Units",
                    //   style: {
                    //     color: '#008FFB',
                    //   }
                    // },
                    tooltip: {
                      enabled: false
                    }
                  },
                  
                //   {
                //     seriesName: 'Organic_Search_Vol (M)',
                //     opposite: true,
                //     axisTicks: {
                //       show: true,
                //     },
                //     axisBorder: {
                //       show: true,
                //       color: '#FEB019'
                //     },
                //     // title: {
                //     // text: "Organic_Search_Vol (M)",
                //     // style: {
                //     //     color: '#FEB019',
                //     // }
                //     // },
                //     labels: {
                //       style: {
                //         colors: '#FEB019',
                //       },
                //     },
                //   },
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
    let { cart1, cart2, cart3, var2Value, var1Value } = state
    
    if (props.graphData2 && props.graphData2.series && var2Value !== props.var2Value) {
        cart1.series = props.graphData2.series
        cart1.options.xaxis.categories = props.graphData2.xValue
        cart1.titleValue = props.graphData2.xValue
        cart2.options.xaxis.title.text = props.var2Value
        cart1.options.xaxis.title.text = props.var2Value
        cart3.options.yaxis[0].title.text = props.var2Value
        cart1.options.yaxis[0].max = props.graphData2.max >= props.graphData3.max ? props.graphData2.max : props.graphData3.max
        var2Value = props.var2Value
        var1Value = props.var1Value
        cart3.series = props.graphData1.series
        cart3.options.xaxis.categories = props.graphData1.xValue
        cart2.series = props.graphData3.series
        cart2.options.xaxis.categories = props.graphData3.xValue
        cart2.titleValue = props.graphData3.xValue
        cart2.options.yaxis[0].max = props.graphData2.max >= props.graphData3.max ? props.graphData2.max : props.graphData3.max
      
    }


    return {
        cart1,
        cart2,
        cart3,
        var2Value,
        var1Value
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
                <div className="chartTitle">{this.props.var2Value}</div>
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

  export default MainTab1Charts
  
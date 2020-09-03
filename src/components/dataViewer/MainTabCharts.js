import React, { Component } from "react";
import Chart from "react-apexcharts";
import moment from 'moment';


class MainTabCharts extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        cart1: {
            series: [{
                data: []
              }],
              options: {
                chart: {
                  type: 'bar',
                  height: 150,
                  fontFamily: '"Lato", sans-serif'
                },
                grid: {
                  show: false,
                },
                colors: ['#CC1F55'],
                plotOptions: {
                  bar: {
                    horizontal: true,
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
                },
                xaxis: {
                  categories: [],
                  // min: 0,
                  // max: 10,
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
                      fontSize: '10px',
                      color: '#8E8E8E'
                    },
                  },
                  title: {
                    text: "Sales Value (USD)",
                    style: {
                      color: '#8E8E8E',
                        fontSize: '12px',
                    }
                  },
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: '#8E8E8E'
                  },
                },
                yaxis: [
                  {
                    labels: {
                      style: {
                        fontSize: '10px',
                      color: '#373D3F',
                      },
                      formatter: function (value) {
                        return Math.round(value);
                      },
                    },
                    axisTicks: {
                      show: true,
                    },
                    axisBorder: {
                      show: true,
                      color: '#8E8E8E'
                    },
                  },
                ],
                legend: {
                  show: false,
                  horizontalAlign: 'center',
                  position: 'bottom',
                  style: {
                    color: '#3D3D3D',
                    fontSize: '12px',
                  },
                  },
                  tooltip: {
                    enabled: true,
                    style: {
                      fontSize: '12px',
                      background: '#fff',
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
            series: [{
                data: []
              }],
              options: {
                chart: {
                  type: 'bar',
                  height: 150,
                  fontFamily: '"Lato", sans-serif'
                },
                grid: {
                  show: false,
                },
                colors: ['#FF9933'],
                plotOptions: {
                  bar: {
                    horizontal: true,
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
                },
                xaxis: {
                  categories: [],
                  // min: 0,
                  // max: 10,
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
                      fontSize: '10px',
                      color: '#8E8E8E'
                    },
                  },
                  axisTicks: {
                    show: true,
                  },
                  axisBorder: {
                    show: true,
                    color: '#8E8E8E'
                  },
                  title: {
                    text: "Sales Value (USD)",
                    style: {
                      fontSize: '12px',
                      color: '#8E8E8E'
                    }
                  },
                },
                yaxis: [
                  {
                    labels: {
                      style: {
                        fontSize: '10px',
                      color: '#373D3F',
                      },
                      formatter: function (value) {
                        return Math.round(value);
                      },
                    },
                    axisTicks: {
                      show: true,
                    },
                    axisBorder: {
                      show: true,
                      color: '#8E8E8E'
                    },
                  },
                ],
                legend: {
                  show: false,
                    horizontalAlign: 'center',
                  position: 'bottom',
                  style: {
                    color: '#3D3D3D',
                    fontSize: '12px',
                  },
                  },
                  tooltip: {
                    enabled: true,
                    style: {
                      fontSize: '12px',
                      background: '#fff',
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
                name: 'Sales_Units',
                type: 'line',
                data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
              }, {
                name: 'Organic_Search_Vol (M)',
                type: 'bar',
                data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5] 
              }],
              options: {
                chart: {
                  height: 400,
                  type: 'line',
                  fontFamily: '"Lato", sans-serif',
                  stacked: false,
                    zoom: {
                        enabled: false
                    },
                    
                },
                
                grid: {
                  show: false,
                },
                colors: ['#DB1348', '#FF9933', '#689f38', '#e64a19'],
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  width: [2, 2, 2],
                  curve: 'smooth',
                },
                xaxis: {
                  type: 'datetime',
                  tickAmount: 24,
                  categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
                  labels: {
                    style: {
                      fontSize: '10px',
                      color: '#373D3F',
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
                      color: '#8E8E8E'
                    },
                    labels: {
                      style: {
                        color: '#8E8E8E',
                        fontSize: '10px',
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
                    title: {
                      text: "Sales Value (USD)",
                      style: {
                        color: '#DB1348',
                        fontWeight : 'bold',
                        fontSize : '13px',
                      }
                    },
                    tooltip: {
                      enabled: false
                    }
                  },
                  
                  {
                    opposite: true,
                    axisTicks: {
                      show: true,
                    },
                    axisBorder: {
                      show: true,
                      color: '#8E8E8E'
                    },
                    title: {
                      text: "Sales Value (USD)",
                      rotate: -90,
                      style: {
                        color: '#FF9933',
                        fontWeight : 'bold',
                        fontSize : '13px',
                        
                      }
                    },
                    labels: {
                      style: {
                        color: '#8E8E8E',
                        fontSize: '10px',
                      },
                      formatter: function (value) {
                        let val = value;
                        if(val < 999 && val > -1000) {
                          val = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
                  show: true,
                  horizontalAlign: 'center',
                  position: 'bottom',
                  style: {
                    color: '#3D3D3D',
                    fontSize: '12px',
                  },
                },
                tooltip: {
                  enabled: true,
                  style: {
                    fontSize: '12px',
                    background: '#fff',
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
    const { cart1, cart2, cart3 } = state
    
    if (props.graphData && (cart1.series[0].name !== props.var1Value || cart2.series[0].name !== props.var1Value)) {
        cart1.series[0].data = props.graphData.data
        cart1.series[0].name = props.var1Value
        cart1.options.xaxis.categories = props.graphData.xValue
        cart1.options.xaxis.title.text = props.var1Value
        // cart1.options.xaxis.min = Math.round(props.graphData.min)
        // cart1.options.xaxis.max = Math.round(props.graphData.max)
    }

    if (props.graphData && (cart1.series[0].name !== props.var1Value || cart2.series[0].name !== props.var1Value)) {
        cart2.series[0].data = props.graphData.data1
        cart2.series[0].name = props.var2Value
        cart2.options.xaxis.categories = props.graphData.xValue1
        cart2.options.xaxis.title.text = props.var2Value
        // cart2.options.xaxis.min = Math.round(props.graphData.min)
        // cart2.options.xaxis.max = Math.round(props.graphData.max)

    }

    if (props.graphData && (cart1.series[0].name !== props.var1Value || cart2.series[0].name !== props.var1Value)) {
        cart3.series[0].data = props.graphData.data2
        cart3.series[0].name = props.var1Value
        cart3.series[1].data = props.graphData.data3
        cart3.series[1].name = props.var2Value
        cart3.options.xaxis.categories = props.graphData.xValue2
        cart3.options.yaxis[0].title.text = props.var1Value
        cart3.options.yaxis[1].title.text = props.var2Value

    }

    return {
        cart1,
        cart2,
        cart3
    }
    
    //return { };
  }
  

    render() {
      const { cart1, cart2 } = this.state
      const getPercentage = Math.round(((Math.round(cart1.series[0].data[0]) - Math.round(cart1.series[0].data[1]))/Math.round(cart1.series[0].data[1]))*100)
      const getPercentage1 = Math.round(((Math.round(cart2.series[0].data[0]) - Math.round(cart2.series[0].data[1]))/Math.round(cart2.series[0].data[1]))*100)
      return (
        

  <div id="chart">
      {
          this.props.graphData.data &&
            <div className="chartContent">
                <div className="downChart titleAdded">
                <div className="chartTitle">
                  <span className="smallLeftBorder"></span>
                  {this.props.var1Value} vs {this.props.var2Value}</div>
                <Chart
                        options={this.state.cart3.options}
                        series={this.state.cart3.series}
                        type="line" 
                        height={400}
                        />
                </div>
                <div className="spaceBetween"></div>
                <div className="widthHalf titleAdded changpopCont">
                <div className="chartTitle"><span className="smallLeftBorder"></span>{this.props.var1Value}</div>
                <div className="changePop">
                  <div className="changePopLeft"><p>% Change: <strong>{isNaN(getPercentage) ? 'NA' : 
                        <span className={getPercentage >= 0 ? 'positveClass' : 'negitiveClass'}>{getPercentage}%</span>
                        }</strong>
                    </p></div>
                    <div className="changePopRight">
                      <span className="changeBorder"></span>
                      <span className="changepopIcon"></span>
                    </div>
                    </div>
                    <Chart
                        options={this.state.cart1.options}
                        series={this.state.cart1.series}
                        type="bar" 
                        height={150}
                        />
                        {/* <div className="changePop"><p>% Change: <strong>{isNaN(getPercentage) ? 'NA' : 
                          <span className={getPercentage >= 0 ? 'positveClass' : 'negitiveClass'}>{getPercentage}%</span>
                        }</strong></p></div> */}
                </div>
                <div className="widthHalfRight titleAdded changpopCont">
                <div className="chartTitle"><span className="smallLeftBorder"></span>{this.props.var2Value}</div>

                <div className="changePop">
                  <div className="changePopLeft"><p>% Change: <strong>{isNaN(getPercentage1) ? 'NA' : 
                        <span className={getPercentage1 >= 0 ? 'positveClass' : 'negitiveClass'}>{getPercentage1}%</span>
                        }</strong>
                    </p></div>
                    <div className="changePopRight">
                      <span className="changeBorder"></span>
                      <span className="changepopIcon"></span>
                    </div>
                    </div>
                    <Chart
                        options={this.state.cart2.options}
                        series={this.state.cart2.series}
                        type="bar" 
                        height={150}
                        />
                        
                </div>
                <div className="spaceBetween"></div>
            </div>
      }
      
</div>


      );
    }
  }

  export default MainTabCharts
  
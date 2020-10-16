import React, { Component } from "react";
import Chart from "react-apexcharts";
import moment from 'moment';


class SpendCharts extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        dataLength: 0,
        cart1: {
            series: [{
                data: [44, 55, 41, 64, 22, 43, 21]
              }, {
                data: [53, 32, 33, 52, 13, 44, 32]
              }],
              options: {
                chart: {
                  type: 'bar',
                  height: 250,
                  fontFamily: '"Lato", sans-serif',
                  toolbar: {
                    show: true,
                    tools: {
                      download: true,
                      selection: false,
                      zoom: false,
                      zoomin: false,
                      zoomout: false,
                      pan: false,
                      reset: false ,
                      customIcons: []
                    },
                }
                },
                grid: {
                  show: false,
                },
                colors: ['#DB1348','#FF9933','#E84518','#FF6601','#FFC000','#D1D105',
                '#4EB9D2','#4D8DD3','#3558EB','#005086','#032F4E','#404040',
                '#7F7F7F','#BFBFBF','#8EBDCB','#8A85BD','#EAB0B8','#E54878',
                '#994561','#CC3A8E'],
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
                    show: true,
                    style: {
                      fontSize: '12px',
                      color: '#373D3F',
                    },
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
                    type: 'numeric',
                    tickAmount: 5,
                    axisTicks: {
                      show: true,
                    },
                    axisBorder: {
                      show: true,
                      color: '#8E8E8E'
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
                        color: '#8E8E8E'
                      },
                    },
                  },
                ],
                legend: {
                    horizontalAlign: 'center',
                    position: 'bottom',
                    style: {
                      color: '#3D3D3D',
                      fontSize: '14px',
                    },
                  },
                  tooltip: {
                    enabled: true,
                    style: {
                      fontSize: '14px',
                      background: '#fff',
                    },
                    y: {
                      title: {
                        formatter: (seriesName) => seriesName,
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
                  }
              },
            }
      
       
    };
  }

  static getDerivedStateFromProps(props, state) {
    let { cart1, dataLength } = state
    
    if (props.spendSeries && props.spendSeries.length > 0 && props.spendSeries[0].data.length !== state.dataLength ) {
        cart1.series = props.spendSeries
        cart1.options.xaxis.categories = props.categories
        dataLength = props.spendSeries[0].data.length
       
      
    }


    return {
        cart1,
        dataLength,
    }
    
    //return { };
  }
  

    render() {
      return (
        

  <div id="chart">
            
                    <Chart
                        options={this.state.cart1.options}
                        series={this.state.cart1.series}
                        type="bar" 
                        height={400}
                        />
            </div>


      );
    }
  }

  export default SpendCharts
  
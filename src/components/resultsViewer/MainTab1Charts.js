import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Table } from 'antd';
import moment from 'moment';

class MainTab1Charts extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        subBrandValue: '',
        cart3: {
            series: [{
                data: []
              }],
              options: {
                chart: {
                  height: 400,
                  type: 'bar',
                  fontFamily: '"futura-pt", sans-serif',
                  stacked: false,
                  tooltip: {
                    enabled: true,
                  },
                    zoom: {
                        enabled: false
                    },
                },
                grid: {
                  show: false,
                },
                colors: ['#1976D2', '#4CAF50', '#F57C00'],
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
                  }
                },
                yaxis: [
                  {
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
                    axisTicks: {
                      show: true,
                    },
                    axisBorder: {
                      show: true,
                      color: '#999'
                    },
                    title: {
                      text: "Sales Value (€)",
                      style: {
                        color: '#333',
                        fontWeight:  'normal',
                        fontSize: '12px',
                        fontFamily: '"futura-pt", sans-serif',
                      }
                    },
                  },
                  
                  
                ],
                tooltip: {
                  enabled: true,
                },
                tooltip: {
                  enabled: true,
                  enabledOnSeries: undefined,
                  shared: true,
                  followCursor: false,
                  intersect: false,
                  inverseOrder: false,
                  onDatasetHover: {
                      highlightDataSeries: false,
                  },
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
                },
                legend: {
                  horizontalAlign: 'center',
                  position: 'bottom',
                },
                
              },
            },
          
    };
  }

  static getDerivedStateFromProps(props, state) {
    let { cart3, subBrandValue } = state
    
    if (props.graphData2 && props.graphData2.series && subBrandValue !== props.subBrandValue) {
        cart3.series = props.graphData2.series
        cart3.options.xaxis.categories = props.graphData2.xValue

    }


    return {
        cart3,
        subBrandValue
    }
    
    //return { };
  }
  

    render() {
      const columns = [
        {
          title: 'R Square',
          dataIndex: 'rSquare',
          key: 'rSquare',
        },
        {
            title: 'MAPE',
            dataIndex: 'mape',
            key: 'mape',
            render: (text) => <span>{parseFloat(text)*100..toFixed(2)}%</span>,
        },
        {
          title: 'DW',
          dataIndex: 'dw',
          key: 'dw',
        },
    ];
      return (
        

  <div id="chart">
      {
          this.props.graphData2 &&
            <div className="chartContent">
                <div className="downChart titleAdded">
                <div className="chartTitle">Actual vs Predicted</div>
                <Chart
                        options={this.state.cart3.options}
                        series={this.state.cart3.series}
                        type="bar" 
                        height={400}
                        />
                </div>
                <div className="spaceBetween"></div>
                {
                this.props.RSquare.length > 0 &&
                  <div className="rsquare">
                    <Table columns={columns} dataSource={this.props.RSquare} pagination={false} />
                  </div>
                }
                
                
                
            </div>
      }
      
</div>


      );
    }
  }

  export default MainTab1Charts
  
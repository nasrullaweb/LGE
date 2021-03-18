import React, { Component } from "react";
import Chart from "react-apexcharts";
import ColoredScrollbars from '../common/ColoredScrollbars';

class MainTab2Charts extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        subBrandValue: '',
        tiltleVal1: '',
        tiltleVal2: '',
        tiltleVal3: '',
        tiltleVal4: '',
        tiltleVal5: '',
        cart1: {
          series: [{
            data: [400, 430, 448, 470, 540, 580]
          }],
          options: {
            chart: {
              type: 'bar',
              height: 150,
              fontFamily: '"Lato", sans-serif',
              toolbar: {
                show: false,
              }
            },
            grid: {
              show: false,
            },
            colors: ['#F79646','#E84518','#FF6601','#FFC000','#D1D105',
            '#4EB9D2','#4D8DD3','#3558EB','#005086','#032F4E','#404040',
            '#7F7F7F','#BFBFBF','#8EBDCB','#8A85BD','#EAB0B8','#E54878',
            '#994561','#CC3A8E'],
            plotOptions: {
              bar: {
                horizontal: true,
                columnWidth: '100%',
              }
            },
            dataLabels: {
              enabled: true,
              offsetX: 10,
              formatter: function (value) {
                let val = value;
                // if(val < 999 && val > -1000) {
                //   val = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                // }

                // if(val < -1000) {
                //   val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                // }
              
                // if(val > 1000) {
                //   val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                // }
                return Math.round(value * 100) / 100 + "%";
              },
              style: {
                colors: ['#333'],
                fontSize: '10px',
              },
            },
            stroke: {
                show: true,
                colors: ['transparent']
              },
            xaxis: {
              categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France'
              ],
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: '#999'
              },
              labels: {
                show: false,
                style: {
                  fontSize: '13px',
                  color: '#373D3F',
                },
              }
            },
            yaxis: [
              {
                // min: 0,
                // max: 10,
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
                  minWidth: 190,
                  maxWidth: 190,
                  
                  style: {
                    fontSize: '13px',
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
                enabled: false,
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
                      val = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    
                    return val;
                  },
                },
              }
          },
        },
      
        cart2: {
          series: [{
            data: [400, 430, 448, 470, 540, 580]
          }],
          options: {
            chart: {
              type: 'bar',
              height: 250,
              fontFamily: '"Lato", sans-serif',
              toolbar: {
                show: false,
              }
            },
            grid: {
              show: false,
            },
            colors: ['#4BACC6','#E84518','#FF6601','#FFC000','#D1D105',
            '#4EB9D2','#4D8DD3','#3558EB','#005086','#032F4E','#404040',
            '#7F7F7F','#BFBFBF','#8EBDCB','#8A85BD','#EAB0B8','#E54878',
            '#994561','#CC3A8E'],
            plotOptions: {
              bar: {
                horizontal: true,
                columnWidth: '70%',
              }
            },
            dataLabels: {
              enabled: true,
              offsetX: 20,
              formatter: function (value) {
                let val = value;
                // if(val < 999 && val > -1000) {
                //   val = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                // }

                // if(val < -1000) {
                //   val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                // }
              
                // if(val > 1000) {
                //   val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                // }
                return Math.round(value * 100) / 100 + "%";
              },
              style: {
                colors: ['#333'],
                fontSize: '10px',
              },
            },
            stroke: {
                show: true,
                colors: ['transparent']
              },
            xaxis: {
              categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France'
              ],
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: '#999'
              },
              labels: {
                show: false,
                style: {
                  fontSize: '13px',
                  color: '#373D3F',
                },
              }
            },
            yaxis: [
              {
                // min: 0,
                // max: 10,
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
                  minWidth: 190,
                  maxWidth: 190,
                  
                  style: {
                    fontSize: '13px',
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
                enabled: false,
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
                      val = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    
                    return val;
                  },
                },
              }
          },
        },
        cart0: {
          series: [
            {
              name: 'WM',
              data: [44, 55, 41, 37, 22, 43, 21]
            }, {
              name: 'Corp',
              data: [53, 32, 33, 52, 13, 43, 32]
            },
          ],
            options: {
              chart: {
                type: 'bar',
                height: 250,
                fontFamily: '"Lato", sans-serif',
                toolbar: {
                  show: false,
                },
                stacked: true,
                    stackedType: '100%',
                      zoom: {
                          enabled: false
                      },
              },
              grid: {
                show: false,
              },
            colors: ['#9BBB59','#E84518','#FF6601','#FFC000','#D1D105',
            '#4EB9D2','#4D8DD3','#3558EB','#005086','#032F4E','#404040',
            '#7F7F7F','#BFBFBF','#8EBDCB','#8A85BD','#EAB0B8','#E54878',
            '#994561','#CC3A8E'],
            plotOptions: {
              bar: {
                horizontal: true,
                columnWidth: '70%',
              }
            },
            dataLabels: {
              enabled: true,
              offsetX: 20,
              formatter: function (value) {
                let val = value;
                // if(val < 999 && val > -1000) {
                //   val = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                // }

                // if(val < -1000) {
                //   val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                // }
              
                // if(val > 1000) {
                //   val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                // }
                return Math.round(value * 100) / 100 + "%";
              },
              style: {
                colors: ['#333'],
                fontSize: '10px',
              },
            },
            stroke: {
                show: true,
                colors: ['transparent']
              },
            xaxis: {
              categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France'
              ],
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: '#999'
              },
              labels: {
                show: false,
                style: {
                  fontSize: '13px',
                  color: '#373D3F',
                },
              }
            },
            yaxis: [
              {
                // min: 0,
                // max: 10,
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
                  minWidth: 190,
                  maxWidth: 190,
                  
                  style: {
                    fontSize: '13px',
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
                enabled: false,
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
                      val = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    
                    return val;
                  },
                },
              }
          },
        },
        cart01: {
          series: [
          {
            name: 'WM',
            data: [44, 55, 41, 37, 22, 43, 21]
          }, {
            name: 'Corp',
            data: [53, 32, 33, 52, 13, 43, 32]
          },
        ],
          options: {
            chart: {
              type: 'bar',
              height: 250,
              fontFamily: '"Lato", sans-serif',
              toolbar: {
                show: false,
              },
              stacked: true,
                  stackedType: '100%',
                    zoom: {
                        enabled: false
                    },
            },
            grid: {
              show: false,
            },
            colors: ['#186609','#E84518','#FF6601','#FFC000','#D1D105',
            '#4EB9D2','#4D8DD3','#3558EB','#005086','#032F4E','#404040',
            '#7F7F7F','#BFBFBF','#8EBDCB','#8A85BD','#EAB0B8','#E54878',
            '#994561','#CC3A8E'],
            plotOptions: {
              bar: {
                horizontal: true,
                columnWidth: '70%',
                barHeight: '20%',
              }
            },
            dataLabels: {
              enabled: true,
              offsetX: 20,
              formatter: function (value) {
                let val = value;
                // if(val < 999 && val > -1000) {
                //   val = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                // }

                // if(val < -1000) {
                //   val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                // }
              
                // if(val > 1000) {
                //   val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                // }
                return Math.round(value * 100) / 100 + "%";
              },
              style: {
                colors: ['#333'],
                fontSize: '10px',
              },
            },
            stroke: {
                show: true,
                colors: ['transparent']
              },
            xaxis: {
              categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France'
              ],
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: '#999'
              },
              labels: {
                show: false,
                style: {
                  fontSize: '13px',
                  color: '#373D3F',
                },
              }
            },
            yaxis: [
              {
                // min: 0,
                // max: 10,
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
                  minWidth: 190,
                  maxWidth: 190,
                  
                  style: {
                    fontSize: '13px',
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
                enabled: false,
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
                      val = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    
                    return val;
                  },
                },
              }
          },
        },
        cart02: {
          series: [{
            data: [400, 430, 448, 470, 540, 580]
          }],
          options: {
            chart: {
              type: 'bar',
              height: 250,
              fontFamily: '"Lato", sans-serif',
              toolbar: {
                show: false,
              }
            },
            grid: {
              show: false,
            },
            colors: ['#C0504D','#E84518','#FF6601','#FFC000','#D1D105',
            '#4EB9D2','#4D8DD3','#3558EB','#005086','#032F4E','#404040',
            '#7F7F7F','#BFBFBF','#8EBDCB','#8A85BD','#EAB0B8','#E54878',
            '#994561','#CC3A8E'],
            plotOptions: {
              bar: {
                horizontal: true,
                columnWidth: '70%',
              }
            },
            dataLabels: {
              enabled: true,
              offsetX: 20,
              formatter: function (value) {
                let val = value;
                // if(val < 999 && val > -1000) {
                //   val = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                // }

                // if(val < -1000) {
                //   val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                // }
              
                // if(val > 1000) {
                //   val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
                // }
                return Math.round(value * 100) / 100 + "%";
              },
              style: {
                colors: ['#333'],
                fontSize: '10px',
              },
            },
            stroke: {
                show: true,
                colors: ['transparent']
              },
            xaxis: {
              categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France'
              ],
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: '#999'
              },
              labels: {
                show: false,
                style: {
                  fontSize: '13px',
                  color: '#373D3F',
                },
              }
            },
            yaxis: [
              {
                // min: 0,
                // max: 10,
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
                  minWidth: 190,
                  maxWidth: 190,
                  
                  style: {
                    fontSize: '13px',
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
                enabled: false,
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
                      val = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    
                    return val;
                  },
                },
              }
          },
        },
        // cart0: {
        //   series: [{
        //     name: 'Marine Sprite',
        //     data: [44, 55, 41, 37, 22, 43, 21]
        //   }, {
        //     name: 'Striking Calf',
        //     data: [53, 32, 33, 52, 13, 43, 32]
        //   }],
        //   options: {
        //     chart: {
        //       type: 'bar',
        //       height: 350,
        //       stacked: true,
        //       fontFamily: '"Lato", sans-serif',
        //       toolbar: {
        //         show: false,
        //       }
        //     },
        //     grid: {
        //       show: false,
        //     },
        //     colors: ['#9BBB59','#f2685e','#FF6601','#FFC000','#D1D105',
        //     '#4EB9D2','#4D8DD3','#3558EB','#005086','#032F4E','#404040',
        //     '#7F7F7F','#BFBFBF','#8EBDCB','#8A85BD','#EAB0B8','#E54878',
        //     '#994561','#CC3A8E'],
        //     plotOptions: {
        //       bar: {
        //         horizontal: true,
        //         columnWidth: '70%',
        //       }
        //     },
        //     dataLabels: {
        //       enabled: true,
        //       offsetX: 15,
        //       formatter: function (value) {
        //         let val = value;
        //         // if(val < 999 && val > -1000) {
        //         //   val = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //         // }

        //         // if(val < -1000) {
        //         //   val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
        //         // }
              
        //         // if(val > 1000) {
        //         //   val = Math.round(value/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
        //         // }
        //         return Math.round(value * 100) / 100 + "%";
        //       },
        //       style: {
        //         colors: ['#333'],
        //         fontSize: '10px',
        //       },
        //     },
        //     stroke: {
        //         show: true,
        //         colors: ['transparent']
        //       },
        //     xaxis: {
        //       categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France'
        //       ],
        //       axisTicks: {
        //         show: true,
        //       },
        //       axisBorder: {
        //         show: true,
        //         color: '#999'
        //       },
        //       labels: {
        //         show: false,
        //         style: {
        //           fontSize: '13px',
        //           color: '#373D3F',
        //         },
        //       }
        //     },
        //     yaxis: [
        //       {
        //         // min: 0,
        //         // max: 10,
        //         type: 'numeric',
        //         tickAmount: 5,
                
        //         axisTicks: {
        //           show: true,
        //         },
        //         axisBorder: {
        //           show: true,
        //           color: '#8E8E8E'
        //         },
        //         labels: {
        //           minWidth: 190,
        //           maxWidth: 190,
                  
        //           style: {
        //             fontSize: '13px',
        //             color: '#8E8E8E'
        //           },
        //         },
        //       },
        //     ],
        //     legend: {
        //         horizontalAlign: 'right',
        //         position: 'top',
        //         floating: true,
        //         style: {
        //           color: '#3D3D3D',
        //           fontSize: '14px',
        //         },
        //       },
        //       tooltip: {
        //         enabled: false,
        //         style: {
        //           fontSize: '14px',
        //           background: '#fff',
        //         },
        //         y: {
        //           title: {
        //             formatter: (seriesName) => seriesName,
        //           },
        //           formatter: function (value) {
        //             let val = value;
        //               val = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    
        //             return val;
        //           },
        //         },
        //       }
        //   },
        // },

        cart4: {
          series: [],
          
          options: {
            chart: {
              width: 380,
              type: 'donut',
              fontFamily: '"Lato", sans-serif',
              toolbar: {
                show: true,
                tools: {
                  download: true,
                  selection: true,
                  zoom: true,
                  zoomin: true,
                  zoomout: true,
                  pan: true,
                  customIcons: []
                },
              }
            },
            legend: {
              position: 'bottom',
              style: {
                color: '#3D3D3D',
                fontSize: '14px',
              },
            },
            grid: {
              show: false,
            },
            colors: ['#186609','#9BBB59', '#F79646','#4BACC6','#C0504D', '#aaaaaa',
            '#4EB9D2','#4D8DD3','#3558EB','#005086','#032F4E','#404040',
            '#7F7F7F','#BFBFBF','#8EBDCB','#8A85BD','#EAB0B8','#E54878',
            '#994561','#CC3A8E'],
            tooltip: {
              enabled: true,
              style: {
                fontSize: '14px',
                background: '#fff',
              },
              // y: {
              //   title: {
              //     formatter: (seriesName) => seriesName,
              //   },
              //   formatter: function (value) {
              //     let val = value;
              //       val = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  
              //     return val;
              //   },
              // },
              custom: function({series, seriesIndex, dataPointIndex, w}) {
                let Total = 0;
                for (let i = 0; i<= series.length -1; i++) {
                  Total += series[i];
                }
                return '<div class="arrow_box">' +
                  '<span><strong>' + w.config.labels[seriesIndex] + ":</strong> " + Math.round(series[seriesIndex]/Total *1000) /10 + "%" + '</span>' +
                  '</div>'
              }
            },
            labels: [],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                
              }
            }]
          },
        },
        cart5: {
          series: [{
            data: [44, 55, 41, 64, 22, 43, 21]
          }, {
            data: [53, 32, 33, 52, 13, 44, 32]
          }],
          options: {
            chart: {
              type: 'bar',
              height: 400,
              fontFamily: '"Lato", sans-serif',
            },
            grid: {
              show: false,
            },
            colors: ['#FF9933','#FF6601'],
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '90%',
                dataLabels: {
                  position: 'top',
                },
              }
            },
            dataLabels: {
              enabled: true,
              style: {
                fontSize: '14px',
                colors: ['#fff'],
              },
              formatter: function (value) {
                
                return parseFloat(value).toFixed(2);
              },
            },
            stroke: {
              show: true,
              width: 1,
              colors: ['#fff']
            },
            yaxis: [ {
              axisBorder: {
                show: true,
                color: '#8E8E8E'
              },
              max: 10,
              labels: {
                show: true,
                style: {
                    colors: '#8E8E8E',
                    fontSize: '12px',
                },
              },
              title: {
                text: `ROI (${sessionStorage.getItem('symbolVal')})`,
                style: {
                  color: '#DB1348',
                  fontWeight : 'bold',
                  fontSize : '14px',
                }
              },
              }
            ],
            xaxis: {
              categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
              axisBorder: {
                show: true,
                color: '#999'
              },
              labels: {
                show: true,
                style: {
                  fontSize: '12px',
                  color: '#373D3F',
                },
              },
            },
            legend: {
              horizontalAlign: 'left',
                  position: 'bottom',
                  style: {
                    color: '#3D3D3D',
                    fontSize: '14px',
                  },
            }
          },
        },
        cart6: {
          series: [{
            name: 'Marine Sprite',
            data: [44, 55, 41, 37, 22, 43, 21]
          }, {
            name: 'Striking Calf',
            data: [53, 32, 33, 52, 13, 43, 32]
          }, {
            name: 'Tank Picture',
            data: [12, 17, 11, 9, 15, 11, 20]
          }, {
            name: 'Bucket Slope',
            data: [9, 7, 5, 8, 6, 9, 4]
          }, {
            name: 'Reborn Kid',
            data: [25, 12, 19, 32, 25, 24, 10]
          }],
          options: {
            chart: {
              type: 'bar',
              height: 800,
              fontFamily: '"Lato", sans-serif',
              stacked: true,
              stackedType: '100%',
                zoom: {
                    enabled: false
                },
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
                horizontal: true,
                columnWidth: '100%',
              },
            },
            stroke: {
              width: [4, 4, 4, 4, 4],
              curve: 'smooth',
            },
            title: {
              text: 'Fiction Books Sales',
              floating: true,
            },
            xaxis: {
              categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
              // labels: {
              //   formatter: function (val) {
              //     return val + "K"
              //   }
              // }
            },
            yaxis: {
              title: {
                text: undefined
              },
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + "K"
                }
              }
            },
            fill: {
              opacity: 1
            },
            legend: {
              horizontalAlign: 'center',
                  position: 'bottom',
                  style: {
                    color: '#3D3D3D',
                    fontSize: '14px',
                  },
            }
          },
          
        
        }
      }
  }

  static getDerivedStateFromProps(props, state) {
    let { cart0, cart01, cart02, cart1, cart2, subBrandValue, cart4, cart5, cart6, tiltleVal1, tiltleVal2, tiltleVal3, tiltleVal4, tiltleVal5 } = state
    
    if (props.graphData1 && props.graphData1.atlSeries && subBrandValue !== props.subBrandValue) {
        //cart0.series[0].data = props.graphData1.atlSeries[0].series
        cart0.series[0].data = props.graphData1.atlSeries[0].series[0].data
        cart0.series[0].name = props.graphData1.atlSeries[0].series[0].tactic
        cart0.series[1].name = props.graphData1.atlSeries[0].series[1].tactic
        cart0.series[1].data = props.graphData1.atlSeries[0].series[1].data
        cart0.options.xaxis.categories = props.graphData1.atlSeries[0].labels
        tiltleVal1 = props.graphData1.atlSeries[0].bucket + ": " + Math.round(props.graphData1.atlSeries[0].value * 10) / 10 + "%"
    }

    if (props.graphData1 && props.graphData1.ownedEarnedSeries && subBrandValue !== props.subBrandValue) {
      cart01.series[0].data = props.graphData1.ownedEarnedSeries[0].series[0].data
      cart01.series[0].name = props.graphData1.ownedEarnedSeries[0].series[0].tactic
      cart01.series[1].name = props.graphData1.ownedEarnedSeries[0].series[1].tactic
      cart01.series[1].data = props.graphData1.ownedEarnedSeries[0].series[1].data
      cart01.options.xaxis.categories = props.graphData1.ownedEarnedSeries[0].labels
      tiltleVal4 = props.graphData1.ownedEarnedSeries[0].bucket + ": " + Math.round(props.graphData1.ownedEarnedSeries[0].value * 10) / 10 + "%"
  }

  if (props.graphData1 && props.graphData1.brandSeries && subBrandValue !== props.subBrandValue) {
    cart02.series[0].data = props.graphData1.brandSeries[0].series
    cart02.options.xaxis.categories = props.graphData1.brandSeries[0].labels
    tiltleVal5 = props.graphData1.brandSeries[0].bucket + ": " + Math.round(props.graphData1.brandSeries[0].value * 10) / 10 + "%"
}

    if (props.graphData1 && props.graphData1.btlSeries && subBrandValue !== props.subBrandValue) {
      cart1.series[0].data = props.graphData1.btlSeries[0].series
      cart1.options.xaxis.categories = props.graphData1.btlSeries[0].labels
      tiltleVal2 = props.graphData1.btlSeries[0].bucket + ": " + Math.round(props.graphData1.btlSeries[0].value * 10) / 10 + "%"
    }

    if (props.graphData1 && props.graphData1.sdSeries && subBrandValue !== props.subBrandValue) {
      cart2.series[0].data = props.graphData1.sdSeries[0].series
      cart2.options.xaxis.categories = props.graphData1.sdSeries[0].labels
      tiltleVal3 = props.graphData1.sdSeries[0].bucket + ": " + Math.round(props.graphData1.sdSeries[0].value * 10) / 10 + "%"
      //tiltleVal3 = props.graphData1.sdSeries[0].bucket + ": " + "10.0%"
    }

    if (props.graphData21 && props.graphData21.series && subBrandValue !== props.subBrandValue) {
      cart4.series = props.graphData21.series
      cart4.options.labels = props.graphData21.labels
    }

    if (props.graphData22 && props.graphData22.series && subBrandValue !== props.subBrandValue) {
      cart5.series = props.graphData22.series
      cart5.options.xaxis.categories = props.graphData22.xValue
    }

    if (props.graphData23 && props.graphData23.series && subBrandValue !== props.subBrandValue) {
      cart6.series = props.graphData23.series
      cart6.options.xaxis.categories = props.graphData23.xValue
    }


    return {
        cart0,
        cart01,
        cart02,
        cart1,
        cart2,
        cart4,
        cart5,
        cart6,
        subBrandValue,
        tiltleVal1,
        tiltleVal2,
        tiltleVal3,
        tiltleVal4,
        tiltleVal5
    }
    
    //return { };
  }
  

    render() {
      return (
        

  <div id="chart">
      {
          this.props.graphData1 &&
            <div className="chartContent">
              <div className="widthHalf titleAdded setHeight">
                <div className="chartTitle"><span className="smallLeftBorder"></span>Incremental vs Base</div>
              <Chart
                        options={this.state.cart4.options}
                        series={this.state.cart4.series}
                        type="donut" 
                        height={450}
                        />
              </div>
              <div className="widthHalfRight titleAdded setWidth">
              <div className="chartTitle"><span className="smallLeftBorder"></span>Incremental Split</div>
                {/* <Chart
                        options={this.state.cart3.options}
                        series={this.state.cart3.series}
                        type="donut" 
                        height={300}
                        /> */}
                        <div className="chartSub">
                          <div className="chartTitleSub">{this.state.tiltleVal1}</div>
                          <Chart
                          options={this.state.cart0.options}
                          series={this.state.cart0.series}
                          type="bar" 
                          height={280}
                          />
                        </div>
                        <div className="chartSub">
                          <div className="chartTitleSub4">{this.state.tiltleVal4}</div>
                          <Chart
                          options={this.state.cart01.options}
                          series={this.state.cart01.series}
                          type="bar" 
                          height={280}
                          />
                        </div>
                        
                        <div className="chartSub">
                        <div className="chartTitleSub1">{this.state.tiltleVal2}</div>
                          <Chart
                          options={this.state.cart1.options}
                          series={this.state.cart1.series}
                          type="bar" 
                          height={200}
                          />
                        </div>
                        <div className="chartSub">
                        <div className="chartTitleSub2">{this.state.tiltleVal3}</div>
                          <Chart
                          options={this.state.cart2.options}
                          series={this.state.cart2.series}
                          type="bar" 
                          height={200}
                          />
                        </div>
                        <div className="chartSub fullWidth">
                          <div className="chartTitleSub5">{this.state.tiltleVal5}</div>
                          <Chart
                          options={this.state.cart02.options}
                          series={this.state.cart02.series}
                          type="bar" 
                          height={280}
                          />
                        </div>
              </div>
              <div className="spaceBetween"></div>
              <div className="downChart titleAdded">
              <div className="chartTitle"><span className="smallLeftBorder"></span>ROI YoY</div>
              <div className="scrollhor">
                <Chart
                        options={this.state.cart5.options}
                        series={this.state.cart5.series}
                        type="bar" 
                        height={400}
                        width={2500}
                        />
                        </div>
                </div>
                <div className="spaceBetween"></div>
                {/* <div className="downChart titleAdded">
              <div className="chartTitle"><span className="smallLeftBorder"></span>Spend</div>
                <Chart
                        options={this.state.cart6.options}
                        series={this.state.cart6.series}
                        type="bar" 
                        height={800}
                        />
                </div> */}
            </div>
      }
      
</div>


      );
    }
  }

  export default MainTab2Charts
  
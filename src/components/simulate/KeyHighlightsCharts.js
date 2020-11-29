import React, { Component } from "react";
import Chart from "react-apexcharts";
import moment from 'moment';


class KeyHighlightsCharts extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        dataLength: 0,
        cart1: {
          series: [{
              data: [44]
            }, {
              data: [53]
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
                categories: ['Old', 'New'],
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
                show: false,
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
                        val = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      
                      return val;
                    },
                  },
                }
            },
          },
        cart2: {
          series: [{
              data: [64]
            }, {
              data: [33]
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
                categories: ['Old', 'New'],
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
                show: false,
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
                        val = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      
                      return val;
                    },
                  },
                }
            },
          },
          cart4: {
            series: [{
                data: [64]
              }, {
                data: [33]
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
                  categories: ['Old', 'New'],
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
                  show: false,
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
                          val = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        
                        return val;
                      },
                    },
                  }
              },
            },
        cart3: {
          series: [{
              data: [21]
            }, {
              data: [32]
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
                  return parseFloat(value).toFixed(2);
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
                categories: ['Old', 'New'],
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
                      return parseFloat(value).toFixed(2);
                    },
                    style: {
                      fontSize: '12px',
                      color: '#8E8E8E'
                    },
                  },
                },
              ],
              legend: {
                show: false,
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
                      return parseFloat(value).toFixed(2);
                    },
                  },
                }
            },
          },
          cart6: {
            series: [{
                data: [64]
              }, {
                data: [33]
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
                  categories: ['Old', 'New'],
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
                  show: false,
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
                          val = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        
                        return val;
                      },
                    },
                  }
              },
            },
            cart7: {
              series: [{
                  data: [64]
                }, {
                  data: [33]
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
                    categories: ['Old', 'New'],
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
                    show: false,
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
                            val = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          
                          return val;
                        },
                      },
                    }
                },
              },
          cart5: {
            series: [{
                data: [21]
              }, {
                data: [32]
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
                    return parseFloat(value).toFixed(2);
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
                  categories: ['Old', 'New'],
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
                        return parseFloat(value).toFixed(2);
                      },
                      style: {
                        fontSize: '12px',
                        color: '#8E8E8E'
                      },
                    },
                  },
                ],
                legend: {
                  show: false,
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
                        return parseFloat(value).toFixed(2);
                      },
                    },
                  }
              },
            }
       
    };
  }

  static getDerivedStateFromProps(props, state) {
    let { cart1, cart2, cart3, cart4, cart5, cart6, cart7, dataLength } = state
    
    if (props.keySpendSeries && props.keySpendSeries.length > 0 && props.keySpendSeries[0].data.length !== state.dataLength ) {
        cart1.series = props.keySpendSeries
        cart1.options.xaxis.categories = props.keySpendLabels
        cart2.options.xaxis.categories = props.keySpendLabels
        cart3.options.xaxis.categories = props.keySpendLabels
        cart4.options.xaxis.categories = props.keySpendLabels
        cart5.options.xaxis.categories = props.keySpendLabels
        cart6.options.xaxis.categories = props.keySpendLabels
        cart7.options.xaxis.categories = props.keySpendLabels
        cart2.series = props.keyRevenueSeries
        cart3.series = props.keyROISeries
        cart4.series = props.keyRevenueLTSeries
        cart5.series = props.keyROILTSeries
        cart6.series = props.keyBaseRevenueSeries
        cart7.series = props.keyTotalRevenueSeries
        dataLength = props.keySpendSeries[0].data.length
    }


    return {
        cart1,
        cart2,
        cart3,
        cart4,
        cart5,
        cart6,
        cart7,
        dataLength,
    }
    
    //return { };
  }
  

    render() {
      return (
        

  <div id="chart">
            <div className="circleChart">
              <div className="chartTitle"><span className="smallLeftBorder"></span>Spend (€)</div>
                    <Chart
                        options={this.state.cart1.options}
                        series={this.state.cart1.series}
                        type="bar" 
                        height={350}
                        />
                      </div>
                      <div className="circleChart">
              <div className="chartTitle"><span className="smallLeftBorder"></span>Inc Revenue (€)</div>
                    <Chart
                        options={this.state.cart2.options}
                        series={this.state.cart2.series}
                        type="bar" 
                        height={350}
                        />
                      </div>
                      <div className="circleChart lastCircle">
              <div className="chartTitle"><span className="smallLeftBorder"></span>Base Revenue (€)</div>
                    <Chart
                        options={this.state.cart6.options}
                        series={this.state.cart6.series}
                        type="bar" 
                        height={350}
                        />
                      </div>
                      <div className="circleChart bigCircle">
              <div className="chartTitle"><span className="smallLeftBorder"></span>Total Revenue (€)</div>
                    <Chart
                        options={this.state.cart7.options}
                        series={this.state.cart7.series}
                        type="bar" 
                        height={350}
                        />
                      </div>
                      <div className="circleChart bigCircle lastCircle">
              <div className="chartTitle"><span className="smallLeftBorder"></span>Brand Revenue (€)</div>
                    <Chart
                        options={this.state.cart4.options}
                        series={this.state.cart4.series}
                        type="bar" 
                        height={350}
                        />
                      </div>
                      <div className="spaceBetween"></div>
                      <div className="circleChart bigCircle ">
              <div className="chartTitle"><span className="smallLeftBorder"></span>Inc ROI (€)</div>
                    <Chart
                        options={this.state.cart3.options}
                        series={this.state.cart3.series}
                        type="bar" 
                        height={350}
                        />
                      </div>
                      <div className="circleChart bigCircle lastCircle">
              <div className="chartTitle"><span className="smallLeftBorder"></span>Brand ROI (€)</div>
                    <Chart
                        options={this.state.cart5.options}
                        series={this.state.cart5.series}
                        type="bar" 
                        height={350}
                        />
                      </div>
            </div>


      );
    }
  }

  export default KeyHighlightsCharts
  
const config = historical => {
  return {
    title: {
      text: "  "
    },

    // subtitle: {
    //   text: "Source: thesolarfoundation.com"
    // },

    yAxis: {
      title: {
        text: "Price"
      }
    },

    xAxis: {
      type: "datetime"
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle"
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },

    series: historical,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
            minHeight: 500
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom"
            }
          }
        }
      ]
    }
  };
};

export default config;

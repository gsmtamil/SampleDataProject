/**
 * Master Controller
 */
am4core.useTheme(am4themes_animated);
angular
  .module("simpleApp")
  .controller("DashboardCtrl", [
    "$scope",
    "$http",
    "NgTableParams",

    DashboardCtrl,
  ]);

function DashboardCtrl($scope, $http, NgTableParams) {
  $scope.tam = "tamilselvan";
  $scope.data = "";

  $http({
    method: "GET",
    url: "http://localhost:3000/api/v1/dashboard/report",
  }).then(
    function successCallback(response) {
      $scope.data = response.data;
      status_wise_count_Data($scope.data[0].status_wise_count);
      course_wise_completion_Data($scope.data[0].course_wise_completion);
      country_wise_completion_Data($scope.data[0].country_wise_completion);
      year_wise_expiration_Data($scope.data[0].year_wise_expiration);
      year_wise_completion_Data($scope.data[0].year_wise_completion);
      training_provider_wise_completion_Data(
        $scope.data[0].training_provider_wise_completion
      );
    },
    function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    }
  );

  function status_wise_count_Data(data) {
    var chart = am4core.create("status_wise_count", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = data;

    chart.radius = am4core.percent(70);
    chart.innerRadius = am4core.percent(40);
    chart.startAngle = 180;
    chart.endAngle = 360;

    var series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "count";
    series.dataFields.category = "_id";

    series.slices.template.cornerRadius = 10;
    series.slices.template.innerCornerRadius = 7;
    series.slices.template.draggable = true;
    series.slices.template.inert = true;
    series.alignLabels = false;

    series.hiddenState.properties.startAngle = 90;
    series.hiddenState.properties.endAngle = 90;

    chart.legend = new am4charts.Legend();
  }

  function course_wise_completion_Data(data) {
    var chart = am4core.create("course_wise_completion", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = data;

    chart.innerRadius = am4core.percent(50);

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "count";
    pieSeries.dataFields.category = "_id";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
  }
  function country_wise_completion_Data(data) {
    // Create chart instance
    var chart = am4core.create("country_wise_completion", am4charts.PieChart);

    chart.data = data;
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "count";
    pieSeries.dataFields.category = "_id";
    pieSeries.innerRadius = am4core.percent(50);
    pieSeries.ticks.template.disabled = true;
    pieSeries.labels.template.disabled = true;

    var rgm = new am4core.RadialGradientModifier();
    rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, -0.5);
    pieSeries.slices.template.fillModifier = rgm;
    pieSeries.slices.template.strokeModifier = rgm;
    pieSeries.slices.template.strokeOpacity = 0.4;
    pieSeries.slices.template.strokeWidth = 0;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
  }

  function year_wise_expiration_Data(data) {
    // Create chart instance
    var chart = am4core.create("year_wise_expiration", am4charts.PieChart);

    chart.data = data;
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "count";
    pieSeries.dataFields.category = "_id";
    pieSeries.innerRadius = am4core.percent(50);
    pieSeries.ticks.template.disabled = true;
    pieSeries.labels.template.disabled = true;

    var rgm = new am4core.RadialGradientModifier();
    rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, -0.5);
    pieSeries.slices.template.fillModifier = rgm;
    pieSeries.slices.template.strokeModifier = rgm;
    pieSeries.slices.template.strokeOpacity = 0.4;
    pieSeries.slices.template.strokeWidth = 0;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
  }
  function year_wise_completion_Data(data) {
    // Create chart instance
    var chart = am4core.create("year_wise_completion", am4charts.PieChart);

    chart.data = data;
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "count";
    pieSeries.dataFields.category = "_id";
    pieSeries.innerRadius = am4core.percent(50);
    pieSeries.ticks.template.disabled = true;
    pieSeries.labels.template.disabled = true;

    var rgm = new am4core.RadialGradientModifier();
    rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, -0.5);
    pieSeries.slices.template.fillModifier = rgm;
    pieSeries.slices.template.strokeModifier = rgm;
    pieSeries.slices.template.strokeOpacity = 0.4;
    pieSeries.slices.template.strokeWidth = 0;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
  }

  function training_provider_wise_completion_Data(data) {
    // Create chart instance
    // var chart = am4core.create("year_wise_completion", am4charts.PieChart);

    var chart = am4core.create(
      "training_provider_wise_completion",
      am4charts.XYChart
    );

    chart.data = data;
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "_id";
    categoryAxis.renderer.minGridDistance = 15;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.renderer.grid.template.strokeDasharray = "1,3";
    categoryAxis.renderer.labels.template.rotation = -90;
    categoryAxis.renderer.labels.template.horizontalCenter = "left";
    categoryAxis.renderer.labels.template.location = 0.5;

    categoryAxis.renderer.labels.template.adapter.add(
      "dx",
      function (dx, target) {
        return -target.maxRight / 2;
      }
    );

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.renderer.axisFills.template.disabled = true;

    var series = chart.series.push(new am4charts.ColumnSeries());

    series.dataFields.categoryX = "_id";
    series.dataFields.valueY = "count";
    series.tooltipText = "{valueY.value}";
    series.sequencedInterpolation = true;
    series.fillOpacity = 0;
    series.strokeOpacity = 1;
    series.strokeDashArray = "1,3";
    series.columns.template.width = 0.01;
    series.tooltip.pointerOrientation = "horizontal";

    var bullet = series.bullets.create(am4charts.CircleBullet);

    chart.cursor = new am4charts.XYCursor();

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();
  }

  $scope.tableParams = new NgTableParams(
    {
      page: 1, // show first page
      count: 10, // count per page
    },
    {
      filterDelay: 300,
      getData: function (params) {
        let filterData = params.filter();

        let url = `http://127.0.0.1:3000/api/v1/learningHistory?page=${params.page()}&count=${params.count()}`;

        if (filterData.trainingProvider) {
          url =
            url +
            `&searchName=trainingProvider&searchValue=${filterData.trainingProvider}`;
        }

        return $http({
          method: "GET",
          url: url,
        }).then(
          function successCallback(response) {
            // $scope.data = response.data;
            console.log(response.data);
            params.total(response.data.total);
            return response.data.data;
          },
          function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          }
        );
      },
    }
  );
}

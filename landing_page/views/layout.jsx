var React = require('react');

var Layout = React.createClass({
  propTypes: {
    title: React.PropTypes.string
  },

  render: function() {
    return (
        <html>
        <head>
          <meta name='viewport' content='initial-scale=1, maximum-scale=1,user-scalable=no' />

          <title>Work In The City</title>

          <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.14.3/mapbox-gl.js'></script>
          <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.14.3/mapbox-gl.css' rel='stylesheet' />
          <script src='https://api.mapbox.com/mapbox.js/v2.3.0/mapbox.js'></script>
          <link href='https://api.mapbox.com/mapbox.js/v2.3.0/mapbox.css'
          rel='stylesheet' />

          <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Montserrat:400,700" />
          <link href='https://fonts.googleapis.com/css?family=Raleway:300' rel='stylesheet' type='text/css' />

          <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
          <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>

          <script
          src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
          
          <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js"></script>

          <link rel="stylesheet" type="text/css" href="stylesheets/style.css" />
        </head>
        <body>
          {this.props.children}
        </body>
      </html>
    );
  }
});

module.exports = Layout;

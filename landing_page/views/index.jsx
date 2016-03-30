var React = require('react');
var Radium = require('radium');
var Layout = require('./layout');


var Index = React.createClass({
  propTypes: {
    title: React.PropTypes.string
  },

  render: function() {
    return (
      <body style={styles.body}>
      <div style={styles.leftContent}>
        <div style={styles.leftContent.header}>

          <h1 style={styles.h1}> RemoteMe </h1>

          <div style={styles.leftContent.findMe}>
              <button style={styles.leftContent.findMe.button}>
                Find Me
                <p> (Defaults to 1000m radius) </p>
              </button>
          </div>
          <hr style={styles.contentBreak} />
          <div style={styles.leftContent.chooseRadius}>
              <input style={styles.leftContent.chooseRadius.text} type="text" placeholder="radius in metres" />
              <button style={styles.leftContent.chooseRadius.button}>Search Near Me</button>
          </div>
          <hr style={styles.contentBreak} />

        </div>
      </div>
      </body>
    );
  }
});

module.exports = Index;

// Styling
var styles = {
  body: {
    height: '100%',
    flex: 1,
    margin: 0,
    width: '100%',
  },
  h1: {
    color: '#4c4d57',
    fontFamily: 'Montserrat:400, sans-serif',
    margin: 0,
    textDecoration: 'bold',
  },
  contentBreak: {
    background: '#4c4d57',
    color: '#4c4d57',
    marginTop: 50,
    marginBottom: 50,
    padding: 1,
    width: '70%',
  },
  leftContent: {
    background: '#ddd',
    bottom: 0,
    display: 'inline-block',
    height: '100%',
    flex: 1,
    overflow: 'auto',
    position: 'absolute',
    textAlign: 'center',
    width: '30%', 
    header: {
      height: '20%',
      margin: '0 auto',
      width: '90%',
    },
    findMe: {
      margin: 20,
      button: {
        border: 'solid',
        borderColor: '#4c4d57',
        borderRadius: 180,
        background: '#4c4d57',
        color: '#ddd',
        fontSize: 20,
        marginTop: 20,
        padding: 12,
        textDecoration: 'none',
        ':hover': {
          background: '#ddd',
          color: '#4c4d57',
          cursor: 'pointer',
          cursor: 'hand',
        },
      },
    },
    chooseRadius: {
      margin: 10,
      text: {
        border: 'solid',
        borderColor: '#fff',
        borderRadius: 180,
        fontSize: 16,
        margin: 2.5,
        padding: 10,
      },
      button: {
        border: 'solid',
        borderColor: '#4c4d57',
        borderRadius: 180,
        background: '#4c4d57',
        color: '#ddd',
        fontSize: 16,
        margin: 2.5,
        padding: 10,
        textDecoration: 'none',
      },
    },
  },

};

import "bootstrap";

const App = (function () {
  return {
    initBeforeLoad: function () {
      console.log("Init Before Load");
    },
    initCore: function () {
      // Write code here

      require("./pages/home");
    },
    initAfterLoad: function () {
      console.log("Init Afrer Load");
    },
  };
})();

// When content is loader

document.addEventListener("DOMContentLoaded", function () {
  App.initBeforeLoad();
  App.initCore();
});

// When page is fully loaded
window.addEventListener("load", function () {
  App.initAfterLoad();
});

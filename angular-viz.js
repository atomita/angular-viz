(function() {
  var Viz, angular, baseoption, directive_link, draw, language_directive_link, module, render;

  if (typeof require === "function") {
    require("angular");
  }

  if (typeof require === "function") {
    require("viz");
  }

  angular = (typeof global !== "undefined" && global !== null ? global.angular : void 0) || (typeof window !== "undefined" && window !== null ? window.angular : void 0);

  Viz = (typeof global !== "undefined" && global !== null ? global.Viz : void 0) || (typeof window !== "undefined" && window !== null ? window.Viz : void 0);

  module = angular.module("atVizJs", []);

  baseoption = {
    format: "svg",
    engine: "dot"
  };

  render = function(source_code, option) {
    var arg, k, _i, _len, _ref;
    if (option == null) {
      option = {};
    }
    option = angular.extend({}, baseoption, option);
    arg = {};
    _ref = ["format", "engine"];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      arg[k] = option[k];
      delete option[k];
    }
    return Viz(source_code, arg.format, arg.engine, option);
  };

  draw = function(source_code, output_element, option) {
    var $elm, dot;
    if (option == null) {
      option = {};
    }
    $elm = angular.element(output_element);
    dot = render(source_code, option);
    $elm.html(dot);
  };

  directive_link = function(scope, element, attrs) {
    return draw(attrs.dot || element.text(), element, attrs);
  };

  language_directive_link = function() {};

  module.provider("vizJs", function() {
    this.option = function(opt) {
      baseoption = angular.extend(baseoption, opt);
      return this;
    };
    this.enableLanguageDirective = function() {
      language_directive_link = directive_link;
      return this;
    };
    this.$get = function() {
      return {
        "render": render,
        "draw": draw
      };
    };
  });

  module.directive("dot", function() {
    return {
      restrict: "E",
      scope: true,
      transclude: true,
      replace: true,
      template: "<div ng-bind-html=\"diagram\" class=\"at-viz-js\"></div>",
      controller: [
        "$scope", "$element", "$attrs", "$transclude", "$sce", function($scope, $element, $attrs, $transclude, $sce) {
          var diagram;
          diagram = render($attrs.dot || $transclude().text(), $attrs);
          return $scope.diagram = $sce.trustAsHtml(diagram);
        }
      ]
    };
  });

  module.directive("dot", function() {
    return {
      restrict: "A",
      template: "",
      link: directive_link
    };
  });

  module.directive("languageDot", function() {
    return {
      restrict: "C",
      template: "",
      link: language_directive_link
    };
  });

}).call(this);

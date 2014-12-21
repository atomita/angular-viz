
require?("angular")
require?("viz")

angular = global?.angular or window?.angular
Viz = global?.Viz or window?.Viz

module = angular.module "atVizJs", []


baseoption =
	format: "svg"
	engine: "dot"


render = (source_code, option = {})->
	option = angular.extend {}, baseoption, option

	arg = {}
	for k in ["format", "engine"]
		arg[k] = option[k]
		delete option[k]

	Viz source_code, arg.format, arg.engine, option


draw = (source_code, output_element, option = {})->
	$elm = angular.element output_element
	dot = render source_code, option
	$elm.html dot
	return


directive_link = (scope, element, attrs)->
	draw attrs.dot or element.text(), element, attrs


language_directive_link = -> return


module.provider "vizJs", ()->
	@option = (opt)->
		baseoption = angular.extend baseoption, opt
		@

	@enableLanguageDirective = ->
		language_directive_link = directive_link
		@

	@$get = ()->
		"render": render
		"draw": draw

	return


module.directive "dot", ->
	{
		restrict: "E"
		scope: true
		transclude: true
		replace: true
		template: "<div ng-bind-html=\"diagram\" class=\"at-viz-js\"></div>"
		controller: ["$scope", "$element", "$attrs", "$transclude", "$sce", ($scope, $element, $attrs, $transclude, $sce)->
			diagram = render $attrs.dot or $transclude().text(), $attrs
			$scope.diagram = $sce.trustAsHtml diagram
		]
	}
module.directive "dot", ->
	{
		restrict: "A"
		template: ""
		link: directive_link
	}


module.directive "languageDot", ->
	{
		restrict: "C"
		template: ""
		link: language_directive_link
	}

